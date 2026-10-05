/**
 * app/api/auth/magic-link/route.ts
 *
 * POST { email } — if that email belongs to an existing customer account
 * (created by a completed Stripe checkout, see app/api/webhooks/stripe),
 * emails a one-time, 15-minute login link via Resend.
 *
 * Always responds with the same generic success message whether or not the
 * email matches a real account — this deliberately does not reveal account
 * existence (a standard anti-enumeration practice for login flows).
 *
 * This route only ever supports POST. A GET to this URL (someone pasting
 * it into a browser address bar, a health-checker, etc.) gets an explicit
 * 405 with a clear JSON body below — not a mysterious crash — so a "GET
 * fails" report is never confused with the real thing this file fixes: a
 * POST that 500s because resend.emails.send() failed.
 *
 * DEBUGGING: every send failure funnels through lib/email/resendSender.ts's
 * logResendError()/buildSendFailureBody(), which (a) always logs the exact
 * underlying error server-side as "RESEND SDK ERROR:", and (b) in any
 * non-production environment, returns that exact error's message and code
 * directly in the response body so it's visible in DevTools' network tab
 * without needing server log access. In production the body stays generic.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicLinkToken } from "@/lib/customerAuth/magicLinkStore";
import { getCustomerRecord } from "@/lib/customer/store";
import { BASE_URL } from "@/lib/seo";
import { resolveFromAddress, logResendError, buildSendFailureBody, readEnv } from "@/lib/email/resendSender";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOG_CONTEXT = "auth/magic-link";

const GENERIC_RESPONSE = {
  success: true,
  message: "If that email has an account, we've sent a login link. Check your inbox.",
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Logs + shapes the response for any send failure — the one place that handles step 1's "wrap in explicit error handling" requirement. */
function sendFailureResponse(genericMessage: string, error: unknown): NextResponse {
  logResendError(LOG_CONTEXT, error);
  return NextResponse.json(buildSendFailureBody(genericMessage, error), { status: 500 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const email = (body as { email?: unknown })?.email;
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const customer = await getCustomerRecord(normalizedEmail);
    if (!customer) {
      // No account — return the same generic success shape (anti-enumeration).
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    const token = await createMagicLinkToken(normalizedEmail);
    const magicLinkUrl = `${BASE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`;

    const apiKey = readEnv("RESEND_API_KEY");
    if (!apiKey) {
      return sendFailureResponse(
        "Login email is temporarily unavailable. Please try again shortly.",
        new Error(
          "RESEND_API_KEY is not configured. Set it in your environment " +
            "(Vercel project settings -> Environment Variables, or .env.local for dev) to send login emails.",
        ),
      );
    }

    const fromEmail = resolveFromAddress(LOG_CONTEXT, normalizedEmail);

    console.log(`[${LOG_CONTEXT}] Dispatching login link via Resend — to: "${normalizedEmail}", from: "${fromEmail}"`);

    // Step 1: wrap resend.emails.send() in explicit error handling and
    // inspect the { data, error } response shape — Resend returns errors
    // this way for most API-level failures (unverified domain, invalid
    // recipient, suspended account, etc.) rather than throwing, so a bare
    // try/catch around the call is NOT enough on its own without also
    // checking `error` below.
    let data: { id?: string } | null = null;
    let error: unknown = null;
    try {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: fromEmail,
        to: [normalizedEmail],
        subject: "Your Culture Graph API login link",
        text: `Log in to your Culture Graph API dashboard: ${magicLinkUrl}\n\nThis link expires in 15 minutes and can only be used once. If you didn't request this, you can ignore this email.`,
        html: `<p>Log in to your Culture Graph API dashboard:</p><p><a href="${escapeHtml(magicLinkUrl)}">${escapeHtml(magicLinkUrl)}</a></p><p style="color:#666;font-size:13px">This link expires in 15 minutes and can only be used once. If you didn't request this, you can ignore this email.</p>`,
      });
      data = result.data;
      error = result.error;
    } catch (sendErr) {
      // The SDK itself threw (network failure, malformed request, etc.)
      // rather than returning { error } — treated identically below.
      error = sendErr;
    }

    if (error) {
      return sendFailureResponse("Could not send the login email. Please try again shortly.", error);
    }

    console.log(`[${LOG_CONTEXT}] Login email sent to "${normalizedEmail}" — Resend message id: ${data?.id}`);
    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (err) {
    // Anything else unexpected: an Upstash error from
    // createMagicLinkToken/getCustomerRecord, etc. — not a Resend failure,
    // but still logged and surfaced the same way in dev so nothing gets
    // silently swallowed.
    return sendFailureResponse("Something went wrong. Please try again.", err);
  }
}

/** This route only supports POST — an explicit 405 instead of letting the request fall through unexplained. */
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Send a POST request with a JSON body of { email }." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

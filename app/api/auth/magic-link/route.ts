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
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicLinkToken } from "@/lib/customerAuth/magicLinkStore";
import { getCustomerRecord } from "@/lib/customer/store";
import { BASE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_RESPONSE = {
  success: true,
  message: "If that email has an account, we've sent a login link. Check your inbox.",
};

function readEnv(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

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
      console.error("[auth/magic-link] RESEND_API_KEY missing — cannot send login email.");
      return NextResponse.json(
        { error: "Login email is temporarily unavailable. Please try again shortly." },
        { status: 500 },
      );
    }
    const fromEmail = readEnv("RESEND_FROM_EMAIL") || "Internet Culture Hub <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [normalizedEmail],
      subject: "Your Culture Graph API login link",
      text: `Log in to your Culture Graph API dashboard: ${magicLinkUrl}\n\nThis link expires in 15 minutes and can only be used once. If you didn't request this, you can ignore this email.`,
      html: `<p>Log in to your Culture Graph API dashboard:</p><p><a href="${escapeHtml(magicLinkUrl)}">${escapeHtml(magicLinkUrl)}</a></p><p style="color:#666;font-size:13px">This link expires in 15 minutes and can only be used once. If you didn't request this, you can ignore this email.</p>`,
    });

    if (error) {
      console.error("[auth/magic-link] Resend API error:", error);
      return NextResponse.json(
        { error: "Could not send the login email. Please try again shortly." },
        { status: 500 },
      );
    }

    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (err) {
    console.error("[auth/magic-link] unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

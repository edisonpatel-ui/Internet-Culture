/**
 * lib/email/welcomeEmail.ts
 *
 * The post-checkout "here's your API key" email, sent via Resend from
 * app/api/webhooks/stripe/route.ts right after a successful
 * checkout.session.completed. Sender resolution and error
 * logging/formatting come from lib/email/resendSender.ts — the one
 * place that owns those, shared with app/api/auth/magic-link/route.ts and
 * app/api/auth/reset-password/route.ts so all three can never drift out of
 * sync with each other again.
 *
 * NEVER throws — this is called from inside the Stripe webhook handler,
 * which must return 2xx to Stripe regardless of whether the email
 * succeeds (see app/api/webhooks/stripe/route.ts's doc comment for why: a
 * stuck 5xx here would make Stripe retry the whole webhook forever,
 * re-issuing a new API key on every retry).
 */

import { Resend } from "resend";
import { BASE_URL } from "@/lib/seo";
import type { ApiKeyTier } from "@/lib/api/keys";
import { TIER_RATE_LIMITS, TIER_MONTHLY_QUOTAS } from "@/lib/api/keys";
import { resolveFromAddress, logResendError, describeResendError, readEnv } from "@/lib/email/resendSender";

const LOG_CONTEXT = "webhooks/stripe:welcomeEmail";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailContent(params: { rawKey: string; tier: ApiKeyTier; dashboardUrl: string; docsUrl: string }) {
  const { rawKey, tier, dashboardUrl, docsUrl } = params;
  const burst = TIER_RATE_LIMITS[tier];
  const quota = TIER_MONTHLY_QUOTAS[tier];
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  const text = [
    `Welcome to the Culture Graph API (${tierLabel} plan)`,
    "",
    "Your API key:",
    rawKey,
    "",
    "Keep this somewhere safe — it will not be shown again, and this is the only email that contains it.",
    "",
    `Plan limits: ${burst.toLocaleString()} requests/minute, ${quota ? `${quota.toLocaleString()} requests/month` : "no monthly cap"}.`,
    "",
    `Dashboard: ${dashboardUrl}`,
    `API reference: ${docsUrl}`,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;color:#e4e4e7;background:#0a0a0a;padding:32px 28px;border-radius:16px;">
      <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#22d3ee;margin:0 0 16px;">
        Culture Graph API &middot; ${escapeHtml(tierLabel)} plan
      </p>
      <h1 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 16px;line-height:1.3;">
        You&rsquo;re all set — here&rsquo;s your API key
      </h1>
      <p style="font-size:14px;line-height:1.6;color:#a1a1aa;margin:0 0 12px;">
        Keep this somewhere safe. It will not be shown again, and this is the only email that contains it.
      </p>
      <code style="display:block;word-break:break-all;background:#18181b;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:14px 16px;font-size:13px;color:#22d3ee;margin:0 0 16px;">
        ${escapeHtml(rawKey)}
      </code>
      <p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 20px;">
        ${burst.toLocaleString()} requests/minute &middot;
        ${quota ? `${quota.toLocaleString()} requests/month` : "no monthly cap"}
      </p>
      <a href="${escapeHtml(dashboardUrl)}"
         style="display:inline-block;margin-right:8px;padding:11px 20px;border-radius:8px;background:#22d3ee;color:#09090b;font-size:14px;font-weight:600;text-decoration:none;">
        Go to dashboard
      </a>
      <a href="${escapeHtml(docsUrl)}"
         style="display:inline-block;padding:11px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);color:#e4e4e7;font-size:14px;font-weight:600;text-decoration:none;">
        API reference
      </a>
    </div>
  `;

  return { subject: `Your Culture Graph API key (${tierLabel} plan)`, text, html };
}

export interface SendWelcomeEmailResult {
  success: boolean;
  /** Resend's message id, present only on success. */
  id?: string;
  /** The error Resend or the network layer returned, present only on failure. */
  error?: unknown;
}

/**
 * Sends the welcome email containing a freshly-issued raw API key.
 * NEVER throws — every branch logs explicitly (via resendSender's
 * "RESEND SDK ERROR:" prefix) so a failure is visible in Vercel's
 * Function logs, but the caller (the webhook) decides what to do with
 * the returned result rather than ever catching an exception from here.
 */
export async function sendWelcomeEmail(params: {
  email: string;
  rawKey: string;
  tier: ApiKeyTier;
  sessionId: string;
}): Promise<SendWelcomeEmailResult> {
  const { email, rawKey, tier, sessionId } = params;

  console.log(`[${LOG_CONTEXT}] Preparing welcome email for session ${sessionId} -> "${email}" (tier: ${tier})`);

  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) {
    const error = new Error("RESEND_API_KEY is not configured.");
    logResendError(LOG_CONTEXT, error);
    console.error(
      `[${LOG_CONTEXT}] Cannot send welcome email for session ${sessionId} — the customer still has their key ` +
        "via the checkout success page; set RESEND_API_KEY in your environment to enable this email.",
    );
    return { success: false, error };
  }

  const from = resolveFromAddress(LOG_CONTEXT, email);
  const dashboardUrl = `${BASE_URL}/dashboard`;
  const docsUrl = `${BASE_URL}/docs`;
  const { subject, text, html } = buildEmailContent({ rawKey, tier, dashboardUrl, docsUrl });

  console.log(
    `[${LOG_CONTEXT}] Dispatching via Resend — session: ${sessionId}, to: "${email}", from: "${from}", ` +
      `subject: "${subject}"`,
  );

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({ from, to: [email], subject, text, html });

    if (error) {
      logResendError(LOG_CONTEXT, error);
      const { code, message } = describeResendError(error);
      console.error(
        `[${LOG_CONTEXT}] Resend rejected the welcome email for session ${sessionId} (to: "${email}", ` +
          `from: "${from}") — code: ${code}, message: ${message}`,
      );
      return { success: false, error };
    }

    console.log(
      `[${LOG_CONTEXT}] Welcome email sent successfully for session ${sessionId} -> "${email}". ` +
        `Resend message id: ${data?.id}`,
    );
    return { success: true, id: data?.id };
  } catch (err) {
    logResendError(LOG_CONTEXT, err);
    console.error(
      `[${LOG_CONTEXT}] Unexpected error calling Resend for session ${sessionId} (to: "${email}", from: "${from}"):`,
      err,
    );
    return { success: false, error: err };
  }
}

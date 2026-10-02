/**
 * lib/email/quotaAlerts.ts
 *
 * Transactional "you're approaching/have hit your monthly API quota"
 * emails, sent via Resend — same client/env-var convention as
 * app/api/auth/magic-link/route.ts (RESEND_API_KEY, RESEND_FROM_EMAIL).
 *
 * Called from lib/api/middleware.ts's authenticateApiRequest, i.e. from
 * inside every authenticated /api/v1/* request. Both functions therefore
 * NEVER throw — a Resend outage or missing API key must never be able to
 * fail the customer's actual API call. Idempotency (exactly one email per
 * threshold per billing cycle) is the CALLER's responsibility via the
 * alert:80:<customerId>:<YYYY-MM> / alert:100:<customerId>:<YYYY-MM>
 * Redis locks — see lib/api/middleware.ts's doc comment. This module only
 * knows how to send one email; it has no idea whether one was already
 * sent this month.
 *
 * Each email's call-to-action links through
 * app/api/stripe/portal/redeem — a freshly-minted, single-use, 15-minute
 * token (lib/stripe/portalRedeemToken.ts) that redirects straight into a
 * live Stripe Billing Portal session. See that file's doc comment for why
 * a plain pre-generated portal URL or the existing session-gated
 * /api/stripe/portal route can't be embedded directly in an email.
 */

import { Resend } from "resend";
import { createPortalRedeemToken } from "@/lib/stripe/portalRedeemToken";
import { BASE_URL } from "@/lib/seo";

function readEnv(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Builds a fresh, single-use "straight into Stripe Portal" link for `email`. */
async function buildPortalRedeemUrl(email: string): Promise<string> {
  const token = await createPortalRedeemToken(email);
  return `${BASE_URL}/api/stripe/portal/redeem?token=${encodeURIComponent(token)}`;
}

interface QuotaEmailContent {
  subject: string;
  heading: string;
  bodyLines: string[];
  ctaLabel: string;
  accentColor: string;
}

/**
 * Sends one quota-threshold email. Shared by both exported functions below
 * so the two templates can never drift apart in structure — only in copy
 * and color. Swallows every failure (missing RESEND_API_KEY, Resend API
 * error, network error): logged, never thrown.
 */
async function sendQuotaEmail(email: string, content: QuotaEmailContent): Promise<void> {
  try {
    const apiKey = readEnv("RESEND_API_KEY");
    if (!apiKey) {
      console.error("[lib/email/quotaAlerts] RESEND_API_KEY missing — cannot send quota alert.");
      return;
    }
    const fromEmail = readEnv("RESEND_FROM_EMAIL") || "Internet Culture Hub <onboarding@resend.dev>";
    const portalUrl = await buildPortalRedeemUrl(email);

    const textLines = [content.heading, "", ...content.bodyLines, "", `${content.ctaLabel}: ${portalUrl}`];

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;color:#e4e4e7;background:#0a0a0a;padding:32px 28px;border-radius:16px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${content.accentColor};margin:0 0 16px;">
          Culture Graph API
        </p>
        <h1 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 16px;line-height:1.3;">
          ${escapeHtml(content.heading)}
        </h1>
        ${content.bodyLines
          .map(
            (line) =>
              `<p style="font-size:14px;line-height:1.6;color:#a1a1aa;margin:0 0 12px;">${escapeHtml(line)}</p>`,
          )
          .join("")}
        <a href="${escapeHtml(portalUrl)}"
           style="display:inline-block;margin-top:12px;padding:11px 20px;border-radius:8px;background:${content.accentColor};color:#09090b;font-size:14px;font-weight:600;text-decoration:none;">
          ${escapeHtml(content.ctaLabel)}
        </a>
        <p style="font-size:12px;line-height:1.6;color:#52525b;margin:24px 0 0;">
          This link takes you straight to your Stripe billing portal to upgrade or manage your plan. It expires in
          15 minutes and can only be used once — if it's expired, just visit your
          <a href="${BASE_URL}/dashboard" style="color:#71717a;">dashboard</a> instead.
        </p>
      </div>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: content.subject,
      text: textLines.join("\n"),
      html,
    });

    if (error) {
      console.error("[lib/email/quotaAlerts] Resend API error:", error);
    }
  } catch (err) {
    console.error("[lib/email/quotaAlerts] unexpected error sending quota alert:", err);
  }
}

/**
 * Sends the "you've used 80% of your monthly quota" warning. `usage` and
 * `quota` are raw request counts (not a percentage) so the email can show
 * exact numbers.
 */
export async function send80PercentQuotaAlert(email: string, usage: number, quota: number): Promise<void> {
  await sendQuotaEmail(email, {
    subject: "You've used 80% of your monthly API quota",
    heading: "You're approaching your monthly quota",
    bodyLines: [
      `Your Culture Graph API key has used ${usage.toLocaleString()} of your ${quota.toLocaleString()} requests for this billing cycle (80%).`,
      "Once you hit 100%, further requests will be rejected with a 429 until your next billing cycle starts — upgrade now to avoid any interruption.",
    ],
    ctaLabel: "Upgrade my plan",
    accentColor: "#f59e0b",
  });
}

/**
 * Sends the "you've hit 100% of your monthly quota" notice. Fires on the
 * exact request that reaches the limit (still counted as valid — see
 * lib/api/middleware.ts's doc comment on why this check runs on successful
 * requests), so `usage` here is typically equal to `quota`.
 */
export async function send100PercentQuotaAlert(email: string, usage: number, quota: number): Promise<void> {
  await sendQuotaEmail(email, {
    subject: "You've reached your monthly API quota",
    heading: "You've reached your monthly quota",
    bodyLines: [
      `Your Culture Graph API key has used ${usage.toLocaleString()} of your ${quota.toLocaleString()} requests for this billing cycle.`,
      "Further requests will be rejected with a 429 error until your next billing cycle starts. Upgrade now to restore access immediately.",
    ],
    ctaLabel: "Upgrade my plan now",
    accentColor: "#ef4444",
  });
}

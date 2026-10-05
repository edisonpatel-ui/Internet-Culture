/**
 * lib/email/resendSender.ts
 *
 * Centralized Resend sender-address resolution and error-reporting —
 * previously each email-sending route (magic-link, reset-password, the
 * Stripe webhook's welcome email) duplicated its own slightly-different
 * copy of "resolve the from address" and "log + shape a failure", which is
 * exactly how they drifted out of sync with each other. This is the one
 * place that now owns:
 *
 *   - what the fallback `from` address is when RESEND_FROM_EMAIL isn't set
 *   - the console warning printed when that fallback is actually used
 *   - turning a Resend error (or any thrown error) into a consistent
 *     { code, message } shape
 *   - building the JSON response body for a failed send — the real
 *     message/code in any non-production environment, a generic message
 *     in production
 *
 * Used by: app/api/auth/magic-link/route.ts, app/api/auth/reset-password/route.ts,
 * lib/email/welcomeEmail.ts (the Stripe webhook's welcome email), and
 * scripts/test-resend.ts (which imports it the same way via tsx's
 * tsconfig "@/*" path support — this file has no Next.js-specific
 * dependencies, so it works identically in both contexts).
 */

/** Resend's own shared sandbox sender — works with zero domain setup, but is unverified and has strict deliverability limits. */
export const RESEND_SANDBOX_FALLBACK_FROM = "Culture Intelligence <onboarding@resend.dev>";

export function readEnv(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

/**
 * Resolves the Resend `from` address: `RESEND_FROM_EMAIL` if set (a
 * verified custom domain), falling back to Resend's shared sandbox sender
 * otherwise. Prints an explicit console warning whenever the fallback is
 * used — an unverified sandbox domain sending to an arbitrary external
 * address is exactly the kind of thing that silently fails or lands in
 * spam with no obvious error, so this is loud on purpose.
 *
 * `context` is a short tag (e.g. "auth/magic-link") identifying which
 * caller triggered the warning, since this one function is now shared by
 * several routes and a standalone script.
 */
export function resolveFromAddress(context: string, toEmail?: string): string {
  const configured = readEnv("RESEND_FROM_EMAIL");
  if (configured) return configured;

  console.warn(
    `[${context}] RESEND_FROM_EMAIL is not set — falling back to Resend's shared sandbox sender ` +
      `"${RESEND_SANDBOX_FALLBACK_FROM}"${toEmail ? ` for recipient "${toEmail}"` : ""}. This address is ` +
      "NOT a verified domain: it works for quick testing but has strict deliverability limits (often " +
      "restricted to only your own Resend account email). Set RESEND_FROM_EMAIL to a verified domain " +
      "for production.",
  );
  return RESEND_SANDBOX_FALLBACK_FROM;
}

export interface ResendErrorInfo {
  /** Resend's own error `name` (e.g. "validation_error", "application_error"), or "unknown_error" for a non-Resend-shaped error. */
  code: string;
  message: string;
}

/** Normalizes a Resend API error (or any other thrown value) into a consistent { code, message } shape. */
export function describeResendError(error: unknown): ResendErrorInfo {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message: unknown }).message);
    const rawName = (error as { name?: unknown }).name;
    const code = typeof rawName === "string" && rawName.length > 0 ? rawName : "unknown_error";
    return { code, message };
  }
  return { code: "unknown_error", message: String(error) };
}

const IS_DEV = process.env.NODE_ENV !== "production";

/**
 * Logs a Resend/email-send failure with the exact, greppable
 * "RESEND SDK ERROR:" prefix every caller should use, so it's trivial to
 * find in Vercel's Function logs or a local dev terminal regardless of
 * which route triggered it.
 */
export function logResendError(context: string, error: unknown): void {
  console.error(`[${context}] RESEND SDK ERROR:`, error);
}

/**
 * Builds the JSON response body for a failed send. In any non-production
 * environment, `error`/`code` are the REAL Resend error — visible directly
 * in DevTools' network tab without needing server log access. In
 * production, `error` stays a generic, safe message and `code` is omitted
 * entirely.
 */
export function buildSendFailureBody(genericMessage: string, error: unknown): Record<string, unknown> {
  if (!IS_DEV) return { error: genericMessage };
  const { code, message } = describeResendError(error);
  return { error: message, code };
}

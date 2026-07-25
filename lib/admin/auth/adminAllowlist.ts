/**
 * Admin email allowlist — Edge-safe (no bcrypt).
 */

export function getAllowedAdminEmails(): Set<string> {
  const raw =
    process.env.ADMIN_EMAILS?.trim() ||
    process.env.ADMIN_EMAIL?.trim() ||
    "";
  return new Set(
    raw
      .split(/[,;\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAllowedAdminEmails().has(email.trim().toLowerCase());
}

export function isAdminAuthConfigured(): boolean {
  const emails = getAllowedAdminEmails();
  if (emails.size === 0) return false;
  const hasPassword =
    Boolean(process.env.ADMIN_PASSWORD_HASH?.trim()) ||
    Boolean(process.env.ADMIN_PASSWORD?.trim());
  const hasGoogle = Boolean(
    process.env.AUTH_GOOGLE_ID?.trim() &&
      process.env.AUTH_GOOGLE_SECRET?.trim(),
  );
  const hasSecret = Boolean(process.env.AUTH_SECRET?.trim());
  return hasSecret && (hasPassword || hasGoogle);
}

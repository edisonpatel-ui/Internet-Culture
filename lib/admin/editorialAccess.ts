/**
 * Editorial OS access gate helpers (shared by middleware + unlock page).
 *
 * Auth is not implemented yet. Until SSO/password auth exists:
 * - Set EDITORIAL_OS_TOKEN in the environment.
 * - Visitors must unlock via /admin/experimental/unlock (sets httpOnly cookie;
 *   legacy /editorial-unlock redirects there)
 *   or send Authorization: Bearer <token> / x-editorial-token header.
 * - In production, missing EDITORIAL_OS_TOKEN → editorial routes return 404
 *   (fail closed). Development allows open access when token is unset.
 */

export const EDITORIAL_TOKEN_COOKIE = "ich_editorial_os";
export const EDITORIAL_TOKEN_HEADER = "x-editorial-token";

export function getConfiguredEditorialToken(): string | undefined {
  const raw = process.env.EDITORIAL_OS_TOKEN?.trim();
  return raw || undefined;
}

export function isEditorialAccessConfigured(): boolean {
  return Boolean(getConfiguredEditorialToken());
}

/**
 * Whether the request may enter editorial routes.
 * Development + no token configured → allow (local mock OS).
 * Production + no token configured → deny (fail closed).
 * Token configured → require matching cookie or bearer/header.
 */
export function evaluateEditorialAccess(input: {
  isProduction: boolean;
  cookieToken?: string | null;
  bearerToken?: string | null;
  headerToken?: string | null;
}): { allowed: boolean; reason: string } {
  const expected = getConfiguredEditorialToken();

  if (!expected) {
    if (input.isProduction) {
      return {
        allowed: false,
        reason:
          "EDITORIAL_OS_TOKEN is not set — editorial routes are closed in production until a token (or real auth) is configured.",
      };
    }
    return {
      allowed: true,
      reason: "Development mode with no EDITORIAL_OS_TOKEN — open access.",
    };
  }

  const provided =
    input.cookieToken?.trim() ||
    input.bearerToken?.trim() ||
    input.headerToken?.trim() ||
    "";

  if (provided && provided === expected) {
    return { allowed: true, reason: "Token matched." };
  }

  return {
    allowed: false,
    reason: "Valid EDITORIAL_OS_TOKEN required (cookie, Bearer, or header).",
  };
}

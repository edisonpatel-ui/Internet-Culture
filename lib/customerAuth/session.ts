/**
 * lib/customerAuth/session.ts
 *
 * A separate, purpose-built session mechanism for API customers (buyers
 * managing their key/billing at /dashboard) — intentionally NOT the same
 * system as `auth.ts` (NextAuth), which is reserved for admin/editorial
 * login (Google + admin credentials, see lib/admin/auth/). Mixing the two
 * would conflate two different user models (admins have an email
 * allowlist; customers have a Stripe subscription + API key), so this
 * stays independent end-to-end: its own cookie, its own secret, its own
 * verification.
 *
 * The session cookie carries a compact signed payload — `base64(json).
 * hmacSha256Hex(base64(json))` — verified with a timing-safe comparison.
 * No server-side session store is needed; the cookie IS the session,
 * bounded by `exp`.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "ci_session";
/**
 * Non-secret, JS-readable companion cookie used ONLY to let client
 * components (e.g. the header's "Log In" vs "Dashboard" CTA) branch on
 * login state without a server round-trip. It carries no session data and
 * is never trusted for authorization — every protected route/page
 * independently re-verifies the real, httpOnly `SESSION_COOKIE_NAME`
 * cookie server-side regardless of whether this hint is present.
 */
export const SESSION_HINT_COOKIE_NAME = "ci_session_hint";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface SessionPayload {
  email: string;
  /** Unix seconds expiry. */
  exp: number;
}

function getSecret(): string {
  const secret = process.env.CUSTOMER_SESSION_SECRET ?? process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "[lib/customerAuth/session] Missing CUSTOMER_SESSION_SECRET (or AUTH_SECRET as a fallback). " +
        "Set one in your environment — see .env.example.",
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

/** Builds a signed cookie value for `payload`. Does not set the cookie itself. */
function serializeSession(payload: SessionPayload): string {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

/** Verifies and decodes a session cookie value. Returns null if invalid, malformed, or expired. */
function parseSession(cookieValue: string | undefined): SessionPayload | null {
  if (!cookieValue) return null;
  const [encoded, signature] = cookieValue.split(".");
  if (!encoded || !signature) return null;

  const expectedSignature = sign(encoded);
  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expectedSignature, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.email !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Sets the signed session cookie (+ the non-sensitive UI hint cookie) for `email`. */
export async function createSession(email: string): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const value = serializeSession({ email, exp });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  cookieStore.set(SESSION_HINT_COOKIE_NAME, "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

/** Clears both session cookies (logout). */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(SESSION_HINT_COOKIE_NAME);
}

/** Reads and verifies the current request's session. Returns null if absent/invalid/expired. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return parseSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export type CustomerGateResult = { ok: true; email: string } | { ok: false };

/** Server-side gate for customer-only pages/routes (mirrors requireAdminSession's shape). */
export async function requireCustomerSession(): Promise<CustomerGateResult> {
  const session = await getSession();
  if (!session) return { ok: false };
  return { ok: true, email: session.email };
}

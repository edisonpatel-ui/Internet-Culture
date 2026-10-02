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
 * No server-side session store is needed for the normal case; the cookie
 * IS the session, bounded by `exp`.
 *
 * The one thing a pure signed cookie can never do on its own is
 * "Log out everywhere" (app/api/customer/account/route.ts POST) — a valid,
 * unexpired signature is valid forever, on every device it was ever
 * copied to, until `exp`. To support revocation without giving up the
 * "no server-side session store" property for the common case, each
 * payload also carries `iat` (issued-at), and there's a SINGLE small piece
 * of server state per customer: `session:epoch:<email>` in Upstash Redis —
 * a Unix-seconds "nothing issued before this counts" watermark. Every
 * getSession() call does one extra Redis read to check `iat` against it;
 * revokeAllSessions() is the only thing that ever writes it. An email with
 * no epoch set (the overwhelming common case — nobody has ever revoked)
 * costs one Redis GET that returns null and short-circuits to "valid".
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

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
  /** Unix seconds this session was issued — checked against session:epoch:<email> (see module doc comment). */
  iat: number;
}

let cachedRedis: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedRedis) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/customerAuth/session] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

const SESSION_EPOCH_PREFIX = "session:epoch:";
/**
 * Comfortably longer than SESSION_TTL_SECONDS (30 days) so the epoch can
 * never expire while a pre-revocation cookie issued just before it was set
 * could still otherwise be valid — the epoch must outlive every cookie it
 * might need to reject.
 */
const SESSION_EPOCH_TTL_SECONDS = 60 * 60 * 24 * 60; // 60 days

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Reads the current revocation watermark for `email`. 0 (never revoked) if unset. */
async function getSessionEpoch(email: string): Promise<number> {
  const redis = getRedisClient();
  const epoch = await redis.get<number>(`${SESSION_EPOCH_PREFIX}${normalizeEmail(email)}`);
  return typeof epoch === "number" && Number.isFinite(epoch) ? epoch : 0;
}

/**
 * Invalidates every session cookie for `email` issued before right now —
 * "Log out everywhere" (app/api/customer/account/route.ts POST). Does NOT
 * clear the caller's own cookie; callers that want the current device
 * logged out too should also call destroySession() (which that route
 * does), since this only affects future verification, not the cookie
 * already sitting in this response's request.
 */
export async function revokeAllSessions(email: string): Promise<void> {
  const redis = getRedisClient();
  const now = Math.floor(Date.now() / 1000);
  await redis.set(`${SESSION_EPOCH_PREFIX}${normalizeEmail(email)}`, now, {
    ex: SESSION_EPOCH_TTL_SECONDS,
  });
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
    // A cookie signed before `iat` existed (issued by a previous deploy) has
    // no iat field at all — treat that the same as iat=0, i.e. it's subject
    // to revocation like everything else, never exempt from it.
    if (typeof payload.iat !== "number") payload.iat = 0;
    return payload;
  } catch {
    return null;
  }
}

/** Sets the signed session cookie (+ the non-sensitive UI hint cookie) for `email`. */
export async function createSession(email: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + SESSION_TTL_SECONDS;
  const value = serializeSession({ email, exp, iat: now });
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

/**
 * Reads and verifies the current request's session. Returns null if
 * absent, badly signed, expired, or revoked (issued before the account's
 * session:epoch watermark — see revokeAllSessions).
 *
 * The epoch check fails OPEN on a Redis error (logged, not thrown): a
 * signature/expiry failure means "this cookie is definitely invalid", but
 * an Upstash outage means "we can't tell" — and locking every customer out
 * of their own dashboard because Redis hiccuped is worse than the (small,
 * time-boxed) risk of a should-have-been-revoked session staying valid for
 * the duration of the outage.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = parseSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return null;

  try {
    const epoch = await getSessionEpoch(session.email);
    if (session.iat < epoch) return null;
  } catch (err) {
    console.error("[lib/customerAuth/session] session-epoch check failed, failing open:", err);
  }

  return session;
}

export type CustomerGateResult = { ok: true; email: string } | { ok: false };

/** Server-side gate for customer-only pages/routes (mirrors requireAdminSession's shape). */
export async function requireCustomerSession(): Promise<CustomerGateResult> {
  const session = await getSession();
  if (!session) return { ok: false };
  return { ok: true, email: session.email };
}

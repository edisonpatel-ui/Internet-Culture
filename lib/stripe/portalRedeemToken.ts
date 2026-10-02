/**
 * lib/stripe/portalRedeemToken.ts
 *
 * Short-lived, single-use tokens that let a transactional email
 * (lib/email/quotaAlerts.ts's 80%/100% quota alerts) link DIRECTLY into a
 * fresh Stripe Billing Portal session — genuinely "1-click", no login step
 * required first.
 *
 * Why this exists instead of just linking to a Stripe Portal URL, or to
 * the existing session-gated app/api/stripe/portal route:
 *  - A Stripe Billing Portal session URL is itself short-lived (Stripe
 *    expires it quickly) and single-access. Pre-generating one at
 *    alert-send time and embedding it directly in the email would very
 *    often be dead by the time the customer actually opens their inbox.
 *  - app/api/stripe/portal is a POST route gated on the customer's
 *    `ci_session` cookie — correct for a same-session "Manage Billing"
 *    button, but not something an <a href> in an email can drive (it's a
 *    GET navigation, and the customer may not have an active session on
 *    the device they read email on).
 *
 * This closes that gap the standard way: a random, unguessable,
 * short-lived, single-use token that a dedicated GET route
 * (app/api/stripe/portal/redeem) exchanges for one freshly-created Stripe
 * Portal session immediately, then discards. It grants no standing
 * access — it's consumed and gone on first use, and expires in 15 minutes
 * even if never clicked.
 *
 * Storage model: portal-redeem:<token> → email (Redis, 15-minute TTL).
 * Same shape as lib/customerAuth/magicLinkStore.ts on purpose.
 */

import { randomBytes } from "node:crypto";
import { Redis } from "@upstash/redis";

const TOKEN_KEY_PREFIX = "portal-redeem:";
const TOKEN_TTL_SECONDS = 60 * 15; // 15 minutes

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/stripe/portalRedeemToken] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Generates and stores a new redeem token for `email`. Returns the raw token to embed in the emailed link. */
export async function createPortalRedeemToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const redis = getRedisClient();
  await redis.set(`${TOKEN_KEY_PREFIX}${token}`, email.trim().toLowerCase(), {
    ex: TOKEN_TTL_SECONDS,
  });
  return token;
}

/**
 * Verifies and consumes a redeem token, returning the associated email (or
 * null if missing, expired, or already used). Deletes the token
 * immediately so it cannot be replayed even within its TTL window.
 */
export async function consumePortalRedeemToken(token: string): Promise<string | null> {
  const redis = getRedisClient();
  const key = `${TOKEN_KEY_PREFIX}${token}`;
  const email = await redis.get<string>(key);
  if (!email) return null;
  await redis.del(key);
  return email;
}

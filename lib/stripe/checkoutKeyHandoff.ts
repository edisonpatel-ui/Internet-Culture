/**
 * lib/stripe/checkoutKeyHandoff.ts
 *
 * Short-lived handoff of a freshly-issued raw API key from the Stripe
 * webhook (which runs server-to-server, with no browser present) to the
 * checkout success page (which the customer's browser loads right after
 * paying). The raw key itself is never stored long-term anywhere — see
 * lib/api/keys.ts, which only ever persists its SHA-256 hash.
 *
 * Storage model:
 *   checkout_session:<sessionId> → raw key string, TTL 10 minutes.
 *   Read via GETDEL semantics conceptually, but implemented as GET only
 *   (not delete-on-read): the success page may re-render or the customer
 *   may refresh once before copying the key, and the 10-minute TTL is
 *   already what bounds the exposure window.
 */

import { Redis } from "@upstash/redis";

const HANDOFF_KEY_PREFIX = "checkout_session:";
const HANDOFF_TTL_SECONDS = 600; // 10 minutes

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "[lib/stripe/checkoutKeyHandoff] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    );
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Called by the webhook once a key has been issued for a completed session. */
export async function storeCheckoutSessionKey(sessionId: string, rawKey: string): Promise<void> {
  const redis = getRedisClient();
  await redis.set(`${HANDOFF_KEY_PREFIX}${sessionId}`, rawKey, { ex: HANDOFF_TTL_SECONDS });
}

/** Called by the checkout success page's API route to display the key once. */
export async function getCheckoutSessionKey(sessionId: string): Promise<string | null> {
  const redis = getRedisClient();
  const rawKey = await redis.get<string>(`${HANDOFF_KEY_PREFIX}${sessionId}`);
  return rawKey ?? null;
}

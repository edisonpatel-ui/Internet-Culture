/**
 * lib/stripe/eventClaims.ts
 *
 * Idempotency for Stripe webhooks. Stripe delivers events at-least-once and
 * retries on non-2xx, so a handler can run twice for the same event (or two
 * different events can describe the same checkout). Without a guard, a retry
 * of checkout.session.completed would issue a SECOND API key, revoke the
 * first, and send a second welcome email.
 *
 * `claim` does SET NX with a TTL — the first caller wins. If the handler then
 * fails, the caller `release`s so Stripe's retry can run again.
 */

import { Redis } from "@upstash/redis";

const CLAIM_PREFIX = "stripe_claim:";
const DEFAULT_TTL_SECONDS = 7 * 24 * 60 * 60; // Stripe retries for up to ~3 days

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/stripe/eventClaims] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Returns true if this caller is the first to claim `id`; false if already claimed. */
export async function claim(id: string, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<boolean> {
  const result = await getRedisClient().set(`${CLAIM_PREFIX}${id}`, "1", { nx: true, ex: ttlSeconds });
  return result === "OK";
}

/** Frees a claim after a failed handler so Stripe's retry can re-run it. */
export async function release(id: string): Promise<void> {
  await getRedisClient().del(`${CLAIM_PREFIX}${id}`);
}

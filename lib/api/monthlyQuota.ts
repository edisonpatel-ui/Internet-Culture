/**
 * lib/api/monthlyQuota.ts
 *
 * Monthly request-quota tracking for paid tiers (starter: 25,000/mo, pro:
 * 250,000/mo — see lib/api/keys.ts). Separate from the per-minute burst
 * limiter in lib/api/validateRequest.ts, which exists only to smooth out
 * spikes; this is the actual billing-relevant quota a customer paid for.
 *
 * Storage model:
 *   quota:<hashedKey>:<YYYY-MM>  → Redis integer counter (INCR), with an
 *   expiry set only on first increment of the month so the key
 *   self-cleans a few days into the next month rather than growing forever.
 */

import { Redis } from "@upstash/redis";

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "[lib/api/monthlyQuota] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    );
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Current UTC billing-month bucket, e.g. "2026-09". */
function currentMonthKey(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Seconds remaining until a few days into next UTC month — self-cleaning TTL. */
function secondsUntilQuotaExpiry(): number {
  const now = new Date();
  const nextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 3));
  return Math.max(60, Math.floor((nextMonth.getTime() - now.getTime()) / 1000));
}

export interface QuotaCheckResult {
  /** true if usage is within quota (or quota is unlimited). */
  withinQuota: boolean;
  used: number;
  /** null when the tier has no monthly cap. */
  limit: number | null;
  remaining: number | null;
}

/**
 * Atomically increments this key's usage for the current calendar month and
 * reports whether it's still within `monthlyLimit`. Pass `monthlyLimit:
 * null` for unlimited tiers — the counter is still incremented (useful for
 * reporting/analytics) but never blocks the request.
 *
 * Increment-then-check (not check-then-increment) so concurrent requests
 * near the boundary can't all slip through — the request that pushes usage
 * over the limit is the one that gets denied, not one after it.
 */
export async function incrementAndCheckMonthlyQuota(
  hashedKey: string,
  monthlyLimit: number | null,
): Promise<QuotaCheckResult> {
  const redis = getRedisClient();
  const key = `quota:${hashedKey}:${currentMonthKey()}`;

  const used = await redis.incr(key);
  if (used === 1) {
    // First request this month for this key — set self-cleaning expiry.
    await redis.expire(key, secondsUntilQuotaExpiry());
  }

  if (monthlyLimit === null) {
    return { withinQuota: true, used, limit: null, remaining: null };
  }

  const remaining = Math.max(0, monthlyLimit - used);
  return { withinQuota: used <= monthlyLimit, used, limit: monthlyLimit, remaining };
}

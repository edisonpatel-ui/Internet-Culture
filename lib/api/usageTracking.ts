/**
 * lib/api/usageTracking.ts
 *
 * The per-request bookkeeping for an authenticated API call, done in ONE
 * pipelined Upstash round trip instead of three-to-five separate requests:
 *
 *   INCR quota:<key>:<YYYY-MM>             monthly quota (lib/api/monthlyQuota.ts)
 *   INCR usage:daily:<key>:<YYYY-MM-DD>    dashboard usage chart (lib/api/metrics.ts)
 *   INCR usage:status:<key>:<YYYY-MM>:200  dashboard status breakdown
 *
 * The status counter is incremented optimistically as 200. The only way the
 * request is not a 200 at this point is a monthly-quota overrun, which is
 * rare; in that case a small corrective pipeline moves one count from the
 * 200 bucket to the 429 bucket, so the stored analytics are identical to
 * what the previous sequential implementation produced.
 *
 * TTLs (expire) are only issued the first time a bucket is created — once a
 * day / once a month per key — in a second pipeline that the steady-state
 * request never pays for.
 *
 * Note for Upstash billing: a pipeline saves latency and HTTP requests; each
 * command inside it is still one command. The command savings on this path
 * come from not re-reading the key record (lib/api/keyCache.ts) and not
 * issuing per-bucket EXPIREs on every request.
 */

import { getSharedRedis } from "@/lib/api/redisClient";
import { quotaKey, secondsUntilQuotaExpiry, type QuotaCheckResult } from "@/lib/api/monthlyQuota";
import { dailyUsageKey, statusUsageKey, DAILY_TTL_SECONDS, STATUS_TTL_SECONDS } from "@/lib/api/metrics";

/**
 * Counts one authenticated request against `hashedKey`'s monthly quota and
 * usage analytics. `monthlyLimit: null` means uncapped (counted, never blocked).
 * Throws on a Redis failure so the caller can fail closed.
 */
export async function trackAuthorizedRequest(
  hashedKey: string,
  monthlyLimit: number | null,
): Promise<QuotaCheckResult> {
  const redis = getSharedRedis();
  const qKey = quotaKey(hashedKey);
  const dKey = dailyUsageKey(hashedKey);
  const s200Key = statusUsageKey(hashedKey, 200);

  const [used, dailyCount, status200Count] = (await redis
    .pipeline()
    .incr(qKey)
    .incr(dKey)
    .incr(s200Key)
    .exec()) as [number, number, number];

  const overQuota = monthlyLimit !== null && used > monthlyLimit;

  // Follow-up writes, batched into one pipeline and only when needed.
  const followUp = redis.pipeline();
  let hasFollowUp = false;

  if (used === 1) {
    followUp.expire(qKey, secondsUntilQuotaExpiry());
    hasFollowUp = true;
  }
  if (dailyCount === 1) {
    followUp.expire(dKey, DAILY_TTL_SECONDS);
    hasFollowUp = true;
  }
  if (status200Count === 1) {
    followUp.expire(s200Key, STATUS_TTL_SECONDS);
    hasFollowUp = true;
  }
  if (overQuota) {
    const s429Key = statusUsageKey(hashedKey, 429);
    followUp.decr(s200Key);
    followUp.incr(s429Key);
    followUp.expire(s429Key, STATUS_TTL_SECONDS); // idempotent; only runs on the rare overrun path
    hasFollowUp = true;
  }

  if (hasFollowUp) {
    try {
      await followUp.exec();
    } catch (err) {
      // Bookkeeping only — the quota decision below does not depend on it.
      console.error("[lib/api/usageTracking] follow-up pipeline failed:", err);
    }
  }

  if (monthlyLimit === null) {
    return { withinQuota: true, used, limit: null, remaining: null };
  }
  return {
    withinQuota: !overQuota,
    used,
    limit: monthlyLimit,
    remaining: Math.max(0, monthlyLimit - used),
  };
}

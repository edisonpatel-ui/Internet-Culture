/**
 * lib/api/metrics.ts
 *
 * Per-customer API usage analytics, feeding the dashboard usage chart
 * (app/api/dashboard/usage/route.ts, components/dashboard/UsageChart.tsx)
 * and the quota-alert threshold check (lib/api/middleware.ts,
 * lib/email/quotaAlerts.ts). Entirely additive — a new Redis namespace,
 * touches no existing key.
 *
 * `customerId` here is the SAME identifier lib/api/monthlyQuota.ts already
 * uses: the API key's SHA-256 hash (`hashedKey`), not the customer's email.
 * Reusing it keeps this file consistent with the one identity axis the API
 * request path already has at hand (lib/api/validateRequest.ts never sees
 * an email, only a hashed key) and gives usage analytics the same
 * "regenerating your key starts fresh" semantics monthly quota already
 * has — documented there, not a new behavior invented here.
 *
 * Storage model:
 *   usage:daily:<customerId>:<YYYY-MM-DD>        → Redis integer counter
 *     (INCR), 60-day TTL set on first increment of that day (self-cleaning,
 *     comfortably outlives the 30-day chart window this feeds).
 *   usage:status:<customerId>:<YYYY-MM>:<status> → Redis integer counter
 *     (INCR) per HTTP status code seen this calendar month, 60-day TTL set
 *     on first increment of that (month, status) pair — long enough that a
 *     dashboard viewed a few days into the next month can still show last
 *     month's error-rate breakdown, then self-cleans.
 */

import { Redis } from "@upstash/redis";

const DAILY_TTL_SECONDS = 60 * 60 * 24 * 60; // 60 days
const STATUS_TTL_SECONDS = 60 * 60 * 24 * 60; // 60 days

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/api/metrics] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** UTC YYYY-MM-DD for `date` (defaults to now). */
function dateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** UTC YYYY-MM for `date` (defaults to now). */
function monthKey(date: Date = new Date()): string {
  return dateKey(date).slice(0, 7);
}

/**
 * Records one API call against `customerId`'s usage analytics: increments
 * today's daily counter and this month's per-status counter. Never
 * throws — analytics must never be able to fail the request it's
 * instrumenting; a Redis hiccup here is logged and swallowed, matching the
 * existing incrementApiViewCount convention (lib/api/viewCounters.ts).
 */
export async function recordApiMetric(customerId: string, status: number): Promise<void> {
  try {
    const redis = getRedisClient();
    const dailyRedisKey = `usage:daily:${customerId}:${dateKey()}`;
    const statusRedisKey = `usage:status:${customerId}:${monthKey()}:${status}`;

    const [dailyCount, statusCount] = await Promise.all([
      redis.incr(dailyRedisKey),
      redis.incr(statusRedisKey),
    ]);

    const expirySets: Promise<unknown>[] = [];
    if (dailyCount === 1) expirySets.push(redis.expire(dailyRedisKey, DAILY_TTL_SECONDS));
    if (statusCount === 1) expirySets.push(redis.expire(statusRedisKey, STATUS_TTL_SECONDS));
    if (expirySets.length > 0) await Promise.all(expirySets);
  } catch (err) {
    console.error("[lib/api/metrics] recordApiMetric failed:", err);
  }
}

export interface DailyUsagePoint {
  /** YYYY-MM-DD, UTC. */
  date: string;
  count: number;
}

/**
 * Reads the last `days` days of daily usage for `customerId`, oldest
 * first, including days with zero recorded requests (a full, gap-free
 * series is what the dashboard chart wants to render). Read-only — never
 * increments anything, and never throws (an Upstash hiccup degrades to an
 * all-zero series rather than breaking the dashboard page).
 */
export async function getDailyUsageSeries(customerId: string, days = 30): Promise<DailyUsagePoint[]> {
  const dates: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    dates.push(dateKey(d));
  }
  if (dates.length === 0) return [];

  try {
    const redis = getRedisClient();
    const keys = dates.map((date) => `usage:daily:${customerId}:${date}`);
    const counts = await redis.mget<(number | null)[]>(...keys);
    return dates.map((date, i) => ({ date, count: counts[i] ?? 0 }));
  } catch (err) {
    console.error("[lib/api/metrics] getDailyUsageSeries failed:", err);
    return dates.map((date) => ({ date, count: 0 }));
  }
}

export interface StatusBreakdown {
  /** HTTP status code (as a string key) -> request count, for the given month. */
  byStatus: Record<string, number>;
  total: number;
  /** Percentage (0-100, one decimal place) of this month's recorded requests with status >= 400. */
  errorPercentage: number;
}

const EMPTY_BREAKDOWN: StatusBreakdown = { byStatus: {}, total: 0, errorPercentage: 0 };

/**
 * Reads this customer's per-status request breakdown for `date`'s calendar
 * month (defaults to the current month). Uses a Redis KEYS scan scoped to
 * this one customer+month — bounded (a handful of distinct status codes
 * ever appear per key) and safe to run on every dashboard load. Never
 * throws; degrades to an empty (0%) breakdown on any Redis error.
 */
export async function getMonthlyStatusBreakdown(
  customerId: string,
  date: Date = new Date(),
): Promise<StatusBreakdown> {
  try {
    const redis = getRedisClient();
    const pattern = `usage:status:${customerId}:${monthKey(date)}:*`;
    const keys = await redis.keys(pattern);
    if (keys.length === 0) return EMPTY_BREAKDOWN;

    const counts = await redis.mget<(number | null)[]>(...keys);
    const byStatus: Record<string, number> = {};
    let total = 0;
    let errors = 0;

    keys.forEach((key, i) => {
      const status = key.slice(key.lastIndexOf(":") + 1);
      const count = counts[i] ?? 0;
      byStatus[status] = count;
      total += count;
      if (Number(status) >= 400) errors += count;
    });

    const errorPercentage = total > 0 ? Math.round((errors / total) * 1000) / 10 : 0;
    return { byStatus, total, errorPercentage };
  } catch (err) {
    console.error("[lib/api/metrics] getMonthlyStatusBreakdown failed:", err);
    return EMPTY_BREAKDOWN;
  }
}

/**
 * Permanently deletes every usage-analytics key for `customerId` — daily
 * counters (all 60 days' worth) and this-month's status counters. Used by
 * account deletion (app/api/customer/account/route.ts) so a purged
 * account's analytics don't linger for the rest of their TTL. Never
 * throws; best-effort cleanup, logged on failure.
 */
export async function purgeUsageMetrics(customerId: string): Promise<void> {
  try {
    const redis = getRedisClient();
    const keys = await redis.keys(`usage:*:${customerId}:*`);
    if (keys.length === 0) return;
    await Promise.all(keys.map((key) => redis.del(key)));
  } catch (err) {
    console.error("[lib/api/metrics] purgeUsageMetrics failed:", err);
  }
}

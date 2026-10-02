/**
 * lib/api/middleware.ts
 *
 * Centralized authentication + tier rate-limiting for every route under
 * /app/api/v1/*. This is a thin, error-throwing wrapper around the actual
 * Redis/hash/rate-limit implementation in lib/api/validateRequest.ts — that
 * module already does the real work (bearer extraction, SHA-256 lookup,
 * @upstash/ratelimit sliding window per tier, monthly quota enforcement)
 * and is reused as-is here rather than duplicated, so there is exactly one
 * place that talks to Redis for auth.
 *
 * What this module adds on top: the uniform error contract requested for
 * Phase B — instead of a route branching on a `{ valid: false, ... }`
 * result shape, it throws UnauthorizedError / RateLimitError (see
 * lib/api/errors.ts), so every route's catch block collapses to a single
 * `return formatApiError(err)`.
 *
 * Usage in a route:
 *   export async function GET(request: Request) {
 *     try {
 *       const auth = await authenticateApiRequest(request);
 *       ... use auth.tier / auth.owner ...
 *       return withRateLimitHeaders(NextResponse.json(...), auth);
 *     } catch (err) {
 *       return formatApiError(err);
 *     }
 *   }
 *
 * Tier burst limits (enforced inside validateApiRequest via
 * lib/api/keys.ts's TIER_RATE_LIMITS, the single source of truth so this
 * file never hardcodes its own copy): Free 10/min, Starter 100/min,
 * Pro 1000/min.
 *
 * Phase 3 additions, both living in this one chokepoint so every route
 * under /api/v1/* gets them automatically with zero per-route changes:
 *
 *  - Usage analytics (lib/api/metrics.ts): every request that resolved to
 *    a real key record — success, rate-limited, or quota-exceeded — is
 *    recorded against that key's hash. An unrecognized key (401, no
 *    record found) records nothing; there's no real customer to
 *    attribute it to. The recorded status reflects the AUTH-LAYER
 *    outcome (200/429), not whatever a route's own business logic later
 *    decides (a 404 for an unknown slug, say) — deliberately: a
 *    customer's quota is consumed, and their dashboard usage chart should
 *    reflect that, the moment a request clears authentication, regardless
 *    of what the route does with it afterward.
 *
 *  - Quota-threshold alerts (lib/email/quotaAlerts.ts): checked only on
 *    SUCCESSFUL requests, using the just-computed monthly-usage numbers.
 *    Because incrementAndCheckMonthlyQuota (lib/api/monthlyQuota.ts)
 *    increments-then-checks, the exact request that pushes usage to
 *    100% is still "valid" (used <= limit) — so both the 80% and the
 *    100% crossing are always observed here as successful requests; only
 *    requests that arrive AFTER the cap is already exceeded become 429s.
 *    Idempotency is enforced with a Redis SET NX lock per
 *    (customer, threshold, billing month) — alert:80:<hashedKey>:<YYYY-MM>
 *    / alert:100:<hashedKey>:<YYYY-MM>, 32-day TTL (comfortably outlives
 *    any calendar month so it can never fire twice before the next
 *    cycle's key naturally differs). Only paid tiers ever have a
 *    monthlyLimit, so free/admin-issued keys never trigger this.
 */

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { validateApiRequest } from "@/lib/api/validateRequest";
import { UnauthorizedError, RateLimitError } from "@/lib/api/errors";
import type { ApiKeyTier } from "@/lib/api/keys";
import { recordApiMetric } from "@/lib/api/metrics";
import { send80PercentQuotaAlert, send100PercentQuotaAlert } from "@/lib/email/quotaAlerts";

export interface AuthContext {
  owner: string;
  tier: ApiKeyTier;
  limit: number;
  remaining: number;
  monthlyLimit: number | null;
  monthlyRemaining: number | null;
}

function rateLimitHeaders(limit?: number, remaining?: number): Record<string, string> {
  const headers: Record<string, string> = {};
  if (typeof limit === "number") headers["X-RateLimit-Limit"] = String(limit);
  if (typeof remaining === "number") headers["X-RateLimit-Remaining"] = String(Math.max(0, remaining));
  return headers;
}

let cachedRedis: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedRedis) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/api/middleware] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

/** 32 days — comfortably longer than any calendar month, so a lock set near a month's end can never still be held when the next month's key is checked. */
const ALERT_LOCK_TTL_SECONDS = 60 * 60 * 24 * 32;

/** Current UTC YYYY-MM, matching lib/api/metrics.ts's month-key convention. */
function currentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

/**
 * Attempts to claim the one-per-(customer, threshold, month) alert lock.
 * Returns true only for the caller that actually claims it (Redis SET NX),
 * i.e. true means "you are the one request that should send this email" —
 * every subsequent request this month for the same customer+threshold
 * gets false and sends nothing. Fails CLOSED (returns false) on a Redis
 * error: better to silently skip one alert than to risk spamming the
 * customer because a lock check that should have blocked a duplicate
 * couldn't be verified.
 */
async function tryClaimAlertLock(threshold: 80 | 100, hashedKey: string): Promise<boolean> {
  try {
    const redis = getRedisClient();
    const key = `alert:${threshold}:${hashedKey}:${currentMonthKey()}`;
    const result = await redis.set(key, "1", { nx: true, ex: ALERT_LOCK_TTL_SECONDS });
    return result === "OK";
  } catch (err) {
    console.error(`[lib/api/middleware] alert lock check failed for threshold ${threshold}:`, err);
    return false;
  }
}

/**
 * Checks a successful request's monthly usage against the 80%/100%
 * thresholds and fires the corresponding one-time email if just crossed.
 * `owner` doubles as the customer's email here — true for every tier that
 * ever has a monthlyLimit (starter/pro; see lib/customer/store.ts), which
 * is the only case this function does anything for. Never throws: both
 * the lock check and the email send already swallow their own errors, so
 * this is purely a best-effort side effect of a successful request, never
 * something that can turn a 200 into a 500.
 */
async function checkQuotaThresholds(
  owner: string,
  hashedKey: string,
  monthlyLimit: number | null,
  monthlyRemaining: number | null,
): Promise<void> {
  if (monthlyLimit == null || monthlyRemaining == null) return; // free/admin tier — no monthly cap, nothing to alert on

  const used = monthlyLimit - monthlyRemaining;
  const percentage = (used / monthlyLimit) * 100;

  if (percentage >= 100) {
    if (await tryClaimAlertLock(100, hashedKey)) {
      await send100PercentQuotaAlert(owner, used, monthlyLimit);
    }
    return; // 100% implies 80% already happened on an earlier request — no need to also check it here
  }

  if (percentage >= 80) {
    if (await tryClaimAlertLock(80, hashedKey)) {
      await send80PercentQuotaAlert(owner, used, monthlyLimit);
    }
  }
}

/**
 * Verifies the request's `Authorization: Bearer cg_live_...` header against
 * Upstash Redis and enforces this key's tier burst limit + monthly quota.
 *
 * On success, returns the resolved auth context. On failure, throws:
 *   - UnauthorizedError (401) — missing/malformed header, or the key
 *     doesn't exist in Redis.
 *   - RateLimitError (429) — burst limit or monthly quota exceeded; the
 *     error carries the same X-RateLimit-* headers a success response
 *     would, so a 429 still reports where the caller stands.
 *
 * Callers should let this throw and catch it once at the route's top
 * level with formatApiError — see the module doc comment above.
 */
export async function authenticateApiRequest(request: Request): Promise<AuthContext> {
  const result = await validateApiRequest(request);

  if (!result.valid) {
    // Only a recognized key (rate-limited/quota-exceeded) has a customer to
    // attribute this to — an unknown key gets no metric, see module doc.
    if (result.hashedKey) {
      await recordApiMetric(result.hashedKey, result.status);
    }
    const headers = rateLimitHeaders(result.limit, result.remaining);
    if (result.status === 429) {
      throw new RateLimitError(result.error, headers);
    }
    throw new UnauthorizedError(result.error, headers);
  }

  await recordApiMetric(result.hashedKey, 200);
  await checkQuotaThresholds(result.owner, result.hashedKey, result.monthlyLimit, result.monthlyRemaining);

  return {
    owner: result.owner,
    tier: result.tier,
    limit: result.limit,
    remaining: result.remaining,
    monthlyLimit: result.monthlyLimit,
    monthlyRemaining: result.monthlyRemaining,
  };
}

/** Attaches standard rate-limit + quota headers to a successful response. */
export function withRateLimitHeaders(response: NextResponse, auth: AuthContext): NextResponse {
  response.headers.set("X-RateLimit-Limit", String(auth.limit));
  response.headers.set("X-RateLimit-Remaining", String(Math.max(0, auth.remaining)));
  if (auth.monthlyLimit != null) {
    response.headers.set("X-Quota-Limit", String(auth.monthlyLimit));
  }
  if (auth.monthlyRemaining != null) {
    response.headers.set("X-Quota-Remaining", String(Math.max(0, auth.monthlyRemaining)));
  }
  return response;
}

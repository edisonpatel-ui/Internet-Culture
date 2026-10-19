/**
 * lib/api/validateRequest.ts
 *
 * Single entry point for authenticating + rate-limiting requests to the
 * public v1 API (app/api/v1/**). Every public route should call
 * `validateApiRequest(request)` first and return immediately on failure.
 *
 * Flow:
 *  1. Extract the bearer token from `Authorization: Bearer <key>`.
 *  2. SHA-256 hash it (never look up or log the raw key).
 *  3. Look up `apikey:<hashedKey>` (lib/api/keys.ts) — served from a
 *     5-minute in-memory LRU on warm instances, Upstash Redis otherwise.
 *  4. Run @upstash/ratelimit — a sliding window keyed on the *hashed* key,
 *     sized by the key's stored tier — to smooth out short bursts.
 *  5. Enforce the tier's monthly request quota and record usage analytics in
 *     ONE pipelined round trip (lib/api/usageTracking.ts). Tier numbers come
 *     from lib/config/subscriptions.ts.
 *
 * Defensive by default: any missing header, malformed token, unknown key,
 * or Redis/config error returns a 401 rather than throwing, so a public
 * route can never accidentally leak an internal error into a 500 that
 * bypasses auth.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getApiKeyRecord, hashApiKey, TIER_MONTHLY_QUOTAS, TIER_RATE_LIMITS, type ApiKeyTier } from "@/lib/api/keys";
import { recordApiMetric } from "@/lib/api/metrics";
import { trackAuthorizedRequest } from "@/lib/api/usageTracking";

export interface ValidationSuccess {
  valid: true;
  owner: string;
  tier: ApiKeyTier;
  /** Per-minute burst limit/remaining (X-RateLimit-* headers). */
  limit: number;
  remaining: number;
  /** Monthly quota, null for tiers with no cap (e.g. free/admin-issued). */
  monthlyLimit: number | null;
  monthlyRemaining: number | null;
  /**
   * SHA-256 hash of the validated key — the identifier lib/api/metrics.ts
   * (usage analytics) and lib/api/monthlyQuota.ts (quota) both key on.
   * Exposed so lib/api/middleware.ts can record usage/trigger quota alerts
   * without re-deriving or re-hashing anything.
   */
  hashedKey: string;
}

export interface ValidationFailure {
  valid: false;
  status: 401 | 429;
  error: string;
  /** Present on 429s, for surfacing rate-limit headers upstream. */
  limit?: number;
  remaining?: number;
  monthlyLimit?: number | null;
  monthlyRemaining?: number | null;
  /**
   * Present only when a real key record was found (rate-limited/quota-
   * exceeded 429s) — absent for an unrecognized key (401), since there's
   * no real customer to attribute a metric to in that case.
   */
  hashedKey?: string;
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

let cachedRedis: Redis | null = null;
/** One Ratelimit instance per tier, cached across invocations (serverless-warm-safe). */
const limiterCache = new Map<ApiKeyTier, Ratelimit>();
/** Shared in-memory block list for @upstash/ratelimit's `ephemeralCache` option. */
const ephemeralBlockCache = new Map<string, number>();

function getRedisClient(): Redis {
  if (cachedRedis) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "[lib/api/validateRequest] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    );
  }
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

function getLimiterForTier(tier: ApiKeyTier): Ratelimit {
  const cached = limiterCache.get(tier);
  if (cached) return cached;

  const limiter = new Ratelimit({
    redis: getRedisClient(),
    limiter: Ratelimit.slidingWindow(TIER_RATE_LIMITS[tier], "60 s"),
    analytics: false,
    // Once an identifier is over its limit, answer further requests from
    // memory until the window resets instead of spending a Redis command per
    // blocked request (e.g. a client hammering past its limit).
    ephemeralCache: ephemeralBlockCache,
    prefix: `ratelimit:apikey:${tier}`,
  });
  limiterCache.set(tier, limiter);
  return limiter;
}

/** Extracts the token from a case-insensitive `Authorization: Bearer <token>` header. */
function extractBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") ?? request.headers.get("Authorization");
  if (!header) return null;

  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const token = match[1].trim();
  return token.length > 0 ? token : null;
}

/**
 * Validates an incoming public API request: authenticates the bearer token
 * against Redis, enforces that key's per-minute burst limit, then (for
 * paid tiers) its monthly quota.
 *
 * Never throws for expected failure modes (missing/invalid/unknown key,
 * over burst limit, over monthly quota) — those come back as a typed
 * `ValidationFailure`. Unexpected infrastructure errors (Redis unreachable,
 * env misconfigured) are caught and also returned as a 401 failure, since a
 * public auth endpoint should fail closed, never open.
 */
export async function validateApiRequest(request: Request): Promise<ValidationResult> {
  try {
    const rawKey = extractBearerToken(request);
    if (!rawKey) {
      return {
        valid: false,
        status: 401,
        error: "Missing or malformed Authorization header. Expected: Authorization: Bearer <api key>",
      };
    }

    const hashedKey = await hashApiKey(rawKey);
    const record = await getApiKeyRecord(hashedKey);

    if (!record) {
      return { valid: false, status: 401, error: "Invalid API key." };
    }

    const limiter = getLimiterForTier(record.tier);
    const { success, limit, remaining } = await limiter.limit(hashedKey);

    if (!success) {
      // Fire-and-await a single pipelined write; recordApiMetric never throws.
      await recordApiMetric(hashedKey, 429);
      return {
        valid: false,
        status: 429,
        error: "Rate limit exceeded. Please slow down and try again shortly.",
        limit,
        remaining,
        hashedKey,
      };
    }

    // Quota comes from the live tier config, not the number frozen onto the
    // key record at issue time, so changing lib/config/subscriptions.ts takes
    // effect for existing keys too. Counting + usage analytics happen in a
    // single pipelined round trip.
    const monthlyLimit = TIER_MONTHLY_QUOTAS[record.tier] ?? null;
    const quota = await trackAuthorizedRequest(hashedKey, monthlyLimit);

    if (!quota.withinQuota) {
      return {
        valid: false,
        status: 429,
        error: "Monthly request quota exceeded for this API key. Upgrade your plan or wait for the next billing cycle.",
        limit,
        remaining,
        monthlyLimit: quota.limit,
        monthlyRemaining: quota.remaining,
        hashedKey,
      };
    }

    return {
      valid: true,
      owner: record.owner,
      tier: record.tier,
      limit,
      remaining,
      monthlyLimit: quota.limit,
      monthlyRemaining: quota.remaining,
      hashedKey,
    };
  } catch (err) {
    console.error("[validateApiRequest] unexpected error:", err);
    return {
      valid: false,
      status: 401,
      error: "Unable to validate API key.",
    };
  }
}

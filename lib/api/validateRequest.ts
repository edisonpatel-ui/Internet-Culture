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
 *  3. Look up `apikey:<hashedKey>` in Upstash Redis (lib/api/keys.ts).
 *  4. If found, run @upstash/ratelimit — a fixed/sliding window keyed on the
 *     *hashed* key, sized by the key's stored tier (free: 60/min, pro:
 *     1000/min) — so one Redis lookup tells us both identity and quota.
 *
 * Defensive by default: any missing header, malformed token, unknown key,
 * or Redis/config error returns a 401 rather than throwing, so a public
 * route can never accidentally leak an internal error into a 500 that
 * bypasses auth.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getApiKeyRecord, hashApiKey, type ApiKeyTier } from "@/lib/api/keys";

export interface ValidationSuccess {
  valid: true;
  owner: string;
  tier: ApiKeyTier;
  limit: number;
  remaining: number;
}

export interface ValidationFailure {
  valid: false;
  status: 401 | 429;
  error: string;
  /** Present only on 429s, for surfacing rate-limit headers upstream. */
  limit?: number;
  remaining?: number;
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

let cachedRedis: Redis | null = null;
/** One Ratelimit instance per tier, cached across invocations (serverless-warm-safe). */
const limiterCache = new Map<ApiKeyTier, Ratelimit>();

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

/** Requests allowed per 60-second window, per tier. Kept in sync with lib/api/keys.ts. */
const TIER_LIMITS: Record<ApiKeyTier, number> = {
  free: 60,
  pro: 1000,
};

function getLimiterForTier(tier: ApiKeyTier): Ratelimit {
  const cached = limiterCache.get(tier);
  if (cached) return cached;

  const limiter = new Ratelimit({
    redis: getRedisClient(),
    limiter: Ratelimit.slidingWindow(TIER_LIMITS[tier], "60 s"),
    analytics: false,
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
 * against Redis, then enforces that key's per-tier rate limit.
 *
 * Never throws for expected failure modes (missing/invalid/unknown key,
 * over quota) — those come back as a typed `ValidationFailure`. Unexpected
 * infrastructure errors (e.g. Redis unreachable, env misconfigured) are
 * caught and also returned as a 401 failure, since a public auth endpoint
 * should fail closed, never open.
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
      return {
        valid: false,
        status: 429,
        error: "Rate limit exceeded. Please slow down and try again shortly.",
        limit,
        remaining,
      };
    }

    return {
      valid: true,
      owner: record.owner,
      tier: record.tier,
      limit,
      remaining,
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

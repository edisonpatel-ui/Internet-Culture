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
 */

import { NextResponse } from "next/server";
import { validateApiRequest } from "@/lib/api/validateRequest";
import { UnauthorizedError, RateLimitError } from "@/lib/api/errors";
import type { ApiKeyTier } from "@/lib/api/keys";

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
    const headers = rateLimitHeaders(result.limit, result.remaining);
    if (result.status === 429) {
      throw new RateLimitError(result.error, headers);
    }
    throw new UnauthorizedError(result.error, headers);
  }

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

/**
 * app/api/v1/playground/route.ts
 *
 * Backs the homepage teaser widget (components/ApiPlayground.tsx). Distinct
 * from both the real paid endpoint (app/api/v1/terms/[slug], bearer-token
 * auth, full payload) and the fuller /demo playground
 * (app/api/demo/terms/[slug], 10 req/min, full payload) — this one is
 * deliberately the most restricted of the three, since it's the very first
 * touchpoint a visitor hits with zero commitment:
 *   - Only 5 pre-selected terms are servable (PLAYGROUND_TERMS).
 *   - Every array field in the response is truncated to 2 items.
 *   - A `_notice` field is appended pointing to /pricing.
 *   - 5 requests per IP per **day** (not per minute) — tight enough that
 *     scripting around the homepage isn't a viable way to scrape the full
 *     dataset instead of subscribing.
 *
 * Deliberately does NOT go through lib/api/middleware.ts's bearer-token
 * authenticateApiRequest — this route has no API key at all by design (it's
 * the pre-signup teaser). It still returns the same uniform
 * `{ error: { code, message, status } }` shape as every other /api/v1
 * route via lib/api/errors.ts, so a client can handle errors identically
 * across the whole /api/v1 surface regardless of which endpoint it hit.
 */

import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";
import { buildEnrichedTermPayload } from "@/lib/api/enrichedTerm";
import { PLAYGROUND_TERMS } from "@/lib/api/playgroundTerms";
import { formatApiError, RateLimitError, InvalidInputError, NotFoundError, ApiError } from "@/lib/api/errors";
import { validateQuery } from "@/lib/api/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ARRAY_ITEMS = 2;
const REQUESTS_PER_DAY = 5;

const playgroundSlugValues = PLAYGROUND_TERMS.map((t) => t.slug) as [string, ...string[]];
const playgroundQuerySchema = z.object({
  slug: z.enum(playgroundSlugValues, {
    message: `slug must be one of: ${PLAYGROUND_TERMS.map((t) => t.label).join(", ")}`,
  }),
});

let cachedRedis: Redis | null = null;
let cachedLimiter: Ratelimit | null = null;

function getPlaygroundLimiter(): Ratelimit | null {
  if (cachedLimiter) return cachedLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  cachedRedis = cachedRedis ?? new Redis({ url, token });
  cachedLimiter = new Ratelimit({
    redis: cachedRedis,
    limiter: Ratelimit.slidingWindow(REQUESTS_PER_DAY, "1 d"),
    analytics: false,
    prefix: "ratelimit:playground",
  });
  return cachedLimiter;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Truncates every array-valued field in a plain object to `max` items. Shallow — matches this payload's shape. */
function truncateArrays<T extends object>(obj: T, max: number): T {
  const result: Record<string, unknown> = { ...(obj as Record<string, unknown>) };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (Array.isArray(value)) {
      result[key] = value.slice(0, max);
    }
  }
  return result as T;
}

export async function GET(request: Request) {
  try {
    const limiter = getPlaygroundLimiter();
    if (!limiter) {
      throw new ApiError("SERVICE_UNAVAILABLE", "Playground is temporarily unavailable.", 503);
    }

    const ip = getClientIp(request);
    const { success, limit, remaining } = await limiter.limit(ip);
    if (!success) {
      throw new RateLimitError(
        "Daily teaser limit reached. Subscribe on /pricing for full, unlimited access.",
        { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": "0" },
      );
    }

    const { slug } = validateQuery(request, playgroundQuerySchema);

    let entry;
    try {
      entry = await getEntryBySlug(slug);
    } catch (err) {
      console.error("[api/v1/playground] failed to load catalog:", err);
      throw err;
    }

    if (!entry) {
      throw new NotFoundError(`No entry found for slug "${slug}".`);
    }

    const history = await getMetricHistory(slug);
    const fullPayload = buildEnrichedTermPayload(entry, history);
    const teaserData = truncateArrays(fullPayload, MAX_ARRAY_ITEMS);

    return NextResponse.json(
      {
        success: true,
        data: teaserData,
        _notice: "Teaser payload. Upgrade to Pro for full culture intelligence schema.",
      },
      {
        status: 200,
        headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": String(Math.max(0, remaining)) },
      },
    );
  } catch (err) {
    if (err instanceof InvalidInputError) {
      // Surface the friendlier, playground-specific message from the Zod
      // schema's `message` as the top-level error message too (formatApiError
      // still attaches the same `issues` array).
      return formatApiError(
        new InvalidInputError(err.issues, err.issues[0]?.message ?? err.message),
      );
    }
    return formatApiError(err);
  }
}

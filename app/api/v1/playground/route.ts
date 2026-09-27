/**
 * app/api/v1/playground/route.ts
 *
 * Backs the homepage teaser widget (components/ApiPlayground.tsx). Distinct
 * from both the real paid endpoint (app/api/v1/terms/[slug], bearer-token
 * auth, full payload) and the fuller /demo playground
 * (app/api/demo/terms/[slug], 10 req/min, full payload) — this one is
 * deliberately the most restricted of the three, since it's the very first
 * touchpoint a visitor hits with zero commitment:
 *   - Only 5 pre-selected terms are servable (ALLOWED_SLUGS below).
 *   - Every array field in the response is truncated to 2 items.
 *   - A `_notice` field is appended pointing to /pricing.
 *   - 5 requests per IP per **day** (not per minute) — tight enough that
 *     scripting around the homepage isn't a viable way to scrape the full
 *     dataset instead of subscribing.
 */

import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";
import { buildEnrichedTermPayload } from "@/lib/api/enrichedTerm";
import { PLAYGROUND_TERMS } from "@/lib/api/playgroundTerms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_SLUGS = new Set(PLAYGROUND_TERMS.map((t) => t.slug));
const MAX_ARRAY_ITEMS = 2;
const REQUESTS_PER_DAY = 5;

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
  const limiter = getPlaygroundLimiter();
  if (!limiter) {
    return NextResponse.json({ success: false, error: "Playground is temporarily unavailable." }, { status: 503 });
  }

  const ip = getClientIp(request);
  const { success, limit, remaining } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        error: "Daily teaser limit reached. Subscribe on /pricing for full, unlimited access.",
      },
      { status: 429, headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": "0" } },
    );
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug || !ALLOWED_SLUGS.has(slug as (typeof PLAYGROUND_TERMS)[number]["slug"])) {
    return NextResponse.json(
      {
        success: false,
        error: `"slug" must be one of: ${PLAYGROUND_TERMS.map((t) => t.label).join(", ")}.`,
      },
      { status: 400 },
    );
  }

  let entry;
  try {
    entry = await getEntryBySlug(slug);
  } catch (err) {
    console.error("[api/v1/playground] failed to load catalog:", err);
    return NextResponse.json({ success: false, error: "Failed to load content catalog." }, { status: 500 });
  }

  if (!entry) {
    return NextResponse.json({ success: false, error: `No entry found for slug "${slug}".` }, { status: 404 });
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
}

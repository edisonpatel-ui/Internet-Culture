/**
 * app/api/demo/terms/[slug]/route.ts
 *
 * Backs the public playground at app/demo/page.tsx.
 *
 * Design note / deliberate deviation from a literal "public demo API key":
 * embedding any real `cg_live_...` key in client-side JS means every
 * visitor's browser can read it in devtools and reuse it outside the demo,
 * silently burning through a real customer-tier quota (or, if the "demo
 * key" is admin-issued, an unmetered one) — a real credential exposure,
 * not a hypothetical one. Instead, this route needs no Authorization
 * header at all and is rate-limited directly by IP address, using the
 * same @upstash/ratelimit primitive as the paid tiers
 * (lib/api/validateRequest.ts) with a deliberately strict cap. It serves
 * the exact same enriched payload shape (lib/api/enrichedTerm.ts) a real
 * customer would get, so the docs examples and the playground stay
 * consistent.
 */

import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";
import { buildEnrichedTermPayload } from "@/lib/api/enrichedTerm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

/** Demo traffic cap — intentionally much stricter than any paid tier. */
const DEMO_REQUESTS_PER_MINUTE = 10;

let cachedRedis: Redis | null = null;
let cachedLimiter: Ratelimit | null = null;

function getDemoLimiter(): Ratelimit | null {
  if (cachedLimiter) return cachedLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null; // Fail closed below if Redis isn't configured.

  cachedRedis = cachedRedis ?? new Redis({ url, token });
  cachedLimiter = new Ratelimit({
    redis: cachedRedis,
    limiter: Ratelimit.slidingWindow(DEMO_REQUESTS_PER_MINUTE, "60 s"),
    analytics: false,
    prefix: "ratelimit:demo",
  });
  return cachedLimiter;
}

/** Best-effort caller IP from standard proxy headers (Vercel sets x-forwarded-for). */
function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function GET(request: Request, { params }: Props) {
  const limiter = getDemoLimiter();
  if (!limiter) {
    return NextResponse.json({ success: false, error: "Demo is temporarily unavailable." }, { status: 503 });
  }

  const ip = getClientIp(request);
  const { success, limit, remaining } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { success: false, error: "Demo rate limit reached — please wait a moment and try again." },
      {
        status: 429,
        headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": "0" },
      },
    );
  }

  const { slug } = await params;

  let entry;
  try {
    entry = await getEntryBySlug(slug);
  } catch (err) {
    console.error("[api/demo/terms] failed to load catalog:", err);
    return NextResponse.json({ success: false, error: "Failed to load content catalog." }, { status: 500 });
  }

  if (!entry) {
    return NextResponse.json({ success: false, error: `No entry found for slug "${slug}".` }, { status: 404 });
  }

  const history = await getMetricHistory(slug);
  const data = buildEnrichedTermPayload(entry, history);

  return NextResponse.json(
    { success: true, data },
    { status: 200, headers: { "X-RateLimit-Limit": String(limit), "X-RateLimit-Remaining": String(Math.max(0, remaining)) } },
  );
}

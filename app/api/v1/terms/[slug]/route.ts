/**
 * app/api/v1/terms/[slug]/route.ts
 *
 * Public, authenticated JSON API for a single encyclopedia entry.
 *
 *   GET /api/v1/terms/:slug
 *   Authorization: Bearer <api key>
 *
 * Auth + rate limiting are fully delegated to lib/api/validateRequest.ts —
 * this route does no key handling of its own. Content is read from the
 * existing canonical catalog (lib/services/entries.ts), the same source of
 * truth the public site pages already use, so this route can never drift
 * out of sync with the encyclopedia itself.
 *
 * This is purely additive: a brand-new route under /api/v1, touching no
 * existing route, page, or data file.
 */

import { NextResponse } from "next/server";
import { validateApiRequest } from "@/lib/api/validateRequest";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

/** Attaches standard rate-limit headers to any JSON response. */
function withRateLimitHeaders(
  response: NextResponse,
  limit?: number,
  remaining?: number,
): NextResponse {
  if (typeof limit === "number") {
    response.headers.set("X-RateLimit-Limit", String(limit));
  }
  if (typeof remaining === "number") {
    response.headers.set("X-RateLimit-Remaining", String(Math.max(0, remaining)));
  }
  return response;
}

export async function GET(request: Request, { params }: Props) {
  const validation = await validateApiRequest(request);

  if (!validation.valid) {
    const response = NextResponse.json(
      { success: false, error: validation.error },
      { status: validation.status },
    );
    return withRateLimitHeaders(response, validation.limit, validation.remaining);
  }

  const { slug } = await params;

  let entry;
  try {
    entry = await getEntryBySlug(slug);
  } catch (err) {
    console.error("[api/v1/terms] failed to load catalog:", err);
    const response = NextResponse.json(
      { success: false, error: "Failed to load content catalog." },
      { status: 500 },
    );
    return withRateLimitHeaders(response, validation.limit, validation.remaining);
  }

  if (!entry) {
    const response = NextResponse.json(
      { success: false, error: `No entry found for slug "${slug}".` },
      { status: 404 },
    );
    return withRateLimitHeaders(response, validation.limit, validation.remaining);
  }

  // Velocity is additive analytics data (lib/services/metricsHistory.ts) and
  // never throws, so a Redis hiccup here degrades to 0 rather than failing
  // the whole request.
  const history = await getMetricHistory(slug);
  const velocityScore = history.length > 0 ? history[history.length - 1].velocity : 0;

  const payload = {
    success: true,
    data: {
      term: entry.title,
      category: entry.category,
      summary: entry.description,
      originDate: entry.historicalDate ?? entry.dateStarted ?? entry.addedAt,
      velocityScore,
      relatedSlugs: entry.relatedSlugs ?? [],
    },
  };

  const response = NextResponse.json(payload, { status: 200 });
  return withRateLimitHeaders(response, validation.limit, validation.remaining);
}

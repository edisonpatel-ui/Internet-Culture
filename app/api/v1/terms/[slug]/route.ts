/**
 * app/api/v1/terms/[slug]/route.ts
 *
 * Public, authenticated, paid-tier JSON API for a single encyclopedia
 * entry, returning the "cultural intelligence" schema (velocityIndex,
 * decayTracker, originMapping, templateData — see lib/api/enrichedTerm.ts
 * for exactly which real fields each is derived from).
 *
 *   GET /api/v1/terms/:slug
 *   Authorization: Bearer <api key>
 *
 * Auth, burst rate limiting, and monthly quota enforcement are fully
 * delegated to lib/api/validateRequest.ts — this route does no key
 * handling of its own. Content is read from the existing canonical catalog
 * (lib/services/entries.ts), the same source of truth the public site
 * pages already use, so this route can never drift out of sync with the
 * encyclopedia itself.
 */

import { NextResponse } from "next/server";
import { validateApiRequest, type ValidationResult } from "@/lib/api/validateRequest";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";
import { buildEnrichedTermPayload } from "@/lib/api/enrichedTerm";
import { incrementApiViewCount } from "@/lib/api/viewCounters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

/** Attaches standard rate-limit + quota headers to any JSON response. */
function withUsageHeaders(response: NextResponse, validation: ValidationResult): NextResponse {
  if (typeof validation.limit === "number") {
    response.headers.set("X-RateLimit-Limit", String(validation.limit));
  }
  if (typeof validation.remaining === "number") {
    response.headers.set("X-RateLimit-Remaining", String(Math.max(0, validation.remaining)));
  }
  if (validation.monthlyLimit != null) {
    response.headers.set("X-Quota-Limit", String(validation.monthlyLimit));
  }
  if (validation.monthlyRemaining != null) {
    response.headers.set("X-Quota-Remaining", String(Math.max(0, validation.monthlyRemaining)));
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
    return withUsageHeaders(response, validation);
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
    return withUsageHeaders(response, validation);
  }

  if (!entry) {
    const response = NextResponse.json(
      { success: false, error: `No entry found for slug "${slug}".` },
      { status: 404 },
    );
    return withUsageHeaders(response, validation);
  }

  // Metrics history is additive analytics data (lib/services/metricsHistory.ts)
  // and never throws, so a Redis hiccup here degrades to an empty history
  // (velocityIndex: "0.0%") rather than failing the whole request.
  const history = await getMetricHistory(slug);
  const data = buildEnrichedTermPayload(entry, history);

  // Real API-traffic counter feeding the velocity cron leaderboard
  // (app/api/cron/velocity/route.ts). Never allowed to fail the response.
  try {
    await incrementApiViewCount(slug);
  } catch (err) {
    console.error("[api/v1/terms] view counter increment failed:", err);
  }

  const response = NextResponse.json({ success: true, data }, { status: 200 });
  return withUsageHeaders(response, validation);
}

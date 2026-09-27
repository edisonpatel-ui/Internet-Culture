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
 * Auth, burst rate limiting, and monthly quota enforcement are centralized
 * in lib/api/middleware.ts (which itself delegates the actual Redis/hash
 * work to lib/api/validateRequest.ts) — this route does no key handling of
 * its own. All error responses (401/404/429/500) share the uniform
 * `{ error: { code, message, status } }` shape via lib/api/errors.ts.
 * Content is read from the existing canonical catalog
 * (lib/services/entries.ts), the same source of truth the public site
 * pages already use, so this route can never drift out of sync with the
 * encyclopedia itself.
 */

import { NextResponse } from "next/server";
import { authenticateApiRequest, withRateLimitHeaders } from "@/lib/api/middleware";
import { formatApiError, InvalidInputError, NotFoundError, type FieldIssue } from "@/lib/api/errors";
import { slugSchema } from "@/lib/api/validation";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";
import { buildEnrichedTermPayload } from "@/lib/api/enrichedTerm";
import { incrementApiViewCount } from "@/lib/api/viewCounters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(request: Request, { params }: Props) {
  try {
    const auth = await authenticateApiRequest(request);

    const { slug: rawSlug } = await params;
    const slugResult = slugSchema.safeParse(rawSlug);
    if (!slugResult.success) {
      const issues: FieldIssue[] = slugResult.error.issues.map((issue) => ({
        field: "slug",
        message: issue.message,
      }));
      throw new InvalidInputError(issues, "Invalid slug in request path.");
    }
    const slug = slugResult.data;

    let entry;
    try {
      entry = await getEntryBySlug(slug);
    } catch (err) {
      console.error("[api/v1/terms] failed to load catalog:", err);
      throw err; // becomes a generic 500 via formatApiError — no internals leaked.
    }

    if (!entry) {
      throw new NotFoundError(`No entry found for slug "${slug}".`);
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
    return withRateLimitHeaders(response, auth);
  } catch (err) {
    return formatApiError(err);
  }
}

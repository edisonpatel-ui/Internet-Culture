/**
 * app/api/v1/terms/route.ts
 *
 * Public, authenticated, paid-tier directory/search endpoint over the
 * catalog — the "browse/filter many terms" counterpart to
 * GET /api/v1/terms/:slug (one term) and POST /api/v1/terms/batch (a known
 * list of terms). This is for customers who don't yet know which slugs
 * they want.
 *
 *   GET /api/v1/terms?category=meme&minVelocity=5&limit=20&page=1
 *   Authorization: Bearer <api key>
 *
 *   category    optional, one of types/index.ts's ContentCategory values
 *   minVelocity optional, inclusive lower bound on an entry's latest
 *               recorded velocity (lib/services/metricsHistory.ts) — a
 *               term with NO recorded velocity history is excluded by this
 *               filter rather than treated as velocity 0 (see
 *               getLatestVelocities's doc comment: no data isn't the same
 *               claim as zero data)
 *   limit       optional, 1–50, default 20 (lib/api/validation.ts's
 *               termsLimitSchema — a tighter cap than the generic
 *               limitSchema, per this endpoint's own spec)
 *   page        optional, 1-indexed, default 1
 *
 * Returns a lighter per-entry summary than the single-term/batch
 * endpoints' full "cultural intelligence" payload (slug, term, category,
 * description, scores, velocity) — a directory listing is for finding
 * which slugs to look up next, not for returning the full enriched
 * payload for potentially 50 entries at once. Deliberately does NOT
 * increment per-entry API view counters (lib/api/viewCounters.ts) the way
 * the single-term/batch routes do: browsing a list isn't the same signal
 * as a customer specifically requesting data about one term.
 */

import { NextResponse } from "next/server";
import { authenticateApiRequest, withRateLimitHeaders } from "@/lib/api/middleware";
import { formatApiError } from "@/lib/api/errors";
import { categorySchema, minVelocitySchema, pageSchema, termsLimitSchema, validateQuery } from "@/lib/api/validation";
import { z } from "zod";
import { getAllEntries, getEntriesByCategory } from "@/lib/services/entries";
import { getLatestVelocities } from "@/lib/services/metricsHistory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const termsQuerySchema = z.object({
  category: categorySchema.optional(),
  minVelocity: minVelocitySchema,
  limit: termsLimitSchema,
  page: pageSchema,
});

export async function GET(request: Request) {
  try {
    const auth = await authenticateApiRequest(request);
    const { category, minVelocity, limit, page } = validateQuery(request, termsQuerySchema);

    const categoryFiltered = category ? await getEntriesByCategory(category) : await getAllEntries();

    let working = categoryFiltered;
    // Only fetched eagerly for the whole category-filtered set when a
    // minVelocity filter actually needs it pre-pagination — see the
    // "else" branch below for the cheap common-case path that only looks
    // up velocity for the one page of results actually being returned.
    let velocities: Map<string, number> | null = null;

    if (minVelocity !== undefined) {
      velocities = await getLatestVelocities(categoryFiltered.map((e) => e.slug));
      working = categoryFiltered.filter((e) => {
        const v = velocities!.get(e.slug);
        return v !== undefined && v >= minVelocity;
      });
    }

    const total = working.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const pageEntries = working.slice(start, start + limit);

    if (!velocities) {
      velocities = await getLatestVelocities(pageEntries.map((e) => e.slug));
    }

    const data = pageEntries.map((entry) => ({
      slug: entry.slug,
      term: entry.title,
      category: entry.category,
      description: entry.description,
      scores: entry.scores,
      velocity: velocities!.get(entry.slug) ?? null,
    }));

    const response = NextResponse.json(
      {
        success: true,
        data,
        pagination: { page, limit, total, totalPages },
      },
      { status: 200 },
    );
    return withRateLimitHeaders(response, auth);
  } catch (err) {
    return formatApiError(err);
  }
}

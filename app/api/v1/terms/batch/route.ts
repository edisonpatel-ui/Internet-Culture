/**
 * app/api/v1/terms/batch/route.ts
 *
 * Public, authenticated, paid-tier bulk lookup for the same "cultural
 * intelligence" schema GET /api/v1/terms/:slug returns for one entry at a
 * time (lib/api/enrichedTerm.ts) — this is the batched equivalent, for
 * customers who need several terms in one round trip instead of N
 * sequential requests (and N sequential hits against their own rate
 * limit/quota).
 *
 *   POST /api/v1/terms/batch
 *   Authorization: Bearer <api key>
 *   { "slugs": string[] }               // 1–20 items, kebab-case
 *
 * Capped at 20 slugs per request (lib/api/validation.ts's
 * batchSlugsSchema) so one call can't force this route into hundreds of
 * individual catalog/Redis lookups — a customer needing more than 20 terms
 * makes a second batch call, which still costs far less of their burst
 * limit than 20+ individual /terms/:slug calls would have.
 *
 * An unknown slug does NOT fail the whole request — it's far more useful
 * to a bulk caller to get back 19 real results and one
 * `{ found: false }` than a single 404 for the entire batch over one typo.
 * Auth/rate-limit/quota are centralized exactly like every other /api/v1
 * route — see lib/api/middleware.ts.
 */

import { NextResponse } from "next/server";
import { authenticateApiRequest, withRateLimitHeaders } from "@/lib/api/middleware";
import { formatApiError } from "@/lib/api/errors";
import { batchSlugsSchema, validateJsonBody } from "@/lib/api/validation";
import { getEntryBySlug } from "@/lib/services/entries";
import { getMetricHistory } from "@/lib/services/metricsHistory";
import { buildEnrichedTermPayload, type EnrichedTermPayload } from "@/lib/api/enrichedTerm";
import { incrementApiViewCount } from "@/lib/api/viewCounters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BatchResult = { slug: string; found: true; term: EnrichedTermPayload } | { slug: string; found: false };

export async function POST(request: Request) {
  try {
    const auth = await authenticateApiRequest(request);
    const { slugs } = await validateJsonBody(request, batchSlugsSchema);

    // De-duplicate while preserving first-seen order — a caller passing the
    // same slug twice shouldn't pay for (or receive) it twice.
    const uniqueSlugs = Array.from(new Set(slugs));

    const results: BatchResult[] = await Promise.all(
      uniqueSlugs.map(async (slug): Promise<BatchResult> => {
        let entry;
        try {
          entry = await getEntryBySlug(slug);
        } catch (err) {
          console.error(`[api/v1/terms/batch] failed to load catalog for "${slug}":`, err);
          throw err; // a catalog integrity error is a real 500 — let it propagate, not just for this one slug
        }

        if (!entry) {
          return { slug, found: false };
        }

        // Same "never fails the request" treatment as the single-term route.
        const history = await getMetricHistory(slug);
        const term = buildEnrichedTermPayload(entry, history);

        try {
          await incrementApiViewCount(slug);
        } catch (err) {
          console.error(`[api/v1/terms/batch] view counter increment failed for "${slug}":`, err);
        }

        return { slug, found: true, term };
      }),
    );

    const response = NextResponse.json(
      {
        success: true,
        data: results,
        meta: {
          requested: slugs.length,
          found: results.filter((r) => r.found).length,
        },
      },
      { status: 200 },
    );
    return withRateLimitHeaders(response, auth);
  } catch (err) {
    return formatApiError(err);
  }
}

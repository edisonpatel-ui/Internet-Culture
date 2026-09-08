/**
 * app/api/cron/update-metrics/route.ts
 *
 * Daily cron target for lib/services/metricsHistory.ts. Scheduled by
 * vercel.json ("0 0 * * *") — this route previously did not exist, which
 * meant the scheduled invocation was a silent no-op every day (see
 * AUDIT_AND_OPTIMIZATION_REPORT.md §3 / §7).
 *
 * Snapshots the current editorial `scores.relevance` for every entry in the
 * canonical catalog into Redis-backed history via saveMetricSnapshot. This is
 * intentionally simple: it re-snapshots the already-computed canonical score
 * rather than re-running the external-provider evidence pipeline
 * (lib/dynamicMetadata/providers/*) for every entry on every run — that
 * pipeline already runs on publish/maintenance and calls 9 external
 * providers per entry, which would risk exceeding function duration and
 * provider rate limits if repeated for the full catalog daily. Because this
 * route only re-reads scores already sitting on each entry, iterating the
 * full catalog per run is cheap and doesn't need the batch/cursor rotation
 * getNextBatchOfSlugs() was built for — that helper remains available if a
 * future version of this route needs to fold in live-provider re-evaluation.
 */

import { NextResponse } from "next/server";
import { getAllEntriesSync } from "@/lib/services/entries";
import { saveMetricSnapshot } from "@/lib/services/metricsHistory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // No secret configured — nothing to validate against (e.g. local/dev).
  if (!secret) return true;

  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = new Date().toISOString();
  let entries: ReturnType<typeof getAllEntriesSync>;

  try {
    entries = getAllEntriesSync();
  } catch (err) {
    console.error("[cron/update-metrics] failed to load catalog:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load catalog", timestamp },
      { status: 500 },
    );
  }

  let snapshotsSaved = 0;
  const failures: string[] = [];

  for (const entry of entries) {
    try {
      await saveMetricSnapshot(entry.slug, entry.scores.relevance);
      snapshotsSaved += 1;
    } catch (err) {
      // One slug failing (e.g. a transient Redis error) should never abort
      // the run for the rest of the catalog — log and keep going.
      console.error(`[cron/update-metrics] failed for slug "${entry.slug}":`, err);
      failures.push(entry.slug);
    }
  }

  console.error("[cron/update-metrics] run complete", {
    totalEntries: entries.length,
    snapshotsSaved,
    failed: failures.length,
  });

  return NextResponse.json({
    success: failures.length === 0,
    snapshotsSaved,
    timestamp,
    ...(failures.length > 0 ? { failedSlugs: failures } : {}),
  });
}

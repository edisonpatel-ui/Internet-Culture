/**
 * app/api/cron/velocity/route.ts
 *
 * Scheduled by vercel.json to run every 6 hours. Computes each
 * slug's growth in real public-API traffic since the last run
 * (lib/api/viewCounters.ts) and writes it into a `leaderboard:velocity`
 * Redis sorted set (score = delta since last run).
 *
 * Note on "24h": this project has no pre-existing Redis page-view counter
 * to compute a true rolling 24h window from (see lib/api/viewCounters.ts's
 * doc comment) — the counters here are net-new, seeded by real API traffic
 * starting now. Because this cron runs every 6 hours, each run's delta
 * covers the last ~6 hours, not a full day; the leaderboard score is
 * simply "requests gained since the last run," which is directly
 * comparable across slugs run-to-run without needing to fake a 24h figure
 * we can't yet measure. A future version can widen this to a true 24h
 * window once enough history has accumulated.
 *
 * Auth follows the exact convention already used by
 * app/api/cron/update-metrics/route.ts: CRON_SECRET as a Bearer token,
 * open when unset (local/dev), required in production.
 */

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getAllEntriesSync } from "@/lib/services/entries";
import { computeAndSnapshotViewDeltas } from "@/lib/api/viewCounters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LEADERBOARD_KEY = "leaderboard:velocity";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

let cachedClient: Redis | null = null;
function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[cron/velocity] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = new Date().toISOString();

  let slugs: string[];
  try {
    slugs = getAllEntriesSync().map((e) => e.slug);
  } catch (err) {
    console.error("[cron/velocity] failed to load catalog:", err);
    return NextResponse.json({ success: false, error: "Failed to load catalog", timestamp }, { status: 500 });
  }

  try {
    const deltas = await computeAndSnapshotViewDeltas(slugs);

    if (deltas.length > 0) {
      const redis = getRedisClient();
      const pipeline = redis.pipeline();
      // Reset the leaderboard each run so it always reflects "since last
      // run" rather than accumulating forever.
      pipeline.del(LEADERBOARD_KEY);
      for (const { slug, delta } of deltas) {
        pipeline.zadd(LEADERBOARD_KEY, { score: delta, member: slug });
      }
      await pipeline.exec();
    }

    return NextResponse.json(
      { success: true, slugsRanked: deltas.length, timestamp },
      { status: 200 },
    );
  } catch (err) {
    console.error("[cron/velocity] failed to compute/update leaderboard:", err);
    return NextResponse.json({ success: false, error: "Failed to update leaderboard", timestamp }, { status: 500 });
  }
}

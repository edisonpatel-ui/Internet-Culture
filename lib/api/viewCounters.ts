/**
 * lib/api/viewCounters.ts
 *
 * Tracks real public-API traffic per slug so the velocity cron
 * (app/api/cron/velocity/route.ts) has an actual signal to work from.
 *
 * This project's existing analytics (lib/analytics/*) are client-side GA4
 * events — there is no pre-existing server-side page-view counter in
 * Redis to hook into. Rather than inventing one, this module counts
 * successful, authenticated calls to GET /api/v1/terms/[slug] — real
 * traffic against the paid API — which is arguably a more meaningful
 * "velocity" signal for API customers than raw site pageviews anyway.
 *
 * Storage model:
 *   api:views:<slug>          → all-time counter (INCR)
 *   api:views:snapshot:<slug> → counter value as of the last cron run,
 *                               used to compute a delta (this run's cron
 *                               interval, not a fixed 24h window — see the
 *                               cron route's doc comment).
 */

import { Redis } from "@upstash/redis";

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "[lib/api/viewCounters] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    );
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

const VIEW_KEY_PREFIX = "api:views:";
const SNAPSHOT_KEY_PREFIX = "api:views:snapshot:";

/**
 * View counts are buffered in memory and flushed to Redis in ONE pipeline
 * when either ~60 seconds have passed or 50 distinct slugs are pending,
 * rather than spending an INCR per slug on every request (a 20-slug batch
 * request used to cost 20 commands for this alone).
 *
 * Trade-off: counts still buffered when a serverless instance is recycled
 * are lost. These counters only feed the velocity leaderboard (a relative
 * ranking, see app/api/cron/velocity/route.ts) — they are not billing data,
 * which lives in the exact quota counters (lib/api/usageTracking.ts).
 *
 * Set API_VIEW_FLUSH_INTERVAL_MS=0 to flush on every call (exact counts,
 * one pipeline per request); useful for local testing.
 */
const pendingViews = new Map<string, number>();
let lastFlushAt = Date.now();
const MAX_PENDING_SLUGS = 50;

function flushIntervalMs(): number {
  const raw = Number(process.env.API_VIEW_FLUSH_INTERVAL_MS);
  return Number.isFinite(raw) && raw >= 0 ? raw : 60_000;
}

/** Records one view for each slug (duplicates count). Flushes when due. Callers should wrap in try/catch. */
export async function recordApiViews(slugs: readonly string[]): Promise<void> {
  for (const slug of slugs) {
    pendingViews.set(slug, (pendingViews.get(slug) ?? 0) + 1);
  }

  const due =
    pendingViews.size >= MAX_PENDING_SLUGS || Date.now() - lastFlushAt >= flushIntervalMs();
  if (!due) return;

  const batch = Array.from(pendingViews.entries());
  pendingViews.clear();
  lastFlushAt = Date.now();
  if (batch.length === 0) return;

  const pipeline = getRedisClient().pipeline();
  for (const [slug, count] of batch) {
    pipeline.incrby(`${VIEW_KEY_PREFIX}${slug}`, count);
  }
  await pipeline.exec();
}

/** Single-slug form of recordApiViews, kept for existing callers. */
export async function incrementApiViewCount(slug: string): Promise<void> {
  await recordApiViews([slug]);
}

export interface SlugViewDelta {
  slug: string;
  current: number;
  delta: number;
}

/**
 * For each slug: reads the current all-time counter, computes the delta
 * against the last recorded snapshot, and updates the snapshot to the
 * current value. Slugs with zero traffic since the last run are omitted
 * (nothing to rank).
 */
export async function computeAndSnapshotViewDeltas(
  slugs: readonly string[],
): Promise<SlugViewDelta[]> {
  if (slugs.length === 0) return [];
  const redis = getRedisClient();

  const currentKeys = slugs.map((slug) => `${VIEW_KEY_PREFIX}${slug}`);
  const snapshotKeys = slugs.map((slug) => `${SNAPSHOT_KEY_PREFIX}${slug}`);

  const [currentValues, snapshotValues] = await Promise.all([
    redis.mget<number[]>(...currentKeys),
    redis.mget<number[]>(...snapshotKeys),
  ]);

  const deltas: SlugViewDelta[] = [];
  const pipeline = redis.pipeline();

  slugs.forEach((slug, i) => {
    const current = currentValues[i] ?? 0;
    const previous = snapshotValues[i] ?? 0;
    const delta = current - previous;
    if (delta > 0) {
      deltas.push({ slug, current, delta });
    }
    pipeline.set(snapshotKeys[i], current);
  });

  await pipeline.exec();
  return deltas;
}

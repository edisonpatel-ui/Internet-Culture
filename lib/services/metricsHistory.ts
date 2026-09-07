/**
 * lib/services/metricsHistory.ts
 *
 * Redis-backed time-series history for entry metrics (relevance + velocity),
 * written daily by the /api/cron/update-metrics cron job. This is additive,
 * B2B-API-facing data — it does NOT replace or write back to the canonical
 * `scores.*` fields on entries in lib/content/. Those remain the source of
 * truth for the public site; this service is the source of truth for
 * historical trend queries (e.g. a future "GET /api/v1/metrics/:slug" route).
 *
 * Uses @upstash/redis's REST client — no persistent connection, works from
 * serverless/edge functions, and needs only two env vars:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Storage model:
 *   metrics:history:<slug>   → Redis LIST of JSON-encoded MetricSnapshot,
 *                              oldest first (RPUSH), capped at MAX_HISTORY_LENGTH
 *                              points per slug via LTRIM so history can't grow
 *                              unbounded.
 *   metrics:cron:cursor      → a single integer, used ONLY to rotate which
 *                              batch of slugs the daily cron processes next
 *                              (see getNextBatchOfSlugs). Not metric data
 *                              itself — cron scheduling state.
 */

import { Redis } from "@upstash/redis";

export interface MetricSnapshot {
  /** ISO date (YYYY-MM-DD) the snapshot was recorded. */
  date: string;
  /** Evidence-based relevance score at the time of this snapshot (0–100). */
  relevance: number;
  /**
   * Change since the previous stored snapshot for this slug (relevance -
   * previousRelevance). 0 for the very first snapshot of a slug (no prior
   * point to compare against).
   */
  velocity: number;
}

/** Redis List entries older than this are trimmed on every write, per slug. */
const MAX_HISTORY_LENGTH = 365;

let cachedClient: Redis | null = null;

/**
 * Lazily constructs the shared Upstash client. Throws a clear error if the
 * required env vars are missing, rather than failing with an opaque network
 * error deep inside @upstash/redis — this is called from a cron route where
 * a misconfigured env var should fail loudly and immediately.
 */
function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "metricsHistory: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must both be set.",
    );
  }

  cachedClient = new Redis({ url, token });
  return cachedClient;
}

function historyKey(slug: string): string {
  return `metrics:history:${slug}`;
}

/**
 * Appends one metric snapshot to a slug's history, computing `velocity`
 * automatically from the most recent previously-stored point (0 if this is
 * the slug's first-ever snapshot). Trims the list to MAX_HISTORY_LENGTH
 * points afterward so a slug's history can't grow unbounded over years of
 * daily cron runs.
 *
 * Returns the snapshot that was actually stored (including the computed
 * velocity), so callers (e.g. the cron route) can report it without a
 * second round-trip.
 */
export async function saveMetricSnapshot(
  slug: string,
  score: number,
  date: string = new Date().toISOString().slice(0, 10),
): Promise<MetricSnapshot> {
  const redis = getRedisClient();
  const key = historyKey(slug);

  const previous = await getMetricHistory(slug);
  const previousRelevance =
    previous.length > 0 ? previous[previous.length - 1].relevance : null;

  const snapshot: MetricSnapshot = {
    date,
    relevance: score,
    velocity: previousRelevance === null ? 0 : score - previousRelevance,
  };

  await redis.rpush(key, JSON.stringify(snapshot));
  // Keep only the most recent MAX_HISTORY_LENGTH points — LTRIM with a
  // negative start keeps the LAST N elements of the list.
  await redis.ltrim(key, -MAX_HISTORY_LENGTH, -1);

  return snapshot;
}

/**
 * Returns a slug's full stored history, oldest first. Returns an empty
 * array for a slug with no history yet (the natural state for every slug
 * before its first cron run) — and ALSO on any Redis-level failure itself
 * (misconfigured env vars, network error, rate limit), not just on a
 * corrupted individual item. This function is called from public article
 * pages (see components/entry/EntryMetricHistory.tsx); an Upstash outage
 * must never be able to break page rendering, so this deliberately never
 * throws, full stop.
 */
export async function getMetricHistory(slug: string): Promise<MetricSnapshot[]> {
  let raw: string[];
  try {
    const redis = getRedisClient();
    raw = await redis.lrange<string>(historyKey(slug), 0, -1);
  } catch {
    return [];
  }

  const parsed: MetricSnapshot[] = [];
  for (const item of raw) {
    try {
      // @upstash/redis may already return parsed objects depending on how
      // the value was stored; handle both a JSON string and an
      // already-deserialized object defensively.
      const value: unknown = typeof item === "string" ? JSON.parse(item) : item;
      if (
        value &&
        typeof value === "object" &&
        "date" in value &&
        "relevance" in value &&
        "velocity" in value
      ) {
        parsed.push(value as MetricSnapshot);
      }
    } catch {
      // Skip a corrupted entry rather than failing the whole read — history
      // is additive/analytical, not load-bearing for the public site.
    }
  }
  return parsed;
}

/**
 * Rotates through `allSlugs` a fixed-size batch at a time, persisting only
 * a cursor position (not the slug list itself) in Redis. Used by the daily
 * cron job so a single invocation never has to run the full multi-provider
 * evidence pipeline against the entire catalog at once — at 360+ entries
 * and up to 9 external providers per entry, that would risk exceeding
 * Vercel's function duration limits and free-tier API rate limits in a
 * single run. With batchSize=40 the full catalog rotates through roughly
 * every 9 daily runs.
 *
 * `allSlugs` should be passed in a STABLE order (the caller's canonical
 * catalog order) — the cursor is a plain index into that order, not a
 * content-addressed pointer, so a stable ordering is what keeps rotation
 * fair over time.
 */
export async function getNextBatchOfSlugs(
  allSlugs: readonly string[],
  batchSize: number,
): Promise<string[]> {
  if (allSlugs.length === 0) return [];

  const redis = getRedisClient();
  const cursorKey = "metrics:cron:cursor";

  const rawCursor = await redis.get<number>(cursorKey);
  const cursor = typeof rawCursor === "number" && Number.isFinite(rawCursor) ? rawCursor : 0;

  const start = cursor % allSlugs.length;
  const batch: string[] = [];
  for (let i = 0; i < Math.min(batchSize, allSlugs.length); i++) {
    batch.push(allSlugs[(start + i) % allSlugs.length]);
  }

  await redis.set(cursorKey, start + batch.length);

  return batch;
}

/**
 * Daily featured article for the homepage.
 *
 * One entry per UTC calendar day, chosen automatically — no editor list to
 * maintain. Selection hierarchy (first tier with a result wins):
 *
 *   1. Velocity spike   — biggest positive change in stored `relevance`
 *                         (Upstash metrics history) over the last 3 days,
 *                         at or above MIN_VELOCITY_SPIKE points.
 *   2. On This Day      — historicalDate month-day equals today's.
 *   3. Under-the-radar  — high-quality entry with comparatively few views,
 *                         picked from the pool by the daily date hash.
 *   4. Daily spotlight  — the daily date hash over the whole catalog.
 *
 * Ties inside any tier are broken by the same deterministic date hash, which
 * never lands on the same pool index two days running.
 *
 * CACHING — the pick is computed once per UTC date and then locked:
 * the result is stored with `unstable_cache` keyed by the date string
 * (`revalidate: 86400` as a backstop). The homepage itself re-renders on a
 * short ISR interval and simply re-reads the locked value, so the Redis
 * query runs about once a day, not once per render. The daily cron
 * (/api/cron/update-metrics) expires the tag after writing fresh snapshots
 * so a render that raced ahead of it can't lock a pick made from stale data.
 *
 * DATA HONESTY — what the signals actually are:
 *  - "Velocity" is the change in the site's own Current Popularity score as
 *    recorded daily in Redis. Page-view counts are not stored anywhere in
 *    the project, so a raw view spike cannot be detected.
 *  - `views` on an entry is a static all-time figure, used only as a
 *    relative "obscurity" signal for tier 3.
 *  - `historicalDate` values that fall on the 1st of a month (156 of 257
 *    today, 96 of them Jan 1) are year/month-precision placeholders, so they
 *    are never treated as an exact "on this day" match.
 */

import { unstable_cache } from "next/cache";
import { getAllEntriesSync } from "@/lib/services/entries";
import { getRecentMetricChanges } from "@/lib/services/metricsHistory";
import { scoreEntry } from "@/lib/content/validation/qualityScore";
import type { BaseEntry } from "@/types";

// ─── Types ───────────────────────────────────────────────────────────────────

export type FeaturedReason =
  | "velocity-spike"
  | "on-this-day"
  | "hidden-gem"
  | "daily-spotlight";

/** Public labels for each reason (icons are chosen by the UI). */
export const FEATURED_REASON_LABELS: Record<FeaturedReason, string> = {
  "velocity-spike": "Trending Velocity Spike",
  "on-this-day": "On This Day in Culture",
  "hidden-gem": "Under-the-Radar Gem",
  "daily-spotlight": "Daily Spotlight",
};

export interface FeaturedSelection {
  slug: string;
  reason: FeaturedReason;
  /** Short human-readable "why", e.g. "+12 popularity in 3 days". */
  detail?: string;
}

export interface DailyFeaturedArticle extends FeaturedSelection {
  entry: BaseEntry;
  /** The UTC date (YYYY-MM-DD) this pick belongs to. */
  date: string;
}

// ─── Tunables ────────────────────────────────────────────────────────────────

/** How far back a popularity change still counts as a "spike". */
export const VELOCITY_WINDOW_DAYS = 3;
/** Minimum net relevance gain (0–100 scale) to count as a spike. */
export const MIN_VELOCITY_SPIKE = 5;
/** Tier 3: minimum overall article-quality score (0–100). */
export const GEM_MIN_QUALITY = 75;
/** Tier 3: "low views" = at or below this percentile of the catalog. */
export const GEM_VIEWS_PERCENTILE = 0.4;

export const DAILY_FEATURED_CACHE_TAG = "daily-featured";
/** Give up on Redis after this long so a slow read can never stall a render. */
const REDIS_TIMEOUT_MS = 4000;

// ─── Date + hash helpers (pure) ──────────────────────────────────────────────

/** Today's UTC calendar date as YYYY-MM-DD. */
export function getUtcDateString(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** Shift a YYYY-MM-DD date by whole days (UTC-safe). */
export function shiftDate(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** 32-bit FNV-1a — small, dependency-free, stable across runtimes. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Fixed start of the collision-free hash walk (see pickByDateHash). */
const HASH_WALK_ANCHOR = "2026-01-01";

/**
 * Index into a pool of `n` for `date`: the date-string hash mod n, walked
 * forward day by day from a fixed anchor so that a day whose hash lands on
 * the previous day's *final* index is nudged to the next slot. That makes
 * consecutive days provably distinct (nudging against only the previous raw
 * hash is not enough — a nudged day can collide with the next one).
 * Pure and deterministic; a few hundred cheap iterations per year of age.
 */
function dailyIndex(date: string, n: number): number {
  if (n <= 1) return 0;
  if (date <= HASH_WALK_ANCHOR) return hashString(date) % n;
  let index = hashString(HASH_WALK_ANCHOR) % n;
  for (let d = shiftDate(HASH_WALK_ANCHOR, 1); d <= date; d = shiftDate(d, 1)) {
    let next = hashString(d) % n;
    if (next === index) next = (next + 1) % n;
    index = next;
  }
  return index;
}

/**
 * Deterministically pick one item for `date` by hashing the date string
 * against the pool length. The pool is sorted by slug first so catalog
 * ordering changes can't reshuffle the pick; consecutive days never repeat
 * within a pool of two or more.
 */
export function pickByDateHash<T extends { slug: string }>(
  pool: readonly T[],
  date: string,
): T | null {
  if (pool.length === 0) return null;
  const sorted = [...pool].sort((a, b) => a.slug.localeCompare(b.slug));
  return sorted[dailyIndex(date, sorted.length)];
}

/** All items sharing the highest score (input order preserved). */
function topGroup<T>(items: readonly T[], score: (item: T) => number): T[] {
  let best = -Infinity;
  for (const item of items) best = Math.max(best, score(item));
  return items.filter((item) => score(item) === best);
}

// ─── Selection (pure, fully testable) ────────────────────────────────────────

export interface SelectionInput {
  entries: readonly BaseEntry[];
  /** UTC date being selected for (YYYY-MM-DD). */
  date: string;
  /** slug → net relevance change over the velocity window. */
  velocities?: ReadonlyMap<string, number>;
  /** Overall quality 0–100. Only called for tier-3 candidates. */
  getQuality?: (entry: BaseEntry) => number;
}

/** "MM-DD" of a historicalDate, or null when absent / not day-precise. */
function exactMonthDay(historicalDate: string | undefined): string | null {
  if (!historicalDate) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(historicalDate);
  if (!m) return null;
  // Day "01" is treated as year/month precision, never an exact day.
  if (m[3] === "01") return null;
  return `${m[2]}-${m[3]}`;
}

function yearsAgoLabel(historicalDate: string, date: string): string | undefined {
  const years = Number(date.slice(0, 4)) - Number(historicalDate.slice(0, 4));
  if (!Number.isFinite(years) || years < 0) return undefined;
  if (years === 0) return "This year";
  return years === 1 ? "1 year ago today" : `${years} years ago today`;
}

export function selectDailyFeatured(
  input: SelectionInput,
): FeaturedSelection | null {
  const { entries, date, velocities, getQuality } = input;
  if (entries.length === 0) return null;
  const bySlug = new Map(entries.map((e) => [e.slug, e]));

  // 1) Velocity spike
  if (velocities && velocities.size > 0) {
    const spikes = [...velocities]
      .filter(([slug, change]) => bySlug.has(slug) && change >= MIN_VELOCITY_SPIKE)
      .map(([slug, change]) => ({ slug, change }));
    if (spikes.length > 0) {
      const pick = pickByDateHash(topGroup(spikes, (s) => s.change), date);
      if (pick) {
        return {
          slug: pick.slug,
          reason: "velocity-spike",
          detail: `+${Math.round(pick.change)} popularity in ${VELOCITY_WINDOW_DAYS} days`,
        };
      }
    }
  }

  // 2) On This Day — most influential entry whose origin date is today
  const monthDay = date.slice(5);
  const todays = entries.filter((e) => exactMonthDay(e.historicalDate) === monthDay);
  if (todays.length > 0) {
    const pick = pickByDateHash(
      topGroup(todays, (e) => e.scores?.influence ?? 0),
      date,
    );
    if (pick) {
      return {
        slug: pick.slug,
        reason: "on-this-day",
        detail: yearsAgoLabel(pick.historicalDate!, date),
      };
    }
  }

  // 3) Under-the-radar gem — good article, comparatively few views
  const views = entries.map((e) => e.views ?? 0).sort((a, b) => a - b);
  const viewsCeiling = views[Math.floor((views.length - 1) * GEM_VIEWS_PERCENTILE)];
  const quality = getQuality ?? (() => 100);
  const gems = entries.filter(
    (e) => (e.views ?? 0) <= viewsCeiling && quality(e) >= GEM_MIN_QUALITY,
  );
  const gem = pickByDateHash(gems, date);
  if (gem) return { slug: gem.slug, reason: "hidden-gem" };

  // 4) Deterministic daily hash over the whole catalog
  const spotlight = pickByDateHash(entries, date);
  return spotlight ? { slug: spotlight.slug, reason: "daily-spotlight" } : null;
}

// ─── Data loading + caching ──────────────────────────────────────────────────

function makeQualityFn(entries: readonly BaseEntry[]): (e: BaseEntry) => number {
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const memo = new Map<string, number>();
  return (entry) => {
    let q = memo.get(entry.slug);
    if (q === undefined) {
      try {
        q = scoreEntry(entry, bySlug).scores.overall;
      } catch {
        q = 0; // an entry we can't score is never a "high-quality" gem
      }
      memo.set(entry.slug, q);
    }
    return q;
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Redis read timed out")), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

/**
 * Full computation including the Redis read. THROWS if Redis is configured
 * but unreadable — so the cache layer never stores a pick made without the
 * velocity data it should have had.
 */
async function computeSelection(
  date: string,
  entries: readonly BaseEntry[],
): Promise<FeaturedSelection | null> {
  const since = shiftDate(date, -(VELOCITY_WINDOW_DAYS - 1));
  const recent = await withTimeout(
    getRecentMetricChanges(
      entries.map((e) => e.slug),
      since,
    ),
    REDIS_TIMEOUT_MS,
  );
  return selectDailyFeatured({
    entries,
    date,
    velocities: recent.status === "ok" ? recent.changes : undefined,
    getQuality: makeQualityFn(entries),
  });
}

/**
 * The featured article for the current UTC date, or null if the catalog is
 * empty. Never throws — callers can fall back to another homepage pick.
 */
export async function getDailyFeaturedArticle(
  now: Date = new Date(),
): Promise<DailyFeaturedArticle | null> {
  const date = getUtcDateString(now);
  let entries: BaseEntry[];
  try {
    entries = getAllEntriesSync();
  } catch {
    return null;
  }
  if (entries.length === 0) return null;
  const bySlug = new Map(entries.map((e) => [e.slug, e]));

  let selection: FeaturedSelection | null = null;
  try {
    // Locked per UTC date: key includes the date string.
    selection = await unstable_cache(
      () => computeSelection(date, entries),
      ["daily-featured", date],
      { revalidate: 86400, tags: [DAILY_FEATURED_CACHE_TAG] },
    )();
  } catch {
    // Redis unreadable (not cached). Degrade to the Redis-free tiers.
    selection = null;
  }

  // A cached slug can outlive the deploy that produced it (the data cache
  // persists across deployments); if it no longer exists, recompute locally.
  if (!selection || !bySlug.has(selection.slug)) {
    selection = selectDailyFeatured({
      entries,
      date,
      getQuality: makeQualityFn(entries),
    });
  }
  if (!selection) return null;
  const entry = bySlug.get(selection.slug);
  return entry ? { ...selection, entry, date } : null;
}

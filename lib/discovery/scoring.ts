import type { BaseEntry } from "@/types";
import { getRelevanceScore } from "@/lib/intelligence/culturalScores";

/**
 * Homepage / discovery helpers.
 * Public discovery sorts use Current Popularity (scores.relevance) —
 * never fabricated traffic, never stale dynamicMetadata caches.
 */

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/**
 * True when dynamic metadata was refreshed with confident live scores.
 * Used for optional momentum signals — not for Current Popularity ordering.
 */
export function hasConfidentTrendingMetadata(entry: BaseEntry): boolean {
  const meta = entry.dynamicMetadata;
  if (!meta?.lastReviewed) return false;
  if (meta.currentRelevance === "unknown") return false;
  if (typeof meta.currentRelevance !== "number") return false;
  if (meta.trendingScore === "unknown") return false;
  if (typeof meta.trendingScore !== "number") return false;
  return true;
}

/**
 * Current Popularity for discovery / Trending Now / rankings ordering.
 * Always reads the editorial `scores.relevance` on the entry — the same
 * value shown on ScoreBars — so a manual score edit + rebuild reorders lists.
 */
export function getCurrentPopularityScore(entry: BaseEntry): number {
  return getRelevanceScore(entry);
}

/**
 * Trend strength (short-window momentum). Separate from Current Popularity.
 * Only meaningful when {@link hasConfidentTrendingMetadata} is true.
 */
export function getTrendScore(entry: BaseEntry): number {
  if (!hasConfidentTrendingMetadata(entry)) return 0;
  const trending = entry.dynamicMetadata?.trendingScore;
  if (typeof trending === "number") return clamp(trending);
  return 0;
}

/**
 * Editorial prominence for discovery grids (same signal as Current Popularity).
 * Kept as a named helper for call sites that previously meant “popular.”
 */
export function getPopularityScore(entry: BaseEntry): number {
  return getCurrentPopularityScore(entry);
}

/** Newest-first using addedAt. */
export function getAddedAtTimestamp(entry: BaseEntry): number {
  const t = new Date(entry.addedAt).getTime();
  return Number.isFinite(t) ? t : 0;
}

/**
 * Shared descending Current Popularity sort (highest first).
 * Fresh every call from live entry.scores.relevance — no stored rank fields.
 */
export function sortByCurrentPopularity<T extends BaseEntry>(
  entries: readonly T[],
): T[] {
  return [...entries].sort((a, b) => {
    const pop = getCurrentPopularityScore(b) - getCurrentPopularityScore(a);
    if (pop !== 0) return pop;
    // Stable tie-break: title, then slug.
    const title = a.title.localeCompare(b.title, undefined, {
      sensitivity: "base",
    });
    if (title !== 0) return title;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Homepage / Trending Now — full catalog sorted by Current Popularity
 * (editorial scores.relevance). A score edit + commit is enough to reorder.
 */
export function selectTrendingNow(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return sortByCurrentPopularity(entries).slice(0, limit);
}

/** Highest Current Popularity — not catalog view counts. */
export function selectMostPopular(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return sortByCurrentPopularity(entries).slice(0, limit);
}

export function selectRecentlyAdded(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return [...entries]
    .sort((a, b) => getAddedAtTimestamp(b) - getAddedAtTimestamp(a))
    .slice(0, limit);
}

const YEAR_REGEX = /\b(19|20)\d{2}\b/;

function extractYear(text?: string | null): number | null {
  if (!text) return null;
  const match = text.match(YEAR_REGEX);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * Best-effort real-world origin year for an entry, used for age-based
 * classification (e.g. "Classic" sections). Prefers the explicit
 * `historicalDate` field, then the earliest parseable timeline event
 * (memes only), then `origin` prose, then tags, then `addedAt` as a
 * last resort — never trendDirection, which reflects current momentum
 * and says nothing about how old an entry actually is.
 */
export function getOriginYear(entry: BaseEntry): number | null {
  const fromHistorical = extractYear(entry.historicalDate);
  if (fromHistorical) return fromHistorical;

  const timeline = (entry as { timeline?: { date: string }[] }).timeline;
  if (Array.isArray(timeline) && timeline.length > 0) {
    const years = timeline
      .map((t) => extractYear(t.date))
      .filter((y): y is number => y !== null);
    if (years.length > 0) return Math.min(...years);
  }

  const fromOrigin = extractYear(entry.origin);
  if (fromOrigin) return fromOrigin;

  const fromTags = entry.tags
    ?.map((t) => extractYear(t))
    .find((y): y is number => y !== null);
  if (fromTags) return fromTags;

  return extractYear(entry.addedAt);
}

/**
 * True when an entry's real-world origin is at least `minYears` years old.
 * "Classic" should mean actually old — a currently-declining recent entry
 * (e.g. 2024) is not classic just because interest is fading.
 */
export function isClassicByAge(entry: BaseEntry, minYears = 3): boolean {
  const originYear = getOriginYear(entry);
  if (originYear === null) return false;
  return new Date().getFullYear() - originYear >= minYears;
}

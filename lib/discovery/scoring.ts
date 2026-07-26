import type { BaseEntry } from "@/types";
import { getRelevanceScore } from "@/lib/intelligence/culturalScores";

/**
 * Homepage / discovery helpers.
 * Public discovery sorts use Current Popularity (scores.relevance) —
 * never fabricated traffic.
 */

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/**
 * True when dynamic metadata was refreshed with confident live scores.
 * Homepage Trending only includes these entries — never Unknown or
 * never-refreshed stale stored Current Popularity.
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
 * Current Popularity for discovery / Trending Now ordering.
 * Prefers live `currentRelevance` when confident; otherwise editorial score.
 */
export function getCurrentPopularityScore(entry: BaseEntry): number {
  if (hasConfidentTrendingMetadata(entry)) {
    const live = entry.dynamicMetadata?.currentRelevance;
    if (typeof live === "number") return clamp(live);
  }
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
 * Homepage Trending — confident live scores only, sorted left-to-right by
 * highest Current Popularity (not historical fame, not short-window trending alone).
 * Considers the full catalog passed in (typically getAllEntries()).
 */
export function selectTrendingNow(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return [...entries]
    .filter(hasConfidentTrendingMetadata)
    .sort((a, b) => {
      const pop = getCurrentPopularityScore(b) - getCurrentPopularityScore(a);
      if (pop !== 0) return pop;
      return getTrendScore(b) - getTrendScore(a);
    })
    .slice(0, limit);
}

/** Highest Current Popularity — not catalog view counts. */
export function selectMostPopular(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return [...entries]
    .sort((a, b) => getPopularityScore(b) - getPopularityScore(a))
    .slice(0, limit);
}

export function selectRecentlyAdded(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return [...entries]
    .sort((a, b) => getAddedAtTimestamp(b) - getAddedAtTimestamp(a))
    .slice(0, limit);
}

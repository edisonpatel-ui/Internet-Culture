import type { BaseEntry } from "@/types";
import { getRelevanceScore } from "@/lib/intelligence/culturalScores";

/**
 * Homepage / discovery helpers.
 * Trending uses editorial relevance. Popular uses catalog views.
 */

/**
 * Trend strength for "Trending Now".
 */
export function getTrendScore(entry: BaseEntry): number {
  return getRelevanceScore(entry);
}

/**
 * Popularity for "Most Popular" — catalog views only (not a cultural score).
 */
export function getPopularityScore(entry: BaseEntry): number {
  return entry.views;
}

/** Newest-first using addedAt. */
export function getAddedAtTimestamp(entry: BaseEntry): number {
  const t = new Date(entry.addedAt).getTime();
  return Number.isFinite(t) ? t : 0;
}

export function selectTrendingNow(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return [...entries]
    .sort((a, b) => getTrendScore(b) - getTrendScore(a))
    .slice(0, limit);
}

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

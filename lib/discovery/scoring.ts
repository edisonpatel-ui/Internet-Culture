import type { BaseEntry } from "@/types";
import { getRelevanceScore } from "@/lib/intelligence/culturalScores";

/**
 * Future-proof scoring helpers for homepage / discovery surfaces.
 *
 * Prefer dedicated fields when present; otherwise fall back to existing
 * BaseEntry data so no content migration is required.
 *
 * Trending uses *current relevance* (calibrated) — not cultural impact.
 */

type EntryWithOptionalScores = BaseEntry & {
  trendScore?: number;
  popularityScore?: number;
};

/**
 * Trend strength for "Trending Now".
 * Priority: trendScore → calibrated current relevance (not historical impact)
 */
export function getTrendScore(entry: BaseEntry): number {
  const e = entry as EntryWithOptionalScores;
  if (typeof e.trendScore === "number") return e.trendScore;
  return getRelevanceScore(entry);
}

/**
 * Popularity for "Most Popular".
 * Priority: popularityScore → scores.popularity → views
 */
export function getPopularityScore(entry: BaseEntry): number {
  const e = entry as EntryWithOptionalScores;
  if (typeof e.popularityScore === "number") return e.popularityScore;
  if (typeof entry.scores.popularity === "number") return entry.scores.popularity;
  return entry.views;
}

/** Newest-first using addedAt (no createdAt field today). */
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

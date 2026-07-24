import type { BaseEntry } from "@/types";
import { getRelevanceScore } from "@/lib/intelligence/culturalScores";

/**
 * Homepage / discovery helpers.
 * Public discovery sorts use editorial relevance — never fabricated traffic.
 */

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/**
 * True when dynamic metadata was refreshed with confident live scores.
 * Homepage Trending only includes these entries — never Unknown or
 * never-refreshed stale stored relevance.
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
 * Trend strength for "Trending Now".
 * Only meaningful when {@link hasConfidentTrendingMetadata} is true.
 */
export function getTrendScore(entry: BaseEntry): number {
  if (!hasConfidentTrendingMetadata(entry)) return 0;
  const trending = entry.dynamicMetadata?.trendingScore;
  if (typeof trending === "number") return clamp(trending);
  return 0;
}

/**
 * Editorial prominence for discovery grids (same signal as relevance).
 * Kept as a named helper for call sites that previously meant “popular.”
 */
export function getPopularityScore(entry: BaseEntry): number {
  return getRelevanceScore(entry);
}

/** Newest-first using addedAt. */
export function getAddedAtTimestamp(entry: BaseEntry): number {
  const t = new Date(entry.addedAt).getTime();
  return Number.isFinite(t) ? t : 0;
}

/**
 * Homepage Trending — only confidently refreshed live trending scores.
 * Unknown Current Relevance / Unknown trending / never-refreshed entries excluded.
 */
export function selectTrendingNow(
  entries: readonly BaseEntry[],
  limit = 6,
): BaseEntry[] {
  return [...entries]
    .filter(hasConfidentTrendingMetadata)
    .sort((a, b) => getTrendScore(b) - getTrendScore(a))
    .slice(0, limit);
}

/** Highest editorial relevance — not catalog view counts. */
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

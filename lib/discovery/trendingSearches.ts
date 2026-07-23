/**
 * Trending Searches — empty-state suggestions for /search.
 *
 * Built from editorial catalog signals only (no fake search counts).
 * Swap {@link getTrendingSearches}’s data source later for analytics without
 * changing the UI contract ({@link TrendingSearchTopic}).
 */

import type { BaseEntry, TrendDirection } from "@/types";
import {
  getInfluenceScore,
  getRelevanceScore,
} from "@/lib/intelligence/culturalScores";
import { getAddedAtTimestamp } from "@/lib/discovery/scoring";

/** Serializable chip for the search empty state. */
export interface TrendingSearchTopic {
  /** Display label — topic name only. */
  label: string;
  /** Query string applied when the chip is clicked. */
  query: string;
  /** Canonical slug (stable key; not shown in UI). */
  slug: string;
}

export interface TrendingSearchEntry {
  slug: string;
  title: string;
  scores: BaseEntry["scores"];
  addedAt: string;
  trendDirection: TrendDirection;
}

export interface TrendingSearchesOptions {
  /** Target chip count (clamped to 8–15). Default 12. */
  limit?: number;
  /** Minimum relevance to appear. Default 55. */
  minRelevance?: number;
}

const MS_PER_DAY = 86_400_000;

function clampLimit(n: number): number {
  return Math.max(8, Math.min(15, Math.round(n)));
}

/**
 * Recent-add boost: up to ~4 points in the first ~30 days, then none.
 * Small by design — never outweighs relevance/influence.
 */
function recentBoost(addedAt: string, now: number): number {
  const t = getAddedAtTimestamp({ addedAt } as BaseEntry);
  if (!t) return 0;
  const ageDays = (now - t) / MS_PER_DAY;
  if (ageDays < 0 || ageDays > 30) return 0;
  return Math.round(4 * (1 - ageDays / 30));
}

function directionBoost(direction: TrendDirection): number {
  if (direction === "rising") return 8;
  if (direction === "new") return 5;
  return 0;
}

/**
 * Editorial ranking for trending search chips.
 * Priority: current relevance → editorial influence → recent add (small).
 */
export function scoreTrendingSearchCandidate(
  entry: TrendingSearchEntry,
  now = Date.now(),
): number {
  const relevance = getRelevanceScore(entry as BaseEntry);
  const influence = getInfluenceScore(entry as BaseEntry);
  return (
    relevance * 1.0 +
    influence * 0.45 +
    directionBoost(entry.trendDirection) +
    recentBoost(entry.addedAt, now)
  );
}

/**
 * Pick 8–15 topic chips from encyclopedia entries.
 * Pass any catalog snapshot; analytics can replace this later.
 */
export function getTrendingSearches(
  entries: readonly TrendingSearchEntry[],
  options: TrendingSearchesOptions = {},
): TrendingSearchTopic[] {
  const limit = clampLimit(options.limit ?? 12);
  const minRelevance = options.minRelevance ?? 55;
  const now = Date.now();

  const ranked = entries
    .filter((e) => e.title.trim().length > 0)
    .filter((e) => getRelevanceScore(e as BaseEntry) >= minRelevance)
    .map((e) => ({
      entry: e,
      score: scoreTrendingSearchCandidate(e, now),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.entry.title.localeCompare(b.entry.title);
    });

  const seen = new Set<string>();
  const out: TrendingSearchTopic[] = [];

  for (const { entry } of ranked) {
    if (seen.has(entry.slug)) continue;
    seen.add(entry.slug);
    out.push({
      label: entry.title.trim(),
      query: entry.title.trim(),
      slug: entry.slug,
    });
    if (out.length >= limit) break;
  }

  return out;
}

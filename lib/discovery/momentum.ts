/**
 * Momentum helpers — trendDirection (rising / stable / declining / new)
 * is independent of the Trend content category.
 */

import type { BaseEntry } from "@/types";

/**
 * Entries currently gaining momentum across the whole catalog.
 * Not limited to category === "trend".
 */
export function selectRisingFast(
  entries: readonly BaseEntry[],
  limit?: number,
): BaseEntry[] {
  const rising = entries
    .filter((e) => e.trendDirection === "rising")
    .sort(
      (a, b) =>
        b.scores.relevance - a.scores.relevance || b.views - a.views,
    );
  return limit == null ? rising : rising.slice(0, limit);
}

/**
 * Trend-category showcase only (aesthetic / cultural movements).
 * Not a popularity or momentum feed.
 */
export function selectTrendCategoryEntries(
  entries: readonly BaseEntry[],
): BaseEntry[] {
  return entries
    .filter((e) => e.category === "trend")
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function selectDecliningMomentum(
  entries: readonly BaseEntry[],
): BaseEntry[] {
  return entries.filter((e) => e.trendDirection === "declining");
}

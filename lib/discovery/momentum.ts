/**
 * Momentum helpers — trendDirection (rising / stable / declining / new)
 * is independent of the Trend content category.
 */

import type { BaseEntry } from "@/types";
import { sortByCurrentPopularity } from "./scoring";

/**
 * Entries currently gaining momentum across the whole catalog.
 * Not limited to category === "trend".
 */
export function selectRisingFast(
  entries: readonly BaseEntry[],
  limit?: number,
): BaseEntry[] {
  const rising = sortByCurrentPopularity(
    entries.filter((e) => e.trendDirection === "rising"),
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
  return sortByCurrentPopularity(
    entries.filter((e) => e.category === "trend"),
  );
}

export function selectDecliningMomentum(
  entries: readonly BaseEntry[],
): BaseEntry[] {
  return entries.filter((e) => e.trendDirection === "declining");
}

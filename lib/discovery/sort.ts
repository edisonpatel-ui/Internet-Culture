import type { BaseEntry } from "@/types";
import type { SortOption } from "./types";

/**
 * Sort entries with safe fallbacks for missing dedicated score fields:
 * - relevance  → scores.relevance
 * - popular    → views (no popularityScore field)
 * - newest     → addedAt (no createdAt field)
 * - az         → title
 */
export function sortEntries<T extends BaseEntry>(
  items: readonly T[],
  sort: SortOption,
): T[] {
  const copy = [...items];

  switch (sort) {
    case "popular":
      return copy.sort((a, b) => b.views - a.views);
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
    case "az":
      return copy.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
      );
    case "relevance":
    default:
      return copy.sort((a, b) => b.scores.relevance - a.scores.relevance);
  }
}

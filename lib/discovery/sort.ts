import type { BaseEntry } from "@/types";
import { sortByCurrentPopularity } from "./scoring";
import type { SortOption } from "./types";

/**
 * Sort entries with safe fallbacks for missing dedicated score fields:
 * - relevance / popular → Current Popularity (scores.relevance)
 * - newest             → addedAt
 * - az                 → title
 */
export function sortEntries<T extends BaseEntry>(
  items: readonly T[],
  sort: SortOption,
): T[] {
  const copy = [...items];

  switch (sort) {
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
    case "az":
      return copy.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
      );
    case "popular":
    case "relevance":
    default:
      return sortByCurrentPopularity(copy);
  }
}

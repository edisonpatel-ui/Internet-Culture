import type { BaseEntry, CreatorEntry } from "@/types";
import type { FilterOption } from "./types";

function hasTag(entry: BaseEntry, needle: string): boolean {
  const n = needle.toLowerCase();
  return (entry.tags ?? []).some((t) => t.toLowerCase() === n);
}

function hasPlatform(entry: BaseEntry, needle: string): boolean {
  const n = needle.toLowerCase();
  const platforms = (entry as CreatorEntry).platforms;
  if (!platforms?.length) return false;
  return platforms.some((p) => p.platform.toLowerCase() === n);
}

/** True if the entry matches the filter via tags and/or platforms. */
export function matchesFilter(entry: BaseEntry, filter: FilterOption): boolean {
  const tagHit = filter.tags?.some((t) => hasTag(entry, t)) ?? false;
  const platformHit =
    filter.platforms?.some((p) => hasPlatform(entry, p)) ?? false;

  // If both lists are empty, treat as non-matching (misconfigured filter).
  if (!filter.tags?.length && !filter.platforms?.length) return false;

  // OR across configured dimensions — either tags or platforms can qualify.
  if (filter.tags?.length && filter.platforms?.length) {
    return tagHit || platformHit;
  }
  if (filter.tags?.length) return tagHit;
  return platformHit;
}

/**
 * Apply active filter IDs (OR within a single filter's criteria;
 * AND across multiple selected filters — entry must match every selected chip).
 */
export function applyFilters<T extends BaseEntry>(
  items: readonly T[],
  activeIds: readonly string[],
  filterDefs: readonly FilterOption[],
): T[] {
  if (activeIds.length === 0) return [...items];

  const active = filterDefs.filter((f) => activeIds.includes(f.id));
  if (active.length === 0) return [...items];

  return items.filter((item) =>
    active.every((filter) => matchesFilter(item, filter)),
  );
}

export function matchesSearch(
  entry: BaseEntry,
  query: string,
  getSearchText: (entry: BaseEntry) => string,
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return getSearchText(entry).toLowerCase().includes(q);
}

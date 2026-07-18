import type { BaseEntry } from "@/types";

/** Shared catalog search haystack — keep filters consistent across categories. */
export function entrySearchText(
  entry: Pick<BaseEntry, "title" | "description" | "tags">,
  ...extra: Array<string | undefined | null>
): string {
  return [entry.title, entry.description, entry.tags?.join(" "), ...extra]
    .filter((part): part is string => Boolean(part && part.trim()))
    .join(" ");
}

/** Alias for the common title + description + tags case. */
export function defaultEntrySearchText(
  entry: Pick<BaseEntry, "title" | "description" | "tags">,
): string {
  return entrySearchText(entry);
}

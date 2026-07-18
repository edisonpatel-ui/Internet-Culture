/**
 * Shared discovery types for category listing pages.
 * Sorting/filtering operate on existing BaseEntry fields only —
 * no content migration required.
 */

export type SortOption = "relevance" | "popular" | "newest" | "az";

export interface SortOptionDef {
  id: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionDef[] = [
  { id: "relevance", label: "Relevance" },
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "az", label: "A–Z" },
];

/**
 * A filter chip. Matching uses existing tags / platforms only.
 * An entry matches when ANY listed tag or platform is present.
 */
export interface FilterOption {
  id: string;
  label: string;
  /** Match against entry.tags (case-insensitive). */
  tags?: string[];
  /** Match against creator platforms[].platform (case-insensitive). */
  platforms?: string[];
}

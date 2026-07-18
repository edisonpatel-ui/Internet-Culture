"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { FilterBar } from "@/components/discovery/FilterBar";
import { PaginatedGrid } from "@/components/catalog/PaginatedGrid";
import { applyFilters, matchesSearch } from "@/lib/discovery/match";
import { sortEntries } from "@/lib/discovery/sort";
import type { FilterOption, SortOption } from "@/lib/discovery/types";
import type { BaseEntry } from "@/types";

interface DiscoveryCatalogProps<T extends BaseEntry> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  getSearchText: (item: T) => string;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  defaultSort?: SortOption;
  gridClassName?: string;
  /** Plural noun for results count, e.g. "memes". */
  noun?: string;
}

/**
 * Category discovery shell:
 * Filter → Sort → Display (paginated) → Load More
 */
export function DiscoveryCatalog<T extends BaseEntry>({
  items,
  getKey,
  renderItem,
  getSearchText,
  searchPlaceholder = "Search…",
  filters = [],
  defaultSort = "relevance",
  gridClassName,
  noun = "results",
}: DiscoveryCatalogProps<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>(defaultSort);
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);

  const toggleFilter = useCallback((id: string) => {
    setActiveFilterIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveFilterIds([]);
    setSort(defaultSort);
  }, [defaultSort]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    activeFilterIds.length > 0 ||
    sort !== defaultSort;

  const processed = useMemo(() => {
    const searched = items.filter((item) =>
      matchesSearch(item, query, getSearchText as (e: BaseEntry) => string),
    );
    const filtered = applyFilters(searched, activeFilterIds, filters);
    return sortEntries(filtered, sort);
  }, [items, query, activeFilterIds, filters, sort, getSearchText]);

  // Remount grid when discovery inputs change so pagination resets without effects.
  const gridKey = `${sort}|${activeFilterIds.join(",")}|${query}`;

  return (
    <div>
      <FilterBar
        searchQuery={query}
        onSearchChange={setQuery}
        searchPlaceholder={searchPlaceholder}
        sort={sort}
        onSortChange={setSort}
        filters={filters}
        activeFilterIds={activeFilterIds}
        onToggleFilter={toggleFilter}
        onClear={clearFilters}
        totalCount={processed.length}
        noun={noun}
        hasActiveFilters={hasActiveFilters}
      />

      <PaginatedGrid
        key={gridKey}
        items={processed}
        getKey={getKey}
        renderItem={renderItem}
        enableSearch={false}
        gridClassName={gridClassName}
        emptyMessage={`No ${noun} match. Clear filters or try another search.`}
      />
    </div>
  );
}

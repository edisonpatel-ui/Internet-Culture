"use client";

import { CategoryFilter } from "@/components/discovery/CategoryFilter";
import { ResultsCount } from "@/components/discovery/ResultsCount";
import { SortDropdown } from "@/components/discovery/SortDropdown";
import type { FilterOption, SortOption } from "@/lib/discovery/types";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  filters: FilterOption[];
  activeFilterIds: string[];
  onToggleFilter: (id: string) => void;
  onClear: () => void;
  totalCount: number;
  noun?: string;
  hasActiveFilters: boolean;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search…",
  sort,
  onSortChange,
  filters,
  activeFilterIds,
  onToggleFilter,
  onClear,
  totalCount,
  noun,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <label className="sr-only" htmlFor="discovery-search">
            Search
          </label>
          <input
            id="discovery-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
        <SortDropdown value={sort} onChange={onSortChange} />
      </div>

      {filters.length > 0 && (
        <CategoryFilter
          filters={filters}
          activeIds={activeFilterIds}
          onToggle={onToggleFilter}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ResultsCount total={totalCount} noun={noun} />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-violet-300 transition hover:text-violet-200"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

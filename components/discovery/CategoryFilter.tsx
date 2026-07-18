"use client";

import type { FilterOption } from "@/lib/discovery/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  filters: FilterOption[];
  activeIds: string[];
  onToggle: (id: string) => void;
}

export function CategoryFilter({
  filters,
  activeIds,
  onToggle,
}: CategoryFilterProps) {
  if (filters.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      {filters.map((filter) => {
        const active = activeIds.includes(filter.id);
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(filter.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
              active
                ? "border border-violet-400/40 bg-violet-500/20 text-violet-200"
                : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

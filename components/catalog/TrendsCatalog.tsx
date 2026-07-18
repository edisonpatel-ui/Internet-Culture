"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { PaginatedGrid } from "@/components/catalog/PaginatedGrid";
import {
  getTrendDirectionColor,
  getTrendDirectionIcon,
} from "@/lib/utils";
import type { BaseEntry } from "@/types";

export function TrendsCatalog({ items }: { items: BaseEntry[] }) {
  return (
    <PaginatedGrid
      items={items}
      getKey={(t) => t.id}
      getSearchText={(t) =>
        `${t.title} ${t.description} ${t.tags?.join(" ") ?? ""} ${t.category}`
      }
      searchPlaceholder="Search trends…"
      renderItem={(entry) => (
        <div className="relative">
          <span
            className={`absolute right-3 top-3 z-10 rounded-full bg-black/30 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm ${getTrendDirectionColor(entry.trendDirection)}`}
          >
            {getTrendDirectionIcon(entry.trendDirection)} {entry.trendDirection}
          </span>
          <TrendCard entry={entry} />
        </div>
      )}
    />
  );
}

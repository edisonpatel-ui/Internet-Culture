"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { DiscoveryCatalog } from "@/components/discovery/DiscoveryCatalog";
import { TREND_FILTERS } from "@/lib/discovery/filters";
import { entrySearchText } from "@/lib/discovery/searchText";
import {
  getTrendDirectionColor,
  getTrendDirectionIcon,
} from "@/lib/utils";
import type { BaseEntry } from "@/types";

export function TrendsCatalog({ items }: { items: BaseEntry[] }) {
  return (
    <DiscoveryCatalog
      items={items}
      getKey={(t) => t.id}
      getSearchText={(t) => entrySearchText(t, t.category)}
      searchPlaceholder="Search trends…"
      filters={TREND_FILTERS}
      noun="trends"
      renderItem={(entry) => (
        <div className="relative">
          <span
            className={`absolute right-3 top-3 z-10 rounded-full bg-black/30 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm ${getTrendDirectionColor(entry.trendDirection)}`}
            aria-label={`Trend direction: ${entry.trendDirection}`}
          >
            <span aria-hidden>
              {getTrendDirectionIcon(entry.trendDirection)}{" "}
            </span>
            {entry.trendDirection}
          </span>
          <TrendCard entry={entry} />
        </div>
      )}
    />
  );
}

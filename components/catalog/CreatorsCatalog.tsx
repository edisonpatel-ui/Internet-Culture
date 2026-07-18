"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { PaginatedGrid } from "@/components/catalog/PaginatedGrid";
import type { CreatorEntry } from "@/types";

export function CreatorsCatalog({ items }: { items: CreatorEntry[] }) {
  return (
    <PaginatedGrid
      items={items}
      getKey={(c) => c.id}
      getSearchText={(c) =>
        `${c.title} ${c.description} ${c.tags?.join(" ") ?? ""}`
      }
      searchPlaceholder="Search creators…"
      renderItem={(creator) => <TrendCard entry={creator} />}
    />
  );
}

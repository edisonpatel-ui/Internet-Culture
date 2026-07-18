"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { PaginatedGrid } from "@/components/catalog/PaginatedGrid";
import type { MemeEntry } from "@/types";

export function MemesCatalog({ items }: { items: MemeEntry[] }) {
  return (
    <PaginatedGrid
      items={items}
      getKey={(m) => m.id}
      getSearchText={(m) =>
        `${m.title} ${m.description} ${m.tags?.join(" ") ?? ""}`
      }
      searchPlaceholder="Search memes…"
      renderItem={(meme) => <TrendCard entry={meme} />}
    />
  );
}

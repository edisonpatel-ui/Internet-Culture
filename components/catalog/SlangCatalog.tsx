"use client";

import { SlangCard } from "@/components/cards/SlangCard";
import { PaginatedGrid } from "@/components/catalog/PaginatedGrid";
import type { SlangEntry } from "@/types";

export function SlangCatalog({ items }: { items: SlangEntry[] }) {
  return (
    <PaginatedGrid
      items={items}
      getKey={(s) => s.id}
      getSearchText={(s) =>
        `${s.title} ${s.definition} ${s.description} ${s.tags?.join(" ") ?? ""}`
      }
      searchPlaceholder="Search slang…"
      gridClassName="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      renderItem={(term) => <SlangCard term={term} />}
    />
  );
}

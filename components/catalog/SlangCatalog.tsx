"use client";

import { SlangCard } from "@/components/cards/SlangCard";
import { DiscoveryCatalog } from "@/components/discovery/DiscoveryCatalog";
import { SLANG_FILTERS } from "@/lib/discovery/filters";
import type { SlangEntry } from "@/types";

export function SlangCatalog({ items }: { items: SlangEntry[] }) {
  return (
    <DiscoveryCatalog
      items={items}
      getKey={(s) => s.id}
      getSearchText={(s) =>
        `${s.title} ${s.definition} ${s.description} ${s.tags?.join(" ") ?? ""}`
      }
      searchPlaceholder="Search slang…"
      filters={SLANG_FILTERS}
      noun="slang terms"
      gridClassName="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      renderItem={(term) => <SlangCard term={term} />}
    />
  );
}

"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { DiscoveryCatalog } from "@/components/discovery/DiscoveryCatalog";
import { MEME_FILTERS } from "@/lib/discovery/filters";
import { defaultEntrySearchText } from "@/lib/discovery/searchText";
import type { MemeEntry } from "@/types";

export function MemesCatalog({ items }: { items: MemeEntry[] }) {
  return (
    <DiscoveryCatalog
      items={items}
      getKey={(m) => m.id}
      getSearchText={defaultEntrySearchText}
      searchPlaceholder="Search memes…"
      filters={MEME_FILTERS}
      noun="memes"
      renderItem={(meme) => <TrendCard entry={meme} />}
    />
  );
}

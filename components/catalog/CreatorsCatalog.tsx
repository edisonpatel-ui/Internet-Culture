"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { DiscoveryCatalog } from "@/components/discovery/DiscoveryCatalog";
import { CREATOR_FILTERS } from "@/lib/discovery/filters";
import { entrySearchText } from "@/lib/discovery/searchText";
import type { CreatorEntry } from "@/types";

export function CreatorsCatalog({ items }: { items: CreatorEntry[] }) {
  return (
    <DiscoveryCatalog
      items={items}
      getKey={(c) => c.id}
      getSearchText={(c) =>
        entrySearchText(
          c,
          c.platforms?.map((p) => p.platform).join(" "),
        )
      }
      searchPlaceholder="Search creators…"
      filters={CREATOR_FILTERS}
      noun="creators"
      renderItem={(creator) => <TrendCard entry={creator} />}
    />
  );
}

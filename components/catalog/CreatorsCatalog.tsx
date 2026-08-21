"use client";

import { TrendCard } from "@/components/cards/TrendCard";
import { DiscoveryCatalog } from "@/components/discovery/DiscoveryCatalog";
import { CREATOR_FILTERS } from "@/lib/discovery/filters";
import { entrySearchText } from "@/lib/discovery/searchText";
import type { CreatorEntry, CreatorPlatformLink } from "@/types";

export function CreatorsCatalog({ items }: { items: CreatorEntry[] }) {
  return (
    <DiscoveryCatalog
      items={items}
      getKey={(c) => c.id}
      getSearchText={(c) =>
        entrySearchText(
          c,
          c.platforms?.map((p: CreatorPlatformLink) => p.platform).join(" "),
          c.personType,
        )
      }
      searchPlaceholder="Search people…"
      filters={CREATOR_FILTERS}
      noun="people"
      renderItem={(creator) => <TrendCard entry={creator} />}
    />
  );
}

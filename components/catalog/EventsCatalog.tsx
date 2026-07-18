"use client";

import { EventCard } from "@/components/cards/EventCard";
import { PaginatedGrid } from "@/components/catalog/PaginatedGrid";
import type { EventEntry } from "@/types";

export function EventsCatalog({ items }: { items: EventEntry[] }) {
  return (
    <PaginatedGrid
      items={items}
      getKey={(e) => e.id}
      getSearchText={(e) =>
        `${e.title} ${e.description} ${e.impact} ${e.tags?.join(" ") ?? ""}`
      }
      searchPlaceholder="Search events…"
      gridClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      renderItem={(event) => <EventCard event={event} />}
    />
  );
}

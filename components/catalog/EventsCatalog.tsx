"use client";

import { EventCard } from "@/components/cards/EventCard";
import { DiscoveryCatalog } from "@/components/discovery/DiscoveryCatalog";
import { EVENT_FILTERS } from "@/lib/discovery/filters";
import type { EventEntry } from "@/types";

export function EventsCatalog({ items }: { items: EventEntry[] }) {
  return (
    <DiscoveryCatalog
      items={items}
      getKey={(e) => e.id}
      getSearchText={(e) =>
        `${e.title} ${e.description} ${e.impact} ${e.tags?.join(" ") ?? ""} ${e.platform ?? ""}`
      }
      searchPlaceholder="Search events…"
      filters={EVENT_FILTERS}
      noun="events"
      gridClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      renderItem={(event) => <EventCard event={event} />}
    />
  );
}

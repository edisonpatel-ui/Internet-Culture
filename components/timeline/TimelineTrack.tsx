import { TimelineCard } from "@/components/timeline/TimelineCard";
import { TimelineEmptyState } from "@/components/timeline/TimelineEmptyState";
import { groupTimelineEntriesByYear } from "@/lib/discovery/timeline";
import type { BaseEntry } from "@/types";

interface TimelineTrackProps {
  /** Already filtered to `timelineEntry.featured === true` and already
   * chronologically sorted — the page computes this once, server-side. */
  featuredEntries: readonly BaseEntry[];
}

/**
 * Visual horizontal timeline, chronologically positioned via
 * `timelineEntry.sortDate`. Stage 2 scope: shows every currently-featured
 * entry, grouped under year markers, left to right, oldest first — no
 * zoom, no per-period visibility cap, no Show More (Stage 3), no
 * click-to-select detail panel (Stage 4).
 *
 * Deliberately a Server Component: nothing here needs browser state yet.
 * `TimelineCard`'s image renderer is a client leaf internally, but that
 * does not require this component (or the page) to be client — Server
 * Components can render Client Components as children.
 */
export function TimelineTrack({ featuredEntries }: TimelineTrackProps) {
  if (featuredEntries.length === 0) {
    return <TimelineEmptyState />;
  }

  const yearGroups = groupTimelineEntriesByYear(featuredEntries);

  return (
    <div
      role="region"
      aria-label="Internet culture timeline"
      className="flex gap-6 overflow-x-auto pb-4"
      style={{ scrollSnapType: "x proximity" }}
    >
      {yearGroups.map((group) => (
        <div key={group.year} className="flex shrink-0 flex-col gap-3">
          <p className="font-page px-0.5 text-sm font-semibold text-[var(--accent)]">
            {group.year}
          </p>
          <div className="flex gap-3">
            {group.entries.map((entry) => {
              // getTimelineFeaturedEntries + content validation guarantee
              // timelineEntry is present here; narrow for TimelineCard's prop type.
              if (!entry.timelineEntry) return null;
              return (
                <div key={entry.slug} style={{ scrollSnapAlign: "start" }}>
                  <TimelineCard
                    entry={{ ...entry, timelineEntry: entry.timelineEntry }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { TimelineCard } from "@/components/timeline/TimelineCard";
import { TimelineDetailPanel } from "@/components/timeline/TimelineDetailPanel";
import { TimelineEmptyState } from "@/components/timeline/TimelineEmptyState";
import { TimelineZoomControls } from "@/components/timeline/TimelineZoomControls";
import {
  MIN_TIMELINE_RANGE_MS,
  TIMELINE_REVEAL_BATCH_SIZE,
  formatRangeLabel,
  getVisibilityCapForRange,
  getVisibleTimelineItems,
  panRange,
  zoomRange,
  type TimelineRange,
} from "@/lib/discovery/timeline";
import type { BaseEntry } from "@/types";

interface TimelineTrackProps {
  /** Already filtered to `timelineEntry.featured === true`, computed once
   * server-side. Not re-filtered by eligibility here — only range-filtered
   * and influence-sorted, per zoom/pan state, on every interaction. */
  featuredEntries: readonly BaseEntry[];
  /** The full min→max span across all featured entries, computed
   * server-side once (see lib/discovery/timeline.ts getFullTimelineRange). */
  fullRange: TimelineRange;
}

const ZOOM_FACTOR = 0.5; // zoom-in halves the span; zoom-out doubles it

/**
 * Owns all Timeline interaction state: the current visible range
 * (zoom/pan), the per-range revealed count (Show More), and — as of Stage
 * 4 — the selected milestone (drives the persistent detail panel).
 *
 * Selection is plain component state, intentionally NOT persisted to the
 * URL/localStorage/any global store: a browser refresh naturally clears
 * it, which is exactly the required behavior ("browser refresh should not
 * create stale client-side selection state") rather than something that
 * needs separate handling.
 *
 * Selecting an entry looks it up from the full `featuredEntries` prop, not
 * from the currently-shown/range-filtered subset — so the panel correctly
 * stays open with the same content if the user zooms/pans the selected
 * item out of view, instead of the panel going stale or disappearing.
 */
export function TimelineTrack({ featuredEntries, fullRange }: TimelineTrackProps) {
  const [range, setRange] = useState<TimelineRange>(fullRange);
  const [revealedCount, setRevealedCount] = useState(() =>
    getVisibilityCapForRange(fullRange),
  );
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const result = useMemo(
    () => getVisibleTimelineItems(featuredEntries, range, revealedCount),
    [featuredEntries, range, revealedCount],
  );

  const selectedEntry = useMemo(() => {
    if (!selectedSlug) return null;
    const found = featuredEntries.find((e) => e.slug === selectedSlug);
    return found?.timelineEntry ? { ...found, timelineEntry: found.timelineEntry } : null;
  }, [featuredEntries, selectedSlug]);

  function updateRange(next: TimelineRange) {
    setRange(next);
    // New visible period → start over from that period's own default cap,
    // per §6: a per-range revealed count, not carried over from elsewhere.
    setRevealedCount(getVisibilityCapForRange(next));
  }

  function handleZoomIn() {
    updateRange(zoomRange(range, ZOOM_FACTOR, fullRange));
  }
  function handleZoomOut() {
    updateRange(zoomRange(range, 1 / ZOOM_FACTOR, fullRange));
  }
  function handlePanPrev() {
    updateRange(panRange(range, -1, fullRange));
  }
  function handlePanNext() {
    updateRange(panRange(range, 1, fullRange));
  }
  function handleReset() {
    updateRange(fullRange);
  }
  function handleShowMore() {
    setRevealedCount((c) => c + TIMELINE_REVEAL_BATCH_SIZE);
  }
  function handleSelect(slug: string) {
    // Clicking the already-selected card again keeps it selected (no
    // toggle-to-close) — the explicit close control is the one way to
    // deselect, matching "clicking the selected card should not create
    // duplicate panels" without also making selection ambiguous.
    setSelectedSlug(slug);
  }
  function handleClosePanel() {
    setSelectedSlug(null);
  }

  const currentSpan = range.endMs - range.startMs;
  const fullSpan = fullRange.endMs - fullRange.startMs;
  const canZoomIn = currentSpan > MIN_TIMELINE_RANGE_MS + 1;
  const canZoomOut = currentSpan < fullSpan - 1;
  const canPanPrev = range.startMs > fullRange.startMs;
  const canPanNext = range.endMs < fullRange.endMs;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <TimelineZoomControls
          rangeLabel={formatRangeLabel(range)}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onPanPrev={handlePanPrev}
          onPanNext={handlePanNext}
          onReset={handleReset}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          canPanPrev={canPanPrev}
          canPanNext={canPanNext}
        />

        {result.totalInRange === 0 ? (
          <TimelineEmptyState />
        ) : (
          <>
            <div
              role="region"
              aria-label="Internet culture timeline"
              className="flex gap-3 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x proximity" }}
            >
              {result.shown.map((entry) => {
                // getVisibleTimelineItems only ever includes entries with a
                // present, validated timelineEntry (isEntryInRange checks
                // `tl?.featured`); narrow for TimelineCard's prop type.
                if (!entry.timelineEntry) return null;
                return (
                  <div key={entry.slug} style={{ scrollSnapAlign: "start" }}>
                    <TimelineCard
                      entry={{ ...entry, timelineEntry: entry.timelineEntry }}
                      selected={entry.slug === selectedSlug}
                      onSelect={handleSelect}
                    />
                  </div>
                );
              })}
            </div>

            {result.hasMore && (
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="glass-card px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
                >
                  Show more ({result.totalInRange - result.shown.length} more in this period)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <TimelineDetailPanel entry={selectedEntry} onClose={handleClosePanel} />
    </div>
  );
}

/**
 * Timeline data functions — pure, derived from the canonical article
 * catalog (`getAllEntries()`/`getAllEntriesSync()`), never a separately
 * maintained list. Mirrors the shape of lib/discovery/scoring.ts.
 *
 * Stage 2: eligible-entries selection, chronological ordering, year
 * grouping for display, and the display-label formatter.
 * Stage 3 (added below): visible-range filtering, influence-based
 * prioritization WITHIN that range, progressive-disclosure caps, zoom/pan
 * range math, and the Show More `hasMore` computation.
 *
 * IMPORTANT: this module intentionally never imports or calls
 * `getOriginYear()` from ./scoring — that function's fallback chain
 * bottoms out at `addedAt`, which is correct for the encyclopedia's
 * forgiving "Classic" age-gating but NOT acceptable for the Timeline
 * (silently mis-placing an item on a visible chronological axis). Timeline
 * date resolution reads ONLY `entry.timelineEntry.sortDate` — content
 * validation (checkTimelineSchema) guarantees that's present and valid
 * whenever `timelineEntry.featured` is true, so no fallback is needed here.
 */

import type { BaseEntry, TimelineField } from "@/types";

/**
 * Entries explicitly, editorially designated for the Timeline. Never a
 * score threshold — `timelineEntry.featured` is the only gate.
 */
export function getTimelineFeaturedEntries(
  entries: readonly BaseEntry[],
): BaseEntry[] {
  return entries.filter((e) => e.timelineEntry?.featured === true);
}

/** Deterministic chronological sort, oldest first, stable tie-break. */
export function sortTimelineEntriesChronologically(
  entries: readonly BaseEntry[],
): BaseEntry[] {
  return [...entries].sort((a, b) => {
    const aDate = a.timelineEntry?.sortDate ?? "";
    const bDate = b.timelineEntry?.sortDate ?? "";
    const byDate = aDate.localeCompare(bDate);
    if (byDate !== 0) return byDate;
    // Same tie-break convention as sortByCurrentPopularity in ./scoring —
    // deterministic ordering when dates coincide (expected/normal, not an
    // edge case: multiple things can genuinely share a year).
    const byTitle = a.title.localeCompare(b.title, undefined, {
      sensitivity: "base",
    });
    if (byTitle !== 0) return byTitle;
    return a.slug.localeCompare(b.slug);
  });
}

/** Calendar year derived from `sortDate`, for grouping/display only. */
export function getTimelineYear(entry: BaseEntry): number | null {
  const sortDate = entry.timelineEntry?.sortDate;
  if (!sortDate) return null;
  const year = Number(sortDate.slice(0, 4));
  return Number.isFinite(year) ? year : null;
}

export interface TimelineYearGroup {
  year: number;
  entries: BaseEntry[];
}

/**
 * Groups an already-chronologically-sorted list into consecutive
 * same-year runs, for rendering year markers along the horizontal axis.
 * Input must already be sorted (does not re-sort) so callers control
 * ordering once, in one place.
 */
export function groupTimelineEntriesByYear(
  sortedEntries: readonly BaseEntry[],
): TimelineYearGroup[] {
  const groups: TimelineYearGroup[] = [];
  for (const entry of sortedEntries) {
    const year = getTimelineYear(entry);
    if (year === null) continue; // Guarded against by content validation; skip defensively.
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.entries.push(entry);
    } else {
      groups.push({ year, entries: [entry] });
    }
  }
  return groups;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatExactDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
}

function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

function formatYearOnly(iso: string): string {
  return iso.slice(0, 4);
}

/**
 * Resolves the human-readable date text for a Timeline card/panel.
 * An authored `displayLabel` always wins (explicit override, or the
 * required authored text for "approximate"). Otherwise, mechanically
 * derives it from `sortDate`/`sortEndDate`/`datePrecision` — editors never
 * need to author this for the other four precisions.
 */
export function formatTimelineDisplayLabel(timelineEntry: TimelineField): string {
  const authored = timelineEntry.displayLabel?.trim();
  if (authored) return authored;

  const { datePrecision, sortDate, sortEndDate } = timelineEntry;
  switch (datePrecision) {
    case "exact":
      return formatExactDate(sortDate);
    case "month":
      return formatMonthYear(sortDate);
    case "year":
      return formatYearOnly(sortDate);
    case "range":
      return sortEndDate
        ? `${formatYearOnly(sortDate)}–${formatYearOnly(sortEndDate)}`
        : formatYearOnly(sortDate);
    case "approximate":
      // Content validation requires displayLabel whenever precision is
      // "approximate" — this branch is an unreachable-in-practice
      // defensive fallback, not a real derivation (none is possible).
      return formatYearOnly(sortDate);
    default:
      return sortDate;
  }
}

// ─── Stage 3: visible-range filtering, influence prioritization ───────────

/**
 * Represents the currently visible/zoomed historical window as epoch-ms
 * boundaries. Plain numbers (not Date objects) specifically so this can be
 * passed as a prop across the Server → Client Component boundary without
 * serialization issues.
 */
export interface TimelineRange {
  startMs: number;
  endMs: number;
}

function isoToMs(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getTime();
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Finest zoom floor — one calendar year, matching the date model's own
 * finest supported granularity (§ Timeline spec: "the finest zoom
 * granularity ... is a single calendar year"). Never invent sub-year
 * precision here.
 */
export const MIN_TIMELINE_RANGE_MS = MS_PER_YEAR;

/**
 * The full span across every featured entry — min start to max end,
 * accounting for `sortEndDate` on range-precision entries. Computed once,
 * server-side, from canonical data; never hardcoded years. Returns null
 * when there are zero featured entries (caller renders the empty state).
 */
export function getFullTimelineRange(
  featuredEntries: readonly BaseEntry[],
): TimelineRange | null {
  let min = Infinity;
  let max = -Infinity;
  for (const entry of featuredEntries) {
    const tl = entry.timelineEntry;
    if (!tl?.featured || !tl.sortDate) continue;
    const start = isoToMs(tl.sortDate);
    const end = tl.sortEndDate ? isoToMs(tl.sortEndDate) : start;
    if (start < min) min = start;
    if (end > max) max = end;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  // A single-entry (or single-day) span would otherwise produce a
  // zero-width range, which zoom math can't meaningfully act on.
  if (max - min < MIN_TIMELINE_RANGE_MS) {
    const center = (min + max) / 2;
    return {
      startMs: center - MIN_TIMELINE_RANGE_MS / 2,
      endMs: center + MIN_TIMELINE_RANGE_MS / 2,
    };
  }
  return { startMs: min, endMs: max };
}

/**
 * Is this entry inside the given visible range? Point-precision entries
 * (exact/month/year/approximate) are in-range when `sortDate` falls inside
 * the window. Range-precision entries are in-range on ANY overlap with the
 * window, not only full containment — a milestone spanning 2013–2015 is a
 * real candidate when the visible window is 2014–2016, even though the
 * range isn't fully contained.
 */
export function isEntryInRange(
  entry: BaseEntry,
  range: TimelineRange,
): boolean {
  const tl = entry.timelineEntry;
  if (!tl?.featured || !tl.sortDate) return false;
  const start = isoToMs(tl.sortDate);
  const end = tl.sortEndDate ? isoToMs(tl.sortEndDate) : start;
  return start <= range.endMs && end >= range.startMs;
}

export function getEntriesInRange(
  entries: readonly BaseEntry[],
  range: TimelineRange,
): BaseEntry[] {
  return entries.filter((entry) => isEntryInRange(entry, range));
}

/**
 * Sorts an ALREADY-range-filtered set by `scores.influence` descending.
 * This must only ever be called on entries already filtered to the
 * visible range — sorting first and filtering second is exactly the
 * "global top-N" bug this function's calling contract exists to prevent.
 * Deterministic tie-break: title, then slug (same convention as
 * `sortByCurrentPopularity` in ./scoring.ts).
 */
export function sortByInfluenceWithinRange(
  entries: readonly BaseEntry[],
): BaseEntry[] {
  return [...entries].sort((a, b) => {
    const byInfluence = (b.scores?.influence ?? 0) - (a.scores?.influence ?? 0);
    if (byInfluence !== 0) return byInfluence;
    const byTitle = a.title.localeCompare(b.title, undefined, {
      sensitivity: "base",
    });
    if (byTitle !== 0) return byTitle;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * How many items to show by default for a given visible range, before
 * "Show more" is needed. Scales with how narrow the range is: a wide/full
 * range shows only the biggest milestones (matches "very zoomed out ⇒
 * only the biggest milestones"); a narrow (near-one-year) range shows
 * more, since the user has deliberately zoomed in for detail. Exact
 * numbers are a tunable starting point, not a fixed architectural
 * requirement — expect to revisit once real eligible-entry volume exists.
 */
export function getVisibilityCapForRange(range: TimelineRange): number {
  const spanYears = (range.endMs - range.startMs) / MS_PER_YEAR;
  if (spanYears <= 1.05) return 8; // at/near the finest (one-year) zoom
  if (spanYears <= 5) return 4;
  return 2; // broad or full range — headline milestones only
}

/** "Show more" reveals this many additional items per click. */
export const TIMELINE_REVEAL_BATCH_SIZE = 4;

export interface VisibleTimelineResult {
  /** Entries to render, in priority (influence) order, already sliced to revealedCount. */
  shown: BaseEntry[];
  /** True iff there are qualifying entries in range beyond what's shown. */
  hasMore: boolean;
  /** Total eligible-and-in-range count, for display/testing (e.g. "4 of 9"). */
  totalInRange: number;
}

/**
 * The single function that implements the Stage 3 core rule exactly in
 * order: filter to the visible range FIRST, sort the resulting (already
 * range-scoped) set by influence SECOND, then slice to how many are
 * currently revealed. `hasMore` is derived from this same computation, so
 * it can never drift out of sync with what's actually rendered.
 */
export function getVisibleTimelineItems(
  featuredEntries: readonly BaseEntry[],
  range: TimelineRange,
  revealedCount: number,
): VisibleTimelineResult {
  const inRange = getEntriesInRange(featuredEntries, range);
  const sorted = sortByInfluenceWithinRange(inRange);
  const visibleCount = Math.min(revealedCount, sorted.length);
  const shown = sorted.slice(0, visibleCount);
  return {
    shown,
    hasMore: sorted.length > shown.length,
    totalInRange: sorted.length,
  };
}

/**
 * Zoom the given range by `factor` (< 1 narrows/"zoom in", > 1
 * widens/"zoom out"), centered on the range's current midpoint, clamped to
 * [MIN_TIMELINE_RANGE_MS, fullRange span] and to fullRange's own bounds —
 * the Timeline never shows a window wider than the real data span, and
 * never narrower than the one-year floor.
 */
export function zoomRange(
  range: TimelineRange,
  factor: number,
  fullRange: TimelineRange,
): TimelineRange {
  const center = (range.startMs + range.endMs) / 2;
  const fullSpan = fullRange.endMs - fullRange.startMs;
  const currentSpan = range.endMs - range.startMs;
  const targetSpan = Math.max(
    MIN_TIMELINE_RANGE_MS,
    Math.min(currentSpan * factor, fullSpan),
  );
  return clampRangeToFull(
    { startMs: center - targetSpan / 2, endMs: center + targetSpan / 2 },
    fullRange,
  );
}

/**
 * Pans the range by one full span-width in the given direction, clamped to
 * fullRange's bounds — panning past either edge stops at the edge rather
 * than showing an empty window outside the real data.
 */
export function panRange(
  range: TimelineRange,
  direction: 1 | -1,
  fullRange: TimelineRange,
): TimelineRange {
  const span = range.endMs - range.startMs;
  return clampRangeToFull(
    {
      startMs: range.startMs + direction * span,
      endMs: range.endMs + direction * span,
    },
    fullRange,
  );
}

function clampRangeToFull(
  range: TimelineRange,
  fullRange: TimelineRange,
): TimelineRange {
  let { startMs, endMs } = range;
  const span = endMs - startMs;
  if (startMs < fullRange.startMs) {
    startMs = fullRange.startMs;
    endMs = Math.min(fullRange.endMs, startMs + span);
  }
  if (endMs > fullRange.endMs) {
    endMs = fullRange.endMs;
    startMs = Math.max(fullRange.startMs, endMs - span);
  }
  return { startMs, endMs };
}

/** Short "YYYY" or "YYYY–YYYY" label for the current visible range. */
export function formatRangeLabel(range: TimelineRange): string {
  const startYear = new Date(range.startMs).getUTCFullYear();
  const endYear = new Date(range.endMs).getUTCFullYear();
  return startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`;
}

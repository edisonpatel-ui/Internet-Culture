/**
 * Timeline data functions — pure, derived from the canonical article
 * catalog (`getAllEntries()`/`getAllEntriesSync()`), never a separately
 * maintained list. Mirrors the shape of lib/discovery/scoring.ts.
 *
 * Stage 2 scope only: eligible-entries selection, chronological ordering,
 * year grouping for display, and the display-label formatter. Zoom/visible
 * date range, influence-based prioritization within a range, and Show More
 * logic land in Stage 3 (see the approved 21-section Timeline spec, §5–§7).
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

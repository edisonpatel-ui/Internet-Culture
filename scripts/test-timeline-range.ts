/**
 * Unit tests for Stage 3: visible-range filtering, influence prioritization
 * WITHIN that range, progressive-disclosure caps, and Show More logic.
 * Calls the real exported functions from lib/discovery/timeline.ts against
 * fabricated in-memory entries — no content files touched.
 *
 * Covers the 12 test cases required for Stage 3 approval.
 *
 * Run: npx tsx scripts/test-timeline-range.ts
 */

import {
  getFullTimelineRange,
  getVisibleTimelineItems,
  isEntryInRange,
  sortByInfluenceWithinRange,
  getEntriesInRange,
  type TimelineRange,
} from "../lib/discovery/timeline";
import type { BaseEntry, TimelineField } from "../types";

let failures = 0;
let passed = 0;
function ok(label: string, cond: boolean, detail?: string) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failures++;
    console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function entry(
  slug: string,
  influence: number,
  timelineEntry: TimelineField | undefined,
): BaseEntry {
  return {
    id: slug,
    slug,
    title: slug,
    category: "event",
    description: "fixture",
    trendDirection: "stable",
    addedAt: "2026-01-01",
    scores: { relevance: 0, influence, cringe: 0, brainrot: 0 },
    views: 0,
    imageGradient: "from-zinc-800 to-black",
    timelineEntry,
  } as BaseEntry;
}

function tl(
  sortDate: string,
  overrides: Partial<TimelineField> = {},
): TimelineField {
  return { featured: true, datePrecision: "exact", sortDate, ...overrides };
}

function range(startIso: string, endIso: string): TimelineRange {
  return {
    startMs: new Date(`${startIso}T00:00:00Z`).getTime(),
    endMs: new Date(`${endIso}T23:59:59Z`).getTime(),
  };
}

console.log("\nStage 3 Timeline range/influence tests:\n");

// 1 & 2: multiple eligible articles in one period, ordered by influence
{
  const a = entry("a", 90, tl("2014-01-01"));
  const b = entry("b", 70, tl("2015-06-01"));
  const c = entry("c", 85, tl("2016-01-01"));
  const r = range("2014-01-01", "2016-12-31");
  const inRange = getEntriesInRange([a, b, c], r);
  ok("1. all three entries fall inside the 2014–2016 range", inRange.length === 3);
  const sorted = sortByInfluenceWithinRange(inRange);
  ok(
    "2. sorted by influence descending within the range (a=90, c=85, b=70)",
    sorted.map((e) => e.slug).join(",") === "a,c,b",
  );
}

// 3: a globally high-influence article OUTSIDE the visible period does not affect ordering
{
  const outside = entry("outside-huge", 100, tl("1995-01-01")); // globally highest, but way outside
  const inside1 = entry("inside-1", 80, tl("2014-01-01"));
  const inside2 = entry("inside-2", 60, tl("2015-01-01"));
  const r = range("2014-01-01", "2016-12-31");
  const result = getVisibleTimelineItems([outside, inside1, inside2], r, 10);
  ok(
    "3. globally-highest-influence item outside the range is excluded entirely",
    !result.shown.some((e) => e.slug === "outside-huge"),
  );
  ok(
    "3b. in-range items still ordered correctly among themselves",
    result.shown.map((e) => e.slug).join(",") === "inside-1,inside-2",
  );
}

// 4: more qualifying items than display cap → Show More appears
{
  const entries = Array.from({ length: 6 }, (_, i) =>
    entry(`e${i}`, 90 - i, tl("2014-01-01")),
  );
  const r = range("2014-01-01", "2014-12-31");
  const result = getVisibleTimelineItems(entries, r, 4); // revealedCount = 4, 6 total
  ok("4. hasMore is true when 6 exist and only 4 are revealed", result.hasMore === true);
  ok("4b. exactly 4 shown", result.shown.length === 4);
  ok("4c. totalInRange reports 6", result.totalInRange === 6);
}

// 5: all qualifying items already visible → Show More does NOT appear
{
  const entries = Array.from({ length: 4 }, (_, i) =>
    entry(`f${i}`, 90 - i, tl("2014-01-01")),
  );
  const r = range("2014-01-01", "2014-12-31");
  const result = getVisibleTimelineItems(entries, r, 4);
  ok("5. hasMore is false when revealedCount >= total", result.hasMore === false);
  ok("5b. all 4 shown", result.shown.length === 4);

  // Also confirm over-revealing (revealedCount > total) doesn't break anything.
  const result2 = getVisibleTimelineItems(entries, r, 999);
  ok("5c. hasMore false and shown capped at actual total when revealedCount exceeds it", result2.hasMore === false && result2.shown.length === 4);
}

// 6: zero qualifying items → empty, no Show More
{
  const entries = [entry("g0", 90, tl("2020-01-01"))];
  const r = range("2014-01-01", "2014-12-31"); // entry is outside this range
  const result = getVisibleTimelineItems(entries, r, 4);
  ok("6. zero items in range", result.totalInRange === 0 && result.shown.length === 0);
  ok("6b. hasMore is false (no fake Show More on empty)", result.hasMore === false);
}

// 7: changing influence changes priority
{
  const a = entry("h-a", 50, tl("2014-01-01"));
  const b = entry("h-b", 60, tl("2014-06-01"));
  const r = range("2014-01-01", "2014-12-31");
  const before = sortByInfluenceWithinRange(getEntriesInRange([a, b], r));
  ok("7. b (60) ranks above a (50) before the change", before[0].slug === "h-b");

  const aBoosted = entry("h-a", 90, tl("2014-01-01")); // same slug, higher influence
  const after = sortByInfluenceWithinRange(getEntriesInRange([aBoosted, b], r));
  ok("7b. after boosting a's influence to 90, a now ranks first", after[0].slug === "h-a");
}

// 8: changing Timeline eligibility (featured) changes whether it appears
{
  const featuredOn = entry("i-a", 50, tl("2014-01-01", { featured: true }));
  const r = range("2014-01-01", "2014-12-31");
  ok("8. featured:true entry is in range", isEntryInRange(featuredOn, r) === true);

  const featuredOff = entry("i-a", 50, tl("2014-01-01", { featured: false }));
  ok("8b. same entry with featured:false is excluded", isEntryInRange(featuredOff, r) === false);

  const noTimelineField = entry("i-a", 50, undefined);
  ok("8c. entry with no timelineEntry field at all is excluded", isEntryInRange(noTimelineField, r) === false);
}

// 9: changing historical date changes the period in which it appears
{
  const e1 = entry("j-a", 50, tl("2014-01-01"));
  const rangeOld = range("2014-01-01", "2014-12-31");
  const rangeNew = range("2020-01-01", "2020-12-31");
  ok("9. entry with 2014 date is in the 2014 range", isEntryInRange(e1, rangeOld) === true);
  ok("9b. same entry is NOT in the 2020 range", isEntryInRange(e1, rangeNew) === false);

  const e2 = entry("j-a", 50, tl("2020-06-01")); // date changed to 2020
  ok("9c. after changing the date to 2020, it's excluded from the 2014 range", isEntryInRange(e2, rangeOld) === false);
  ok("9d. and now included in the 2020 range", isEntryInRange(e2, rangeNew) === true);
}

// 10: deleting an article removes it from the Timeline
// (Simulated: "deleted" == absent from the entries array passed in — the
// real page always derives from getAllEntriesSync(), so a deleted entry
// is never in that array in the first place. Nothing to filter out.)
{
  const remaining = [entry("k-b", 50, tl("2014-01-01"))]; // "k-a" was "deleted" (simply absent)
  const r = range("2014-01-01", "2014-12-31");
  const result = getVisibleTimelineItems(remaining, r, 10);
  ok(
    "10. a deleted entry (absent from the source array) never appears",
    result.shown.length === 1 && result.shown[0].slug === "k-b",
  );
}

// 11: adding a qualifying article causes it to appear in the appropriate
// historical position (simulated: adding to the source array).
{
  const before = [entry("l-a", 50, tl("2014-01-01"))];
  const r = range("2014-01-01", "2014-12-31");
  const beforeResult = getVisibleTimelineItems(before, r, 10);
  ok("11. before adding, only 1 entry", beforeResult.totalInRange === 1);

  const afterAdd = [...before, entry("l-b", 60, tl("2014-06-01"))];
  const afterResult = getVisibleTimelineItems(afterAdd, r, 10);
  ok("11b. after adding a new qualifying entry, it appears (2 total)", afterResult.totalInRange === 2);
}

// 12: range/date handling remains correct for entries with sortEndDate
{
  const spanning = entry(
    "m-a",
    70,
    tl("2013-01-01", { datePrecision: "range", sortEndDate: "2015-12-31" }),
  );
  const fullyInside = range("2012-01-01", "2016-12-31");
  const partialOverlapEarly = range("2014-06-01", "2018-12-31"); // window starts mid-range
  const partialOverlapLate = range("2010-01-01", "2013-06-01"); // window ends mid-range
  const noOverlap = range("2018-01-01", "2020-12-31");

  ok("12. range entry fully inside a wider window is in-range", isEntryInRange(spanning, fullyInside));
  ok("12b. range entry partially overlapping (window starts mid-range) is in-range", isEntryInRange(spanning, partialOverlapEarly));
  ok("12c. range entry partially overlapping (window ends mid-range) is in-range", isEntryInRange(spanning, partialOverlapLate));
  ok("12d. range entry with zero overlap is excluded", !isEntryInRange(spanning, noOverlap));
}

// Bonus: getFullTimelineRange sanity (used to seed the initial zoom state)
{
  const a = entry("n-a", 50, tl("2010-01-01"));
  const b = entry("n-b", 50, tl("2018-01-01", { datePrecision: "range", sortEndDate: "2020-01-01" }));
  const full = getFullTimelineRange([a, b]);
  ok(
    "bonus: full range spans from earliest sortDate to latest sortEndDate",
    full !== null &&
      new Date(full.startMs).getUTCFullYear() === 2010 &&
      new Date(full.endMs).getUTCFullYear() === 2020,
  );

  ok("bonus: zero featured entries → null full range", getFullTimelineRange([]) === null);
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

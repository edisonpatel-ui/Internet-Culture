/**
 * Unit tests for the hierarchical Timeline explorer's grouping functions
 * (decade → year → month → articles), including automatic "most defining
 * article" selection and graceful handling of imprecise dates.
 *
 * Run: npx tsx scripts/test-timeline-explorer.ts
 */

import {
  getTimelineArticlesForMonth,
  getTimelineMonthsInYear,
  getTimelineYearsInDecade,
  getUndatedEntriesInYear,
  groupTimelineEntriesByDecade,
  pickDefiningEntry,
} from "@/lib/discovery/timeline";
import { getAllEntriesSync } from "@/lib/services/entries";
import { getTimelineFeaturedEntries } from "@/lib/discovery/timeline";
import type { BaseEntry, TimelineDatePrecision } from "@/types";

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
  sortDate: string,
  datePrecision: TimelineDatePrecision,
  influence: number,
): BaseEntry {
  return {
    id: slug,
    slug,
    title: slug,
    category: "meme",
    description: "fixture",
    addedAt: "2026-01-01",
    imageGradient: "from-zinc-800 to-black",
    scores: { influence, currentPopularity: 0, cringe: 0, brainrot: 0 },
    timelineEntry: { featured: true, datePrecision, sortDate },
  } as unknown as BaseEntry;
}

console.log("\nTimeline explorer tests:\n");

// pickDefiningEntry — highest influence wins, deterministic tie-break.
{
  const entries = [entry("low", "2015-01-01", "year", 20), entry("high", "2015-06-01", "month", 90)];
  ok("highest-influence entry is defining", pickDefiningEntry(entries).slug === "high");
}

// Decade grouping across a wide span.
{
  const entries = [
    entry("a", "1998-01-01", "year", 10),
    entry("b", "2003-01-01", "year", 10),
    entry("c", "2021-01-01", "year", 10),
  ];
  const decades = groupTimelineEntriesByDecade(entries);
  ok("three distinct decades produced", decades.length === 3);
  ok("decades are ordered oldest first", decades.map((d) => d.decade).join(",") === "1990,2000,2020");
  ok("1990s label is correct", decades[0].label === "1990s");
  ok("each decade group has a defining entry", decades.every((d) => !!d.definingEntry));
}

// Year grouping within a decade.
{
  const entries = [
    entry("a", "2011-01-01", "year", 5),
    entry("b", "2015-01-01", "year", 5),
    entry("c", "2021-01-01", "year", 5), // different decade — must be excluded
  ];
  const years = getTimelineYearsInDecade(entries, 2010);
  ok("only years within the requested decade are included", years.every((y) => y.year >= 2010 && y.year < 2020));
  ok("exactly 2 years in the 2010s", years.length === 2);
}

// Month grouping only from resolvable (exact/month) precision — never invents a month.
{
  const entries = [
    entry("exact-one", "2017-03-14", "exact", 10),
    entry("month-one", "2017-03-01", "month", 5),
    entry("year-only", "2017-01-01", "year", 99), // no real month — must NOT appear in month buckets
    entry("approx", "2017-01-01", "approximate", 50),
  ];
  const months = getTimelineMonthsInYear(entries, 2017);
  ok("only one month bucket produced (March)", months.length === 1 && months[0].month === 3);
  ok("March bucket has both exact + month precision entries, not the year-only one", months[0].entries.length === 2);
  ok("March's defining entry is the exact-precision one (higher influence)", months[0].definingEntry.slug === "exact-one");

  const undated = getUndatedEntriesInYear(entries, 2017);
  ok("imprecise entries surfaced as undated, not dropped or given a fake month", undated.length === 2);
  ok(
    "undated set contains exactly the year/approximate entries",
    undated.map((e) => e.slug).sort().join(",") === "approx,year-only",
  );
}

// Chronological ordering of a month's articles.
{
  const entries = [
    entry("later", "2019-06-20", "exact", 1),
    entry("earlier", "2019-06-05", "exact", 1),
  ];
  const inMonth = getTimelineArticlesForMonth(entries, 2019, 6);
  ok("articles within a month are chronological, oldest first", inMonth.map((e) => e.slug).join(",") === "earlier,later");
}

// Real canonical data sanity check.
{
  const allEntries = getAllEntriesSync();
  const featured = getTimelineFeaturedEntries(allEntries);
  const decades = groupTimelineEntriesByDecade(featured);
  ok("real data: at least one decade produced", decades.length > 0);
  ok(
    "real data: every decade's defining entry is one of its own entries",
    decades.every((d) => d.entries.some((e) => e.slug === d.definingEntry.slug)),
  );
  for (const decade of decades) {
    const years = getTimelineYearsInDecade(featured, decade.decade);
    for (const year of years) {
      const months = getTimelineMonthsInYear(featured, year.year);
      const undated = getUndatedEntriesInYear(featured, year.year);
      const total = months.reduce((sum, m) => sum + m.entries.length, 0) + undated.length;
      if (total !== year.entries.length) {
        ok(`real data: year ${year.year} accounts for every entry (months+undated = year total)`, false, `${total} vs ${year.entries.length}`);
      }
    }
  }
  ok("real data: month/undated split accounts for every entry in every year (checked above)", true);
}

console.log(`\n${passed} passed, ${failures} failed.\n`);
if (failures > 0) process.exit(1);

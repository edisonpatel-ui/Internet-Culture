/**
 * Unit tests for the Timeline data model validation rule
 * (checkTimelineSchema, exported from lib/content/validation). Calls the
 * real exported function directly against fabricated in-memory entries —
 * no content files touched, no catalog registration needed.
 *
 * Run: npx tsx scripts/test-timeline-validation.ts
 */

import { checkTimelineSchema } from "@/lib/content/validation";
import type { ValidationIssue } from "@/lib/content/validation";
import type { BaseEntry, TimelineField, TimelineDatePrecision } from "@/types";

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

function fixtureEntry(timelineEntry?: Partial<TimelineField>): BaseEntry {
  return {
    id: "e9999",
    slug: "test-fixture",
    title: "Test Fixture",
    category: "event",
    description: "Fixture",
    trendDirection: "stable",
    addedAt: "2026-01-01",
    scores: { relevance: 10, influence: 10, cringe: 10, brainrot: 10 },
    views: 0,
    imageGradient: "from-zinc-800 to-black",
    timelineEntry: timelineEntry as TimelineField | undefined,
  } as BaseEntry;
}

function hasError(issues: ValidationIssue[], code: string): boolean {
  return issues.some((i) => i.severity === "error" && i.code === code);
}

function run(label: string, timelineEntry: Partial<TimelineField> | undefined, expectError: boolean) {
  const issues: ValidationIssue[] = [];
  checkTimelineSchema(fixtureEntry(timelineEntry), issues);
  const failed = hasError(issues, "INVALID_TIMELINE_SCHEMA");
  ok(
    label,
    failed === expectError,
    `expected ${expectError ? "an" : "no"} INVALID_TIMELINE_SCHEMA error, got issues: ${JSON.stringify(issues)}`,
  );
}

console.log("\nTimeline validation rule tests:\n");

run("featured:true with no date data at all → error", { featured: true }, true);

run(
  "featured:true with valid exact date → passes",
  { featured: true, datePrecision: "exact", sortDate: "2018-03-14" },
  false,
);

run(
  "featured:true, precision year, sortDate not Jan 1 → still passes (convention is documented, not literally enforced to be Jan 1)",
  { featured: true, datePrecision: "year", sortDate: "2013-01-01" },
  false,
);

run(
  "datePrecision invalid string → error",
  { featured: true, datePrecision: "sometime" as unknown as TimelineDatePrecision, sortDate: "2018-01-01" },
  true,
);

run(
  "sortDate not ISO format → error",
  { featured: true, datePrecision: "exact", sortDate: "March 14 2018" },
  true,
);

run(
  "sortDate ISO-shaped but not a real date → error",
  { featured: true, datePrecision: "exact", sortDate: "2018-13-40" },
  true,
);

run(
  "range without sortEndDate → error",
  { featured: true, datePrecision: "range", sortDate: "2013-01-01" },
  true,
);

run(
  "range with sortEndDate before sortDate → error",
  {
    featured: true,
    datePrecision: "range",
    sortDate: "2015-01-01",
    sortEndDate: "2013-01-01",
  },
  true,
);

run(
  "range with sortEndDate === sortDate (zero-length range) → passes (>= allowed)",
  {
    featured: true,
    datePrecision: "range",
    sortDate: "2013-01-01",
    sortEndDate: "2013-01-01",
  },
  false,
);

run(
  "range with sortEndDate after sortDate → passes",
  {
    featured: true,
    datePrecision: "range",
    sortDate: "2013-01-01",
    sortEndDate: "2015-01-01",
  },
  false,
);

run(
  "approximate without displayLabel → error",
  { featured: true, datePrecision: "approximate", sortDate: "2018-02-01" },
  true,
);

run(
  "approximate WITH displayLabel → passes",
  {
    featured: true,
    datePrecision: "approximate",
    sortDate: "2018-02-01",
    displayLabel: "Early 2018",
  },
  false,
);

run(
  "approximate WITH empty-string displayLabel → error (not just presence, must be non-empty)",
  {
    featured: true,
    datePrecision: "approximate",
    sortDate: "2018-02-01",
    displayLabel: "   ",
  },
  true,
);

run(
  "featured:false with no date data at all → NOT an error (not opted in, date checks skipped)",
  { featured: false },
  false,
);

run(
  "featured:false with garbage precision → NOT an error (still not opted in)",
  { featured: false, datePrecision: "nonsense" as unknown as TimelineDatePrecision },
  false,
);

run(
  "no timelineEntry field at all (existing-entry case, ~350 current entries) → NOT an error",
  undefined,
  false,
);

// featured itself must be a real boolean
{
  const issues: ValidationIssue[] = [];
  checkTimelineSchema(
    fixtureEntry({ featured: "true" as unknown as boolean }),
    issues,
  );
  ok(
    "featured as a non-boolean value → error",
    hasError(issues, "INVALID_TIMELINE_SCHEMA"),
  );
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

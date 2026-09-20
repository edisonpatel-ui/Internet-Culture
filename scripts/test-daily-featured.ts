/**
 * Tests for the daily featured-article selector (pure logic only — no Redis,
 * no Next cache). Fabricated entries plus a run against the real catalog.
 *
 * Run: npx tsx scripts/test-daily-featured.ts
 */

import {
  GEM_MIN_QUALITY,
  MIN_VELOCITY_SPIKE,
  getUtcDateString,
  hashString,
  pickByDateHash,
  selectDailyFeatured,
  shiftDate,
} from "@/lib/content/getDailyFeaturedArticle";
import { getAllEntriesSync } from "@/lib/services/entries";
import type { BaseEntry } from "@/types";

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

function entry(slug: string, o: Partial<BaseEntry> = {}): BaseEntry {
  return {
    id: slug,
    slug,
    title: slug,
    category: "meme",
    description: "fixture",
    trendDirection: "stable",
    addedAt: "2026-01-01",
    scores: { relevance: 50, influence: 50, cringe: 0, brainrot: 0 },
    views: 1000,
    imageGradient: "from-zinc-800 to-black",
    ...o,
  } as BaseEntry;
}

const D = "2026-09-19";
console.log("\nDaily featured article tests:\n");

// ── Date + hash helpers ────────────────────────────────────────────────────
ok("getUtcDateString uses the UTC calendar date", getUtcDateString(new Date("2026-09-19T23:59:59Z")) === "2026-09-19" && getUtcDateString(new Date("2026-09-20T00:00:00Z")) === "2026-09-20");
ok("shiftDate crosses month/year boundaries", shiftDate("2026-03-01", -1) === "2026-02-28" && shiftDate("2026-01-01", -1) === "2025-12-31" && shiftDate("2028-03-01", -1) === "2028-02-29");
ok("hashString is stable", hashString("2026-09-19") === hashString("2026-09-19") && hashString("2026-09-19") !== hashString("2026-09-20"));

// ── Tier 1: velocity spike ─────────────────────────────────────────────────
{
  const es = [entry("a"), entry("b"), entry("c", { historicalDate: "2010-09-19" })];
  const r = selectDailyFeatured({ entries: es, date: D, velocities: new Map([["a", 9], ["b", 14]]) });
  ok("highest positive velocity wins", r?.slug === "b" && r.reason === "velocity-spike", JSON.stringify(r));
  ok("velocity beats a date match", r?.slug !== "c");
  ok("detail describes the change", r?.detail === "+14 popularity in 3 days", r?.detail);
  const below = selectDailyFeatured({ entries: es, date: D, velocities: new Map([["a", MIN_VELOCITY_SPIKE - 1]]) });
  ok("a change below the spike threshold is ignored", below?.reason !== "velocity-spike");
  const neg = selectDailyFeatured({ entries: es, date: D, velocities: new Map([["a", -30]]) });
  ok("negative change never counts as a spike", neg?.reason !== "velocity-spike");
  const ghost = selectDailyFeatured({ entries: es, date: D, velocities: new Map([["not-in-catalog", 99]]) });
  ok("velocity for a slug not in the catalog is ignored", ghost?.reason !== "velocity-spike");
  const tie = selectDailyFeatured({ entries: es, date: D, velocities: new Map([["a", 10], ["b", 10]]) });
  ok("tied velocities are broken deterministically", tie?.reason === "velocity-spike" && tie.slug === selectDailyFeatured({ entries: es, date: D, velocities: new Map([["b", 10], ["a", 10]]) })?.slug);
}

// ── Tier 2: On This Day ────────────────────────────────────────────────────
{
  const es = [
    entry("x", { historicalDate: "2011-09-19", scores: { relevance: 1, influence: 30, cringe: 0, brainrot: 0 } }),
    entry("y", { historicalDate: "2007-09-19", scores: { relevance: 1, influence: 80, cringe: 0, brainrot: 0 } }),
    entry("z", { historicalDate: "2011-09-20" }),
  ];
  const r = selectDailyFeatured({ entries: es, date: D });
  ok("matches today's month-day and prefers the most influential", r?.slug === "y" && r.reason === "on-this-day", JSON.stringify(r));
  ok("detail says how many years ago", r?.detail === "19 years ago today", r?.detail);
  const placeholder = selectDailyFeatured({
    entries: [entry("p", { historicalDate: "2005-09-01" }), entry("q", { historicalDate: "2005-01-01" })],
    date: "2026-09-01",
  });
  ok("day-01 dates (year/month precision) never count as exact matches", placeholder?.reason !== "on-this-day", JSON.stringify(placeholder));
  const jan1 = selectDailyFeatured({ entries: [entry("q", { historicalDate: "2005-01-01" })], date: "2026-01-01" });
  ok("Jan 1 placeholders don't trigger 'On This Day' on Jan 1", jan1?.reason !== "on-this-day");
  const bad = selectDailyFeatured({ entries: [entry("m", { historicalDate: "September 2007" })], date: D });
  ok("malformed historicalDate is ignored, not a crash", bad?.reason !== "on-this-day");
}

// ── Tier 3: under-the-radar gem ────────────────────────────────────────────
{
  const es = [
    entry("famous-good", { views: 9_000_000 }),
    entry("obscure-good-1", { views: 10 }),
    entry("obscure-good-2", { views: 20 }),
    entry("obscure-weak", { views: 5 }),
    entry("mid", { views: 500_000 }),
  ];
  const quality = (e: BaseEntry) => (e.slug === "obscure-weak" ? GEM_MIN_QUALITY - 1 : 90);
  const r = selectDailyFeatured({ entries: es, date: D, getQuality: quality });
  ok("with no spike/date match, picks a low-views high-quality entry", r?.reason === "hidden-gem" && ["obscure-good-1", "obscure-good-2"].includes(r.slug), JSON.stringify(r));
  const seen = new Set<string>();
  for (let i = 0; i < 20; i++) {
    const g = selectDailyFeatured({ entries: es, date: shiftDate("2026-09-01", i), getQuality: quality });
    if (g?.reason === "hidden-gem") seen.add(g.slug);
  }
  ok("low-quality entries are never picked as gems", !seen.has("obscure-weak") && !seen.has("famous-good"), [...seen].join());
}

// ── Tier 4: daily hash spotlight ───────────────────────────────────────────
{
  const es = ["a", "b", "c", "d", "e"].map((s) => entry(s, { views: 5_000_000 }));
  const r = selectDailyFeatured({ entries: es, date: D, getQuality: () => 10 });
  ok("falls back to the daily spotlight when no gem qualifies", r?.reason === "daily-spotlight", JSON.stringify(r));
  ok("empty catalog returns null", selectDailyFeatured({ entries: [], date: D }) === null);
}

// ── Determinism + no back-to-back repeats ──────────────────────────────────
{
  const pool = Array.from({ length: 7 }, (_, i) => ({ slug: `s${i}` }));
  let repeat = false;
  let prev: string | null = null;
  for (let i = 0; i < 400; i++) {
    const pick = pickByDateHash(pool, shiftDate("2026-01-01", i))!.slug;
    if (pick === prev) repeat = true;
    prev = pick;
  }
  ok("no two consecutive days pick the same entry (400 days, pool of 7)", !repeat);
  ok("same date + same pool ⇒ same pick regardless of input order", pickByDateHash(pool, D)?.slug === pickByDateHash([...pool].reverse(), D)?.slug);
  ok("single-entry pool works", pickByDateHash([{ slug: "only" }], D)?.slug === "only");
  const input = [entry("b"), entry("a")];
  const copy = [...input];
  selectDailyFeatured({ entries: input, date: D });
  ok("does not mutate its input", input[0] === copy[0] && input[1] === copy[1]);
}

// ── Real catalog ───────────────────────────────────────────────────────────
{
  const all = getAllEntriesSync();
  const slugs = new Set(all.map((e) => e.slug));
  let badSlug = 0;
  let prev: string | null = null;
  let repeats = 0;
  const reasons: Record<string, number> = {};
  for (let i = 0; i < 366; i++) {
    const r = selectDailyFeatured({ entries: all, date: shiftDate("2026-01-01", i), getQuality: () => 90 });
    if (!r || !slugs.has(r.slug)) badSlug++;
    if (r?.slug === prev) repeats++;
    prev = r?.slug ?? null;
    if (r) reasons[r.reason] = (reasons[r.reason] ?? 0) + 1;
  }
  ok("every day of a year yields a real catalog entry", badSlug === 0, `${badSlug} bad`);
  ok("no consecutive-day repeats across a full year of the real catalog", repeats === 0, `${repeats} repeats`);
  console.log(`    (real-catalog reasons over 366 days: ${JSON.stringify(reasons)})`);
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

/**
 * lib/data/featured.ts
 *
 * Provides data for homepage editorial sections: Today's Trend, Featured Article,
 * and On This Day. Each function is isolated so its data source can be swapped
 * independently — local data now, real-time APIs or a CMS later.
 *
 * PLACEHOLDER NOTE: Scores, views, and rankings are temporary placeholder values.
 * Replace the relevant data source functions when real analytics are available.
 */

import type { BaseEntry } from "@/types";
import { getAllMemes } from "@/lib/data/memes";
import { getAllSlang } from "@/lib/data/slang";
import { getAllTrends } from "@/lib/data/trends";
import { getAllEvents } from "@/lib/data/events";

function buildAllEntries(): BaseEntry[] {
  return [
    ...getAllMemes(),
    ...(getAllSlang() as BaseEntry[]),
    ...getAllTrends(),
    ...(getAllEvents() as BaseEntry[]),
  ];
}

// ─── Today's Trend ────────────────────────────────────────────────────────────

/**
 * Returns the single most relevant currently trending entry.
 *
 * CURRENT: Sorted by relevance score from local static data (placeholder values).
 * FUTURE: Replace with a real-time query against a trends API or database view
 *         that reflects actual platform engagement. The UI does not need to change.
 */
export function getTodaysTrend(): BaseEntry | null {
  const trends = getAllTrends();
  return (
    [...trends].sort((a, b) => b.scores.relevance - a.scores.relevance)[0] ??
    null
  );
}

// ─── Featured Article (Editor's Pick) ────────────────────────────────────────

/**
 * Curated rotation list for the Featured Article section.
 *
 * EDITORIAL INTENT: Prefer niche, influential, or historically interesting entries
 * over the most well-known ones. This is not a popularity ranking — it is a
 * hand-curated editorial selection.
 *
 * CURRENT: Day-of-year rotation through this list (deterministic, no randomness).
 * FUTURE: Replace with an editor-managed list from a CMS or config file.
 *         The FEATURED_SLUGS array is the single place to update for that migration.
 *         Alternatively, add a `featured: true` flag to the BaseEntry type and
 *         filter entries by that flag — no UI changes required.
 */
const FEATURED_SLUGS = [
  "doge",           // Classic Shiba Inu meme — historically significant
  "harlem-shake",   // 2013 viral format — one of the earliest mass participation trends
  "skibidi-toilet", // Gen Alpha touchstone — represents current era brainrot
  "npc-streaming",  // Illustrates TikTok gift economy and parasocial culture
  "chicken-jockey", // Cross-platform Minecraft moment — gaming + meme convergence
];

/**
 * Returns one featured article for the current day.
 * Rotates deterministically so all users see the same pick on the same day.
 */
export function getFeaturedArticle(): BaseEntry | null {
  const all = buildAllEntries();
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (today.getTime() - startOfYear.getTime()) / 86_400_000,
  );
  const slug = FEATURED_SLUGS[dayOfYear % FEATURED_SLUGS.length];
  return (
    all.find((e) => e.slug === slug) ??
    all.find((e) => e.slug === "doge") ??
    null
  );
}

// ─── On This Day ─────────────────────────────────────────────────────────────

/**
 * Returns one entry whose date matches today's month and day.
 * Returns null if no match — the homepage section hides gracefully.
 *
 * CURRENT BEHAVIOR (temporary):
 *   Matches against addedAt — the date the entry was added to this encyclopedia.
 *   This is a rough approximation; addedAt does not represent historical accuracy.
 *
 * FUTURE ARCHITECTURE:
 *   Replace with a query against a dedicated historical events table containing
 *   real dates (e.g. when a meme first appeared, when an event actually occurred).
 *   Each historical record should have: { date: "MM-DD", year?: number, entrySlug: string }
 *   This function signature stays the same — only the data source changes.
 *
 * TODO: Migrate to historical event table before production launch.
 */
export function getOnThisDay(): BaseEntry | null {
  const today = new Date();
  const todayMm = today.getMonth() + 1;
  const todayDd = today.getDate();

  return (
    buildAllEntries().find((e) => {
      // Parse YYYY-MM-DD directly to avoid timezone conversion bugs.
      // new Date("2026-07-16") parses as UTC midnight, which can shift the
      // local date by a day in negative-offset timezones.
      const parts = e.addedAt.split("-");
      const eMm = Number(parts[1]);
      const eDd = Number(parts[2]);
      return eMm === todayMm && eDd === todayDd;
    }) ?? null
  );
}

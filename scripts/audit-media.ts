/**
 * scripts/audit-media.ts
 *
 * Media audit script for Internet Culture Hub.
 * Scans all content entries and reports media readiness by category.
 *
 * Run with:
 *   npm run audit:media
 *
 * Output sections:
 *   1. Summary table — count by state per category
 *   2. No media — articles using gradient placeholder only
 *   3. Missing featured — has media but no featured image/gif
 *   4. Has warnings — featured media exists but incomplete metadata
 *   5. Production-ready — all checks pass
 *
 * Exit code:
 *   0 — audit completed (warnings are not errors)
 */

import { getAllEntries } from "../lib/services/entries";
import {
  validateEntryMedia,
  groupEntriesByMediaState,
} from "../lib/content/validateMedia";
import { getMediaStats } from "../lib/media/mediaUtils";
import type { BaseEntry } from "../types";

// ─── Formatting helpers ───────────────────────────────────────────────────────

function pad(str: string, width: number): string {
  return str.slice(0, width).padEnd(width);
}

function padLeft(str: string, width: number): string {
  return str.slice(0, width).padStart(width);
}

function header(text: string) {
  const line = "─".repeat(text.length + 4);
  console.log(`\n┌${line}┐`);
  console.log(`│  ${text}  │`);
  console.log(`└${line}┘`);
}

function sectionTitle(label: string, count: number) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`  ${label}  (${count})`);
  console.log(`${"─".repeat(60)}`);
}

// ─── Entry row printer ────────────────────────────────────────────────────────

function printEntryRow(entry: BaseEntry, showWarnings = false) {
  const stats = getMediaStats(entry);
  const statStr =
    stats.total > 0
      ? `img:${stats.images} vid:${stats.videos} emb:${stats.embeds}`
      : "no media";

  console.log(
    `  ${pad(entry.title, 36)}  ${pad(entry.category, 8)}  ${pad(statStr, 22)}`,
  );

  if (showWarnings) {
    const warnings = validateEntryMedia(entry);
    for (const w of warnings) {
      console.log(`    ⚠  ${w.field}: ${w.message}`);
    }
  }
}

// ─── Summary table ────────────────────────────────────────────────────────────

function printSummaryTable(
  entries: BaseEntry[],
  groups: ReturnType<typeof groupEntriesByMediaState>,
) {
  const categories = ["meme", "slang", "creator", "event", "trend", "brainrot"];

  console.log(
    `\n  ${"Category".padEnd(12)}  ${"Total".padStart(5)}  ${"Ready".padStart(5)}  ${"Warnings".padStart(8)}  ${"No feat.".padStart(8)}  ${"No media".padStart(8)}`,
  );
  console.log(`  ${"─".repeat(58)}`);

  let totalAll = 0,
    readyAll = 0,
    warnAll = 0,
    noFeatAll = 0,
    noMediaAll = 0;

  for (const cat of categories) {
    const catEntries = entries.filter((e) => e.category === cat);
    if (catEntries.length === 0) continue;

    const ready = groups.clean.filter((e) => e.category === cat).length;
    const warn = groups.hasWarnings.filter((e) => e.category === cat).length;
    const noFeat = groups.missingFeatured.filter(
      (e) => e.category === cat,
    ).length;
    const noMedia = groups.noMedia.filter((e) => e.category === cat).length;

    totalAll += catEntries.length;
    readyAll += ready;
    warnAll += warn;
    noFeatAll += noFeat;
    noMediaAll += noMedia;

    console.log(
      `  ${cat.padEnd(12)}  ${padLeft(String(catEntries.length), 5)}  ${padLeft(String(ready), 5)}  ${padLeft(String(warn), 8)}  ${padLeft(String(noFeat), 8)}  ${padLeft(String(noMedia), 8)}`,
    );
  }

  console.log(`  ${"─".repeat(58)}`);
  console.log(
    `  ${"TOTAL".padEnd(12)}  ${padLeft(String(totalAll), 5)}  ${padLeft(String(readyAll), 5)}  ${padLeft(String(warnAll), 8)}  ${padLeft(String(noFeatAll), 8)}  ${padLeft(String(noMediaAll), 8)}`,
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  header("Internet Culture Hub — Media Audit");

  const entries = await getAllEntries();
  const groups = groupEntriesByMediaState(entries);

  // ── Summary table ──────────────────────────────────────────────────────────
  console.log("\n  SUMMARY BY CATEGORY");
  printSummaryTable(entries, groups);

  // ── Production-ready ───────────────────────────────────────────────────────
  sectionTitle("PRODUCTION-READY", groups.clean.length);
  if (groups.clean.length === 0) {
    console.log("  (none yet)");
  } else {
    for (const entry of groups.clean) {
      printEntryRow(entry);
    }
  }

  // ── Has warnings (featured exists, metadata incomplete) ────────────────────
  sectionTitle("HAS WARNINGS — featured media exists, metadata incomplete", groups.hasWarnings.length);
  for (const entry of groups.hasWarnings) {
    printEntryRow(entry, true);
  }

  // ── Missing featured ───────────────────────────────────────────────────────
  sectionTitle(
    "MISSING FEATURED — has media but no featured image/gif",
    groups.missingFeatured.length,
  );
  for (const entry of groups.missingFeatured) {
    printEntryRow(entry, true);
  }

  // ── No media ──────────────────────────────────────────────────────────────
  sectionTitle("NO MEDIA — gradient fallback only", groups.noMedia.length);
  if (groups.noMedia.length === 0) {
    console.log("  All articles have media!");
  } else {
    const cols = 3;
    const rows = Math.ceil(groups.noMedia.length / cols);
    for (let r = 0; r < rows; r++) {
      const line = [];
      for (let c = 0; c < cols; c++) {
        const entry = groups.noMedia[r + c * rows];
        if (entry) line.push(pad(`${entry.slug} (${entry.category})`, 35));
      }
      console.log("  " + line.join("  "));
    }
  }

  // ── Final summary ──────────────────────────────────────────────────────────
  console.log(`\n${"═".repeat(60)}`);
  console.log(
    `  Total: ${entries.length} entries` +
      `  |  Ready: ${groups.clean.length}` +
      `  |  Warnings: ${groups.hasWarnings.length}` +
      `  |  No featured: ${groups.missingFeatured.length}` +
      `  |  No media: ${groups.noMedia.length}`,
  );
  console.log(`${"═".repeat(60)}\n`);
}

main().catch((err) => {
  console.error("Audit script crashed:", err);
  process.exit(1);
});

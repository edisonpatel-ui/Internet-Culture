/**
 * Calibration report — Current Relevance as recent-creation activity (v4).
 *
 *   npx tsx scripts/calibrate-scores.ts
 */

import { proposeDynamicMetadataForEntry } from "@/lib/dynamicMetadata";
import type { RelevanceActivitySignal } from "@/lib/dynamicMetadata";
import { getAllEntriesSync } from "@/lib/services/entries";

const CALIBRATION_SLUGS = [
  "skibidi-toilet",
  "italian-brainrot",
  "shrimp-jesus",
  "mewing",
  "looksmaxxing",
  "du-bist-gut-genug",
  "chicken-jockey",
  "hawk-tuah",
  "doge",
  "rickroll",
] as const;

function formatSignals(signals: RelevanceActivitySignal[]): string {
  if (signals.length === 0) {
    return "  (none — Wikipedia/authority volume ignored for Current Relevance)";
  }
  return signals
    .map(
      (s) =>
        `  • [${s.role}] ${s.providerId}/${s.kind} = ${s.value}` +
        (s.note ? `\n      ${s.note}` : ""),
    )
    .join("\n");
}

async function main() {
  const catalog = getAllEntriesSync();
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));

  console.log("┌──────────────────────────────────────────────────────────┐");
  console.log("│  Dynamic scoring calibration (methodology 4.0.0)         │");
  console.log("│  Current Relevance = NEW content creation (~30–60d)      │");
  console.log("└──────────────────────────────────────────────────────────┘\n");

  for (const slug of CALIBRATION_SLUGS) {
    const entry = bySlug.get(slug);
    if (!entry) {
      console.log(`⚠ missing catalog entry: ${slug}\n`);
      continue;
    }
    process.stdout.write(`… ${entry.title}\n`);
    try {
      const proposed = await proposeDynamicMetadataForEntry(entry);
      const dm = proposed.after.dynamicMetadata;
      const scores = proposed.after.scores;
      const rel =
        dm.currentRelevance === "unknown"
          ? "Unknown"
          : String(dm.currentRelevance ?? scores.relevance);
      const signals =
        proposed.suggestion.relevanceActivitySignals ??
        [];

      console.log(`\n### ${entry.title} (${slug})`);
      console.log(`  Current Relevance  ${rel}`);
      console.log(`  Influence           ${scores.influence}`);
      console.log(`  Brainrot            ${scores.brainrot}`);
      console.log(`  Cringe              ${scores.cringe}`);
      console.log(`  Relevance reason:`);
      console.log(`    ${dm.scoreReasons?.relevance ?? "(none)"}`);
      console.log(`  Recent-creation signals used:`);
      console.log(formatSignals(signals));
      console.log("");
    } catch (err) {
      console.log(
        `  ✗ failed: ${err instanceof Error ? err.message : err}\n`,
      );
    }
  }

  console.log("Done.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

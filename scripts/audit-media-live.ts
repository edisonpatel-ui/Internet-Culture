/**
 * Live media audit — HEAD reachability + YouTube oEmbed.
 *
 * Soft warnings only (exit 0). Never sets verified:true.
 *
 * Usage:
 *   npm run audit:media:live
 */

import { getAllEntriesSync } from "../lib/services/entries";
import { validateAllMedia } from "../lib/content/validateMedia";
import { runLiveMediaChecks } from "../lib/content/validation/mediaLiveChecks";

async function main() {
  const entries = getAllEntriesSync();
  const offline = validateAllMedia(entries);
  const unverified = offline.filter((w) =>
    w.message.toLowerCase().includes("unverified"),
  ).length;

  console.log("");
  console.log("┌──────────────────────────────────────────┐");
  console.log("│  Media Live Audit (network checks)       │");
  console.log("└──────────────────────────────────────────┘");
  console.log("");
  console.log(`  Entries: ${entries.length}`);
  console.log(`  Offline unverified warnings: ${unverified}`);
  console.log("  Running HEAD / oEmbed checks…");
  console.log("");

  const live = await runLiveMediaChecks(entries, { concurrency: 6 });

  if (live.length === 0) {
    console.log("  ✓ No live reachability / oEmbed issues detected.");
  } else {
    console.log(`  ⚠ Live warnings: ${live.length}`);
    console.log("────────────────────────────────────────────────────────────");
    for (const w of live) {
      console.log(`  ⚠  [${w.slug}] ${w.field}: ${w.message}`);
    }
  }

  console.log("");
  console.log("  Note: verified:true remains HUMAN controlled.");
  console.log("  AI / automation must leave verified:false until a human confirms.");
  console.log("");
  console.log("════════════════════════════════════════════════════════════");
  console.log(
    `  Live issues: ${live.length}  |  Unverified (offline): ${unverified}`,
  );
  console.log("════════════════════════════════════════════════════════════");
  console.log("");
}

main().catch((err) => {
  console.error("audit:media:live failed:", err);
  process.exit(1);
});

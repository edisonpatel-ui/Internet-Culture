/**
 * Soft editorial flag report (legacy entry point).
 *
 * Prefer: npm run audit:quality
 *
 * This script still prints raw detector flags for debugging.
 * Exit 0 always (flags are not errors). Never deletes content.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { flagEditorialCandidates } from "@/lib/editorial";

function main() {
  const entries = getAllEntriesSync();
  const report = flagEditorialCandidates(entries);

  console.log("┌──────────────────────────────────────────┐");
  console.log("│  Internet Culture Hub — Editorial Flags  │");
  console.log("│  (prefer: npm run audit:quality)         │");
  console.log("└──────────────────────────────────────────┘");
  console.log("");
  console.log(`  Entries scanned: ${report.entryCount}`);
  console.log(`  Flags:           ${report.flags.length}`);
  console.log("");
  console.log("  SUMMARY");
  console.log("  ────────────────────────────────────────");
  for (const [code, count] of Object.entries(report.summary)) {
    console.log(`  ${code.padEnd(28)} ${count}`);
  }
  console.log("");

  if (report.flags.length === 0) {
    console.log("  No editorial flags.\n");
    return;
  }

  const byCode = new Map<string, typeof report.flags>();
  for (const flag of report.flags) {
    const list = byCode.get(flag.code) ?? [];
    list.push(flag);
    byCode.set(flag.code, list);
  }

  for (const [code, list] of byCode) {
    console.log("────────────────────────────────────────────");
    console.log(`  ${code}  (${list.length})`);
    console.log("────────────────────────────────────────────");
    for (const f of list) {
      console.log(`  • [${f.category}] ${f.title} (${f.slug})`);
      console.log(`      ${f.message}`);
    }
    console.log("");
  }

  console.log(
    "These are review candidates only — nothing was deleted or changed.\n",
  );
}

main();

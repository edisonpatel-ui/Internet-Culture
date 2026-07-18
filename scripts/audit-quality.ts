/**
 * Catalog quality audit — primary editorial intelligence report.
 *
 *   npm run audit:quality
 *
 * Buckets: strong | improve | merge | questionable
 * Never deletes or mutates content. Exit 0 unless the script crashes.
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { runQualityAudit, type QualityEntryAssessment } from "@/lib/editorial";

function printBucket(label: string, items: QualityEntryAssessment[]) {
  console.log("────────────────────────────────────────────────────────────");
  console.log(`  ${label}  (${items.length})`);
  console.log("────────────────────────────────────────────────────────────");
  if (items.length === 0) {
    console.log("  (none)\n");
    return;
  }
  for (const item of items) {
    const override = item.registryOverride ? " [registry]" : "";
    console.log(
      `  • [${item.category}] ${item.title} (${item.slug})${override}`,
    );
    console.log(
      `      status=${item.editorialStatus}  significance=${item.significanceLevel}`,
    );
    console.log(`      ${item.reasons.join("; ")}`);
  }
  console.log("");
}

function main() {
  const entries = getAllEntriesSync();
  const report = runQualityAudit(entries);

  console.log("┌────────────────────────────────────────────┐");
  console.log("│  Internet Culture Hub — Quality Audit      │");
  console.log("└────────────────────────────────────────────┘");
  console.log("");
  console.log(`  Entries scanned: ${report.entryCount}`);
  console.log("");
  console.log("  SUMMARY");
  console.log("  ──────────────────────────────────────────");
  console.log(`  strong          ${report.summary.strong}`);
  console.log(`  improve         ${report.summary.improve}`);
  console.log(`  merge           ${report.summary.merge}`);
  console.log(`  questionable    ${report.summary.questionable}`);
  console.log("");

  printBucket("STRONG ENTRIES", report.strong);
  printBucket("IMPROVEMENT CANDIDATES", report.improve);
  printBucket("DUPLICATE / MERGE CANDIDATES", report.merge);
  printBucket("QUESTIONABLE ENTRIES", report.questionable);

  console.log(
    "Review only — nothing was deleted. Overrides live in lib/editorial/registry.ts\n",
  );
}

main();

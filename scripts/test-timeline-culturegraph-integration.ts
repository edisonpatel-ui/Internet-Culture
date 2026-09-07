/**
 * Cross-feature integration test for Culture Graph Stage 4: proves the
 * Timeline → Culture Graph link actually works end to end using the real
 * canonical dataset — not just that each side independently works in
 * isolation (already covered by their own test suites).
 *
 * Run: npx tsx scripts/test-timeline-culturegraph-integration.ts
 */

import { getAllEntriesSync } from "@/lib/services/entries";
import { getTimelineFeaturedEntries } from "@/lib/discovery/timeline";
import {
  buildCultureGraphEdges,
  getCultureGraphNodeSlugs,
  getCultureGraphNodes,
  computeCultureGraphLayout,
  computeFocusTransform,
} from "@/lib/discovery/cultureGraph";

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

console.log("\nTimeline → Culture Graph integration tests (real data):\n");

const all = getAllEntriesSync();
const milestones = getTimelineFeaturedEntries(all);
const edges = buildCultureGraphEdges(all);
const nodeSlugs = getCultureGraphNodeSlugs(edges);
const nodes = getCultureGraphNodes(all, nodeSlugs);
const layout = computeCultureGraphLayout(nodes);
const positions = Object.fromEntries(layout.positions);

ok("real Timeline has featured milestones", milestones.length > 0, `found ${milestones.length}`);

// The exact href construction TimelineDetailPanel.tsx uses.
function cultureGraphHrefFor(slug: string): string {
  return `/culture-graph?focus=${encodeURIComponent(slug)}`;
}

let allResolve = true;
const unresolvedSlugs: string[] = [];
for (const milestone of milestones) {
  const href = cultureGraphHrefFor(milestone.slug);
  const parsedSlug = decodeURIComponent(new URL(href, "http://x").searchParams.get("focus") ?? "");
  const transform = computeFocusTransform(parsedSlug, positions, layout.outerRadius, 1.4);
  if (!transform) {
    allResolve = false;
    unresolvedSlugs.push(milestone.slug);
  }
}

ok(
  `every one of ${milestones.length} real Timeline milestones resolves to a real, focusable Culture Graph node`,
  allResolve,
  unresolvedSlugs.length > 0 ? `unresolved: ${unresolvedSlugs.join(", ")}` : undefined,
);

// Spot-check one specific real milestone end to end, mirroring the exact
// href TimelineDetailPanel.tsx generates.
if (milestones.length > 0) {
  const sample = milestones[0];
  const href = cultureGraphHrefFor(sample.slug);
  ok(
    `sample milestone "${sample.slug}" produces the exact expected href contract`,
    href === `/culture-graph?focus=${sample.slug}`,
    href,
  );
  const transform = computeFocusTransform(sample.slug, positions, layout.outerRadius, 1.4);
  ok(`sample milestone resolves to a real focus transform`, transform !== null);
}

// An entry that IS canonical but has zero relationships (not a graph node)
// must fail gracefully via the same focus mechanism, not crash.
const noRelationshipEntry = all.find(
  (e) => !nodeSlugs.has(e.slug) && (!e.relatedSlugs || e.relatedSlugs.length === 0),
);
if (noRelationshipEntry) {
  const transform = computeFocusTransform(noRelationshipEntry.slug, positions, layout.outerRadius, 1.4);
  ok(
    "a real canonical article with no graph relationships fails gracefully (null, not a crash)",
    transform === null,
  );
} else {
  console.log("  (skipped — no zero-relationship entry exists in current data to test against)");
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

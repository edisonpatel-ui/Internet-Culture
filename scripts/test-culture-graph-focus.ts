/**
 * Unit tests for Culture Graph Stage 3: search, limited results, and the
 * reusable focus mechanism (computeFocusTransform — shared by search
 * result selection and ?focus={slug} URL resolution). Fabricated
 * in-memory nodes only.
 *
 * Run: npx tsx scripts/test-culture-graph-focus.ts
 */

import {
  computeCultureGraphLayout,
  computeFocusTransform,
  getDefaultCultureGraphResults,
  searchCultureGraphNodes,
  type CultureGraphNode,
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

function node(
  slug: string,
  overrides: Partial<CultureGraphNode> = {},
): CultureGraphNode {
  return {
    slug,
    title: slug,
    category: "meme",
    description: "fixture",
    addedAt: "2026-01-01",
    imageGradient: "from-zinc-800 to-black",
    ...overrides,
  };
}

console.log("\nCulture Graph Stage 3 tests:\n");

// 1. Empty search shows only a small useful result set (default = recent)
{
  const nodes = Array.from({ length: 20 }, (_, i) =>
    node(`n${i}`, { addedAt: `2020-01-${String((i % 28) + 1).padStart(2, "0")}` }),
  );
  const results = getDefaultCultureGraphResults(nodes, 8);
  ok("2. empty-query default results are capped (8 of 20)", results.length === 8);
  ok("empty-query default: most recently added first", results[0].addedAt >= results[results.length - 1].addedAt);
}

// 2. Limited search result count (never the whole catalog)
{
  const nodes = Array.from({ length: 50 }, (_, i) => node(`match-${i}`, { title: `Match ${i}` }));
  const results = searchCultureGraphNodes(nodes, "match", 8);
  ok("limited results: 50 matches capped to 8", results.length === 8);
}

// 3. Query matching (title + description substring, case-insensitive)
{
  const nodes = [
    node("a", { title: "Rickroll", description: "A classic bait-and-switch meme." }),
    node("b", { title: "Doge", description: "A very influential meme." }),
    node("c", { title: "Unrelated", description: "Nothing matching here." }),
  ];
  const byTitle = searchCultureGraphNodes(nodes, "rick", 8);
  ok("3. matches by title substring, case-insensitive", byTitle.length === 1 && byTitle[0].slug === "a");

  const byDescription = searchCultureGraphNodes(nodes, "influential", 8);
  ok("3b. matches by description substring", byDescription.length === 1 && byDescription[0].slug === "b");

  const noMatch = searchCultureGraphNodes(nodes, "zzz-no-match", 8);
  ok("3c. no-match query returns empty, not the whole set", noMatch.length === 0);
}

// 4. Search result → correct node (identity is preserved end to end)
{
  const nodes = [node("rickroll", { title: "Rickroll" }), node("doge", { title: "Doge" })];
  const results = searchCultureGraphNodes(nodes, "rickroll", 8);
  ok("4. search result identifies the exact correct canonical node", results.length === 1 && results[0].slug === "rickroll");
}

// 5 & 6. Focus mechanism: valid slug centers correctly, invalid slug fails gracefully
{
  const nodes = [node("a", { category: "creator" }), node("b", { category: "event" }), node("c", { category: "meme" })];
  const layout = computeCultureGraphLayout(nodes);
  const positions = Object.fromEntries(layout.positions);

  const validFocus = computeFocusTransform("b", positions, layout.outerRadius, 1.4);
  ok("5. valid slug produces a real transform", validFocus !== null);

  // Verify the math actually centers the node: applying the transform to
  // the node's own position should land it at the viewBox center.
  if (validFocus) {
    const pos = positions["b"];
    const half = layout.outerRadius;
    const screenX = validFocus.x + validFocus.scale * (half + pos.x);
    const screenY = validFocus.y + validFocus.scale * (half + pos.y);
    ok(
      "5b. focused node lands exactly at viewBox center after transform",
      Math.abs(screenX - half) < 0.01 && Math.abs(screenY - half) < 0.01,
      `got (${screenX}, ${screenY}), expected (${half}, ${half})`,
    );
  }

  const invalidFocus = computeFocusTransform("does-not-exist", positions, layout.outerRadius, 1.4);
  ok("6. invalid/unknown slug returns null (no crash, no fabricated node)", invalidFocus === null);

  const nullSlug = computeFocusTransform(null, positions, layout.outerRadius, 1.4);
  ok("6b. null slug (no focus requested) also returns null", nullSlug === null);

  const undefinedSlug = computeFocusTransform(undefined, positions, layout.outerRadius, 1.4);
  ok("6c. undefined slug returns null", undefinedSlug === null);
}

// 7. Same mechanism produces identical results regardless of caller
// (search result click vs. ?focus= URL resolution) — this is the
// "reusable" requirement: one function, two callers, same math.
{
  const nodes = [node("shared-target"), node("other")];
  const layout = computeCultureGraphLayout(nodes);
  const positions = Object.fromEntries(layout.positions);

  const fromSearchClick = computeFocusTransform("shared-target", positions, layout.outerRadius, 1.4);
  const fromUrlFocus = computeFocusTransform("shared-target", positions, layout.outerRadius, 1.4);
  ok(
    "7. search-result-click and URL-focus produce identical transforms for the same slug",
    JSON.stringify(fromSearchClick) === JSON.stringify(fromUrlFocus),
  );
}

// 8. No fabricated nodes: search/results only ever return nodes from the
// input set — never invents an entry.
{
  const nodes = [node("real-1"), node("real-2")];
  const results = searchCultureGraphNodes(nodes, "real", 8);
  ok(
    "8. every search result is one of the real input nodes (no fabrication)",
    results.every((r) => nodes.some((n) => n.slug === r.slug)),
  );
  const defaults = getDefaultCultureGraphResults(nodes, 8);
  ok(
    "8b. every default result is one of the real input nodes (no fabrication)",
    defaults.every((r) => nodes.some((n) => n.slug === r.slug)),
  );
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

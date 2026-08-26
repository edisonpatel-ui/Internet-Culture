/**
 * Unit tests for computeCultureGraphLayout (Stage 2's deterministic
 * ring layout). Fabricated in-memory nodes only.
 *
 * Run: npx tsx scripts/test-culture-graph-layout.ts
 */

import { computeCultureGraphLayout, type CultureGraphNode } from "../lib/discovery/cultureGraph";

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

function node(slug: string, category: CultureGraphNode["category"]): CultureGraphNode {
  return { slug, title: slug, category };
}

console.log("\nCulture Graph layout tests:\n");

// Single node, single category — should sit at angle 0 on its ring (radius = BASE_RADIUS).
{
  const layout = computeCultureGraphLayout([node("a", "meme")]);
  const pos = layout.positions.get("a")!;
  ok("single node placed at (radius, 0)", Math.abs(pos.x - 70) < 0.01 && Math.abs(pos.y) < 0.01, JSON.stringify(pos));
  ok("outerRadius matches single-ring bound", layout.outerRadius === 70 + 40);
}

// Determinism: same input twice → identical output
{
  const nodes = [node("z", "meme"), node("a", "meme"), node("m", "slang")];
  const l1 = computeCultureGraphLayout(nodes);
  const l2 = computeCultureGraphLayout(nodes);
  let identical = true;
  for (const n of nodes) {
    const p1 = l1.positions.get(n.slug)!;
    const p2 = l2.positions.get(n.slug)!;
    if (p1.x !== p2.x || p1.y !== p2.y) identical = false;
  }
  ok("identical input produces identical positions (no randomness)", identical);
}

// Alphabetical ordering within a ring, independent of input order
{
  const inOrder = computeCultureGraphLayout([node("z", "meme"), node("a", "meme")]);
  const reversed = computeCultureGraphLayout([node("a", "meme"), node("z", "meme")]);
  ok(
    "node order within a ring is independent of input array order",
    inOrder.positions.get("a")!.x === reversed.positions.get("a")!.x &&
      inOrder.positions.get("a")!.y === reversed.positions.get("a")!.y,
  );
}

// Multiple categories get distinct ring radii
{
  const nodes = [node("a", "creator"), node("b", "event"), node("c", "meme")];
  const layout = computeCultureGraphLayout(nodes);
  const distFromCenter = (slug: string) => {
    const p = layout.positions.get(slug)!;
    return Math.sqrt(p.x * p.x + p.y * p.y);
  };
  ok(
    "creator ring is innermost, event next, meme outermost (fixed ring order)",
    distFromCenter("a") < distFromCenter("b") && distFromCenter("b") < distFromCenter("c"),
  );
}

// Categories with zero nodes don't create an empty/wasted ring
{
  const nodes = [node("a", "creator"), node("b", "trend")]; // skips event/meme/slang entirely
  const layout = computeCultureGraphLayout(nodes);
  const distA = Math.hypot(layout.positions.get("a")!.x, layout.positions.get("a")!.y);
  const distB = Math.hypot(layout.positions.get("b")!.x, layout.positions.get("b")!.y);
  ok(
    "only 2 rings are used for 2 populated categories, adjacent (no gap for skipped categories)",
    Math.abs(distB - distA - 90) < 0.01,
    `distA=${distA} distB=${distB}`,
  );
}

// Empty input
{
  const layout = computeCultureGraphLayout([]);
  ok("empty node list produces empty positions map", layout.positions.size === 0);
  ok("empty node list still returns a sane (non-negative) outerRadius", layout.outerRadius > 0);
}

// All nodes within a ring are equidistant from center (same radius)
{
  const nodes = [node("a", "meme"), node("b", "meme"), node("c", "meme"), node("d", "meme")];
  const layout = computeCultureGraphLayout(nodes);
  const dists = nodes.map((n) => Math.hypot(layout.positions.get(n.slug)!.x, layout.positions.get(n.slug)!.y));
  const allEqual = dists.every((d) => Math.abs(d - dists[0]) < 0.01);
  ok("all nodes in the same ring are equidistant from center", allEqual, JSON.stringify(dists));
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

/**
 * Unit tests for computeFullGraphLayout — the deterministic force-directed
 * relaxation used by the full-network Culture Graph view (post-launch
 * "return to a full graph, decluttered by layout" update).
 *
 * Run: npx tsx scripts/test-culture-graph-full-layout.ts
 */

import {
  computeFullGraphLayout,
  getConnectedSlugs,
  buildCultureGraphEdges,
  getCultureGraphNodeSlugs,
  getCultureGraphNodes,
  type CultureGraphEdge,
  type CultureGraphNode,
} from "@/lib/discovery/cultureGraph";
import { getAllEntriesSync } from "@/lib/services/entries";

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
  return {
    slug,
    title: slug,
    category,
    description: "fixture",
    addedAt: "2026-01-01",
    imageGradient: "from-zinc-800 to-black",
  };
}

function edge(from: string, to: string): CultureGraphEdge {
  return { from, to, type: "related", directional: false };
}

console.log("\nFull-network Culture Graph layout tests:\n");

// Empty input.
{
  const layout = computeFullGraphLayout([], []);
  ok("empty node list produces empty positions map", layout.positions.size === 0);
  ok("empty node list still returns a positive outerRadius", layout.outerRadius > 0);
}

// Determinism — same input in, same positions out, every run.
{
  const nodes = [node("a", "meme"), node("b", "slang"), node("c", "meme"), node("d", "event")];
  const edges = [edge("a", "b"), edge("b", "c")];
  const layout1 = computeFullGraphLayout(nodes, edges);
  const layout2 = computeFullGraphLayout(nodes, edges);
  let identical = true;
  for (const n of nodes) {
    const p1 = layout1.positions.get(n.slug)!;
    const p2 = layout2.positions.get(n.slug)!;
    if (p1.x !== p2.x || p1.y !== p2.y) identical = false;
  }
  ok("identical input produces identical positions (no randomness)", identical);
}

// EVERY node passed in gets a position — the whole network is laid out, not a subset.
{
  const nodes = Array.from({ length: 20 }, (_, i) => node(`n${i}`, "meme"));
  const edges: CultureGraphEdge[] = [];
  for (let i = 0; i < 19; i++) edges.push(edge(`n${i}`, `n${i + 1}`));
  const layout = computeFullGraphLayout(nodes, edges);
  ok("every input node receives a position", layout.positions.size === nodes.length);
}

// Connected nodes end up closer together than an arbitrary unconnected pair
// (the whole point of the relaxation — it declutters by pulling relations
// together, not just by re-ordering a ring).
{
  const nodes = [
    node("hub", "meme"),
    node("neighbor", "meme"),
    node("far1", "slang"),
    node("far2", "event"),
    node("far3", "trend"),
    node("far4", "brainrot"),
  ];
  const edges = [edge("hub", "neighbor")];
  const layout = computeFullGraphLayout(nodes, edges);
  function dist(a: string, b: string) {
    const pa = layout.positions.get(a)!;
    const pb = layout.positions.get(b)!;
    return Math.hypot(pa.x - pb.x, pa.y - pb.y);
  }
  const connectedDist = dist("hub", "neighbor");
  const unconnectedDist = dist("hub", "far1");
  ok(
    "a connected pair ends up closer than an arbitrary unconnected pair",
    connectedDist < unconnectedDist,
    `connected=${connectedDist.toFixed(1)} unconnected=${unconnectedDist.toFixed(1)}`,
  );
}

// getConnectedSlugs — direct (1-hop) neighbors only, both edge directions.
{
  const edges = [edge("a", "b"), edge("c", "a"), edge("b", "d")];
  const connected = getConnectedSlugs(edges, "a");
  ok("includes neighbor from an outgoing edge", connected.has("b"));
  ok("includes neighbor from an incoming edge", connected.has("c"));
  ok("excludes a 2-hop node", !connected.has("d"));
  ok("exactly 2 direct connections", connected.size === 2);
}

// Real canonical data — the full network actually renders (sanity check
// against the live catalog, not just fixtures).
{
  const allEntries = getAllEntriesSync();
  const edges = buildCultureGraphEdges(allEntries);
  const nodeSlugs = getCultureGraphNodeSlugs(edges);
  const nodes = getCultureGraphNodes(allEntries, nodeSlugs);
  const layout = computeFullGraphLayout(nodes, edges);
  ok(
    "real data: every real graph node gets a position",
    layout.positions.size === nodes.length,
    `${layout.positions.size} vs ${nodes.length}`,
  );
  ok("real data: outerRadius is finite and positive", Number.isFinite(layout.outerRadius) && layout.outerRadius > 0);
  let anyNaN = false;
  for (const p of layout.positions.values()) {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) anyNaN = true;
  }
  ok("real data: no NaN/Infinity positions", !anyNaN);
}

console.log(`\n${passed} passed, ${failures} failed.\n`);
if (failures > 0) process.exit(1);

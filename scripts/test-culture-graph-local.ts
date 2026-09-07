/**
 * Unit tests for the bounded local-exploration model added to the Culture
 * Graph (getLocalSubgraph, computeLocalGraphLayout) — the fix for the
 * "hundreds of nodes at once" clutter problem. Fabricated in-memory
 * nodes/edges only.
 *
 * Run: npx tsx scripts/test-culture-graph-local.ts
 */

import {
  getLocalSubgraph,
  computeLocalGraphLayout,
  buildCultureGraphEdges,
  getCultureGraphNodeSlugs,
  getCultureGraphNodes,
  type CultureGraphNode,
  type CultureGraphEdge,
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

function node(slug: string, category: CultureGraphNode["category"] = "meme"): CultureGraphNode {
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

console.log("\nCulture Graph local-exploration tests:\n");

// Single focus: center + direct neighbors only, not 2-hop.
{
  const nodes = [node("center"), node("n1"), node("n2"), node("far")];
  const edges = [edge("center", "n1"), edge("center", "n2"), edge("n2", "far")];
  const { nodes: localNodes, edges: localEdges } = getLocalSubgraph(["center"], nodes, edges);
  const slugs = localNodes.map((n) => n.slug).sort();
  ok("single focus includes center + direct neighbors", JSON.stringify(slugs) === JSON.stringify(["center", "n1", "n2"]));
  ok("single focus EXCLUDES a 2-hop node ('far') — bounded, not the whole component", !slugs.includes("far"));
  ok("edges only among the visible set (n2→far excluded)", !localEdges.some((e) => e.to === "far" || e.from === "far"));
}

// Multi-center (no-focus starting state): exactly the centers, NOT expanded.
{
  const nodes = [node("a"), node("b"), node("hub-neighbor")];
  const edges = [edge("a", "hub-neighbor")]; // "a" has a neighbor not in the starting set
  const { nodes: localNodes } = getLocalSubgraph(["a", "b"], nodes, edges);
  const slugs = localNodes.map((n) => n.slug).sort();
  ok(
    "no-focus starting state shows exactly the given centers, NOT expanded to their neighbors",
    JSON.stringify(slugs) === JSON.stringify(["a", "b"]),
    JSON.stringify(slugs),
  );
}

// No fabricated nodes: every returned node/edge references only real input nodes.
{
  const nodes = [node("x"), node("y")];
  const edges = [edge("x", "y"), edge("x", "ghost")]; // "ghost" not in nodes — shouldn't happen upstream, but defend anyway
  const { nodes: localNodes, edges: localEdges } = getLocalSubgraph(["x"], nodes, edges);
  ok("no fabricated node slugs in output", localNodes.every((n) => nodes.some((orig) => orig.slug === n.slug)));
  ok("no edge references a node absent from the real node list", !localEdges.some((e) => e.to === "ghost"));
}

// Layout: single focus sits exactly at (0,0); neighbors form a ring around it.
{
  const nodes = [node("center"), node("n1"), node("n2"), node("n3")];
  const layout = computeLocalGraphLayout(["center"], nodes);
  const centerPos = layout.positions.get("center")!;
  ok("focused center node is placed exactly at (0,0)", centerPos.x === 0 && centerPos.y === 0);

  const others = ["n1", "n2", "n3"].map((s) => layout.positions.get(s)!);
  const dists = others.map((p) => Math.hypot(p.x, p.y));
  ok("all neighbors are equidistant from the center (clean ring, not scattered)", dists.every((d) => Math.abs(d - dists[0]) < 0.01));
}

// Layout: multi-center (no-focus) state — simple ring, no single node forced to (0,0).
{
  const nodes = [node("a"), node("b"), node("c")];
  const layout = computeLocalGraphLayout(["a", "b", "c"], nodes);
  const dists = nodes.map((n) => Math.hypot(layout.positions.get(n.slug)!.x, layout.positions.get(n.slug)!.y));
  ok("no-focus ring: all centers equidistant from origin (no forced center-at-zero)", dists.every((d) => Math.abs(d - dists[0]) < 0.01 && d > 0));
}

// Real-data check: local subgraph is dramatically smaller than the full graph.
{
  const all = getAllEntriesSync();
  const fullEdges = buildCultureGraphEdges(all);
  const fullNodeSlugs = getCultureGraphNodeSlugs(fullEdges);
  const fullNodes = getCultureGraphNodes(all, fullNodeSlugs);

  const focusedSlug = "doge"; // known real, well-connected entry
  const { nodes: localNodes } = getLocalSubgraph([focusedSlug], fullNodes, fullEdges);

  ok(
    `real data: focusing "${focusedSlug}" renders far fewer nodes than the full graph (${localNodes.length} vs ${fullNodes.length})`,
    localNodes.length < fullNodes.length / 2,
    `local=${localNodes.length} full=${fullNodes.length}`,
  );
  ok("focused article itself is included in its own local view", localNodes.some((n) => n.slug === focusedSlug));

  // No-focus real-data check: default starting state is small.
  const defaultCenters = fullNodes.slice(0, 8).map((n) => n.slug);
  const { nodes: startingNodes } = getLocalSubgraph(defaultCenters, fullNodes, fullEdges);
  ok(
    "real data: no-focus starting state stays small (exactly the 8 centers, not expanded)",
    startingNodes.length === 8,
    `got ${startingNodes.length}`,
  );
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

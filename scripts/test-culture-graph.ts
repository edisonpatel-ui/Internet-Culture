/**
 * Unit tests for the Culture Graph data foundation
 * (lib/discovery/cultureGraph.ts). Fabricated in-memory entries only —
 * no content files touched, no relationships populated in real content.
 *
 * Run: npx tsx scripts/test-culture-graph.ts
 */

import {
  buildCultureGraphEdges,
  getCultureGraphNodeSlugs,
  getCultureGraphNodes,
  getEdgesForSlug,
} from "@/lib/discovery/cultureGraph";
import type { BaseEntry } from "@/types";

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

function entry(slug: string, overrides: Partial<BaseEntry> = {}): BaseEntry {
  return {
    id: slug,
    slug,
    title: slug,
    category: "meme",
    description: "fixture",
    trendDirection: "stable",
    addedAt: "2026-01-01",
    scores: { relevance: 0, influence: 0, cringe: 0, brainrot: 0 },
    views: 0,
    imageGradient: "from-zinc-800 to-black",
    ...overrides,
  } as BaseEntry;
}

console.log("\nCulture Graph Stage 1 tests:\n");

// Basic relatedSlugs → edge derivation
{
  const a = entry("a", { relatedSlugs: ["b", "c"] });
  const b = entry("b");
  const c = entry("c");
  const edges = buildCultureGraphEdges([a, b, c]);
  ok("relatedSlugs produce 2 edges from a", edges.filter((e) => e.from === "a").length === 2);
  ok("relatedSlugs edges are type 'related' and symmetric", edges.every((e) => e.type === "related" && e.directional === false));
}

// Typed relationships → edge derivation with correct directionality
{
  const a = entry("a", { relationships: { inspiredBy: ["b"], sameEra: ["c"] } });
  const b = entry("b");
  const c = entry("c");
  const edges = buildCultureGraphEdges([a, b, c]);
  const inspired = edges.find((e) => e.type === "inspiredBy");
  const era = edges.find((e) => e.type === "sameEra");
  ok("inspiredBy edge created a→b", inspired?.from === "a" && inspired?.to === "b");
  ok("inspiredBy is directional", inspired?.directional === true);
  ok("sameEra edge created a→c", era?.from === "a" && era?.to === "c");
  ok("sameEra is symmetric", era?.directional === false);
}

// New Stage-1-added relationship types work end to end
{
  const a = entry("a", {
    relationships: {
      influenced: ["b"],
      predecessorOf: ["c"],
      relatedCreator: ["d"],
    },
  });
  const b = entry("b");
  const c = entry("c");
  const d = entry("d", { category: "creator" });
  const edges = buildCultureGraphEdges([a, b, c, d]);
  ok("new type 'influenced' produces an edge", edges.some((e) => e.type === "influenced" && e.to === "b"));
  ok("new type 'predecessorOf' produces an edge", edges.some((e) => e.type === "predecessorOf" && e.to === "c"));
  ok("new type 'relatedCreator' produces an edge", edges.some((e) => e.type === "relatedCreator" && e.to === "d"));
}

// Dangling reference (deleted article) is silently excluded, not an error
{
  const a = entry("a", { relatedSlugs: ["ghost"], relationships: { relatedTo: ["ghost2"] } });
  // "ghost"/"ghost2" NOT included in the entries array — simulates a deleted article.
  const edges = buildCultureGraphEdges([a]);
  ok("edge to a non-existent slug (relatedSlugs) is excluded", !edges.some((e) => e.to === "ghost"));
  ok("edge to a non-existent slug (relationships) is excluded", !edges.some((e) => e.to === "ghost2"));
  ok("zero edges produced when all targets are missing", edges.length === 0);
}

// Deleting an article removes its edges on next derivation (no stale graph)
{
  const a = entry("a", { relatedSlugs: ["b"] });
  const b = entry("b");
  const before = buildCultureGraphEdges([a, b]);
  ok("edge exists while b is present", before.some((e) => e.to === "b"));
  const after = buildCultureGraphEdges([a]); // "b" deleted — simply absent from next call
  ok("edge disappears once b is absent from the entries array (simulated deletion)", after.length === 0);
}

// Self-reference is excluded
{
  const a = entry("a", { relatedSlugs: ["a"], relationships: { relatedTo: ["a"] } });
  const edges = buildCultureGraphEdges([a]);
  ok("self-referencing relatedSlugs edge excluded", edges.length === 0);
}

// Node/slug helpers
{
  const a = entry("a", { relatedSlugs: ["b"] });
  const b = entry("b", { title: "B Title", category: "slang" });
  const c = entry("c"); // isolated, no edges
  const edges = buildCultureGraphEdges([a, b, c]);
  const nodeSlugs = getCultureGraphNodeSlugs(edges);
  ok("node slugs include both endpoints", nodeSlugs.has("a") && nodeSlugs.has("b"));
  ok("isolated node with no edges is excluded from node-slug set", !nodeSlugs.has("c"));

  const nodes = getCultureGraphNodes([a, b, c], nodeSlugs);
  ok("node objects carry title/category", nodes.find((n) => n.slug === "b")?.title === "B Title" && nodes.find((n) => n.slug === "b")?.category === "slang");
  ok("exactly 2 nodes returned (isolated c excluded)", nodes.length === 2);
}

// getEdgesForSlug
{
  const a = entry("a", { relatedSlugs: ["b"] });
  const b = entry("b", { relatedSlugs: ["c"] });
  const c = entry("c");
  const edges = buildCultureGraphEdges([a, b, c]);
  const forB = getEdgesForSlug(edges, "b");
  ok("getEdgesForSlug returns edges where slug is either endpoint", forB.length === 2);
}

// Both relatedSlugs AND relationships for the same pair produce two distinct edges (not deduped)
{
  const a = entry("a", { relatedSlugs: ["b"], relationships: { relatedTo: ["b"] } });
  const b = entry("b");
  const edges = buildCultureGraphEdges([a, b]);
  ok("relatedSlugs + relationships.relatedTo for the same pair produce 2 distinct edges", edges.length === 2);
  ok("one is type 'related', one is type 'relatedTo'", edges.some((e) => e.type === "related") && edges.some((e) => e.type === "relatedTo"));
}

// Node payload trims each entry's media down to just the single featured
// item — the graph never needs the full gallery (supporting/video/
// reference items) just to render a thumbnail, and shipping all of it to
// the client for every node was pure unused Fast Origin Transfer.
{
  const withGallery = entry("gallery-heavy", {
    media: [
      { type: "image", url: "https://example.com/supporting.jpg", role: "supporting", title: "Supporting", source: "Example", sourceUrl: "https://example.com", platform: "other" },
      { type: "image", url: "https://example.com/featured.jpg", role: "featured", title: "Featured", source: "Example", sourceUrl: "https://example.com", platform: "other" },
      { type: "video", url: "https://example.com/clip.mp4", role: "video", title: "Clip", source: "Example", sourceUrl: "https://example.com", platform: "other" },
      { type: "image", url: "https://example.com/reference.jpg", role: "reference", title: "Reference", source: "Example", sourceUrl: "https://example.com", platform: "other" },
    ],
  });
  const noMedia = entry("no-media");
  const nodeSlugs = new Set(["gallery-heavy", "no-media"]);
  const nodes = getCultureGraphNodes([withGallery, noMedia], nodeSlugs);
  const galleryNode = nodes.find((n) => n.slug === "gallery-heavy");
  ok("only the featured item survives trimming, not the full 4-item gallery", galleryNode?.media?.length === 1);
  ok("the surviving item is specifically the one marked featured", galleryNode?.media?.[0]?.role === "featured");
  const emptyNode = nodes.find((n) => n.slug === "no-media");
  ok("an entry with no media at all still trims to undefined, not an empty array crash", emptyNode?.media === undefined);
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

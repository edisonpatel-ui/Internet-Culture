/**
 * Tests for the bidirectional fallback links added to
 * lib/discovery/cultureGraph.ts and consumed by
 * lib/intelligence/related.ts. Fabricated in-memory entries only.
 *
 * Kept as its own script (not appended to test-culture-graph.ts) so the
 * pinned 25-test culture-graph suite stays exactly as it was.
 *
 * Run: npx tsx scripts/test-bidirectional-links.ts
 */

import {
  buildCultureGraphEdges,
  getBidirectionalRelatedSlugs,
  getIncomingLinkSlugs,
  SPARSE_LINK_THRESHOLD,
} from "@/lib/discovery/cultureGraph";
import { getRelatedRecommendations } from "@/lib/intelligence/related";
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

console.log("\nBidirectional fallback link tests:\n");

// Sparse entry gets reverse links from entries that point at it.
{
  const target = entry("target"); // no outgoing links at all
  const a = entry("a", { relatedSlugs: ["target"] });
  const b = entry("b", { relationships: { inspiredBy: ["target"] } });
  const unrelated = entry("unrelated");
  const all = [target, a, b, unrelated];

  ok("getIncomingLinkSlugs finds relatedSlugs sources", getIncomingLinkSlugs(all, "target").includes("a"));
  ok("getIncomingLinkSlugs finds typed-relationship sources", getIncomingLinkSlugs(all, "target").includes("b"));
  ok("getIncomingLinkSlugs excludes non-linking entries", !getIncomingLinkSlugs(all, "target").includes("unrelated"));
  ok("getIncomingLinkSlugs is alphabetical/deterministic", getIncomingLinkSlugs(all, "target").join() === "a,b");

  const fb = getBidirectionalRelatedSlugs(target, all);
  ok("sparse entry gains both reverse links", fb.join() === "a,b", fb.join());
}

// Non-sparse entry is returned exactly as authored (no change).
{
  const rich = entry("rich", { relatedSlugs: ["x", "y", "z"] });
  const x = entry("x");
  const y = entry("y");
  const z = entry("z");
  const other = entry("other", { relatedSlugs: ["rich"] });
  const all = [rich, x, y, z, other];
  const out = getBidirectionalRelatedSlugs(rich, all);
  ok(`entry with >= ${SPARSE_LINK_THRESHOLD} links is untouched`, out.join() === "x,y,z", out.join());
}

// Authored links keep their order and precede fallback links.
{
  const s = entry("s", { relatedSlugs: ["m"] });
  const m = entry("m");
  const zz = entry("zz", { relatedSlugs: ["s"] });
  const aa = entry("aa", { relatedSlugs: ["s"] });
  const out = getBidirectionalRelatedSlugs(s, [s, m, zz, aa]);
  ok("authored link first, then alphabetical reverse links", out.join() === "m,aa,zz", out.join());
}

// A reverse link already authored outgoing is not duplicated.
{
  const s = entry("s", { relatedSlugs: ["m"] });
  const m = entry("m", { relatedSlugs: ["s"] });
  const out = getBidirectionalRelatedSlugs(s, [s, m]);
  ok("mutual link is not duplicated", out.join() === "m", out.join());
}

// Dangling + self references never leak out.
{
  const s = entry("s", { relatedSlugs: ["ghost", "s"] });
  const dangling = entry("d", { relatedSlugs: ["ghost-too"] });
  const out = getBidirectionalRelatedSlugs(s, [s, dangling]);
  ok("dangling and self slugs are dropped", out.length === 0, out.join());
}

// maxFallback caps how many reverse links are added.
{
  const t = entry("t");
  const sources = ["a", "b", "c", "d"].map((x) => entry(x, { relatedSlugs: ["t"] }));
  const out = getBidirectionalRelatedSlugs(t, [t, ...sources], { maxFallback: 2 });
  ok("maxFallback caps reverse links", out.length === 2, out.join());
}

// buildCultureGraphEdges is untouched by the fallback (still pinned).
{
  const a = entry("a", { relatedSlugs: ["b"] });
  const b = entry("b");
  ok("buildCultureGraphEdges still emits exactly the authored edge", buildCultureGraphEdges([a, b]).length === 1);
}

// Related resolver: sparse page now shows the entry that links to it.
{
  const target = entry("target", { title: "Target" });
  const linker = entry("linker", { title: "Linker", relatedSlugs: ["target"] });
  const noise = entry("noise", { title: "Noise" });
  const recs = getRelatedRecommendations(target, [target, linker, noise]);
  const hit = recs.find((r) => r.entry.slug === "linker");
  ok("sparse entry's related list includes the entry that links to it", Boolean(hit));
  ok("fallback link is labelled as cross-linked", hit?.reason === "mutual-link", hit?.reason);
  ok("unlinked entry is still not padded in", !recs.some((r) => r.entry.slug === "noise"));
}

// Related resolver: a rich entry's list is not altered by fallback logic.
{
  const rich = entry("rich", { title: "Rich", relatedSlugs: ["x", "y", "z"] });
  const x = entry("x", { title: "X" });
  const y = entry("y", { title: "Y" });
  const z = entry("z", { title: "Z" });
  const stranger = entry("stranger", { title: "Stranger", relatedSlugs: ["rich"] });
  const recs = getRelatedRecommendations(rich, [rich, x, y, z, stranger]);
  const slugs = recs.map((r) => r.entry.slug);
  ok("rich entry keeps its authored links", ["x", "y", "z"].every((s) => slugs.includes(s)));
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;

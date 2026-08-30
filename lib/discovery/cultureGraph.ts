/**
 * Culture Graph data foundation (Stage 1 — architecture only, no UI, no
 * relationship population). Mirrors the shape of lib/discovery/timeline.ts
 * and lib/discovery/scoring.ts: pure functions derived fresh from the
 * canonical article catalog on every call, never a separately maintained
 * dataset.
 *
 * The graph is a knowledge graph — Article → relationship → Article — not
 * a tree. Two existing, already-populated sources on `BaseEntry` feed it:
 *   - `relationships` (RelationshipMap): typed, often directional edges.
 *     174/360 entries already have this populated (real curated data).
 *   - `relatedSlugs`: a simpler, symmetric "related" edge. 357/360 entries
 *     already have this populated.
 * Stage 1 does not add or infer a single new relationship — it only
 * builds the derivation layer over what's already there.
 *
 * DANGLING REFERENCES: content validation (checkRelationshipReferences-
 * equivalent logic already in lib/content/validation/validateContent.ts —
 * BROKEN_RELATED_SLUG / BROKEN_RELATIONSHIP_SLUG) already catches stray
 * slugs at authoring time. This module adds a second, structural
 * guarantee: `buildCultureGraphEdges` filters every edge against the
 * CURRENT entries array's own slugs, so if an article is ever deleted,
 * every edge pointing at it simply stops being produced on the next
 * derivation — there is no separate graph store that could go stale.
 */

import type { BaseEntry, RelationshipMap } from "@/types";

/** All RelationshipMap keys the graph understands, with edge semantics. */
export type RelationshipEdgeType = keyof RelationshipMap | "related";

/**
 * Whether each relationship key represents a directional edge (A → B means
 * something different from B → A) or a symmetric association (A related-to
 * B is the same fact as B related-to A). Used by future graph UI to decide
 * arrowheads/layout — not consumed by anything in Stage 1 itself.
 */
export const RELATIONSHIP_DIRECTIONALITY: Record<RelationshipEdgeType, "directional" | "symmetric"> = {
  related: "symmetric", // from relatedSlugs — the generic editorial shortcut
  relatedTo: "symmetric",
  inspiredBy: "directional",
  influenced: "directional",
  popularizedBy: "directional",
  originatedFrom: "directional",
  spawnedVariants: "directional",
  popularized: "directional",
  originated: "directional",
  predecessorOf: "directional",
  successorOf: "directional",
  sameEra: "symmetric",
  sameFormat: "symmetric",
  memberOf: "directional",
  relatedSlang: "symmetric",
  relatedEvent: "symmetric",
  relatedMeme: "symmetric",
  relatedCreator: "symmetric",
  relatedTrend: "symmetric",
  community: "symmetric",
};

const RELATIONSHIP_KEYS = Object.keys(RELATIONSHIP_DIRECTIONALITY).filter(
  (k) => k !== "related",
) as Array<keyof RelationshipMap>;

export interface CultureGraphEdge {
  /** Slug of the entry that declares the relationship. */
  from: string;
  /** Slug of the referenced entry. */
  to: string;
  type: RelationshipEdgeType;
  directional: boolean;
}

/**
 * A trimmed projection of the canonical entry — exactly the fields a
 * node/search-result/hover-preview needs (identity, display text, and the
 * existing media system's fields), not the full BaseEntry (scores,
 * sources, timeline, relationships, aiSummary, etc. are excluded). Still
 * sourced directly from the one canonical entry — a projection, not a
 * second dataset.
 */
export interface CultureGraphNode {
  slug: string;
  title: string;
  category: BaseEntry["category"];
  description: string;
  addedAt: string;
  imageGradient: string;
  imageUrl?: string;
  media?: BaseEntry["media"];
}

/**
 * Derives every graph edge from the canonical entries array — nothing
 * cached, nothing manually maintained. An edge is only ever produced when
 * BOTH endpoints exist in the passed-in `entries` (self-healing against
 * deletion: pass the current catalog, get only currently-valid edges).
 *
 * Includes both sources: typed `relationships` edges (specific type per
 * key) and generic `relatedSlugs` edges (type: "related"). A pair that
 * appears in both is intentionally NOT deduplicated into one edge — they
 * are different facts (an explicit typed relationship vs. the general
 * "related" shortcut) and future UI may want to distinguish them.
 */
export function buildCultureGraphEdges(
  entries: readonly BaseEntry[],
): CultureGraphEdge[] {
  const slugSet = new Set(entries.map((e) => e.slug));
  const edges: CultureGraphEdge[] = [];

  for (const entry of entries) {
    for (const target of entry.relatedSlugs ?? []) {
      if (!slugSet.has(target) || target === entry.slug) continue;
      edges.push({ from: entry.slug, to: target, type: "related", directional: false });
    }

    if (!entry.relationships) continue;
    for (const key of RELATIONSHIP_KEYS) {
      const targets = entry.relationships[key];
      if (!targets) continue;
      for (const target of targets) {
        if (!slugSet.has(target) || target === entry.slug) continue;
        edges.push({
          from: entry.slug,
          to: target,
          type: key,
          directional: RELATIONSHIP_DIRECTIONALITY[key] === "directional",
        });
      }
    }
  }

  return edges;
}

/** Every slug that participates in at least one edge (either end). */
export function getCultureGraphNodeSlugs(
  edges: readonly CultureGraphEdge[],
): Set<string> {
  const slugs = new Set<string>();
  for (const edge of edges) {
    slugs.add(edge.from);
    slugs.add(edge.to);
  }
  return slugs;
}

/**
 * Node identity objects for a given slug set — deliberately minimal
 * (slug/title/category only; no media, no scores) since Stage 1 builds no
 * UI. Future stages add whatever a node/hover-preview actually needs.
 */
export function getCultureGraphNodes(
  entries: readonly BaseEntry[],
  slugs: ReadonlySet<string>,
): CultureGraphNode[] {
  return entries
    .filter((e) => slugs.has(e.slug))
    .map((e) => ({
      slug: e.slug,
      title: e.title,
      category: e.category,
      description: e.description,
      addedAt: e.addedAt,
      imageGradient: e.imageGradient,
      imageUrl: e.imageUrl,
      media: e.media,
    }));
}

/**
 * Default (empty-query) results — most recently added graph-participating
 * articles, same recency convention as the homepage's "Recently Added"
 * section (lib/discovery/scoring.ts selectRecentlyAdded). Scoped to graph
 * nodes only (not all 360 entries) so every result is guaranteed
 * focusable in the graph.
 */
export function getDefaultCultureGraphResults(
  nodes: readonly CultureGraphNode[],
  limit = 8,
): CultureGraphNode[] {
  return [...nodes]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

/**
 * Simple, dependency-free substring match over title + description —
 * same matching philosophy as lib/discovery/searchText.ts's
 * entrySearchText haystack, kept separate only because CultureGraphNode
 * is a trimmed projection, not a full BaseEntry. Returns at most `limit`
 * results — never the whole catalog.
 */
export function searchCultureGraphNodes(
  nodes: readonly CultureGraphNode[],
  query: string,
  limit = 8,
): CultureGraphNode[] {
  const q = query.trim().toLowerCase();
  if (!q) return getDefaultCultureGraphResults(nodes, limit);
  return nodes
    .filter((n) => `${n.title} ${n.description}`.toLowerCase().includes(q))
    .slice(0, limit);
}

/**
 * All edges touching one specific article — the query a future
 * `/culture-graph?focus={slug}` view or a Timeline "Explore in Culture
 * Graph" landing would need. Not wired to any route/UI in Stage 1.
 */
export function getEdgesForSlug(
  edges: readonly CultureGraphEdge[],
  slug: string,
): CultureGraphEdge[] {
  return edges.filter((e) => e.from === slug || e.to === slug);
}

/**
 * NOT IMPLEMENTED IN STAGE 1 (architecture only, per instructions):
 * - A non-clickable "Internet" root node/edge convention for
 *   higher-level/uncategorized connections.
 * - Search, hover previews, node click behavior.
 * - Timeline → Culture Graph focus wiring (the `focus` query param
 *   contract already exists from the Timeline work; nothing here yet
 *   consumes it).
 * The data shape above (typed, directional-aware edges; self-healing
 * against deletion; node lookup by slug) is designed so those can be
 * added as pure additions later without reworking this layer.
 */

// ─── Stage 2: deterministic initial layout ─────────────────────────────────

export interface GraphNodePosition {
  x: number;
  y: number;
}

/**
 * Fixed ring order — arbitrary but deterministic, not derived from any
 * score. Category grouping gives new visitors an immediately readable
 * structure (matches the existing Badge color language) without needing
 * a real graph-clustering algorithm for a first version.
 */
const CATEGORY_RING_ORDER: BaseEntry["category"][] = [
  "creator",
  "event",
  "meme",
  "slang",
  "trend",
  "brainrot",
];

const RING_GAP = 90;
const BASE_RADIUS = 70;

export interface CultureGraphLayout {
  positions: Map<string, GraphNodePosition>;
  /** Outer bound of the layout — callers use this to size a viewBox. */
  outerRadius: number;
}

/**
 * Deterministic, dependency-free initial positioning: one concentric ring
 * per category, nodes spaced evenly by angle within their own ring
 * (alphabetical by slug for a stable, reproducible order run to run — no
 * randomness, no physics simulation). Categories with zero participating
 * nodes simply don't get a ring, so the layout tightens automatically as
 * relationship data grows or shrinks.
 */
export function computeCultureGraphLayout(
  nodes: readonly CultureGraphNode[],
): CultureGraphLayout {
  const byCategory = new Map<BaseEntry["category"], CultureGraphNode[]>();
  for (const node of nodes) {
    const list = byCategory.get(node.category) ?? [];
    list.push(node);
    byCategory.set(node.category, list);
  }
  for (const list of byCategory.values()) {
    list.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  const activeCategories = CATEGORY_RING_ORDER.filter(
    (c) => (byCategory.get(c)?.length ?? 0) > 0,
  );

  const positions = new Map<string, GraphNodePosition>();
  activeCategories.forEach((category, ringIndex) => {
    const list = byCategory.get(category) ?? [];
    const radius = BASE_RADIUS + ringIndex * RING_GAP;
    const count = list.length;
    list.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / count;
      positions.set(node.slug, {
        x: Math.round(radius * Math.cos(angle) * 100) / 100,
        y: Math.round(radius * Math.sin(angle) * 100) / 100,
      });
    });
  });

  const outerRadius =
    activeCategories.length > 0
      ? BASE_RADIUS + (activeCategories.length - 1) * RING_GAP + 40
      : BASE_RADIUS;

  return { positions, outerRadius };
}

// ─── Stage 3: reusable graph-focus mechanism ───────────────────────────────

export interface GraphTransform {
  x: number;
  y: number;
  scale: number;
}

/**
 * The ONE function that computes "what pan/zoom transform makes this
 * node's position land at the center of the viewBox" — used by search
 * result selection AND by `?focus={slug}` URL resolution, so both origins
 * share identical centering behavior rather than two one-off
 * implementations. A future Timeline → Culture Graph link (Stage 4) reuses
 * this too; it's plain math with no dependency on how the caller obtained
 * the slug.
 *
 * Returns null when the slug has no position (not in the graph, or a
 * fabricated/invalid slug) — callers must treat null as "ignore silently,
 * keep current view," never as an error to crash on.
 */
export function computeFocusTransform(
  slug: string | null | undefined,
  positions: Readonly<Record<string, GraphNodePosition>>,
  outerRadius: number,
  scale: number,
): GraphTransform | null {
  if (!slug) return null;
  const pos = positions[slug];
  if (!pos) return null;
  const half = outerRadius;
  return {
    x: half - scale * (half + pos.x),
    y: half - scale * (half + pos.y),
    scale,
  };
}

// ─── Post-launch update: bounded local-exploration view ────────────────────

/**
 * Rendering the whole graph at once (hundreds of nodes, thousands of
 * edges) was too cluttered to read. Instead of rendering the full graph,
 * every view now shows only a bounded "local subgraph": one or more
 * center article(s) plus their DIRECT (1-hop) neighbors and the edges
 * among just that set. This is a rendering/exploration change only — the
 * canonical relationship data (buildCultureGraphEdges) is completely
 * unchanged; this just decides how much of it to show at once.
 *
 * `centerSlugs` with length 1 = a focused article (search result,
 * `?focus=`, or Timeline "Explore in Culture Graph"). Length > 1 = the
 * no-focus starting state (a small set of default/recent articles shown
 * side by side, deliberately NOT expanded to their neighbors — expanding
 * even a handful of well-connected hub articles could balloon right back
 * toward the whole graph, defeating the point).
 */
export function getLocalSubgraph(
  centerSlugs: readonly string[],
  allNodes: readonly CultureGraphNode[],
  allEdges: readonly CultureGraphEdge[],
): { nodes: CultureGraphNode[]; edges: CultureGraphEdge[] } {
  const centerSet = new Set(centerSlugs);

  // Single focused article: expand to its direct neighbors (the actual
  // "explore outward" view). Multiple centers (no-focus starting state):
  // show exactly those centers, deliberately not expanded — see above.
  const visibleSlugs = new Set(centerSlugs);
  if (centerSlugs.length === 1) {
    for (const edge of allEdges) {
      if (centerSet.has(edge.from)) visibleSlugs.add(edge.to);
      if (centerSet.has(edge.to)) visibleSlugs.add(edge.from);
    }
  }

  const nodes = allNodes.filter((n) => visibleSlugs.has(n.slug));
  // Filter edges against the REAL resolved node set, not `visibleSlugs`
  // directly — a neighbor slug can be added to `visibleSlugs` from an edge
  // even if no node with that slug actually exists in `allNodes` (e.g. a
  // dangling reference upstream validation didn't catch). Without this,
  // an edge could point at a slug that never appears as an actual node in
  // the output — the same self-healing-on-deletion principle already used
  // by buildCultureGraphEdges, applied at this layer too.
  const nodeSlugSet = new Set(nodes.map((n) => n.slug));
  const edges = allEdges.filter(
    (e) => nodeSlugSet.has(e.from) && nodeSlugSet.has(e.to),
  );
  return { nodes, edges };
}

/**
 * Layout for a local subgraph: single focus → hub-and-spoke (the focused
 * article at the exact center, neighbors evenly spaced around it — this
 * is what makes "the focused node is centered/visible" trivially true,
 * since it's placed at (0,0) by construction). Multiple centers (no-focus
 * state) → a single simple ring of just those articles, reusing the same
 * even-angular-spacing math as the ring layout above, just without
 * per-category grouping (the set is small and mixed-category already).
 */
export function computeLocalGraphLayout(
  centerSlugs: readonly string[],
  nodes: readonly CultureGraphNode[],
): CultureGraphLayout {
  const positions = new Map<string, GraphNodePosition>();

  if (centerSlugs.length === 1) {
    const [centerSlug] = centerSlugs;
    positions.set(centerSlug, { x: 0, y: 0 });
    const others = nodes.filter((n) => n.slug !== centerSlug);
    const radius = 90;
    others.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / Math.max(1, others.length);
      positions.set(node.slug, {
        x: Math.round(radius * Math.cos(angle) * 100) / 100,
        y: Math.round(radius * Math.sin(angle) * 100) / 100,
      });
    });
    return { positions, outerRadius: radius + 40 };
  }

  const radius = 70;
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / Math.max(1, nodes.length);
    positions.set(node.slug, {
      x: Math.round(radius * Math.cos(angle) * 100) / 100,
      y: Math.round(radius * Math.sin(angle) * 100) / 100,
    });
  });
  return { positions, outerRadius: radius + 40 };
}

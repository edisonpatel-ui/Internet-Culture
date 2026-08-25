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

export interface CultureGraphNode {
  slug: string;
  title: string;
  category: BaseEntry["category"];
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
    .map((e) => ({ slug: e.slug, title: e.title, category: e.category }));
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

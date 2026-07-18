/**
 * Relationship-graph depth helpers for quality audit.
 * Does not mutate catalog data.
 */

import type { BaseEntry, RelationshipMap } from "@/types";

const EDGE_KEYS: (keyof RelationshipMap)[] = [
  "relatedTo",
  "inspiredBy",
  "popularizedBy",
  "originatedFrom",
  "spawnedVariants",
  "popularized",
  "originated",
  "sameEra",
  "sameFormat",
  "memberOf",
  "relatedSlang",
  "relatedEvent",
  "community",
];

/** Prefer these as “strong cultural” edge types for scoring depth. */
const PRIORITY_EDGE_KEYS: (keyof RelationshipMap)[] = [
  "originated",
  "originatedFrom",
  "popularized",
  "popularizedBy",
  "inspiredBy",
  "spawnedVariants",
  "sameFormat",
  "memberOf",
  "relatedSlang",
  "relatedEvent",
  "community",
];

export interface RelationshipDepth {
  typedEdgeCount: number;
  priorityEdgeCount: number;
  relatedSlugCount: number;
  /** True when the entry has almost no cultural graph hooks. */
  isShallow: boolean;
  /** True when only loose relatedSlugs exist (no typed edges). */
  slugOnly: boolean;
}

export function measureRelationshipDepth(entry: BaseEntry): RelationshipDepth {
  const rel = entry.relationships;
  let typedEdgeCount = 0;
  let priorityEdgeCount = 0;

  if (rel) {
    for (const key of EDGE_KEYS) {
      const list = rel[key];
      if (list?.length) typedEdgeCount += list.length;
    }
    for (const key of PRIORITY_EDGE_KEYS) {
      const list = rel[key];
      if (list?.length) priorityEdgeCount += list.length;
    }
  }

  const relatedSlugCount = entry.relatedSlugs?.length ?? 0;
  const isShallow = typedEdgeCount === 0 && relatedSlugCount === 0;
  const slugOnly = typedEdgeCount === 0 && relatedSlugCount > 0;

  return {
    typedEdgeCount,
    priorityEdgeCount,
    relatedSlugCount,
    isShallow,
    slugOnly,
  };
}

/**
 * Relationship discovery — typed cultural edges between entries (RC3-C).
 *
 * Eventually feeds Related Entries; does not write relatedSlugs.
 */

export type CulturalRelationshipKind =
  | "predecessor"
  | "successor"
  | "parody"
  | "reaction"
  | "spin_off"
  | "same_creator"
  | "same_platform"
  | "same_era"
  | "same_community"
  | "same_format"
  | "same_event"
  | "shared_terminology"
  | "related_to";

export interface DiscoveredRelationship {
  kind: CulturalRelationshipKind;
  /** Existing catalog slug when known. */
  targetSlug?: string;
  /** Display name when slug unknown / not yet in catalog. */
  targetTitle: string;
  reason: string;
  /** 0–1 suggestion confidence for a human linker. */
  confidence: number;
}

export interface RelationshipDiscoveryResult {
  sourceSlug?: string;
  sourceTitle: string;
  relationships: DiscoveredRelationship[];
  notes: string[];
  requiresHumanReview: true;
}

export function buildRelationshipDiscovery(
  sourceTitle: string,
  relationships: DiscoveredRelationship[],
  options?: { sourceSlug?: string; notes?: string[] },
): RelationshipDiscoveryResult {
  return {
    sourceSlug: options?.sourceSlug,
    sourceTitle,
    relationships,
    notes: options?.notes ?? [],
    requiresHumanReview: true,
  };
}

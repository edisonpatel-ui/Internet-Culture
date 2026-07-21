/**
 * Knowledge graph — structural node/edge models (RC3-D).
 * Pure schema for future graph tooling. Does not persist or query a DB.
 */

export type KnowledgeNodeKind =
  | "article"
  | "platform"
  | "creator"
  | "community"
  | "technology"
  | "movement"
  | "format";

export type KnowledgeRelationKind =
  | "created"
  | "popularized"
  | "originated"
  | "parodied"
  | "influenced"
  | "inspired"
  | "reacted_to"
  | "same_era"
  | "same_community"
  | "same_platform"
  | "precursor"
  | "successor";

export interface KnowledgeNode {
  id: string;
  kind: KnowledgeNodeKind;
  label: string;
  /** Optional link to catalog slug or knowledge id. */
  ref?: string;
  aliases?: string[];
}

export interface KnowledgeEdge {
  id: string;
  from: string;
  to: string;
  kind: KnowledgeRelationKind;
  /** Free-text editorial reason. */
  reason?: string;
  /** Suggestion confidence 0–1 when AI-proposed. */
  confidence?: number;
}

export interface KnowledgeGraphFragment {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  notes: string[];
  requiresHumanReview: true;
}

export function createKnowledgeGraphFragment(
  nodes: KnowledgeNode[],
  edges: KnowledgeEdge[],
  notes: string[] = [],
): KnowledgeGraphFragment {
  return {
    nodes,
    edges,
    notes,
    requiresHumanReview: true,
  };
}

/** Basic structural checks — no graph DB. */
export function validateKnowledgeGraphFragment(
  fragment: KnowledgeGraphFragment,
): string[] {
  const issues: string[] = [];
  const ids = new Set(fragment.nodes.map((n) => n.id));
  if (ids.size !== fragment.nodes.length) {
    issues.push("duplicate node ids");
  }
  for (const e of fragment.edges) {
    if (!ids.has(e.from) || !ids.has(e.to)) {
      issues.push(`edge ${e.id} references missing node`);
    }
  }
  if (!fragment.requiresHumanReview) {
    issues.push("requiresHumanReview must be true");
  }
  return issues;
}

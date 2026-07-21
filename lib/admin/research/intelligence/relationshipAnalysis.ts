/**
 * Relationship analysis — discovers links between entities and catalog candidates.
 */

import type {
  Entity,
  Relationship,
  RelationshipAnalyzer,
  ResearchInput,
} from "./types";

export const mockRelationshipAnalyzer: RelationshipAnalyzer = {
  analyze(entities: Entity[], input: ResearchInput): Relationship[] {
    const out: Relationship[] = [];
    const platforms = entities.filter((e) => e.kind === "platform");
    const topicNode = entities.find((e) => e.kind === "meme") ?? {
      name: input.topic,
    };

    for (const p of platforms) {
      out.push({
        id: `rel-${p.id}`,
        kind: "associated_platform",
        fromName: topicNode.name,
        toName: p.name,
        reason: "Mock association — confirm with evidence before publishing links.",
        confidence: 0.35,
      });
    }

    return out;
  },
};

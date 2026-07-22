/**
 * Entity graph — evidence-only entities.
 * Never invent default platforms or discourse communities.
 */

import type {
  Entity,
  EntityGraphBuilder,
  Evidence,
  Relationship,
  ResearchInput,
} from "./types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function platformsFromEvidence(evidence: Evidence[]): Entity[] {
  const names = new Set<string>();
  for (const e of evidence) {
    const blob = `${e.sourceTitle} ${e.sourceUrl ?? ""} ${e.claim}`.toLowerCase();
    if (blob.includes("tiktok")) names.add("TikTok");
    if (blob.includes("youtube") || blob.includes("youtu.be")) names.add("YouTube");
    if (blob.includes("twitter") || blob.includes("x.com")) names.add("X (Twitter)");
    if (blob.includes("reddit")) names.add("Reddit");
    if (blob.includes("instagram")) names.add("Instagram");
  }
  return [...names].map((name) => ({
    id: `ent-platform-${slugify(name)}`,
    name,
    kind: "platform" as const,
    aliases: [],
    notes: "Inferred from evidence text/URL — not a default invention.",
  }));
}

export const mockEntityGraphBuilder: EntityGraphBuilder = {
  build(input: ResearchInput, evidence: Evidence[]) {
    const topic = input.topic;
    const platforms = platformsFromEvidence(evidence);

    const memes: Entity[] = [
      {
        id: `ent-topic-${slugify(topic)}`,
        name: topic,
        kind: "meme",
        aliases: [],
        catalogSlug: undefined,
        notes: "Candidate topic node until category classification is grounded.",
      },
    ];

    const relationships: Relationship[] = platforms.map((p) => ({
      id: `rel-${slugify(topic)}-${p.id}`,
      kind: "associated_platform",
      fromName: topic,
      toName: p.name,
      reason: "Platform mentioned in retrieved evidence.",
      confidence: 0.45,
    }));

    return {
      people: [],
      organizations: [],
      platforms,
      communities: [],
      memes,
      slang: [],
      relationships,
    };
  },
};

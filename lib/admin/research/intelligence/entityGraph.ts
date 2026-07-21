/**
 * Entity graph — extracts people, orgs, platforms, communities, memes, slang.
 * Mock heuristics from topic string only.
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

export const mockEntityGraphBuilder: EntityGraphBuilder = {
  build(input: ResearchInput, _evidence: Evidence[]) {
    const topic = input.topic;
    const platforms: Entity[] = [
      {
        id: "ent-platform-tiktok",
        name: "TikTok",
        kind: "platform",
        aliases: ["Douyin"],
        notes: "Mock default — confirm relevance for topic.",
      },
      {
        id: "ent-platform-youtube",
        name: "YouTube",
        kind: "platform",
        aliases: [],
      },
    ];

    const communities: Entity[] = [
      {
        id: "ent-community-generic",
        name: `${topic} discourse communities`,
        kind: "community",
        aliases: [],
        notes: "Placeholder community node — refine after research.",
      },
    ];

    const memes: Entity[] = [
      {
        id: `ent-meme-${slugify(topic)}`,
        name: topic,
        kind: "meme",
        aliases: [],
        catalogSlug: undefined,
        notes: "Treat as candidate meme/topic node until classification confirmed.",
      },
    ];

    const slang: Entity[] = [];
    const people: Entity[] = [];
    const organizations: Entity[] = [];

    const relationships: Relationship[] = [
      {
        id: "rel-topic-platform",
        kind: "spread_on",
        fromName: topic,
        toName: "TikTok",
        reason: "Mock: many culture topics in this era spread on TikTok — verify.",
        confidence: 0.4,
      },
    ];

    return {
      people,
      organizations,
      platforms,
      communities,
      memes,
      slang,
      relationships,
    };
  },
};

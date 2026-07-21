/**
 * Source collector — gathers candidate evidence stubs for a topic.
 * Mock only. No HTTP. No providers.
 */

import type { Evidence, ResearchInput, SourceCollector } from "./types";

function id(topic: string, n: number): string {
  return `ev-${topic.slice(0, 12).replace(/\s+/g, "-").toLowerCase()}-${n}`;
}

export const mockSourceCollector: SourceCollector = {
  collect(input: ResearchInput): Evidence[] {
    const t = input.topic;
    const seeds = input.seedSources ?? [];

    const base: Evidence[] = [
      {
        id: id(t, 1),
        claim: `${t} has documented coverage on Know Your Meme or equivalent culture encyclopedias.`,
        sourceTitle: "Know Your Meme (candidate)",
        sourceUrl: undefined,
        sourceCategory: "know_your_meme",
        tier: "Medium",
        notes: "Mock — replace with verified page URL after research.",
      },
      {
        id: id(t, 2),
        claim: `${t} appears in secondary press or culture reporting.`,
        sourceTitle: "Secondary press (candidate)",
        sourceCategory: "journalism",
        tier: "Medium",
      },
      {
        id: id(t, 3),
        claim: `Primary platform posts and community discussion shape the ${t} narrative.`,
        sourceTitle: "Primary platform discourse (candidate)",
        sourceCategory: "social_media",
        tier: "Low",
        notes: "Corroborate; do not treat screenshots alone as definitive.",
      },
    ];

    seeds.forEach((s, i) => {
      base.push({
        id: id(t, 10 + i),
        claim: `Seed source contributed by editor: ${s.title}`,
        sourceTitle: s.title,
        sourceUrl: s.url,
        sourceCategory: "unknown",
        tier: "Low",
      });
    });

    return base;
  },
};

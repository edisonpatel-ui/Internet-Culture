import type { BrainrotRanking } from "@/types";
import { trends } from "./trends";
import { memes } from "./memes";

export function getBrainrotRankings(): BrainrotRanking[] {
  const combined = [
    ...trends.map((t) => ({
      slug: t.slug,
      title: t.title,
      brainrotScore: t.scores.brainrot,
      category: t.category,
    })),
    ...memes
      .filter((m) => !trends.some((t) => t.slug === m.slug))
      .map((m) => ({
        slug: m.slug,
        title: m.title,
        brainrotScore: m.scores.brainrot,
        category: m.category as BrainrotRanking["category"],
      })),
  ];

  return combined
    .sort((a, b) => b.brainrotScore - a.brainrotScore)
    .map((item, index) => ({
      rank: index + 1,
      ...item,
    }));
}

export function getCringeRankings(): BrainrotRanking[] {
  return [...trends]
    .sort((a, b) => b.scores.cringe - a.scores.cringe)
    .map((item, index) => ({
      rank: index + 1,
      slug: item.slug,
      title: item.title,
      brainrotScore: item.scores.cringe,
      category: item.category,
    }));
}

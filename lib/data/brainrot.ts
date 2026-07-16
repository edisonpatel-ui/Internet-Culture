import type { BrainrotRanking, BaseEntry } from "@/types";
import { trends } from "./trends";
import { memes } from "./memes";
import { slangTerms } from "./slang";

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
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter(
      (s) => !trends.some((t) => t.slug === s.slug)
    ),
  ];

  return [...all]
    .sort((a, b) => b.scores.cringe - a.scores.cringe)
    .map((item, index) => ({
      rank: index + 1,
      slug: item.slug,
      title: item.title,
      brainrotScore: item.scores.cringe,
      category: item.category,
    }));
}

export function getPopularRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter((s) => !trends.some((t) => t.slug === s.slug)),
  ];

  return [...all]
    .sort((a, b) => b.views - a.views)
    .map((item, index) => ({
      rank: index + 1,
      slug: item.slug,
      title: item.title,
      brainrotScore: item.views,
      category: item.category,
    }));
}

export function getViralRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
  ];

  return all
    .filter((t) => t.trendDirection === "rising" || t.trendDirection === "new")
    .sort((a, b) => b.views - a.views)
    .map((item, index) => ({
      rank: index + 1,
      slug: item.slug,
      title: item.title,
      brainrotScore: Math.round((item.scores.relevance + item.scores.brainrot) / 2),
      category: item.category,
    }));
}

export function getNewestRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter((s) => !trends.some((t) => t.slug === s.slug)),
  ];

  return [...all]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .map((item, index) => ({
      rank: index + 1,
      slug: item.slug,
      title: item.title,
      brainrotScore: item.scores.relevance,
      category: item.category,
    }));
}

export function getHighBrainrotEntries(): BaseEntry[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
  ];

  return all
    .filter((t) => t.scores.brainrot >= 70)
    .sort((a, b) => b.scores.brainrot - a.scores.brainrot);
}

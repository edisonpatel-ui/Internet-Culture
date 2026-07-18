import type { BrainrotRanking, BaseEntry } from "@/types";
import { trends } from "./trends";
import { memes } from "./memes";
import { slangTerms } from "./slang";

function toRanking(
  item: BaseEntry,
  rank: number,
  brainrotScore: number,
): BrainrotRanking {
  return {
    rank,
    slug: item.slug,
    title: item.title,
    brainrotScore,
    category: item.category,
    imageGradient: item.imageGradient,
    imageUrl: item.imageUrl,
    media: item.media,
  };
}

export function getBrainrotRankings(): BrainrotRanking[] {
  const combined: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
  ];

  return combined
    .sort((a, b) => b.scores.brainrot - a.scores.brainrot)
    .map((item, index) => toRanking(item, index + 1, item.scores.brainrot));
}

export function getCringeRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter((s) => !trends.some((t) => t.slug === s.slug)),
  ];

  return [...all]
    .sort((a, b) => b.scores.cringe - a.scores.cringe)
    .map((item, index) => toRanking(item, index + 1, item.scores.cringe));
}

export function getPopularRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter((s) => !trends.some((t) => t.slug === s.slug)),
  ];

  return [...all]
    .sort((a, b) => b.views - a.views)
    .map((item, index) => toRanking(item, index + 1, item.views));
}

export function getViralRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
  ];

  return all
    .filter((t) => t.trendDirection === "rising" || t.trendDirection === "new")
    .sort((a, b) => b.views - a.views)
    .map((item, index) =>
      toRanking(
        item,
        index + 1,
        Math.round((item.scores.relevance + item.scores.brainrot) / 2),
      ),
    );
}

export function getNewestRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter((s) => !trends.some((t) => t.slug === s.slug)),
  ];

  return [...all]
    .sort(
      (a, b) =>
        new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
    )
    .map((item, index) => toRanking(item, index + 1, item.scores.relevance));
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

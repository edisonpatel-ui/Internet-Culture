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

  // Editorial relevance only — never catalog "views" (those are not analytics).
  return [...all]
    .sort((a, b) => b.scores.relevance - a.scores.relevance)
    .map((item, index) => toRanking(item, index + 1, item.scores.relevance));
}

export function getViralRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
  ];

  // Rising/new only — ranked by editorial relevance.
  return all
    .filter((t) => t.trendDirection === "rising" || t.trendDirection === "new")
    .sort((a, b) => b.scores.relevance - a.scores.relevance)
    .map((item, index) => toRanking(item, index + 1, item.scores.relevance));
}

export function getNewestRankings(): BrainrotRanking[] {
  const all: BaseEntry[] = [
    ...trends,
    ...memes.filter((m) => !trends.some((t) => t.slug === m.slug)),
    ...slangTerms.filter((s) => !trends.some((t) => t.slug === s.slug)),
  ];

  const now = Date.now();

  return [...all]
    .sort(
      (a, b) =>
        new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
    )
    .map((item, index) => {
      const daysAgo = Math.max(
        0,
        Math.floor(
          (now - new Date(item.addedAt).getTime()) / (1000 * 60 * 60 * 24),
        ),
      );
      return toRanking(item, index + 1, daysAgo);
    });
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

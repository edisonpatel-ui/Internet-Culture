import type { BrainrotRanking, BaseEntry } from "@/types";
import { sortByCurrentPopularity } from "@/lib/discovery/scoring";
import { getAllEntriesSync } from "@/lib/services/entries";

/** Full catalog, one row per slug (canonical entry wins first occurrence). */
function catalogEntries(): BaseEntry[] {
  const seen = new Set<string>();
  const out: BaseEntry[] = [];
  for (const entry of getAllEntriesSync()) {
    if (seen.has(entry.slug)) continue;
    seen.add(entry.slug);
    out.push(entry);
  }
  return out;
}

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
  return catalogEntries()
    .sort((a, b) => b.scores.brainrot - a.scores.brainrot)
    .map((item, index) => toRanking(item, index + 1, item.scores.brainrot));
}

export function getCringeRankings(): BrainrotRanking[] {
  return catalogEntries()
    .sort((a, b) => b.scores.cringe - a.scores.cringe)
    .map((item, index) => toRanking(item, index + 1, item.scores.cringe));
}

export function getInfluenceRankings(): BrainrotRanking[] {
  return catalogEntries()
    .sort((a, b) => b.scores.influence - a.scores.influence)
    .map((item, index) => toRanking(item, index + 1, item.scores.influence));
}

export function getPopularRankings(): BrainrotRanking[] {
  return sortByCurrentPopularity(catalogEntries()).map((item, index) =>
    toRanking(item, index + 1, item.scores.relevance),
  );
}

export function getViralRankings(): BrainrotRanking[] {
  return sortByCurrentPopularity(
    catalogEntries().filter(
      (t) => t.trendDirection === "rising" || t.trendDirection === "new",
    ),
  ).map((item, index) => toRanking(item, index + 1, item.scores.relevance));
}

export function getNewestRankings(): BrainrotRanking[] {
  const now = Date.now();
  return catalogEntries()
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
  return catalogEntries()
    .filter((t) => t.scores.brainrot >= 70)
    .sort((a, b) => b.scores.brainrot - a.scores.brainrot);
}

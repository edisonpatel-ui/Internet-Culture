import type { BaseEntry, BrainrotRanking } from "@/types";

// ── Entries unique to the trending index ─────────────────────────────────────
import sigmaGrindset from "./sigma-grindset";
import cleanGirlAesthetic from "./clean-girl-aesthetic";
import y2kRevival from "./y2k-revival";
import demureMindful from "./demure-mindful";
import looksmaxxing from "./looksmaxxing";
import mewing from "./mewing";
import girlDinner from "./girl-dinner";
import oldMoney from "./old-money";
import nothingBeatsAJet2Holiday from "./nothing-beats-a-jet2-holiday";

// ── Canonical entries from category folders ───────────────────────────────────
// These were previously duplicated as thin stubs in this folder.
// The canonical entry is now the single source of truth for both the
// category route (/memes/, /slang/, /events/) and the trending route.
import skibidiToilet from "../memes/skibidi-toilet";
import chickenJockey from "../memes/chicken-jockey";
import ohioFinalBoss from "../memes/ohio-final-boss";
import rizz from "../slang/rizz";
import gyatt from "../slang/gyatt";
import fanumTax from "../slang/fanum-tax";
import bratSummer from "../events/brat-summer";
import oneChipChallenge from "../events/one-chip-challenge";

export const trends: BaseEntry[] = [
  sigmaGrindset,
  skibidiToilet,
  demureMindful,
  bratSummer,
  looksmaxxing,
  mewing,
  ohioFinalBoss,
  girlDinner,
  fanumTax,
  rizz,
  gyatt,
  chickenJockey,
  oldMoney,
  oneChipChallenge,
  cleanGirlAesthetic,
  y2kRevival,
  nothingBeatsAJet2Holiday,
];

export function getTrendBySlug(slug: string): BaseEntry | undefined {
  return trends.find((t) => t.slug === slug);
}

export function getTrendingToday(): BaseEntry[] {
  return [...trends]
    .sort((a, b) => b.scores.relevance - a.scores.relevance)
    .slice(0, 6);
}

export function getRisingFastest(): BaseEntry[] {
  return trends
    .filter((t) => t.trendDirection === "rising")
    .sort((a, b) => b.views - a.views);
}

export function getDecliningTrends(): BaseEntry[] {
  return trends.filter((t) => t.trendDirection === "declining");
}

export function getNewTrends(): BaseEntry[] {
  return trends.filter((t) => t.trendDirection === "new");
}

export function getMostViewed(): BaseEntry[] {
  return [...trends].sort((a, b) => b.views - a.views);
}

export function getRecentlyAdded(): BaseEntry[] {
  return [...trends].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}

export function getPopularMemes(): BaseEntry[] {
  return trends
    .filter((t) => t.category === "meme")
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function getInternetSlang(): BaseEntry[] {
  return trends
    .filter((t) => t.category === "slang")
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function getBrainrotRankingsFromTrends(): BrainrotRanking[] {
  return [...trends]
    .sort((a, b) => b.scores.brainrot - a.scores.brainrot)
    .map((t, i) => ({
      rank: i + 1,
      slug: t.slug,
      title: t.title,
      brainrotScore: t.scores.brainrot,
      category: t.category,
      imageGradient: t.imageGradient,
      imageUrl: t.imageUrl,
      media: t.media,
    }));
}

export function getCringeRankings(): BaseEntry[] {
  return [...trends].sort((a, b) => b.scores.cringe - a.scores.cringe);
}

export function getFastestGrowing(): BaseEntry[] {
  return trends
    .filter((t) => t.trendDirection === "rising" || t.trendDirection === "new")
    .sort((a, b) => b.views - a.views);
}

export function getMostInfluential(): BaseEntry[] {
  return [...trends].sort(
    (a, b) => (b.scores.relevance * b.views) - (a.scores.relevance * a.views)
  );
}

export function getMostUnderrated(): BaseEntry[] {
  return [...trends]
    .filter((t) => t.scores.relevance >= 70 && t.views < 400000)
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function getTrendsByCategory(category: string): BaseEntry[] {
  return trends.filter((t) => t.category === category);
}

export function getAllSearchable(): BaseEntry[] {
  return trends;
}

export function getAllTrends(): BaseEntry[] {
  return trends;
}

export function getAllTrendSlugs(): string[] {
  return trends.map((t) => t.slug);
}

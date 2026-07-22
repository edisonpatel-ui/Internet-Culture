/**
 * Map DraftPackage → BaseEntry-shaped preview for public article components.
 * Preview-only — never written to lib/content.
 */

import type { DraftPackage, SuggestedMediaItem } from "@/lib/ai/packages";
import type { BaseEntry, MediaItem, MediaPlatform } from "@/types";
import { normalizeDraftPackage } from "./normalizeDraft";

function toMediaItem(item: SuggestedMediaItem): MediaItem | null {
  if (!item.url?.trim()) return null;
  const platform: MediaPlatform =
    item.url.includes("youtube.com") || item.url.includes("youtu.be")
      ? "youtube"
      : item.url.includes("wikimedia.org")
        ? "wikimedia"
        : "other";

  return {
    role: item.role,
    type: item.type,
    url: item.url,
    title: item.title,
    source: item.source ?? item.searchHint ?? "Suggested media",
    sourceUrl: item.url,
    platform,
    attribution: "AI-suggested — unverified",
    verified: false,
  };
}

/**
 * Build a BaseEntry used only for article preview rendering.
 */
export function draftPackageToPreviewEntry(draft: DraftPackage): BaseEntry {
  const pkg = normalizeDraftPackage(draft);
  const scores = pkg.suggestedCulturalScores;

  return {
    id: pkg.id,
    slug: pkg.slugSuggestion,
    title: pkg.title,
    category: pkg.category,
    description: pkg.summary,
    imageGradient: "from-zinc-800 via-zinc-900 to-black",
    scores: {
      relevance: scores.relevance ?? 50,
      influence: scores.influence ?? 45,
      brainrot: scores.brainrot ?? 30,
      cringe: scores.cringe ?? 25,
    },
    addedAt: new Date().toISOString().slice(0, 10),
    views: 0,
    trendDirection: "new",
    tags: pkg.tags,
    media: pkg.suggestedMedia
      .map(toMediaItem)
      .filter((m): m is MediaItem => m !== null),
    sources: pkg.suggestedSources.map((s) => ({
      title: s.title,
      url: s.url,
      domain: s.domain,
    })),
  };
}

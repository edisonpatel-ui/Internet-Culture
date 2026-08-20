import type { BaseEntry, DynamicMetadata, MediaItem, Scores, TrendDirection } from "@/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";
import { researchDynamicSignals } from "./researchDynamicSignals";
import {
  scoreDynamicMetadata,
  suggestScoresFromSignals,
  toDynamicMetadata,
  type DynamicScoreSuggestion,
} from "./scoreFromEvidence";
import { isRelevanceAmbiguous, llmRelevanceCheck } from "./llmRelevanceCheck";
import { applyDynamicMetadataPatch, applyMediaBackfillPatch } from "./applyPatch";
import { findWikimediaMediaSet } from "@/lib/ai/research/wikimediaMedia";
import type { ResearchMediaSuggestion } from "@/lib/ai/packages";

function toMediaItem(m: ResearchMediaSuggestion): MediaItem {
  const platform = /wikimedia/i.test(m.source ?? "")
    ? "wikimedia"
    : /youtube/i.test(m.source ?? "")
      ? "youtube"
      : /know\s*your\s*meme/i.test(m.source ?? "")
        ? "knowyourmeme"
        : "other";
  return {
    role: m.role === "reference" ? "supporting" : m.role,
    type: m.type ?? "image",
    url: m.url ?? "",
    title: m.title,
    source: m.source ?? "Unknown",
    sourceUrl: m.sourceUrl ?? m.url ?? "",
    platform,
    attribution: m.attribution,
    verified: false,
  };
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface ProposedProviderStatus {
  id: string;
  label: string;
  status: "ok" | "failed" | "no_data";
  note?: string;
}

export interface ProposedDynamicRefresh {
  slug: string;
  title: string;
  category: string;
  before: {
    scores: Scores;
    trendDirection: TrendDirection;
    dynamicMetadata?: DynamicMetadata;
  };
  after: {
    scores: Scores;
    trendDirection: TrendDirection;
    lastUpdated: string;
    dynamicMetadata: DynamicMetadata;
  };
  suggestion: DynamicScoreSuggestion;
  suggestionNotes: string[];
  usedCatalogFallback: boolean;
  /** Absolute relevance delta when both numeric. */
  relevanceDelta: number | null;
  trendingDelta: number | null;
  needsManualReview: boolean;
  reviewReasons: string[];
  /** Per-provider result for Maintenance Center progress UI. */
  providers: ProposedProviderStatus[];
  /**
   * Set only when this entry had NO media at all and a live search found a
   * candidate to backfill. Never set for an entry that already has any
   * media — existing media (verified or not) is never touched by Refresh.
   */
  mediaBackfill?: MediaItem[];
}

export interface RefreshDynamicMetadataResult {
  slug: string;
  filePath: string;
  scores: BaseEntry["scores"];
  trendDirection: BaseEntry["trendDirection"];
  dynamicMetadata: NonNullable<BaseEntry["dynamicMetadata"]>;
  suggestionNotes: string[];
  usedCatalogFallback: boolean;
}

/**
 * Research + score only — does not write files.
 * Used by Maintenance Center propose → review → apply.
 */
function providerStatusesFromBundle(
  bundle: Awaited<ReturnType<typeof researchDynamicSignals>>,
): ProposedProviderStatus[] {
  const byId = new Map<string, ProposedProviderStatus>();
  for (const id of bundle.providersAttempted) {
    byId.set(id, { id, label: id, status: "no_data" });
  }
  for (const obs of bundle.observations) {
    const prev = byId.get(obs.providerId) ?? {
      id: obs.providerId,
      label: obs.providerId,
      status: "no_data" as const,
    };
    const note = obs.note;
    const failed =
      typeof note === "string" && /provider error/i.test(note);
    if (failed) {
      byId.set(obs.providerId, {
        ...prev,
        status: "failed",
        note,
      });
    } else if (obs.value != null && prev.status !== "failed") {
      byId.set(obs.providerId, {
        ...prev,
        status: "ok",
        note: note ?? prev.note,
      });
    } else if (note && prev.status === "no_data") {
      byId.set(obs.providerId, { ...prev, note });
    }
  }
  return [...byId.values()];
}

export async function proposeDynamicMetadataForEntry(
  entry: BaseEntry,
): Promise<ProposedDynamicRefresh> {
  const bundle = await researchDynamicSignals(entry);
  const year = getEntryYear(entry);
  const ageYears =
    year != null ? Math.max(0, new Date().getFullYear() - year) : null;

  const suggestion = scoreDynamicMetadata(bundle, {
    ageYears,
    tags: entry.tags ?? [],
    previousScores: entry.scores,
  });

  // Only when the heuristic's corroboration is weak (fewer than 2 independent
  // signals agree) do we spend an LLM call double-checking Current Popularity.
  // Clear cases stay exactly as fast as before — nothing changes for them.
  if (
    typeof suggestion.relevance === "number" &&
    isRelevanceAmbiguous(suggestion.relevanceActivitySignals)
  ) {
    const llmCheck = await llmRelevanceCheck(entry, bundle, suggestion.relevance);
    if (llmCheck) {
      const heuristicScore = suggestion.relevance;
      const blended = Math.round((heuristicScore + llmCheck.score) / 2);
      suggestion.relevance = blended;
      suggestion.evidenceNotes = [
        ...suggestion.evidenceNotes,
        `Weak corroboration — blended heuristic (${heuristicScore}) with AI double-check (${llmCheck.score}): ${llmCheck.reasoning}`,
      ];
    }
  }

  const scores = suggestScoresFromSignals(entry.scores, suggestion);
  const lastReviewed = today();
  const dynamicMetadata = toDynamicMetadata(suggestion, lastReviewed);

  const relevanceUnknown = suggestion.relevance === "unknown";
  const trendingUnknown = suggestion.trendingScore === "unknown";

  const relevanceDelta = relevanceUnknown
    ? 0 - entry.scores.relevance
    : typeof suggestion.relevance === "number"
      ? suggestion.relevance - entry.scores.relevance
      : null;

  const beforeTrending =
    typeof entry.dynamicMetadata?.trendingScore === "number"
      ? entry.dynamicMetadata.trendingScore
      : entry.scores.relevance;
  const afterTrending =
    typeof suggestion.trendingScore === "number"
      ? suggestion.trendingScore
      : null;
  const trendingDelta = trendingUnknown
    ? null
    : afterTrending != null
      ? afterTrending - beforeTrending
      : null;

  const reviewReasons: string[] = [];
  if (relevanceUnknown) {
    reviewReasons.push(
      "Needs Editorial Review: Current Relevance Unknown — live evidence insufficient; stale high relevance cleared (set to 0); excluded from homepage Trending",
    );
  }
  if (trendingUnknown) {
    reviewReasons.push(
      "Needs Editorial Review: Trending score Unknown — excluded from homepage Trending until confident live evidence exists",
    );
  }
  if (relevanceDelta != null && !relevanceUnknown && Math.abs(relevanceDelta) >= 25) {
    reviewReasons.push(
      `Large relevance swing (${entry.scores.relevance} → ${suggestion.relevance})`,
    );
  }
  if (trendingDelta != null && Math.abs(trendingDelta) >= 30) {
    reviewReasons.push(
      `Large trending swing (${beforeTrending} → ${afterTrending})`,
    );
  }

  // Media backfill — ONLY for an entry with no media at all. An entry that
  // already has any media (verified or not) is left completely untouched;
  // "avoid unnecessary replacement when existing media is already good"
  // is handled here by never even attempting replacement, since Refresh has
  // no reliable way to judge whether existing media is "good enough" to
  // override a human's prior choice or an unverified item nobody has
  // rejected yet. This only fills a genuine gap.
  let mediaBackfill: MediaItem[] | undefined;
  if (!entry.media || entry.media.length === 0) {
    try {
      const found = await findWikimediaMediaSet(entry.title, entry.category);
      if (found.length > 0) {
        mediaBackfill = found.map(toMediaItem);
        reviewReasons.push(
          `Media backfilled from Wikimedia (entry had none) — unverified, needs a human look before it's treated as confirmed.`,
        );
      }
    } catch {
      // Best-effort — a failed media search should never block a scores refresh.
    }
  }

  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    before: {
      scores: { ...entry.scores },
      trendDirection: entry.trendDirection,
      dynamicMetadata: entry.dynamicMetadata
        ? { ...entry.dynamicMetadata }
        : undefined,
    },
    after: {
      scores,
      trendDirection: suggestion.trendDirection,
      lastUpdated: lastReviewed,
      dynamicMetadata,
    },
    suggestion,
    suggestionNotes: suggestion.evidenceNotes,
    usedCatalogFallback: suggestion.usedCatalogFallback,
    relevanceDelta,
    trendingDelta,
    needsManualReview: reviewReasons.length > 0,
    reviewReasons,
    providers: providerStatusesFromBundle(bundle),
    mediaBackfill,
  };
}

/**
 * Research dynamic signals and immediately patch the content file.
 * Prefer Maintenance Center propose/apply for bulk work.
 */
export async function refreshDynamicMetadataForEntry(
  entry: BaseEntry,
): Promise<RefreshDynamicMetadataResult> {
  const proposed = await proposeDynamicMetadataForEntry(entry);
  const { filePath } = applyDynamicMetadataPatch(entry, {
    scores: proposed.after.scores,
    trendDirection: proposed.after.trendDirection,
    lastUpdated: proposed.after.lastUpdated,
    dynamicMetadata: proposed.after.dynamicMetadata,
  });

  if (proposed.mediaBackfill && proposed.mediaBackfill.length > 0) {
    // Best-effort — a failed media write should not fail the whole refresh,
    // since scores/dynamicMetadata are already safely written above.
    try {
      applyMediaBackfillPatch(entry, proposed.mediaBackfill);
    } catch {
      // Leave entry.media unset; next refresh will simply try again.
    }
  }

  return {
    slug: entry.slug,
    filePath,
    scores: proposed.after.scores,
    trendDirection: proposed.after.trendDirection,
    dynamicMetadata: proposed.after.dynamicMetadata,
    suggestionNotes: proposed.suggestionNotes,
    usedCatalogFallback: proposed.usedCatalogFallback,
  };
}

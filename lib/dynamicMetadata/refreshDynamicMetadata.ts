import type { BaseEntry, DynamicMetadata, Scores, TrendDirection } from "@/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";
import { researchDynamicSignals } from "./researchDynamicSignals";
import {
  scoreDynamicMetadata,
  suggestScoresFromSignals,
  toDynamicMetadata,
  type DynamicScoreSuggestion,
} from "./scoreFromEvidence";
import { applyDynamicMetadataPatch } from "./applyPatch";

function today(): string {
  return new Date().toISOString().slice(0, 10);
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
  });

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

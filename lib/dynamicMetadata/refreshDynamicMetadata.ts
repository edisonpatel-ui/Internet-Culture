import type { BaseEntry } from "@/types";
import { getEntryYear } from "@/lib/intelligence/culturalScores";
import { researchDynamicSignals } from "./researchDynamicSignals";
import {
  scoreDynamicMetadata,
  suggestScoresFromSignals,
  toDynamicMetadata,
} from "./scoreFromEvidence";
import { applyDynamicMetadataPatch } from "./applyPatch";

export interface RefreshDynamicMetadataResult {
  slug: string;
  filePath: string;
  scores: BaseEntry["scores"];
  trendDirection: BaseEntry["trendDirection"];
  dynamicMetadata: NonNullable<BaseEntry["dynamicMetadata"]>;
  suggestionNotes: string[];
  /** True when live providers had no data and catalog/authority fallbacks were used. */
  usedCatalogFallback: boolean;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Research dynamic signals only (not full Knowledge Engine) and patch
 * relevance / cringe / brainrot + dynamicMetadata on the live entry file.
 *
 * Historical prose is never rewritten.
 */
export async function refreshDynamicMetadataForEntry(
  entry: BaseEntry,
): Promise<RefreshDynamicMetadataResult> {
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

  const { filePath } = applyDynamicMetadataPatch(entry, {
    scores,
    trendDirection: suggestion.trendDirection,
    lastUpdated: lastReviewed,
    dynamicMetadata,
  });

  return {
    slug: entry.slug,
    filePath,
    scores,
    trendDirection: suggestion.trendDirection,
    dynamicMetadata,
    suggestionNotes: suggestion.evidenceNotes,
    usedCatalogFallback: suggestion.usedCatalogFallback,
  };
}

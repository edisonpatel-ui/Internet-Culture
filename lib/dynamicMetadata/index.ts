/**
 * Dynamic metadata — time-varying encyclopedia fields.
 *
 * Static prose (definition, origin, timeline, references) is never rewritten
 * by this module. Only scores that change with culture + dynamicMetadata.
 */

export type {
  DynamicCurrentStatus,
  DynamicMetadata,
  DynamicScoreValue,
} from "@/types";

export {
  STATIC_ENTRY_FIELDS,
  DYNAMIC_ENTRY_FIELDS,
  isDynamicScoreKey,
  type DynamicScoreKey,
} from "./fieldSplit";

export type {
  DynamicSignalProvider,
  DynamicSignalObservation,
  DynamicSignalBundle,
  DynamicProviderId,
} from "./providers/types";

export {
  getDynamicSignalProviders,
  setDynamicSignalProviders,
  resetDynamicSignalProviders,
} from "./providers/registry";
export { isLiveEvidenceProvider } from "./providers/liveIds";

export { researchDynamicSignals } from "./researchDynamicSignals";
export {
  scoreDynamicMetadata,
  suggestScoresFromSignals,
  listRelevanceActivitySignals,
  DYNAMIC_SCORING_METHODOLOGY,
  type ScoreReasons,
  type RelevanceActivitySignal,
} from "./scoreFromEvidence";
export {
  refreshDynamicMetadataForEntry,
  proposeDynamicMetadataForEntry,
  type RefreshDynamicMetadataResult,
  type ProposedDynamicRefresh,
} from "./refreshDynamicMetadata";
export { applyDynamicMetadataPatch, applyMediaBackfillPatch } from "./applyPatch";
export { suggestDraftCulturalScores } from "./suggestDraftScores";

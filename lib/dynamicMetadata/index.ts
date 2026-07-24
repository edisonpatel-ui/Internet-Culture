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

export { researchDynamicSignals } from "./researchDynamicSignals";
export {
  scoreDynamicMetadata,
  suggestScoresFromSignals,
  DYNAMIC_SCORING_METHODOLOGY,
} from "./scoreFromEvidence";
export {
  refreshDynamicMetadataForEntry,
  type RefreshDynamicMetadataResult,
} from "./refreshDynamicMetadata";
export { applyDynamicMetadataPatch } from "./applyPatch";
export { suggestDraftCulturalScores } from "./suggestDraftScores";

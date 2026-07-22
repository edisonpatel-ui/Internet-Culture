/**
 * Completeness-first research exports.
 */

export type {
  ConclusionConfidence,
  ResearchConclusionNote,
  CompletenessSection,
  ResearchCompletenessReport,
} from "./completenessTypes";

export { COMPLETENESS_SECTIONS } from "./completenessTypes";
export { runCompletenessPipeline } from "./completenessPipeline";

export type {
  EditorialDecision,
  EditorialDecisionKind,
  EditorialDecisionOption,
  EditorialDecisionAction,
  EditorialDecisionOutcome,
} from "./editorialDecisions";

export {
  EDITORIAL_AUTO_ACCEPT_THRESHOLD,
  buildEditorialDecisions,
  decisionsNeedingEditorAction,
  autoAcceptedDecisions,
  formatConfidencePercent,
  isAutoAccepted,
  categoryLabel,
  allCategoryOptions,
  applyOriginChoice,
} from "./editorialDecisions";
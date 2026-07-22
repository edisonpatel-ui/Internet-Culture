/**
 * Completeness-first research exports.
 */

export type {
  ConclusionConfidence,
  ResearchConclusionNote,
  CompletenessSection,
  ResearchCompletenessReport,
  UndeterminedField,
} from "./completenessTypes";

export {
  COMPLETENESS_SECTIONS,
  REQUIRED_SECTIONS,
  REQUIRED_FOR_READY,
  OPTIONAL_SECTIONS,
  SECTION_LABELS,
  UNKNOWN_SENTINEL,
  isUnknownSentinel,
  isRequiredSection,
} from "./completenessTypes";
export { runCompletenessPipeline, looksFabricated } from "./completenessPipeline";

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

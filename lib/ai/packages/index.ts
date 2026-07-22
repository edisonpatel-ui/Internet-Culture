/**
 * Editorial packages — structured AI workflow payloads.
 *
 * Canonical stage spine:
 *   ResearchPackage → ApprovedResearch → DraftPackage → ApprovedDraft → Publish Prep
 */

export type {
  ResearchPackage,
  ResearchSourceRef,
  ResearchTimelineItem,
  ResearchChronologyItem,
  ResearchRelatedEntry,
  ResearchMediaSuggestion,
  ResearchPossibleIssue,
  ResearchSeoHints,
} from "./researchPackage";

export type {
  ApprovedResearch,
  ApprovedVerifiedSource,
  ApprovedResolvedIssue,
  CreateApprovedResearchInput,
} from "./approvedResearch";

export { createApprovedResearch } from "./approvedResearch";

export {
  researchReportToPackage,
  suggestCategoryFromReport,
  type ResearchReportToPackageOptions,
} from "./fromResearchReport";

export {
  runCompletenessPipeline,
  COMPLETENESS_SECTIONS,
  EDITORIAL_AUTO_ACCEPT_THRESHOLD,
  buildEditorialDecisions,
  decisionsNeedingEditorAction,
  autoAcceptedDecisions,
  formatConfidencePercent,
  type ConclusionConfidence,
  type ResearchConclusionNote,
  type CompletenessSection,
  type ResearchCompletenessReport,
  type EditorialDecision,
  type EditorialDecisionOutcome,
} from "../research";export type {
  DraftPackage,
  DraftSeoMetadata,
  DraftArticleSection,
  DraftFeedbackEntry,
  SuggestedCulturalScores,
  SuggestedMediaItem,
  SuggestedSourceItem,
} from "./draftPackage";

export type {
  ApprovedDraft,
  ApprovedDraftMediaDecision,
  CreateApprovedDraftInput,
} from "./approvedDraft";

export { createApprovedDraft } from "./approvedDraft";

export type {
  ReviewPackage,
  ReviewRecommendation,
  ReviewDimension,
  ReviewSeverity,
} from "./reviewPackage";

export type {
  SeoReviewPackage,
  SeoInternalLinkOpportunity,
} from "./seoPackage";

export type {
  UpdatePackage,
  ExistingArticleSnapshot,
} from "./updatePackage";

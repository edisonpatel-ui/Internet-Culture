/**
 * AI Editorial Platform (RC3-A … RC3-D) — provider-agnostic foundation.
 *
 * Status: architecture only. No SDKs, env vars, API routes, or public UI.
 * Importing this module has no runtime side effects on the site.
 *
 * Layout:
 * - `types.ts` — AIProvider + request/result contracts (RC3-A)
 * - `providers/` — OpenAI / Anthropic / Google / Mock placeholders (throw)
 * - `prompts/` — reusable prompt templates (strings only)
 * - `pipelines/` — thin pipeline stubs (RC3-A)
 * - `packages/` — Research / Draft / Review / SEO / Update payloads (RC3-B)
 * - `workflows/` — stage definitions + validation hooks (RC3-B)
 * - `editorialState.ts` — typed editorial state machine (RC3-B)
 * - `intelligence/` — research/evaluation reasoning framework (RC3-C)
 * - `knowledgeEngine/` — exhaust-all Knowledge Engine orchestrator
 * - `knowledge/` — encyclopedia knowledge assets (RC3-D ontology; not the KE)
 *
 * Related (separate):
 * - `lib/intelligence/` — live-site cultural scores / related recommendations
 * - `lib/intelligence/ai` — heuristic assistance envelopes
 * - `lib/integrations` — future `AiAssistProvider` port
 *
 * @see docs/AI_EDITORIAL_PLATFORM.md
 * @see docs/EDITORIAL_WORKFLOW.md
 * @see docs/EDITORIAL_INTELLIGENCE.md
 * @see docs/KNOWLEDGE_BASE.md
 */

export type {
  AIProvider,
  AIProviderId,
  AIDraftCategory,
  ResearchRequest,
  ResearchResult,
  DraftRequest,
  DraftResult,
  ReviewRequest,
  ReviewResult,
  ReviewFinding,
  SEORequest,
  SEOResult,
  PromptTemplate,
} from "./types";

export {
  OpenAIProvider,
  AnthropicProvider,
  GoogleProvider,
  MockProvider,
  notImplemented,
} from "./providers";

export {
  buildResearchPrompt,
  buildArticleDraftPrompt,
  buildEditorialReviewPrompt,
  buildSeoReviewPrompt,
  buildInternalLinkingPrompt,
  buildMediaSuggestionsPrompt,
  buildUpdateDetectionPrompt,
} from "./prompts";

export type {
  InternalLinkingPromptInput,
  MediaSuggestionsPromptInput,
  UpdateDetectionPromptInput,
} from "./prompts";

export {
  researchPipeline,
  draftPipeline,
  reviewPipeline,
} from "./pipelines";

export type {
  ResearchPackage,
  ResearchSourceRef,
  ResearchTimelineItem,
  ResearchChronologyItem,
  ResearchRelatedEntry,
  ResearchMediaSuggestion,
  ResearchPossibleIssue,
  ApprovedResearch,
  ApprovedVerifiedSource,
  ApprovedResolvedIssue,
  CreateApprovedResearchInput,
  DraftPackage,
  DraftSeoMetadata,
  SuggestedCulturalScores,
  SuggestedMediaItem,
  SuggestedSourceItem,
  ApprovedDraft,
  ApprovedDraftMediaDecision,
  CreateApprovedDraftInput,
  ReviewPackage,
  ReviewRecommendation,
  ReviewDimension,
  ReviewSeverity,
  SeoReviewPackage,
  SeoInternalLinkOpportunity,
  UpdatePackage,
  ExistingArticleSnapshot,
} from "./packages";

export {
  createApprovedResearch,
  createApprovedDraft,
  researchReportToPackage,
  suggestCategoryFromReport,
} from "./packages";

export {
  EDITORIAL_TRANSITIONS,
  canTransition,
  transition,
  isTerminalState,
  isPrePublishState,
  createEditorialJob,
  advanceEditorialJob,
  type EditorialState,
  type EditorialJob,
} from "./editorialState";

export {
  researchWorkflowMeta,
  researchWorkflowNextStage,
  validateResearchWorkflowInput,
  validateResearchPackage,
  validateResearchPackageReadyForDraft,
  runResearchWorkflow,
  draftWorkflowMeta,
  draftWorkflowNextStage,
  validateDraftWorkflowInput,
  validateDraftPackage,
  runDraftWorkflow,
  reviewWorkflowMeta,
  reviewWorkflowNextStage,
  validateReviewWorkflowInput,
  validateReviewPackage,
  runReviewWorkflow,
  seoWorkflowMeta,
  seoWorkflowNextStage,
  validateSeoWorkflowInput,
  validateSeoReviewPackage,
  runSeoWorkflow,
  updateWorkflowMeta,
  updateWorkflowNextStage,
  validateUpdateWorkflowInput,
  validateUpdatePackage,
  runUpdateWorkflow,
  type WorkflowDefinitionMeta,
  type WorkflowValidationIssue,
  type WorkflowValidationResult,
  type ResearchWorkflowInput,
  type ResearchWorkflowOutput,
  type DraftWorkflowInput,
  type DraftWorkflowOutput,
  type ReviewWorkflowInput,
  type ReviewWorkflowOutput,
  type SeoWorkflowInput,
  type SeoWorkflowOutput,
  type UpdateWorkflowInput,
  type UpdateWorkflowOutput,
} from "./workflows";

export * from "./intelligence";

export * from "./knowledge";

export {
  runKnowledgeEngine,
  KNOWLEDGE_ENGINE_STAGES,
  type KnowledgeEngineInput,
  type KnowledgeEngineOutput,
  type KnowledgeEngineRunMeta,
} from "./knowledgeEngine";

/**
 * Internal editorial workflows (RC3-B) — definitions only; no provider calls.
 */

export type {
  WorkflowDefinitionMeta,
  WorkflowValidationIssue,
  WorkflowValidationResult,
} from "./workflowTypes";

export {
  researchWorkflowMeta,
  researchWorkflowNextStage,
  validateResearchWorkflowInput,
  validateResearchPackage,
  validateResearchPackageReadyForDraft,
  runResearchWorkflow,
  type ResearchWorkflowInput,
  type ResearchWorkflowOutput,
} from "./researchWorkflow";

export {
  draftWorkflowMeta,
  draftWorkflowNextStage,
  validateDraftWorkflowInput,
  validateDraftPackage,
  runDraftWorkflow,
  type DraftWorkflowInput,
  type DraftWorkflowOutput,
} from "./draftWorkflow";

export {
  reviewWorkflowMeta,
  reviewWorkflowNextStage,
  validateReviewWorkflowInput,
  validateReviewPackage,
  runReviewWorkflow,
  type ReviewWorkflowInput,
  type ReviewWorkflowOutput,
} from "./reviewWorkflow";

export {
  seoWorkflowMeta,
  seoWorkflowNextStage,
  validateSeoWorkflowInput,
  validateSeoReviewPackage,
  runSeoWorkflow,
  type SeoWorkflowInput,
  type SeoWorkflowOutput,
} from "./seoWorkflow";

export {
  updateWorkflowMeta,
  updateWorkflowNextStage,
  validateUpdateWorkflowInput,
  validateUpdatePackage,
  runUpdateWorkflow,
  type UpdateWorkflowInput,
  type UpdateWorkflowOutput,
} from "./updateWorkflow";

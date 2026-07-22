/**
 * Knowledge Engine public API.
 */

export {
  KNOWLEDGE_ENGINE_STAGES,
  allStagesAttempted,
  emptyStageAttempts,
  markStage,
  type KnowledgeEngineStageId,
  type KnowledgeEngineStageAttempt,
  type KnowledgeEngineRunMeta,
} from "./stages";

export {
  runKnowledgeEngine,
  type KnowledgeEngineInput,
  type KnowledgeEngineOutput,
} from "./runKnowledgeEngine";

export {
  discoverTrustedSources,
  categoryHintFromGuidance,
  summaryFromEditorGuidance,
  extractUrlsFromText,
  type TrustedSourceCandidate,
} from "./trustedSourceDiscovery";

export {
  parseEditorInstructions,
  isEditorInstruction,
  extractDefinitionalClaim,
  topicHintFromInstruction,
  preferredSourceUrls,
  stripInstructionFromProse,
  type ResearchDirectives,
  type PreferredSourceFamily,
  type ResearchFocus,
  type RevisionIntent,
  type RevisionIntentKind,
} from "./parseEditorInstructions";

export {
  runInitialAssessment,
  type TopicAssessment,
  type AssessmentCheck,
  type InitialAssessmentInput,
} from "./initialAssessment";

export {
  saveAssessment,
  loadAssessment,
  listAssessments,
} from "./assessmentStore";

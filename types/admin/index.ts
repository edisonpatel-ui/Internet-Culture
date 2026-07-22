/**
 * Admin-facing types — internal Editorial OS only.
 *
 * Canonical stage artifacts live under lib/ai/packages:
 * ResearchPackage → ApprovedResearch → DraftPackage → ApprovedDraft
 */

export type {
  ResearchSession,
  ResearchSessionStatus,
  ResearchPriority,
  ResearchActionStatus,
  ResearchRecommendationResolution,
  ResearchSource,
  ResearchTimelineItem,
  ResearchEntity,
  ResearchRelationship,
  ResearchInternalLink,
  ResearchConfidenceEntry,
  ResearchActivityEntry,
  ResearchAiSuggestionStub,
  ResearchAiIntegrationPointId,
  CreateResearchSessionInput,
  UpdateResearchSessionInput,
  ResearchSessionValidationIssue,
  ResearchSessionValidationResult,
} from "./research";

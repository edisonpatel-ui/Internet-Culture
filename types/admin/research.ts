/**
 * Admin Research Workspace types (RC4-B).
 * Internal only — not used by the public encyclopedia UI.
 */

import type { EditorialState } from "@/lib/ai/editorialState";
import type { FactConfidenceLabel } from "@/lib/ai/intelligence/factConfidence";
import type { SourceCategory } from "@/lib/ai/intelligence/sourceEvaluation";

/** Session lifecycle for research workspace (subset + archive). */
export type ResearchSessionStatus =
  | "active"
  | "paused"
  | "ready_for_draft"
  | "archived";

export type ResearchPriority = "low" | "medium" | "high" | "critical";

export interface ResearchSource {
  id: string;
  title: string;
  url?: string;
  category: SourceCategory;
  notes?: string;
}

export interface ResearchTimelineItem {
  id: string;
  date: string;
  precision: "day" | "month" | "year" | "approx" | "unknown";
  description: string;
  confidence: number;
}

export interface ResearchEntity {
  id: string;
  name: string;
  kind: string;
  aliases: string[];
}

export interface ResearchRelationship {
  id: string;
  kind: string;
  targetTitle: string;
  targetSlug?: string;
  reason: string;
}

export interface ResearchInternalLink {
  id: string;
  kind: "related_article" | "missing_article" | "hub_page" | "creator_page" | "platform_page";
  label: string;
  target?: string;
  reason: string;
}

export interface ResearchConfidenceEntry {
  id: string;
  claim: string;
  label: FactConfidenceLabel;
  notes?: string;
}

export interface ResearchActivityEntry {
  id: string;
  at: string;
  actor: string;
  message: string;
}

export interface ResearchAiSuggestionStub {
  id: string;
  assistant: string;
  summary: string;
  /** Always true until a human applies anything. */
  requiresHumanReview: true;
  /** RC3 integration point id — not invoked in RC4-B. */
  integrationPoint: ResearchAiIntegrationPointId;
}

/**
 * Where RC3 workflows will plug in later (interfaces only in services).
 */
export type ResearchAiIntegrationPointId =
  | "research"
  | "evidence_scoring"
  | "entity_extraction"
  | "timeline_building"
  | "relationship_discovery"
  | "internal_links"
  | "gap_detection";

/**
 * A research session = one future encyclopedia article under investigation.
 */
export interface ResearchSession {
  id: string;
  topic: string;
  status: ResearchSessionStatus;
  createdAt: string;
  updatedAt: string;
  notes: string;
  tags: string[];
  priority: ResearchPriority;
  /** Future assignee — unused in RC4-B. */
  assignedTo?: string;
  /** Maps to RC3-B editorial state machine. */
  workflowStage: EditorialState;
  sources: ResearchSource[];
  timeline: ResearchTimelineItem[];
  entities: ResearchEntity[];
  relationships: ResearchRelationship[];
  internalLinks: ResearchInternalLink[];
  confidence: ResearchConfidenceEntry[];
  coverageNotes: string[];
  aiSuggestions: ResearchAiSuggestionStub[];
  activityLog: ResearchActivityEntry[];
}

export interface CreateResearchSessionInput {
  topic: string;
  notes?: string;
  tags?: string[];
  priority?: ResearchPriority;
  assignedTo?: string;
}

export interface UpdateResearchSessionInput {
  topic?: string;
  status?: ResearchSessionStatus;
  notes?: string;
  tags?: string[];
  priority?: ResearchPriority;
  assignedTo?: string | null;
  workflowStage?: EditorialState;
  sources?: ResearchSource[];
  timeline?: ResearchTimelineItem[];
  entities?: ResearchEntity[];
  relationships?: ResearchRelationship[];
  internalLinks?: ResearchInternalLink[];
  confidence?: ResearchConfidenceEntry[];
  coverageNotes?: string[];
  aiSuggestions?: ResearchAiSuggestionStub[];
}

export interface ResearchSessionValidationIssue {
  code: string;
  message: string;
  field?: string;
}

export interface ResearchSessionValidationResult {
  ok: boolean;
  issues: ResearchSessionValidationIssue[];
}

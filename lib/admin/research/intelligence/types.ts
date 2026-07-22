/**
 * Research Intelligence Engine — shared types (RC4-C).
 *
 * Provider-agnostic structures for transforming research into editorial knowledge.
 * Not article generators. Not UI. Not wired to App Router.
 */

import type { FactConfidenceLabel } from "@/lib/ai/intelligence/factConfidence";
import type { SourceCategory } from "@/lib/ai/intelligence/sourceEvaluation";
import type { EvidenceTier } from "@/lib/ai/intelligence/evidenceScoring";

// ─── Core building blocks ────────────────────────────────────────────────────

export interface ResearchInput {
  /** Working topic title. */
  topic: string;
  /** Optional session id from Research Workspace. */
  sessionId?: string;
  /**
   * Internal research notes / directives only.
   * Must NEVER contain raw editor instructions used as prose seeds.
   */
  notes?: string;
  /**
   * Explicit definitional claim from the editor (fact), if any.
   * Instructions like "Use Merriam-Webster to define X" must not appear here.
   */
  definitionalClaim?: string;
  /** Seed source URLs or titles. */
  seedSources?: Array<{ title: string; url?: string }>;
  /** Tags for routing (meme, slang, event, …). */
  tags?: string[];
  /** Grounded summary from a live ICH encyclopedia entry, when matched. */
  catalogSummary?: string;
}

export interface Evidence {
  id: string;
  claim: string;
  sourceTitle: string;
  sourceUrl?: string;
  sourceCategory: SourceCategory;
  tier: EvidenceTier;
  notes?: string;
}

export interface EvidenceGroup {
  id: string;
  label: string;
  /** Theme for the group (origin, spread, identity, …). */
  theme: string;
  evidence: Evidence[];
}

export interface Entity {
  id: string;
  name: string;
  kind:
    | "person"
    | "organization"
    | "platform"
    | "community"
    | "meme"
    | "slang"
    | "event"
    | "other";
  aliases: string[];
  notes?: string;
  catalogSlug?: string;
}

export interface Relationship {
  id: string;
  kind: string;
  fromName: string;
  toName: string;
  toSlug?: string;
  reason: string;
  confidence: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  precision: "day" | "month" | "year" | "approx" | "unknown" | "range";
  description: string;
  confidence: number;
  importance: "critical" | "major" | "minor" | "context";
  sources?: string[];
}

export interface KnowledgeGap {
  id: string;
  title: string;
  reason: string;
  suggestedSlug?: string;
  suggestedCategory?: string;
  priority: "low" | "medium" | "high";
}

export interface CoverageReport {
  /** Whether a live encyclopedia entry likely exists. */
  existingEntrySlug?: string;
  existingEntryTitle?: string;
  coverageLevel: "none" | "thin" | "adequate" | "strong";
  strengths: string[];
  weaknesses: string[];
  gaps: KnowledgeGap[];
  relatedCatalogSlugs: string[];
}

export interface ConfidenceAssessment {
  claim: string;
  label: FactConfidenceLabel;
  /** 0–1 optional numeric hint. */
  score?: number;
  reasons: string[];
}

export interface ResearchRecommendation {
  id: string;
  area:
    | "editorial"
    | "seo"
    | "media"
    | "sources"
    | "structure"
    | "linking"
    | "coverage";
  severity: "info" | "improve" | "critical";
  recommendation: string;
  rationale?: string;
}

/** Conflicting claims preserved for human resolution. */
export interface ConflictingClaim {
  id: string;
  summary: string;
  claims: string[];
  editorGuidance: string;
}

export interface MediaSuggestionStub {
  id: string;
  role: "featured" | "supporting" | "video" | "reference";
  title: string;
  searchHint: string;
  /** Always false for intelligence suggestions. */
  verified: false;
}

// ─── Research Report ─────────────────────────────────────────────────────────

/**
 * Full structured research report — internal engine artifact.
 * Canonical review product is ResearchPackage (via researchReportToPackage).
 * Humans approve packages as ApprovedResearch; never auto-publish.
 */
export interface ResearchReport {
  id: string;
  topic: string;
  generatedAt: string;
  /** Always true — intelligence output is advisory. */
  /**
   * True when a human judgment pass is still recommended.
   * Completeness-first pipeline sets false when AI finished its work;
   * editors may still approve / correct before drafting.
   */
  requiresHumanReview: boolean;

  executiveSummary: string;
  topicOverview: string;
  historicalContext: string;

  timeline: TimelineEvent[];
  importantEvents: TimelineEvent[];

  people: Entity[];
  organizations: Entity[];
  platforms: Entity[];
  communities: Entity[];
  memes: Entity[];
  slang: Entity[];

  /** Discovered relationships between entities / catalog candidates. */
  relationships: Relationship[];

  relatedEntries: Array<{ slug?: string; title: string; reason: string }>;
  potentialMissingEntries: KnowledgeGap[];

  evidenceMatrix: EvidenceGroup[];
  conflictingClaims: ConflictingClaim[];
  confidenceLevels: ConfidenceAssessment[];

  coverageAssessment: CoverageReport;
  researchNotes: string[];

  editorialRecommendations: ResearchRecommendation[];
  seoRecommendations: ResearchRecommendation[];
  futureMediaSuggestions: MediaSuggestionStub[];
}

export interface ResearchOutput {
  report: ResearchReport;
  /** Opaque notes for tooling / future provider traces. */
  meta: {
    engine: "admin-research-intelligence";
    version: "rc4-c";
    mock: boolean;
  };
}

// ─── Module ports (implementations are mock in RC4-C) ────────────────────────

export interface SourceCollector {
  collect(input: ResearchInput): Evidence[];
}

export interface ResearchOrganizer {
  organize(input: ResearchInput, evidence: Evidence[]): EvidenceGroup[];
}

export interface EvidenceMatrixBuilder {
  build(groups: EvidenceGroup[]): EvidenceGroup[];
}

export interface EntityGraphBuilder {
  build(input: ResearchInput, evidence: Evidence[]): {
    people: Entity[];
    organizations: Entity[];
    platforms: Entity[];
    communities: Entity[];
    memes: Entity[];
    slang: Entity[];
    relationships: Relationship[];
  };
}

export interface TimelineAnalyzer {
  analyze(input: ResearchInput, evidence: Evidence[]): {
    timeline: TimelineEvent[];
    importantEvents: TimelineEvent[];
  };
}

export interface RelationshipAnalyzer {
  analyze(
    entities: Entity[],
    input: ResearchInput,
  ): Relationship[];
}

export interface CoverageAnalyzer {
  analyze(input: ResearchInput, entities: Entity[]): CoverageReport;
}

export interface KnowledgeSummarizer {
  summarize(input: ResearchInput, evidence: Evidence[]): {
    executiveSummary: string;
    topicOverview: string;
    historicalContext: string;
    researchNotes: string[];
  };
}

export interface ConfidenceEngine {
  assess(evidence: Evidence[]): ConfidenceAssessment[];
}

export interface ResearchReportBuilder {
  build(input: ResearchInput): ResearchOutput;
}

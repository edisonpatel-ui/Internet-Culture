/**
 * ResearchPackage — canonical AI research output.
 *
 * Produced by the research engine after completeness-first self-improvement.
 * Reviewed into ApprovedResearch; never written to lib/content.
 *
 * Philosophy: deliver the most complete research possible before an editor
 * sees it. Confidence notes are internal; only material low-confidence
 * decisions escalate.
 */

import type { AIDraftCategory } from "../types";
import type {
  ResearchCompletenessReport,
  ResearchConclusionNote,
} from "../research/completenessTypes";
import type { EditorialDecision } from "../research/editorialDecisions";

export interface ResearchSourceRef {
  id?: string;
  title: string;
  url?: string;
  /** primary = preferred citation; secondary = supporting / background */
  tier: "primary" | "secondary";
  notes?: string;
}

export interface ResearchTimelineItem {
  /** Free-form date label (year, month, or approximate). */
  when: string;
  what: string;
  confidence?: number;
}

export interface ResearchRelatedEntry {
  title: string;
  slug?: string;
  reason?: string;
}

/** Media suggestion — always unverified until human confirms. */
export interface ResearchMediaSuggestion {
  id?: string;
  role: "featured" | "supporting" | "video" | "reference";
  type?: "image" | "gif" | "video" | "embed";
  title: string;
  url?: string;
  searchHint?: string;
  verified: false;
}

export interface ResearchPossibleIssue {
  id: string;
  title: string;
  description?: string;
  severity?: "info" | "improve" | "critical";
  area?: string;
}

/** SEO hints produced during research completeness passes. */
export interface ResearchSeoHints {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
}

/**
 * Canonical research package for Research Review / draft grounding.
 */
export interface ResearchPackage {
  id: string;
  title: string;
  topic: string;
  categoryRecommendation: AIDraftCategory;
  categoryReasoning: string;
  /** Suggested public URL slug. */
  slugSuggestion?: string;
  summary: string;
  origin: string;
  timeline: ResearchTimelineItem[];
  culturalImpact: string;
  relatedEntries: ResearchRelatedEntry[];
  sources: ResearchSourceRef[];
  mediaSuggestions: ResearchMediaSuggestion[];
  /**
   * @deprecated Prefer editorialDecisions. Kept for compatibility.
   */
  possibleIssues: ResearchPossibleIssue[];
  platforms: string[];
  notableMoments: string[];
  aliases: string[];
  /** 0–1 editorial confidence in the package as a whole. */
  confidence: number;
  /** Internal per-conclusion confidence (not primary UI). */
  conclusionNotes?: ResearchConclusionNote[];
  /**
   * Structured editorial decisions for Research Review.
   * High-confidence items are autoAccepted; only ambiguous ones need clicks.
   */
  editorialDecisions?: EditorialDecision[];
  /** Completeness checklist after self-improvement passes. */
  completeness?: ResearchCompletenessReport;
  seoHints?: ResearchSeoHints;
  conflictingInformation: string[];
  missingInformation: string[];
  researchNotes: string[];
  /** What this topic is NOT (misclassification traps). */
  notThis: string[];
}

/** @deprecated Use ResearchTimelineItem. */
export type ResearchChronologyItem = ResearchTimelineItem;

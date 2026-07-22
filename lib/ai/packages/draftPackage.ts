/**
 * DraftPackage — canonical AI-generated encyclopedia article.
 *
 * Structured fields power preview + publish prep.
 * articleSections are the visitor-facing body of the article.
 * Never written directly to lib/content.
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage } from "./researchPackage";

export interface SuggestedCulturalScores {
  relevance?: number;
  influence?: number;
  cringe?: number;
  brainrot?: number;
}

export interface SuggestedMediaItem {
  role: "featured" | "supporting" | "video" | "reference";
  type: "image" | "gif" | "video" | "embed";
  url?: string;
  title: string;
  source?: string;
  searchHint?: string;
  verified: false;
}

export interface SuggestedSourceItem {
  title: string;
  url?: string;
  domain?: string;
}

export interface DraftSeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
}

/** Visitor-facing article section (preview reads like a published page). */
export interface DraftArticleSection {
  id: string;
  heading: string;
  body: string;
}

/** One editor feedback → AI revision cycle. */
export interface DraftFeedbackEntry {
  id: string;
  at: string;
  feedback: string;
  changeSummary: string;
}

/**
 * Complete encyclopedia article proposal.
 */
export interface DraftPackage {
  id: string;
  approvedResearchId?: string;
  title: string;
  slugSuggestion: string;
  category: AIDraftCategory;
  /** Short card / hero description. */
  summary: string;
  /** Lead paragraph shown under the title (visitor-facing). */
  lead: string;
  /** Ordered article body for preview. */
  articleSections: DraftArticleSection[];
  origin: string;
  history: string;
  timeline: Array<{ date: string; event: string }>;
  examples: string[];
  culturalSignificance: string;
  legacy: string;
  relatedTopics: string[];
  aliases: string[];
  tags: string[];
  categoryFields: Record<string, string>;
  suggestedCulturalScores: SuggestedCulturalScores;
  suggestedMedia: SuggestedMediaItem[];
  suggestedSources: SuggestedSourceItem[];
  seoMetadata?: DraftSeoMetadata;
  groundedOnResearch?: ResearchPackage;
  /** Writing direction from research approval (not the feedback loop). */
  editorNotes: string[];
  /** Natural-language feedback revision history. */
  feedbackHistory: DraftFeedbackEntry[];
  /** Number of AI revision cycles applied. */
  revision: number;
}

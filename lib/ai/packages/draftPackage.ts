/**
 * Draft package — structured encyclopedia field proposals (RC3-B).
 *
 * Structured data only — not finished markdown and not a content file.
 * Human editors map approved fields into `lib/content/` templates.
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage } from "./researchPackage";

/** Suggested cultural scores — editorial estimates, never auto-applied. */
export interface SuggestedCulturalScores {
  relevance?: number;
  influence?: number;
  cringe?: number;
  brainrot?: number;
}

/** Media suggestion stub — always treated as unverified until human confirms. */
export interface SuggestedMediaItem {
  role: "featured" | "supporting" | "video" | "reference";
  type: "image" | "gif" | "video" | "embed";
  /** May be empty — search hint only when URL unknown. */
  url?: string;
  title: string;
  source?: string;
  searchHint?: string;
  /** Always false for AI suggestions. */
  verified: false;
}

export interface SuggestedSourceItem {
  title: string;
  url?: string;
  domain?: string;
}

/**
 * Structured draft package — every encyclopedia field exposed separately.
 */
export interface DraftPackage {
  title: string;
  slugSuggestion: string;
  category: AIDraftCategory;
  /** Short card / hero description. */
  summary: string;
  origin: string;
  history: string;
  /** Timeline rows as structured pairs (not rendered markdown). */
  timeline: Array<{ date: string; event: string }>;
  examples: string[];
  culturalSignificance: string;
  legacy: string;
  relatedTopics: string[];
  aliases: string[];
  tags: string[];
  /** Category-specific extras (definition, impact, platforms, etc.). */
  categoryFields: Record<string, string>;
  suggestedCulturalScores: SuggestedCulturalScores;
  suggestedMedia: SuggestedMediaItem[];
  suggestedSources: SuggestedSourceItem[];
  /** Research package this draft was grounded on, if any. */
  groundedOnResearch?: ResearchPackage;
  editorNotes: string[];
}

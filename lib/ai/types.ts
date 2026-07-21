/**
 * AI Editorial Platform — shared types (RC3-A).
 *
 * Provider-agnostic contracts for future research → draft → review → SEO
 * workflows. Nothing here is wired to public pages, API routes, or SDKs.
 *
 * Distinct from `lib/intelligence/ai` (heuristic assistance envelopes) and
 * `lib/integrations` (`AiAssistProvider` stub). This module is the editorial
 * LLM platform foundation; those remain separate ports until a deliberate
 * wiring phase.
 */

import type { ContentCategory } from "@/types";

/** Supported vendor ids for placeholder providers. */
export type AIProviderId = "openai" | "anthropic" | "google" | "mock";

/** Encyclopedia category targets for drafts (matches ContentCategory). */
export type AIDraftCategory = ContentCategory;

/**
 * Provider-agnostic LLM port for editorial pipelines.
 * Implementations must never auto-write to `lib/content/`.
 */
export interface AIProvider {
  readonly id: AIProviderId;
  readonly label: string;

  research(request: ResearchRequest): Promise<ResearchResult>;
  draft(request: DraftRequest): Promise<DraftResult>;
  review(request: ReviewRequest): Promise<ReviewResult>;
  seo(request: SEORequest): Promise<SEOResult>;
}

// ─── Research ────────────────────────────────────────────────────────────────

export interface ResearchRequest {
  /** Topic title or working name. */
  topic: string;
  /** Preferred category hint, if known. */
  categoryHint?: AIDraftCategory;
  /** Optional notes from an editor. */
  notes?: string;
  /** Known source URLs to prioritize. */
  seedUrls?: string[];
}

export interface ResearchResult {
  topic: string;
  /** One-sentence identity. */
  definition: string;
  /** Platform / year / community — only when supportable. */
  originSummary: string;
  /** What this is NOT (misclassification traps). */
  notThis: string[];
  /** Candidate sources (title + url). */
  candidateSources: Array<{ title: string; url: string; notes?: string }>;
  /** Open questions for a human editor. */
  openQuestions: string[];
  /** Model confidence 0–1 (editorial hint only). */
  confidence: number;
}

// ─── Draft ───────────────────────────────────────────────────────────────────

export interface DraftRequest {
  topic: string;
  category: AIDraftCategory;
  /** Research output or editor brief. */
  brief: string;
  /** Optional research payload to ground the draft. */
  research?: ResearchResult;
  /** Existing related slugs to consider. */
  relatedSlugHints?: string[];
}

export interface DraftResult {
  title: string;
  slugSuggestion: string;
  category: AIDraftCategory;
  description: string;
  /** Category-specific body fields as plain prose maps. */
  fields: Record<string, string>;
  /** Suggested related slugs (unchecked). */
  relatedSlugSuggestions: string[];
  /** Suggested source titles/urls (unchecked). */
  sourceSuggestions: Array<{ title: string; url?: string }>;
  notes: string[];
}

// ─── Editorial review ────────────────────────────────────────────────────────

export interface ReviewRequest {
  slug?: string;
  title: string;
  category: AIDraftCategory;
  /** Full or partial article prose for review. */
  prose: string;
  /** Optional structured fields (origin, definition, etc.). */
  fields?: Record<string, string>;
}

export interface ReviewFinding {
  severity: "info" | "improve" | "critical";
  dimension:
    | "accuracy"
    | "sources"
    | "prose"
    | "structure"
    | "classification"
    | "tone";
  message: string;
}

export interface ReviewResult {
  overall: "strong" | "improve" | "weak";
  findings: ReviewFinding[];
  summary: string;
  /** Always true by product policy. */
  requiresHumanReview: true;
}

// ─── SEO review ──────────────────────────────────────────────────────────────

export interface SEORequest {
  title: string;
  slug: string;
  category: AIDraftCategory;
  description: string;
  /** Optional H1 / lead excerpt. */
  lead?: string;
}

export interface SEOResult {
  titleFeedback: string;
  descriptionFeedback: string;
  slugFeedback: string;
  /** Suggested meta description (human must approve). */
  suggestedDescription?: string;
  keywordNotes: string[];
  risks: string[];
}

// ─── Prompt template inputs (prompts/ only — not provider methods yet) ─────

export interface PromptTemplate {
  /** Stable id for logging / future telemetry. */
  id: string;
  /** Human label. */
  label: string;
  /** System / role instruction. */
  system: string;
  /** User message body with placeholders already filled. */
  user: string;
}

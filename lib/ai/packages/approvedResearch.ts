/**
 * ApprovedResearch — complete AI research after human judgment.
 *
 * Stage contract:
 *   ResearchPackage (completeness-first) → (human judgment) → ApprovedResearch → DraftPackage
 *
 * Editors correct mistakes and escalate decisions — they do not finish AI homework.
 * - editorNotes = writing direction / reminders
 * - resolvedIssues = material escalations the editor settled
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage, ResearchSourceRef } from "./researchPackage";

/** A source the editor marked verified during research review. */
export interface ApprovedVerifiedSource {
  /** Matches ResearchSourceRef.id when present; otherwise title/url key. */
  sourceId?: string;
  title: string;
  url?: string;
  tier?: ResearchSourceRef["tier"];
  /** Optional verification note (not an editorial writing note). */
  verificationNote?: string;
}

/** A research issue the editor resolved during review. */
export interface ApprovedResolvedIssue {
  issueId: string;
  title: string;
  /** How the research correction was made. */
  resolutionNote: string;
  resolvedAt: string;
}

/**
 * Human-approved research ready for AI draft generation (future).
 */
export interface ApprovedResearch {
  id: string;
  /** Links to ResearchPackage.id at approval time. */
  researchPackageId: string;
  /**
   * Package snapshot as approved (includes human edits to research fields).
   * Stored inline in Phase 1 (no package store / DB yet).
   */
  researchPackage: ResearchPackage;
  approvedAt: string;
  /** Final category chosen by the editor (may differ from recommendation). */
  categoryDecision: AIDraftCategory;
  verifiedSources: ApprovedVerifiedSource[];
  resolvedIssues: ApprovedResolvedIssue[];
  /**
   * Writing direction / reminders for draft generation.
   * Not used for research issue resolution.
   */
  editorNotes: string[];
  /** Free-form changelog of human edits vs the AI package. */
  changesMade: string[];
}

export interface CreateApprovedResearchInput {
  researchPackage: ResearchPackage;
  categoryDecision: AIDraftCategory;
  verifiedSources?: ApprovedVerifiedSource[];
  resolvedIssues?: ApprovedResolvedIssue[];
  editorNotes?: string[];
  changesMade?: string[];
  approvedAt?: string;
  id?: string;
}

/** Pure factory — in-memory object only; no persistence. */
export function createApprovedResearch(
  input: CreateApprovedResearchInput,
): ApprovedResearch {
  const approvedAt = input.approvedAt ?? new Date().toISOString();
  const pkg = input.researchPackage;
  return {
    id: input.id ?? `ar_${Date.now().toString(36)}`,
    researchPackageId: pkg.id,
    researchPackage: pkg,
    approvedAt,
    categoryDecision: input.categoryDecision,
    verifiedSources: input.verifiedSources ?? [],
    resolvedIssues: input.resolvedIssues ?? [],
    editorNotes: input.editorNotes ?? [],
    changesMade: input.changesMade ?? [],
  };
}

/**
 * ApprovedDraft — human-reviewed draft ready for publish prep (Phase 4–5).
 *
 * Stage contract:
 *   DraftPackage → (human review) → ApprovedDraft → Publish Prep → lib/content
 *
 * Never auto-writes to lib/content.
 */

import type { EditorialState } from "../editorialState";
import type { DraftPackage } from "./draftPackage";

export interface ApprovedDraftMediaDecision {
  title: string;
  role: string;
  /** Editor decision note — media remains unverified until content commit. */
  decision: string;
}

/**
 * Human-approved draft ready for publish preparation.
 */
export interface ApprovedDraft {
  id: string;
  draftPackageId: string;
  /** Snapshot of the draft package as approved. */
  draftPackage: DraftPackage;
  approvedAt: string;
  /** Always Approved at this stage (EditorialState). */
  editorialStage: Extract<EditorialState, "Approved">;
  editorNotes: string[];
  changesMade: string[];
  seoNotes?: string;
  mediaDecisions?: ApprovedDraftMediaDecision[];
}

export interface CreateApprovedDraftInput {
  draftPackage: DraftPackage;
  editorNotes?: string[];
  changesMade?: string[];
  seoNotes?: string;
  mediaDecisions?: ApprovedDraftMediaDecision[];
  approvedAt?: string;
  id?: string;
}

/** Pure factory — in-memory object only; no persistence. */
export function createApprovedDraft(
  input: CreateApprovedDraftInput,
): ApprovedDraft {
  const approvedAt = input.approvedAt ?? new Date().toISOString();
  const pkg = input.draftPackage;
  return {
    id: input.id ?? `adraft_${Date.now().toString(36)}`,
    draftPackageId: pkg.id,
    draftPackage: pkg,
    approvedAt,
    editorialStage: "Approved",
    editorNotes: input.editorNotes ?? [],
    changesMade: input.changesMade ?? [],
    seoNotes: input.seoNotes,
    mediaDecisions: input.mediaDecisions,
  };
}

/**
 * Approve a DraftPackage after human review (Phase 4).
 */

import type { ApprovedDraft, DraftPackage } from "@/lib/ai/packages";
import { loadDraftPackage, saveDraftPackage } from "@/lib/admin/draftGeneration";
import { saveApprovedDraft } from "./approvedDraftStore";

export interface DraftReviewSubmission {
  draftPackageId: string;
  /** Edited package fields from the workspace. */
  draftPackage: DraftPackage;
  editorNotes: string;
  seoNotes?: string;
  changesMade?: string[];
}

export function approveDraftFromReview(
  submission: DraftReviewSubmission,
): ApprovedDraft {
  const current = loadDraftPackage(submission.draftPackageId);
  if (!current) {
    throw new Error(
      `approveDraftFromReview: draft not found: ${submission.draftPackageId}`,
    );
  }

  const next: DraftPackage = {
    ...submission.draftPackage,
    id: current.id,
    approvedResearchId: current.approvedResearchId,
  };
  saveDraftPackage(next);

  const notes = submission.editorNotes.trim();
  const changesMade = [
    ...(submission.changesMade ?? []),
    "Draft approved for publish prep",
  ];

  return saveApprovedDraft({
    draftPackage: next,
    editorNotes: notes ? [notes] : [...next.editorNotes],
    changesMade,
    seoNotes: submission.seoNotes?.trim() || undefined,
  });
}

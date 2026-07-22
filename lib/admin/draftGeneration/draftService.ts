/**
 * Draft generation service — ApprovedResearch → DraftPackage.
 */

import { loadApprovedResearch } from "@/lib/admin/researchReview/approvedStore";
import { generateDraftFromApprovedResearch } from "./fromApprovedResearch";
import {
  findDraftPackageByApprovedResearchId,
  loadDraftPackage,
  saveDraftPackage,
} from "./draftPackageStore";
import type { DraftPackage } from "@/lib/ai/packages";

/**
 * Generate (or return existing) DraftPackage from ApprovedResearch.
 */
export function generateDraftFromApproved(
  approvedResearchId: string,
): DraftPackage {
  const existing = findDraftPackageByApprovedResearchId(approvedResearchId);
  if (existing) return existing;

  const approved = loadApprovedResearch(approvedResearchId);
  if (!approved) {
    throw new Error(
      `generateDraftFromApproved: ApprovedResearch not found: ${approvedResearchId}`,
    );
  }

  const draft = generateDraftFromApprovedResearch(approved);
  return saveDraftPackage(draft);
}

export function updateDraftPackageFields(
  draftId: string,
  patch: Partial<DraftPackage>,
): DraftPackage {
  const current = loadDraftPackage(draftId);
  if (!current) {
    throw new Error(`updateDraftPackageFields: draft not found: ${draftId}`);
  }
  const { id: _id, approvedResearchId, ...safe } = patch;
  void _id;
  const next: DraftPackage = {
    ...current,
    ...safe,
    id: current.id,
    approvedResearchId: current.approvedResearchId ?? approvedResearchId,
  };
  return saveDraftPackage(next);
}

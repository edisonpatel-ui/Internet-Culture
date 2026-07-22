/**
 * Draft generation service — ApprovedResearch → DraftPackage.
 * Refuses packages that failed research integrity.
 */

import { loadApprovedResearch } from "@/lib/admin/researchReview/approvedStore";
import { validateResearchPackageReadyForDraft } from "@/lib/ai/workflows/researchWorkflow";
import { generateDraftFromApprovedResearch } from "./fromApprovedResearch";
import {
  findDraftPackageByApprovedResearchId,
  loadDraftPackage,
  saveDraftPackage,
} from "./draftPackageStore";
import type { DraftPackage } from "@/lib/ai/packages";
import { looksInternalProse } from "./encyclopediaProse";
import { normalizeDraftPackage } from "./normalizeDraft";

function draftContainsInternalArtifacts(draft: DraftPackage): boolean {
  const blobs = [
    draft.lead,
    draft.summary,
    draft.origin,
    draft.history,
    draft.culturalSignificance,
    draft.legacy,
    ...draft.articleSections.map((s) => `${s.heading}\n${s.body}`),
    ...draft.timeline.map((t) => `${t.date} ${t.event}`),
    ...draft.examples,
  ];
  return blobs.some(
    (t) =>
      looksInternalProse(t) ||
      /Editorial notes|Editor guidance|Editor flag|AI recommends|Kept AI|Need summary|Missing required|TODO|encyclopedia draft pending/i.test(
        t,
      ),
  );
}

/**
 * Generate (or refresh) DraftPackage from ApprovedResearch.
 * Always stores visitor-quality prose. Preserves feedback history on refresh.
 */
export function generateDraftFromApproved(
  approvedResearchId: string,
): DraftPackage {
  const existing = findDraftPackageByApprovedResearchId(approvedResearchId);
  if (existing && !draftContainsInternalArtifacts(existing)) {
    const cleaned = normalizeDraftPackage(existing);
    return saveDraftPackage(cleaned);
  }

  const approved = loadApprovedResearch(approvedResearchId);
  if (!approved) {
    throw new Error(
      `generateDraftFromApproved: ApprovedResearch not found: ${approvedResearchId}`,
    );
  }

  const readiness = validateResearchPackageReadyForDraft(
    approved.researchPackage,
  );
  if (!readiness.ok) {
    throw new Error(
      `generateDraftFromApproved: research not ready — ${readiness.issues.map((i) => i.message).join("; ")}`,
    );
  }

  const draft = generateDraftFromApprovedResearch(approved);
  if (existing) {
    draft.id = existing.id;
    draft.feedbackHistory = existing.feedbackHistory ?? [];
    draft.revision = existing.revision ?? 0;
  }
  return saveDraftPackage(draft);
}

/**
 * Load a draft and scrub any leftover internal artifacts for preview/publish.
 */
export function loadPublicDraftPackage(
  draftId: string,
): DraftPackage | undefined {
  const draft = loadDraftPackage(draftId);
  if (!draft) return undefined;
  const cleaned = normalizeDraftPackage(draft);
  if (draftContainsInternalArtifacts(cleaned) && cleaned.approvedResearchId) {
    try {
      return generateDraftFromApproved(cleaned.approvedResearchId);
    } catch {
      return saveDraftPackage(cleaned);
    }
  }
  return saveDraftPackage(cleaned);
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
  return saveDraftPackage(normalizeDraftPackage(next));
}

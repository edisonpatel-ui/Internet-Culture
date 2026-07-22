/**
 * Delete a research job and cascade in-memory editorial state.
 * Never touches published lib/content encyclopedia articles.
 */

import { deleteSession, loadSession } from "@/lib/admin/research/sessionService";
import {
  deleteResearchPackage,
  loadResearchPackage,
} from "@/lib/admin/researchReview/packageStore";
import {
  deleteApprovedByPackageId,
  findApprovedByPackageId,
} from "@/lib/admin/researchReview/approvedStore";
import {
  deleteDraftPackage,
  deleteDraftsByApprovedResearchId,
  findDraftPackageByApprovedResearchId,
} from "@/lib/admin/draftGeneration/draftPackageStore";
import { deleteApprovedDraftByPackageId } from "@/lib/admin/draftReview/approvedDraftStore";

export interface DeleteResearchJobResult {
  ok: boolean;
  packageId?: string;
  sessionId?: string;
  removed: string[];
  error?: string;
}

function sessionIdFromPackageId(packageId: string): string | undefined {
  if (packageId.startsWith("rp_")) return packageId.slice(3);
  return undefined;
}

function packageIdFromSessionId(sessionId: string): string {
  return `rp_${sessionId}`;
}

/**
 * Delete by ResearchPackage id — cleans package, approval, drafts, session.
 */
export function deleteResearchJobByPackageId(
  packageId: string,
): DeleteResearchJobResult {
  const removed: string[] = [];
  const pkg = loadResearchPackage(packageId);
  if (!pkg) {
    // Still try session/draft cleanup if ids are known
  } else {
    removed.push(`package:${packageId}`);
  }

  const approved = findApprovedByPackageId(packageId);
  if (approved) {
    const draft = findDraftPackageByApprovedResearchId(approved.id);
    if (draft) {
      deleteApprovedDraftByPackageId(draft.id);
      deleteDraftPackage(draft.id);
      removed.push(`draft:${draft.id}`);
    }
    deleteDraftsByApprovedResearchId(approved.id);
    deleteApprovedByPackageId(packageId);
    removed.push(`approvedResearch:${approved.id}`);
  } else {
    deleteApprovedByPackageId(packageId);
  }

  deleteResearchPackage(packageId);

  const sessionId = sessionIdFromPackageId(packageId);
  if (sessionId && loadSession(sessionId)) {
    deleteSession(sessionId);
    removed.push(`session:${sessionId}`);
  }

  if (removed.length === 0 && !pkg) {
    return {
      ok: false,
      packageId,
      removed: [],
      error: `Nothing found to delete for package ${packageId}`,
    };
  }

  return { ok: true, packageId, sessionId, removed };
}

/**
 * Delete by Research session id — removes session + linked package tree.
 */
export function deleteResearchJobBySessionId(
  sessionId: string,
): DeleteResearchJobResult {
  const packageId = packageIdFromSessionId(sessionId);
  const result = deleteResearchJobByPackageId(packageId);
  if (!result.ok && loadSession(sessionId)) {
    deleteSession(sessionId);
    return {
      ok: true,
      sessionId,
      packageId,
      removed: [`session:${sessionId}`],
    };
  }
  if (result.ok && !result.removed.includes(`session:${sessionId}`)) {
    if (loadSession(sessionId)) {
      deleteSession(sessionId);
      result.removed.push(`session:${sessionId}`);
    }
  }
  return { ...result, sessionId };
}

"use server";

/**
 * Server actions for Research Review → ApprovedResearch + delete / override.
 */

import { revalidatePath } from "next/cache";
import {
  approveResearchFromReview,
  type ResearchReviewSubmission,
} from "./reviewService";
import { deleteResearchJobByPackageId } from "./deleteResearchJob";
import {
  continueAnywayWithUnknowns,
  rerunResearchWithEditorGuidance,
} from "./editorialOverride";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

async function gate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminSession();
  if (!access.ok) return { ok: false, error: "Not found." };
  return { ok: true };
}

function revalidateResearchPaths(packageId?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/drafts");
  revalidatePath("/research");
  revalidatePath("/research-review");
  if (packageId) {
    revalidatePath(`/research-review/${packageId}`);
  }
}

export async function approveResearchAction(
  submission: ResearchReviewSubmission,
): Promise<
  | { ok: true; approvedId: string }
  | { ok: false; error: string }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const approved = approveResearchFromReview(submission);
    revalidateResearchPaths(submission.packageId);
    return { ok: true, approvedId: approved.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to approve research.",
    };
  }
}

export async function deleteResearchPackageAction(
  packageId: string,
): Promise<{ ok: true; removed: string[] } | { ok: false; error: string }> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const result = deleteResearchJobByPackageId(packageId);
    if (!result.ok) {
      return { ok: false, error: result.error ?? "Delete failed." };
    }
    revalidateResearchPaths(packageId);
    revalidatePath("/admin/drafts");
    revalidatePath("/drafts");
    return { ok: true, removed: result.removed };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to delete research package.",
    };
  }
}

export async function continueAnywayAction(
  packageId: string,
  comment: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    continueAnywayWithUnknowns(packageId, comment);
    revalidateResearchPaths(packageId);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to attach editor override.",
    };
  }
}

export async function rerunResearchWithGuidanceAction(
  packageId: string,
  comment: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    rerunResearchWithEditorGuidance(packageId, comment);
    revalidateResearchPaths(packageId);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to re-run Knowledge Engine.",
    };
  }
}

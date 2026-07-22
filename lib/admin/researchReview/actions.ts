"use server";

/**
 * Server actions for Research Review → ApprovedResearch (Phase 2A).
 */

import { revalidatePath } from "next/cache";
import {
  approveResearchFromReview,
  type ResearchReviewSubmission,
} from "./reviewService";

export async function approveResearchAction(
  submission: ResearchReviewSubmission,
): Promise<
  | { ok: true; approvedId: string }
  | { ok: false; error: string }
> {
  try {
    const approved = approveResearchFromReview(submission);
    revalidatePath("/research-review");
    revalidatePath(`/research-review/${submission.packageId}`);
    return { ok: true, approvedId: approved.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to approve research.",
    };
  }
}

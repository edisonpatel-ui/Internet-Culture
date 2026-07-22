"use server";

import { revalidatePath } from "next/cache";
import {
  approveDraftFromReview,
  type DraftReviewSubmission,
} from "./reviewService";

export async function approveDraftAction(
  submission: DraftReviewSubmission,
): Promise<
  { ok: true; approvedId: string } | { ok: false; error: string }
> {
  try {
    const approved = approveDraftFromReview(submission);
    revalidatePath("/drafts");
    revalidatePath(`/drafts/${submission.draftPackageId}`);
    revalidatePath(`/article-preview/${submission.draftPackageId}`);
    revalidatePath("/publish");
    return { ok: true, approvedId: approved.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to approve draft.",
    };
  }
}

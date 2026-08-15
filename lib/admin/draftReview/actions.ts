"use server";

import { revalidatePath } from "next/cache";
import {
  approveDraftFromReview,
  type DraftReviewSubmission,
} from "./reviewService";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

export async function approveDraftAction(
  submission: DraftReviewSubmission,
): Promise<
  { ok: true; approvedId: string } | { ok: false; error: string }
> {
  const access = await requireAdminSession();
  if (!access.ok) return { ok: false, error: "Not found." };
  try {
    const approved = approveDraftFromReview(submission);
    revalidatePath("/admin/drafts");
    revalidatePath(`/admin/drafts/${submission.draftPackageId}`);
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

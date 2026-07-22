"use server";

/**
 * Server actions for mock draft generation + revision.
 */

import { revalidatePath } from "next/cache";
import { generateDraftFromApproved } from "./draftService";
import { updateDraftPackageFields } from "./draftService";
import { loadDraftPackage, saveDraftPackage } from "./draftPackageStore";
import { reviseDraftWithFeedback } from "./reviseDraft";
import { normalizeDraftPackage } from "./normalizeDraft";
import type { DraftPackage } from "@/lib/ai/packages";

function revalidateDraftPaths(draftId: string) {
  revalidatePath("/admin/experimental/drafts");
  revalidatePath(`/admin/experimental/drafts/${draftId}`);
  revalidatePath("/drafts");
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath(`/article-preview/${draftId}`);
  revalidatePath("/research-review");
  revalidatePath("/publish");
}

export async function generateDraftFromApprovedAction(
  approvedResearchId: string,
): Promise<
  { ok: true; draftId: string } | { ok: false; error: string }
> {
  try {
    const draft = generateDraftFromApproved(approvedResearchId);
    revalidateDraftPaths(draft.id);
    return { ok: true, draftId: draft.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to generate draft.",
    };
  }
}

export async function saveDraftPackageAction(
  draftId: string,
  patch: Partial<DraftPackage>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    updateDraftPackageFields(draftId, patch);
    revalidateDraftPaths(draftId);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to save draft.",
    };
  }
}

export async function reviseDraftAction(
  draftId: string,
  feedback: string,
): Promise<
  | { ok: true; changeSummary: string }
  | { ok: false; error: string }
> {
  try {
    const current = loadDraftPackage(draftId);
    if (!current) {
      return { ok: false, error: `Draft not found: ${draftId}` };
    }
    const revised = reviseDraftWithFeedback(
      normalizeDraftPackage(current),
      feedback,
    );
    saveDraftPackage(revised);
    const last = revised.feedbackHistory[revised.feedbackHistory.length - 1];
    revalidateDraftPaths(draftId);
    return {
      ok: true,
      changeSummary: last?.changeSummary ?? "Draft revised.",
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to revise draft.",
    };
  }
}

export async function deleteDraftAction(
  draftId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const { deleteApprovedDraftByPackageId } = await import(
      "@/lib/admin/draftReview/approvedDraftStore"
    );
    deleteApprovedDraftByPackageId(draftId);
    const { deleteDraftPackage } = await import("./draftPackageStore");
    const removed = deleteDraftPackage(draftId);
    if (!removed) {
      return { ok: false, error: `Draft not found: ${draftId}` };
    }
    revalidateDraftPaths(draftId);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to delete draft.",
    };
  }
}

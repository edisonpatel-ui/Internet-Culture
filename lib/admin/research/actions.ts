"use server";

import { revalidatePath } from "next/cache";
import { startResearchJob } from "./startResearchJob";
import { loadAssessment } from "@/lib/ai/knowledgeEngine/assessmentStore";
import { deleteResearchJobBySessionId } from "@/lib/admin/researchReview/deleteResearchJob";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

async function gate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminSession();
  if (!access.ok) return { ok: false, error: "Not found." };
  return { ok: true };
}

export async function startResearchJobAction(input: {
  topic: string;
  notes?: string;
}): Promise<
  | { ok: true; qualifies: true; sessionId: string; assessmentId: string }
  | { ok: true; qualifies: false; assessmentId: string }
  | { ok: false; error: string }
> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const result = startResearchJob(input);
    revalidatePath("/research");
    if (!result.assessment.qualifies || !result.session) {
      return {
        ok: true,
        qualifies: false,
        assessmentId: result.assessment.id,
      };
    }
    revalidatePath(`/research/${result.session.id}`);
    revalidatePath("/research-review");
    return {
      ok: true,
      qualifies: true,
      sessionId: result.session.id,
      assessmentId: result.assessment.id,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to start research job.",
    };
  }
}

export async function loadAssessmentAction(id: string) {
  const g = await gate();
  if (!g.ok) return null;
  return loadAssessment(id) ?? null;
}

export async function deleteResearchSessionAction(
  sessionId: string,
): Promise<{ ok: true; removed: string[] } | { ok: false; error: string }> {
  const g = await gate();
  if (!g.ok) return g;
  try {
    const result = deleteResearchJobBySessionId(sessionId);
    if (!result.ok) {
      return { ok: false, error: result.error ?? "Delete failed." };
    }
    revalidatePath("/admin");
    revalidatePath("/admin/drafts");
    revalidatePath("/research");
    revalidatePath("/research-review");
    revalidatePath("/drafts");
    return { ok: true, removed: result.removed };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to delete research session.",
    };
  }
}

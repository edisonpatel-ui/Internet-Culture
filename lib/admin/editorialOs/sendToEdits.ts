/**
 * Send a draft to the Edits queue (optional AI revision).
 */

import type { DraftPackage } from "@/lib/ai/packages";
import {
  loadDraftPackage,
  saveDraftPackage,
} from "@/lib/admin/draftGeneration/draftPackageStore";
import { reviseDraftWithFeedback } from "@/lib/admin/draftGeneration/reviseDraft";
import { normalizeDraftPackage } from "@/lib/admin/draftGeneration/normalizeDraft";
import {
  saveEditSession,
  type EditSession,
} from "./editSessionStore";
import { recordEngineRun } from "./engineLog";
import { isRealGenerationConfigured } from "./realArticleGeneration";
import { reviseRealDraft } from "./realDraftRevision";

export async function sendDraftToEdits(
  draftId: string,
  comment: string,
): Promise<EditSession> {
  const current = loadDraftPackage(draftId);
  if (!current) {
    throw new Error(`Draft not found: ${draftId}`);
  }

  const previous = normalizeDraftPackage(structuredClone(current));
  const trimmed = comment.trim();
  let revised: DraftPackage;
  let changeSummary: string;

  if (trimmed) {
    let usedReal = false;
    let fallbackReason: string | null = null;
    if (isRealGenerationConfigured()) {
      try {
        revised = await reviseRealDraft(previous, trimmed);
        changeSummary =
          revised.feedbackHistory.at(-1)?.changeSummary ?? "Revised with real generation";
        usedReal = true;
      } catch (err) {
        fallbackReason = err instanceof Error ? err.message : "Unknown error";
        console.error(
          "[Draft Studio] Real revision failed, falling back to offline reviser:",
          fallbackReason,
        );
        revised = reviseDraftWithFeedback(previous, trimmed);
        changeSummary = `⚠️ Real AI edit failed (${fallbackReason}) — used basic fallback, which only recognizes a few fixed instruction types and likely did NOT apply "${trimmed}". Try again, or check GROQ_API_KEY / TAVILY_API_KEY.`;
      }
    } else {
      revised = reviseDraftWithFeedback(previous, trimmed);
      changeSummary = `⚠️ Real generation not configured — used basic fallback, which only recognizes a few fixed instruction types and likely did NOT apply "${trimmed}".`;
    }
    recordEngineRun({
      kind: "revise",
      topic: previous.title,
      draftId,
      unknownFields: 0,
      stagesAttempted: usedReal ? 1 : 0,
      readyForEditor: true,
      notes: `${usedReal ? "Real revision" : "Offline revision"}: ${trimmed.slice(0, 180)}`,
    });
  } else {
    revised = previous;
    changeSummary = "No revision requested — ready to publish";
  }

  const now = new Date().toISOString();
  revised = {
    ...normalizeDraftPackage(revised),
    id: previous.id,
    // Stays "draft" (not "in_edit") so it's still editable multiple times
    // from the Drafts list, rather than being locked into a one-shot
    // Edit → Publish page.
    status: "draft",
    createdAt: previous.createdAt ?? now,
    updatedAt: now,
  };
  saveDraftPackage(revised);

  const session: EditSession = {
    id: `edit_${Date.now().toString(36)}`,
    draftId: previous.id,
    editorComment: trimmed,
    previousDraft: previous,
    revisedDraft: revised,
    createdAt: now,
    updatedAt: now,
    status: "open",
    changeSummary,
  };

  return saveEditSession(session);
}

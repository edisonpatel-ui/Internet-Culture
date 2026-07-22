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

export function sendDraftToEdits(
  draftId: string,
  comment: string,
): EditSession {
  const current = loadDraftPackage(draftId);
  if (!current) {
    throw new Error(`Draft not found: ${draftId}`);
  }

  const previous = normalizeDraftPackage(structuredClone(current));
  const trimmed = comment.trim();
  let revised: DraftPackage;
  let changeSummary: string;

  if (trimmed) {
    revised = reviseDraftWithFeedback(previous, trimmed);
    changeSummary =
      revised.feedbackHistory.at(-1)?.changeSummary ?? "Revised from editor comment";
    recordEngineRun({
      kind: "revise",
      topic: previous.title,
      draftId,
      unknownFields: 0,
      stagesAttempted: 0,
      readyForEditor: true,
      notes: trimmed.slice(0, 200),
    });
  } else {
    revised = previous;
    changeSummary = "No revision requested — ready to publish";
  }

  const now = new Date().toISOString();
  revised = {
    ...normalizeDraftPackage(revised),
    id: previous.id,
    status: "in_edit",
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

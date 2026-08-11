/**
 * Publish from an Edit session: approve draft + write lib/content.
 */

import { approveDraftFromReview } from "@/lib/admin/draftReview/reviewService";
import { publishApprovedDraft } from "@/lib/admin/publish/publishApprovedDraft";
import {
  loadDraftPackage,
  saveDraftPackage,
} from "@/lib/admin/draftGeneration/draftPackageStore";
import {
  loadEditSession,
  saveEditSession,
} from "./editSessionStore";
import type { PublishResult } from "@/lib/admin/publish/publishApprovedDraft";

/**
 * Publish directly from the Drafts list (no separate Edit-session page
 * required) — for the "edit multiple times, then publish whenever ready"
 * flow. Reuses the exact same approve + publish mechanics as
 * publishFromEditSession.
 */
export function publishDraft(draftId: string): PublishResult {
  const draft = loadDraftPackage(draftId);
  if (!draft) {
    return { ok: false, fixes: [], judgmentRequired: [], error: "Draft not found." };
  }
  if (draft.status === "published") {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: "This draft was already published.",
    };
  }

  const approved = approveDraftFromReview({
    draftPackageId: draft.id,
    draftPackage: draft,
    editorNotes: "",
    changesMade: ["Published directly from Drafts"],
  });

  const result = publishApprovedDraft(approved.id);
  if (!result.ok) return result;

  const now = new Date().toISOString();
  saveDraftPackage({ ...draft, status: "published", updatedAt: now });

  return result;
}

export function publishFromEditSession(editId: string): PublishResult {
  const session = loadEditSession(editId);
  if (!session) {
    return { ok: false, fixes: [], judgmentRequired: [], error: "Edit session not found." };
  }
  if (session.status === "published") {
    return {
      ok: false,
      fixes: [],
      judgmentRequired: [],
      error: "This edit was already published.",
    };
  }

  const draft =
    loadDraftPackage(session.draftId) ?? session.revisedDraft;

  const approved = approveDraftFromReview({
    draftPackageId: draft.id,
    draftPackage: session.revisedDraft,
    editorNotes: "",
    changesMade: [
      session.changeSummary,
      session.editorComment
        ? `Editor comment: ${session.editorComment}`
        : "Published from Edits",
    ],
  });

  const result = publishApprovedDraft(approved.id);
  if (!result.ok) return result;

  const now = new Date().toISOString();
  saveEditSession({
    ...session,
    status: "published",
    updatedAt: now,
  });

  const current = loadDraftPackage(draft.id);
  if (current) {
    saveDraftPackage({
      ...current,
      status: "published",
      updatedAt: now,
    });
  }

  return result;
}

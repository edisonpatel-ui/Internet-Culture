"use server";

import { revalidatePath } from "next/cache";
import { createArticleFromPrompt } from "./createArticle";
import { sendDraftToEdits } from "./sendToEdits";
import { publishFromEditSession } from "./publishFromEdit";
import {
  deleteDraftPackage,
  loadDraftPackage,
} from "@/lib/admin/draftGeneration/draftPackageStore";
import { deleteEditSessionsForDraft } from "./editSessionStore";
import {
  createArticleUpdate,
  searchPublishedArticles,
} from "@/lib/admin/articleUpdate/createUpdate";
import { applyArticleUpdate } from "@/lib/admin/articleUpdate/applyUpdate";
import { recordEngineRun } from "./engineLog";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

function revalidateEditorial() {
  revalidatePath(experimentalPaths.hub);
  revalidatePath(experimentalPaths.create);
  revalidatePath(experimentalPaths.drafts);
  revalidatePath(experimentalPaths.edits);
  revalidatePath(experimentalPaths.published);
  revalidatePath(experimentalPaths.settings);
}

export async function createArticleFromPromptAction(
  prompt: string,
): Promise<
  { ok: true; draftId: string } | { ok: false; error: string }
> {
  try {
    const draft = createArticleFromPrompt(prompt);
    revalidateEditorial();
    revalidatePath(experimentalPaths.draft(draft.id));
    return { ok: true, draftId: draft.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to generate article.",
    };
  }
}

export async function sendDraftToEditsAction(
  draftId: string,
  comment: string,
): Promise<{ ok: true; editId: string } | { ok: false; error: string }> {
  try {
    const session = sendDraftToEdits(draftId, comment);
    revalidateEditorial();
    revalidatePath(experimentalPaths.edit(session.id));
    return { ok: true, editId: session.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to send to Edits.",
    };
  }
}

export async function deleteDraftAction(
  draftId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (!loadDraftPackage(draftId)) {
      return { ok: false, error: "Draft not found." };
    }
    deleteEditSessionsForDraft(draftId);
    deleteDraftPackage(draftId);
    revalidateEditorial();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to delete draft.",
    };
  }
}

export async function publishFromEditAction(
  editId: string,
): Promise<
  | { ok: true; slug: string; category: string }
  | { ok: false; error: string }
> {
  try {
    const result = publishFromEditSession(editId);
    if (!result.ok || !result.published) {
      return {
        ok: false,
        error: result.error ?? result.validateOutput ?? "Publish failed.",
      };
    }
    revalidateEditorial();
    return {
      ok: true,
      slug: result.published.slug,
      category: result.published.category,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Publish failed.",
    };
  }
}

export async function searchPublishedAction(query: string) {
  return searchPublishedArticles(query).map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category,
    description: e.description,
    addedAt: e.addedAt,
    lastUpdated: e.lastUpdated,
  }));
}

export async function createPublishedUpdateAction(input: {
  slug: string;
  request: string;
}): Promise<
  { ok: true; sessionId: string } | { ok: false; error: string }
> {
  try {
    const session = createArticleUpdate(input);
    recordEngineRun({
      kind: "update",
      topic: session.title,
      draftId: session.id,
      unknownFields: 0,
      stagesAttempted: 10,
      readyForEditor: true,
      notes: input.request.slice(0, 200),
    });
    revalidatePath(experimentalPaths.published);
    revalidatePath(experimentalPaths.publishedUpdate(input.slug));
    return { ok: true, sessionId: session.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to generate update.",
    };
  }
}

export async function applyPublishedUpdateAction(
  sessionId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const result = applyArticleUpdate(sessionId);
    if (!result.ok) {
      return { ok: false, error: result.error ?? "Apply update failed." };
    }
    revalidateEditorial();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Apply update failed.",
    };
  }
}

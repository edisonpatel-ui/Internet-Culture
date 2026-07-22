"use server";

/**
 * Server actions for Published Article Update workflow.
 */

import { revalidatePath } from "next/cache";
import {
  createArticleUpdate,
  searchPublishedArticles,
} from "./createUpdate";
import { applyArticleUpdate } from "./applyUpdate";
import { loadUpdateSession } from "./store";

export async function searchPublishedArticlesAction(query: string) {
  const results = searchPublishedArticles(query);
  return results.map((e) => ({
    slug: e.slug,
    title: e.title,
    category: e.category,
    description: e.description,
  }));
}

export async function createArticleUpdateAction(input: {
  slug: string;
  request: string;
}): Promise<
  | { ok: true; sessionId: string }
  | { ok: false; error: string }
> {
  try {
    const session = createArticleUpdate(input);
    revalidatePath("/updates");
    revalidatePath(`/updates/${input.slug}`);
    revalidatePath(`/updates/preview/${session.id}`);
    return { ok: true, sessionId: session.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to create update.",
    };
  }
}

export async function applyArticleUpdateAction(
  sessionId: string,
): Promise<
  | {
      ok: true;
      filePath?: string;
      fixes: string[];
    }
  | { ok: false; error: string; judgmentRequired?: string[] }
> {
  try {
    const result = applyArticleUpdate(sessionId);
    const session = loadUpdateSession(sessionId);
    if (session) {
      revalidatePath(`/updates/${session.slug}`);
      revalidatePath(`/${session.category}/${session.slug}`);
    }
    revalidatePath("/updates");
    if (!result.ok) {
      return {
        ok: false,
        error: result.error ?? "Update apply failed.",
        judgmentRequired: result.judgmentRequired,
      };
    }
    return {
      ok: true,
      filePath: result.filePath,
      fixes: result.fixes,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Update apply failed.",
    };
  }
}

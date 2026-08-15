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
import { revalidatePublicDiscovery } from "@/lib/admin/revalidatePublicDiscovery";
import { getDetailHref } from "@/lib/utils";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";

async function gate(): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminSession();
  if (!access.ok) return { ok: false, error: "Not found." };
  return { ok: true };
}

export async function searchPublishedArticlesAction(query: string) {
  const g = await gate();
  if (!g.ok) return [];
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
  const g = await gate();
  if (!g.ok) return g;
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
  const g = await gate();
  if (!g.ok) return g;
  try {
    const result = applyArticleUpdate(sessionId);
    const session = loadUpdateSession(sessionId);
    if (session) {
      revalidatePath(`/updates/${session.slug}`);
      revalidatePublicDiscovery({
        detailPath: getDetailHref(session.category, session.slug),
      });
    } else {
      revalidatePublicDiscovery();
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

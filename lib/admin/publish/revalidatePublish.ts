/**
 * Cache revalidation after a successful publish.
 *
 * Replaces the old runtime `npm run build` shell-out: instead of rebuilding
 * the whole site inside a request (slow, fragile next to `next dev`, and not
 * possible on serverless hosts), publishing now just invalidates the routes
 * whose output changed.
 *
 * The public site has one dynamic detail route per category
 * (`/memes/[slug]`, `/slang/[slug]`, `/events/[slug]`, `/people/[slug]`,
 * `/trending/[slug]`), so the precise detail path for the new entry is
 * revalidated rather than the whole `[slug]` pattern — one publish should
 * not invalidate every article in that category.
 */

import { revalidatePath } from "next/cache";
import { getDetailHref } from "@/lib/utils";

const CATEGORY_LISTING_PATH: Record<string, string> = {
  meme: "/memes",
  slang: "/slang",
  event: "/events",
  creator: "/people",
  trend: "/trending",
  brainrot: "/brainrot",
};

export interface RevalidationResult {
  /** True when every path was revalidated without error. */
  ok: boolean;
  /** Paths successfully revalidated. */
  paths: string[];
  /** Set when revalidation could not run (e.g. outside a request context). */
  error?: string;
}

/** The exact set of paths a publish invalidates (pure — easy to test). */
export function getPublishRevalidationPaths(entry: {
  category: string;
  slug: string;
}): string[] {
  const paths = [
    getDetailHref(entry.category, entry.slug),
    CATEGORY_LISTING_PATH[entry.category],
    "/",
    "/culture-graph",
    "/admin/drafts",
  ].filter((p): p is string => Boolean(p));
  return [...new Set(paths)];
}

/**
 * Revalidate everything a newly published entry can appear on.
 *
 * Never throws: `revalidatePath` only works inside a Next.js request
 * (server action / route handler). When publish is invoked from a script
 * or test there is no request context — that must not fail an otherwise
 * successful publish, so the failure is reported in the result instead.
 */
export function revalidateAfterPublish(entry: {
  category: string;
  slug: string;
}): RevalidationResult {
  const done: string[] = [];
  let error: string | undefined;
  for (const p of getPublishRevalidationPaths(entry)) {
    try {
      revalidatePath(p);
      done.push(p);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }
  return { ok: error === undefined, paths: done, ...(error ? { error } : {}) };
}

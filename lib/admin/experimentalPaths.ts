/**
 * Experimental AI Editorial Lab — Phase 2+ routes.
 *
 * Not part of the Version 1 content workflow.
 * V1 articles are researched and written in Cursor, then committed to lib/content/.
 */

export const EXPERIMENTAL_OS_BASE = "/admin/experimental";

/** Canonical routes for the Future Editorial System (Experimental). */
export const experimentalPaths = {
  hub: EXPERIMENTAL_OS_BASE,
  create: `${EXPERIMENTAL_OS_BASE}/create`,
  drafts: `${EXPERIMENTAL_OS_BASE}/drafts`,
  draft: (id: string) => `${EXPERIMENTAL_OS_BASE}/drafts/${id}`,
  edits: `${EXPERIMENTAL_OS_BASE}/edits`,
  edit: (id: string) => `${EXPERIMENTAL_OS_BASE}/edits/${id}`,
  published: `${EXPERIMENTAL_OS_BASE}/published`,
  publishedArticle: (slug: string) =>
    `${EXPERIMENTAL_OS_BASE}/published/${slug}`,
  publishedUpdate: (slug: string, sessionId?: string) => {
    const base = `${EXPERIMENTAL_OS_BASE}/published/${slug}/update`;
    return sessionId ? `${base}?session=${sessionId}` : base;
  },
  settings: `${EXPERIMENTAL_OS_BASE}/settings`,
  unlock: `${EXPERIMENTAL_OS_BASE}/unlock`,
} as const;

/** All prefixes gated / noindex for the experimental lab + legacy redirects. */
export const EXPERIMENTAL_AND_LEGACY_PREFIXES = [
  EXPERIMENTAL_OS_BASE,
  "/admin",
  // Legacy top-level Editorial OS URLs (redirect into experimental)
  "/create",
  "/drafts",
  "/edits",
  "/published",
  "/settings",
  "/editorial-unlock",
  "/research",
  "/research-review",
  "/article-preview",
  "/publish",
  "/updates",
  "/draft-studio",
] as const;

export function isExperimentalOsPath(pathname: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;
  return (
    path === EXPERIMENTAL_OS_BASE ||
    path.startsWith(`${EXPERIMENTAL_OS_BASE}/`)
  );
}

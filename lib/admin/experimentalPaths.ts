/**
 * Admin Editorial OS routes.
 *
 * V1 articles can still be researched and written in Cursor, then committed
 * to lib/content/ directly — this tooling is the in-app alternative.
 */

export const EXPERIMENTAL_OS_BASE = "/admin";

/** Canonical routes for the Editorial OS. */
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
  access: "/admin/access",
  maintenance: "/admin/maintenance",
} as const;

/** All admin/internal-tooling prefixes gated / noindex, including legacy redirects. */
export const EXPERIMENTAL_AND_LEGACY_PREFIXES = [
  "/admin",
  // Legacy top-level Editorial OS URLs (redirect into /admin)
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

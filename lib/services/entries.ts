/**
 * Entry Service Layer
 *
 * All cross-collection data access goes through here.
 * Pages should prefer these functions over importing raw data arrays directly.
 * When a database is added, only this file needs to change — page code stays the same.
 *
 * Content is sourced from lib/content/ category indexes, not lib/data/ directly.
 * lib/data/ is an implementation detail; lib/content/ is the public interface.
 *
 * Duplicate policy (P0):
 * - Intentional trend re-exports of the same entry object/id are allowed.
 * - Distinct entries sharing a slug or id throw — never silently dropped.
 */

import type { BaseEntry, ContentCategory } from "@/types";
import { buildCatalog } from "@/lib/content/validation/catalog";

function formatSlugConflicts(
  conflicts: ReturnType<typeof buildCatalog>["slugConflicts"],
): string {
  return conflicts
    .map((c) => {
      const detail = c.entries
        .map((e) => `${e.category}/${e.id} "${e.title}"`)
        .join(" vs ");
      return `  slug "${c.slug}": ${detail}`;
    })
    .join("\n");
}

function formatIdConflicts(
  conflicts: ReturnType<typeof buildCatalog>["idConflicts"],
): string {
  return conflicts
    .map((c) => {
      const detail = c.entries
        .map((e) => `${e.category}/${e.slug}`)
        .join(" vs ");
      return `  id "${c.id}": ${detail}`;
    })
    .join("\n");
}

/**
 * Returns all entries across all collections.
 * Throws if distinct entries share a slug or id (data integrity failure).
 */
function buildAllEntries(): BaseEntry[] {
  const { entries, slugConflicts, idConflicts } = buildCatalog();

  if (slugConflicts.length > 0 || idConflicts.length > 0) {
    const parts: string[] = [
      "Catalog integrity error — duplicate content detected.",
      "Run `npm run validate` for full details.",
    ];
    if (slugConflicts.length > 0) {
      parts.push("Duplicate slugs:\n" + formatSlugConflicts(slugConflicts));
    }
    if (idConflicts.length > 0) {
      parts.push("Duplicate ids:\n" + formatIdConflicts(idConflicts));
    }
    throw new Error(parts.join("\n"));
  }

  return entries;
}

export async function getAllEntries(): Promise<BaseEntry[]> {
  return buildAllEntries();
}

/** Sync catalog access for static pages and intelligence helpers. */
export function getAllEntriesSync(): BaseEntry[] {
  return buildAllEntries();
}

export async function getEntriesByCategory(
  category: ContentCategory,
): Promise<BaseEntry[]> {
  return buildAllEntries().filter((e) => e.category === category);
}

export async function getEntryBySlug(slug: string): Promise<BaseEntry | null> {
  return buildAllEntries().find((e) => e.slug === slug) ?? null;
}

export async function getAllSlugsForCategory(
  category: ContentCategory,
): Promise<string[]> {
  return (await getEntriesByCategory(category)).map((e) => e.slug);
}

export async function getTotalEntryCount(): Promise<number> {
  return buildAllEntries().length;
}

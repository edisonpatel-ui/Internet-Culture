/**
 * Catalog assembly with explicit conflict detection.
 * Intentional trend re-exports (same object / same id) are allowed.
 * Distinct entries sharing a slug or id are conflicts — never silent.
 */

import { memes } from "@/lib/content/memes";
import { slangTerms } from "@/lib/content/slang";
import { events } from "@/lib/content/events";
import { creators } from "@/lib/content/creators";
import { trends } from "@/lib/content/trends";
import type { BaseEntry } from "@/types";
import type { CatalogBuildResult, CatalogConflict } from "./types";

/** Canonical category arrays first; trends last (may re-export). */
export function getCanonicalEntryArrays(): Array<{
  label: string;
  entries: BaseEntry[];
}> {
  return [
    { label: "memes", entries: memes as BaseEntry[] },
    { label: "slang", entries: slangTerms as BaseEntry[] },
    { label: "events", entries: events as BaseEntry[] },
    { label: "creators", entries: creators as BaseEntry[] },
    { label: "trends", entries: trends as BaseEntry[] },
  ];
}

/**
 * Same physical entry (trend re-import) vs two different articles.
 */
function isSameEntry(a: BaseEntry, b: BaseEntry): boolean {
  return a === b || (a.id === b.id && a.slug === b.slug);
}

/**
 * Build the live catalog and report true duplicates.
 * Does not throw — callers decide whether to fail hard.
 */
export function buildCatalog(): CatalogBuildResult {
  const bySlug = new Map<string, BaseEntry>();
  const slugConflictMap = new Map<string, BaseEntry[]>();

  for (const { entries } of getCanonicalEntryArrays()) {
    for (const entry of entries) {
      const existing = bySlug.get(entry.slug);
      if (!existing) {
        bySlug.set(entry.slug, entry);
        continue;
      }
      if (isSameEntry(existing, entry)) {
        // Intentional cross-index re-export (e.g. trends importing a meme).
        continue;
      }
      const bucket = slugConflictMap.get(entry.slug) ?? [existing];
      if (!bucket.some((e) => isSameEntry(e, entry))) {
        bucket.push(entry);
      }
      slugConflictMap.set(entry.slug, bucket);
    }
  }

  const slugConflicts: CatalogConflict[] = [...slugConflictMap.entries()].map(
    ([slug, list]) => ({
      slug,
      entries: list.map((e) => ({
        id: e.id,
        title: e.title,
        category: e.category,
      })),
    }),
  );

  // ID uniqueness across catalog (after intentional re-export collapse).
  // Scan all appearances including trends, but collapse same entry.
  const idMap = new Map<string, BaseEntry[]>();
  for (const { entries } of getCanonicalEntryArrays()) {
    for (const entry of entries) {
      const list = idMap.get(entry.id) ?? [];
      if (!list.some((e) => isSameEntry(e, entry))) {
        list.push(entry);
      }
      idMap.set(entry.id, list);
    }
  }

  const idConflicts = [...idMap.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([id, list]) => ({
      id,
      entries: list.map((e) => ({
        slug: e.slug,
        title: e.title,
        category: e.category,
      })),
    }));

  return {
    entries: [...bySlug.values()],
    slugConflicts,
    idConflicts,
  };
}

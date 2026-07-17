/**
 * Entry Service Layer
 *
 * All cross-collection data access goes through here.
 * Pages should prefer these functions over importing raw data arrays directly.
 * When a database is added, only this file needs to change — page code stays the same.
 *
 * Content is sourced from lib/content/ category indexes, not lib/data/ directly.
 * lib/data/ is an implementation detail; lib/content/ is the public interface.
 */

import { trends } from "@/lib/content/trends";
import { memes } from "@/lib/content/memes";
import { slangTerms } from "@/lib/content/slang";
import { events } from "@/lib/content/events";
import { creators } from "@/lib/content/creators";
import type { BaseEntry, ContentCategory } from "@/types";

/**
 * Returns all entries across all collections, deduplicated by slug.
 * Specific-type entries (MemeEntry, SlangEntry, EventEntry, CreatorEntry) take
 * precedence over the generic BaseEntry in trends.ts for the same slug.
 */
function buildAllEntries(): BaseEntry[] {
  const seen = new Set<string>();
  const all: BaseEntry[] = [];

  for (const entry of [
    ...memes,
    ...slangTerms,
    ...events,
    ...creators,
    ...trends,
  ] as BaseEntry[]) {
    if (!seen.has(entry.slug)) {
      seen.add(entry.slug);
      all.push(entry);
    }
  }

  return all;
}

export async function getAllEntries(): Promise<BaseEntry[]> {
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

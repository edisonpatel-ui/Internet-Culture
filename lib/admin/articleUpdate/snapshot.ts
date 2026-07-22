/**
 * Build an ExistingArticleSnapshot from a live catalog entry.
 */

import type { BaseEntry } from "@/types";
import type { ExistingArticleSnapshot } from "@/lib/ai/packages";
import type { AIDraftCategory } from "@/lib/ai/types";

export function snapshotFromEntry(entry: BaseEntry): ExistingArticleSnapshot {
  const fields: Record<string, string> = {
    description: entry.description ?? "",
    origin: entry.origin ?? "",
  };

  const e = entry as BaseEntry & {
    meaning?: string;
    definition?: string;
    impact?: string;
    timeline?: Array<{ date: string; event: string }>;
  };
  if (e.meaning) fields.meaning = e.meaning;
  if (e.definition) fields.definition = e.definition;
  if (e.impact) fields.impact = e.impact;
  if (e.timeline?.length) {
    fields.timeline = e.timeline.map((t) => `${t.date}: ${t.event}`).join("\n");
  }

  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category as AIDraftCategory,
    description: entry.description,
    fields,
    aliases: undefined,
    tags: entry.tags,
    relatedSlugs: entry.relatedSlugs,
    lastUpdated: entry.lastUpdated ?? entry.addedAt,
    scores: {
      relevance: entry.scores.relevance,
      influence: entry.scores.influence,
      cringe: entry.scores.cringe,
      brainrot: entry.scores.brainrot,
    },
  };
}

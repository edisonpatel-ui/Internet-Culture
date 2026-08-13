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

  // meaning/definition/impact are deliberately excluded from the diffable
  // field set — a term's core definition is not something a scoped update
  // request should ever silently rewrite. Redefining a term needs its own
  // explicit action, not a side effect of an unrelated edit.

  const e = entry as BaseEntry & {
    timeline?: Array<{ date: string; event: string }>;
  };
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

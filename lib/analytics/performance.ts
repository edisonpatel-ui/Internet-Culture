/**
 * Article performance records — foundation for a future content dashboard.
 *
 * Uses the four encyclopedia scores + catalog views. Does not invent traffic.
 */

import { getFreshnessLabel, getEffectiveUpdatedAt } from "@/lib/content/freshness";
import { BRAINROT_CLUSTERS } from "@/lib/content/clusters/brainrotHub";
import {
  getInfluenceScore,
  getRelevanceScore,
} from "@/lib/intelligence";
import type { BaseEntry, ContentCategory } from "@/types";

export type PerformancePriority =
  | "expand"
  | "maintain"
  | "refresh_seo"
  | "monitor";

export interface ArticlePerformanceRecord {
  slug: string;
  title: string;
  category: ContentCategory;
  clusters: string[];
  publishedAt: string;
  updatedAt: string;
  freshness: string;
  catalogViews: number;
  relevance: number;
  influence: number;
  pageViews?: number;
  searchImpressions?: number;
  searchClicks?: number;
  avgPosition?: number;
  priority: PerformancePriority;
  note: string;
}

const BRAINROT_SLUGS = new Set(
  BRAINROT_CLUSTERS.flatMap((c) => [...c.slugs]),
);

function clustersFor(entry: BaseEntry): string[] {
  const out = new Set<string>();
  if (BRAINROT_SLUGS.has(entry.slug)) out.add("brainrot");
  for (const tag of entry.tags ?? []) {
    const t = tag.toLowerCase();
    if (t.includes("brainrot") || t.includes("gen alpha")) out.add("brainrot");
    if (t.includes("classic") || t.includes("legacy")) out.add("classic");
    if (t.includes("streamer") || t.includes("twitch") || t.includes("amp")) {
      out.add("streamer");
    }
  }
  out.add(entry.category);
  return [...out];
}

function decidePriority(entry: BaseEntry): {
  priority: PerformancePriority;
  note: string;
} {
  const relevance = getRelevanceScore(entry);
  const influence = getInfluenceScore(entry);

  if (relevance >= 75) {
    return {
      priority: "expand",
      note: "High relevance — expand related articles and hub links.",
    };
  }
  if (influence >= 80 && relevance <= 50) {
    return {
      priority: "refresh_seo",
      note: "High influence, lower current relevance — refresh SEO lightly.",
    };
  }
  if (relevance >= 55) {
    return {
      priority: "maintain",
      note: "Solid relevance — keep content accurate and linked.",
    };
  }
  return {
    priority: "monitor",
    note: "Low catalog signal — watch search queries before investing.",
  };
}

export function buildArticlePerformanceRecord(
  entry: BaseEntry,
): ArticlePerformanceRecord {
  const { priority, note } = decidePriority(entry);
  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    clusters: clustersFor(entry),
    publishedAt: entry.addedAt,
    updatedAt: getEffectiveUpdatedAt(entry),
    freshness: getFreshnessLabel(entry),
    catalogViews: entry.views,
    relevance: getRelevanceScore(entry),
    influence: getInfluenceScore(entry),
    priority,
    note,
  };
}

export function buildPerformanceCatalog(
  entries: readonly BaseEntry[],
): ArticlePerformanceRecord[] {
  return entries
    .map(buildArticlePerformanceRecord)
    .sort(
      (a, b) =>
        b.relevance - a.relevance ||
        b.influence - a.influence ||
        a.title.localeCompare(b.title),
    );
}

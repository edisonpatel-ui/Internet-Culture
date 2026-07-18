/**
 * Article performance records — foundation for a future content dashboard.
 *
 * Today: built from catalog editorial fields + cultural score snapshots.
 * Future: merge Search Console impressions/clicks and live page views.
 *
 * Does not invent traffic numbers.
 */

import { getFreshnessLabel, getEffectiveUpdatedAt } from "@/lib/content/freshness";
import { BRAINROT_CLUSTERS } from "@/lib/content/clusters/brainrotHub";
import {
  getCulturalImpactScore,
  getRelevanceScore,
  getSearchInterestScore,
} from "@/lib/intelligence";
import type { BaseEntry, ContentCategory } from "@/types";

export type PerformancePriority =
  | "expand" // high current demand — grow related graph / hub
  | "maintain" // healthy — keep fresh, light updates
  | "refresh_seo" // legacy or declining — improve titles/descriptions
  | "monitor"; // low signal — watch searches before investing

export interface ArticlePerformanceRecord {
  slug: string;
  title: string;
  category: ContentCategory;
  /** Cluster / hub membership hints (editorial tags + curated hubs). */
  clusters: string[];
  publishedAt: string;
  updatedAt: string;
  freshness: string;
  /** Editorial catalog views — placeholder until live analytics. */
  catalogViews: number;
  currentRelevance: number;
  legacyImpact: number;
  searchInterest: number;
  /**
   * Future GSC / analytics fields — omitted until wired.
   * Keep optional so merges do not invent zeros as truth.
   */
  pageViews?: number;
  searchImpressions?: number;
  searchClicks?: number;
  avgPosition?: number;
  /** Heuristic editorial priority for the growth loop. */
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
  const legacy = getCulturalImpactScore(entry);
  const interest = getSearchInterestScore(entry);

  if (interest >= 75 && relevance >= 70) {
    return {
      priority: "expand",
      note: "High current demand — expand related articles and hub links.",
    };
  }
  if (legacy >= 80 && relevance <= 50) {
    return {
      priority: "refresh_seo",
      note: "High legacy, lower current demand — refresh SEO, don't over-prioritize new builds.",
    };
  }
  if (relevance >= 55 || interest >= 55) {
    return {
      priority: "maintain",
      note: "Solid interest — keep content accurate and linked.",
    };
  }
  return {
    priority: "monitor",
    note: "Low catalog signal — watch search queries before investing.",
  };
}

/** Build a performance row from a catalog entry (no invented traffic). */
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
    currentRelevance: getRelevanceScore(entry),
    legacyImpact: getCulturalImpactScore(entry),
    searchInterest: getSearchInterestScore(entry),
    priority,
    note,
  };
}

/** Full catalog performance snapshot for future admin/dashboard tooling. */
export function buildPerformanceCatalog(
  entries: readonly BaseEntry[],
): ArticlePerformanceRecord[] {
  return entries
    .map(buildArticlePerformanceRecord)
    .sort(
      (a, b) =>
        b.searchInterest - a.searchInterest ||
        b.currentRelevance - a.currentRelevance ||
        a.title.localeCompare(b.title),
    );
}

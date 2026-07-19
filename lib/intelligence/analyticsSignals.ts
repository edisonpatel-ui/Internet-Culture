/**
 * Analytics → intelligence signals (Phase 7D — internal).
 *
 * Transforms normalized analytics events into aggregated signals for
 * trend / opportunity tooling. Works on in-memory event batches —
 * no external services required.
 */

import type { BaseEntry } from "@/types";
import { getCulturalIntelligence } from "./culturalMeta";
import {
  getEventQuery,
  getEventSlug,
  type IntelligenceAnalyticsEvent,
} from "./analyticsEvents";

export interface CountedItem {
  key: string;
  count: number;
}

export interface RecommendationPath {
  fromSlug: string;
  toSlug: string;
  count: number;
  reasons: string[];
}

export interface GrowingClusterSignal {
  clusterId: string;
  viewCount: number;
  relatedClickCount: number;
  memberSlugsTouched: string[];
}

/**
 * Aggregated intelligence view of a raw event batch.
 */
export interface AnalyticsIntelligenceReport {
  /** Total normalized events considered. */
  eventCount: number;
  /** Entry view counts by slug. */
  popularEntries: CountedItem[];
  /** Search queries with result_count > 0 (or unknown). */
  risingSearches: CountedItem[];
  /** Zero-result / explicit no-result queries. */
  failedSearches: CountedItem[];
  /** Category exploration counts. */
  categoryExploration: CountedItem[];
  /** Related-click paths (from → to). */
  recommendationPaths: RecommendationPath[];
  /** Clusters touched by views / related clicks. */
  growingClusters: GrowingClusterSignal[];
  /** External link click counts by href host or full href. */
  externalLinkClicks: CountedItem[];
}

function bump(map: Map<string, number>, key: string, by = 1) {
  if (!key) return;
  map.set(key, (map.get(key) ?? 0) + by);
}

function topCounts(map: Map<string, number>, limit: number): CountedItem[] {
  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

function hostOrHref(href: string): string {
  try {
    const u = new URL(href);
    return u.hostname || href;
  } catch {
    return href.slice(0, 80);
  }
}

/**
 * Aggregate normalized analytics events into intelligence signals.
 */
export function buildAnalyticsIntelligenceReport(
  events: IntelligenceAnalyticsEvent[],
  catalog: BaseEntry[],
  options?: { limit?: number },
): AnalyticsIntelligenceReport {
  const limit = options?.limit ?? 25;
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));

  const views = new Map<string, number>();
  const searches = new Map<string, number>();
  const failed = new Map<string, number>();
  const categories = new Map<string, number>();
  const paths = new Map<string, { count: number; reasons: Set<string> }>();
  const external = new Map<string, number>();
  const clusterViews = new Map<string, number>();
  const clusterRelated = new Map<string, number>();
  const clusterMembers = new Map<string, Set<string>>();

  const touchCluster = (
    slug: string,
    kind: "view" | "related",
  ) => {
    const entry = bySlug.get(slug);
    if (!entry) return;
    const clusters = getCulturalIntelligence(entry).clusters;
    for (const id of clusters) {
      if (kind === "view") bump(clusterViews, id);
      else bump(clusterRelated, id);
      const set = clusterMembers.get(id) ?? new Set<string>();
      set.add(slug);
      clusterMembers.set(id, set);
    }
  };

  for (const event of events) {
    switch (event.kind) {
      case "entry_viewed": {
        const slug = getEventSlug(event, "slug");
        if (slug) {
          bump(views, slug);
          touchCluster(slug, "view");
        }
        break;
      }
      case "search_performed": {
        const q = getEventQuery(event);
        if (q) bump(searches, q);
        break;
      }
      case "search_no_result": {
        const q = getEventQuery(event);
        if (q) bump(failed, q);
        break;
      }
      case "related_entry_clicked": {
        const from = getEventSlug(event, "from_slug");
        const to = getEventSlug(event, "to_slug");
        if (from && to) {
          const key = `${from}→${to}`;
          const row = paths.get(key) ?? { count: 0, reasons: new Set() };
          row.count += 1;
          const reason =
            typeof event.props.reason === "string" ? event.props.reason : "";
          if (reason) row.reasons.add(reason);
          paths.set(key, row);
          touchCluster(from, "related");
          touchCluster(to, "related");
        }
        break;
      }
      case "category_explored": {
        const cat =
          (typeof event.props.category === "string" && event.props.category) ||
          (typeof event.props.category_filter === "string" &&
            event.props.category_filter) ||
          "";
        if (cat) bump(categories, cat.toLowerCase());
        break;
      }
      case "external_link_clicked": {
        const href =
          typeof event.props.href === "string" ? event.props.href : "";
        if (href) bump(external, hostOrHref(href));
        break;
      }
      default:
        break;
    }
  }

  const recommendationPaths: RecommendationPath[] = [...paths.entries()]
    .map(([key, row]) => {
      const [fromSlug, toSlug] = key.split("→");
      return {
        fromSlug,
        toSlug,
        count: row.count,
        reasons: [...row.reasons],
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  const clusterIds = new Set([
    ...clusterViews.keys(),
    ...clusterRelated.keys(),
  ]);
  const growingClusters: GrowingClusterSignal[] = [...clusterIds]
    .map((clusterId) => ({
      clusterId,
      viewCount: clusterViews.get(clusterId) ?? 0,
      relatedClickCount: clusterRelated.get(clusterId) ?? 0,
      memberSlugsTouched: [...(clusterMembers.get(clusterId) ?? [])],
    }))
    .filter((c) => c.viewCount + c.relatedClickCount > 0)
    .sort(
      (a, b) =>
        b.viewCount +
        b.relatedClickCount -
        (a.viewCount + a.relatedClickCount),
    )
    .slice(0, limit);

  return {
    eventCount: events.length,
    popularEntries: topCounts(views, limit),
    risingSearches: topCounts(searches, limit),
    failedSearches: topCounts(failed, limit),
    categoryExploration: topCounts(categories, limit),
    recommendationPaths,
    growingClusters,
    externalLinkClicks: topCounts(external, limit),
  };
}

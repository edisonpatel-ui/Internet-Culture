/**
 * Content coverage / gap registry (internal).
 *
 * Tracks important missing or planned encyclopedia topics before articles exist.
 * Seed data lives in contentRoadmap.ts (~100 expansion entries).
 * No database, UI, API, or AI — curated TypeScript seeds only.
 *
 * Docs: docs/CONTENT_COVERAGE.md, docs/CONTENT_EXPANSION_ROADMAP.md
 */

import type { BaseEntry, CulturalEra } from "@/types";
import type { ValidationIssue } from "@/lib/content/validation/types";
import { CULTURAL_CLUSTERS } from "./clusters";
import { CONTENT_EXPANSION_ROADMAP } from "./contentRoadmap";
import type {
  ContentGapCategory,
  ContentGapEntry,
  ContentGapImportance,
  ContentGapStatus,
  RoadmapEraId,
  RoadmapPriority,
} from "./contentGapTypes";

export type {
  ContentGapCategory,
  ContentGapEntry,
  ContentGapImportance,
  ContentGapStatus,
  RoadmapEraId,
  RoadmapPriority,
} from "./contentGapTypes";

/**
 * Planned / missing coverage registry (= expansion roadmap rows).
 */
export const CONTENT_GAP_REGISTRY: readonly ContentGapEntry[] =
  CONTENT_EXPANSION_ROADMAP;

const GAP_CATEGORIES = new Set<ContentGapCategory>([
  "meme",
  "slang",
  "trend",
  "creator",
  "platform",
  "event",
  "community",
]);

const GAP_IMPORTANCE = new Set<ContentGapImportance>([
  "high",
  "medium",
  "low",
]);

const GAP_STATUS = new Set<ContentGapStatus>([
  "missing",
  "planned",
  "drafted",
  "published",
]);

const ERAS = new Set<CulturalEra>([
  "pre-internet",
  "early-web",
  "web-2",
  "social",
  "short-form",
  "gen-alpha",
  "unknown",
]);

const ROADMAP_ERAS = new Set<RoadmapEraId>([
  "early-internet",
  "web-2",
  "social-media",
  "tiktok-modern",
]);

const ROADMAP_PRIORITIES = new Set<RoadmapPriority>([1, 2, 3]);

const CLUSTER_IDS = new Set(CULTURAL_CLUSTERS.map((c) => c.id));

export function asEraList(
  era: CulturalEra | CulturalEra[],
): CulturalEra[] {
  return Array.isArray(era) ? era : [era];
}

/** Map gap category → article category when creating content. */
export function gapCategoryToArticleCategory(
  category: ContentGapCategory,
): BaseEntry["category"] {
  if (category === "platform" || category === "community") return "trend";
  if (category === "trend") return "trend";
  return category;
}

export function listContentGapsByStatus(
  status: ContentGapStatus,
): ContentGapEntry[] {
  return CONTENT_GAP_REGISTRY.filter((g) => g.status === status);
}

export function listOpenContentGaps(): ContentGapEntry[] {
  return CONTENT_GAP_REGISTRY.filter((g) => g.status !== "published");
}

export function getContentGapById(id: string): ContentGapEntry | undefined {
  return CONTENT_GAP_REGISTRY.find((g) => g.id === id);
}

export function getContentGapBySlug(
  suggestedSlug: string,
): ContentGapEntry | undefined {
  return CONTENT_GAP_REGISTRY.find((g) => g.suggestedSlug === suggestedSlug);
}

const IMPORTANCE_RANK: Record<ContentGapImportance, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

/** Open gaps sorted by roadmap priority, then importance, then name. */
export function prioritizeContentGaps(
  gaps: readonly ContentGapEntry[] = listOpenContentGaps(),
): ContentGapEntry[] {
  return [...gaps].sort((a, b) => {
    const pa = a.priority ?? 2;
    const pb = b.priority ?? 2;
    if (pa !== pb) return pa - pb;
    const byImp = IMPORTANCE_RANK[a.importance] - IMPORTANCE_RANK[b.importance];
    if (byImp !== 0) return byImp;
    return a.name.localeCompare(b.name);
  });
}

function missingField(
  issues: ValidationIssue[],
  id: string,
  field: string,
) {
  issues.push({
    severity: "error",
    code: "CONTENT_GAP_MISSING_FIELD",
    message: `Content gap "${id}" is missing required field: ${field}`,
    slug: id,
  });
}

/**
 * Structural validation for CONTENT_GAP_REGISTRY.
 * Errors block publish (via npm run validate). Status/catalog mismatches warn.
 */
export function validateContentGapRegistry(
  catalog: BaseEntry[] = [],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const catalogSlugs = new Set(catalog.map((e) => e.slug));

  for (const gap of CONTENT_GAP_REGISTRY) {
    const id = typeof gap.id === "string" ? gap.id.trim() : "";
    if (!id) {
      missingField(issues, "(unknown)", "id");
      continue;
    }

    if (seenIds.has(id)) {
      issues.push({
        severity: "error",
        code: "CONTENT_GAP_DUPLICATE_ID",
        message: `Duplicate content gap id "${id}"`,
        slug: id,
      });
    }
    seenIds.add(id);

    if (!gap.name?.trim()) missingField(issues, id, "name");
    if (!gap.suggestedSlug?.trim()) missingField(issues, id, "suggestedSlug");
    if (!gap.reason?.trim()) missingField(issues, id, "reason");

    if (!Array.isArray(gap.relatedTopics)) {
      missingField(issues, id, "relatedTopics");
    }

    if (!GAP_CATEGORIES.has(gap.category)) {
      issues.push({
        severity: "error",
        code: "CONTENT_GAP_INVALID_CATEGORY",
        message: `Content gap "${id}" has invalid category "${String(gap.category)}"`,
        slug: id,
      });
    }

    if (!GAP_IMPORTANCE.has(gap.importance)) {
      issues.push({
        severity: "error",
        code: "CONTENT_GAP_INVALID_IMPORTANCE",
        message: `Content gap "${id}" has invalid importance "${String(gap.importance)}"`,
        slug: id,
      });
    }

    if (!GAP_STATUS.has(gap.status)) {
      issues.push({
        severity: "error",
        code: "CONTENT_GAP_INVALID_STATUS",
        message: `Content gap "${id}" has invalid status "${String(gap.status)}"`,
        slug: id,
      });
    }

    if (gap.roadmapEra != null && !ROADMAP_ERAS.has(gap.roadmapEra)) {
      issues.push({
        severity: "error",
        code: "CONTENT_GAP_INVALID_ROADMAP_ERA",
        message: `Content gap "${id}" has invalid roadmapEra "${String(gap.roadmapEra)}"`,
        slug: id,
      });
    }

    if (gap.priority != null && !ROADMAP_PRIORITIES.has(gap.priority)) {
      issues.push({
        severity: "error",
        code: "CONTENT_GAP_INVALID_PRIORITY",
        message: `Content gap "${id}" has invalid priority "${String(gap.priority)}" (use 1–3)`,
        slug: id,
      });
    }

    // Roadmap rows should carry era + priority
    if (gap.roadmapEra == null) {
      issues.push({
        severity: "warning",
        code: "CONTENT_GAP_MISSING_ROADMAP_ERA",
        message: `Content gap "${id}" is missing roadmapEra`,
        slug: id,
      });
    }
    if (gap.priority == null) {
      issues.push({
        severity: "warning",
        code: "CONTENT_GAP_MISSING_PRIORITY",
        message: `Content gap "${id}" is missing priority`,
        slug: id,
      });
    }

    const slug = gap.suggestedSlug?.trim() ?? "";
    if (slug) {
      if (seenSlugs.has(slug)) {
        issues.push({
          severity: "error",
          code: "CONTENT_GAP_DUPLICATE_SLUG",
          message: `Duplicate planned content gap slug "${slug}"`,
          slug: id,
        });
      }
      seenSlugs.add(slug);

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        issues.push({
          severity: "error",
          code: "CONTENT_GAP_INVALID_SLUG",
          message: `Content gap "${id}" suggestedSlug must be lowercase kebab-case`,
          slug: id,
        });
      }
    }

    for (const era of asEraList(gap.culturalEra ?? "unknown")) {
      if (!ERAS.has(era)) {
        issues.push({
          severity: "error",
          code: "CONTENT_GAP_INVALID_ERA",
          message: `Content gap "${id}" has invalid culturalEra "${era}"`,
          slug: id,
        });
      }
    }

    if (gap.clusters) {
      for (const clusterId of gap.clusters) {
        if (!CLUSTER_IDS.has(clusterId)) {
          issues.push({
            severity: "error",
            code: "CONTENT_GAP_INVALID_CLUSTER",
            message: `Content gap "${id}" references unknown cluster "${clusterId}"`,
            slug: id,
          });
        }
      }
    }

    if (catalog.length === 0) continue;

    if (gap.status === "published" && slug && !catalogSlugs.has(slug)) {
      issues.push({
        severity: "warning",
        code: "CONTENT_GAP_PUBLISHED_MISSING",
        message: `Content gap "${id}" is marked published but slug "${slug}" is not in the catalog`,
        slug: id,
      });
    }

    if (gap.status !== "published" && slug && catalogSlugs.has(slug)) {
      issues.push({
        severity: "warning",
        code: "CONTENT_GAP_STATUS_STALE",
        message: `Content gap "${id}" status is "${gap.status}" but "${slug}" already exists — set status to "published"`,
        slug: id,
      });
    }
  }

  return issues;
}

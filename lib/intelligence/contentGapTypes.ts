/**
 * Shared types for content gap / expansion roadmap planning.
 * Kept separate to avoid circular imports with contentRoadmap.ts.
 */

import type { CulturalEra } from "@/types";
import type { CulturalClusterId } from "./clusters";

/**
 * Gap-planning categories.
 * `platform` and `community` are planning labels — articles usually land in
 * `trend` / `event` folders (see gapCategoryToArticleCategory).
 */
export type ContentGapCategory =
  | "meme"
  | "slang"
  | "trend"
  | "creator"
  | "platform"
  | "event"
  | "community";

export type ContentGapImportance = "high" | "medium" | "low";

export type ContentGapStatus =
  | "missing"
  | "planned"
  | "drafted"
  | "published";

/** Suggested build order: 1 = soonest, 3 = later fill-in. */
export type RoadmapPriority = 1 | 2 | 3;

/** Strategic era buckets for the expansion roadmap. */
export type RoadmapEraId =
  | "early-internet" // 1990s–2005
  | "web-2" // 2005–2015
  | "social-media" // 2015–2020
  | "tiktok-modern"; // 2020–present

/**
 * One curated coverage-gap / roadmap row.
 * Does not create an article — plan and prioritize only.
 */
export interface ContentGapEntry {
  /** Stable registry id (unique). */
  id: string;
  /** Human-readable entry name. */
  name: string;
  /** Suggested canonical slug when an article is created. */
  suggestedSlug: string;
  category: ContentGapCategory;
  importance: ContentGapImportance;
  /** Cultural era bucket(s) — same vocabulary as CulturalIntelligence. */
  culturalEra: CulturalEra | CulturalEra[];
  /** Related topic labels and/or existing catalog slugs. */
  relatedTopics: string[];
  /** Cultural cluster ids (from clusters.ts). */
  clusters?: CulturalClusterId[];
  status: ContentGapStatus;
  /** Why this topic matters for the encyclopedia. */
  reason: string;
  /** Existing slugs that partially satisfy the need. */
  satisfiedBy?: string[];
  /** Title/slug/tag phrases that imply coverage. */
  matchHints?: string[];
  /** Curator notes (not public). */
  notes?: string;
  /** Roadmap era bucket (required on expansion roadmap rows). */
  roadmapEra?: RoadmapEraId;
  /** Suggested build priority (1 = highest urgency). */
  priority?: RoadmapPriority;
}

/**
 * Classification models — reusable classifiers for topics (RC3-D).
 * Structures for future tooling; does not classify live content automatically.
 */

import type { TaxonomyTopLevel } from "./taxonomy";
import type { InternetHistoryEraId } from "./internetHistory";
import type { PlatformCultureId } from "./platformCulture";
import type { CommunityTaxonomyId } from "./communityTaxonomy";

export type ContentMaturity =
  | "emerging"
  | "established"
  | "declining"
  | "legacy"
  | "unknown";

export type ResearchDifficulty = "low" | "medium" | "high" | "extreme";

/**
 * Suggested classification envelope for a topic under research.
 * Always human-reviewed before affecting catalog category.
 */
export interface TopicClassification {
  primaryCategory: TaxonomyTopLevel;
  secondaryCategories: TaxonomyTopLevel[];
  era?: InternetHistoryEraId;
  platforms: PlatformCultureId[];
  communities: CommunityTaxonomyId[];
  topics: string[];
  relatedConcepts: string[];
  aliases: string[];
  contentMaturity: ContentMaturity;
  researchDifficulty: ResearchDifficulty;
  notes: string[];
  requiresHumanReview: true;
}

export function createTopicClassification(
  partial: Omit<TopicClassification, "requiresHumanReview">,
): TopicClassification {
  return { ...partial, requiresHumanReview: true };
}

/** Lightweight guardrails for classification envelopes. */
export function validateTopicClassificationShape(
  c: TopicClassification,
): string[] {
  const issues: string[] = [];
  if (!c.primaryCategory) issues.push("primaryCategory required");
  if (c.secondaryCategories.includes(c.primaryCategory)) {
    issues.push("secondaryCategories should not repeat primaryCategory");
  }
  if (!c.requiresHumanReview) {
    issues.push("requiresHumanReview must be true");
  }
  return issues;
}

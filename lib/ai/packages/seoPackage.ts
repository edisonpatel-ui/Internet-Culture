/**
 * SEO review package — recommendations only (RC3-B).
 *
 * Does not change metadata, sitemap, or public pages.
 */

import type { AIDraftCategory } from "../types";

export interface SeoInternalLinkOpportunity {
  targetSlug: string;
  reason: string;
}

export interface SeoReviewPackage {
  title: string;
  slug: string;
  category: AIDraftCategory;
  titleQuality: string;
  metaDescriptionQuality: string;
  slugQuality: string;
  /** Optional suggested meta description for human approval. */
  suggestedMetaDescription?: string;
  keywordCoverage: string[];
  internalLinkingOpportunities: SeoInternalLinkOpportunity[];
  relatedArticleSuggestions: string[];
  schemaRecommendations: string[];
  imageOpportunities: string[];
  risks: string[];
  requiresHumanReview: true;
}

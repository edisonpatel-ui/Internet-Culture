/**
 * Content entry candidate — publish prep only (Phase 5).
 * Never written automatically to lib/content.
 */

import type { AIDraftCategory } from "@/lib/ai/types";
import type { ApprovedDraft } from "@/lib/ai/packages";

export interface ContentEntryCandidate {
  category: AIDraftCategory;
  slug: string;
  title: string;
  description: string;
  fields: {
    origin: string;
    history: string;
    culturalSignificance: string;
    relatedTopics: string[];
    aliases: string[];
    tags: string[];
    sources: Array<{ title: string; url?: string }>;
    mediaPlaceholders: Array<{
      role: string;
      title: string;
      searchHint?: string;
      verified: false;
    }>;
    seo: {
      metaTitle?: string;
      metaDescription?: string;
      primaryKeyword?: string;
    };
  };
  /** Provenance for editors. */
  fromApprovedDraftId: string;
  fromDraftPackageId: string;
}

export function approvedDraftToContentCandidate(
  approved: ApprovedDraft,
): ContentEntryCandidate {
  const pkg = approved.draftPackage;
  return {
    category: pkg.category,
    slug: pkg.slugSuggestion,
    title: pkg.title,
    description: pkg.summary,
    fields: {
      origin: pkg.origin,
      history: pkg.history,
      culturalSignificance: pkg.culturalSignificance,
      relatedTopics: pkg.relatedTopics,
      aliases: pkg.aliases,
      tags: pkg.tags,
      sources: pkg.suggestedSources.map((s) => ({
        title: s.title,
        url: s.url,
      })),
      mediaPlaceholders: pkg.suggestedMedia.map((m) => ({
        role: m.role,
        title: m.title,
        searchHint: m.searchHint,
        verified: false as const,
      })),
      seo: {
        metaTitle: pkg.seoMetadata?.metaTitle,
        metaDescription: pkg.seoMetadata?.metaDescription,
        primaryKeyword: pkg.seoMetadata?.primaryKeyword,
      },
    },
    fromApprovedDraftId: approved.id,
    fromDraftPackageId: pkg.id,
  };
}

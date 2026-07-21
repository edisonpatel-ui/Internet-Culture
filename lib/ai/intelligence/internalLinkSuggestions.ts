/**
 * Internal linking suggestions — structured recommendations only (RC3-C).
 *
 * Does not modify content or relatedSlugs.
 */

export type LinkSuggestionKind =
  | "related_article"
  | "missing_article"
  | "hub_page"
  | "creator_page"
  | "platform_page";

export interface InternalLinkSuggestion {
  kind: LinkSuggestionKind;
  /** Existing path or slug when known (e.g. /brainrot, pepe). */
  target?: string;
  label: string;
  reason: string;
  /** For missing_article — suggested future slug. */
  suggestedSlug?: string;
}

export interface InternalLinkSuggestionResult {
  fromSlug?: string;
  fromTitle: string;
  suggestions: InternalLinkSuggestion[];
  requiresHumanReview: true;
}

export function buildInternalLinkSuggestions(
  fromTitle: string,
  suggestions: InternalLinkSuggestion[],
  fromSlug?: string,
): InternalLinkSuggestionResult {
  return {
    fromSlug,
    fromTitle,
    suggestions,
    requiresHumanReview: true,
  };
}

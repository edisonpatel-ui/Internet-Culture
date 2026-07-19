/**
 * Typed analytics event names for ICH growth measurement.
 * Payloads stay anonymous — no PII, emails, or user IDs.
 *
 * Phase 7D adds intelligence-oriented event names. Existing UI may keep using
 * legacy names; the intelligence layer normalizes both (see
 * `lib/intelligence/analyticsEvents.ts`). Do not dual-write a second track API.
 */

export const ANALYTICS_EVENTS = {
  SEARCH: "search",
  SEARCH_RESULT_CLICK: "search_result_click",
  CATEGORY_FILTER: "category_filter",
  TOPIC_FILTER: "topic_filter",
  RELATED_CLICK: "related_article_click",
  TOPIC_LINK_CLICK: "topic_link_click",
  HUB_CLICK: "hub_click",
  HOME_SEARCH_SUBMIT: "home_search_submit",

  // Phase 7D — intelligence analytics foundation (typed; wire into UI later)
  ENTRY_VIEWED: "entry_viewed",
  SEARCH_NO_RESULT: "search_no_result",
  CATEGORY_EXPLORED: "category_explored",
  EXTERNAL_LINK_CLICKED: "external_link_clicked",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Vercel Analytics custom props — strings / numbers / booleans only. */
export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface SearchEventProps {
  query: string;
  result_count: number;
  category_filter?: string;
  topic_filter?: string;
}

export interface SearchNoResultProps {
  query: string;
  category_filter?: string;
  topic_filter?: string;
}

export interface SearchResultClickProps {
  query: string;
  slug: string;
  category: string;
  position: number;
}

export interface RelatedClickProps {
  from_slug: string;
  to_slug: string;
  reason?: string;
}

export interface TopicLinkClickProps {
  href: string;
  label: string;
  from_slug?: string;
}

export interface EntryViewedProps {
  slug: string;
  category: string;
  /** Optional discovery source (search, related, hub, direct, …). */
  source?: string;
}

export interface CategoryExploredProps {
  category: string;
  /** Listing path or hub id when known. */
  surface?: string;
}

export interface ExternalLinkClickedProps {
  href: string;
  from_slug?: string;
  label?: string;
  /** e.g. source, media, reference */
  link_kind?: string;
}

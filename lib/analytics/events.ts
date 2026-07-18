/**
 * Typed analytics event names for ICH growth measurement.
 * Payloads stay anonymous — no PII, emails, or user IDs.
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

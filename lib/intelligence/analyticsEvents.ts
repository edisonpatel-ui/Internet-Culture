/**
 * Intelligence analytics event model (Phase 7D — internal).
 *
 * Typed events compatible with `lib/analytics` (same prop shape / trackEvent).
 * Normalizes legacy + Phase 7D event names into a stable intelligence vocabulary.
 *
 * Architecture only — does not change public UI or search behavior.
 */

import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
  type AnalyticsProps,
} from "@/lib/analytics/events";

/** Stable intelligence event kinds (internal vocabulary). */
export type IntelligenceAnalyticsEventKind =
  | "entry_viewed"
  | "search_performed"
  | "search_no_result"
  | "related_entry_clicked"
  | "category_explored"
  | "external_link_clicked";

/**
 * Normalized event for intelligence aggregation.
 * Props stay AnalyticsProps-compatible (no PII).
 */
export interface IntelligenceAnalyticsEvent {
  kind: IntelligenceAnalyticsEventKind;
  /** ISO-8601 timestamp when known; empty string if unknown. */
  at: string;
  props: AnalyticsProps;
  /** Original provider event name when ingested from analytics. */
  sourceEvent?: string;
}

/** Map intelligence kinds → canonical analytics event names for future tracking. */
export const INTELLIGENCE_TO_ANALYTICS_EVENT: Record<
  IntelligenceAnalyticsEventKind,
  AnalyticsEventName
> = {
  entry_viewed: ANALYTICS_EVENTS.ENTRY_VIEWED,
  search_performed: ANALYTICS_EVENTS.SEARCH,
  search_no_result: ANALYTICS_EVENTS.SEARCH_NO_RESULT,
  related_entry_clicked: ANALYTICS_EVENTS.RELATED_CLICK,
  category_explored: ANALYTICS_EVENTS.CATEGORY_EXPLORED,
  external_link_clicked: ANALYTICS_EVENTS.EXTERNAL_LINK_CLICKED,
};

function asString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number") return String(value);
  return undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return undefined;
}

/**
 * Normalize a raw analytics event into an intelligence event.
 * Returns null for unrecognized / non-intelligence events.
 */
export function normalizeAnalyticsEvent(
  name: string,
  props: AnalyticsProps = {},
  at = "",
): IntelligenceAnalyticsEvent | null {
  const n = name.toLowerCase().trim();

  if (n === ANALYTICS_EVENTS.ENTRY_VIEWED || n === "entry_view" || n === "page_view_entry") {
    return {
      kind: "entry_viewed",
      at,
      props,
      sourceEvent: name,
    };
  }

  if (n === ANALYTICS_EVENTS.SEARCH_NO_RESULT) {
    return { kind: "search_no_result", at, props, sourceEvent: name };
  }

  if (n === ANALYTICS_EVENTS.SEARCH || n === ANALYTICS_EVENTS.HOME_SEARCH_SUBMIT) {
    const count = asNumber(props.result_count);
    if (count === 0) {
      return { kind: "search_no_result", at, props, sourceEvent: name };
    }
    return { kind: "search_performed", at, props, sourceEvent: name };
  }

  if (n === ANALYTICS_EVENTS.RELATED_CLICK) {
    return {
      kind: "related_entry_clicked",
      at,
      props,
      sourceEvent: name,
    };
  }

  if (
    n === ANALYTICS_EVENTS.CATEGORY_EXPLORED ||
    n === ANALYTICS_EVENTS.CATEGORY_FILTER ||
    n === ANALYTICS_EVENTS.HUB_CLICK
  ) {
    return {
      kind: "category_explored",
      at,
      props: {
        ...props,
        category:
          asString(props.category) ??
          asString(props.category_filter) ??
          asString(props.hub) ??
          props.category,
      },
      sourceEvent: name,
    };
  }

  if (
    n === ANALYTICS_EVENTS.EXTERNAL_LINK_CLICKED ||
    n === ANALYTICS_EVENTS.TOPIC_LINK_CLICK
  ) {
    return {
      kind: "external_link_clicked",
      at,
      props,
      sourceEvent: name,
    };
  }

  return null;
}

/** Batch-normalize raw analytics rows. */
export function normalizeAnalyticsEvents(
  rows: Array<{ name: string; props?: AnalyticsProps; at?: string }>,
): IntelligenceAnalyticsEvent[] {
  const out: IntelligenceAnalyticsEvent[] = [];
  for (const row of rows) {
    const ev = normalizeAnalyticsEvent(row.name, row.props ?? {}, row.at ?? "");
    if (ev) out.push(ev);
  }
  return out;
}

/** Build a trackable payload from an intelligence event (for future wiring). */
export function toTrackableAnalyticsEvent(event: IntelligenceAnalyticsEvent): {
  name: AnalyticsEventName;
  props: AnalyticsProps;
} {
  return {
    name: INTELLIGENCE_TO_ANALYTICS_EVENT[event.kind],
    props: event.props,
  };
}

export function getEventQuery(event: IntelligenceAnalyticsEvent): string | undefined {
  return asString(event.props.query)?.toLowerCase();
}

export function getEventSlug(
  event: IntelligenceAnalyticsEvent,
  key: "slug" | "from_slug" | "to_slug" = "slug",
): string | undefined {
  return asString(event.props[key])?.toLowerCase();
}

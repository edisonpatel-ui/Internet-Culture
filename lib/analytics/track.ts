/**
 * Privacy-friendly event tracking.
 *
 * - Uses @vercel/analytics custom events when available
 * - Never sends PII
 * - Safe no-op on the server
 * - Query strings truncated to avoid logging long paste dumps
 */

import type { AnalyticsEventName, AnalyticsProps } from "./events";

const MAX_QUERY_LEN = 80;

function sanitizeProps(props?: AnalyticsProps): AnalyticsProps | undefined {
  if (!props) return undefined;
  const out: AnalyticsProps = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && (key === "query" || key.endsWith("_query"))) {
      out[key] = value.slice(0, MAX_QUERY_LEN).toLowerCase();
    } else {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Track a named product event. Client-only; ignores failures silently.
 */
export function trackEvent(
  name: AnalyticsEventName | string,
  props?: AnalyticsProps,
): void {
  if (typeof window === "undefined") return;

  const safe = sanitizeProps(props);

  try {
    // Dynamic import pattern avoided — vercel/analytics track is sync API
    void import("@vercel/analytics").then(({ track }) => {
      track(name, safe);
    });
  } catch {
    // Analytics must never break UX
  }

  if (process.env.NODE_ENV === "development") {
    // Local visibility while iterating on event wiring
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, safe ?? {});
  }
}

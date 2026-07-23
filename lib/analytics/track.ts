/**
 * Privacy-friendly event tracking.
 *
 * - Custom events → Vercel Analytics backend (primary)
 * - Same events fan out to GA4 when enabled (parallel; does not replace Vercel)
 * - Page views for GA4 are owned by GoogleAnalytics / GaPageViews (not here)
 * - Never sends PII
 * - Safe no-op on the server
 */

import type { AnalyticsEventName, AnalyticsProps } from "./events";
import { getAnalyticsBackend } from "./provider";
import { trackGaEvent } from "./ga";

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
    void getAnalyticsBackend().track(name, safe);
  } catch {
    // Analytics must never break UX
  }

  try {
    trackGaEvent(name, safe);
  } catch {
    // GA4 must never break UX
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, safe ?? {});
  }
}

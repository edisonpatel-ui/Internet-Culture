/**
 * Google Analytics 4 (gtag.js) helpers.
 *
 * Separate from Vercel Analytics — page views are handled by GoogleAnalytics
 * scripts; custom events may fan out from {@link trackEvent}.
 */

import type { AnalyticsProps } from "./events";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Measurement ID from env (e.g. G-XXXXXXXX). */
export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

/**
 * GA4 loads only in production builds with a configured measurement ID.
 * Local `next dev` never injects the tag.
 */
export function isGaEnabled(): boolean {
  return (
    process.env.NODE_ENV === "production" && Boolean(getGaMeasurementId())
  );
}

/** Send a GA4 page_view (App Router soft navigations). */
export function trackGaPageView(url: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  const id = getGaMeasurementId();
  if (!id) return;
  window.gtag("event", "page_view", {
    page_path: url,
    send_to: id,
  });
}

/**
 * Forward a custom event to GA4 when the tag is loaded.
 * No-op in development or before gtag is ready.
 */
export function trackGaEvent(
  name: string,
  props?: AnalyticsProps,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!isGaEnabled()) return;

  const params: Record<string, string | number | boolean> = {};
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null) continue;
      params[key] = value;
    }
  }

  window.gtag("event", name, params);
}

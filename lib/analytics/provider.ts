/**
 * Analytics backend port — Vercel is the primary custom-event backend.
 *
 * GA4 page views / gtag live in `components/analytics/GoogleAnalytics.tsx`
 * and `lib/analytics/ga.ts` (parallel stack — not a replacement for Vercel).
 * Do not add a second parallel trackEvent API for callers.
 */

import type { AnalyticsProps } from "./events";

export interface AnalyticsBackend {
  readonly name: string;
  track(event: string, props?: AnalyticsProps): void | Promise<void>;
}

/**
 * Default backend: @vercel/analytics custom events.
 * Lazy-loaded so the module graph stays light on the server.
 */
export const vercelAnalyticsBackend: AnalyticsBackend = {
  name: "vercel",
  track(event, props) {
    if (typeof window === "undefined") return;
    void import("@vercel/analytics").then(({ track }) => {
      track(event, props);
    });
  },
};

/** Active backend — swap here when a second vendor is deliberately added. */
let activeBackend: AnalyticsBackend = vercelAnalyticsBackend;

export function getAnalyticsBackend(): AnalyticsBackend {
  return activeBackend;
}

/** Test / future multi-provider hook — not used in production UI. */
export function setAnalyticsBackend(backend: AnalyticsBackend): void {
  activeBackend = backend;
}

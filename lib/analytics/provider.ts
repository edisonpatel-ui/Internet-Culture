/**
 * Analytics backend port — Vercel is the current implementation.
 *
 * Future vendors (Plausible, GA4, etc.) should implement {@link AnalyticsBackend}
 * and be selected in `track.ts`. Do not add a second parallel trackEvent API.
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

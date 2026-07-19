import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics (official App Router integration).
 * Mounted from the root layout — page views only; no UI.
 */
export function AnalyticsProvider() {
  return <Analytics />;
}

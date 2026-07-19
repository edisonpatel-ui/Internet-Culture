import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "./GoogleAnalytics";

/**
 * Site analytics mount point (root layout via app/layout.tsx).
 * - Vercel Web Analytics — page views / custom events
 * - Vercel Speed Insights — Core Web Vitals (separate product; not pageview tracking)
 * - GA4 (gtag.js) — separate, production-only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 */
export function AnalyticsProvider() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics />
    </>
  );
}

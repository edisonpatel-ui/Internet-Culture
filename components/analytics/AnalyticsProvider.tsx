import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "./GoogleAnalytics";

/**
 * Site analytics mount point (root layout).
 * - Vercel Web Analytics — page views / custom events via @vercel/analytics
 * - GA4 (gtag.js) — separate, production-only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 */
export function AnalyticsProvider() {
  return (
    <>
      <Analytics />
      <GoogleAnalytics />
    </>
  );
}

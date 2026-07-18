"use client";

import { Analytics } from "@vercel/analytics/react";

/**
 * Privacy-friendly page-view analytics (Vercel Analytics).
 * No cookies / no PII by design of the provider.
 */
export function AnalyticsProvider() {
  return <Analytics />;
}

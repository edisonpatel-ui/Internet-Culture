import Script from "next/script";
import { Suspense } from "react";
import { getGaMeasurementId, isGaEnabled } from "@/lib/analytics/ga";
import { GaPageViews } from "./GaPageViews";

/**
 * Official gtag.js GA4 integration for the App Router.
 * Production-only; separate from Vercel Web Analytics.
 *
 * Page views: send_page_view disabled on config — {@link GaPageViews}
 * owns all page_view events (initial + client navigations) to avoid duplicates.
 */
export function GoogleAnalytics() {
  if (!isGaEnabled()) return null;

  const measurementId = getGaMeasurementId();
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: false });
        `.trim()}
      </Script>
      <Suspense fallback={null}>
        <GaPageViews />
      </Suspense>
    </>
  );
}

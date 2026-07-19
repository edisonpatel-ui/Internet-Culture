"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isGaEnabled, trackGaPageView } from "@/lib/analytics/ga";

/**
 * Single page_view source for GA4 (initial load + App Router navigations).
 * Pairs with gtag config `{ send_page_view: false }` to avoid double counting.
 */
export function GaPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!isGaEnabled()) return;

    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;

    if (lastUrl.current === url) return;
    lastUrl.current = url;

    trackGaPageView(url);
  }, [pathname, searchParams]);

  return null;
}

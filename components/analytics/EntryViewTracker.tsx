"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { ContentCategory } from "@/types";

interface EntryViewTrackerProps {
  slug: string;
  category: ContentCategory;
}

/**
 * Fires once per mount when an encyclopedia entry page is viewed.
 * Safe no-op if analytics backends are unavailable.
 */
export function EntryViewTracker({ slug, category }: EntryViewTrackerProps) {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.ENTRY_VIEWED, { slug, category });
  }, [slug, category]);

  return null;
}

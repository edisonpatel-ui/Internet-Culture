import { TrendGridSection } from "@/components/sections/TrendGridSection";
import type { BaseEntry } from "@/types";

interface TrendingNowSectionProps {
  entries: BaseEntry[];
  limit?: number;
}

/**
 * Reusable "Trending Now" block. Pass pre-scored entries from
 * `selectTrendingNow()` (or any future scoring source).
 */
export function TrendingNowSection({
  entries,
  limit = 6,
}: TrendingNowSectionProps) {
  if (entries.length === 0) return null;

  return (
    <TrendGridSection
      id="trending-now"
      title="Trending Now"
      description="What the internet is talking about right now."
      entries={entries}
      limit={limit}
      href="/trending"
      linkLabel="See all trending"
    />
  );
}

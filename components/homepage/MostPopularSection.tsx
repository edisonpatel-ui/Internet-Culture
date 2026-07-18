import { TrendGridSection } from "@/components/sections/TrendGridSection";
import type { BaseEntry } from "@/types";

interface MostPopularSectionProps {
  entries: BaseEntry[];
  limit?: number;
  href?: string;
  linkLabel?: string;
}

/**
 * Reusable popularity grid. Pass entries from `selectMostPopular()`
 * (popularityScore → scores.popularity → views).
 */
export function MostPopularSection({
  entries,
  limit = 6,
  href = "/rankings",
  linkLabel = "Full rankings",
}: MostPopularSectionProps) {
  if (entries.length === 0) return null;

  return (
    <TrendGridSection
      id="most-popular"
      title="Most Popular"
      description="The most visited entries across the encyclopedia."
      entries={entries}
      limit={limit}
      href={href}
      linkLabel={linkLabel}
    />
  );
}

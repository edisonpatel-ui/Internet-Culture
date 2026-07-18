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
 * (catalog views via selectMostPopular).
 */
export function MostPopularSection({
  entries,
  limit = 6,
  href = "/rankings",
  linkLabel = "View all",
}: MostPopularSectionProps) {
  if (entries.length === 0) return null;

  return (
    <TrendGridSection
      id="most-popular"
      title="Most Popular"
      description="Highest catalog view counts right now."
      entries={entries}
      limit={limit}
      href={href}
      linkLabel={linkLabel}
    />
  );
}

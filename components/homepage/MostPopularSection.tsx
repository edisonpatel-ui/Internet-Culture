import { TrendGridSection } from "@/components/sections/TrendGridSection";
import type { BaseEntry } from "@/types";

interface MostPopularSectionProps {
  entries: BaseEntry[];
  limit?: number;
  href?: string;
  linkLabel?: string;
}

/**
 * High-relevance discovery grid. Pass entries from `selectMostPopular()`
 * (editorial relevance — not fabricated traffic).
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
      id="highest-relevance"
      title="High relevance"
      description="Entries with the strongest editorial relevance scores."
      entries={entries}
      limit={limit}
      href={href}
      linkLabel={linkLabel}
    />
  );
}

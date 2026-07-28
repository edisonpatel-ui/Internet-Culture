import { TrendGridSection } from "@/components/sections/TrendGridSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BaseEntry } from "@/types";

interface TrendingNowSectionProps {
  entries: BaseEntry[];
  limit?: number;
}

/**
 * Homepage "Trending Now" — sorted live by Current Popularity (scores.relevance).
 */
export function TrendingNowSection({
  entries,
  limit = 6,
}: TrendingNowSectionProps) {
  if (entries.length === 0) {
    return (
      <section id="trending-now" className="py-10 sm:py-14">
        <SectionHeader
          title="Trending Now"
          description="Sorted by highest Current Popularity. No entries yet."
        />
        <div className="surface rounded-xl px-5 py-8 text-center">
          <p className="text-sm text-zinc-400">
            Add encyclopedia entries with Current Popularity scores to populate
            this section.
          </p>
        </div>
      </section>
    );
  }

  return (
    <TrendGridSection
      id="trending-now"
      title="Trending Now"
      description="The most popular articles right now."
      entries={entries}
      limit={limit}
      href="/trending"
      linkLabel="View all"
    />
  );
}

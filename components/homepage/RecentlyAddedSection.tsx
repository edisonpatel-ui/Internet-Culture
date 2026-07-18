import { TrendGridSection } from "@/components/sections/TrendGridSection";
import type { BaseEntry } from "@/types";

interface RecentlyAddedSectionProps {
  entries: BaseEntry[];
  limit?: number;
}

/**
 * Auto-built from entry `addedAt` — no manually maintained list.
 */
export function RecentlyAddedSection({
  entries,
  limit = 6,
}: RecentlyAddedSectionProps) {
  if (entries.length === 0) return null;

  return (
    <TrendGridSection
      id="recently-added"
      title="Recently Added"
      description="Newest pages added to the catalog."
      entries={entries}
      limit={limit}
      href="/search"
      linkLabel="View all"
    />
  );
}

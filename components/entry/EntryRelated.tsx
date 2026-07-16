import { TrendCard } from "@/components/cards/TrendCard";
import type { BaseEntry } from "@/types";

interface EntryRelatedProps {
  entries: BaseEntry[];
  title?: string;
}

/** Renders a responsive grid of related entry cards. Returns null when empty. */
export function EntryRelated({ entries, title = "Related" }: EntryRelatedProps) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <TrendCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

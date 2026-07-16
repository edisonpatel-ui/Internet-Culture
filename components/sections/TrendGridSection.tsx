import { TrendCard } from "@/components/cards/TrendCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BaseEntry } from "@/types";

interface TrendGridSectionProps {
  emoji?: string;
  title: string;
  description?: string;
  entries: BaseEntry[];
  href?: string;
  linkLabel?: string;
  limit?: number;
  id?: string;
}

export function TrendGridSection({
  emoji,
  title,
  description,
  entries,
  href,
  linkLabel,
  limit,
  id,
}: TrendGridSectionProps) {
  const displayed = limit ? entries.slice(0, limit) : entries;

  return (
    <section id={id} className="py-10 sm:py-14">
      <SectionHeader
        emoji={emoji}
        title={title}
        description={description}
        href={href}
        linkLabel={linkLabel}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((entry) => (
          <TrendCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

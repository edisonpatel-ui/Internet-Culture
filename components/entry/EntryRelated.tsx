import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { getDetailHref } from "@/lib/utils";
import type { RelatedRecommendation } from "@/lib/intelligence";
import type { BaseEntry } from "@/types";

interface EntryRelatedProps {
  /** Preferred: recommendations with explainable reasons. */
  recommendations?: RelatedRecommendation[];
  /** Legacy: plain entries without reasons. */
  entries?: BaseEntry[];
  title?: string;
}

function RelatedCard({ item }: { item: RelatedRecommendation }) {
  const { entry, reasonLabel } = item;
  const href = getDetailHref(entry.category, entry.slug);

  return (
    <Link
      href={href}
      className="group glass-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-violet-500/5"
    >
      <EntryCardMedia
        entry={entry}
        aspect="video"
        className="rounded-none rounded-t-2xl"
      />
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white transition-colors group-hover:text-violet-200 line-clamp-2">
            {entry.title}
          </h3>
          <Badge category={entry.category} />
        </div>
        <span className="inline-flex w-fit rounded-full border border-violet-400/25 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-200">
          {reasonLabel}
        </span>
        <p className="flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {entry.description}
        </p>
      </div>
    </Link>
  );
}

/** Renders related entries with optional “why related” labels. */
export function EntryRelated({
  recommendations,
  entries,
  title = "Related",
}: EntryRelatedProps) {
  const items: RelatedRecommendation[] =
    recommendations ??
    (entries ?? []).map((entry) => ({
      entry,
      score: 0,
      reason: "editorial" as const,
      reasonLabel: "Related",
    }));

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RelatedCard key={item.entry.id} item={item} />
        ))}
      </div>
    </section>
  );
}

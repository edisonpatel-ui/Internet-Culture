"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { getDetailHref } from "@/lib/utils";
import type { RelatedRecommendation } from "@/lib/intelligence";
import type { BaseEntry } from "@/types";

interface EntryRelatedProps {
  /** Preferred: recommendations with explainable reasons. */
  recommendations?: RelatedRecommendation[];
  /** Legacy: plain entries without reasons. */
  entries?: BaseEntry[];
  title?: string;
  /** Source article slug for discovery analytics. */
  fromSlug?: string;
}

function RelatedCard({
  item,
  fromSlug,
}: {
  item: RelatedRecommendation;
  fromSlug?: string;
}) {
  const { entry, reasonLabel, reason } = item;
  const href = getDetailHref(entry.category, entry.slug);

  return (
    <Link
      href={href}
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.RELATED_CLICK, {
          from_slug: fromSlug ?? "",
          to_slug: entry.slug,
          reason: reason,
        });
      }}
      className="group glass-card flex h-full flex-col overflow-hidden transition-colors duration-200 hover:-translate-y-0.5 hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
    >
      <div className="p-5">
        <EntryCardMedia entry={entry} aspect="video" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white transition-colors group-hover:text-violet-200 line-clamp-2">
            {entry.title}
          </h3>
          <Badge category={entry.category} />
        </div>
        <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
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
  title = "Related entries",
  fromSlug,
}: EntryRelatedProps) {
  const items: RelatedRecommendation[] =
    recommendations ??
    (entries ?? []).map((entry) => ({
      entry,
      score: 0,
      reason: "editorial" as const,
      reasonLabel: "Linked",
    }));

  if (items.length === 0) return null;

  return (
    <section
      className="mb-10 mt-4"
      aria-labelledby="entry-related-heading"
    >
      <h2
        id="entry-related-heading"
        className="mb-2 text-xl font-semibold tracking-tight text-white sm:text-2xl"
      >
        {title}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-zinc-500">
        Culturally linked — not random recommendations.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RelatedCard
            key={item.entry.id}
            item={item}
            fromSlug={fromSlug}
          />
        ))}
      </div>
    </section>
  );
}

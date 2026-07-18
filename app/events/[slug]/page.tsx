import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getEventBySlug, getAllEventSlugs } from "@/lib/content/events";
import { getRelatedRecommendations } from "@/lib/intelligence";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  DetailPageLayout,
  ContentBlock,
  Timeline,
  ArticleMetadata,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntryRelated } from "@/components/entry/EntryRelated";
import { EntrySources } from "@/components/entry/EntrySources";
import { ArticleMediaSection } from "@/components/media/ArticleMediaSection";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return createMetadata({
    title: event.title,
    description: event.description,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const related = getRelatedRecommendations(event, getAllEntriesSync(), 6);

  const jsonLd = createArticleJsonLd({
    title: event.title,
    description: event.description,
    path: `/events/${slug}`,
    datePublished: event.addedAt,
    breadcrumbs: [
      { name: "Events", path: "/events" },
      { name: event.title, path: `/events/${slug}` },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DetailPageLayout backHref="/events" backLabel="All Events">

        {/* 1. Hero */}
        <EntryHero
          entry={event}
          withImage
          extraMeta={event.platform ? <span>📱 {event.platform}</span> : undefined}
        />

        {/* 2. Summary — impact as the article lead */}
        <div className="mb-8 glass-card border-l-4 border-emerald-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            What Happened
          </p>
          <p className="mt-2 text-base leading-relaxed text-white">{event.impact}</p>
        </div>

        {/* 3. Media — FeaturedMedia (non-image) + supporting + video + reference */}
        <ArticleMediaSection media={event.media} />

        {/* 4. Scores */}
        <EntryScores entry={event} title="Cultural Scores" />


        {/* 5. Timeline */}
        {event.highlights.length >= 2 && (
          <div className="mb-8">
            <ContentBlock title="Timeline">
              <Timeline
                events={event.highlights.slice(0, 5).map((h, i) => ({
                  date: `${i + 1}.`,
                  event: h,
                }))}
              />
            </ContentBlock>
          </div>
        )}

        {/* 6. Category-specific sections */}
        {event.tags && event.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 7. Creator / Participants attribution */}
        {(event.creator ?? (event.participants && event.participants.length > 0)) && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">
              {event.creator ? "Creator" : "Participants"}
            </h2>
            <div className="glass-card p-4">
              {event.creator ? (
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500" aria-hidden>👤</span>
                  <p className="text-sm text-zinc-300">{event.creator}</p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {event.participants!.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="text-zinc-600" aria-hidden>·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* 8. Related */}
        <EntryRelated recommendations={related} title="Related" />

        {/* 9. Sources */}
        <EntrySources sources={event.sources} />

        {/* 10. Article metadata */}
        <ArticleMetadata addedAt={event.addedAt} lastUpdated={event.lastUpdated} />

      </DetailPageLayout>
    </main>
  );
}

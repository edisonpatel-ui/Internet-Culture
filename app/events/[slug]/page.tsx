import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createEntryMetadata, createEventJsonLd } from "@/lib/seo";
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
import { JsonLd } from "@/components/seo/JsonLd";
import { EntryBreadcrumbs } from "@/components/seo/EntryBreadcrumbs";
import { TopicClusterLinks } from "@/components/seo/TopicClusterLinks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return createEntryMetadata(event);
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const catalog = getAllEntriesSync();
  const related = getRelatedRecommendations(event, catalog, 6);
  const breadcrumbs = [
    { name: "Events", path: "/events" },
    { name: event.title, path: `/events/${slug}` },
  ];
  const jsonLd = createEventJsonLd(event, {
    path: `/events/${slug}`,
    breadcrumbs,
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={jsonLd} />

      <DetailPageLayout backHref="/events" backLabel="All Events">
        <EntryBreadcrumbs items={breadcrumbs} />

        <EntryHero
          entry={event}
          withImage
          extraMeta={
            event.platform ? <span>📱 {event.platform}</span> : undefined
          }
        />

        <div className="mb-8 glass-card border-l-4 border-emerald-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            What Happened
          </p>
          <p className="mt-2 text-base leading-relaxed text-white">
            {event.impact}
          </p>
        </div>

        <ArticleMediaSection media={event.media} />

        <EntryScores entry={event} title="Cultural Scores" />

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

        {(event.creator ??
          (event.participants && event.participants.length > 0)) && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">
              {event.creator ? "Creator" : "Participants"}
            </h2>
            <div className="glass-card p-4">
              {event.creator ? (
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500" aria-hidden>
                    👤
                  </span>
                  <p className="text-sm text-zinc-300">{event.creator}</p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {event.participants!.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <span className="text-zinc-600" aria-hidden>
                        ·
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <EntryRelated recommendations={related} title="Related" />

        <TopicClusterLinks
          entry={event}
          catalog={catalog}
          currentPath="/events"
        />

        <EntrySources sources={event.sources} />

        <ArticleMetadata
          addedAt={event.addedAt}
          lastUpdated={event.lastUpdated}
        />
      </DetailPageLayout>
    </main>
  );
}

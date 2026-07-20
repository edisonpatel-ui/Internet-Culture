import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEventJsonLd,
  createNotFoundMetadata,
} from "@/lib/seo";
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

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return createNotFoundMetadata();
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

        <div className="mb-10 glass-card border-l-4 border-emerald-500/50 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            What happened
          </p>
          <p className="mt-2 max-w-3xl text-base leading-[1.75] text-white sm:text-lg">
            {event.impact}
          </p>
        </div>

        <ArticleMediaSection media={event.media} />

        {event.highlights.length >= 2 && (
          <ContentBlock title="Timeline">
            <Timeline
              events={event.highlights.slice(0, 5).map((h, i) => ({
                date: `${i + 1}.`,
                event: h,
              }))}
            />
          </ContentBlock>
        )}

        {event.participants && event.participants.length > 0 && (
          <ContentBlock title="Participants">
            <ul className="space-y-2">
              {event.participants.map((p) => (
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
          </ContentBlock>
        )}

        {event.tags && event.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-white">
              Tags
            </h2>
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

        <EntryScores entry={event} />

        <EntrySources sources={event.sources} />

        <ArticleMetadata
          addedAt={event.addedAt}
          lastUpdated={event.lastUpdated}
        />

        <EntryRelated recommendations={related} fromSlug={event.slug} />

        <TopicClusterLinks
          entry={event}
          catalog={catalog}
          currentPath="/events"
        />
      </DetailPageLayout>
    </main>
  );
}

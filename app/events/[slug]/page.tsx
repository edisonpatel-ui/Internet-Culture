import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getEventBySlug, getAllEventSlugs, getRelatedEvents } from "@/lib/data/events";
import {
  DetailPageLayout,
  ContentBlock,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntryRelated } from "@/components/entry/EntryRelated";
import { EntryComingSoon } from "@/components/entry/EntryComingSoon";
import { EntrySources } from "@/components/entry/EntrySources";
import { EntryMedia } from "@/components/entry/EntryMedia";

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

  const relatedEvents = getRelatedEvents(event.relatedSlugs)
    .filter((e) => e.slug !== slug)
    .slice(0, 3);

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

        {/* Overview */}
        <EntryHero
          entry={event}
          withImage
          extraMeta={event.platform ? <span>📱 {event.platform}</span> : undefined}
        />

        {/* Scores */}
        <EntryScores scores={event.scores} title="Impact Scores" />

        {/* Media (auto-renders when entry has mediaEmbeds) */}
        <EntryMedia embeds={event.mediaEmbeds} />

        {/* Cultural Impact */}
        <div className="mb-8 glass-card border-l-4 border-emerald-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Cultural Impact
          </p>
          <p className="mt-2 text-base leading-relaxed text-white">{event.impact}</p>
        </div>

        {/* Key Moments */}
        {event.highlights.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Key Moments &amp; Highlights">
              <ul className="space-y-3">
                {event.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 text-emerald-400">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          </div>
        )}

        {/* Tags */}
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

        {/* Sources */}
        <EntrySources sources={event.sources} />

        {/* Future Features */}
        <EntryComingSoon
          items={[
            { title: "Full Timeline", description: "Complete chronological record of this event's development." },
            { title: "Media Gallery", description: "Embedded posts, reaction compilations, and coverage." },
            { title: "AI Analysis", description: "In-depth AI-generated cultural significance report." },
            { title: "Business Insights", description: "Brand opportunities, audience data, and trend predictions." },
          ]}
        />

        {/* Related */}
        <EntryRelated entries={relatedEvents} title="Related Events" />

      </DetailPageLayout>
    </main>
  );
}

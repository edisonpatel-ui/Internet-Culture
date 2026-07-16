import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getEventBySlug, getAllEventSlugs, events } from "@/lib/data/events";
import { Badge } from "@/components/ui/Badge";
import { ScoreGroup } from "@/components/ui/ScoreBar";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  DetailPageLayout,
  ContentBlock,
} from "@/components/templates/DetailPageLayout";
import { formatViews, formatDate, getTrendDirectionLabel, getTrendDirectionColor, getTrendDirectionIcon } from "@/lib/utils";
import Link from "next/link";

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

  const relatedEvents = events
    .filter((e) => e.slug !== slug && event.relatedSlugs.includes(e.slug))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <DetailPageLayout backHref="/events" backLabel="All Events">

        {/* Hero */}
        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <ImagePlaceholder
            title={event.title}
            gradient={event.imageGradient}
            aspect="video"
          />
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge category="event" />
              <span className={`text-sm font-medium ${getTrendDirectionColor(event.trendDirection)}`}>
                {getTrendDirectionIcon(event.trendDirection)} {getTrendDirectionLabel(event.trendDirection)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>
            <p className="text-base leading-relaxed text-zinc-400">{event.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
              <span>👀 {formatViews(event.views)} views</span>
              <span>📅 Added {formatDate(event.addedAt)}</span>
              {event.platform && <span>📱 {event.platform}</span>}
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="mb-8 glass-card p-6">
          <h2 className="mb-4 text-base font-semibold text-white">Impact Scores</h2>
          <ScoreGroup
            relevance={event.scores.relevance}
            brainrot={event.scores.brainrot}
            cringe={event.scores.cringe}
          />
        </div>

        {/* Impact Statement */}
        <div className="mb-8 glass-card border-l-4 border-emerald-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Cultural Impact</p>
          <p className="mt-2 text-base leading-relaxed text-white">{event.impact}</p>
        </div>

        {/* Highlights */}
        {event.highlights.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Key Moments & Highlights">
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
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Future Placeholders */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">Full Timeline</p>
            <p className="mt-1 text-sm text-zinc-500">Complete chronological record of this event&apos;s development.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">Media Gallery</p>
            <p className="mt-1 text-sm text-zinc-500">Embedded posts, reaction compilations, and coverage.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">AI Analysis</p>
            <p className="mt-1 text-sm text-zinc-500">In-depth AI-generated cultural significance report.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">Business Insights</p>
            <p className="mt-1 text-sm text-zinc-500">Brand opportunities, audience data, and trend predictions.</p>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Related Events</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((related) => (
                <Link
                  key={related.id}
                  href={`/events/${related.slug}`}
                  className="group glass-card flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-white/15"
                >
                  <ImagePlaceholder
                    title={related.title}
                    gradient={related.imageGradient}
                    className="rounded-none rounded-t-2xl"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-violet-200">{related.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </DetailPageLayout>
    </main>
  );
}

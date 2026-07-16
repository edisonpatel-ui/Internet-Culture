import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getMemeBySlug, getAllMemeSlugs, getRelatedMemes } from "@/lib/data/memes";
import { Badge } from "@/components/ui/Badge";
import { ScoreGroup, ScoreBar } from "@/components/ui/ScoreBar";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TrendCard } from "@/components/cards/TrendCard";
import {
  DetailPageLayout,
  PageHeader,
  ContentBlock,
  Timeline,
  ExampleList,
  AffiliatePlaceholder,
} from "@/components/templates/DetailPageLayout";
import { formatViews, formatDate, getTrendDirectionLabel, getTrendDirectionColor, getTrendDirectionIcon } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllMemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) return {};
  return createMetadata({
    title: meme.title,
    description: meme.description,
    path: `/memes/${slug}`,
  });
}

export default async function MemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) notFound();

  const relatedMemes = getRelatedMemes(meme.relatedSlugs);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <DetailPageLayout backHref="/memes" backLabel="All Memes">

        {/* Hero Section */}
        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <ImagePlaceholder
            title={meme.title}
            gradient={meme.imageGradient}
            aspect="video"
          />
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge category="meme" />
              <span className={`text-sm font-medium ${getTrendDirectionColor(meme.trendDirection)}`}>
                {getTrendDirectionIcon(meme.trendDirection)} {getTrendDirectionLabel(meme.trendDirection)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {meme.title}
            </h1>
            <p className="text-base leading-relaxed text-zinc-400">{meme.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
              <span>👀 {formatViews(meme.views)} views</span>
              <span>📅 Added {formatDate(meme.addedAt)}</span>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="mb-8 glass-card p-6">
          <h2 className="mb-4 text-base font-semibold text-white">Trend Scores</h2>
          <ScoreGroup
            relevance={meme.scores.relevance}
            brainrot={meme.scores.brainrot}
            cringe={meme.scores.cringe}
          />
        </div>

        {/* Content Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <ContentBlock title="What It Means">
            <p>{meme.meaning}</p>
          </ContentBlock>
          <ContentBlock title="Origin">
            <p>{meme.origin}</p>
          </ContentBlock>
        </div>

        {/* Timeline */}
        {meme.timeline.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Timeline">
              <Timeline events={meme.timeline} />
            </ContentBlock>
          </div>
        )}

        {/* Examples */}
        {meme.examples.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Usage Examples">
              <ExampleList examples={meme.examples} />
            </ContentBlock>
          </div>
        )}

        {/* Affiliate Placeholder */}
        {meme.affiliateProduct && (
          <div className="mb-8">
            <AffiliatePlaceholder {...meme.affiliateProduct} />
          </div>
        )}

        {/* Future Placeholders */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">AI Summary</p>
            <p className="mt-1 text-sm text-zinc-500">Auto-generated analysis and trend prediction — coming with AI integration.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">Media Gallery</p>
            <p className="mt-1 text-sm text-zinc-500">Images, videos, and embedded social posts — coming soon.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">Business Insights</p>
            <p className="mt-1 text-sm text-zinc-500">Brand relevance, marketing opportunities, and trend reports for businesses.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">Community Discussion</p>
            <p className="mt-1 text-sm text-zinc-500">Comments, reactions, and community-contributed examples.</p>
          </div>
        </div>

        {/* Related Memes */}
        {relatedMemes.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Related Memes</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMemes.map((related) => (
                <TrendCard key={related.id} entry={related} />
              ))}
            </div>
          </section>
        )}

      </DetailPageLayout>
    </main>
  );
}

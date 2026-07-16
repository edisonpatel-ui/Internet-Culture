import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getTrendBySlug, trends, getTrendingToday } from "@/lib/data/trends";
import { Badge } from "@/components/ui/Badge";
import { ScoreGroup } from "@/components/ui/ScoreBar";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TrendCard } from "@/components/cards/TrendCard";
import {
  DetailPageLayout,
  ContentBlock,
} from "@/components/templates/DetailPageLayout";
import { formatViews, formatDate, getTrendDirectionLabel, getTrendDirectionColor, getTrendDirectionIcon, getOverallScore } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return trends.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) return {};
  return createMetadata({
    title: trend.title,
    description: trend.description,
    path: `/trending/${slug}`,
  });
}

export default async function TrendDetailPage({ params }: Props) {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) notFound();

  const overallScore = getOverallScore(trend.scores);
  const related = getTrendingToday()
    .filter((t) => t.slug !== slug && t.category === trend.category)
    .slice(0, 3);

  const otherRelated = related.length < 3
    ? getTrendingToday().filter((t) => t.slug !== slug).slice(0, 3 - related.length)
    : [];

  const allRelated = [...related, ...otherRelated].slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <DetailPageLayout backHref="/trending" backLabel="All Trends">

        {/* Hero Section */}
        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <ImagePlaceholder
            title={trend.title}
            gradient={trend.imageGradient}
            aspect="video"
          />
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge category={trend.category} />
              <span className={`text-sm font-medium ${getTrendDirectionColor(trend.trendDirection)}`}>
                {getTrendDirectionIcon(trend.trendDirection)} {getTrendDirectionLabel(trend.trendDirection)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {trend.title}
            </h1>
            <p className="text-base leading-relaxed text-zinc-400">{trend.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
              <span>👀 {formatViews(trend.views)} views</span>
              <span>📅 Added {formatDate(trend.addedAt)}</span>
              <span>⭐ {overallScore} overall</span>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="mb-8 glass-card p-6">
          <h2 className="mb-4 text-base font-semibold text-white">Trend Scores</h2>
          <ScoreGroup
            relevance={trend.scores.relevance}
            brainrot={trend.scores.brainrot}
            cringe={trend.scores.cringe}
          />
        </div>

        {/* Quick Facts */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-white">{trend.scores.relevance}</p>
            <p className="text-xs text-zinc-400">Relevance Score</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-orange-400">{trend.scores.brainrot}</p>
            <p className="text-xs text-zinc-400">Brainrot Score</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-white">{formatViews(trend.views)}</p>
            <p className="text-xs text-zinc-400">Total Views</p>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <ContentBlock title="Summary">
            <p>{trend.description}</p>
          </ContentBlock>
          <ContentBlock title="Current Status">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${getTrendDirectionColor(trend.trendDirection)}`}>
                  {getTrendDirectionIcon(trend.trendDirection)}
                </span>
                <span className="font-medium text-white">{getTrendDirectionLabel(trend.trendDirection)}</span>
              </div>
              <p className="text-sm text-zinc-400">
                {trend.trendDirection === "rising" && "This trend is gaining significant traction across platforms."}
                {trend.trendDirection === "declining" && "This trend has passed its peak and is losing momentum."}
                {trend.trendDirection === "stable" && "This trend has reached a stable level of mainstream awareness."}
                {trend.trendDirection === "new" && "This trend just emerged and is rapidly gaining attention."}
              </p>
              <p className="text-xs text-zinc-500">Category: {trend.category}</p>
            </div>
          </ContentBlock>
        </div>

        {/* Future Placeholders */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">AI Summary</p>
            <p className="mt-1 text-sm text-zinc-500">In-depth AI-generated analysis of this trend&apos;s cultural impact, predictions, and context.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">Business Insights</p>
            <p className="mt-1 text-sm text-zinc-500">Marketing opportunities, audience demographics, and brand relevance analysis.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">Full Timeline</p>
            <p className="mt-1 text-sm text-zinc-500">Complete history of this trend from first appearance to current status.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Future Feature</p>
            <p className="font-semibold text-white">Media Gallery</p>
            <p className="mt-1 text-sm text-zinc-500">Embedded TikToks, tweets, YouTube videos, and images related to this trend.</p>
          </div>
        </div>

        {/* Related Trends */}
        {allRelated.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Related Trends</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allRelated.map((related) => (
                <TrendCard key={related.id} entry={related} />
              ))}
            </div>
          </section>
        )}

      </DetailPageLayout>
    </main>
  );
}

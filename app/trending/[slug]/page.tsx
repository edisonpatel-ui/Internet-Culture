import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getTrendBySlug, getAllTrendSlugs, getTrendingToday } from "@/lib/data/trends";
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
import {
  formatViews,
  getTrendDirectionColor,
  getTrendDirectionIcon,
  getTrendDirectionLabel,
  getOverallScore,
} from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTrendSlugs().map((slug) => ({ slug }));
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

  const sameCategoryRelated = getTrendingToday().filter(
    (t) => t.slug !== slug && t.category === trend.category,
  );
  const fallback = getTrendingToday().filter((t) => t.slug !== slug);
  const allRelated = [
    ...sameCategoryRelated,
    ...fallback.filter((t) => !sameCategoryRelated.includes(t)),
  ].slice(0, 3);

  const jsonLd = createArticleJsonLd({
    title: trend.title,
    description: trend.description,
    path: `/trending/${slug}`,
    datePublished: trend.addedAt,
    breadcrumbs: [
      { name: "Trending", path: "/trending" },
      { name: trend.title, path: `/trending/${slug}` },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DetailPageLayout backHref="/trending" backLabel="All Trends">

        {/* Overview */}
        <EntryHero
          entry={trend}
          withImage
          extraMeta={<span>⭐ {overallScore} overall</span>}
        />

        {/* Scores */}
        <EntryScores scores={trend.scores} />

        {/* Media (auto-renders when entry has mediaEmbeds) */}
        <EntryMedia embeds={trend.mediaEmbeds} />

        {/* Quick Stats */}
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

        {/* Summary & Status */}
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
                <span className="font-medium text-white">
                  {getTrendDirectionLabel(trend.trendDirection)}
                </span>
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

        {/* Sources */}
        <EntrySources sources={trend.sources} />

        {/* Future Features */}
        <EntryComingSoon
          items={[
            { title: "Full Timeline", description: "Complete history of this trend from first appearance to current status." },
            { title: "Media Gallery", description: "Embedded TikToks, tweets, YouTube videos, and images." },
            { title: "Community Discussion", description: "Comments, reactions, and reader-contributed context." },
            { title: "Popularity Graph", description: "Visual spread data and engagement trends over time." },
          ]}
        />

        {/* Related */}
        <EntryRelated entries={allRelated} title="Related Trends" />

      </DetailPageLayout>
    </main>
  );
}

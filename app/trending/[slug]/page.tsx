import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEntryArticleJsonLd,
} from "@/lib/seo";
import { getTrendBySlug, getAllTrendSlugs } from "@/lib/content/trends";
import { getRelatedRecommendations } from "@/lib/intelligence";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  DetailPageLayout,
  ContentBlock,
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
import {
  formatViews,
  getDetailHref,
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
  // Canonical points to category-native URL when this entry also lives elsewhere
  // (prevents duplicate indexing of /trending/x vs /memes/x).
  return createEntryMetadata(trend, { path: `/trending/${slug}` });
}

export default async function TrendDetailPage({ params }: Props) {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) notFound();

  const overallScore = getOverallScore(trend.scores);
  const related = getRelatedRecommendations(trend, getAllEntriesSync(), 6);
  const visibleBreadcrumbs = [
    { name: "Trending", path: "/trending" },
    { name: trend.title, path: `/trending/${slug}` },
  ];
  // JSON-LD breadcrumbs use the canonical category path (not the /trending URL)
  const categoryCrumb =
    trend.category === "meme"
      ? { name: "Memes", path: "/memes" }
      : trend.category === "slang"
        ? { name: "Slang", path: "/slang" }
        : trend.category === "event"
          ? { name: "Events", path: "/events" }
          : { name: "Trending", path: "/trending" };
  const jsonLd = createEntryArticleJsonLd(trend, [
    categoryCrumb,
    {
      name: trend.title,
      path: getDetailHref(trend.category, trend.slug),
    },
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={jsonLd} />

      <DetailPageLayout backHref="/trending" backLabel="All Trends">
        <EntryBreadcrumbs items={visibleBreadcrumbs} />

        <EntryHero
          entry={trend}
          withImage
          extraMeta={<span>⭐ {overallScore} overall</span>}
        />

        <p className="mb-8 text-base leading-relaxed text-zinc-300 sm:text-lg">
          {trend.description}
        </p>

        <ArticleMediaSection media={trend.media} />

        <EntryScores entry={trend} />

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-white">
              {trend.scores.relevance}
            </p>
            <p className="text-xs text-zinc-400">Relevance Score</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-orange-400">
              {trend.scores.brainrot}
            </p>
            <p className="text-xs text-zinc-400">Brainrot Score</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-white">
              {formatViews(trend.views)}
            </p>
            <p className="text-xs text-zinc-400">Total Views</p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <ContentBlock title="Why It&rsquo;s Trending">
            <p>{trend.description}</p>
          </ContentBlock>
          <ContentBlock title="Current Status">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg ${getTrendDirectionColor(trend.trendDirection)}`}
                >
                  {getTrendDirectionIcon(trend.trendDirection)}
                </span>
                <span className="font-medium text-white">
                  {getTrendDirectionLabel(trend.trendDirection)}
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                {trend.trendDirection === "rising" &&
                  "This trend is gaining significant traction across platforms."}
                {trend.trendDirection === "declining" &&
                  "This trend has passed its peak and is losing momentum."}
                {trend.trendDirection === "stable" &&
                  "This trend has reached a stable level of mainstream awareness."}
                {trend.trendDirection === "new" &&
                  "This trend just emerged and is rapidly gaining attention."}
              </p>
              <p className="text-xs text-zinc-500 capitalize">
                Category: {trend.category}
              </p>
            </div>
          </ContentBlock>
        </div>

        {trend.creator && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">Creator</h2>
            <div className="glass-card flex items-center gap-3 p-4">
              <span className="text-zinc-500" aria-hidden>
                👤
              </span>
              <p className="text-sm text-zinc-300">{trend.creator}</p>
            </div>
          </div>
        )}

        <EntryRelated recommendations={related} title="Related" />

        <TopicClusterLinks category="trend" currentPath="/trending" />

        <EntrySources sources={trend.sources} />

        <ArticleMetadata
          addedAt={trend.addedAt}
          lastUpdated={trend.lastUpdated}
        />
      </DetailPageLayout>
    </main>
  );
}

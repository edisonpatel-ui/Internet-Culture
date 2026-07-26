import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEntryArticleJsonLd,
  createNotFoundMetadata,
} from "@/lib/seo";
import { getTrendBySlug, getAllTrendSlugs } from "@/lib/content/trends";
import { getRelatedRecommendations } from "@/lib/intelligence";
import { getAllEntriesSync } from "@/lib/services/entries";
import { isTrendingDuplicateSlug } from "@/lib/seo/trendingRedirects";
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
import { getDetailHref } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // Only native trend articles — re-exports 308 to category URLs via redirects.
  return getAllTrendSlugs()
    .filter((slug) => !isTrendingDuplicateSlug(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) return createNotFoundMetadata();
  if (trend.category !== "trend") {
    // Redirected routes — metadata unused after permanentRedirect, keep safe.
    return createEntryMetadata(trend);
  }
  return createEntryMetadata(trend, { path: `/trending/${slug}` });
}

export default async function TrendDetailPage({ params }: Props) {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) notFound();

  // Belt-and-suspenders with next.config redirects (308 permanent).
  if (trend.category !== "trend") {
    permanentRedirect(getDetailHref(trend.category, trend.slug));
  }

  const catalog = getAllEntriesSync();
  const related = getRelatedRecommendations(trend, catalog, 6);
  const visibleBreadcrumbs = [
    { name: "Trends", path: "/trending#trends" },
    { name: trend.title, path: `/trending/${slug}` },
  ];
  // Native trend articles only (re-exports redirect away before this point)
  const jsonLd = createEntryArticleJsonLd(trend, [
    { name: "Trends", path: "/trending" },
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

        {/* Identity */}
        <EntryHero entry={trend} withImage />

        {/* Quick Overview */}
        {trend.summary && (
          <p className="mb-10 max-w-3xl text-base leading-[1.75] text-zinc-300 sm:text-lg">
            {trend.summary}
          </p>
        )}

        {/* History */}
        {trend.origin && (
          <ContentBlock title="History">
            <p>{trend.origin}</p>
          </ContentBlock>
        )}

        {/* Cultural Scores — after History (trends have no Timeline) */}
        <EntryScores entry={trend} />

        {/* Media */}
        <ArticleMediaSection media={trend.media} />

        {/* Spread & Ecosystem */}
        <EntryRelated
          recommendations={related}
          title="Related entries"
          fromSlug={trend.slug}
        />

        {/* References */}
        <EntrySources sources={trend.sources} fromSlug={trend.slug} />

        <ArticleMetadata
          addedAt={trend.addedAt}
          lastUpdated={trend.lastUpdated}
        />

        <TopicClusterLinks
          entry={trend}
          catalog={catalog}
          currentPath="/trending"
        />
      </DetailPageLayout>
    </main>
  );
}

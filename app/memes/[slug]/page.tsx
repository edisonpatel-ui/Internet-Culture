import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEntryArticleJsonLd,
  createNotFoundMetadata,
} from "@/lib/seo";
import { getMemeBySlug, getAllMemeSlugs } from "@/lib/content/memes";
import { getRelatedRecommendations } from "@/lib/intelligence";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  DetailPageLayout,
  ContentBlock,
  Timeline,
  ExampleList,
  AffiliatePlaceholder,
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

/** Unknown slugs 404 without attempting dynamic generation. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) return createNotFoundMetadata();
  return createEntryMetadata(meme);
}

export default async function MemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) notFound();

  const catalog = getAllEntriesSync();
  const related = getRelatedRecommendations(meme, catalog, 6);
  const breadcrumbs = [
    { name: "Memes", path: "/memes" },
    { name: meme.title, path: `/memes/${slug}` },
  ];
  const jsonLd = createEntryArticleJsonLd(meme, breadcrumbs);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={jsonLd} />

      <DetailPageLayout backHref="/memes" backLabel="All Memes">
        <EntryBreadcrumbs items={breadcrumbs} />

        <EntryHero entry={meme} withImage />

        <p className="mb-10 max-w-3xl text-base leading-[1.75] text-zinc-300 sm:text-lg">
          {meme.meaning}
        </p>

        <ArticleMediaSection media={meme.media} />

        <ContentBlock title="Origin">
          <p>{meme.origin}</p>
        </ContentBlock>

        {meme.timeline.length >= 2 && (
          <ContentBlock title="Timeline">
            <Timeline events={meme.timeline.slice(0, 5)} />
          </ContentBlock>
        )}

        {meme.examples.length > 0 && (
          <ContentBlock title="Usage examples">
            <ExampleList examples={meme.examples} />
          </ContentBlock>
        )}

        {meme.affiliateProduct && (
          <div className="mb-8">
            <AffiliatePlaceholder {...meme.affiliateProduct} />
          </div>
        )}

        <EntryScores entry={meme} />

        <EntrySources sources={meme.sources} />

        <ArticleMetadata
          addedAt={meme.addedAt}
          lastUpdated={meme.lastUpdated}
        />

        <EntryRelated recommendations={related} fromSlug={meme.slug} />

        <TopicClusterLinks
          entry={meme}
          catalog={catalog}
          currentPath="/memes"
        />
      </DetailPageLayout>
    </main>
  );
}

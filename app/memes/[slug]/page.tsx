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
  ArticleMetadata,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntryRelated } from "@/components/entry/EntryRelated";
import { EntrySources } from "@/components/entry/EntrySources";
import { ArticleMediaSection } from "@/components/media/ArticleMediaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { EntryBreadcrumbs } from "@/components/seo/EntryBreadcrumbs";

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

        {/* Identity */}
        <EntryHero entry={meme} withImage />

        {/* Quick Overview */}
        <p className="mb-10 max-w-3xl text-base leading-[1.75] text-zinc-300 sm:text-lg">
          {meme.meaning}
        </p>

        {/* History */}
        <ContentBlock title="History">
          <p>{meme.origin}</p>
        </ContentBlock>

        {/* Cultural Scores — between History and Timeline */}
        <EntryScores entry={meme} />

        {meme.timeline.length >= 2 && (
          <ContentBlock title="Timeline">
            <Timeline events={meme.timeline.slice(0, 5)} />
          </ContentBlock>
        )}

        {/* Examples */}
        {meme.examples.length > 0 && (
          <ContentBlock title="Examples">
            <ExampleList examples={meme.examples} />
          </ContentBlock>
        )}

        {/* Media (gallery / video — hero already shows featured image) */}
        <ArticleMediaSection media={meme.media} />

        {/* Spread & Ecosystem */}
        <EntryRelated
          recommendations={related}
          title="Related entries"
          fromSlug={meme.slug}
        />

        {/* References */}
        <EntrySources sources={meme.sources} fromSlug={meme.slug} />

        <ArticleMetadata
          addedAt={meme.addedAt}
          lastUpdated={meme.lastUpdated}
        />
      </DetailPageLayout>
    </main>
  );
}

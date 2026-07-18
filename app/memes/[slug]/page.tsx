import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEntryArticleJsonLd,
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

export function generateStaticParams() {
  return getAllMemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) return {};
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

        <p className="mb-8 text-base leading-relaxed text-zinc-300 sm:text-lg">
          {meme.meaning}
        </p>

        <ArticleMediaSection media={meme.media} />

        <EntryScores entry={meme} />

        <div className="mb-8">
          <ContentBlock title="Origin">
            <p>{meme.origin}</p>
          </ContentBlock>
        </div>

        {meme.timeline.length >= 2 && (
          <div className="mb-8">
            <ContentBlock title="Timeline">
              <Timeline events={meme.timeline.slice(0, 5)} />
            </ContentBlock>
          </div>
        )}

        {meme.examples.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Usage Examples">
              <ExampleList examples={meme.examples} />
            </ContentBlock>
          </div>
        )}

        {meme.affiliateProduct && (
          <div className="mb-8">
            <AffiliatePlaceholder {...meme.affiliateProduct} />
          </div>
        )}

        {meme.creator && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">Creator</h2>
            <div className="glass-card flex items-center gap-3 p-4">
              <span className="text-zinc-500" aria-hidden>
                👤
              </span>
              <p className="text-sm text-zinc-300">{meme.creator}</p>
            </div>
          </div>
        )}

        <EntryRelated recommendations={related} fromSlug={meme.slug} />

        <TopicClusterLinks
          entry={meme}
          catalog={catalog}
          currentPath="/memes"
        />

        <EntrySources sources={meme.sources} />

        <ArticleMetadata
          addedAt={meme.addedAt}
          lastUpdated={meme.lastUpdated}
        />
      </DetailPageLayout>
    </main>
  );
}

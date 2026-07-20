import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEntryArticleJsonLd,
  createDefinedTermJsonLd,
  createNotFoundMetadata,
} from "@/lib/seo";
import { getSlangBySlug, getAllSlangSlugs } from "@/lib/content/slang";
import { getRelatedRecommendations } from "@/lib/intelligence";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  DetailPageLayout,
  ContentBlock,
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
import { TopicClusterLinks } from "@/components/seo/TopicClusterLinks";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlangSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getSlangBySlug(slug);
  if (!term) return createNotFoundMetadata();
  return createEntryMetadata(term);
}

export default async function SlangDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = getSlangBySlug(slug);
  if (!term) notFound();

  const catalog = getAllEntriesSync();
  const related = getRelatedRecommendations(term, catalog, 6);
  const breadcrumbs = [
    { name: "Slang", path: "/slang" },
    { name: term.title, path: `/slang/${slug}` },
  ];
  const articleLd = createEntryArticleJsonLd(term, breadcrumbs);
  const termLd = createDefinedTermJsonLd(term, { path: `/slang/${slug}` });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={[...articleLd, termLd]} />

      <DetailPageLayout backHref="/slang" backLabel="All Slang">
        <EntryBreadcrumbs items={breadcrumbs} />

        {/* auto: show hero when featured image exists; text-only otherwise */}
        <EntryHero entry={term} />

        <div className="mb-10 glass-card border-l-4 border-cyan-500/50 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Definition
          </p>
          <p className="mt-2 max-w-3xl text-lg font-medium leading-[1.65] text-white">
            {term.definition}
          </p>
        </div>

        <ArticleMediaSection media={term.media} />

        <ContentBlock title="Origin">
          <p>{term.origin}</p>
        </ContentBlock>

        {term.usageExamples.length > 0 && (
          <ContentBlock title="Usage examples">
            <ExampleList examples={term.usageExamples} />
          </ContentBlock>
        )}

        <EntryScores entry={term} />

        <EntrySources sources={term.sources} />

        <ArticleMetadata
          addedAt={term.addedAt}
          lastUpdated={term.lastUpdated}
        />

        <EntryRelated recommendations={related} fromSlug={term.slug} />

        <TopicClusterLinks
          entry={term}
          catalog={catalog}
          currentPath="/slang"
        />
      </DetailPageLayout>
    </main>
  );
}

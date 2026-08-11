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
import { ReferencesSection } from "@/components/entry/ReferencesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { EntryBreadcrumbs } from "@/components/seo/EntryBreadcrumbs";

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

        {/* Identity — hero only when featured media exists */}
        <EntryHero entry={term} />

        {/* Quick Overview */}
        <div className="mb-10 border-l-4 border-[var(--accent)] bg-[var(--surface)] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
            Definition
          </p>
          <p className="mt-2 max-w-3xl text-lg font-medium leading-[1.65] text-white">
            {term.definition}
          </p>
        </div>

        {/* History */}
        <ContentBlock title="History">
          <p>{term.origin}</p>
        </ContentBlock>

        {/* Cultural Scores — after History (slang has no Timeline) */}
        <EntryScores entry={term} />

        {/* Examples */}
        {term.usageExamples.length > 0 && (
          <ContentBlock title="Examples">
            <ExampleList examples={term.usageExamples} />
          </ContentBlock>
        )}

                {/* Spread & Ecosystem */}
        <EntryRelated
          recommendations={related}
          title="Related entries"
          fromSlug={term.slug}
        />

        {/* Media + References — combined */}
        <ReferencesSection
          media={term.media}
          sources={term.sources}
          fromSlug={term.slug}
          includeFullGallery
        />

        <ArticleMetadata
          addedAt={term.addedAt}
          lastUpdated={term.lastUpdated}
        />
      </DetailPageLayout>
    </main>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createEntryArticleJsonLd,
  createDefinedTermJsonLd,
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
import {
  getTrendDirectionColor,
  getTrendDirectionIcon,
  getTrendDirectionLabel,
} from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlangSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getSlangBySlug(slug);
  if (!term) return {};
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

        <EntryHero entry={term} withImage={false} />

        <div className="mb-8 glass-card border-l-4 border-cyan-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Definition
          </p>
          <p className="mt-2 text-lg font-medium text-white">{term.definition}</p>
        </div>

        <ArticleMediaSection media={term.media} />

        <EntryScores entry={term} />

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <ContentBlock title="Origin">
            <p>{term.origin}</p>
          </ContentBlock>
          <ContentBlock title="Current Status">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg ${getTrendDirectionColor(term.trendDirection)}`}
                >
                  {getTrendDirectionIcon(term.trendDirection)}
                </span>
                <span className="font-medium text-white">
                  {getTrendDirectionLabel(term.trendDirection)}
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                {term.trendDirection === "rising" &&
                  "This term is gaining mainstream traction."}
                {term.trendDirection === "declining" &&
                  "Usage of this term is decreasing."}
                {term.trendDirection === "stable" &&
                  "Firmly established in online vocabulary."}
                {term.trendDirection === "new" &&
                  "Just entering mainstream consciousness."}
              </p>
            </div>
          </ContentBlock>
        </div>

        {term.usageExamples.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Usage Examples">
              <ExampleList examples={term.usageExamples} />
            </ContentBlock>
          </div>
        )}

        {term.creator && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">Creator</h2>
            <div className="glass-card flex items-center gap-3 p-4">
              <span className="text-zinc-500" aria-hidden>
                👤
              </span>
              <p className="text-sm text-zinc-300">{term.creator}</p>
            </div>
          </div>
        )}

        <EntryRelated recommendations={related} fromSlug={term.slug} />

        <TopicClusterLinks
          entry={term}
          catalog={catalog}
          currentPath="/slang"
        />

        <EntrySources sources={term.sources} />

        <ArticleMetadata
          addedAt={term.addedAt}
          lastUpdated={term.lastUpdated}
        />
      </DetailPageLayout>
    </main>
  );
}

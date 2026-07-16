import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getSlangBySlug, getAllSlangSlugs, getRelatedSlang } from "@/lib/data/slang";
import {
  DetailPageLayout,
  ContentBlock,
  ExampleList,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntryRelated } from "@/components/entry/EntryRelated";
import { EntryComingSoon } from "@/components/entry/EntryComingSoon";
import { EntrySources } from "@/components/entry/EntrySources";
import { EntryMedia } from "@/components/entry/EntryMedia";
import { getTrendDirectionColor, getTrendDirectionIcon, getTrendDirectionLabel } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlangSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getSlangBySlug(slug);
  if (!term) return {};
  return createMetadata({
    title: term.title,
    description: term.description,
    path: `/slang/${slug}`,
  });
}

export default async function SlangDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = getSlangBySlug(slug);
  if (!term) notFound();

  const relatedTerms = getRelatedSlang(term.relatedSlugs);

  const jsonLd = createArticleJsonLd({
    title: term.title,
    description: term.description,
    path: `/slang/${slug}`,
    datePublished: term.addedAt,
    breadcrumbs: [
      { name: "Slang", path: "/slang" },
      { name: term.title, path: `/slang/${slug}` },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DetailPageLayout backHref="/slang" backLabel="All Slang">

        {/* Overview — no image for slang entries */}
        <EntryHero entry={term} withImage={false} />

        {/* Quick Definition */}
        <div className="mb-8 glass-card border-l-4 border-cyan-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Definition
          </p>
          <p className="mt-2 text-lg font-medium text-white">{term.definition}</p>
        </div>

        {/* Scores */}
        <EntryScores scores={term.scores} />

        {/* Media (auto-renders when entry has mediaEmbeds) */}
        <EntryMedia embeds={term.mediaEmbeds} />

        {/* Origin & Status */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <ContentBlock title="Origin">
            <p>{term.origin}</p>
          </ContentBlock>
          <ContentBlock title="Current Status">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${getTrendDirectionColor(term.trendDirection)}`}>
                  {getTrendDirectionIcon(term.trendDirection)}
                </span>
                <span className="font-medium text-white">
                  {getTrendDirectionLabel(term.trendDirection)}
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                {term.trendDirection === "rising" && "This term is gaining mainstream traction."}
                {term.trendDirection === "declining" && "Usage of this term is decreasing."}
                {term.trendDirection === "stable" && "Firmly established in online vocabulary."}
                {term.trendDirection === "new" && "Just entering mainstream consciousness."}
              </p>
            </div>
          </ContentBlock>
        </div>

        {/* Usage Examples */}
        {term.usageExamples.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Usage Examples">
              <ExampleList examples={term.usageExamples} />
            </ContentBlock>
          </div>
        )}

        {/* Sources */}
        <EntrySources sources={term.sources} />

        {/* Future Features */}
        <EntryComingSoon
          cols={3}
          items={[
            { title: "Usage Timeline", description: "Historical frequency and spread across platforms." },
            { title: "Community Examples", description: "Real-world usage submitted by readers." },
            { title: "Etymology", description: "Deep dive into linguistic origins and evolution." },
          ]}
        />

        {/* Related */}
        <EntryRelated entries={relatedTerms} title="Related Slang" />

      </DetailPageLayout>
    </main>
  );
}

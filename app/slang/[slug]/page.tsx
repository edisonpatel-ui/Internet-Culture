import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getSlangBySlug, getAllSlangSlugs, getRelatedSlang } from "@/lib/data/slang";
import { Badge } from "@/components/ui/Badge";
import { ScoreGroup } from "@/components/ui/ScoreBar";
import { TrendCard } from "@/components/cards/TrendCard";
import {
  DetailPageLayout,
  ContentBlock,
  ExampleList,
} from "@/components/templates/DetailPageLayout";
import { formatViews, formatDate, getTrendDirectionLabel, getTrendDirectionColor, getTrendDirectionIcon } from "@/lib/utils";

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

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <DetailPageLayout backHref="/slang" backLabel="All Slang">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge category="slang" />
            <span className={`text-sm font-medium ${getTrendDirectionColor(term.trendDirection)}`}>
              {getTrendDirectionIcon(term.trendDirection)} {getTrendDirectionLabel(term.trendDirection)}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {term.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">{term.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
            <span>👀 {formatViews(term.views)} views</span>
            <span>📅 Added {formatDate(term.addedAt)}</span>
          </div>
        </div>

        {/* Quick Definition */}
        <div className="mb-8 glass-card border-l-4 border-cyan-500/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Definition</p>
          <p className="mt-2 text-lg font-medium text-white">{term.definition}</p>
        </div>

        {/* Scores */}
        <div className="mb-8 glass-card p-6">
          <h2 className="mb-4 text-base font-semibold text-white">Trend Scores</h2>
          <ScoreGroup
            relevance={term.scores.relevance}
            brainrot={term.scores.brainrot}
            cringe={term.scores.cringe}
          />
        </div>

        {/* Content */}
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
                <span className="font-medium text-white">{getTrendDirectionLabel(term.trendDirection)}</span>
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

        {/* Future Placeholders */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">AI Summary</p>
            <p className="mt-1 text-xs text-zinc-500">Auto-generated cultural analysis.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">Usage Timeline</p>
            <p className="mt-1 text-xs text-zinc-500">Historical frequency tracking.</p>
          </div>
          <div className="glass-card border-dashed border-white/10 p-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <p className="font-semibold text-white">Community</p>
            <p className="mt-1 text-xs text-zinc-500">Discussion and community examples.</p>
          </div>
        </div>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Related Slang</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTerms.map((related) => (
                <TrendCard key={related.id} entry={related} />
              ))}
            </div>
          </section>
        )}

      </DetailPageLayout>
    </main>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getMemeBySlug, getAllMemeSlugs, getRelatedMemes } from "@/lib/content/memes";
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

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllMemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) return {};
  return createMetadata({
    title: meme.title,
    description: meme.description,
    path: `/memes/${slug}`,
  });
}

export default async function MemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const meme = getMemeBySlug(slug);
  if (!meme) notFound();

  const relatedMemes = getRelatedMemes(meme.relatedSlugs);

  const jsonLd = createArticleJsonLd({
    title: meme.title,
    description: meme.description,
    path: `/memes/${slug}`,
    datePublished: meme.addedAt,
    breadcrumbs: [
      { name: "Memes", path: "/memes" },
      { name: meme.title, path: `/memes/${slug}` },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DetailPageLayout backHref="/memes" backLabel="All Memes">

        {/* 1. Hero */}
        <EntryHero entry={meme} withImage />

        {/* 2. Summary — the meaning as the article lead */}
        <p className="mb-8 text-base leading-relaxed text-zinc-300 sm:text-lg">
          {meme.meaning}
        </p>

        {/* 3. Media — FeaturedMedia (non-image) + supporting + video + reference */}
        <ArticleMediaSection media={meme.media} />

        {/* 4. Scores */}
        <EntryScores scores={meme.scores} />


        {/* 5. Main Content — Origin */}
        <div className="mb-8">
          <ContentBlock title="Origin">
            <p>{meme.origin}</p>
          </ContentBlock>
        </div>

        {/* 6. Timeline */}
        {meme.timeline.length >= 2 && (
          <div className="mb-8">
            <ContentBlock title="Timeline">
              <Timeline events={meme.timeline.slice(0, 5)} />
            </ContentBlock>
          </div>
        )}

        {/* Usage Examples */}
        {meme.examples.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Usage Examples">
              <ExampleList examples={meme.examples} />
            </ContentBlock>
          </div>
        )}

        {/* Affiliate Product */}
        {meme.affiliateProduct && (
          <div className="mb-8">
            <AffiliatePlaceholder {...meme.affiliateProduct} />
          </div>
        )}

        {/* 7. Creator attribution */}
        {meme.creator && (
          <div className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-white">Creator</h2>
            <div className="glass-card flex items-center gap-3 p-4">
              <span className="text-zinc-500" aria-hidden>👤</span>
              <p className="text-sm text-zinc-300">{meme.creator}</p>
            </div>
          </div>
        )}

        {/* 8. Related */}
        <EntryRelated entries={relatedMemes} title="Related Memes" />

        {/* 9. Sources */}
        <EntrySources sources={meme.sources} />

        {/* 10. Article metadata */}
        <ArticleMetadata addedAt={meme.addedAt} lastUpdated={meme.lastUpdated} />

      </DetailPageLayout>
    </main>
  );
}

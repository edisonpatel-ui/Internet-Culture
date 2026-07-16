import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getMemeBySlug, getAllMemeSlugs, getRelatedMemes } from "@/lib/data/memes";
import {
  DetailPageLayout,
  ContentBlock,
  Timeline,
  ExampleList,
  AffiliatePlaceholder,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntryRelated } from "@/components/entry/EntryRelated";
import { EntryComingSoon } from "@/components/entry/EntryComingSoon";
import { EntrySources } from "@/components/entry/EntrySources";
import { EntryMedia } from "@/components/entry/EntryMedia";

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

        {/* Overview */}
        <EntryHero entry={meme} withImage />

        {/* Scores */}
        <EntryScores scores={meme.scores} />

        {/* Media (auto-renders when entry has mediaEmbeds) */}
        <EntryMedia embeds={meme.mediaEmbeds} />

        {/* Meaning & Origin */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <ContentBlock title="What It Means">
            <p>{meme.meaning}</p>
          </ContentBlock>
          <ContentBlock title="Origin">
            <p>{meme.origin}</p>
          </ContentBlock>
        </div>

        {/* Timeline */}
        {meme.timeline.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Timeline">
              <Timeline events={meme.timeline} />
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

        {/* Sources */}
        <EntrySources sources={meme.sources} />

        {/* Future Features */}
        <EntryComingSoon
          items={[
            { title: "AI Summary", description: "Auto-generated analysis and trend prediction — coming with AI integration." },
            { title: "Media Gallery", description: "Images, videos, and embedded social posts — coming soon." },
            { title: "Business Insights", description: "Brand relevance, marketing opportunities, and trend reports for businesses." },
            { title: "Community Discussion", description: "Comments, reactions, and community-contributed examples." },
          ]}
        />

        {/* Related */}
        <EntryRelated entries={relatedMemes} title="Related Memes" />

      </DetailPageLayout>
    </main>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata, createArticleJsonLd } from "@/lib/seo";
import { getCreatorBySlug, getAllCreatorSlugs } from "@/lib/content/creators";
import { getEntryBySlug } from "@/lib/services/entries";
import {
  DetailPageLayout,
  ContentBlock,
  ArticleMetadata,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntryRelated } from "@/components/entry/EntryRelated";
import { EntrySources } from "@/components/entry/EntrySources";
import { ArticleMediaSection } from "@/components/media/ArticleMediaSection";
import type { BaseEntry, SocialPlatform } from "@/types";

type Props = { params: Promise<{ slug: string }> };

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  twitch: "Twitch",
  instagram: "Instagram",
  x: "X (Twitter)",
};

const PLATFORM_ICONS: Record<SocialPlatform, string> = {
  youtube: "▶",
  tiktok: "♪",
  twitch: "◉",
  instagram: "◆",
  x: "✕",
};

export function generateStaticParams() {
  return getAllCreatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) return {};
  return createMetadata({
    title: creator.title,
    description: creator.description,
    path: `/creators/${slug}`,
  });
}

export default async function CreatorDetailPage({ params }: Props) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) notFound();

  const relatedEntries = (
    await Promise.all((creator.relatedSlugs ?? []).map((s) => getEntryBySlug(s)))
  ).filter(Boolean) as BaseEntry[];

  const jsonLd = createArticleJsonLd({
    title: creator.title,
    description: creator.description,
    path: `/creators/${slug}`,
    datePublished: creator.addedAt,
    breadcrumbs: [
      { name: "Creators", path: "/creators" },
      { name: creator.title, path: `/creators/${slug}` },
    ],
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DetailPageLayout backHref="/creators" backLabel="All Creators">

        {/* 1. Hero */}
        <EntryHero
          entry={creator}
          withImage
          extraMeta={
            creator.careerStart ? (
              <span>📅 Since {creator.careerStart}</span>
            ) : undefined
          }
        />

        {/* 2. Summary — biography lead */}
        <p className="mb-8 text-base leading-relaxed text-zinc-300 sm:text-lg">
          {creator.description}
        </p>

        {/* 3. Media — FeaturedMedia (non-image) + supporting + video + reference */}
        <ArticleMediaSection media={creator.media} />

        {/* 4. Influence Scores */}
        <EntryScores scores={creator.scores} title="Influence Scores" />


        {/* 5. Platforms */}
        {creator.platforms && creator.platforms.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Platforms">
              <div className="flex flex-wrap gap-3">
                {creator.platforms.map((p) => (
                  <a
                    key={p.platform}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <span className="text-base" aria-hidden>
                      {PLATFORM_ICONS[p.platform]}
                    </span>
                    <span>
                      {PLATFORM_LABELS[p.platform]}
                      {p.handle && (
                        <span className="ml-1 text-xs text-zinc-500">
                          @{p.handle.replace(/^@/, "")}
                        </span>
                      )}
                    </span>
                    {creator.followers?.[p.platform] && (
                      <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-500">
                        {creator.followers[p.platform]}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </ContentBlock>
          </div>
        )}

        {/* 6. Notable Moments */}
        {creator.notableMoments && creator.notableMoments.length > 0 && (
          <div className="mb-8">
            <ContentBlock title="Notable Moments">
              <ul className="space-y-3">
                {creator.notableMoments.slice(0, 5).map((moment, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 text-sky-400">★</span>
                    <span>{moment}</span>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          </div>
        )}

        {/* 8. Related Entries */}
        <EntryRelated
          entries={relatedEntries}
          title="Related Internet Culture"
        />

        {/* 9. Sources */}
        <EntrySources sources={creator.sources} />

        {/* 10. Article metadata */}
        <ArticleMetadata addedAt={creator.addedAt} lastUpdated={creator.lastUpdated} />

      </DetailPageLayout>
    </main>
  );
}

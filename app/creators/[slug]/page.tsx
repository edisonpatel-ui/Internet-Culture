import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createEntryMetadata,
  createPersonJsonLd,
  createNotFoundMetadata,
} from "@/lib/seo";
import { getCreatorBySlug, getAllCreatorSlugs } from "@/lib/content/creators";
import { getAllEntriesSync } from "@/lib/services/entries";
import { getRelatedRecommendations } from "@/lib/intelligence";
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
import { JsonLd } from "@/components/seo/JsonLd";
import { EntryBreadcrumbs } from "@/components/seo/EntryBreadcrumbs";
import { TopicClusterLinks } from "@/components/seo/TopicClusterLinks";
import type { SocialPlatform } from "@/types";

type Props = { params: Promise<{ slug: string }> };

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  twitch: "Twitch",
  instagram: "Instagram",
  x: "X (Twitter)",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCreatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) return createNotFoundMetadata();
  return createEntryMetadata(creator);
}

export default async function CreatorDetailPage({ params }: Props) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) notFound();

  const catalog = getAllEntriesSync();
  const related = getRelatedRecommendations(creator, catalog, 6);
  const breadcrumbs = [
    { name: "Creators", path: "/creators" },
    { name: creator.title, path: `/creators/${slug}` },
  ];
  const jsonLd = createPersonJsonLd(creator, {
    path: `/creators/${slug}`,
    breadcrumbs,
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={jsonLd} />

      <DetailPageLayout backHref="/creators" backLabel="All Creators">
        <EntryBreadcrumbs items={breadcrumbs} />

        {/* Identity */}
        <EntryHero
          entry={creator}
          withImage
          extraMeta={
            creator.careerStart ? (
              <span>Active since {creator.careerStart}</span>
            ) : undefined
          }
        />

        {/* Quick Overview — description is in the hero */}

        {/* Platforms / ecosystem */}
        {creator.platforms && creator.platforms.length > 0 && (
          <ContentBlock title="Platforms">
            <div className="flex flex-wrap gap-3">
              {creator.platforms.map((p) => (
                <a
                  key={p.platform}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
                >
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
        )}

        {/* History / notable moments */}
        {creator.notableMoments && creator.notableMoments.length > 0 && (
          <ContentBlock title="History">
            <ul className="space-y-3">
              {creator.notableMoments.slice(0, 5).map((moment, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                  <span>{moment}</span>
                </li>
              ))}
            </ul>
          </ContentBlock>
        )}

        {/* Media */}
        <ArticleMediaSection media={creator.media} />

        {/* Spread & Ecosystem */}
        <EntryRelated
          recommendations={related}
          title="Related entries"
          fromSlug={creator.slug}
        />

        {/* References */}
        <EntrySources sources={creator.sources} fromSlug={creator.slug} />

        {/* Metadata */}
        <EntryScores entry={creator} />
        <ArticleMetadata
          addedAt={creator.addedAt}
          lastUpdated={creator.lastUpdated}
        />

        <TopicClusterLinks
          entry={creator}
          catalog={catalog}
          currentPath="/creators"
        />
      </DetailPageLayout>
    </main>
  );
}

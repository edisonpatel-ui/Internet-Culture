import {
  DetailPageLayout,
  ContentBlock,
  Timeline,
  ExampleList,
  ArticleMetadata,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntrySources } from "@/components/entry/EntrySources";
import { ArticleMediaSection } from "@/components/media/ArticleMediaSection";
import { EntryBreadcrumbs } from "@/components/seo/EntryBreadcrumbs";
import type { PresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";

function categoryNav(category: PresentationArticle["category"]): {
  path: string;
  backLabel: string;
  categoryName: string;
} {
  if (category === "creator") {
    return { path: "/people", backLabel: "All People", categoryName: "People" };
  }
  if (category === "event") {
    return { path: "/events", backLabel: "All Events", categoryName: "Events" };
  }
  if (category === "trend") {
    return { path: "/trending", backLabel: "Trending", categoryName: "Trending" };
  }
  if (category === "slang") {
    return { path: "/slang", backLabel: "All Slang", categoryName: "Slang" };
  }
  if (category === "brainrot") {
    return { path: "/brainrot", backLabel: "Brainrot", categoryName: "Brainrot" };
  }
  return { path: "/memes", backLabel: "All Memes", categoryName: "Memes" };
}

/**
 * Live-identical encyclopedia article body.
 * No editorial/AI/workflow chrome — presentation model only.
 */
export function EncyclopediaArticleView({
  article,
  backHrefOverride,
  backLabelOverride,
}: {
  article: PresentationArticle;
  backHrefOverride?: string;
  backLabelOverride?: string;
}) {
  const nav = categoryNav(article.category);
  const backHref = backHrefOverride ?? nav.path;
  const backLabel = backLabelOverride ?? nav.backLabel;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <DetailPageLayout backHref={backHref} backLabel={backLabel}>
        <EntryBreadcrumbs
          items={[
            { name: nav.categoryName, path: nav.path },
            {
              name: article.title,
              path: `${nav.path}/${article.slug}`,
            },
          ]}
        />

        <EntryHero entry={article.entry} withImage />

        {article.definition ? (
          <div className="mb-10 rounded-xl border border-[var(--glass-border)] border-l-4 border-l-[var(--accent)] bg-[var(--surface)] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
              Definition
            </p>
            <p className="mt-2 max-w-3xl text-lg font-medium leading-[1.65] text-white">
              {article.definition}
            </p>
          </div>
        ) : (
          <p className="mb-10 max-w-3xl text-base leading-[1.75] text-zinc-300 sm:text-lg">
            {article.lead}
          </p>
        )}

        <ArticleMediaSection media={article.media} />

        {(() => {
          const isHistorySection = (s: { id: string; heading: string }) => {
            const id = s.id.toLowerCase();
            const heading = s.heading.toLowerCase();
            return (
              id === "origin" ||
              id === "history" ||
              heading === "history" ||
              heading.includes("origin")
            );
          };
          const historySections = article.sections.filter(isHistorySection);
          const otherSections = article.sections.filter(
            (s) => !isHistorySection(s),
          );
          return (
            <>
              {historySections.map((section) => (
                <ContentBlock key={section.id} title={section.heading}>
                  <p className="whitespace-pre-wrap">{section.body}</p>
                </ContentBlock>
              ))}

              {/* Cultural Scores — between History and Timeline */}
              <EntryScores entry={article.entry} />

              {article.timeline.length >= 2 && (
                <ContentBlock title="Timeline">
                  <Timeline events={article.timeline.slice(0, 8)} />
                </ContentBlock>
              )}

              {otherSections.map((section) => (
                <ContentBlock key={section.id} title={section.heading}>
                  <p className="whitespace-pre-wrap">{section.body}</p>
                </ContentBlock>
              ))}
            </>
          );
        })()}

        {article.examples.length > 0 && (
          <ContentBlock title="Usage examples">
            <ExampleList examples={article.examples} />
          </ContentBlock>
        )}

        <EntrySources sources={article.sources} />

        <ArticleMetadata addedAt={article.entry.addedAt} />

        {article.relatedTitles.length > 0 && (
          <ContentBlock title="Related">
            <ul className="flex flex-wrap gap-2">
              {article.relatedTitles.map((topic) => (
                <li
                  key={topic}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </ContentBlock>
        )}
      </DetailPageLayout>
    </main>
  );
}

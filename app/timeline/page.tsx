import { createMetadata, createCollectionPageJsonLd } from "@/lib/seo";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  getTimelineFeaturedEntries,
  sortTimelineEntriesChronologically,
} from "@/lib/discovery/timeline";
import { TimelineTrack } from "@/components/timeline/TimelineTrack";
import { JsonLd } from "@/components/seo/JsonLd";

const PAGE_DESCRIPTION =
  "A visual history of the major and influential moments in Internet culture — editorially selected milestones, not every article.";

export const metadata = createMetadata({
  title: "Timeline — Major Internet Culture Milestones",
  description: PAGE_DESCRIPTION,
  path: "/timeline",
  keywords: ["internet culture timeline", "meme history", "internet history"],
});

export default function TimelinePage() {
  // Fetched once, server-side, from the canonical content system — same
  // pattern as app/rankings/page.tsx and app/page.tsx. No separately
  // maintained Timeline list: adding/editing/deleting an entry's
  // `timelineEntry` field (or the entry itself) changes what this renders
  // on the next build, automatically.
  const allEntries = getAllEntriesSync();
  const featured = getTimelineFeaturedEntries(allEntries);
  const sorted = sortTimelineEntriesChronologically(featured);

  const collectionLd = createCollectionPageJsonLd({
    name: "Internet Culture Timeline",
    description: PAGE_DESCRIPTION,
    path: "/timeline",
    entries: sorted,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={collectionLd} />

      {/* Page Header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-zinc-300">
          Interactive Timeline
        </div>
        <h1 className="font-page text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Timeline
        </h1>
        <p className="font-page mt-4 max-w-2xl text-lg text-zinc-400">
          A visual history of Internet culture&apos;s major and influential
          moments — editorially selected milestones, not a listing of every
          article.
        </p>
      </div>

      <TimelineTrack featuredEntries={sorted} />
    </main>
  );
}

import { createMetadata } from "@/lib/seo";
import { getAllEntriesSync } from "@/lib/services/entries";
import {
  buildCultureGraphEdges,
  computeFullGraphLayout,
  getCultureGraphNodeSlugs,
  getCultureGraphNodes,
} from "@/lib/discovery/cultureGraph";
import { CultureGraphInteractive } from "@/components/culture-graph/CultureGraphInteractive";

const PAGE_DESCRIPTION =
  "A visual map of how Internet culture articles connect — memes, slang, events, people, and trends linked by real relationships.";

export const metadata = createMetadata({
  title: "Culture Graph — How Internet Culture Connects",
  description: PAGE_DESCRIPTION,
  path: "/culture-graph",
  keywords: ["internet culture graph", "meme connections", "internet culture relationships"],
});

interface CultureGraphPageProps {
  searchParams: Promise<{ focus?: string }>;
}

export default async function CultureGraphPage({ searchParams }: CultureGraphPageProps) {
  // Fetched once, server-side, from the canonical content system — same
  // pattern as app/timeline/page.tsx and app/rankings/page.tsx. Edges are
  // derived fresh from `relationships`/`relatedSlugs` on every request; a
  // deleted article or a removed relationship simply stops producing
  // edges on the next build, with no separate graph list to fall out of
  // sync.
  //
  // The FULL network — every canonical node and edge — is rendered, not a
  // narrowed local subgraph. Layout is computed once here, server-side,
  // from canonical data (same pattern as app/timeline/page.tsx): a
  // deterministic force-directed relaxation that declutters the network
  // (see computeFullGraphLayout) instead of hiding most of it.
  const allEntries = getAllEntriesSync();
  const edges = buildCultureGraphEdges(allEntries);
  const nodeSlugs = getCultureGraphNodeSlugs(edges);
  const nodes = getCultureGraphNodes(allEntries, nodeSlugs);
  const layout = computeFullGraphLayout(nodes, edges);
  const positions = Object.fromEntries(layout.positions);

  // Resolve ?focus={slug} against REAL graph nodes here, server-side —
  // an invalid/unknown slug becomes null rather than being passed through
  // to the client to fail there. No fabricated node is ever created.
  const { focus } = await searchParams;
  const initialFocusSlug = focus && nodeSlugs.has(focus) ? focus : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-zinc-300">
          Culture Graph
        </div>
        <h1 className="font-page text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Culture Graph
        </h1>
        <p className="font-page mt-4 max-w-2xl text-lg text-zinc-400">
          A visual map of how Internet culture connects — search for an
          article to focus it and explore its connections.
        </p>
      </div>

      <CultureGraphInteractive
        nodes={nodes}
        edges={edges}
        positions={positions}
        outerRadius={layout.outerRadius}
        initialFocusSlug={initialFocusSlug}
      />
    </main>
  );
}

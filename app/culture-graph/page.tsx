import { Suspense } from "react";
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

export default function CultureGraphPage() {
  // Fetched once, server-side, from the canonical content system — same
  // pattern as app/timeline/page.tsx and app/rankings/page.tsx. Edges are
  // derived fresh from `relationships`/`relatedSlugs` on every build/
  // revalidation; a deleted article or a removed relationship simply stops
  // producing edges the next time this page is regenerated, with no
  // separate graph list to fall out of sync.
  //
  // The FULL network — every canonical node and edge — is rendered, not a
  // narrowed local subgraph. Layout is computed once here (deterministic
  // force-directed relaxation, see computeFullGraphLayout) instead of
  // hiding most of the network.
  //
  // Deliberately NOT reading `searchParams` here (unlike the old version):
  // doing so forces the whole route to render dynamically on every single
  // request — re-running this layout computation and re-transferring the
  // full node/edge payload from the origin every time, with no CDN
  // caching at all. `?focus={slug}` is instead read client-side (see
  // CultureGraphInteractive's useSearchParams usage below), which lets
  // this page be served as static, CDN-cached content — the canonical
  // graph is identical for every visitor regardless of which article (if
  // any) is focused; only revalidatePublicDiscovery() (on publish/delete/
  // relationship changes) needs to refresh it, not every request.
  const allEntries = getAllEntriesSync();
  const edges = buildCultureGraphEdges(allEntries);
  const nodeSlugs = getCultureGraphNodeSlugs(edges);
  const nodes = getCultureGraphNodes(allEntries, nodeSlugs);
  const layout = computeFullGraphLayout(nodes, edges);
  const positions = Object.fromEntries(layout.positions);

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

      {/* useSearchParams (for ?focus={slug}) is read inside this client
          component, not on the server above — Next.js requires a Suspense
          boundary around it so the static shell above can still prerender
          while just this part waits on the client-side URL read. */}
      <Suspense fallback={<CultureGraphFallback />}>
        <CultureGraphInteractive
          nodes={nodes}
          edges={edges}
          positions={positions}
          outerRadius={layout.outerRadius}
        />
      </Suspense>
    </main>
  );
}

/** Same-shaped placeholder for the brief moment before the client reads
 * `?focus=` from the URL — avoids a layout jump once it mounts. */
function CultureGraphFallback() {
  return (
    <div className="glass-card h-[70vh] w-full max-h-[720px] rounded-2xl" />
  );
}

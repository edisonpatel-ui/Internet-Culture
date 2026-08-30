"use client";

import { useMemo, useState } from "react";
import { CultureGraphSearch } from "@/components/culture-graph/CultureGraphSearch";
import { CultureGraphView } from "@/components/culture-graph/CultureGraphView";
import {
  computeFocusTransform,
  computeLocalGraphLayout,
  getDefaultCultureGraphResults,
  getLocalSubgraph,
  type CultureGraphEdge,
  type CultureGraphNode,
} from "@/lib/discovery/cultureGraph";

interface CultureGraphInteractiveProps {
  /**
   * FULL canonical node/edge set — kept in the client so search can find
   * any article (not just what's currently visible) and so a new local
   * subgraph can be computed instantly whenever focus changes, with no
   * server round trip. Never all rendered at once — see CultureGraphView;
   * that's exactly the clutter this update fixes.
   */
  nodes: readonly CultureGraphNode[];
  edges: readonly CultureGraphEdge[];
  /** From `?focus={slug}` — already validated server-side against real
   * node slugs (see app/culture-graph/page.tsx). May be null/invalid
   * anyway (defensive); computeFocusTransform handles that gracefully. */
  initialFocusSlug: string | null;
}

const FOCUS_SCALE = 1.4;
const DEFAULT_START_COUNT = 8;

/**
 * Owns focus state and derives a bounded LOCAL subgraph from it, rather
 * than ever rendering the whole graph: a focused article plus its direct
 * connections, or (no focus) a small default set. Search still searches
 * the full canonical node set; selecting a result narrows the rendered
 * view down to that one article's neighborhood.
 *
 * CultureGraphView's own pan/zoom `transform` is local state SEEDED from
 * `initialTransform` (computed here, fresh, on every focus change) and
 * reset by REMOUNTING the view via `key={centerSlugs.join(",")}` — not by
 * an effect that calls setState after render. The layout for a new focus
 * doesn't exist yet at the exact moment the user clicks, so recentering
 * has to happen once the fresh layout/positions are computed; a
 * key-forced remount does that naturally (a fresh initial state), while
 * an effect-based reset would just be a second render synchronously
 * chasing the first.
 */
export function CultureGraphInteractive({
  nodes,
  edges,
  initialFocusSlug,
}: CultureGraphInteractiveProps) {
  const [focusedSlug, setFocusedSlug] = useState<string | null>(initialFocusSlug);

  const centerSlugs = useMemo(() => {
    if (focusedSlug) return [focusedSlug];
    return getDefaultCultureGraphResults(nodes, DEFAULT_START_COUNT).map((n) => n.slug);
  }, [focusedSlug, nodes]);

  const { nodes: localNodes, edges: localEdges } = useMemo(
    () => getLocalSubgraph(centerSlugs, nodes, edges),
    [centerSlugs, nodes, edges],
  );

  const layout = useMemo(
    () => computeLocalGraphLayout(centerSlugs, localNodes),
    [centerSlugs, localNodes],
  );
  const positions = useMemo(() => Object.fromEntries(layout.positions), [layout]);

  const initialTransform = useMemo(() => {
    const singleFocus = centerSlugs.length === 1 ? centerSlugs[0] : null;
    return (
      computeFocusTransform(singleFocus, positions, layout.outerRadius, FOCUS_SCALE) ?? {
        x: 0,
        y: 0,
        scale: 1,
      }
    );
  }, [centerSlugs, positions, layout.outerRadius]);

  function focusOnSlug(slug: string) {
    if (!nodes.some((n) => n.slug === slug)) return; // Not a real graph node — ignored, no crash, no fabrication.
    setFocusedSlug(slug);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <CultureGraphSearch nodes={nodes} onSelect={focusOnSlug} focusedSlug={focusedSlug} />
      <CultureGraphView
        key={centerSlugs.join(",")}
        nodes={localNodes}
        edges={localEdges}
        positions={positions}
        outerRadius={layout.outerRadius}
        initialTransform={initialTransform}
        focusedSlug={focusedSlug}
        onNodeFocus={focusOnSlug}
      />
    </div>
  );
}

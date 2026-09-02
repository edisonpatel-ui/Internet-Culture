"use client";

import { useMemo, useState } from "react";
import { CultureGraphSearch } from "@/components/culture-graph/CultureGraphSearch";
import { CultureGraphView } from "@/components/culture-graph/CultureGraphView";
import {
  computeFocusTransform,
  type CultureGraphEdge,
  type CultureGraphNode,
  type GraphNodePosition,
} from "@/lib/discovery/cultureGraph";

interface CultureGraphInteractiveProps {
  /** EVERY canonical graph node/edge — the full network, always rendered
   * in full (see CultureGraphView). Search still searches this same full
   * set, so any article is always reachable. */
  nodes: readonly CultureGraphNode[];
  edges: readonly CultureGraphEdge[];
  /** Full-network layout, computed once server-side (see
   * app/culture-graph/page.tsx / computeFullGraphLayout). Positions never
   * change on the client — only pan/zoom/focus state does. */
  positions: Record<string, GraphNodePosition>;
  outerRadius: number;
  /** From `?focus={slug}` — already validated server-side against real
   * node slugs (see app/culture-graph/page.tsx). May be null/invalid
   * anyway (defensive); computeFocusTransform handles that gracefully. */
  initialFocusSlug: string | null;
}

const FOCUS_SCALE = 1.6;

/**
 * Owns focus state for the full-network graph. Unlike the old local-
 * subgraph approach, the node/edge set and layout never change here —
 * only which article is focused (drives the connection-highlight/dim
 * behavior and the preview panel in CultureGraphView) and the pan/zoom
 * transform used to recenter on it.
 */
export function CultureGraphInteractive({
  nodes,
  edges,
  positions,
  outerRadius,
  initialFocusSlug,
}: CultureGraphInteractiveProps) {
  const [focusedSlug, setFocusedSlug] = useState<string | null>(initialFocusSlug);
  // Bumped every time the user explicitly asks to (re)center on the
  // focused article — via search, URL focus, clicking a node, or the
  // preview panel's "View in Culture Graph" button — even when the slug
  // hasn't changed, so panning away and asking to recenter again works.
  const [recenterToken, setRecenterToken] = useState(0);

  const initialTransform = useMemo(
    () =>
      computeFocusTransform(initialFocusSlug, positions, outerRadius, FOCUS_SCALE) ?? {
        x: 0,
        y: 0,
        scale: 1,
      },
    // Only the true initial value matters here — recentering afterward is
    // driven by `recenterToken` via CultureGraphView's own effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function focusOnSlug(slug: string) {
    if (!nodes.some((n) => n.slug === slug)) return; // Not a real graph node — ignored, no crash, no fabrication.
    setFocusedSlug(slug);
    setRecenterToken((t) => t + 1);
  }

  function recenterOnFocused() {
    if (!focusedSlug) return;
    setRecenterToken((t) => t + 1);
  }

  function clearFocus() {
    setFocusedSlug(null);
  }

  const recenterTransform = useMemo(
    () => computeFocusTransform(focusedSlug, positions, outerRadius, FOCUS_SCALE),
    [focusedSlug, positions, outerRadius],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <CultureGraphSearch nodes={nodes} onSelect={focusOnSlug} focusedSlug={focusedSlug} />
      <CultureGraphView
        nodes={nodes}
        edges={edges}
        positions={positions}
        outerRadius={outerRadius}
        initialTransform={initialTransform}
        recenterTransform={recenterTransform}
        recenterToken={recenterToken}
        focusedSlug={focusedSlug}
        onNodeFocus={focusOnSlug}
        onRecenterFocused={recenterOnFocused}
        onClearFocus={clearFocus}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { CultureGraphSearch } from "@/components/culture-graph/CultureGraphSearch";
import { CultureGraphView } from "@/components/culture-graph/CultureGraphView";
import {
  computeFocusTransform,
  type CultureGraphEdge,
  type CultureGraphNode,
  type GraphNodePosition,
  type GraphTransform,
} from "@/lib/discovery/cultureGraph";

interface CultureGraphInteractiveProps {
  nodes: readonly CultureGraphNode[];
  edges: readonly CultureGraphEdge[];
  positions: Record<string, GraphNodePosition>;
  outerRadius: number;
  /** From `?focus={slug}` — already validated server-side against real
   * node slugs (see app/culture-graph/page.tsx). May be null/invalid
   * anyway (defensive); computeFocusTransform handles that gracefully. */
  initialFocusSlug: string | null;
}

const FOCUS_SCALE = 1.4;

/**
 * Owns the one pair of state (`focusedSlug`, `transform`) that both the
 * search UI and the graph view need to share — this is what makes
 * clicking a search result and loading `?focus={slug}` behave
 * identically: both ultimately call `focusOnSlug`, which uses the same
 * `computeFocusTransform` a future Timeline integration will also use.
 */
export function CultureGraphInteractive({
  nodes,
  edges,
  positions,
  outerRadius,
  initialFocusSlug,
}: CultureGraphInteractiveProps) {
  const [focusedSlug, setFocusedSlug] = useState<string | null>(initialFocusSlug);
  const [transform, setTransform] = useState<GraphTransform>(() => {
    return (
      computeFocusTransform(initialFocusSlug, positions, outerRadius, FOCUS_SCALE) ?? {
        x: 0,
        y: 0,
        scale: 1,
      }
    );
  });

  function focusOnSlug(slug: string) {
    const next = computeFocusTransform(slug, positions, outerRadius, Math.max(transform.scale, FOCUS_SCALE));
    if (!next) return; // Slug not in the graph — ignored silently, no crash, no fabricated node.
    setFocusedSlug(slug);
    setTransform(next);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <CultureGraphSearch nodes={nodes} onSelect={focusOnSlug} focusedSlug={focusedSlug} />
      <CultureGraphView
        nodes={nodes}
        edges={edges}
        positions={positions}
        outerRadius={outerRadius}
        transform={transform}
        onTransformChange={setTransform}
        focusedSlug={focusedSlug}
      />
    </div>
  );
}

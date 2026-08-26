"use client";

import { useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { getCategoryLabel, getDetailHref } from "@/lib/utils";
import type { ContentCategory } from "@/types";
import type { CultureGraphEdge, CultureGraphNode, GraphNodePosition } from "@/lib/discovery/cultureGraph";
import { CultureGraphEmptyState } from "@/components/culture-graph/CultureGraphEmptyState";

interface CultureGraphViewProps {
  nodes: readonly CultureGraphNode[];
  edges: readonly CultureGraphEdge[];
  positions: Record<string, GraphNodePosition>;
  outerRadius: number;
}

/** Matches Badge.tsx's existing per-category color language (fill instead of a bordered chip). */
const NODE_FILL: Record<ContentCategory, string> = {
  meme: "fill-fuchsia-400",
  slang: "fill-sky-400",
  trend: "fill-[var(--accent)]",
  brainrot: "fill-amber-400",
  event: "fill-emerald-400",
  creator: "fill-blue-400",
};

const MIN_SCALE = 0.4;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 1.3;
const NODE_RADIUS = 6;

/**
 * Plain SVG + pointer events — no graph/visualization library. The actual
 * requirements (pannable area, distinguishable nodes/edges, deterministic
 * initial positioning, zoom, reset) are all achievable with an SVG
 * transform and a handful of pointer handlers, at zero bundle cost and
 * fully deterministic behavior — no physics simulation to tune without a
 * live browser. Revisit only if a concrete need (e.g. very large graphs
 * needing real force-directed declutter) emerges later.
 */
export function CultureGraphView({ nodes, edges, positions, outerRadius }: CultureGraphViewProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  // Visual-only dedup: the underlying edge list intentionally keeps
  // `related` and a typed relationship (e.g. `relatedTo`) as two distinct
  // facts for the same pair (see cultureGraph.ts) — but drawing two
  // overlapping lines for one visual connection is just noise. Collapses
  // by unordered pair for rendering only; the data model itself is
  // untouched.
  const visualEdges = useMemo(() => {
    const seen = new Set<string>();
    const result: CultureGraphEdge[] = [];
    for (const edge of edges) {
      const key = [edge.from, edge.to].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(edge);
    }
    return result;
  }, [edges]);

  if (nodes.length === 0) {
    return <CultureGraphEmptyState />;
  }

  const viewBoxSize = outerRadius * 2;
  const half = outerRadius;

  function clampScale(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
  }

  function handleZoomIn() {
    setTransform((t) => ({ ...t, scale: clampScale(t.scale * ZOOM_STEP) }));
  }
  function handleZoomOut() {
    setTransform((t) => ({ ...t, scale: clampScale(t.scale / ZOOM_STEP) }));
  }
  function handleReset() {
    setTransform({ x: 0, y: 0, scale: 1 });
  }

  function handlePointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: transform.x,
      origY: transform.y,
    };
    (e.target as Element).setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setTransform((t) => ({ ...t, x: dragState.current!.origX + dx, y: dragState.current!.origY + dy }));
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  const buttonClass =
    "glass-card flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">
          {nodes.length} articles · {visualEdges.length} connections
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleZoomOut} aria-label="Zoom out" className={buttonClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3M8 11h6" />
            </svg>
          </button>
          <button type="button" onClick={handleZoomIn} aria-label="Zoom in" className={buttonClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset graph view"
            className="glass-card h-9 px-3 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
          >
            Reset
          </button>
        </div>
      </div>

      <svg
        role="img"
        aria-label="Culture Graph — visual map of relationships between Internet culture articles"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="glass-card h-[70vh] w-full max-h-[720px] cursor-grab touch-none rounded-2xl active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}>
          <g transform={`translate(${half} ${half})`}>
            {visualEdges.map((edge, i) => {
              const from = positions[edge.from];
              const to = positions[edge.to];
              if (!from || !to) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}-${i}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="stroke-white/10"
                  strokeWidth={1}
                />
              );
            })}

            {nodes.map((node) => {
              const pos = positions[node.slug];
              if (!pos) return null;
              const href = getDetailHref(node.category, node.slug);
              const label = `${node.title}, ${getCategoryLabel(node.category)}`;
              return (
                <a key={node.slug} href={href} aria-label={label}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_RADIUS}
                    className={`${NODE_FILL[node.category] ?? "fill-zinc-400"} stroke-[var(--surface)] transition-opacity hover:opacity-80`}
                    strokeWidth={1.5}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + NODE_RADIUS + 10}
                    textAnchor="middle"
                    className="pointer-events-none select-none fill-zinc-400 text-[6px]"
                  >
                    {node.title.length > 18 ? `${node.title.slice(0, 17)}…` : node.title}
                  </text>
                </a>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}

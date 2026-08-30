"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { Badge } from "@/components/ui/Badge";
import { getCategoryLabel, getDetailHref } from "@/lib/utils";
import type { ContentCategory } from "@/types";
import type { CultureGraphEdge, CultureGraphNode, GraphNodePosition, GraphTransform } from "@/lib/discovery/cultureGraph";
import { CultureGraphEmptyState } from "@/components/culture-graph/CultureGraphEmptyState";

interface CultureGraphViewProps {
  /** Already a bounded LOCAL subgraph (focused article + direct
   * connections, or a small default set) — never the whole graph. See
   * CultureGraphInteractive. */
  nodes: readonly CultureGraphNode[];
  edges: readonly CultureGraphEdge[];
  positions: Record<string, GraphNodePosition>;
  outerRadius: number;
  /** Seeds this component's own local pan/zoom state on mount. Parent
   * forces a remount (via `key`) when focus changes instead of pushing
   * updates into this prop after the fact — see CultureGraphInteractive. */
  initialTransform: GraphTransform;
  focusedSlug: string | null;
  /**
   * Clicking ANY node focuses it (recenters the local view on it and
   * reveals ITS direct connections) — this is the progressive-exploration
   * interaction the simplified graph is built around. Reading the actual
   * article is a separate, explicit action via "View Full Article" in the
   * preview panel below, using the same canonical routing as everywhere
   * else on the site.
   */
  onNodeFocus: (slug: string) => void;
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
 * Plain SVG + pointer events — no graph/visualization library. Renders
 * only the bounded local subgraph passed in; the "don't render hundreds
 * of nodes at once" fix lives in CultureGraphInteractive's data
 * selection, not here.
 */
export function CultureGraphView({
  nodes,
  edges,
  positions,
  outerRadius,
  initialTransform,
  focusedSlug,
  onNodeFocus,
}: CultureGraphViewProps) {
  const [transform, setTransform] = useState<GraphTransform>(initialTransform);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  // Visual-only dedup: see cultureGraph.ts — `related` and a typed
  // relationship can both exist for the same pair as distinct facts; drawing
  // two overlapping lines for one visual connection is just noise.
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

  const previewNode = hoveredSlug
    ? nodes.find((n) => n.slug === hoveredSlug)
    : focusedSlug
      ? nodes.find((n) => n.slug === focusedSlug)
      : null;

  function clampScale(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
  }

  function handleZoomIn() {
    setTransform({ ...transform, scale: clampScale(transform.scale * ZOOM_STEP) });
  }
  function handleZoomOut() {
    setTransform({ ...transform, scale: clampScale(transform.scale / ZOOM_STEP) });
  }
  function handleReset() {
    setTransform({ x: 0, y: 0, scale: 1 });
  }

  // Scroll/trackpad wheel over the graph zooms it — the primary desktop
  // zoom interaction; the buttons remain for keyboard/no-wheel users. A
  // native (non-passive) listener is required: React's synthetic onWheel
  // is attached passively by default, so e.preventDefault() inside a plain
  // onWheel prop would silently fail to stop the page from scrolling too.
  useEffect(() => {
    const el = svgWrapperRef.current;
    if (!el) return;
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      setTransform({ ...transform, scale: clampScale(transform.scale * factor) });
    }
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [transform]);

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
    setTransform({ ...transform, x: dragState.current.origX + dx, y: dragState.current.origY + dy });
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  const buttonClass =
    "glass-card flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40";

  if (nodes.length === 0) {
    return <CultureGraphEmptyState />;
  }

  const viewBoxSize = outerRadius * 2;
  const half = outerRadius;

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

      <div ref={svgWrapperRef} className="relative">
        <svg
          role="img"
          aria-label="Culture Graph — visual map of relationships between Internet culture articles. Click any article to explore its connections."
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
                const isFocused = node.slug === focusedSlug;
                const label = `${node.title}, ${getCategoryLabel(node.category)}${isFocused ? ", focused — showing its direct connections" : ", select to explore its connections"}`;
                return (
                  <g
                    key={node.slug}
                    role="button"
                    tabIndex={0}
                    aria-label={label}
                    className="cursor-pointer"
                    onClick={() => onNodeFocus(node.slug)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onNodeFocus(node.slug);
                      }
                    }}
                    onMouseEnter={() => setHoveredSlug(node.slug)}
                    onMouseLeave={() => setHoveredSlug((s) => (s === node.slug ? null : s))}
                    onFocus={() => setHoveredSlug(node.slug)}
                    onBlur={() => setHoveredSlug((s) => (s === node.slug ? null : s))}
                  >
                    {isFocused && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={NODE_RADIUS + 4}
                        className="fill-none stroke-[var(--accent)]"
                        strokeWidth={2}
                      />
                    )}
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
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        {previewNode && (
          <div className="glass-card absolute bottom-3 left-3 flex max-w-[min(280px,calc(100%-1.5rem))] items-center gap-2.5 p-2.5">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <EntryCardMedia entry={previewNode} aspect="square" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{previewNode.title}</p>
              <Badge category={previewNode.category} className="mt-0.5" />
              <p className="mt-1 line-clamp-2 text-xs text-zinc-400">{previewNode.description}</p>
              <Link
                href={getDetailHref(previewNode.category, previewNode.slug)}
                className="mt-1 inline-block text-xs font-medium text-[var(--accent)] hover:underline"
              >
                View Full Article →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

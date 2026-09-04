"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { Badge } from "@/components/ui/Badge";
import { getCategoryLabel, getDetailHref } from "@/lib/utils";
import type { ContentCategory } from "@/types";
import {
  getConnectedSlugs,
  type CultureGraphEdge,
  type CultureGraphNode,
  type GraphNodePosition,
  type GraphTransform,
} from "@/lib/discovery/cultureGraph";
import { CultureGraphEmptyState } from "@/components/culture-graph/CultureGraphEmptyState";

interface CultureGraphViewProps {
  /** The FULL canonical node/edge set — always rendered in full. Clutter is
   * addressed by layout quality (see computeFullGraphLayout) and by the
   * dim/highlight connection-focus mode below, never by hiding nodes. */
  nodes: readonly CultureGraphNode[];
  edges: readonly CultureGraphEdge[];
  positions: Record<string, GraphNodePosition>;
  outerRadius: number;
  /** Seeds this component's pan/zoom state on mount. */
  initialTransform: GraphTransform;
  /** Where to recenter when `recenterToken` changes — null when nothing is
   * focused (recenter is a no-op in that case). */
  recenterTransform: GraphTransform | null;
  /** Bumped by the parent every time a (re)center should happen — search
   * selection, URL focus, clicking a node, or the preview panel's "View in
   * Culture Graph" button. A token rather than the transform itself so
   * asking to recenter on the SAME article twice still works. */
  recenterToken: number;
  focusedSlug: string | null;
  /** Clicking a node focuses it: opens its preview and switches connection-
   * focus highlighting to it. */
  onNodeFocus: (slug: string) => void;
  /** "View in Culture Graph" in the preview — recenters on the already-
   * focused article without changing focus. */
  onRecenterFocused: () => void;
  /** Closes the preview and returns the graph to its normal, undimmed
   * full-network appearance. */
  onClearFocus: () => void;
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

const MIN_SCALE = 0.3;
// Raised from 4 → 10 so mobile pinch (and desktop wheel/buttons, which
// share the same clamp) can get substantially closer to individual nodes
// and their connections — the actual gesture handling/step size is
// otherwise unchanged.
const MAX_SCALE = 10;
const ZOOM_STEP = 1.2;
const NODE_RADIUS = 5;
/** Below this zoom level, labels are only drawn for focused/connected/
 * hovered nodes — showing all ~350 labels at once is exactly the clutter
 * this view is meant to fix. */
const LABEL_ZOOM_THRESHOLD = 1.4;

/**
 * Plain SVG + pointer events — no graph/visualization library. Renders the
 * WHOLE canonical network every time; "connection focus mode" dims
 * everything but the selected article and its direct connections without
 * ever removing nodes from the DOM (dimmed nodes stay visible, clickable,
 * and interactive).
 */
export function CultureGraphView({
  nodes,
  edges,
  positions,
  outerRadius,
  initialTransform,
  recenterTransform,
  recenterToken,
  focusedSlug,
  onNodeFocus,
  onRecenterFocused,
  onClearFocus,
}: CultureGraphViewProps) {
  const [transform, setTransform] = useState<GraphTransform>(initialTransform);
  // Every currently-down pointer, keyed by pointerId — the foundation for
  // telling a one-finger drag apart from a two-finger pinch. Touch and
  // mouse pointers share this same tracking; a mouse only ever produces
  // one at a time in practice.
  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  // Single-pointer pan (mouse drag, or one-finger touch drag — including
  // the finger left over after a pinch ends with the other lifted).
  const panState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);
  // Two-finger pinch — tracks the specific pair of pointer IDs involved
  // (never just "the first two in the map"), plus the distance/midpoint
  // from the previous move event so each frame only needs to apply the
  // incremental change since last time.
  const pinchState = useRef<{
    idA: number;
    idB: number;
    lastDistance: number;
    lastMidpoint: { x: number; y: number };
  } | null>(null);
  // Set the instant a drag or pinch does anything, so the browser's own
  // synthetic "click" event — fired right after pointerup, even after a
  // gesture — can be told apart from a real tap/click on a node.
  // Deliberately NOT cleared when the gesture ends (see below): the click
  // fires strictly after pointerup, so clearing it there would erase the
  // very information the click handler needs to read.
  const suppressNextClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Recenter whenever the parent bumps the token (search select, URL
  // focus, node click, or the preview's "View in Culture Graph" button) —
  // a plain effect keyed on the token, not on the transform value itself,
  // so recentering on the same article twice in a row still works.
  useEffect(() => {
    if (recenterToken === 0) return; // Initial mount already seeded via initialTransform.
    if (recenterTransform) {
      // This effect's entire purpose is to react to an explicit user action
      // (search select, URL focus, node click, "View in Culture Graph")
      // signaled by the parent bumping `recenterToken` — not to derive
      // state from a render, so there is no render-time equivalent.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransform(recenterTransform);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recenterToken]);

  // Visual-only dedup: `related` and a typed relationship can both exist
  // for the same pair as distinct facts; drawing two overlapping lines for
  // one visual connection is just noise.
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

  const connectedSlugs = useMemo(
    () => (focusedSlug ? getConnectedSlugs(edges, focusedSlug) : null),
    [edges, focusedSlug],
  );

  const previewNode = focusedSlug ? nodes.find((n) => n.slug === focusedSlug) ?? null : null;

  function isDimmed(slug: string): boolean {
    if (!focusedSlug) return false;
    if (slug === focusedSlug) return false;
    if (connectedSlugs?.has(slug)) return false;
    return true;
  }

  function edgeTouchesFocus(edge: CultureGraphEdge): boolean {
    return !!focusedSlug && (edge.from === focusedSlug || edge.to === focusedSlug);
  }

  const clampScale = useCallback((s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s)), []);

  // Keeps the viewBox point (vx, vy) fixed on screen while scaling by
  // `factor` — the one anchor-preserving zoom primitive shared by wheel
  // zoom, the +/- buttons, AND pinch zoom below, so all three zoom
  // interactions behave identically.
  const zoomAtPoint = useCallback(
    (vx: number, vy: number, factor: number) => {
      setTransform((t) => {
        const newScale = clampScale(t.scale * factor);
        const ratio = newScale / t.scale;
        return {
          scale: newScale,
          x: vx - ratio * (vx - t.x),
          y: vy - ratio * (vy - t.y),
        };
      });
    },
    [clampScale],
  );

  const pointerToViewBox = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      const viewBoxSize = outerRadius * 2;
      return {
        x: ((clientX - rect.left) / rect.width) * viewBoxSize,
        y: ((clientY - rect.top) / rect.height) * viewBoxSize,
      };
    },
    [outerRadius],
  );

  function handleZoomIn() {
    zoomAtPoint(outerRadius, outerRadius, ZOOM_STEP);
  }
  function handleZoomOut() {
    zoomAtPoint(outerRadius, outerRadius, 1 / ZOOM_STEP);
  }
  function handleReset() {
    setTransform({ x: 0, y: 0, scale: 1 });
  }

  // Scroll/trackpad wheel over the graph zooms it, centered on the pointer
  // — the primary desktop zoom interaction; the buttons remain for
  // keyboard/no-wheel users. A native (non-passive) listener is required:
  // React's synthetic onWheel is attached passively by default, so
  // e.preventDefault() inside a plain onWheel prop would silently fail to
  // stop the page from scrolling too. Attached only to the SVG itself, so
  // normal page scrolling outside the graph is completely unaffected.
  // Unchanged by the pinch-zoom work below — desktop wheel zoom keeps
  // behaving exactly as it did before.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const point = pointerToViewBox(e.clientX, e.clientY);
      if (!point) return;
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      zoomAtPoint(point.x, point.y, factor);
    }
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [pointerToViewBox, zoomAtPoint]);

  // Single window-level pointermove handler covering BOTH gesture types.
  // Deliberately reads/writes only refs and calls stable setters — kept
  // dependency-free (besides the already-stable zoom helpers above) so it
  // never needs to be re-subscribed mid-gesture.
  const handleWindowPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!activePointers.current.has(e.pointerId)) return;
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      const pinch = pinchState.current;
      if (
        pinch &&
        activePointers.current.has(pinch.idA) &&
        activePointers.current.has(pinch.idB)
      ) {
        const a = activePointers.current.get(pinch.idA)!;
        const b = activePointers.current.get(pinch.idB)!;
        const currentDistance = Math.hypot(a.x - b.x, a.y - b.y);
        const currentMidpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

        // Pan component: raw client-pixel delta of the midpoint, the same
        // convention the single-finger drag below uses, so a two-finger
        // pan feels the same speed as a one-finger drag.
        const dx = currentMidpoint.x - pinch.lastMidpoint.x;
        const dy = currentMidpoint.y - pinch.lastMidpoint.y;
        if (dx !== 0 || dy !== 0) {
          setTransform((t) => ({ ...t, x: t.x + dx, y: t.y + dy }));
        }

        // Zoom component: anchored at the CURRENT pinch midpoint via the
        // same viewBox-aware primitive wheel zoom uses, so expanding two
        // fingers zooms in / pinching inward zooms out, centered under
        // the fingers as they move — not a fixed point from gesture start.
        if (pinch.lastDistance > 0 && currentDistance > 0) {
          const point = pointerToViewBox(currentMidpoint.x, currentMidpoint.y);
          if (point) {
            zoomAtPoint(point.x, point.y, currentDistance / pinch.lastDistance);
          }
        }

        pinch.lastDistance = currentDistance;
        pinch.lastMidpoint = currentMidpoint;
        return;
      }

      const pan = panState.current;
      if (pan && e.pointerId === pan.pointerId) {
        const dx = e.clientX - pan.startX;
        const dy = e.clientY - pan.startY;
        if (!pan.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) pan.moved = true;
        setTransform((t) => ({ ...t, x: pan.origX + dx, y: pan.origY + dy }));
      }
    },
    [pointerToViewBox, zoomAtPoint],
  );

  // Fires on pointerup AND pointercancel — losing a pointer mid-gesture
  // (e.g. an OS gesture or an incoming call interrupting a touch) must be
  // handled the same way a normal release is, or stale pointer/gesture
  // state could be left behind.
  const handleWindowPointerEnd = useCallback((e: PointerEvent) => {
    const wasTracked = activePointers.current.delete(e.pointerId);
    if (!wasTracked) return;

    const pinch = pinchState.current;
    if (pinch && (e.pointerId === pinch.idA || e.pointerId === pinch.idB)) {
      // A pinch just ended (or dropped from two fingers to one) — never
      // treat the synthetic click this can trigger as a tap on whatever
      // ends up underneath the remaining/lifted finger.
      suppressNextClickRef.current = true;
      pinchState.current = null;

      const remaining = [...activePointers.current.entries()];
      if (remaining.length === 1) {
        // One finger is still down — hand off to single-finger panning
        // seamlessly instead of ending the interaction. setTransform's
        // functional form is used purely to read the latest transform
        // without needing it in this callback's closure/deps (which would
        // otherwise force re-subscribing the window listener on every
        // single pan/zoom update).
        const [pointerId, pos] = remaining[0];
        setTransform((t) => {
          panState.current = {
            pointerId,
            startX: pos.x,
            startY: pos.y,
            origX: t.x,
            origY: t.y,
            moved: true, // already mid-interaction; a stray tap here must still be suppressed
          };
          return t;
        });
      }
    } else if (panState.current && e.pointerId === panState.current.pointerId) {
      if (panState.current.moved) suppressNextClickRef.current = true;
      panState.current = null;
    }

    setIsDragging(activePointers.current.size > 0);
  }, []);

  // Window listeners are attached only while at least one pointer is down
  // (managed by React's effect lifecycle, not by manual self-referencing
  // add/removeEventListener calls) — the cleanest way to support a
  // variable number of pointerup/pointercancel events across a gesture
  // that can range from one finger to two and back to one.
  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerEnd);
    window.addEventListener("pointercancel", handleWindowPointerEnd);
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerEnd);
      window.removeEventListener("pointercancel", handleWindowPointerEnd);
    };
  }, [isDragging, handleWindowPointerMove, handleWindowPointerEnd]);

  function handlePointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    if (e.button !== 0) return; // Primary mouse button / touch only — matches native drag conventions.
    // Deliberately NOT using Element.setPointerCapture here — see the
    // window-level listener comment below for why (a captured node's
    // hover handlers re-rendering mid-pointerdown can throw and crash the
    // page). That reasoning applies just as much to touch pointers.
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size === 1) {
      panState.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origX: transform.x,
        origY: transform.y,
        moved: false,
      };
      pinchState.current = null;
    } else if (activePointers.current.size === 2) {
      // A second finger just touched down — this is a pinch starting, not
      // a drag. Cancel any single-finger pan in progress.
      panState.current = null;
      const [idA, idB] = [...activePointers.current.keys()];
      const a = activePointers.current.get(idA)!;
      const b = activePointers.current.get(idB)!;
      pinchState.current = {
        idA,
        idB,
        lastDistance: Math.hypot(a.x - b.x, a.y - b.y),
        lastMidpoint: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      };
    }
    // A third+ simultaneous pointer is tracked (so it's cleaned up
    // correctly on release) but otherwise ignored for gesture math.

    setIsDragging(true);
    // Listening on `window`, NOT via Element.setPointerCapture. Pointer
    // capture ties the drag to a single DOM node (`e.target`, which for a
    // click starting on a node is that node's own <g>), and this graph's
    // per-node hover handlers (onMouseEnter/onFocus) can trigger a
    // same-tick re-render while a pointerdown is being processed; if that
    // happens to touch the captured node, the browser can throw
    // `InvalidStateError`/`InvalidPointerId` out of `setPointerCapture` —
    // an uncaught exception that Next.js's route error boundary turns
    // into exactly "This page failed to load". Listening at the window
    // level is the standard, capture-free way to implement drag/pinch:
    // it needs no DOM node to stay mounted/valid for the whole gesture, so
    // there is nothing here left to throw. The actual add/removeEventListener
    // calls live in the effect above, keyed on `isDragging`.
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
          {focusedSlug ? " · showing direct connections" : ""}
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

      <div className="relative">
        <svg
          ref={svgRef}
          role="img"
          aria-label="Culture Graph — visual map of relationships between every Internet culture article. Scroll or pinch to zoom, drag to pan, click any article to see its connections."
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className={`glass-card h-[70vh] w-full max-h-[720px] touch-none rounded-2xl ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
        >
          <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}>
            <g transform={`translate(${half} ${half})`}>
              {visualEdges.map((edge, i) => {
                const from = positions[edge.from];
                const to = positions[edge.to];
                if (!from || !to) return null;
                const highlighted = edgeTouchesFocus(edge);
                const dimmed = !!focusedSlug && !highlighted;
                return (
                  <line
                    key={`${edge.from}-${edge.to}-${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={highlighted ? "stroke-[var(--accent)]" : "stroke-white/10"}
                    strokeWidth={highlighted ? 2 : 1}
                    style={{ opacity: dimmed ? 0.12 : 1 }}
                  />
                );
              })}

              {nodes.map((node) => {
                const pos = positions[node.slug];
                if (!pos) return null;
                const isFocused = node.slug === focusedSlug;
                const isConnected = !!connectedSlugs?.has(node.slug);
                const dimmed = isDimmed(node.slug);
                const isHovered = node.slug === hoveredSlug;
                const showLabel =
                  isFocused ||
                  isConnected ||
                  isHovered ||
                  (!focusedSlug && transform.scale >= LABEL_ZOOM_THRESHOLD);
                const label = `${node.title}, ${getCategoryLabel(node.category)}${
                  isFocused ? ", focused — showing its direct connections" : ", select to explore its connections"
                }`;
                return (
                  <g
                    key={node.slug}
                    role="button"
                    tabIndex={0}
                    aria-label={label}
                    className="cursor-pointer"
                    style={{ opacity: dimmed ? 0.22 : 1 }}
                    onClick={() => {
                      // The synthetic click after a real drag/pinch is
                      // swallowed exactly once here — see
                      // handleWindowPointerEnd.
                      if (suppressNextClickRef.current) {
                        suppressNextClickRef.current = false;
                        return;
                      }
                      onNodeFocus(node.slug);
                    }}
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
                    {(isFocused || isConnected) && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={NODE_RADIUS + (isFocused ? 5 : 3)}
                        className="fill-none stroke-[var(--accent)]"
                        strokeWidth={isFocused ? 2 : 1.5}
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={NODE_RADIUS}
                      className={`${NODE_FILL[node.category] ?? "fill-zinc-400"} stroke-[var(--surface)] transition-opacity hover:opacity-80`}
                      strokeWidth={1.5}
                    />
                    {showLabel && (
                      <text
                        x={pos.x}
                        y={pos.y + NODE_RADIUS + 9}
                        textAnchor="middle"
                        className="pointer-events-none select-none fill-zinc-300 text-[6px]"
                      >
                        {node.title.length > 18 ? `${node.title.slice(0, 17)}…` : node.title}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        {previewNode && (
          <div className="glass-card absolute bottom-3 left-3 flex max-w-[min(320px,calc(100%-1.5rem))] flex-col gap-2.5 p-3">
            <div className="flex items-start gap-2.5">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <EntryCardMedia entry={previewNode} aspect="square" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{previewNode.title}</p>
                <Badge category={previewNode.category} className="mt-0.5" />
                <p className="mt-1 line-clamp-2 text-xs text-zinc-400">{previewNode.description}</p>
              </div>
              <button
                type="button"
                onClick={onClearFocus}
                aria-label="Close preview"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onRecenterFocused}
                className="glass-card flex-1 rounded-xl px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                View in Culture Graph
              </button>
              <Link
                href={getDetailHref(previewNode.category, previewNode.slug)}
                className="flex flex-1 items-center justify-center rounded-xl bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                View Full Article
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

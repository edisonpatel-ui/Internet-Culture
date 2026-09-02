"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { Badge } from "@/components/ui/Badge";
import { formatTimelineDisplayLabel } from "@/lib/discovery/timeline";
import { getDetailHref } from "@/lib/utils";
import type { BaseEntry, TimelineField } from "@/types";

interface TimelineDetailPanelProps {
  entry: (BaseEntry & { timelineEntry: TimelineField }) | null;
  onClose: () => void;
}

/**
 * Persistent detail panel — NOT a modal/overlay. Desktop: docked beside the
 * track (handled by the parent's layout, this component just fills its
 * slot). Mobile: becomes a fixed bottom sheet purely via responsive CSS
 * (no JS viewport detection, so no hydration-mismatch risk) — same content,
 * same component, different position/sizing below the `lg` breakpoint.
 *
 * Renders nothing when `entry` is null on mobile (nothing to show, no
 * empty sheet taking up space); on desktop, the parent still reserves the
 * panel's layout slot — see TimelineExplorer's article-level layout.
 *
 * All content comes directly from the `entry` object already passed down
 * from the server-fetched, canonical `featuredEntries` array — nothing is
 * separately fetched or duplicated, so the panel can never show stale data
 * relative to the current build's content.
 */
export function TimelineDetailPanel({ entry, onClose }: TimelineDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!entry) return;
    previouslyFocused.current = document.activeElement;
    // Move focus into the panel when it opens/updates — the live region
    // below also announces the change for screen readers that don't
    // follow focus moves as closely (e.g. rapid arrow-key browsing).
    panelRef.current?.focus();
  }, [entry]);

  function handleClose() {
    onClose();
    if (previouslyFocused.current instanceof HTMLElement) {
      previouslyFocused.current.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  }

  if (!entry) {
    // Desktop keeps the panel's layout slot reserved with a placeholder
    // (avoids the track visually jumping wider/narrower on select/close);
    // mobile renders nothing until something is selected — no floating
    // empty bottom sheet.
    return (
      <div className="glass-card hidden lg:sticky lg:top-24 lg:flex lg:h-fit lg:w-80 lg:shrink-0 lg:flex-col lg:items-center lg:justify-center lg:gap-2 lg:p-8 lg:text-center">
        <p className="text-sm text-zinc-500">
          Select a Timeline milestone to learn more.
        </p>
      </div>
    );
  }

  const dateLabel = formatTimelineDisplayLabel(entry.timelineEntry);
  const description = entry.timelineEntry.whyItMatters?.trim() || entry.description;
  const articleHref = getDetailHref(entry.category, entry.slug);
  const cultureGraphHref = `/culture-graph?focus=${encodeURIComponent(entry.slug)}`;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={`${entry.title} — Timeline milestone details`}
      aria-live="polite"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="glass-card fixed inset-x-0 bottom-0 z-40 max-h-[75vh] overflow-y-auto rounded-b-none p-4 focus:outline-none lg:sticky lg:top-24 lg:inset-x-auto lg:bottom-auto lg:z-auto lg:max-h-[calc(100vh-7rem)] lg:w-80 lg:shrink-0 lg:rounded-2xl lg:p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="font-page text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Timeline milestone
        </p>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close detail panel"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <EntryCardMedia entry={entry} aspect="wide" className="mb-4 rounded-xl" />

      <div className="mb-2 flex items-center gap-2">
        <Badge category={entry.category} />
        <span className="text-xs text-zinc-500">{dateLabel}</span>
      </div>

      <h2 className="font-page mb-2 text-xl font-bold text-white">{entry.title}</h2>

      <p className="mb-5 text-sm leading-relaxed text-zinc-400">{description}</p>

      <div className="flex flex-col gap-2">
        <Link
          href={articleHref}
          className="flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
        >
          View Full Article
        </Link>
        <Link
          href={cultureGraphHref}
          className="glass-card flex items-center justify-center px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
        >
          Explore in Culture Graph
        </Link>
      </div>
    </div>
  );
}

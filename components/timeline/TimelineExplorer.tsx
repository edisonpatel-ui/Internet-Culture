"use client";

import { useMemo, useState } from "react";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { TimelineCard } from "@/components/timeline/TimelineCard";
import { TimelineDetailPanel } from "@/components/timeline/TimelineDetailPanel";
import {
  getTimelineArticlesForMonth,
  getTimelineMonthsInYear,
  getTimelineYearsInDecade,
  getUndatedEntriesInYear,
  groupTimelineEntriesByDecade,
  type TimelineMonthGroup,
  type TimelineYearWithDefining,
} from "@/lib/discovery/timeline";
import type { BaseEntry } from "@/types";

interface TimelineExplorerProps {
  /** Already filtered to `timelineEntry.featured === true`, computed once
   * server-side — same canonical source as before. Every decade/year/
   * month grouping below is derived from this on every render, so
   * additions/deletions/re-dating/score changes all propagate
   * automatically without a separate maintained list. */
  featuredEntries: readonly BaseEntry[];
}

type ExplorerLevel = "decades" | "years" | "months" | "articles";

interface ExplorerState {
  level: ExplorerLevel;
  decade: number | null;
  year: number | null;
  /** A real month (1–12), or "undated" for the year's imprecise-date
   * bucket, or null when not at the articles level. */
  month: number | "undated" | null;
}

/**
 * Hierarchical time explorer — the Timeline's primary navigation.
 * Decades → years → months → articles, each level choosing ONE "most
 * defining" article (by canonical influence score) for its preview image,
 * derived automatically rather than a manually maintained list. Replaces
 * the old zoom/pan track entirely; the article-level step reuses the
 * existing TimelineCard + TimelineDetailPanel detail experience unchanged.
 */
export function TimelineExplorer({ featuredEntries }: TimelineExplorerProps) {
  const [state, setState] = useState<ExplorerState>({
    level: "decades",
    decade: null,
    year: null,
    month: null,
  });
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const decadeGroups = useMemo(
    () => groupTimelineEntriesByDecade(featuredEntries),
    [featuredEntries],
  );

  const yearGroups = useMemo<TimelineYearWithDefining[]>(() => {
    if (state.decade === null) return [];
    return getTimelineYearsInDecade(featuredEntries, state.decade);
  }, [featuredEntries, state.decade]);

  const monthGroups = useMemo<TimelineMonthGroup[]>(() => {
    if (state.year === null) return [];
    return getTimelineMonthsInYear(featuredEntries, state.year);
  }, [featuredEntries, state.year]);

  const undatedInYear = useMemo(() => {
    if (state.year === null) return [];
    return getUndatedEntriesInYear(featuredEntries, state.year);
  }, [featuredEntries, state.year]);

  const monthArticles = useMemo(() => {
    if (state.year === null) return [];
    if (state.month === "undated") return undatedInYear;
    if (state.month === null) return [];
    return getTimelineArticlesForMonth(featuredEntries, state.year, state.month);
  }, [featuredEntries, state.year, state.month, undatedInYear]);

  const selectedEntry = useMemo(() => {
    if (!selectedSlug) return null;
    const found = monthArticles.find((e) => e.slug === selectedSlug);
    return found?.timelineEntry ? { ...found, timelineEntry: found.timelineEntry } : null;
  }, [monthArticles, selectedSlug]);

  function openDecade(decade: number) {
    setState({ level: "years", decade, year: null, month: null });
  }
  function openYear(year: number) {
    setState((s) => ({ level: "months", decade: s.decade, year, month: null }));
  }
  function openMonth(month: number | "undated") {
    setState((s) => ({ level: "articles", decade: s.decade, year: s.year, month }));
    setSelectedSlug(null);
  }
  function backToDecades() {
    setState({ level: "decades", decade: null, year: null, month: null });
  }
  function backToYears() {
    setState((s) => ({ level: "years", decade: s.decade, year: null, month: null }));
  }
  function backToMonths() {
    setState((s) => ({ level: "months", decade: s.decade, year: s.year, month: null }));
    setSelectedSlug(null);
  }

  const monthLabel =
    state.month === "undated"
      ? "Undated within the year"
      : monthGroups.find((m) => m.month === state.month)?.label ?? "";

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        decade={state.decade}
        year={state.year}
        monthLabel={state.level === "articles" ? monthLabel : null}
        onDecades={backToDecades}
        onYears={backToYears}
        onMonths={backToMonths}
      />

      {state.level === "decades" && (
        <TileGrid>
          {decadeGroups.map((g) => (
            <DefiningTile
              key={g.decade}
              entry={g.definingEntry}
              label={g.label}
              count={g.entries.length}
              onSelect={() => openDecade(g.decade)}
            />
          ))}
        </TileGrid>
      )}

      {state.level === "years" && (
        <TileGrid>
          {yearGroups.map((g) => (
            <DefiningTile
              key={g.year}
              entry={g.definingEntry}
              label={String(g.year)}
              count={g.entries.length}
              onSelect={() => openYear(g.year)}
            />
          ))}
        </TileGrid>
      )}

      {state.level === "months" && (
        <TileGrid>
          {monthGroups.map((g) => (
            <DefiningTile
              key={g.month}
              entry={g.definingEntry}
              label={g.label}
              count={g.entries.length}
              onSelect={() => openMonth(g.month)}
            />
          ))}
          {undatedInYear.length > 0 && (
            <DefiningTile
              entry={pickBestOf(undatedInYear)}
              label="Undated"
              count={undatedInYear.length}
              onSelect={() => openMonth("undated")}
            />
          )}
        </TileGrid>
      )}

      {state.level === "articles" && (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div
              role="region"
              aria-label={`Timeline milestones — ${monthLabel}`}
              className="flex flex-wrap gap-3"
            >
              {monthArticles.map((entry) => {
                if (!entry.timelineEntry) return null;
                return (
                  <TimelineCard
                    key={entry.slug}
                    entry={{ ...entry, timelineEntry: entry.timelineEntry }}
                    selected={entry.slug === selectedSlug}
                    onSelect={setSelectedSlug}
                  />
                );
              })}
            </div>
          </div>
          <TimelineDetailPanel entry={selectedEntry} onClose={() => setSelectedSlug(null)} />
        </div>
      )}
    </div>
  );
}

/** Highest-influence entry, for the "Undated" bucket's tile image — same
 * convention as every other level, just inlined since that bucket isn't a
 * TimelineMonthGroup. */
function pickBestOf(entries: readonly BaseEntry[]): BaseEntry {
  return [...entries].sort((a, b) => (b.scores?.influence ?? 0) - (a.scores?.influence ?? 0))[0];
}

function TileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{children}</div>
  );
}

interface DefiningTileProps {
  /** The single most defining article for this bucket — its media is the
   * ONLY image shown, never a composite of multiple articles. */
  entry: BaseEntry;
  label: string;
  count: number;
  onSelect: () => void;
}

function DefiningTile({ entry, label, count, onSelect }: DefiningTileProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${label}, ${count} milestone${count === 1 ? "" : "s"}`}
      className="glass-card group flex flex-col overflow-hidden text-left transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
    >
      <EntryCardMedia entry={entry} aspect="wide" className="transition-transform group-hover:scale-[1.03]" />
      <div className="flex flex-col gap-0.5 p-3">
        <p className="font-page text-lg font-bold text-white">{label}</p>
        <p className="text-xs text-zinc-500">
          {count} milestone{count === 1 ? "" : "s"}
        </p>
      </div>
    </button>
  );
}

interface BreadcrumbProps {
  decade: number | null;
  year: number | null;
  monthLabel: string | null;
  onDecades: () => void;
  onYears: () => void;
  onMonths: () => void;
}

function Breadcrumb({ decade, year, monthLabel, onDecades, onYears, onMonths }: BreadcrumbProps) {
  const crumbClass =
    "font-page text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline";
  return (
    <nav aria-label="Timeline navigation" className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onDecades} className={decade === null ? "font-page text-sm font-semibold text-white" : crumbClass}>
        All decades
      </button>
      {decade !== null && (
        <>
          <span className="text-zinc-600">/</span>
          <button type="button" onClick={onYears} className={year === null ? "font-page text-sm font-semibold text-white" : crumbClass}>
            {decade}s
          </button>
        </>
      )}
      {year !== null && (
        <>
          <span className="text-zinc-600">/</span>
          <button type="button" onClick={onMonths} className={monthLabel === null ? "font-page text-sm font-semibold text-white" : crumbClass}>
            {year}
          </button>
        </>
      )}
      {monthLabel !== null && (
        <>
          <span className="text-zinc-600">/</span>
          <span className="font-page text-sm font-semibold text-white">{monthLabel}</span>
        </>
      )}
    </nav>
  );
}

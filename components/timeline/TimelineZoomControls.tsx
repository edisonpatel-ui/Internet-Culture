"use client";

interface TimelineZoomControlsProps {
  rangeLabel: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanPrev: () => void;
  onPanNext: () => void;
  onReset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  canPanPrev: boolean;
  canPanNext: boolean;
}

/**
 * Real, keyboard-operable buttons (not gesture-only) per the accessibility
 * requirement in the approved spec — pinch/drag can be a future
 * enhancement, buttons are the accessible baseline and the only
 * interaction implemented in Stage 3.
 */
export function TimelineZoomControls({
  rangeLabel,
  onZoomIn,
  onZoomOut,
  onPanPrev,
  onPanNext,
  onReset,
  canZoomIn,
  canZoomOut,
  canPanPrev,
  canPanNext,
}: TimelineZoomControlsProps) {
  const buttonClass =
    "glass-card flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="font-page text-lg font-semibold text-white">{rangeLabel}</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPanPrev}
          disabled={!canPanPrev}
          aria-label="Pan to earlier period"
          className={buttonClass}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          disabled={!canZoomOut}
          aria-label="Zoom out"
          className={buttonClass}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3M8 11h6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onZoomIn}
          disabled={!canZoomIn}
          aria-label="Zoom in"
          className={buttonClass}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onPanNext}
          disabled={!canPanNext}
          aria-label="Pan to later period"
          className={buttonClass}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onReset}
          className="glass-card h-9 px-3 text-xs font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/**
 * Intentional empty state — not a broken/blank UI. Shown when there are
 * currently zero `timelineEntry.featured` entries at all. This is expected
 * right after Stage 1/2 ship (no entry has been marked featured yet), and
 * remains correct behavior going forward if eligibility is ever fully
 * cleared.
 */
export function TimelineEmptyState() {
  return (
    <div className="glass-card flex flex-col items-center gap-2 px-6 py-16 text-center">
      <p className="font-page text-lg font-semibold text-white">
        No Timeline milestones yet
      </p>
      <p className="max-w-md text-sm text-zinc-400">
        Major and influential Internet culture moments will appear here once
        articles are explicitly marked as Timeline milestones.
      </p>
    </div>
  );
}

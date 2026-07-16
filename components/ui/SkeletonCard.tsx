/** Pulse-animated skeleton card that mirrors the glass-card + ImagePlaceholder layout. */
export function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="aspect-video rounded-t-2xl bg-white/5" />
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="h-4 w-3/4 rounded-lg bg-white/5" />
          <div className="h-5 w-12 rounded-full bg-white/5" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded-lg bg-white/5" />
          <div className="h-3 w-2/3 rounded-lg bg-white/5" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-2 w-full rounded-full bg-white/5" />
          <div className="h-2 w-full rounded-full bg-white/5" />
          <div className="h-2 w-full rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}

/** Grid of skeleton cards for list pages. */
export function SkeletonGrid({ count = 6, cols = 3 }: { count?: number; cols?: 2 | 3 | 4 }) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <div className={`grid gap-4 ${colClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/** Skeleton for a page header (title + description block). */
export function SkeletonPageHeader() {
  return (
    <div className="mb-12 animate-pulse">
      <div className="mb-4 h-6 w-32 rounded-full bg-white/5" />
      <div className="h-10 w-2/3 rounded-xl bg-white/5 sm:h-12" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full max-w-xl rounded-lg bg-white/5" />
        <div className="h-4 w-3/4 max-w-lg rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

/** Skeleton for a section header. */
export function SkeletonSectionHeader() {
  return (
    <div className="mb-6 animate-pulse">
      <div className="h-6 w-48 rounded-lg bg-white/5" />
      <div className="mt-1 h-4 w-72 rounded-lg bg-white/5" />
    </div>
  );
}

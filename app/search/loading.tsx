export default function SearchLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-10 animate-pulse">
        <div className="h-10 w-48 rounded-xl bg-white/5 sm:h-12" />
        <div className="mt-3 h-4 w-72 rounded-lg bg-white/5" />
      </div>

      {/* Search input skeleton */}
      <div className="mb-6 h-14 animate-pulse rounded-2xl bg-white/5" />

      {/* Filter pills skeleton */}
      <div className="mb-6 flex animate-pulse gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-16 rounded-full bg-white/5" />
        ))}
      </div>

      {/* Empty state placeholder */}
      <div className="glass-card flex flex-col items-center justify-center py-16 animate-pulse">
        <div className="h-12 w-12 rounded-xl bg-white/5" />
        <div className="mt-4 h-5 w-48 rounded-lg bg-white/5" />
        <div className="mt-2 h-4 w-64 rounded-lg bg-white/5" />
      </div>
    </main>
  );
}

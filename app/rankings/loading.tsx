import { SkeletonPageHeader } from "@/components/ui/SkeletonCard";

export default function RankingsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />

      {/* Ranking nav pills */}
      <div className="mb-10 grid animate-pulse grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="glass-card flex flex-col items-center gap-2 p-4">
            <div className="h-7 w-7 rounded-lg bg-white/5" />
            <div className="h-3 w-16 rounded-lg bg-white/5" />
          </div>
        ))}
      </div>

      {/* Ranking list placeholders */}
      <div className="space-y-12">
        {Array.from({ length: 3 }).map((_, sectionIdx) => (
          <div key={sectionIdx} className="animate-pulse">
            <div className="mb-6">
              <div className="h-6 w-48 rounded-lg bg-white/5" />
              <div className="mt-1 h-4 w-72 rounded-lg bg-white/5" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="glass-card flex items-center gap-4 p-4">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-white/5" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 w-48 rounded-lg bg-white/5" />
                    <div className="h-3 w-24 rounded-lg bg-white/5" />
                  </div>
                  <div className="h-6 w-12 shrink-0 rounded-lg bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

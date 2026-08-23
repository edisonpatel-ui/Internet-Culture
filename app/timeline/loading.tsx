import { SkeletonPageHeader } from "@/components/ui/SkeletonCard";

export default function TimelineLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />

      <div className="flex animate-pulse gap-6 overflow-x-hidden pb-4">
        {Array.from({ length: 3 }).map((_, groupIdx) => (
          <div key={groupIdx} className="flex shrink-0 flex-col gap-3">
            <div className="h-4 w-12 rounded-lg bg-white/5" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, cardIdx) => (
                <div
                  key={cardIdx}
                  className="glass-card flex w-40 shrink-0 flex-col gap-2 p-2.5 sm:w-44"
                >
                  <div className="aspect-square w-full rounded-lg bg-white/5" />
                  <div className="h-4 w-16 rounded-lg bg-white/5" />
                  <div className="h-4 w-full rounded-lg bg-white/5" />
                  <div className="h-3 w-20 rounded-lg bg-white/5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

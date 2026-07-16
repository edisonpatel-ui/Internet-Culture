import {
  SkeletonPageHeader,
  SkeletonSectionHeader,
  SkeletonGrid,
} from "@/components/ui/SkeletonCard";

export default function TrendingLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />

      {/* Stats bar */}
      <div className="mb-10 grid grid-cols-2 gap-3 animate-pulse sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className="mx-auto h-6 w-6 rounded-lg bg-white/5" />
            <div className="mx-auto mt-2 h-7 w-12 rounded-lg bg-white/5" />
            <div className="mx-auto mt-1 h-3 w-20 rounded-lg bg-white/5" />
          </div>
        ))}
      </div>

      <section className="mb-12">
        <SkeletonSectionHeader />
        <SkeletonGrid count={6} cols={3} />
      </section>

      <section className="mb-12">
        <SkeletonSectionHeader />
        <SkeletonGrid count={4} cols={4} />
      </section>
    </main>
  );
}

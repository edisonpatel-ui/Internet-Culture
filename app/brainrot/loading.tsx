import {
  SkeletonPageHeader,
  SkeletonSectionHeader,
  SkeletonGrid,
} from "@/components/ui/SkeletonCard";

export default function BrainrotLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />
      {/* What is Brainrot explanation block */}
      <div className="mb-10 h-24 animate-pulse glass-card rounded-2xl bg-white/5" />
      <section className="mb-12">
        <SkeletonSectionHeader />
        <SkeletonGrid count={3} cols={3} />
      </section>
      <section className="mb-12">
        <SkeletonSectionHeader />
        <SkeletonGrid count={6} cols={3} />
      </section>
    </main>
  );
}

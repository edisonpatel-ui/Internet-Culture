import { SkeletonPageHeader } from "@/components/ui/SkeletonCard";

export default function CultureGraphLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />
      <div className="glass-card h-[70vh] max-h-[720px] w-full animate-pulse rounded-2xl" />
    </main>
  );
}

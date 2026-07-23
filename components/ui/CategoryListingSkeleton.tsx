import {
  SkeletonPageHeader,
  SkeletonSectionHeader,
  SkeletonGrid,
} from "@/components/ui/SkeletonCard";

/**
 * Shared loading shell for category listing routes
 * (/memes, /slang, /events, /people, /trending, /brainrot).
 */
export function CategoryListingSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />
      <section className="mb-12">
        <SkeletonSectionHeader />
        <SkeletonGrid count={6} cols={3} />
      </section>
      <section>
        <SkeletonSectionHeader />
        <SkeletonGrid count={6} cols={3} />
      </section>
    </main>
  );
}

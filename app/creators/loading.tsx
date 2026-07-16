import {
  SkeletonGrid,
  SkeletonPageHeader,
  SkeletonSectionHeader,
} from "@/components/ui/SkeletonCard";

export default function CreatorsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <SkeletonPageHeader />
      <SkeletonSectionHeader />
      <SkeletonGrid count={6} cols={3} />
    </main>
  );
}

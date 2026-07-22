import type { Metadata } from "next";
import {
  listApprovedResearch,
  listResearchPackages,
} from "@/lib/admin/researchReview";
import { ResearchReviewList } from "@/components/admin/researchReview/ResearchReviewList";

export const metadata: Metadata = {
  title: "Research Review (Internal)",
  robots: { index: false, follow: false },
};

/**
 * Queue of ResearchPackages awaiting / completed human approval.
 */
export default function ResearchReviewIndexPage() {
  const packages = listResearchPackages();
  const approvals = listApprovedResearch();
  const approvalsByPackageId = Object.fromEntries(
    approvals.map((a) => [a.researchPackageId, a]),
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Research Review
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Structured decisions only — AI recommends first, high confidence
          auto-accepts, and you click Keep / Alternative when something is
          ambiguous. Then generate the article.
        </p>
      </header>
      <ResearchReviewList
        packages={packages}
        approvalsByPackageId={approvalsByPackageId}
      />
    </main>
  );
}

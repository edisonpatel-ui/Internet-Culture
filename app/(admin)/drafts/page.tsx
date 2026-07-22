import type { Metadata } from "next";
import { listDraftPackages } from "@/lib/admin/draftGeneration";
import { listApprovedDrafts } from "@/lib/admin/draftReview";
import { DraftReviewList } from "@/components/admin/drafts/DraftReviewList";

export const metadata: Metadata = {
  title: "Drafts | Internal Editorial OS",
  robots: { index: false, follow: false },
};

/**
 * Draft queue — open Article Preview to review like a visitor.
 */
export default function DraftsIndexPage() {
  const drafts = listDraftPackages();
  const approvals = listApprovedDrafts();
  const approvalsByDraftId = Object.fromEntries(
    approvals.map((a) => [a.draftPackageId, a]),
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Drafts
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Generated encyclopedia articles ready for preview. Open a draft to
          read it, leave feedback, and approve — publishing stays on Publish.
        </p>
      </header>
      <DraftReviewList
        drafts={drafts}
        approvalsByDraftId={approvalsByDraftId}
      />
    </main>
  );
}

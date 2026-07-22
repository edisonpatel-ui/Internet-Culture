import type { Metadata } from "next";
import { listApprovedDrafts } from "@/lib/admin/draftReview";
import { PublishWorkspace } from "@/components/admin/publish/PublishWorkspace";

export const metadata: Metadata = {
  title: "Publish Prep (Internal)",
  robots: { index: false, follow: false },
};

/**
 * Publish preparation — ApprovedDraft → ContentEntryCandidate (no FS writes).
 */
export default function PublishPage() {
  const approvedDrafts = listApprovedDrafts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Publish Prep
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Prepare approved drafts for human{" "}
          <code className="text-zinc-400">lib/content</code> commits. Never
          auto-publishes.
        </p>
      </header>
      <PublishWorkspace approvedDrafts={approvedDrafts} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { listDraftPackages } from "@/lib/admin/draftGeneration";
import { DraftsGrid } from "@/components/admin/drafts/DraftsGrid";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export const metadata: Metadata = {
  title: "Drafts (Experimental)",
  robots: { index: false, follow: false },
};

export default function ExperimentalDraftsPage() {
  const drafts = listDraftPackages();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
            Experimental AI Lab
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
            Drafts
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Unpublished encyclopedia articles ready to review.
          </p>
        </div>
        <Link
          href={experimentalPaths.create}
          className="rounded-md border border-zinc-600 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
        >
          Create Article
        </Link>
      </header>
      <DraftsGrid drafts={drafts} />
    </main>
  );
}

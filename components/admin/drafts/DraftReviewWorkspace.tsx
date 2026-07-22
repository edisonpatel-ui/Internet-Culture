/**
 * @deprecated Field-level Draft Review.
 * Primary editor experience is ArticlePreviewWorkspace at /article-preview/[id].
 * Kept for emergency technical inspection only — not linked from nav.
 */

"use client";

import Link from "next/link";
import type { DraftPackage } from "@/lib/ai/packages";

interface DraftReviewWorkspaceProps {
  draft: DraftPackage;
}

export function DraftReviewWorkspace({ draft }: DraftReviewWorkspaceProps) {
  return (
    <div className="rounded-lg border border-zinc-800 p-6 text-sm text-zinc-400">
      <p>
        Field-level draft review is retired. Open the visitor-style article
        preview instead.
      </p>
      <Link
        href={`/article-preview/${draft.id}`}
        className="mt-4 inline-flex rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
      >
        Open article preview
      </Link>
    </div>
  );
}

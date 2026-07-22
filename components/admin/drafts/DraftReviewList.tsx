import Link from "next/link";
import type { ApprovedDraft, DraftPackage } from "@/lib/ai/packages";

interface DraftReviewListProps {
  drafts: DraftPackage[];
  approvalsByDraftId: Record<string, ApprovedDraft>;
}

export function DraftReviewList({
  drafts,
  approvalsByDraftId,
}: DraftReviewListProps) {
  if (drafts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 px-6 py-12 text-center">
        <p className="text-sm text-zinc-400">No article drafts yet.</p>
        <p className="mt-2 text-xs text-zinc-600">
          When research is approved, generate a draft — then review it as a
          full article.
        </p>
        <p className="mt-4 text-xs">
          <Link href="/research-review" className="text-zinc-300 underline">
            Research Review
          </Link>
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
      {drafts.map((draft) => {
        const approved = approvalsByDraftId[draft.id];
        return (
          <li key={draft.id}>
            <Link
              href={`/article-preview/${draft.id}`}
              className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-zinc-100">{draft.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {draft.category}
                  {typeof draft.revision === "number" && draft.revision > 0
                    ? ` · rev ${draft.revision}`
                    : ""}
                </p>
              </div>
              <span
                className={`text-xs ${
                  approved ? "text-emerald-400/90" : "text-amber-300/90"
                }`}
              >
                {approved ? "Approved" : "Open preview"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

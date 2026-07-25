import Link from "next/link";
import type { DraftPackage } from "@/lib/ai/packages";
import { getEntryPreviewImageUrl } from "@/lib/media/mediaUtils";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export function DraftsGrid({ drafts }: { drafts: DraftPackage[] }) {
  const open = drafts.filter((d) => d.status !== "published");

  if (open.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 px-6 py-16 text-center">
        <p className="text-sm text-zinc-400">No unpublished drafts yet.</p>
        <p className="mt-2 text-xs text-zinc-600">
          <Link
            href={experimentalPaths.create}
            className="text-zinc-300 underline"
          >
            Draft Studio
          </Link>{" "}
          to generate one.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {open.map((draft) => {
        const article = draftPackageToPresentationArticle(draft);
        const thumb = getEntryPreviewImageUrl(article.entry);
        return (
          <li key={draft.id}>
            <Link
              href={experimentalPaths.draft(draft.id)}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-600 hover:bg-zinc-900/40"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="font-medium text-zinc-100 group-hover:text-white">
                  {draft.title}
                </p>
                <p className="text-xs capitalize text-zinc-500">
                  {draft.category}
                  {" · "}
                  {draft.status ?? "draft"}
                </p>
                <p className="mt-auto pt-2 text-[11px] text-zinc-600">
                  Created {formatDate(draft.createdAt)}
                  {" · "}
                  Updated {formatDate(draft.updatedAt ?? draft.createdAt)}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

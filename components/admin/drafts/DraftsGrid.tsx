"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { DraftPackage } from "@/lib/ai/packages";
import { getEntryPreviewImageUrl } from "@/lib/media/mediaUtils";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import { deleteDraftAction } from "@/lib/admin/editorialOs/actions";

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

function DraftCard({ draft }: { draft: DraftPackage }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);
  const article = draftPackageToPresentationArticle(draft);
  const thumb = getEntryPreviewImageUrl(article.entry);

  function onDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete "${draft.title}"? This can't be undone.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deleteDraftAction(draft.id);
      if (result.ok) {
        setHidden(true);
        router.refresh();
      }
    });
  }

  if (hidden) return null;

  return (
    <li className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-600 hover:bg-zinc-900/40">
      <button
        type="button"
        disabled={pending}
        onClick={onDelete}
        title="Delete draft"
        className="absolute right-2 top-2 z-10 rounded-md border border-zinc-700 bg-zinc-950/90 px-2 py-1 text-[11px] text-red-400 opacity-0 transition-opacity hover:border-red-800 hover:bg-red-950/60 hover:text-red-300 disabled:opacity-50 group-hover:opacity-100"
      >
        {pending ? "…" : "Delete"}
      </button>
      <Link href={experimentalPaths.draft(draft.id)} className="flex flex-1 flex-col">
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
      {open.map((draft) => (
        <DraftCard key={draft.id} draft={draft} />
      ))}
    </ul>
  );
}

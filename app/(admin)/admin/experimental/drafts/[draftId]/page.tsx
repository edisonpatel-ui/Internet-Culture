import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  loadDraftPackage,
  loadPublicDraftPackage,
} from "@/lib/admin/draftGeneration";
import { DraftArticleView } from "@/components/admin/drafts/DraftArticleView";
import { requireAdminSession } from "@/lib/admin/auth/requireAdmin";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import { getDetailHref } from "@/lib/utils";

type Props = { params: Promise<{ draftId: string }> };

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Draft Preview (Experimental)",
  robots: { index: false, follow: false },
};

export default async function ExperimentalDraftDetailPage({ params }: Props) {
  const access = await requireAdminSession();
  if (!access.ok) notFound();

  const { draftId } = await params;
  const raw = loadDraftPackage(draftId);

  if (raw?.status === "published") {
    const href = getDetailHref(raw.category, raw.slugSuggestion);
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-500/90">
          Published
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-zinc-50">
          Draft already published
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          “{raw.title}” is live in the encyclopedia.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={href}
            className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40"
          >
            Open live article
          </Link>
          <Link
            href={experimentalPaths.drafts}
            className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            Back to Drafts
          </Link>
          <Link
            href={experimentalPaths.create}
            className="rounded-md border border-zinc-800 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-300"
          >
            Back to Prompt
          </Link>
        </div>
      </main>
    );
  }

  const draft = loadPublicDraftPackage(draftId);
  if (!draft) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-50">Draft not found</h1>
        <p className="mt-2 text-sm text-zinc-500">
          This draft may have expired or the id is invalid. Generate a new one
          from Prompt.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={experimentalPaths.create}
            className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Back to Prompt
          </Link>
          <Link
            href={experimentalPaths.drafts}
            className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            All drafts
          </Link>
        </div>
      </main>
    );
  }

  return <DraftArticleView draft={draft} />;
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { EditSession } from "@/lib/admin/editorialOs";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import { publishFromEditAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

function sectionMap(
  article: ReturnType<typeof draftPackageToPresentationArticle>,
) {
  return new Map(article.sections.map((s) => [s.id, s.body]));
}

export function EditRevisionView({ session }: { session: EditSession }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const previous = draftPackageToPresentationArticle(session.previousDraft);
  const revised = draftPackageToPresentationArticle(session.revisedDraft);
  const prevBodies = sectionMap(previous);
  const changedIds = new Set(
    revised.sections
      .filter((s) => prevBodies.get(s.id) !== s.body)
      .map((s) => s.id),
  );
  const leadChanged = previous.lead !== revised.lead;

  function onPublish() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await publishFromEditAction(session.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage("Published to the encyclopedia.");
      router.push(experimentalPaths.published);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            Edits
          </p>
          <h1 className="mt-1 text-xl font-semibold text-zinc-50">
            {session.revisedDraft.title}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{session.changeSummary}</p>
          {session.editorComment && (
            <p className="mt-2 text-sm text-zinc-400">
              Comment: “{session.editorComment}”
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Previous draft
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {previous.lead}
          </p>
        </section>

        <div className="text-center text-xs text-zinc-600">↓ AI revision ↓</div>

        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Updated draft preview
          </h2>
          {(leadChanged || changedIds.size > 0) && (
            <ul className="mt-3 space-y-2 text-xs">
              {leadChanged && (
                <li className="rounded border border-amber-900/40 bg-amber-950/20 px-3 py-2 text-amber-100/90">
                  Introduction updated
                </li>
              )}
              {[...changedIds].map((id) => {
                const section = revised.sections.find((s) => s.id === id);
                return (
                  <li
                    key={id}
                    className="rounded border border-amber-900/40 bg-amber-950/20 px-3 py-2 text-amber-100/90"
                  >
                    Section changed: {section?.heading ?? id}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <div className="border-t border-zinc-800">
        <span className="sr-only">Full updated article</span>
        <EncyclopediaArticleView article={revised} />
      </div>

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href={experimentalPaths.drafts}
            className="rounded-md border border-zinc-600 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-900"
          >
            Back to Drafts
          </Link>
          <button
            type="button"
            disabled={pending || session.status === "published"}
            onClick={onPublish}
            className="rounded-md border border-emerald-700/60 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-950/70 disabled:opacity-40"
          >
            {pending ? "Publishing…" : "Publish"}
          </button>
          {message && (
            <p className="w-full text-sm text-emerald-400/90">{message}</p>
          )}
          {error && <p className="w-full text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}

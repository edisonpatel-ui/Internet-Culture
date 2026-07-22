"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ApprovedDraft, DraftPackage } from "@/lib/ai/packages";
import { reviseDraftAction } from "@/lib/admin/draftGeneration/actions";
import { approveDraftAction } from "@/lib/admin/draftReview/actions";
import {
  DetailPageLayout,
  ContentBlock,
  Timeline,
  ExampleList,
  ArticleMetadata,
} from "@/components/templates/DetailPageLayout";
import { EntryHero } from "@/components/entry/EntryHero";
import { EntryScores } from "@/components/entry/EntryScores";
import { EntrySources } from "@/components/entry/EntrySources";
import { ArticleMediaSection } from "@/components/media/ArticleMediaSection";
import { draftPackageToPreviewEntry } from "@/lib/admin/draftGeneration/draftToPreviewEntry";
import { normalizeDraftPackage } from "@/lib/admin/draftGeneration/normalizeDraft";

interface ArticlePreviewWorkspaceProps {
  draft: DraftPackage;
  existingApproval?: ApprovedDraft | null;
}

/**
 * Visitor-style article preview + single editor feedback box.
 * Primary editorial experience — not a field form.
 */
export function ArticlePreviewWorkspace({
  draft: initial,
  existingApproval,
}: ArticlePreviewWorkspaceProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSeo, setShowSeo] = useState(false);

  const draft = normalizeDraftPackage(initial);
  const entry = draftPackageToPreviewEntry(draft);
  const categoryPath =
    draft.category === "creator"
      ? "creators"
      : draft.category === "event"
        ? "events"
        : draft.category === "trend"
          ? "trending"
          : `${draft.category}s`;

  function onRevise() {
    setMessage(null);
    setError(null);
    const text = feedback.trim();
    if (!text) {
      setError("Write what should change before asking AI to revise.");
      return;
    }
    startTransition(async () => {
      const result = await reviseDraftAction(draft.id, text);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setFeedback("");
      setMessage(result.changeSummary);
      router.refresh();
    });
  }

  function onApprove() {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await approveDraftAction({
        draftPackageId: draft.id,
        draftPackage: draft,
        editorNotes: "Approved from article preview",
        seoNotes: "",
        changesMade: [
          "Reviewed as visitor-facing article",
          ...(draft.feedbackHistory.map((f) => f.changeSummary) ?? []),
        ],
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage(`Article approved (${result.approvedId}). Ready for publish prep.`);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="mb-6 rounded-lg border border-amber-900/50 bg-amber-950/20 px-4 py-3 text-sm text-amber-100/90">
        <p className="font-medium text-amber-50">Internal article preview</p>
        <p className="mt-1 text-amber-100/70">
          Read this like a visitor. Leave feedback below — AI will revise the
          article. Nothing is published until you approve and prepare publish.
        </p>
        {draft.revision > 0 && (
          <p className="mt-2 text-xs text-amber-200/60">
            Revision {draft.revision}
            {existingApproval ? " · Approved" : ""}
          </p>
        )}
      </div>

      <main className="mx-auto max-w-5xl">
        <DetailPageLayout backHref="/drafts" backLabel="All drafts">
          <EntryHero entry={entry} withImage />

          <p className="mb-10 max-w-3xl text-base leading-[1.75] text-zinc-300 sm:text-lg">
            {draft.lead}
          </p>

          <ArticleMediaSection media={entry.media} />

          {draft.articleSections.map((section) => (
            <ContentBlock key={section.id} title={section.heading}>
              <p className="whitespace-pre-wrap">{section.body}</p>
            </ContentBlock>
          ))}

          {draft.timeline.length >= 2 && (
            <ContentBlock title="Timeline">
              <Timeline events={draft.timeline.slice(0, 8)} />
            </ContentBlock>
          )}

          {draft.examples.length > 0 && (
            <ContentBlock title="Usage examples">
              <ExampleList examples={draft.examples} />
            </ContentBlock>
          )}

          {draft.relatedTopics.length > 0 && (
            <ContentBlock title="Related">
              <ul className="flex flex-wrap gap-2">
                {draft.relatedTopics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-zinc-500">
                Links resolve after publish against the live catalog.
              </p>
            </ContentBlock>
          )}

          <EntryScores entry={entry} />

          <EntrySources sources={entry.sources} />

          <ArticleMetadata addedAt={entry.addedAt} />

          <section className="mb-10 rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <button
              type="button"
              onClick={() => setShowSeo((v) => !v)}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              {showSeo ? "Hide SEO preview" : "Show SEO preview"}
            </button>
            {showSeo && (
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-blue-400">
                  {draft.seoMetadata?.metaTitle ??
                    `${draft.title} | Internet Culture Hub`}
                </p>
                <p className="text-emerald-500/90">
                  internetculturehub.com/{categoryPath}/{draft.slugSuggestion}
                </p>
                <p className="text-zinc-400">
                  {draft.seoMetadata?.metaDescription ?? draft.lead.slice(0, 160)}
                </p>
              </div>
            )}
          </section>
        </DetailPageLayout>
      </main>

      <section className="mx-auto mt-4 max-w-5xl border-t border-zinc-800 pt-8">
        <h2 className="text-lg font-semibold text-white">Editor feedback</h2>
        <p className="mt-1 text-sm text-zinc-500">
          What should change? Write naturally — AI will revise the article.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          placeholder='e.g. "Change category from meme to trend." or "Add a section explaining Titan Cameraman."'
          className="mt-4 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
        />

        {draft.feedbackHistory.length > 0 && (
          <ul className="mt-4 space-y-2 text-xs text-zinc-500">
            {draft.feedbackHistory
              .slice()
              .reverse()
              .map((f) => (
                <li key={f.id} className="rounded border border-zinc-800 px-3 py-2">
                  <p className="text-zinc-400">&ldquo;{f.feedback}&rdquo;</p>
                  <p className="mt-1 text-zinc-600">{f.changeSummary}</p>
                </li>
              ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={onRevise}
            className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
          >
            {pending ? "Working…" : "Ask AI to revise"}
          </button>
          <button
            type="button"
            disabled={pending || Boolean(existingApproval)}
            onClick={onApprove}
            className="rounded-md border border-emerald-700/60 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-950/70 disabled:opacity-40"
          >
            {existingApproval ? "Approved" : "Approve article"}
          </button>
          {existingApproval && (
            <Link
              href="/publish"
              className="rounded-md border border-zinc-600 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Go to Publish
            </Link>
          )}
        </div>
        {message && (
          <p className="mt-3 text-sm text-emerald-400/90">{message}</p>
        )}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </section>
    </div>
  );
}

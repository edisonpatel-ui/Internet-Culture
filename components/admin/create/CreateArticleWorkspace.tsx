"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createArticleFromPromptAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function CreateArticleWorkspace() {
  const [prompt, setPrompt] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successDraftId, setSuccessDraftId] = useState<string | null>(null);

  function onGenerate() {
    setError(null);
    setSuccessDraftId(null);
    startTransition(async () => {
      const result = await createArticleFromPromptAction(prompt);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccessDraftId(result.draftId);
      setPrompt("");
    });
  }

  if (successDraftId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <header className="mb-8">
          <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
            Internal
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
            Draft successfully generated
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Preview the draft, optionally edit with AI, then publish from Edit.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <Link
            href={experimentalPaths.draft(successDraftId)}
            className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Open Draft
          </Link>
          <button
            type="button"
            onClick={() => setSuccessDraftId(null)}
            className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            Generate another
          </button>
          <Link
            href={experimentalPaths.create}
            className="rounded-md border border-zinc-800 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-300"
          >
            Back to Draft Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Internal
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Draft Studio
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Prompt → Draft → AI Edit → Publish. Everything here stays experimental.
        </p>
      </header>

      <label className="block">
        <span className="sr-only">Article prompt</span>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          placeholder="Create an encyclopedia article about…"
          className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
        />
      </label>

      <button
        type="button"
        disabled={pending || !prompt.trim()}
        onClick={onGenerate}
        className="mt-4 rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white disabled:opacity-50"
      >
        {pending ? "Generating…" : "Generate Draft"}
      </button>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}

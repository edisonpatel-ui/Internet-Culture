"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createArticleFromPromptAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

const EXAMPLES = [
  "Create an encyclopedia article about Cottagecore.",
  "Create an article about Italian Brainrot.",
  "Create an article about Dad Bod (slang).",
  "Create an article about Dancing Baby.",
  'Create an article about the first meme using historical sources.',
];

export function CreateArticleWorkspace() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onGenerate() {
    setError(null);
    startTransition(async () => {
      const result = await createArticleFromPromptAction(prompt);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(experimentalPaths.draft(result.draftId));
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Experimental AI Lab
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-50">
          Create Article
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Experimental — Phase 2+. Describe what to write. The Knowledge Engine
          researches and drafts automatically. Not the Version 1 content
          workflow.
        </p>
      </header>

      <label className="block">
        <span className="sr-only">Article prompt</span>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          placeholder="Create an encyclopedia article about…"
          className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
        />
      </label>

      <button
        type="button"
        disabled={pending || !prompt.trim()}
        onClick={onGenerate}
        className="mt-4 w-full rounded-md border border-zinc-500 bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-white disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Generating article…" : "Generate Article"}
      </button>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-10">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-600">
          Examples
        </p>
        <ul className="mt-3 space-y-2">
          {EXAMPLES.map((ex) => (
            <li key={ex}>
              <button
                type="button"
                onClick={() => setPrompt(ex)}
                className="w-full rounded-md border border-zinc-800 px-3 py-2 text-left text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-200"
              >
                {ex}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

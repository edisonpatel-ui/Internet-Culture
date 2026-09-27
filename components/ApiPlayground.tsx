"use client";

import { useState } from "react";
import Link from "next/link";
import { PLAYGROUND_TERMS } from "@/lib/api/playgroundTerms";

type FetchState = "idle" | "loading" | "success" | "error";

export function ApiPlayground() {
  const [selected, setSelected] = useState<string>(PLAYGROUND_TERMS[0].slug);
  const [state, setState] = useState<FetchState>("idle");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setState("loading");
    setError(null);
    try {
      const response = await fetch(`/api/v1/playground?slug=${encodeURIComponent(selected)}`);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? `Request failed (${response.status})`);
      }
      setResult(json);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
        Culture Graph API
      </p>
      <h2 className="font-page mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
        Try it live
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Pick a term and see a real (teaser) response from the API — velocity, decay tracking,
        origin mapping, and template data.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-[var(--accent-border)] focus:outline-none"
        >
          {PLAYGROUND_TERMS.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleRun}
          disabled={state === "loading"}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "Running…" : "Run request"}
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">
        {state === "idle" && <p className="text-sm text-zinc-500">Pick a term and hit run.</p>}
        {state === "loading" && <p className="text-sm text-zinc-500">Requesting…</p>}
        {state === "error" && <p className="text-sm text-red-400">{error}</p>}
        {state === "success" && (
          <pre className="overflow-x-auto text-sm leading-relaxed text-zinc-200">
            <code>{JSON.stringify(result, null, 2)}</code>
          </pre>
        )}
      </div>

      <p className="mt-3 text-xs text-zinc-600">
        Limited to 5 requests/day per visitor and truncated to 2 items per field.{" "}
        <Link
          href="/pricing"
          className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
        >
          Upgrade for full, unlimited access
        </Link>
        .
      </p>
    </section>
  );
}

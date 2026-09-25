"use client";

import { useState } from "react";

const SAMPLE_TERMS = [
  { slug: "brainrot", label: "brainrot" },
  { slug: "rizz-monkey", label: "rizz monkey" },
  { slug: "based", label: "based" },
  { slug: "cringe", label: "cringe" },
  { slug: "aura-farming", label: "aura farming" },
];

type FetchState = "idle" | "loading" | "success" | "error";

export function DemoPlayground() {
  const [slug, setSlug] = useState(SAMPLE_TERMS[0].slug);
  const [customSlug, setCustomSlug] = useState("");
  const [state, setState] = useState<FetchState>("idle");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  async function runRequest(targetSlug: string) {
    setState("loading");
    setError(null);
    try {
      const response = await fetch(`/api/demo/terms/${encodeURIComponent(targetSlug)}`);
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

  function handleSampleClick(sampleSlug: string) {
    setSlug(sampleSlug);
    setCustomSlug("");
    runRequest(sampleSlug);
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = customSlug.trim();
    if (!target) return;
    setSlug(target);
    runRequest(target);
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {SAMPLE_TERMS.map((t) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => handleSampleClick(t.slug)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              slug === t.slug && !customSlug
                ? "border-[var(--accent-border)] bg-[var(--accent-muted)] text-[var(--accent-secondary)]"
                : "border-white/10 text-zinc-300 hover:bg-white/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleCustomSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="Or try any slug, e.g. touch-grass"
          className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--accent-hover)]"
        >
          Run
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
        {state === "idle" && (
          <p className="text-sm text-zinc-500">Pick a term above or run your own request.</p>
        )}
        {state === "loading" && <p className="text-sm text-zinc-500">Requesting…</p>}
        {state === "error" && <p className="text-sm text-red-400">{error}</p>}
        {state === "success" && (
          <pre className="overflow-x-auto text-sm leading-relaxed text-zinc-200">
            <code>{JSON.stringify(result, null, 2)}</code>
          </pre>
        )}
      </div>
      <p className="mt-3 text-xs text-zinc-600">
        This playground runs against a shared, IP-rate-limited demo endpoint (10 requests/min) —
        it does not use or expose a real API key. Get your own key on the{" "}
        <a href="/pricing" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
          pricing page
        </a>
        .
      </p>
    </div>
  );
}

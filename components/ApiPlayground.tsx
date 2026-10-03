"use client";

import { useState } from "react";
import Link from "next/link";
import { PLAYGROUND_TERMS } from "@/lib/api/playgroundTerms";
import { JsonHighlight } from "@/components/docs/JsonHighlight";

type FetchState = "idle" | "loading" | "success" | "error";

interface RequestMeta {
  status: number;
  statusText: string;
  latencyMs: number;
}

/** Pulls the velocityIndex badge out of a successful playground response, if present (lib/api/enrichedTerm.ts's `velocityIndex: string`, e.g. "12.5%"). */
function extractVelocity(result: unknown): string | null {
  if (!result || typeof result !== "object") return null;
  const data = (result as { data?: unknown }).data;
  if (!data || typeof data !== "object") return null;
  const velocityIndex = (data as { velocityIndex?: unknown }).velocityIndex;
  return typeof velocityIndex === "string" ? velocityIndex : null;
}

function VelocityBadge({ velocityIndex }: { velocityIndex: string }) {
  const isNegative = velocityIndex.trim().startsWith("-");
  const isZero = /^0(\.0+)?%$/.test(velocityIndex.trim());
  const tone = isZero
    ? "border-white/10 bg-white/5 text-zinc-400"
    : isNegative
      ? "border-red-900/40 bg-red-950/20 text-red-400"
      : "border-[var(--accent-border)] bg-[var(--accent-muted)] text-[var(--accent-secondary)]";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {!isZero && (isNegative ? "▼" : "▲")} velocity {velocityIndex}
    </span>
  );
}

function StatusBadge({ status, statusText }: { status: number; statusText: string }) {
  const tone =
    status >= 200 && status < 300
      ? "border-[var(--accent-border)] bg-[var(--accent-muted)] text-[var(--accent-secondary)]"
      : status === 429
        ? "border-amber-900/40 bg-amber-950/20 text-amber-400"
        : "border-red-900/40 bg-red-950/20 text-red-400";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs font-semibold ${tone}`}>
      {status} {statusText}
    </span>
  );
}

function LatencyBadge({ latencyMs }: { latencyMs: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs font-medium text-zinc-400">
      {latencyMs}ms
    </span>
  );
}

export function ApiPlayground() {
  const [selected, setSelected] = useState<string>(PLAYGROUND_TERMS[0].slug);
  const [state, setState] = useState<FetchState>("idle");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<RequestMeta | null>(null);

  async function handleRun() {
    setState("loading");
    setError(null);
    const start = performance.now();
    try {
      const response = await fetch(`/api/v1/playground?slug=${encodeURIComponent(selected)}`);
      const latencyMs = Math.round(performance.now() - start);
      const json = await response.json();
      setMeta({ status: response.status, statusText: response.statusText || (response.ok ? "OK" : "Error"), latencyMs });

      if (!response.ok) {
        // Uniform /api/v1 error shape: { error: { code, message, status } }
        // — see lib/api/errors.ts.
        throw new Error(json.error?.message ?? `Request failed (${response.status})`);
      }
      setResult(json);
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const velocityIndex = state === "success" ? extractVelocity(result) : null;

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

      {/* Response status strip — status, latency, velocity. Wraps on
          narrow screens instead of forcing a horizontal squeeze. */}
      {meta && (state === "success" || state === "error") && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusBadge status={meta.status} statusText={meta.statusText} />
          <LatencyBadge latencyMs={meta.latencyMs} />
          {velocityIndex && <VelocityBadge velocityIndex={velocityIndex} />}
        </div>
      )}

      <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
        {state === "idle" && <p className="text-sm text-zinc-500">Pick a term and hit run.</p>}
        {state === "loading" && <p className="text-sm text-zinc-500">Requesting…</p>}
        {state === "error" && <p className="text-sm text-red-400">{error}</p>}
        {state === "success" && <JsonHighlight value={result} />}
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

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type FetchState = "loading" | "ready" | "timeout" | "error" | "no-session";

const POLL_INTERVAL_MS = 2000;
/** Total time to keep polling before showing a manual retry state (15-20s window). */
const MAX_POLL_DURATION_MS = 18000;

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Computed at render time (lazy initializer), not via an effect + setState
  // guard clause — avoids a synchronous setState-in-effect for this branch.
  const [state, setState] = useState<FetchState>(() => (sessionId ? "loading" : "no-session"));
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!sessionId) return;
    // Rebind to a definitely-non-null const so the closure below doesn't
    // need to re-narrow `string | null` on every reference.
    const activeSessionId = sessionId;

    let cancelled = false;
    const startedAt = Date.now();

    // Every setState call below happens strictly after an `await` — no
    // synchronous (pre-await) setState call is reachable directly from this
    // effect, which is what react-hooks/set-state-in-effect actually flags.
    async function poll() {
      let response: Response;
      let json: { key?: string; pending?: boolean; error?: string };
      try {
        response = await fetch(`/api/checkout/session?sessionId=${encodeURIComponent(activeSessionId)}`);
        json = await response.json();
      } catch {
        if (!cancelled) setState("error");
        return;
      }

      if (cancelled) return;

      if (response.ok && typeof json.key === "string") {
        setRawKey(json.key);
        setState("ready");
        return;
      }

      if (response.status === 202 || json.pending) {
        if (Date.now() - startedAt >= MAX_POLL_DURATION_MS) {
          setState("timeout");
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
        return;
      }

      setState("error");
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId, retryToken]);

  function handleRetry() {
    setState("loading");
    setRetryToken((n) => n + 1);
  }

  async function handleCopy() {
    if (!rawKey) return;
    await navigator.clipboard.writeText(rawKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (state === "no-session") {
    return (
      <p className="text-sm text-zinc-400">
        Missing checkout session. If you just completed a payment, check your email
        receipt or{" "}
        <Link href="/pricing" className="text-[var(--accent-secondary)] underline">
          return to pricing
        </Link>
        .
      </p>
    );
  }

  if (state === "loading") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
        <p className="text-sm text-zinc-400">Finalizing your subscription…</p>
        <p className="mt-1 text-xs text-zinc-600">This usually takes just a few seconds.</p>
      </div>
    );
  }

  if (state === "timeout") {
    return (
      <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-6">
        <p className="text-sm text-amber-300">
          This is taking longer than expected. Your payment may still be processing —
          you can try again, or check back in a minute.
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5"
        >
          Retry
        </button>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6">
        <p className="text-sm text-red-300">
          We couldn&apos;t retrieve your API key automatically. If payment went through,
          contact support and we&apos;ll issue it manually.
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
      <p className="text-sm font-semibold text-amber-400">
        Save this key now. It will not be shown again.
      </p>
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/40 p-3">
        <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-[var(--accent-secondary)]">
          {rawKey}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        See the{" "}
        <Link href="/docs/api" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
          API docs
        </Link>{" "}
        to start making requests, or try it first in the{" "}
        <Link href="/demo" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
          live demo
        </Link>
        .
      </p>
    </div>
  );
}

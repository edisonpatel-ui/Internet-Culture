"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type FetchState = "loading" | "ready" | "not-yet" | "error";

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [state, setState] = useState<FetchState>("loading");
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchKey = useCallback(async () => {
    if (!sessionId) {
      setState("error");
      return;
    }
    try {
      const response = await fetch(`/api/checkout/session?sessionId=${encodeURIComponent(sessionId)}`);
      const json = await response.json();
      if (response.status === 404) {
        setState("not-yet");
        return;
      }
      if (!response.ok || !json.rawKey) {
        setState("error");
        return;
      }
      setRawKey(json.rawKey);
      setState("ready");
    } catch {
      setState("error");
    }
  }, [sessionId]);

  useEffect(() => {
    fetchKey();
  }, [fetchKey]);

  // The webhook can lag a second or two behind the browser redirect —
  // retry automatically a few times while in the "not-yet" state.
  useEffect(() => {
    if (state !== "not-yet") return;
    const timer = setTimeout(fetchKey, 2000);
    return () => clearTimeout(timer);
  }, [state, fetchKey]);

  async function handleCopy() {
    if (!rawKey) return;
    await navigator.clipboard.writeText(rawKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!sessionId) {
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

  if (state === "loading" || state === "not-yet") {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
        <p className="text-sm text-zinc-400">Finalizing your subscription…</p>
        <p className="mt-1 text-xs text-zinc-600">This usually takes just a few seconds.</p>
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

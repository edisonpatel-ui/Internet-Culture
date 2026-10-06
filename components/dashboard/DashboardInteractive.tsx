"use client";

import { useState } from "react";
import { ApiUsageGuide } from "@/components/dashboard/ApiUsageGuide";
import type { ApiKeyTier } from "@/lib/api/keys";

export function DashboardInteractive({
  keyLastFour,
  tier,
}: {
  keyLastFour: string;
  tier?: ApiKeyTier;
}) {
  const [regenState, setRegenState] = useState<"idle" | "confirming" | "loading" | "error">("idle");
  const [regenError, setRegenError] = useState<string | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [currentLastFour, setCurrentLastFour] = useState(keyLastFour);
  const [copied, setCopied] = useState(false);

  const maskedKey = `cg_live_${"•".repeat(24)}${currentLastFour}`;

  async function handleRegenerate() {
    setRegenState("loading");
    setRegenError(null);
    try {
      const response = await fetch("/api/dashboard/regenerate-key", { method: "POST" });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to regenerate key.");
      }
      setRevealedKey(json.key);
      setCurrentLastFour(String(json.key).slice(-4));
      setRegenState("idle");
    } catch (err) {
      setRegenError(err instanceof Error ? err.message : "Something went wrong.");
      setRegenState("error");
    }
  }

  async function handleCopy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* API key panel */}
      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">API Key</h2>

        {revealedKey ? (
          <div className="mt-3">
            <p className="text-sm font-semibold text-amber-400">Save this key now. It will not be shown again.</p>
            <div className="mt-3 flex items-center gap-2 overflow-x-auto rounded-lg bg-black/40 p-3">
              <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-[var(--accent-secondary)]">
                {revealedKey}
              </code>
              <button
                type="button"
                onClick={() => handleCopy(revealedKey)}
                className="shrink-0 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-600">
              The code examples below are pre-filled with this key for the rest of this session.
            </p>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto rounded-lg bg-black/40 p-3">
            <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-zinc-400">
              {maskedKey}
            </code>
          </div>
        )}

        <div className="mt-4">
          {regenState === "confirming" ? (
            <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-4">
              <p className="text-sm text-amber-300">
                Regenerating will immediately invalidate your current key. Anything using it will
                stop working until updated. Continue?
              </p>
              {regenError ? <p className="mt-2 text-xs text-red-400">{regenError}</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={regenState !== "confirming"}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-amber-400"
                >
                  Yes, regenerate
                </button>
                <button
                  type="button"
                  onClick={() => setRegenState("idle")}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRegenState("confirming")}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5"
            >
              Regenerate Key
            </button>
          )}
          {regenState === "error" && !["confirming"].includes(regenState) && regenError ? (
            <p className="mt-2 text-xs text-red-400">{regenError}</p>
          ) : null}
          <p className="mt-2 text-xs text-zinc-600">
            Note: API keys can only be regenerated once every 24 hours.
          </p>
        </div>
      </section>

      {/* Placeholder-key callout — shown ABOVE the code examples (not as
          tiny text below them) since it changes how every snippet in
          ApiUsageGuide should be read: the key in them is a stand-in,
          not something to copy-paste as-is. */}
      {!revealedKey && (
        <div className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-muted)] p-4">
          <p className="text-sm font-medium text-[var(--accent-secondary)]">
            The examples below use a placeholder key
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            Wherever you see{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">cg_live_YOUR_API_KEY</code>,
            swap in your actual key (shown once when issued or regenerated) before running any of
            the code below.
          </p>
        </div>
      )}

      {/* Full multi-language integration hub — replaces the old 3-tab Quick
          Start with cURL/JS/Python/Node/Go/PHP, search & batch examples,
          and a response-headers/error-codes reference. Pre-filled with the
          real key if one was just revealed above this session, otherwise
          the standard placeholder — same convention the old Quick Start
          used, just applied consistently everywhere now. */}
      <ApiUsageGuide apiKey={revealedKey ?? "cg_live_YOUR_API_KEY"} tier={tier} />
    </div>
  );
}

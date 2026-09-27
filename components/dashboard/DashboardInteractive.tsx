"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { BASE_URL } from "@/lib/seo";

type Tab = "curl" | "javascript" | "python";

function buildSnippets(apiKeyPlaceholder: string) {
  return {
    curl: `curl "${BASE_URL}/api/v1/terms/brainrot" \\
  -H "Authorization: Bearer ${apiKeyPlaceholder}"`,
    javascript: `const response = await fetch("${BASE_URL}/api/v1/terms/brainrot", {
  headers: {
    Authorization: "Bearer ${apiKeyPlaceholder}",
  },
});

const { data } = await response.json();
console.log(data);`,
    python: `import requests

response = requests.get(
    "${BASE_URL}/api/v1/terms/brainrot",
    headers={"Authorization": "Bearer ${apiKeyPlaceholder}"},
)
print(response.json()["data"])`,
  };
}

export function DashboardInteractive({
  keyLastFour,
}: {
  keyLastFour: string;
}) {
  const [regenState, setRegenState] = useState<"idle" | "confirming" | "loading" | "error">("idle");
  const [regenError, setRegenError] = useState<string | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [currentLastFour, setCurrentLastFour] = useState(keyLastFour);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<Tab>("curl");

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

  const snippets = buildSnippets(revealedKey ?? "cg_live_YOUR_API_KEY");

  return (
    <div className="space-y-8">
      {/* API key panel */}
      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">API Key</h2>

        {revealedKey ? (
          <div className="mt-3">
            <p className="text-sm font-semibold text-amber-400">Save this key now. It will not be shown again.</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/40 p-3">
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
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/40 p-3">
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
              <div className="mt-3 flex gap-2">
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
        </div>
      </section>

      {/* Code manual */}
      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Quick Start</h2>
        <div className="mt-3 flex gap-2">
          {(["curl", "javascript", "python"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-[var(--accent-muted)] text-[var(--accent-secondary)]"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              {t === "curl" ? "cURL" : t === "javascript" ? "JavaScript" : "Python"}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <CodeBlock language={tab} code={snippets[tab]} />
        </div>
        {!revealedKey && (
          <p className="mt-3 text-xs text-zinc-600">
            Replace <code className="rounded bg-white/10 px-1 py-0.5">cg_live_YOUR_API_KEY</code> with your
            actual key (shown once when issued or regenerated).
          </p>
        )}
      </section>
    </div>
  );
}

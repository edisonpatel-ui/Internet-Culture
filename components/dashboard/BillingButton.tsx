"use client";

import { useState } from "react";

export function BillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const json = await response.json();
      if (!response.ok || !json.url) {
        throw new Error(json.error ?? "Failed to open billing portal.");
      }
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening…" : "Manage Billing & Invoices"}
      </button>
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  missing_token: "That login link was missing its token. Please request a new one.",
  invalid_or_expired: "That login link has expired or was already used. Please request a new one.",
  server_error: "Something went wrong verifying that link. Please try again.",
};

export function LoginCard() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(
    urlError ? (ERROR_MESSAGES[urlError] ?? "Please try logging in again.") : null,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to send login link.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="text-sm font-semibold text-white">Check your email</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          If <span className="text-zinc-300">{email}</span> has an account, a login link is on its
          way. It expires in 15 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
          />
        </div>
        {error ? <p className="text-xs text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending link…" : "Send login link"}
        </button>
      </form>
      <p className="mt-4 text-xs text-zinc-500">
        Only email addresses with an active Culture Graph API subscription can log in. No account
        yet?{" "}
        <a href="/pricing" className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white">
          See pricing
        </a>
        .
      </p>
    </div>
  );
}

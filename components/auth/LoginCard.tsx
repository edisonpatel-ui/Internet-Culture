"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  missing_token: "That login link was missing its token. Please request a new one.",
  invalid_or_expired: "That login link has expired or was already used. Please request a new one.",
  server_error: "Something went wrong verifying that link. Please try again.",
};

type Mode = "magic-link" | "password";

export function LoginCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<Mode>("magic-link");

  // Magic-link state
  const [email, setEmail] = useState("");
  const [magicLinkStatus, setMagicLinkStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [magicLinkError, setMagicLinkError] = useState<string | null>(
    urlError ? (ERROR_MESSAGES[urlError] ?? "Please try logging in again.") : null,
  );

  // Password state
  const [passwordEmail, setPasswordEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  async function handleMagicLinkSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMagicLinkStatus("loading");
    setMagicLinkError(null);
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
      setMagicLinkStatus("sent");
    } catch (err) {
      setMagicLinkError(err instanceof Error ? err.message : "Something went wrong.");
      setMagicLinkStatus("error");
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: passwordEmail, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Invalid email or password.");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Something went wrong.");
      setPasswordLoading(false);
    }
  }

  if (mode === "magic-link" && magicLinkStatus === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="text-sm font-semibold text-white">Login link sent!</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          If <span className="text-zinc-300">{email}</span> has an account, a login link is on its
          way. It expires in 15 minutes. Please check your inbox (and spam/junk folder) to complete
          sign-in.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <div className="mb-6 flex gap-1 rounded-lg border border-white/10 bg-black/30 p-1">
        <button
          type="button"
          onClick={() => setMode("magic-link")}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "magic-link" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Magic Link
        </button>
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "password" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Password
        </button>
      </div>

      {mode === "magic-link" ? (
        <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
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
          {magicLinkError ? <p className="text-xs text-red-400">{magicLinkError}</p> : null}
          <button
            type="submit"
            disabled={magicLinkStatus === "loading"}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {magicLinkStatus === "loading" ? "Sending link…" : "Send login link"}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="password-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Email address
            </label>
            <input
              id="password-email"
              type="email"
              required
              value={passwordEmail}
              onChange={(e) => setPasswordEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
            />
          </div>
          {passwordError ? <p className="text-xs text-red-400">{passwordError}</p> : null}
          <button
            type="submit"
            disabled={passwordLoading}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordLoading ? "Logging in…" : "Log in"}
          </button>
          <p className="text-xs text-zinc-500">
            Haven&apos;t set a password yet? Use{" "}
            <a
              href="/forgot-password"
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              Forgot password
            </a>{" "}
            to set one.
          </p>
        </form>
      )}

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

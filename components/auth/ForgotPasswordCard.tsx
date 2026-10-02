"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MIN_PASSWORD_LENGTH = 8;

/**
 * components/auth/ForgotPasswordCard.tsx
 *
 * Two modes based on whether a `?token=` query param is present — the same
 * link the user clicks from their reset email carries them straight from
 * "request" to "complete" on this one page:
 *
 *   No token:   email -> POST /api/auth/reset-password (request a link)
 *   With token: new password -> PUT /api/auth/reset-password (complete it)
 *
 * Completing a reset also logs the customer in server-side
 * (app/api/auth/reset-password's PUT handler calls createSession), so a
 * successful submit here redirects straight to /dashboard — no separate
 * login step required, matching the magic-link flow's own
 * reset-then-auto-login convenience.
 */
export function ForgotPasswordCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Request-link mode
  const [email, setEmail] = useState("");
  const [requestStatus, setRequestStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [requestError, setRequestError] = useState<string | null>(null);

  // Complete-reset mode
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);

  async function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRequestStatus("loading");
    setRequestError(null);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to send reset link.");
      }
      setRequestStatus("sent");
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : "Something went wrong.");
      setRequestStatus("error");
    }
  }

  async function handleCompleteSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCompleteError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setCompleteError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setCompleteError("Passwords don't match.");
      return;
    }

    setCompleting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Failed to reset password.");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setCompleteError(err instanceof Error ? err.message : "Something went wrong.");
      setCompleting(false);
    }
  }

  // --- Mode: complete reset (token present) ---
  if (token) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <form onSubmit={handleCompleteSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium text-zinc-300">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
            />
          </div>
          {completeError ? <p className="text-xs text-red-400">{completeError}</p> : null}
          <button
            type="submit"
            disabled={completing}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {completing ? "Setting password…" : "Set new password"}
          </button>
        </form>
      </div>
    );
  }

  // --- Mode: request a link (no token) ---
  if (requestStatus === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="text-sm font-semibold text-white">Check your email</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          If <span className="text-zinc-300">{email}</span> has an account, a password reset link
          is on its way. It expires in 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <form onSubmit={handleRequestSubmit} className="space-y-4">
        <div>
          <label htmlFor="reset-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Email address
          </label>
          <input
            id="reset-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[var(--accent-border)] focus:outline-none"
          />
        </div>
        {requestError ? <p className="text-xs text-red-400">{requestError}</p> : null}
        <button
          type="submit"
          disabled={requestStatus === "loading"}
          className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {requestStatus === "loading" ? "Sending link…" : "Send reset link"}
        </button>
      </form>
      <p className="mt-4 text-xs text-zinc-500">
        Remembered it?{" "}
        <a
          href="/login"
          className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
        >
          Back to login
        </a>
        .
      </p>
    </div>
  );
}

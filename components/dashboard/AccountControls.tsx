"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * components/dashboard/AccountControls.tsx
 *
 * Two destructive-ish account actions, both backed by
 * app/api/customer/account/route.ts:
 *   - "Log out everywhere" (POST) — revokes every outstanding session,
 *     including this one.
 *   - "Delete account" (DELETE) — requires typing the account email to
 *     confirm (matching the route's own confirmEmail check — this is a
 *     UX safety net, not a substitute for it), then permanently deletes
 *     the account, cancels billing, and revokes the API key.
 */

export function AccountControls({ email }: { email: string }) {
  const router = useRouter();

  const [loggingOutEverywhere, setLoggingOutEverywhere] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const [confirming, setConfirming] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleLogoutEverywhere() {
    setLoggingOutEverywhere(true);
    setLogoutError(null);
    try {
      const res = await fetch("/api/customer/account", { method: "POST" });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? "Failed to log out of all sessions.");
      }
      router.push("/login");
      router.refresh();
    } catch (err) {
      setLogoutError(err instanceof Error ? err.message : "Something went wrong.");
      setLoggingOutEverywhere(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch("/api/customer/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmEmail: confirmValue }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? "Failed to delete account.");
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Something went wrong.");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-200">Log out everywhere</p>
          <p className="mt-1 text-xs text-zinc-500">
            Ends every active session for {email}, including this one.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogoutEverywhere}
          disabled={loggingOutEverywhere}
          className="shrink-0 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingOutEverywhere ? "Logging out…" : "Log out everywhere"}
        </button>
      </div>
      {logoutError ? <p className="text-xs text-red-400">{logoutError}</p> : null}

      <div className="border-t border-white/10 pt-6">
        <p className="text-sm font-medium text-red-400">Delete account</p>
        <p className="mt-1 text-xs text-zinc-500">
          Permanently deletes your account, cancels your subscription, and revokes your API key. This
          can&apos;t be undone.
        </p>

        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-3 rounded-lg border border-red-900/40 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/30"
          >
            Delete my account
          </button>
        ) : (
          <div className="mt-3 space-y-3 rounded-lg border border-red-900/40 bg-red-950/10 p-4">
            <label className="block text-xs text-zinc-400">
              Type <span className="font-mono text-zinc-300">{email}</span> to confirm.
            </label>
            <input
              type="email"
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-red-800"
              placeholder={email}
              autoComplete="off"
            />
            {deleteError ? <p className="text-xs text-red-400">{deleteError}</p> : null}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting || confirmValue.trim().toLowerCase() !== email.trim().toLowerCase()}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Permanently delete"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirming(false);
                  setConfirmValue("");
                  setDeleteError(null);
                }}
                disabled={deleting}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

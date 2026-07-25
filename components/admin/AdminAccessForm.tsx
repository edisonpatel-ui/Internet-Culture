"use client";

import { useActionState } from "react";
import {
  adminGoogleSignInAction,
  adminSignInAction,
} from "@/lib/admin/auth/actions";

/**
 * Minimal unlisted sign-in. Not linked from the public site.
 * Deliberately plain — does not advertise an admin console.
 */
export function AdminAccessForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [state, action, pending] = useActionState(adminSignInAction, null);

  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <form action={action} className="space-y-4">
        <label className="block">
          <span className="text-xs text-zinc-500">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
        </label>
        {state && !state.ok && state.error && (
          <p className="text-sm text-red-400">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md border border-zinc-600 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
        >
          {pending ? "…" : "Continue"}
        </button>
      </form>
      {googleEnabled && (
        <form action={adminGoogleSignInAction} className="mt-4">
          <button
            type="submit"
            className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            Continue with Google
          </button>
        </form>
      )}
    </div>
  );
}

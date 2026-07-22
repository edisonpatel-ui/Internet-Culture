"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { unlockEditorialAction } from "@/lib/admin/editorialUnlockAction";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function EditorialUnlockForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || experimentalPaths.hub;
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await unlockEditorialAction(token);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.replace(
        nextPath.startsWith("/") ? nextPath : experimentalPaths.hub,
      );
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-[11px] uppercase tracking-wide text-zinc-500">
          Editorial access token
        </span>
        <input
          type="password"
          autoComplete="current-password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          placeholder="EDITORIAL_OS_TOKEN"
        />
      </label>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={pending || !token.trim()}
        className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
      >
        {pending ? "Unlocking…" : "Unlock Editorial OS"}
      </button>
    </form>
  );
}

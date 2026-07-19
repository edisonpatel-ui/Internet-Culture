"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        This page failed to load
      </h1>
      <p className="mt-3 text-base leading-relaxed text-zinc-400">
        Reload once. If it keeps happening, head home and try another entry.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-zinc-600">
          Error ID: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        >
          Reload page
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

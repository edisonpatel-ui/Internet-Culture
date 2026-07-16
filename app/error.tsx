"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 text-base leading-relaxed text-zinc-400">
        An unexpected error occurred. The team has been notified.
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
          className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

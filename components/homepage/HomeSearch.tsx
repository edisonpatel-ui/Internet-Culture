"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

/**
 * Homepage search entry point — improves discoverability without redesigning /search.
 * Submits to /search?q=… so the query is visible in the URL for future prefill.
 */
export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      trackEvent(ANALYTICS_EVENTS.HOME_SEARCH_SUBMIT, { query: q });
    }
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mx-auto w-full max-w-xl animate-fade-in-up animation-delay-100"
    >
      <label htmlFor="home-search" className="sr-only">
        Search
      </label>
      <div className="flex items-stretch overflow-hidden rounded-lg border border-[var(--glass-border)] bg-[var(--surface)] transition-colors focus-within:border-[var(--accent-border)] focus-within:ring-1 focus-within:ring-[var(--accent)]/35">
        <div className="flex items-center pl-3.5 text-zinc-500">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="home-search"
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 outline-none sm:text-[15px]"
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn-brand shrink-0 px-4 text-sm sm:px-5 hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/30"
        >
          Search
        </button>
      </div>
    </form>
  );
}

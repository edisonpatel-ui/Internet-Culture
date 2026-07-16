import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { SearchInterface } from "@/components/sections/SearchInterface";
import { getAllSearchResults } from "@/lib/data/search";

export const metadata: Metadata = createMetadata({
  title: "Search",
  description: "Search the Internet Culture Hub encyclopedia. Find memes, slang, trends, and cultural events instantly.",
  path: "/search",
});

export default function SearchPage() {
  const totalEntries = getAllSearchResults().length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

      {/* Page Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
          🔍 Encyclopedia Search
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Search
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Instantly search across {totalEntries} entries — memes, slang, trends, and events.
        </p>
      </div>

      {/* Search Interface */}
      <SearchInterface />

      {/* Search Tips */}
      <div className="mt-12 glass-card p-6">
        <h2 className="mb-4 text-base font-semibold text-white">Search Tips</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { tip: "Use keywords", example: "Try: 'rizz', 'ohio', 'minecraft'" },
            { tip: "Filter by type", example: "Use the buttons to filter memes, slang, or trends" },
            { tip: "Search descriptions", example: "Search by concept: 'charisma', 'brainrot', 'viral'" },
            { tip: "Partial matches", example: "Short searches work: 'ski' finds 'Skibidi Toilet'" },
          ].map((item) => (
            <div key={item.tip} className="flex gap-3">
              <span className="mt-0.5 text-violet-400">→</span>
              <div>
                <p className="text-sm font-medium text-white">{item.tip}</p>
                <p className="text-xs text-zinc-500">{item.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon: AI Search */}
      <div className="mt-6 glass-card border-dashed border-violet-500/20 p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-white">AI-Powered Search Coming Soon</p>
            <p className="mt-1 text-sm text-zinc-400">
              Natural language search, semantic similarity, and AI-generated trend summaries. Ask questions like &ldquo;What memes involve gaming culture?&rdquo; or &ldquo;Show me slang from 2024.&rdquo;
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}

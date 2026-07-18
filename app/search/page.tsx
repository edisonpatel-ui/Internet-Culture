import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { SearchInterface } from "@/components/sections/SearchInterface";
import { buildSearchIndex } from "@/lib/data/search";

export const metadata: Metadata = createMetadata({
  title: "Search",
  description:
    "Search the Internet Culture Hub encyclopedia. Find memes, slang, trends, and cultural events instantly.",
  path: "/search",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const index = buildSearchIndex();
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q : "";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Search
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          {index.length} entries — titles and aliases rank first; weak tag hits
          stay hidden.
        </p>
      </div>

      <SearchInterface index={index} initialQuery={initialQuery} />

      <div className="mt-12 glass-card p-6">
        <h2 className="mb-4 text-base font-semibold text-white">
          How search works
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              tip: "Titles first",
              example: "Exact names beat everything else",
            },
            {
              tip: "Aliases count",
              example: "Try nicknames: 'kai', 'gyat', 'skibidi guy'",
            },
            {
              tip: "Typos are OK",
              example: "Close spellings still match when confidence is high",
            },
            {
              tip: "No filler results",
              example: "If nothing is close, you'll see an empty state",
            },
          ].map((item) => (
            <div key={item.tip} className="flex gap-3">
              <span className="mt-0.5 text-violet-400" aria-hidden>
                →
              </span>
              <div>
                <p className="text-sm font-medium text-white">{item.tip}</p>
                <p className="text-xs text-zinc-500">{item.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

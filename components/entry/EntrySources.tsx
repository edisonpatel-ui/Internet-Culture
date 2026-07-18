import type { EntrySource } from "@/types";

interface EntrySourcesProps {
  sources?: EntrySource[];
}

/**
 * Renders a numbered list of source citations.
 * Returns null when no sources exist — safe to always include in detail pages.
 */
export function EntrySources({ sources }: EntrySourcesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby="entry-sources-heading">
      <h2
        id="entry-sources-heading"
        className="mb-4 text-lg font-semibold tracking-tight text-white"
      >
        Sources
      </h2>
      <ol className="glass-card space-y-4 p-5 sm:p-6">
        {sources.map((source, i) => (
          <li key={`${source.title}-${i}`} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-[11px] text-zinc-500"
              aria-hidden
            >
              {i + 1}
            </span>

            <div className="min-w-0 flex-1">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-1.5 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 rounded-sm"
                  aria-label={`${source.title} (opens in a new tab)`}
                >
                  <span className="break-words">{source.title}</span>
                  <span
                    className="mt-0.5 shrink-0 text-xs text-violet-600 transition-colors group-hover:text-violet-400"
                    aria-hidden
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <span className="text-sm font-medium text-zinc-300">
                  {source.title}
                </span>
              )}
              {source.domain && (
                <p className="mt-1 font-mono text-[11px] text-zinc-600">
                  {source.domain}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

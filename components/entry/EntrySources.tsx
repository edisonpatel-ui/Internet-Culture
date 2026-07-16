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
    <div className="mb-8 glass-card p-6">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
        <span className="text-zinc-500">📎</span>
        Sources &amp; References
      </h2>
      <ol className="space-y-3">
        {sources.map((source, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-[10px] text-zinc-500">
              {i + 1}
            </span>

            <div className="min-w-0 flex-1">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-1 text-sm text-violet-400 transition-colors hover:text-violet-300"
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
                <span className="text-sm text-zinc-300">{source.title}</span>
              )}
              {source.domain && (
                <span className="ml-2 inline-block rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-zinc-600">
                  {source.domain}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

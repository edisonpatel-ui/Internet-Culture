import type { EntrySource } from "@/types";

interface EntrySourcesProps {
  sources?: EntrySource[];
}

/**
 * Renders a numbered list of source citations.
 * Returns null when no sources are provided — safe to always render.
 */
export function EntrySources({ sources }: EntrySourcesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-base font-semibold text-white">
        Sources &amp; References
      </h2>
      <ul className="space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="shrink-0 font-mono text-zinc-600">[{i + 1}]</span>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 transition-colors hover:text-violet-300"
              >
                {source.title}
                {source.domain && (
                  <span className="ml-1.5 text-xs text-zinc-600">
                    ({source.domain})
                  </span>
                )}
              </a>
            ) : (
              <span className="text-zinc-400">
                {source.title}
                {source.domain && (
                  <span className="ml-1.5 text-xs text-zinc-600">
                    ({source.domain})
                  </span>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

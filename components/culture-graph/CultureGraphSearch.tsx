"use client";

import { useMemo, useState } from "react";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { Badge } from "@/components/ui/Badge";
import {
  getDefaultCultureGraphResults,
  searchCultureGraphNodes,
  type CultureGraphNode,
} from "@/lib/discovery/cultureGraph";

interface CultureGraphSearchProps {
  nodes: readonly CultureGraphNode[];
  onSelect: (slug: string) => void;
  focusedSlug: string | null;
}

const RESULT_LIMIT = 8;

/**
 * Always-visible results list under the input (not a floating popover) —
 * simpler to keyboard-navigate in normal Tab order, and avoids overflow/
 * positioning concerns on small viewports. Empty query shows recent
 * graph-participating articles (same recency convention as the homepage);
 * a query searches title+description, same substring matching philosophy
 * as the rest of ICH's discovery UI — never more than RESULT_LIMIT results.
 */
export function CultureGraphSearch({ nodes, onSelect, focusedSlug }: CultureGraphSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return query.trim()
      ? searchCultureGraphNodes(nodes, query, RESULT_LIMIT)
      : getDefaultCultureGraphResults(nodes, RESULT_LIMIT);
  }, [nodes, query]);

  return (
    <div className="glass-card p-3">
      <label htmlFor="culture-graph-search" className="sr-only">
        Search the Culture Graph
      </label>
      <input
        id="culture-graph-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles to focus in the graph…"
        className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--surface)] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
      />

      {!query.trim() && (
        <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Recently added
        </p>
      )}
      {query.trim() && results.length === 0 && (
        <p className="mt-3 text-sm text-zinc-500">No matching articles.</p>
      )}

      {results.length > 0 && (
        <ul className={query.trim() ? "mt-3 flex flex-col gap-1.5" : "flex flex-col gap-1.5"}>
          {results.map((node) => (
            <li key={node.slug}>
              <button
                type="button"
                onClick={() => onSelect(node.slug)}
                aria-current={node.slug === focusedSlug ? "true" : undefined}
                className={`flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 ${
                  node.slug === focusedSlug ? "bg-[var(--accent-muted)]" : "hover:bg-white/5"
                }`}
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
                  <EntryCardMedia entry={node} aspect="square" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{node.title}</p>
                  <Badge category={node.category} className="mt-0.5" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

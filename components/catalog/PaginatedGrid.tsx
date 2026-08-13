"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MOBILE_BREAKPOINT_PX = 639;
const INITIAL_MOBILE = 9;
const INITIAL_DESKTOP = 12;

interface PaginatedGridProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** When provided with enableSearch, shows a search input that expands all matches. */
  getSearchText?: (item: T) => string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  gridClassName?: string;
  emptyMessage?: string;
}

function useBatchSize() {
  const [batchSize, setBatchSize] = useState(INITIAL_DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`);
    const sync = () => {
      setBatchSize(mq.matches ? INITIAL_MOBILE : INITIAL_DESKTOP);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return batchSize;
}

export function PaginatedGrid<T>({
  items,
  getKey,
  renderItem,
  getSearchText,
  searchPlaceholder = "Search…",
  enableSearch = true,
  gridClassName = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  emptyMessage = "Nothing matches these filters.",
}: PaginatedGridProps<T>) {
  const batchSize = useBatchSize();
  // null → follow current breakpoint batch size (avoids syncing via effects).
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const effectiveVisible = visibleCount ?? batchSize;

  const isLegacySearch = Boolean(enableSearch && getSearchText);
  const q = query.trim().toLowerCase();
  const filtered =
    isLegacySearch && q
      ? items.filter((item) =>
          getSearchText!(item).toLowerCase().includes(q),
        )
      : items;

  // Legacy search expands all matches; discovery mode always paginates.
  const expandAll = isLegacySearch && q.length > 0;
  const shown = expandAll ? filtered : filtered.slice(0, effectiveVisible);
  const hasMore = !expandAll && effectiveVisible < filtered.length;

  return (
    <div>
      {isLegacySearch && (
        <div className="mb-6">
          <label className="sr-only" htmlFor="catalog-search">
            Search
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-[var(--accent)]/25"
          />
        </div>
      )}

      {shown.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          {emptyMessage}
        </p>
      ) : (
        <div className={gridClassName}>
          {shown.map((item) => (
            <div key={getKey(item)}>{renderItem(item)}</div>
          ))}
        </div>
      )}

      {expandAll && filtered.length > 0 && (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Showing all {filtered.length} matching{" "}
          {filtered.length === 1 ? "result" : "results"}
        </p>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount(
                Math.min(effectiveVisible + batchSize, filtered.length),
              )
            }
            className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/10"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

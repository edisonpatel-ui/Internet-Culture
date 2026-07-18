"use client";

import {
  useEffect,
  useMemo,
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
  /** When provided, enables client-side search and expands to all matches while filtering. */
  getSearchText?: (item: T) => string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  gridClassName?: string;
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
}: PaginatedGridProps<T>) {
  const batchSize = useBatchSize();
  const [visibleCount, setVisibleCount] = useState(INITIAL_DESKTOP);
  const [query, setQuery] = useState("");

  // Keep the collapsed window aligned with the current breakpoint.
  useEffect(() => {
    setVisibleCount((prev) => (prev <= batchSize ? batchSize : prev));
  }, [batchSize]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !getSearchText) return items;
    return items.filter((item) =>
      getSearchText(item).toLowerCase().includes(q),
    );
  }, [items, query, getSearchText]);

  const isFiltering = enableSearch && query.trim().length > 0;
  const shown = isFiltering ? filtered : filtered.slice(0, visibleCount);
  const hasMore = !isFiltering && visibleCount < filtered.length;
  const canCollapse =
    !isFiltering &&
    filtered.length > batchSize &&
    visibleCount >= filtered.length;

  return (
    <div>
      {enableSearch && getSearchText && (
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
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
      )}

      {shown.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No matching articles.
        </p>
      ) : (
        <div className={gridClassName}>
          {shown.map((item) => (
            <div key={getKey(item)}>{renderItem(item)}</div>
          ))}
        </div>
      )}

      {isFiltering && filtered.length > 0 && (
        <p className="mt-4 text-center text-sm text-zinc-500">
          Showing all {filtered.length} matching{" "}
          {filtered.length === 1 ? "result" : "results"}
        </p>
      )}

      {(hasMore || canCollapse) && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (hasMore) {
                setVisibleCount((count) =>
                  Math.min(count + batchSize, filtered.length),
                );
              } else {
                setVisibleCount(batchSize);
              }
            }}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/10"
          >
            {hasMore ? "Show More" : "Show Less"}
          </button>
        </div>
      )}
    </div>
  );
}

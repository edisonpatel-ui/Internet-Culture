import type { MediaItem } from "@/types";
import { PLATFORM_META } from "./platformMeta";

export function AttributionBar({ item }: { item: MediaItem }) {
  const meta = PLATFORM_META[item.platform] ?? PLATFORM_META.other;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 transition-colors hover:text-zinc-300 ${meta.color}`}
      >
        <span aria-hidden>{meta.icon}</span>
        {item.source}
      </a>
      {item.attribution && <span>{item.attribution}</span>}
      {item.license && (
        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-600">
          {item.license}
        </span>
      )}
      {item.verified && (
        <span
          className="inline-flex items-center gap-1 text-emerald-600"
          title="Source verified by editors"
        >
          ✓ verified
        </span>
      )}
    </div>
  );
}

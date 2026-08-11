"use client";

import { useState } from "react";
import type { MediaItem } from "@/types";
import { AttributionBar } from "./AttributionBar";
import { stableMediaUrl } from "@/lib/media/mediaUtils";

/**
 * Client-only gallery image with error fallback.
 *
 * Kept separate from MediaRenderer so YouTube iframes and link cards can stay
 * as Server Components and avoid hydration attribute mismatches.
 */
export function GalleryImage({
  item,
  hideAttribution,
}: {
  item: MediaItem;
  hideAttribution?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = stableMediaUrl(item.url);

  if (failed) {
    return (
      <div>
        <div className="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-zinc-900 px-4">
          <p className="text-center text-sm text-zinc-500">
            Image unavailable — see source link below
          </p>
        </div>
        {item.description && (
          <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
        )}
        {!hideAttribution && <AttributionBar item={item} />}
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
        <div className="aspect-video w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={item.title}
            className="h-full w-full object-contain"
            onError={() => setFailed(true)}
          />
        </div>
      </div>
      {item.description && (
        <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
      )}
      {!hideAttribution && <AttributionBar item={item} />}
    </div>
  );
}

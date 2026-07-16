import { MediaGallery } from "@/components/media/MediaGallery";
import type { BaseEntry } from "@/types";

interface EntryGalleryProps {
  entry: Pick<BaseEntry, "title" | "imageGradient" | "imageUrl">;
  /** Additional image URLs — shown as secondary tiles when provided. */
  images?: string[];
}

/**
 * Compact media gallery for the article body.
 * Shows the entry's primary image (or gradient placeholder) alongside
 * two secondary image slots. When real images are available, pass them
 * via the `images` prop and they will replace the placeholders automatically.
 */
export function EntryGallery({ entry, images = [] }: EntryGalleryProps) {
  // Derive secondary gradient palette from the primary gradient
  const stops = entry.imageGradient.split(" ");
  const secondaryA =
    stops.length >= 2
      ? `${stops[stops.length - 1]} via-zinc-800 ${stops[0]}`
      : "from-zinc-800 via-zinc-700 to-zinc-800";
  const secondaryB = "from-zinc-800 via-zinc-800 to-zinc-700";

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Media
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {/* Primary image */}
        <div className="col-span-2">
          <MediaGallery
            title={entry.title}
            imageGradient={entry.imageGradient}
            imageUrl={images[0] ?? entry.imageUrl}
            aspect="video"
          />
        </div>

        {/* Secondary image slots */}
        <div className="grid grid-rows-2 gap-2">
          {images[1] ? (
            <div className="relative overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[1]}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`rounded-xl bg-gradient-to-br ${secondaryA} opacity-50`}
            />
          )}
          {images[2] ? (
            <div className="relative overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[2]}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`rounded-xl bg-gradient-to-tl ${secondaryB} opacity-50`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";
import {
  stableMediaUrl,
  type MediaObjectFit,
} from "@/lib/media/mediaUtils";

interface MediaImageProps {
  src: string;
  alt: string;
  /** When the image fails, show this gradient + title instead of a broken icon. */
  fallbackTitle: string;
  fallbackGradient: string;
  /**
   * contain — preserve full subject (faces, meme frames, logos)
   * cover — fill the frame when cropping is safe (landscape scenes)
   */
  fit?: MediaObjectFit;
  className?: string;
  imgClassName?: string;
  /** Pass "none" when the parent controls width/height (list thumbnails). */
  aspect?: "video" | "square" | "wide" | "none";
}

/**
 * Safe image renderer for featured/card media.
 *
 * - Never shows a broken-image icon
 * - Falls back to ImagePlaceholder (gradient + title) on load failure
 * - Uses object-contain or object-cover based on the fit prop
 * - Normalizes URLs via stableMediaUrl to prevent SSR/client src mismatches
 */
export function MediaImage({
  src,
  alt,
  fallbackTitle,
  fallbackGradient,
  fit = "contain",
  className,
  imgClassName,
  aspect = "video",
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const normalizedSrc = stableMediaUrl(src);

  if (failed || !normalizedSrc) {
    return (
      <ImagePlaceholder
        title={fallbackTitle}
        gradient={fallbackGradient}
        aspect={aspect}
        className={className}
      />
    );
  }

  const aspectClass =
    aspect === "none"
      ? undefined
      : {
          video: "aspect-video",
          square: "aspect-square",
          wide: "aspect-[21/9]",
        }[aspect];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-900",
        aspectClass,
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={normalizedSrc}
        alt={alt}
        className={cn(
          "h-full w-full",
          fit === "contain" ? "object-contain" : "object-cover",
          imgClassName,
        )}
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </div>
  );
}

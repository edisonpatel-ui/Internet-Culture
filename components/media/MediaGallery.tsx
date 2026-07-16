import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface MediaGalleryProps {
  title: string;
  imageGradient: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  /** Tailwind aspect class — defaults to "video" (16/9). */
  aspect?: "video" | "square" | "wide";
  className?: string;
}

/**
 * Renders a real image via next/image when imageUrl is provided,
 * or falls back to the gradient ImagePlaceholder.
 *
 * Designed to replace ImagePlaceholder everywhere so real images
 * appear automatically once an entry has imageUrl set.
 */
export function MediaGallery({
  title,
  imageGradient,
  imageUrl,
  aspect = "video",
  className,
}: MediaGalleryProps) {
  if (!imageUrl) {
    return (
      <ImagePlaceholder
        title={title}
        gradient={imageGradient}
        aspect={aspect}
        className={className}
      />
    );
  }

  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
  }[aspect];

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${aspectClass} ${className ?? ""}`}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
    </div>
  );
}

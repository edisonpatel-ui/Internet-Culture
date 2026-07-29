import { cn } from "@/lib/utils";
import { coolGradientCss } from "@/lib/media/coolGradient";

interface ImagePlaceholderProps {
  title: string;
  gradient: string;
  className?: string;
  /** Pass "none" when the parent controls width/height (list thumbnails). */
  aspect?: "video" | "square" | "wide" | "none";
}

export function ImagePlaceholder({
  title,
  gradient,
  className,
  aspect = "video",
}: ImagePlaceholderProps) {
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
        "relative overflow-hidden rounded-xl",
        aspectClass,
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundColor:
            coolGradientCss(gradient).match(/rgb\([^)]+\)/)?.[0] ??
            "rgb(79, 70, 229)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span className="text-center text-sm font-semibold text-white/90 drop-shadow-lg line-clamp-2">
          {title}
        </span>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
    </div>
  );
}

import { cn, getCategoryLabel } from "@/lib/utils";
import type { ContentCategory } from "@/types";

const categoryStyles: Record<ContentCategory, string> = {
  meme: "bg-pink-500/15 text-pink-300 border-pink-500/20",
  slang: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  trend: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  brainrot: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  event: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
};

interface BadgeProps {
  category: ContentCategory | string;
  className?: string;
}

export function Badge({ category, className }: BadgeProps) {
  const style =
    categoryStyles[category as ContentCategory] ??
    "bg-zinc-500/15 text-zinc-300 border-zinc-500/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        style,
        className
      )}
    >
      {getCategoryLabel(category)}
    </span>
  );
}

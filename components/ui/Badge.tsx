import { cn, getCategoryLabel } from "@/lib/utils";
import type { ContentCategory } from "@/types";

/** Category chips — distinct but harmonized with the indigo brand spine. */
const categoryStyles: Record<ContentCategory, string> = {
  meme: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/25",
  slang: "bg-sky-500/15 text-sky-200 border-sky-400/25",
  trend: "bg-[var(--accent-muted)] text-[var(--accent-secondary)] border-[var(--accent-border)]",
  brainrot: "bg-amber-500/15 text-amber-200 border-amber-400/25",
  event: "bg-emerald-500/15 text-emerald-200 border-emerald-400/25",
  creator: "bg-blue-500/15 text-blue-200 border-blue-400/25",
};

interface BadgeProps {
  category: ContentCategory | string;
  className?: string;
}

export function Badge({ category, className }: BadgeProps) {
  const style =
    categoryStyles[category as ContentCategory] ??
    "bg-[var(--accent-muted)] text-[var(--accent-secondary)] border-[var(--accent-border)]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        style,
        className
      )}
    >
      {getCategoryLabel(category)}
    </span>
  );
}

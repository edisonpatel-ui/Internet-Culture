import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  emoji?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function SectionHeader({
  emoji,
  title,
  description,
  href,
  linkLabel = "View all",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h2>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-zinc-400 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="link-brand text-sm font-medium hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]/50 rounded-sm"
        >
          {linkLabel}
          <span aria-hidden> →</span>
        </Link>
      )}
    </div>
  );
}

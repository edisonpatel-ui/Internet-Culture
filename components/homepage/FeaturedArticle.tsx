import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, Gem, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import {
  FEATURED_REASON_LABELS,
  type DailyFeaturedArticle,
  type FeaturedReason,
} from "@/lib/content/getDailyFeaturedArticle";
import { formatDate, getDetailHref } from "@/lib/utils";

const REASON_ICONS: Record<FeaturedReason, LucideIcon> = {
  "velocity-spike": Flame,
  "on-this-day": CalendarDays,
  "hidden-gem": Gem,
  "daily-spotlight": Sparkles,
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Origin dates on the 1st of a month are year/month-precision placeholders in
 * the catalog, so show only the precision we actually have: "2005" for Jan 1,
 * "June 2013" for other 1sts, and the full date otherwise.
 */
function formatOriginDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return formatDate(iso);
  const [, year, month, day] = m;
  if (day === "01" && month === "01") return year;
  if (day === "01") return `${MONTHS[Number(month) - 1]} ${year}`;
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

interface FeaturedArticleProps {
  featured: DailyFeaturedArticle;
}

/**
 * Bottom-of-homepage "Featured Today" card. The badge always says WHY the
 * article was picked (velocity spike, on this day, hidden gem, or the daily
 * spotlight); selection itself lives in lib/content/getDailyFeaturedArticle.ts.
 */
export function FeaturedArticle({ featured }: FeaturedArticleProps) {
  const { entry, reason, detail } = featured;
  const href = getDetailHref(entry.category, entry.slug);
  const Icon = REASON_ICONS[reason];

  const dateLabel = entry.historicalDate
    ? { prefix: "Origin", value: formatOriginDate(entry.historicalDate) }
    : { prefix: "Added", value: formatDate(entry.addedAt) };

  return (
    <section id="featured-today" className="py-10 sm:py-14">
      <SectionHeader
        title="Featured Today"
        description="A new article every day, picked automatically at midnight UTC."
      />

      <article className="glass-card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-2">
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="block p-6 sm:p-8 lg:pr-4"
          >
            <EntryCardMedia entry={entry} aspect="wide" />
          </Link>

          <div className="flex flex-col justify-center px-6 pb-6 sm:px-8 sm:pb-8 lg:py-8 lg:pl-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-secondary)]">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {FEATURED_REASON_LABELS[reason]}
              </span>
              {detail && (
                <span className="text-xs text-zinc-400">{detail}</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Badge category={entry.category} />
              <span className="text-xs text-zinc-500">
                {dateLabel.prefix} · {dateLabel.value}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              <Link href={href} className="transition-colors hover:text-zinc-200">
                {entry.title}
              </Link>
            </h3>
            <p className="mt-3 line-clamp-4 text-sm text-zinc-400 sm:text-base">
              {entry.description}
            </p>

            <div className="mt-6">
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)]"
              >
                Read article
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

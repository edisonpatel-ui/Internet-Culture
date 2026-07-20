import Link from "next/link";

interface DetailPageLayoutProps {
  children: React.ReactNode;
  backHref: string;
  backLabel: string;
}

export function DetailPageLayout({
  children,
  backHref,
  backLabel,
}: DetailPageLayoutProps) {
  return (
    <article className="pb-4">
      <Link
        href={backHref}
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 rounded-sm"
      >
        ← {backLabel}
      </Link>
      {children}
    </article>
  );
}

interface ContentBlockProps {
  title: string;
  children: React.ReactNode;
}

export function ContentBlock({ title, children }: ContentBlockProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="glass-card p-5 text-sm leading-[1.7] text-zinc-300 sm:p-6 sm:text-base sm:leading-[1.75]">
        {children}
      </div>
    </section>
  );
}

interface TimelineProps {
  events: { date: string; event: string }[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <ol className="relative space-y-6 border-l border-white/10 pl-6">
      {events.map((item, index) => (
        <li key={index} className="relative">
          <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-violet-500 ring-4 ring-zinc-950" />
          <p className="text-xs font-medium uppercase tracking-wide text-violet-400">
            {item.date}
          </p>
          <p className="mt-1 text-zinc-300">{item.event}</p>
        </li>
      ))}
    </ol>
  );
}

interface ExampleListProps {
  examples: string[];
}

export function ExampleList({ examples }: ExampleListProps) {
  return (
    <ul className="space-y-3">
      {examples.map((example, index) => (
        <li
          key={index}
          className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-zinc-300"
        >
          &ldquo;{example}&rdquo;
        </li>
      ))}
    </ul>
  );
}

// ─── Article metadata footer ──────────────────────────────────────────────────

interface ArticleMetadataProps {
  addedAt: string;
  lastUpdated?: string;
}

export function ArticleMetadata({ addedAt, lastUpdated }: ArticleMetadataProps) {
  // Parse YYYY-MM-DD as a calendar date (not UTC midnight) to avoid
  // off-by-one days and server/client timezone hydration mismatches.
  const fmt = (d: string) => {
    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
    if (dateOnly) {
      const year = Number(dateOnly[1]);
      const month = Number(dateOnly[2]);
      const day = Number(dateOnly[3]);
      return new Date(year, month - 1, day, 12).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <footer className="mb-4 border-t border-white/5 pt-8">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Entry record
      </h2>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
            Added
          </p>
          <p className="mt-0.5 text-sm text-zinc-400">{fmt(addedAt)}</p>
        </div>
        {lastUpdated && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
              Last updated
            </p>
            <p className="mt-0.5 text-sm text-zinc-400">{fmt(lastUpdated)}</p>
          </div>
        )}
      </div>
      <p className="mt-5 max-w-xl text-xs leading-relaxed text-zinc-600">
        Editorial encyclopedia entry — sources preferred over rumor.{" "}
        <Link
          href="/about"
          className="text-zinc-500 underline decoration-white/10 underline-offset-2 transition-colors hover:text-zinc-400"
        >
          About this site
        </Link>
      </p>
    </footer>
  );
}

interface AffiliatePlaceholderProps {
  name: string;
  description: string;
  priceLabel: string;
}

/**
 * Placeholder for future affiliate commerce.
 * Wired to entry.affiliateProduct today; real links go through
 * `lib/integrations` AffiliateProvider when enabled — do not hardcode networks here.
 */
export function AffiliatePlaceholder({
  name,
  description,
  priceLabel,
}: AffiliatePlaceholderProps) {
  return (
    <aside
      className="glass-card border-dashed border-violet-500/30 p-6"
      aria-label="Affiliate product placeholder"
    >
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">
        Related product
      </p>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      <div className="mt-4">
        <span className="text-lg font-bold text-white">{priceLabel}</span>
      </div>
      <p className="mt-3 text-xs text-zinc-600">
        Purchase links are not active yet.
      </p>
    </aside>
  );
}

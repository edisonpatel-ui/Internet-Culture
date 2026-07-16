import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badge,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-10 border-b border-white/5 pb-8 sm:mb-12">
      {badge && (
        <div className="mb-4">
          <Badge category={badge} />
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

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
    <article>
      <Link
        href={backHref}
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
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
    <section className="glass-card p-6 sm:p-8">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      <div className="text-sm leading-relaxed text-zinc-300 sm:text-base">
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

interface AffiliatePlaceholderProps {
  name: string;
  description: string;
  priceLabel: string;
}

export function AffiliatePlaceholder({
  name,
  description,
  priceLabel,
}: AffiliatePlaceholderProps) {
  return (
    <div className="glass-card border-dashed border-violet-500/30 p-6">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">
        Affiliate Product
      </p>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-white">{priceLabel}</span>
        <span className="rounded-full bg-white/5 px-4 py-2 text-xs text-zinc-500">
          Coming soon
        </span>
      </div>
    </div>
  );
}

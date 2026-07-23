import Link from "next/link";

interface LegalPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  /** ISO date string for "Last updated" (YYYY-MM-DD). */
  lastUpdated: string;
}

export function LegalPageShell({
  title,
  description,
  children,
  lastUpdated,
}: LegalPageShellProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <p className="mb-3 text-sm text-zinc-500">
        <Link
          href="/"
          className="transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 rounded-sm"
        >
          Home
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-zinc-400">{title}</span>
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        {description}
      </p>
      <p className="mt-2 text-xs text-zinc-600">Last updated: {lastUpdated}</p>
      <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-zinc-300 sm:text-base">
        {children}
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="space-y-3 text-zinc-400">{children}</div>
    </section>
  );
}

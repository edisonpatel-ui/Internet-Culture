import Link from "next/link";
import { HomeSearch } from "@/components/homepage/HomeSearch";
import { EXPLORE_CATEGORIES } from "@/lib/homepage/exploreCategories";
import { SITE_NAME } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      {/* Intentional brand wash — flat gradient plane, no floating orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-wash)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-border)] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-medium tracking-wide text-[var(--accent-secondary)] animate-fade-in">
            Encyclopedia
          </p>

          <h1 className="font-page text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
            {SITE_NAME}
          </h1>

          <p className="font-page mt-4 text-lg leading-relaxed text-zinc-300 sm:text-xl animate-fade-in-up animation-delay-100">
            Internet culture, documented
          </p>

          <p className="font-page mt-3 text-sm text-zinc-500 sm:text-base animate-fade-in-up animation-delay-100">
            Explore meanings, origins, and context.
          </p>

          <div className="mt-8">
            <HomeSearch />
          </div>

          <nav
            aria-label="Browse categories"
            className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up animation-delay-200"
          >
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="rounded-md border border-[var(--glass-border)] bg-[var(--surface)] px-3.5 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:border-[var(--accent-border)] hover:bg-[var(--accent-muted)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { HomeSearch } from "@/components/homepage/HomeSearch";
import { EXPLORE_CATEGORIES } from "@/lib/homepage/exploreCategories";
import { SITE_NAME } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-medium tracking-wide text-zinc-500 animate-fade-in">
            Encyclopedia
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
            {SITE_NAME}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-zinc-300 sm:text-xl animate-fade-in-up animation-delay-100">
            Internet culture, documented
          </p>

          <p className="mt-3 text-sm text-zinc-500 sm:text-base animate-fade-in-up animation-delay-100">
            Meanings, origins, and context — without the noise.
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
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
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

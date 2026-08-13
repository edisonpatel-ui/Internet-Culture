import { HomeSearch } from "@/components/homepage/HomeSearch";
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--accent-border)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-medium tracking-wide text-[var(--accent-secondary)] animate-fade-in">
            Welcome to The:
          </p>

          <h1 className="font-page text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
            {SITE_NAME}
          </h1>

          <p className="font-page mt-4 text-lg leading-relaxed text-zinc-300 sm:text-xl animate-fade-in-up animation-delay-100">
            Explore the world of documented Internet culture
          </p>

          <div className="mt-8">
            <HomeSearch />
          </div>
        </div>
      </div>
    </section>
  );
}

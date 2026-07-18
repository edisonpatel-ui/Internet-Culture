import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrackLink } from "@/components/analytics/TrackLink";
import { EXPLORE_CATEGORIES } from "@/lib/homepage/exploreCategories";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export function ExploreCategories() {
  return (
    <section className="py-10 sm:py-14">
      <SectionHeader
        title="Browse by category"
        description="Memes, slang, events, creators, and more — pick a lane."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {EXPLORE_CATEGORIES.map((cat) => (
          <TrackLink
            key={cat.href}
            href={cat.href}
            event={ANALYTICS_EVENTS.HUB_CLICK}
            eventProps={{
              href: cat.href,
              label: cat.label,
              from_slug: "home",
            }}
            className="group glass-card flex h-full flex-col items-center gap-2 p-5 text-center transition-colors duration-200 hover:-translate-y-0.5 hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 sm:p-6"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-2xl shadow-lg`}
              aria-hidden
            >
              {cat.icon}
            </div>
            <span className="text-base font-semibold text-white group-hover:text-violet-200">
              {cat.label}
            </span>
            <span className="text-xs leading-snug text-zinc-500 line-clamp-2">
              {cat.description}
            </span>
          </TrackLink>
        ))}
      </div>
    </section>
  );
}

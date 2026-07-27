import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrackLink } from "@/components/analytics/TrackLink";
import { EXPLORE_CATEGORIES } from "@/lib/homepage/exploreCategories";
import { EXPLORE_CATEGORY_ICONS } from "@/lib/homepage/exploreCategoryIcons";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export function ExploreCategories() {
  return (
    <section className="py-10 sm:py-14">
      <SectionHeader
        title="Browse by category"
        description="Pick a topic to explore."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {EXPLORE_CATEGORIES.map((cat) => {
          const Icon =
            EXPLORE_CATEGORY_ICONS[
              cat.href as keyof typeof EXPLORE_CATEGORY_ICONS
            ];
          return (
            <TrackLink
              key={cat.href}
              href={cat.href}
              event={ANALYTICS_EVENTS.HUB_CLICK}
              eventProps={{
                href: cat.href,
                label: cat.label,
                from_slug: "home",
              }}
              className="group glass-card flex h-full flex-col items-center gap-2 p-5 text-center transition-colors duration-200 hover:border-[var(--accent-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]/50 sm:p-6"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br ${cat.color} text-white shadow-sm shadow-black/20`}
                aria-hidden
              >
                {Icon ? (
                  <Icon className="h-7 w-7 stroke-[1.75]" aria-hidden />
                ) : null}
              </div>
              <span className="text-base font-semibold text-white group-hover:text-[var(--accent-secondary)]">
                {cat.label}
              </span>
              <span className="text-xs leading-snug text-zinc-500 line-clamp-2">
                {cat.description}
              </span>
            </TrackLink>
          );
        })}
      </div>
    </section>
  );
}

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EXPLORE_CATEGORIES } from "@/lib/homepage/exploreCategories";

export function ExploreCategories() {
  return (
    <section className="py-10 sm:py-14">
      <SectionHeader
        title="Explore Categories"
        description="Jump into any corner of internet culture."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {EXPLORE_CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group glass-card flex flex-col items-center gap-2 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/15 sm:p-6"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-2xl shadow-lg`}
            >
              {cat.icon}
            </div>
            <span className="text-base font-semibold text-white group-hover:text-violet-200">
              {cat.label}
            </span>
            <span className="text-xs leading-snug text-zinc-500 line-clamp-2">
              {cat.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

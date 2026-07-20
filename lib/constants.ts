export const SITE_NAME = "Internet Culture Hub";
export const SITE_TAGLINE =
  "Memes, slang, and viral culture — explained clearly.";
export const SITE_DESCRIPTION =
  "A curated encyclopedia of internet culture: memes, slang, viral trends, brainrot, creators, and the moments that shaped them.";

/** Core encyclopedia categories — primary navigation. */
export const PRIMARY_NAV_LINKS = [
  { href: "/memes", label: "Memes" },
  { href: "/slang", label: "Slang" },
  { href: "/events", label: "Events" },
  { href: "/creators", label: "Creators" },
] as const;

/**
 * Discovery tools — Explore menu (not primary peers of content types).
 * Trends uses /trending#trends (same route; Trends section on that page).
 */
export const EXPLORE_NAV_LINKS = [
  { href: "/trending", label: "What's Rising" },
  { href: "/trending#trends", label: "Trends" },
  { href: "/brainrot", label: "Brainrot Hub" },
  { href: "/rankings", label: "Rankings" },
] as const;

/** Utility links — footer / Explore utility, not primary nav. */
export const UTILITY_NAV_LINKS = [
  { href: "/about", label: "About" },
] as const;

/** Flat browse list for footer (encyclopedia + explore + utility). */
export const FOOTER_BROWSE_LINKS = [
  ...PRIMARY_NAV_LINKS,
  ...EXPLORE_NAV_LINKS,
  ...UTILITY_NAV_LINKS,
] as const;

export const CATEGORIES = [
  {
    href: "/trending",
    label: "What's Rising",
    description: "What the internet can't stop talking about",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/memes",
    label: "Memes",
    description: "Visual humor and cultural shorthand",
    icon: "😂",
    color: "from-pink-500 to-rose-500",
  },
  {
    href: "/slang",
    label: "Slang",
    description: "The vocabulary of the internet",
    icon: "💬",
    color: "from-cyan-500 to-blue-500",
  },
  {
    href: "/brainrot",
    label: "Brainrot Hub",
    description: "Delightfully unhinged content",
    icon: "🧠",
    color: "from-orange-500 to-amber-500",
  },
  {
    href: "/events",
    label: "Events",
    description: "Cultural moments that defined the era",
    icon: "⚡",
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/creators",
    label: "Creators",
    description: "The people who shape internet culture",
    icon: "🎥",
    color: "from-sky-500 to-cyan-500",
  },
  {
    href: "/rankings",
    label: "Rankings",
    description: "Everything ranked, sorted, and scored",
    icon: "🏆",
    color: "from-violet-500 to-fuchsia-500",
  },
] as const;

export const RANKING_SYSTEMS = [
  { id: "brainrot", label: "Most Brainrot", icon: "🧠", description: "Highest brainrot scores across all content" },
  { id: "cringe", label: "Most Cringe", icon: "😬", description: "Content that makes you look away but watch anyway" },
  { id: "popular", label: "Most Popular", icon: "👀", description: "Ranked by total view count" },
  { id: "viral", label: "Most Viral", icon: "📈", description: "Fastest spread across platforms" },
  { id: "newest", label: "Newest", icon: "✨", description: "Fresh additions to the encyclopedia" },
  { id: "fastest-growing", label: "Fastest Growing", icon: "🚀", description: "Trends accelerating right now" },
  { id: "fastest-declining", label: "Fading Out", icon: "📉", description: "Trends losing steam" },
  { id: "influential", label: "Most Influential", icon: "⚡", description: "Content that shaped culture" },
  { id: "underrated", label: "Most Underrated", icon: "💎", description: "Hidden gems with high relevance" },
  { id: "discussed", label: "Most Discussed", icon: "💬", description: "Generating the most conversation" },
] as const;

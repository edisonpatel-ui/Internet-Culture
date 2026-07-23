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

/** Legal / trust pages — footer only (not primary nav). */
export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/dmca", label: "Copyright / DMCA" },
  { href: "/attribution", label: "Attribution" },
] as const;

/**
 * Category accent gradients — restrained, brand-adjacent (indigo family +
 * one warm signal for brainrot). Not rainbow SaaS tiles.
 */
export const CATEGORIES = [
  {
    href: "/trending",
    label: "What's Rising",
    description: "What the internet can't stop talking about",
    icon: "🔥",
    color: "from-indigo-500 to-violet-600",
  },
  {
    href: "/memes",
    label: "Memes",
    description: "Visual humor and cultural shorthand",
    icon: "😂",
    color: "from-fuchsia-600/90 to-violet-600",
  },
  {
    href: "/slang",
    label: "Slang",
    description: "The vocabulary of the internet",
    icon: "💬",
    color: "from-sky-500 to-indigo-600",
  },
  {
    href: "/brainrot",
    label: "Brainrot Hub",
    description: "Delightfully unhinged content",
    icon: "🧠",
    color: "from-amber-500 to-orange-600",
  },
  {
    href: "/events",
    label: "Events",
    description: "Cultural moments that defined the era",
    icon: "⚡",
    color: "from-emerald-500 to-teal-600",
  },
  {
    href: "/creators",
    label: "Creators",
    description: "The people who shape internet culture",
    icon: "🎥",
    color: "from-blue-500 to-indigo-600",
  },
  {
    href: "/rankings",
    label: "Rankings",
    description: "Everything ranked, sorted, and scored",
    icon: "🏆",
    color: "from-violet-500 to-indigo-600",
  },
] as const;

/** Ranking jump links — must match section `id`s on `app/rankings/page.tsx`. */
export const RANKING_SYSTEMS = [
  {
    id: "popular",
    label: "Highest Relevance",
    icon: "★",
    description: "Ranked by editorial relevance scores",
  },
  {
    id: "viral",
    label: "Rising Now",
    icon: "↑",
    description: "Rising or new entries, by editorial relevance",
  },
  {
    id: "brainrot",
    label: "Most Brainrot",
    icon: "●",
    description: "Highest editorial brainrot scores",
  },
  {
    id: "cringe",
    label: "Most Cringe",
    icon: "●",
    description: "Highest editorial cringe scores",
  },
  {
    id: "newest",
    label: "Newest",
    icon: "●",
    description: "Fresh additions to the encyclopedia",
  },
] as const;

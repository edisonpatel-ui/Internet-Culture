export const SITE_NAME = "Internet Culture Hub";
export const SITE_TAGLINE =
  "An encyclopedia for understanding internet culture.";
export const SITE_DESCRIPTION =
  "An encyclopedia of internet culture: memes, slang, trends, people, and the moments that shaped them — with context, history, and connections.";

/** Core encyclopedia categories — "Articles" dropdown. */
export const PRIMARY_NAV_LINKS = [
  { href: "/memes", label: "Memes" },
  { href: "/slang", label: "Slang" },
  { href: "/events", label: "Events" },
  { href: "/people", label: "People" },
  { href: "/trending#trends", label: "Trends" },
] as const;

/**
 * Timeline — top-level nav item, not a category and not an Explore tool.
 * Kept separate from PRIMARY_NAV_LINKS (which is documented as categories
 * only) rather than folded in, so that array's meaning stays accurate.
 */
export const TIMELINE_NAV_LINK = { href: "/timeline", label: "Timeline" } as const;

/** Culture Graph — same rationale as TIMELINE_NAV_LINK: top-level, not a category. */
export const CULTURE_GRAPH_NAV_LINK = { href: "/culture-graph", label: "Culture Graph" } as const;

/** Discovery tools — "Explore" dropdown. Rankings remains reachable here. */
export const EXPLORE_NAV_LINKS = [
  { href: "/trending", label: "What's Rising" },
  { href: "/rankings", label: "Rankings" },
  { href: "/brainrot", label: "Brainrot Hub" },
] as const;

/** "About" dropdown. */
export const UTILITY_NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/feedback", label: "Feedback & Suggestions" },
] as const;

/** Flat browse list for footer (encyclopedia + explore + utility). */
export const FOOTER_BROWSE_LINKS = [
  ...PRIMARY_NAV_LINKS,
  TIMELINE_NAV_LINK,
  CULTURE_GRAPH_NAV_LINK,
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
 * Social links — footer only. Fill in the real handle URL before deploying;
 * "#" is a placeholder so the build doesn't ship a dead/wrong link.
 */
export const SOCIAL_LINKS = [
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/internetculturesite/" },
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
    label: "Brainrot",
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
    href: "/people",
    label: "People",
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
    label: "Highest Current Popularity",
    icon: "★",
    description: "Ranked by Current Popularity scores",
  },
  {
    id: "influence",
    label: "Most Influential",
    icon: "◆",
    description: "Permanent cultural impact — editorial influence scores",
  },
  {
    id: "viral",
    label: "Rising Now",
    icon: "↑",
    description: "Rising or new entries, by Current Popularity",
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

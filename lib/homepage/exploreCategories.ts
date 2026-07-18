/**
 * Primary discovery paths on the homepage.
 * Uses /trending for Trends (there is no /trends route).
 */
export const EXPLORE_CATEGORIES = [
  {
    href: "/memes",
    label: "Memes",
    description: "Formats, characters, and viral visuals",
    icon: "😂",
    color: "from-pink-500 to-rose-500",
  },
  {
    href: "/slang",
    label: "Slang",
    description: "Words and phrases the internet invented",
    icon: "💬",
    color: "from-cyan-500 to-blue-500",
  },
  {
    href: "/trending",
    label: "Trends",
    description: "What culture is talking about now",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/events",
    label: "Events",
    description: "Moments that defined internet eras",
    icon: "⚡",
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/creators",
    label: "Creators",
    description: "People who shape online culture",
    icon: "🎥",
    color: "from-sky-500 to-cyan-500",
  },
] as const;

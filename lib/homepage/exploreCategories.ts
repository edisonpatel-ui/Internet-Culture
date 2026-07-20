/**
 * Homepage category grid — derived from site CATEGORIES so icons/colors
 * stay in sync. Uses /trending for Trends (there is no /trends route).
 */

import { CATEGORIES } from "@/lib/constants";

const HOME_HREFS = [
  "/memes",
  "/slang",
  "/brainrot",
  "/trending",
  "/events",
  "/creators",
] as const;

/** Shorter homepage blurbs — CATEGORIES keeps longer nav/about copy. */
const HOME_DESCRIPTIONS: Record<(typeof HOME_HREFS)[number], string> = {
  "/memes": "Formats, characters, and viral visuals",
  "/slang": "Words and phrases the internet invented",
  "/brainrot": "Gen Alpha culture hub — memes, slang, creators",
  "/trending": "What culture is talking about now",
  "/events": "Moments that defined internet eras",
  "/creators": "People who shape online culture",
};

/** Homepage labels — Trends (category) vs What's Rising (nav discovery). */
const HOME_LABELS: Partial<Record<(typeof HOME_HREFS)[number], string>> = {
  "/trending": "Trends",
  "/brainrot": "Brainrot Hub",
};

export const EXPLORE_CATEGORIES = HOME_HREFS.map((href) => {
  const base = CATEGORIES.find((c) => c.href === href);
  if (!base) {
    throw new Error(`EXPLORE_CATEGORIES: missing CATEGORIES entry for ${href}`);
  }
  return {
    href: base.href,
    label: HOME_LABELS[href] ?? base.label,
    description: HOME_DESCRIPTIONS[href],
    icon: base.icon,
    color: base.color,
  };
});

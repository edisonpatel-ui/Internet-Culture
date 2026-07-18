/**
 * Centralized search / SEO / duplicate-detection aliases.
 *
 * Stored separately from article files so entries stay focused on content.
 * Keys are canonical entry slugs; values are alternate queries people use.
 *
 * Expand this map as new slang spellings and SEO phrases appear.
 */

export type AliasRegistry = Readonly<Record<string, readonly string[]>>;

/**
 * Seed aliases for high-traffic terms.
 * Do not invent meanings — only capture known alternate spellings / search phrases.
 */
export const ALIAS_REGISTRY: AliasRegistry = {
  gyatt: ["gyat", "gyatt meaning", "what does gyatt mean"],
  "type-shii": ["type shit", "type shi", "type shii", "type shii meaning"],
  sigma: ["sigma male", "sigma male meaning", "what is a sigma"],
  "sigma-grindset": ["sigma grindset", "sigma mindset"],
  brainrot: [
    "brain rot",
    "gen alpha brainrot",
    "brainrot meaning",
    "what is brainrot",
  ],
  rizz: ["rizz meaning", "what does rizz mean", "charisma rizz"],
  "no-cap": ["no cap", "no cap meaning", "nocap"],
  "fanum-tax": ["fanum tax", "fanumtax"],
  "demure-mindful": [
    "very demure very mindful",
    "demure",
    "very demure",
    "demure mindful",
  ],
  "jools-lebron": ["jools lebron", "joolieannie", "demure girl"],
  "skibidi-toilet": ["skibidi", "skibidi toilet", "skibidi toilet meme"],
  gigachad: ["giga chad", "giga-chad", "gigachad meme"],
  "one-does-not-simply": [
    "one does not simply",
    "one does not simply walk into mordor",
    "boromir meme",
  ],
  "ohio-final-boss": ["ohio final boss", "only in ohio", "satoyu"],
  glazing: ["glaze", "glazing meaning", "what does glazing mean"],
  "crash-out": ["crash out", "crashout"],
  "locked-in": ["locked in", "lock in"],
  pookie: ["pookie meaning"],
  "ate-left-no-crumbs": ["ate and left no crumbs", "left no crumbs", "she ate"],
  mewing: ["mew", "mewing meaning"],
  looksmaxxing: ["looksmaxxing", "looks maxxing", "looksmax"],
  "distracted-boyfriend": ["distracted boyfriend meme", "distracted boyfriend"],
  "this-is-fine": ["this is fine meme", "this is fine dog"],
  "expanding-brain": ["expanding brain meme", "galaxy brain meme"],
  "surprised-pikachu": ["surprised pikachu meme"],
};

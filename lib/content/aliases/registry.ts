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
  mogging: ["mog", "mogged", "mogging meaning", "what does mogging mean"],
  "standing-on-business": [
    "standing on business",
    "stand on business",
    "standing on business meaning",
  ],
  npc: ["npc meaning", "what does npc mean", "calling someone an npc"],
  deadass: ["dead ass", "deadass meaning", "what does deadass mean"],
  bet: ["bet meaning", "bet slang", "what does bet mean"],
  "understood-the-assignment": [
    "understood the assignment",
    "she understood the assignment",
    "understood the assignment meaning",
  ],
  "main-character-energy": [
    "main character energy",
    "main character syndrome",
    "main character energy meaning",
  ],
  "drake-hotline-bling": [
    "drakeposting",
    "drake meme",
    "hotline bling meme",
    "drake hotline bling",
  ],
  "change-my-mind": ["change my mind meme", "crowder meme"],
  "coffin-dance": ["coffin dance meme", "dancing pallbearers", "astronomia coffin"],
  "among-us-era": ["among us meme", "among us memes", "among us era"],
  "is-this-a-pigeon": ["is this a pigeon", "is this a pigeon meme"],
  "two-buttons": ["two buttons meme", "daily struggle meme", "sweating buttons"],
  loss: ["loss meme", "is this loss", "| || || |_"],
  "gamestop-wallstreetbets": [
    "gamestop",
    "wallstreetbets",
    "gme squeeze",
    "gamestop squeeze",
  ],
  "area-51-raid": ["storm area 51", "area 51 raid", "area 51 meme"],
  "bereal-wave": ["bereal", "bereal app"],
  "threads-launch": ["threads meta", "threads app", "instagram threads"],
  "twitter-x-transition": [
    "twitter x",
    "twitter rebrand",
    "elon musk twitter",
    "x formerly twitter",
  ],
  dream: ["dream smp", "dream youtube", "dream minecraft"],
};

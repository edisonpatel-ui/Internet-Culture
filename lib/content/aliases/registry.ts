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
  gyatt: ["gyat", "gyatt meaning", "what does gyatt mean", "gyat meaning"],
  "kai-cenat": [
    "kai",
    "kai cenat",
    "who is kai cenat",
    "kai cenat streamer",
  ],
  amp: ["any means possible", "amp crew", "amp streamers"],
  pewdiepie: ["felix kjellberg", "pewds", "pewdiepie youtube"],
  aura: ["aura points", "aura farming", "aura meaning"],
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
  "fanum-tax": ["fanum tax", "fanumtax", "what is fanum tax"],
  "demure-mindful": [
    "very demure very mindful",
    "demure",
    "very demure",
    "demure mindful",
  ],
  "jools-lebron": ["jools lebron", "joolieannie", "demure girl"],
  "skibidi-toilet": [
    "skibidi",
    "skibidi toilet",
    "skibidi toilet meme",
    "skibidi guy",
    "skibidi man",
    "camera head toilet",
  ],
  gigachad: ["giga chad", "giga-chad", "gigachad meme"],
  "one-does-not-simply": [
    "one does not simply",
    "one does not simply walk into mordor",
    "boromir meme",
  ],
  "ohio-final-boss": [
    "ohio final boss",
    "only in ohio",
    "satoyu",
    "ohio meme",
  ],
  glazing: ["glaze", "glazing meaning", "what does glazing mean"],
  "crash-out": ["crash out", "crashout"],
  "locked-in": ["locked in", "lock in"],
  pookie: ["pookie meaning"],
  "ate-left-no-crumbs": ["ate and left no crumbs", "left no crumbs", "she ate"],
  mewing: ["mew", "mewing meaning", "mewing jawline"],
  looksmaxxing: ["looks maxxing", "looksmax", "looksmaxxing meaning"],
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
  "npc-streaming": [
    "npc stream",
    "npc streaming",
    "pinkydoll",
    "ice cream so good",
  ],
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
  "gta-6-release": [
    "gta 6",
    "gta 6 hype",
    "gta6",
    "grand theft auto 6",
    "gta vi",
    "gta 6 trailer",
  ],
  ishowspeed: [
    "darren watkins",
    "ishowspeed streamer",
    "who is ishowspeed",
  ],
  barbenheimer: ["barbie oppenheimer", "barbieheimer"],
  "dafuq-boom": ["dafuq boom", "skibidi toilet creator", "alexey gerasimov"],
  "quandale-dingle": [
    "quandale",
    "quandale dingle",
    "quandale dingle meme",
  ],
  "lord-farquaad-e": [
    "lord marquaad e",
    "lord farquaad e",
    "markiplier e",
    "farquaad e",
  ],
  "dat-boi": ["dat boi", "datboi", "here come dat boi", "o shit waddup"],
  "josh-hutcherson-whistle-edit": [
    "josh hutcherson whistle",
    "hutcherson whistle edit",
    "josh whistle edit",
  ],
  "arthurs-fist": ["arthur's fist", "arthur fist", "arthur clenched fist"],
  "100-men-vs-1-gorilla": [
    "100 men vs gorilla",
    "100 men vs 1 gorilla",
    "men vs gorilla",
  ],
  "handsome-squidward": [
    "handsome squidward",
    "squidward falling",
    "beautiful squidward",
  ],
  "overly-attached-girlfriend": [
    "overly attached girlfriend",
    "oag meme",
    "overly attached gf",
  ],
  "du-bist-gut-genug": [
    "du bist gut genug",
    "gut genug",
    "you are good enough song",
  ],
  "dafoe-looking-up": [
    "willem dafoe looking up",
    "dafoe looking up",
    "van gogh looking up",
  ],
  "most-liked-egg": [
    "instagram egg",
    "world record egg",
    "most liked egg",
    "egg gang",
  ],
  harambe: ["harambe meme", "harambe the gorilla", "dicks out for harambe"],
  "yanny-vs-laurel": ["yanny or laurel", "yanny laurel", "laurel or yanny"],
  "nothing-beats-a-jet2-holiday": [
    "jet2 holiday",
    "nothing beats a jet2 holiday",
    "jet2holiday",
  ],
  "my-shayla": ["my shayla", "my shayla meaning", "oh my god my shayla"],
};

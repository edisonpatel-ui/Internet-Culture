/**
 * Community taxonomy — language and culture profiles (RC3-D).
 */

export type CommunityTaxonomyId =
  | "gaming"
  | "anime"
  | "politics"
  | "sports"
  | "tech"
  | "finance"
  | "music"
  | "fashion"
  | "programming"
  | "cryptocurrency"
  | "gen_alpha"
  | "gen_z"
  | "millennials";

export interface CommunityTaxonomyNode {
  id: CommunityTaxonomyId;
  label: string;
  language: string;
  insideJokes: string[];
  typicalPlatforms: string[];
  contentTypes: string[];
  culture: string;
}

export const COMMUNITY_TAXONOMY: Record<
  CommunityTaxonomyId,
  CommunityTaxonomyNode
> = {
  gaming: {
    id: "gaming",
    label: "Gaming",
    language: "Game-title shorthand, skill insults/praise, patch slang.",
    insideJokes: ["Skill issue", "Touch grass (crossover)", "GG"],
    typicalPlatforms: ["Twitch", "Discord", "Reddit", "YouTube", "TikTok"],
    contentTypes: ["clips", "guides", "shitposts", "esports drama"],
    culture: "Performance + fandom; memes travel with titles and streamers.",
  },
  anime: {
    id: "anime",
    label: "Anime",
    language: "Loanwords, fandom shipping slang, seasonal cour jargon.",
    insideJokes: ["Waifu discourse", "Seasonal dumpster fires"],
    typicalPlatforms: ["Twitter/X", "Reddit", "Discord", "TikTok", "Tumblr"],
    contentTypes: ["edits", "fanart", "reaction images", "discourse threads"],
    culture: "Fandom intensity with strong visual meme pipelines.",
  },
  politics: {
    id: "politics",
    label: "Politics",
    language: "Ideological labels, campaign meme templates, doomposting.",
    insideJokes: ["This is fine", "cope/seethe lineages"],
    typicalPlatforms: ["Twitter/X", "Reddit", "YouTube", "TikTok"],
    contentTypes: ["infographics", "clip warfare", "shitpost propaganda"],
    culture: "High conflict; verify claims aggressively; preserve uncertainty.",
  },
  sports: {
    id: "sports",
    label: "Sports",
    language: "Stat slang, rivalry nicknames, fantasy-league jargon.",
    insideJokes: ["Narrative arcs around seasons", "Cope after losses"],
    typicalPlatforms: ["Twitter/X", "Reddit", "TikTok", "YouTube"],
    contentTypes: ["highlight memes", "reaction clips", "hot takes"],
    culture: "Real-time event-driven meme spikes.",
  },
  tech: {
    id: "tech",
    label: "Tech",
    language: "Product codenames, launch hype/backlash vocabulary.",
    insideJokes: ["It shipped", "Move fast break things irony"],
    typicalPlatforms: ["Twitter/X", "Hacker News", "Reddit", "YouTube"],
    contentTypes: ["screenshots", "leak discourse", "review essays"],
    culture: "Early adopters + critic class; memes around products and CEOs.",
  },
  finance: {
    id: "finance",
    label: "Finance",
    language: "Market slang, risk jokes, hustle critique/praise.",
    insideJokes: ["Numbers go up", "Bag mentality satire"],
    typicalPlatforms: ["Twitter/X", "Reddit", "YouTube", "TikTok"],
    contentTypes: ["charts", "explainers", "loss porn", "advice theater"],
    culture: "Overlaps crypto and hustle communities; high misinformation risk.",
  },
  music: {
    id: "music",
    label: "Music",
    language: "Genre tags, stan vocabulary, chart slang.",
    insideJokes: ["Stan wars", "Industry plant accusations"],
    typicalPlatforms: ["TikTok", "Twitter/X", "YouTube", "Instagram", "Discord"],
    contentTypes: ["edits", "challenges", "fancams", "discourse"],
    culture: "Sound-driven virality; platforms and charts reinforce each other.",
  },
  fashion: {
    id: "fashion",
    label: "Fashion",
    language: "Aesthetic labels, fit-check slang, brand shorthand.",
    insideJokes: ["Core-ification of aesthetics", "Quiet luxury discourse"],
    typicalPlatforms: ["Instagram", "TikTok", "Tumblr", "Pinterest"],
    contentTypes: ["lookbooks", "GRWM", "aesthetic montages"],
    culture: "Trend cycles compress aesthetics into nameable 'cores'.",
  },
  programming: {
    id: "programming",
    label: "Programming",
    language: "Stack jargon, bug humor, framework holy wars.",
    insideJokes: ["It works on my machine", "Regex jokes"],
    typicalPlatforms: ["Twitter/X", "Reddit", "GitHub", "Discord", "Hacker News"],
    contentTypes: ["shitposts", "explainers", "meme screenshots"],
    culture: "High insider density; memes encode tooling frustration.",
  },
  cryptocurrency: {
    id: "cryptocurrency",
    label: "Cryptocurrency",
    language: "Token ticker slang, degenspeak, protocol jargon.",
    insideJokes: ["WAGMI/NGMI", "Have fun staying poor"],
    typicalPlatforms: ["Twitter/X", "Discord", "Telegram", "Reddit", "YouTube"],
    contentTypes: ["charts", "raids", "copium/hopium posts"],
    culture: "Fast hype cycles; treat claims as high-bias until corroborated.",
  },
  gen_alpha: {
    id: "gen_alpha",
    label: "Gen Alpha",
    language: "Brainrot-heavy, absurdist, short-form native slang.",
    insideJokes: ["Skibidi", "Ohio", "Sigma stacks"],
    typicalPlatforms: ["TikTok", "YouTube Shorts", "Roblox-adjacent spaces"],
    contentTypes: ["brainrot edits", "sound memes", "character spam"],
    culture: "Maximum chaos / absurdist energy; meaning often secondary to vibe.",
  },
  gen_z: {
    id: "gen_z",
    label: "Gen Z",
    language: "Irony, therapy-speak hybrids, rapid slang turnover.",
    insideJokes: ["No thoughts head empty", "Chronically online"],
    typicalPlatforms: ["TikTok", "Instagram", "Twitter/X", "Discord"],
    contentTypes: ["POVs", "storytimes", "aesthetic cores"],
    culture: "Dominant 2018– mid-2020s slang/meme authorship cohort.",
  },
  millennials: {
    id: "millennials",
    label: "Millennials",
    language: "Earlier meme eras + nostalgic reuse; workplace meme fluency.",
    insideJokes: ["Distracted Boyfriend nostalgia", "Elder millennial markers"],
    typicalPlatforms: ["Facebook", "Instagram", "Twitter/X", "Reddit", "YouTube"],
    contentTypes: ["image macros", "reaction images", "explainers"],
    culture: "Bridge generation from forums/FB to TikTok; often archive keepers.",
  },
};

export function getCommunityTaxonomy(
  id: CommunityTaxonomyId,
): CommunityTaxonomyNode {
  return COMMUNITY_TAXONOMY[id];
}

export const COMMUNITY_TAXONOMY_IDS = Object.keys(
  COMMUNITY_TAXONOMY,
) as CommunityTaxonomyId[];

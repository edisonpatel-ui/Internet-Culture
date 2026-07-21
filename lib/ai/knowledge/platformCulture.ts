/**
 * Platform culture profiles — structural knowledge (RC3-D).
 */

export type PlatformCultureId =
  | "4chan"
  | "reddit"
  | "twitter_x"
  | "tiktok"
  | "youtube"
  | "instagram"
  | "tumblr"
  | "discord"
  | "facebook"
  | "vine"
  | "myspace";

export interface PlatformCultureProfile {
  id: PlatformCultureId;
  label: string;
  culture: string;
  humor: string;
  contentStyle: string;
  discovery: string;
  lifespan: string;
  typicalMemes: string[];
  typicalSlang: string[];
  historicalRole: string;
}

export const PLATFORM_CULTURE: Record<
  PlatformCultureId,
  PlatformCultureProfile
> = {
  "4chan": {
    id: "4chan",
    label: "4chan",
    culture: "Anonymous, board-based, high-ephemerality imageboard culture.",
    humor: "Absurdist, dark, ironic, deliberately offensive in-group humor.",
    contentStyle: "Images + short posts; greentext; rapid reply chains.",
    discovery: "Board catalogs and bumping — not personalized feeds.",
    lifespan: "Posts often ephemeral; cultural residue outlives threads.",
    typicalMemes: ["Rage comics era exports", "Wojak variants", "Copypasta"],
    typicalSlang: ["Anon", "Based/redpilled lineages", "Board-specific jargon"],
    historicalRole: "Major factory for early-2010s meme formats and politics-adjacent slang.",
  },
  reddit: {
    id: "reddit",
    label: "Reddit",
    culture: "Subreddit tribes with norms, mods, and upvote economies.",
    humor: "Reference humor, meta jokes, wholesome vs cursed poles.",
    contentStyle: "Links, text posts, image macros, AMAs.",
    discovery: "Subreddit subscriptions + ranking algorithms.",
    lifespan: "Threads persist; culture shifts with subreddit turnover.",
    typicalMemes: ["Advice animals era", "Subreddit-specific formats"],
    typicalSlang: ["TL;DR", "This", "Whoosh", "Copypasta variants"],
    historicalRole: "Bridge between niche boards and mainstream explainability.",
  },
  twitter_x: {
    id: "twitter_x",
    label: "Twitter/X",
    culture: "Real-time public conversation, quote-tweet combat, mutual graphs.",
    humor: "One-liners, ratio culture, screenshot discourse.",
    contentStyle: "Short text, images, video clips, threads.",
    discovery: "Following graph + algorithmic For You.",
    lifespan: "Fast news cycle; screenshots archive discourse.",
    typicalMemes: ["Quote-tweet templates", "Reaction image replies"],
    typicalSlang: ["Ratio", "Main character", "Chronically online"],
    historicalRole: "Primary arena for viral discourse and creator brand wars.",
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    culture: "Short-form performance, sounds, and participatory challenges.",
    humor: "Audio-driven, skit, absurdist Gen Z/Alpha humor.",
    contentStyle: "Vertical video, duets/stitches, text-on-screen.",
    discovery: "For You algorithmic recommendation.",
    lifespan: "Sounds and formats churn quickly; nostalgia waves recycle.",
    typicalMemes: ["Sound-based memes", "POV formats", "Brainrot characters"],
    typicalSlang: ["Rizz", "Sigma", "Gyatt", "NPC"],
    historicalRole: "Dominant 2020s meme/slang engine and Gen Alpha culture hub.",
  },
  youtube: {
    id: "youtube",
    label: "YouTube",
    culture: "Longer-form creators, commentary, essay, and reaction ecosystems.",
    humor: "Personality-driven, sketch, commentary roast.",
    contentStyle: "Videos, Shorts, livestream VODs.",
    discovery: "Subscriptions + recommendations + search.",
    lifespan: "Catalog content ages; Shorts follow TikTok tempos.",
    typicalMemes: ["YouTube Poop lineage", "Challenge videos", "Reaction cuts"],
    typicalSlang: ["Subscribe-for-X tropes", "Commentary vernacular"],
    historicalRole: "Home of creator careers and archival internet video culture.",
  },
  instagram: {
    id: "instagram",
    label: "Instagram",
    culture: "Visual lifestyle, aesthetic feeds, Stories, Reels.",
    humor: "Meme pages, shitpost accounts, aesthetic irony.",
    contentStyle: "Photos, carousels, Reels, Stories.",
    discovery: "Following + Explore + Reels ranking.",
    lifespan: "Aesthetics cycle; meme pages archive formats.",
    typicalMemes: ["Object labeling memes", "Reel audio memes"],
    typicalSlang: ["Aesthetic labels", "IG-caption slang"],
    historicalRole: "Mainstream aesthetic trends and influencer culture.",
  },
  tumblr: {
    id: "tumblr",
    label: "Tumblr",
    culture: "Reblog chains, fandom, aesthetic blogging, text posts.",
    humor: "Absurdist text posts, fandom shitposts.",
    contentStyle: "Images, text, GIFs, reblogs with commentary.",
    discovery: "Dashboard following + tags.",
    lifespan: "Long half-life via reblogs; diaspora after policy shifts.",
    typicalMemes: ["Text-post memes", "Fandom edits"],
    typicalSlang: ["Fandom vernacular", "Aesthetic coinages"],
    historicalRole: "Key 2010s fandom/aesthetic incubator (e.g. cottagecore roots).",
  },
  discord: {
    id: "discord",
    label: "Discord",
    culture: "Private/server communities, voice, emotes, insider norms.",
    humor: "Server-specific, emote spam, voice-chat bits.",
    contentStyle: "Chat, media drops, voice, stage events.",
    discovery: "Invites and server networks — not public feeds.",
    lifespan: "Culture persists in servers; hard to archive publicly.",
    typicalMemes: ["Emote reaction culture", "Copypasta in chats"],
    typicalSlang: ["Server-specific slang", "VC jargon"],
    historicalRole: "Infrastructure for modern fandoms, gaming, and creator communities.",
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    culture: "Broad social graph, groups, older mainstream audiences.",
    humor: "Minion-adjacent mainstream, group meme pages.",
    contentStyle: "Posts, groups, Reels, shares.",
    discovery: "Friends graph + Groups + ranking.",
    lifespan: "Long archival posts; meme pages recycle formats late.",
    typicalMemes: ["Boomer meme pages", "Shared image macros"],
    typicalSlang: ["Mainstreamed slang arriving late"],
    historicalRole: "Mass distribution layer and late-cycle meme destination.",
  },
  vine: {
    id: "vine",
    label: "Vine",
    culture: "Six-second loop comedy and creator clusters.",
    humor: "Punchy, musical, absurdist micro-skits.",
    contentStyle: "Looping short video.",
    discovery: "Following + explore; later nostalgia archives.",
    lifespan: "Platform ended; cultural memory via compilations.",
    typicalMemes: ["Classic Vine bits", "Audio callbacks"],
    typicalSlang: ["Vine-era catchphrases"],
    historicalRole: "Prototype for short-form video culture and many creator careers.",
  },
  myspace: {
    id: "myspace",
    label: "MySpace",
    culture: "Profile customization, music discovery, early social identity.",
    humor: "Top Friends drama, glitter aesthetics, HTML flex.",
    contentStyle: "Profiles, blogs, music players.",
    discovery: "Friend networks + music charts.",
    lifespan: "Peak mid-2000s; nostalgia object now.",
    typicalMemes: ["Profile aesthetic archetypes"],
    typicalSlang: ["Early social networking vernacular"],
    historicalRole: "Bridge from forums to modern social networking and music virality.",
  },
};

export function getPlatformCulture(
  id: PlatformCultureId,
): PlatformCultureProfile {
  return PLATFORM_CULTURE[id];
}

export const PLATFORM_CULTURE_IDS = Object.keys(
  PLATFORM_CULTURE,
) as PlatformCultureId[];

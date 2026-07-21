/**
 * Internet history eras — chronological cultural scaffolding (RC3-D).
 */

export type InternetHistoryEraId =
  | "early_internet"
  | "forums"
  | "imageboards"
  | "web_2_0"
  | "facebook_era"
  | "twitter_era"
  | "vine_era"
  | "tiktok_era"
  | "ai_era";

export interface InternetHistoryEra {
  id: InternetHistoryEraId;
  label: string;
  /** Approximate cultural window — not a hard scientific periodization. */
  approximateWindow: string;
  majorTechnologies: string[];
  majorPlatforms: string[];
  majorMemes: string[];
  majorSlang: string[];
  majorCreators: string[];
  majorEvents: string[];
  notes: string;
}

export const INTERNET_HISTORY_ERAS: readonly InternetHistoryEra[] = [
  {
    id: "early_internet",
    label: "Early Internet",
    approximateWindow: "1990s – early 2000s",
    majorTechnologies: ["dial-up", "HTML sites", "email", "IRC"],
    majorPlatforms: ["GeoCities", "Usenet", "early personal sites"],
    majorMemes: ["Dancing baby (proto)", "email forwards"],
    majorSlang: ["IM acronyms", "leet-speak beginnings"],
    majorCreators: ["early webmasters", "newsletter writers"],
    majorEvents: ["browser wars", "dot-com boom/bust"],
    notes: "Culture is site-centric and slow compared to later feed eras.",
  },
  {
    id: "forums",
    label: "Forums",
    approximateWindow: "late 1990s – mid 2000s",
    majorTechnologies: ["phpBB", "vBulletin", "avatars/signatures"],
    majorPlatforms: ["Something Awful", "topic forums", "game boards"],
    majorMemes: ["forum signature art", "copypasta roots"],
    majorSlang: ["tl;dr", "bump", "OP"],
    majorCreators: ["forum celebrities", "mod culture"],
    majorEvents: ["raid culture beginnings", "forum dramas"],
    notes: "Threaded identity + moderation norms shape later Reddit culture.",
  },
  {
    id: "imageboards",
    label: "Imageboards",
    approximateWindow: "mid 2000s – early 2010s",
    majorTechnologies: ["anonymous imageboards"],
    majorPlatforms: ["4chan", "related boards"],
    majorMemes: ["LOLcats export path", "rage comics precursors", "Wojak roots"],
    majorSlang: ["anon", "greentext", "based lineages"],
    majorCreators: ["anonymous collectives more than named stars"],
    majorEvents: ["Anonymous actions", "meme factory peaks"],
    notes: "High velocity formats; attribution often impossible — preserve uncertainty.",
  },
  {
    id: "web_2_0",
    label: "Web 2.0",
    approximateWindow: "mid 2000s – early 2010s",
    majorTechnologies: ["social profiles", "UGC platforms", "Flash"],
    majorPlatforms: ["MySpace", "YouTube", "early Facebook", "Tumblr"],
    majorMemes: ["YouTube Poop", "viral videos"],
    majorSlang: ["noob", "pwn", "fail/win"],
    majorCreators: ["early YouTubers", "MySpace musicians"],
    majorEvents: ["rise of user-generated video"],
    notes: "Named creators become central; virality still partly editorial.",
  },
  {
    id: "facebook_era",
    label: "Facebook Era",
    approximateWindow: "~2008 – mid 2010s",
    majorTechnologies: ["news feed", "likes", "share graph"],
    majorPlatforms: ["Facebook", "YouTube", "Reddit growth"],
    majorMemes: ["Advice animals", "image macros"],
    majorSlang: ["like if you agree culture", "status slang"],
    majorCreators: ["page admins", "share-bait publishers"],
    majorEvents: ["Arab Spring social narrative", "ice bucket challenge lineage"],
    notes: "Mainstream social graph distributes niche memes to mass audiences.",
  },
  {
    id: "twitter_era",
    label: "Twitter Era",
    approximateWindow: "~2012 – ~2020",
    majorTechnologies: ["hashtags", "quote tweets", "mobile-first feeds"],
    majorPlatforms: ["Twitter", "Instagram", "Tumblr", "YouTube"],
    majorMemes: ["screenshot discourse memes", "reaction images"],
    majorSlang: ["stan", "cancelled discourse", "ratio"],
    majorCreators: ["shitpost accounts", "commentary YouTubers"],
    majorEvents: ["platform politics", "viral news cycles"],
    notes: "Real-time discourse becomes the meme substrate.",
  },
  {
    id: "vine_era",
    label: "Vine Era",
    approximateWindow: "~2013 – 2017",
    majorTechnologies: ["six-second loops", "mobile cameras"],
    majorPlatforms: ["Vine", "YouTube mirrors", "Twitter"],
    majorMemes: ["classic Vine bits", "audio callbacks"],
    majorSlang: ["Vine catchphrases"],
    majorCreators: ["Vine stars who later moved platforms"],
    majorEvents: ["Vine shutdown", "nostalgia compilations"],
    notes: "Prototype for TikTok-era short-form creator economy.",
  },
  {
    id: "tiktok_era",
    label: "TikTok Era",
    approximateWindow: "~2018 – mid 2020s",
    majorTechnologies: ["For You algorithms", "sounds", "duet/stitch"],
    majorPlatforms: ["TikTok", "Reels", "Shorts", "Discord"],
    majorMemes: ["sound memes", "POV formats", "brainrot characters"],
    majorSlang: ["rizz", "sigma", "gyatt", "NPC"],
    majorCreators: ["short-form natives", "livestream personalities"],
    majorEvents: ["pandemic acceleration", "Gen Alpha brainrot wave"],
    notes: "Algorithmic discovery dominates; formats outpace single images.",
  },
  {
    id: "ai_era",
    label: "AI Era",
    approximateWindow: "~2022 – present (open)",
    majorTechnologies: ["generative image/video/text models", "deepfakes"],
    majorPlatforms: ["TikTok", "X", "YouTube", "Discord", "model UIs"],
    majorMemes: ["AI slop aesthetics", "model personality jokes"],
    majorSlang: ["slop", "prompt", "hallucination (popular sense)"],
    majorCreators: ["AI artists/tool demos", "commentary on AI culture"],
    majorEvents: ["chatbot product launches", "AI content floods"],
    notes: "Verify provenance aggressively; separate tool hype from culture facts.",
  },
] as const;

export function getInternetHistoryEra(
  id: InternetHistoryEraId,
): InternetHistoryEra | undefined {
  return INTERNET_HISTORY_ERAS.find((e) => e.id === id);
}

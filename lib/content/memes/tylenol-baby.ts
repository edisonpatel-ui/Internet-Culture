import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m64",
  slug: "tylenol-baby",
  title: "Tylenol Baby",
  category: "meme",
  description:
    "Ironic shorthand meme-slang for an autistic person that spread after the September 2025 Tylenol–autism press-conference discourse.",
  imageGradient: "from-red-500 via-rose-600 to-amber-400",
  scores: { relevance: 64, influence: 38, cringe: 72, brainrot: 68 },
  addedAt: "2026-07-18",
  historicalDate: "2025-09-01",
  views: 1100000,
  trendDirection: "declining",
  tags: ["tiktok", "2025", "slang-adjacent", "controversy", "reaction"],
  meaning:
    "An ironic internet label used in memes and comments as shorthand referencing autism — not a medical term. It emerged from joke culture around a September 2025 White House / HHS press moment claiming acetaminophen (Tylenol) use in pregnancy could raise autism likelihood. Encyclopedia note: the claim is contested science; this entry documents the meme language, not medical advice.",
  origin:
    "After the September 2025 autism-related press conference featuring Donald Trump and Robert F. Kennedy Jr. discussing acetaminophen and autism, meme accounts coined and circulated 'Tylenol Baby' as dark-humor / ironic shorthand. Know Your Meme documents the term as meme-driven internet slang born from that discourse wave.",
  timeline: [
    { date: "Sep 2025", event: "Press conference claims link acetaminophen and autism risk — discourse explodes online" },
    { date: "Sep–Oct 2025", event: "'Tylenol Baby' appears in memes, captions, and comment slang" },
    { date: "2026", event: "Term persists as niche ironic shorthand; remains controversial" },
  ],
  examples: [
    "Captioning a chaotic clip: 'certified Tylenol Baby moment'",
    "Self-deprecating comments using the phrase as autism-adjacent slang",
    "Reply-guy jokes after any Tylenol / pregnancy news cycle",
  ],
  relatedSlugs: ["hawk-tuah", "short-form-takeover", "tiktok-rise"],
  relationships: {
    relatedEvent: ["short-form-takeover", "tiktok-rise"],
    relatedTo: ["hawk-tuah"],
  },
  media: [
    // AI suggested — KYM cover screenshot; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/057/140/Screenshot_2026-07-15_141101.png",
      title: "Tylenol Baby — meme documentation cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/tylenol-baby",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cover imagery documenting the Tylenol Baby meme term.",
      date: "2025",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/tylenol-baby",
      title: "Tylenol Baby — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/tylenol-baby",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin in 2025 press-conference meme discourse.",
      date: "2025",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Tylenol Baby — Know Your Meme",
      url: "https://knowyourmeme.com/memes/tylenol-baby",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;

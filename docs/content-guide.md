# Content Guide — Internet Culture Hub

How to create, structure, and write articles that document internet culture accurately and with genuine editorial voice.

---

## Table of Contents

1. [How to Create a New Article](#how-to-create-a-new-article)
2. [Required Fields by Category](#required-fields-by-category)
3. [Media Fields](#media-fields)
4. [Source Rules](#source-rules)
5. [Attribution Rules](#attribution-rules)
6. [Editorial Style Guide](#editorial-style-guide)
7. [Content Language Policy](#content-language-policy)
8. [Examples of Good Entries](#examples-of-good-entries)
9. [Scores Reference](#scores-reference)
10. [Pre-Publish Checklist](#pre-publish-checklist)

Category quality expectations: [`CATEGORY_STANDARDS.md`](./CATEGORY_STANDARDS.md).
Quality audit: `npm run audit:quality`.

---

## How to Create a New Article

### Step 1 — Pick a category

| Category | What belongs here |
|---|---|
| `memes` | Image formats, video formats, reaction media, viral phenomena |
| `slang` | Words and phrases with internet-specific meaning or origin |
| `creators` | YouTubers, streamers, TikTokers, and influencers |
| `events` | Cultural moments, viral challenges, platform milestones |
| `trends` | Aesthetic movements, behavioral patterns, lifestyle fads |

### Step 2 — Create the file

Name the file using the entry's slug (URL-safe, kebab-case):

```
lib/content/memes/my-new-meme.ts
lib/content/slang/my-new-slang.ts
lib/content/creators/creator-name.ts
lib/content/events/event-name.ts
lib/content/trends/trend-name.ts
```

The filename **must exactly match** the `slug` field inside the entry.

### Step 3 — Write the entry

Use the template for your category (see [Required Fields](#required-fields-by-category)). Fill in every required field. Export the entry as the default export:

```typescript
import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  // ... fields ...
};

export default entry;
```

### Step 4 — Register the entry

Open `lib/content/[category]/index.ts` and:

1. Add an import at the top:
   ```typescript
   import myNewMeme from "./my-new-meme";
   ```

2. Add it to the array:
   ```typescript
   export const memes: MemeEntry[] = [
     // ... existing entries ...
     myNewMeme,
   ];
   ```

### Step 5 — Verify

Run:
```bash
npm run build
```

Confirm:
- The page renders at `/memes/[slug]`
- Search returns the entry
- No TypeScript errors
- `npm run validate` passes (duplicate slugs/ids are hard errors — not silent)

---

## Required Fields by Category

### Shared Fields (all categories)

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique ID. Format: `m22`, `s21`, `cr14`, `e12`, `t15`. Use the next available number. |
| `slug` | `string` | URL-safe, kebab-case. Must exactly match the filename without `.ts`. |
| `title` | `string` | Display name as it appears in the UI. |
| `category` | `string` | One of: `"meme"`, `"slang"`, `"creator"`, `"event"`, `"trend"`, `"brainrot"` |
| `description` | `string` | One-sentence hook shown on cards. Not a definition — a headline. |
| `imageGradient` | `string` | Tailwind gradient classes. Example: `"from-violet-500 via-purple-500 to-pink-500"` |
| `scores` | `object` | `{ relevance, influence, cringe, brainrot }` each 0–100 |
| `addedAt` | `string` | ISO date: `"2026-07-16"` |
| `views` | `number` | Approximate page-view estimate. Round to the nearest 10,000. |
| `trendDirection` | `string` | One of: `"new"`, `"rising"`, `"stable"`, `"declining"` |
| `sources` | `EntrySource[]` | At minimum one source for any entry making factual claims. |

### Meme Fields (`MemeEntry`)

| Field | Required? | Notes |
|---|---|---|
| `meaning` | Yes | What does this meme do / mean in use? |
| `origin` | Yes | Who created it, where, when, and what made it spread? |
| `timeline` | Yes | Array of `{ date: string, event: string }`. 3–6 milestones. |
| `examples` | Yes | 3 real usage examples. See [style guide](#writing-usage-examples). |
| `relatedSlugs` | Yes | Related entry slugs. Can be `[]`. |
| `media` | Optional | See [Media Fields](#media-fields). Strongly encouraged for visual memes. |
| `historicalDate` | Optional | `"YYYY-MM-DD"` — real-world origin date for "On This Day." |
| `tags` | Optional | Keywords that help search. Use lowercase. |
| `affiliateProduct` | Optional | `{ name, description, priceLabel }` for relevant merchandise. |

### Slang Fields (`SlangEntry`)

| Field | Required? | Notes |
|---|---|---|
| `definition` | Yes | Full definition including nuance and irony layer. |
| `origin` | Yes | Where did this word come from? Which community, platform, or person? |
| `usageExamples` | Yes | 3 examples showing real internet usage. See [style guide](#writing-usage-examples). |
| `relatedSlugs` | Yes | Can be `[]`. |
| `historicalDate` | Optional | `"YYYY-MM-DD"` — when the term first appeared. |
| `tags` | Optional | Keywords. |

### Creator Fields (`CreatorEntry`)

| Field | Required? | Notes |
|---|---|---|
| `careerStart` | Yes | Year they became publicly active (e.g. `"2019"`). |
| `platforms` | Yes | Array of `{ platform, handle, url? }`. At least one required. |
| `notableMoments` | Yes | 3–5 specific milestones. Be precise — include dates and records. |
| `followers` | Optional | `{ platform: "~XM+" }`. Use approximate strings, never exact integers. |
| `relatedSlugs` | Optional | Other creators or entries they're connected to. |

### Event Fields (`EventEntry`)

| Field | Required? | Notes |
|---|---|---|
| `platform` | Yes | Where it happened: `"TikTok, YouTube"`, `"Theaters, TikTok"`, etc. |
| `impact` | Yes | What did this event change? What did it prove? |
| `highlights` | Yes | 3–5 specific facts about what happened. Use exact numbers when known. |
| `relatedSlugs` | Yes | Can be `[]`. |
| `historicalDate` | Optional | When it actually happened. |
| `participants` | Optional | Key people, brands, or organizations. |

---

## Media Fields

Every article can include a `media` array with curated `MediaItem` objects. These render in the `ArticleMediaSection` component below the article body.

### MediaItem Structure

```typescript
{
  type: "image" | "video" | "gif" | "embed";
  url: string;          // Direct URL, YouTube watch link, or reference page URL
  title: string;        // Descriptive title
  source: string;       // Human-readable source name
  sourceUrl: string;    // URL of the source page
  platform: "youtube" | "tiktok" | "twitter" | "instagram" | "reddit"
           | "twitch" | "wikimedia" | "knowyourmeme" | "original" | "other";
  attribution?: string; // Who created or owns this
  license?: string;     // License or usage basis
  description?: string; // Why this media matters to the article
  date?: string;        // When it was created/uploaded
  tags?: string[];      // "original", "viral", "remix", "reaction", etc.
  verified?: boolean;   // true when a human editor has confirmed this is correct
}
```

### Media Type Guide

| Type | When to Use | Renders as |
|---|---|---|
| `"video"` | YouTube videos — the creator's own channel, or official uploads | Embedded YouTube player |
| `"image"` | Properly licensed images (CC0, CC BY, Wikimedia Commons free-use) | `<img>` tag |
| `"embed"` | Reference pages: Know Your Meme, Wikipedia, platform posts | Link card |
| `"gif"` | Animated GIFs with clear licensing | `<img>` tag |

### Media Priority Rules

**Rule 1 — Embed over host.** Link to the original platform. Never re-host or re-publish copyrighted images or videos.

**Rule 2 — Original source first.** Always link to the creator's own YouTube channel, not a mirror or compilation.

**Rule 3 — Verify licensing before using images.** YouTube embeds are always acceptable. Images need:
- CC0 or CC BY license (free to embed)
- Wikimedia Commons free-use designation
- Or a documented fair-use justification

**Rule 4 — When in doubt, use a link card.** Use `type: "embed"` with a Know Your Meme or Wikipedia URL rather than embedding a copyrighted image.

**Rule 5 — Every MediaItem needs source information.** `title`, `source`, `sourceUrl`, and `url` are all required. The build script will error if they are missing.

**Rule 6 — Mark unverified media.** Set `verified: false` if the source hasn't been fully checked. Validated items must have `verified: true`.

### Minimum Media Recommendation

- **Classic memes** (pre-2015): 1 Know Your Meme embed card + 1 YouTube video if one exists
- **Video memes**: 1 YouTube embed
- **Visual memes**: 1 link card (Know Your Meme) — do not hotlink the original image unless it's openly licensed
- **Slang / trends**: Media is optional — not every entry needs it

---

## Source Rules

Every factual claim must be traceable to a source.

### What Counts as a Good Source

| Source | Best for |
|---|---|
| Know Your Meme | Meme documentation, spread history, media galleries |
| Wikipedia | Historical background, mainstream coverage, biographical facts |
| Official platform links | Creator channels, official accounts, product sites |
| Mainstream press | Events with news coverage (Variety, The Verge, NYT, BBC) |
| Merriam-Webster / Oxford | Slang that has been officially recognized |

### Source Object Format

```typescript
sources: [
  {
    title: "Rizz — Know Your Meme",
    url: "https://knowyourmeme.com/memes/rizz",
    domain: "knowyourmeme.com",
  },
  {
    title: "Kai Cenat — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Kai_Cenat",
    domain: "en.wikipedia.org",
  },
]
```

All three fields (`title`, `url`, `domain`) are required for every source.

### Minimum Source Count

| Category | Minimum |
|---|---|
| Meme | 1 (Know Your Meme preferred) |
| Slang | 1 |
| Creator | 1 official platform + 1 Wikipedia or press |
| Event | 1 (Wikipedia or press preferred) |
| Trend | 1 preferred (may launch without if all facts are self-evident) |

---

## Attribution Rules

Attribution identifies who created the content being referenced or displayed.

### When to Attribute

- **Meme origins**: Credit the person who created the original format
  - `"Carlos Ramirez (Whynne) — original Trollface, 2008"`
- **Photos / images**: Credit the photographer and publication
  - `"Atsuko Sato (original photo of Kabosu, 2010)"`
- **Videos**: Credit the uploader AND the original creator separately if different
  - `"Animation: Chris Torres (prguitarman) · Music: daniwell"`
- **Music in videos**: Note the composer, artist, and rights holder
  - `"Rick Astley / BMG"`

### Where Attribution Goes

1. `MediaItem.attribution` — for individual media items
2. `sources[].title` — for the source document itself

Always include attribution even when it seems obvious. This protects the site legally and respects the creators who built internet culture.

---

## Editorial Style Guide

Full guide: [`EDITORIAL_STYLE_GUIDE.md`](./EDITORIAL_STYLE_GUIDE.md) (tone, intros, headings, citations, humor vs neutrality).

### Field-level reminders

**Descriptions (card hooks)** — under ~15–20 words; cultural recognition, not dictionary paraphrase.

> Bad: "A slang term meaning charismatic, derived from the word charisma."  
> Good: "Charisma, especially in flirting — the gold standard of social game."

**Meaning / definitions** — explain internet meaning and signal, not just a glossary line.

**Usage examples** — real contexts (chat, comments, posts). Prefer three situations: sincere, ironic, situational.

**Origins** — short narrative with platform, moment, and why it spread — not “Originated on 4chan.”

**Avoid:** identical template openings, passive padding, vague “recent years,” interchangeable intros.

---

## Content Language Policy

Full policy: [`CONTENT_LANGUAGE_POLICY.md`](./CONTENT_LANGUAGE_POLICY.md).

Document slang and edgy terms accurately when they are culturally important. Do not build a banned-word filter. Ordinary prose should still avoid unnecessary profanity, insults, harassment, slurs, hate speech, and gratuitous sexual detail. When an offensive term *is* the topic, describe it neutrally with context.

---

## Examples of Good Entries

### Meme Entry — Rickroll

```typescript
// lib/content/memes/rickroll.ts
import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m9",
  slug: "rickroll",
  title: "Rickroll",
  category: "meme",
  description:
    "The internet's most legendary bait-and-switch — Rick Astley's 'Never Gonna Give You Up' disguised as something else.",
  imageGradient: "from-blue-600 via-indigo-500 to-violet-600",
  scores: { relevance: 85, influence: 80, brainrot: 50, cringe: 30 },
  addedAt: "2026-07-16",
  historicalDate: "2007-05-01",
  views: 4200000,
  trendDirection: "stable",
  tags: ["classic", "youtube", "music", "4chan", "rick astley"],
  meaning:
    "Tricking someone into clicking a disguised link that plays Rick Astley's 1987 hit 'Never Gonna Give You Up.' The joke is the surprise of the redirect — not the song itself, which is genuinely good.",
  origin:
    "Evolved from '4chan duckrolling,' where misleading links led to a duck-on-wheels image. In May 2007, users on 4chan's /v/ board replaced the duck with Rick Astley's music video, creating the first rickroll.",
  timeline: [
    { date: "Jul 1987", event: "'Never Gonna Give You Up' released — reaches #1 in the UK" },
    { date: "May 2007", event: "First documented rickroll appears on 4chan's /v/ board" },
    { date: "Nov 2008", event: "Rick Astley performs at the Macy's Thanksgiving Day Parade, rickrolling millions on live TV" },
    { date: "2012+", event: "Rickrolling becomes a permanent fixture — never truly dies" },
  ],
  examples: [
    "Click here for the patch notes [rickroll link]",        // direct use
    "Important project update attached [rickroll]",           // workplace irony
    "You've been rickrolled — you knew it was coming",       // self-aware meta version
  ],
  relatedSlugs: ["doge", "nyan-cat"],
  media: [
    {
      type: "video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Rick Astley — Never Gonna Give You Up (Official Music Video)",
      source: "YouTube / Rick Astley",
      sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      platform: "youtube",
      attribution: "Rick Astley / BMG",
      license: "YouTube Standard License",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Rickrolling — Know Your Meme",
      url: "https://knowyourmeme.com/memes/rickrolling",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
```

**Why this works:** The description is a hook, not a definition. The meaning explains the joke without being clinical. The examples show three different deployment contexts. The media item is correctly sourced with attribution.

---

### Slang Entry — Aura

```typescript
// lib/content/slang/aura.ts
import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s16",
  slug: "aura",
  title: "Aura",
  category: "slang",
  description:
    "Someone's mysterious, effortless cool — the 2024 update to 'rizz' but for overall presence rather than just charm.",
  imageGradient: "from-violet-400 via-purple-400 to-indigo-500",
  scores: { relevance: 87, influence: 75, brainrot: 32, cringe: 18 },
  addedAt: "2026-07-16",
  views: 980000,
  trendDirection: "rising",
  definition:
    "Refers to someone's natural, hard-to-define cool energy or presence. Unlike 'rizz' (charisma in flirting), 'aura' is broader — it's the vibe, mystery, and gravitas someone naturally projects without actively trying. 'He has aura' means he's effortlessly compelling.",
  origin:
    "Emerged from Gen Z internet culture in 2024 as a successor concept to 'rizz' and 'sigma' discourse. The term borrowed from spiritual vocabulary to describe a secular, measurable (in meme terms) coolness metric.",
  usageExamples: [
    "Silent guys with aura > loud guys with rizz",              // cultural debate context
    "I lost all my aura when I tripped in front of the class",  // loss/embarrassment context
    "He walked into the room and the aura was immaculate",      // sincere admiration
  ],
  relatedSlugs: ["rizz", "sigma", "aura-farming"],
  sources: [
    {
      title: "Aura — Know Your Meme",
      url: "https://knowyourmeme.com/memes/aura",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
```

**Why this works:** The definition explains the distinction between 'aura' and 'rizz' — critical cultural context that a dictionary definition would miss. Each usage example shows a different situation and emotional register.

---

### Creator Entry — Kai Cenat

Note: Creator entries don't have usage examples. Instead, `notableMoments` carries the cultural weight. Be specific — use dates, records, and real event names.

**Bad notableMoment:** "Very popular on Twitch."

**Good notableMoment:** "Set the all-time Twitch subscriber record (2023)"

---

## Scores Reference

Exactly four scores (0–100). Do not add others.

| Score | What It Measures |
|---|---|
| `relevance` | How culturally current / actively discussed **right now** |
| `influence` | How much this shaped internet culture (lasting footprint) |
| `cringe` | How the topic is generally framed online (perception, not editor taste) |
| `brainrot` | How absurdist / chaotic the associated content feels |

**Common combinations:**

| Entry type | Typical scores |
|---|---|
| New viral meme | high relevance, rising influence, high brainrot |
| Classic internet meme | moderate relevance, high influence |
| Flash trend | high relevance, lower influence |
| Mainstream slang | high relevance, moderate influence, low–mid brainrot |

Higher `brainrot` or `cringe` is a measurement, not a judgment. See `docs/CULTURAL_SCORES.md`.

---

## Pre-Publish Checklist

Before adding an entry to the index file, confirm:

- [ ] File is in the correct `lib/content/[category]/` directory
- [ ] Filename exactly matches the `slug` field (e.g. `my-slug.ts` for `slug: "my-slug"`)
- [ ] All required fields are filled in — no `undefined` required fields
- [ ] `sources` has at least one entry (for any factual claims)
- [ ] Usage examples / highlights / notableMoments show real internet context, not dictionary sentences
- [ ] If adding `media`: every `MediaItem` has `title`, `source`, `sourceUrl`, `url`
- [ ] If using unverified media: `verified: false` is set explicitly
- [ ] Entry is imported and added to the array in `lib/content/[category]/index.ts`
- [ ] `npm run build` passes without TypeScript errors
- [ ] No duplicate slugs across any category

---

*Last updated: 2026-07-16*

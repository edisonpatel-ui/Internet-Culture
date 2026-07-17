# Internet Culture Hub — Content Guide

This is the editorial guide for adding and editing entries.
All entries live in `lib/data/` and are statically typed in `types/index.ts`.

---

## Entry Types

| Type | File | Route |
|---|---|---|
| Trend / Brainrot | `lib/data/trends.ts` | `/trending/[slug]` |
| Meme | `lib/data/memes.ts` | `/memes/[slug]` |
| Slang | `lib/data/slang.ts` | `/slang/[slug]` |
| Event | `lib/data/events.ts` | `/events/[slug]` |
| Creator | `lib/data/creators.ts` | `/creators/[slug]` |

---

## Shared Fields (BaseEntry)

All entry types share these fields.

### Required

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique. Use prefix: `t1`, `m1`, `s1`, `e1`, `cr1` |
| `slug` | `string` | URL-safe, lowercase, hyphenated. Must be unique across all collections. |
| `title` | `string` | Display name shown on cards and pages. |
| `category` | `ContentCategory` | One of: `trend`, `meme`, `slang`, `event`, `brainrot`, `creator` |
| `description` | `string` | One or two sentences. Shown on cards and in metadata. |
| `imageGradient` | `string` | Tailwind gradient classes, e.g. `"from-violet-500 via-purple-500 to-pink-500"` |
| `scores` | `Scores` | Must include `relevance`, `brainrot`, `cringe` (0–100). |
| `addedAt` | `string` | ISO date: `"2026-07-15"` |
| `views` | `number` | Estimated views on this encyclopedia entry, not external platform views. |
| `trendDirection` | `TrendDirection` | `"rising"` \| `"declining"` \| `"stable"` \| `"new"` |

### Optional

| Field | Type | Notes |
|---|---|---|
| `status` | `EntryStatus` | `"rising"` \| `"trending"` \| `"peak"` \| `"declining"` \| `"archived"` |
| `origin` | `string` | Short origin description. |
| `creator` | `string` | Attribution (person or platform). |
| `dateStarted` | `string` | ISO date when the trend/event began. |
| `dateEnded` | `string` | ISO date when it ended (leave blank if ongoing). |
| `imageUrl` | `string` | URL to a real cover image. Use `next/image` via MediaGallery. |
| `thumbnailUrl` | `string` | Smaller image for list views. |
| `mediaEmbeds` | `MediaEmbed[]` | YouTube, TikTok, X, Instagram, Reddit embeds. |
| `tags` | `string[]` | Lowercase, no spaces. Used in search and filtering. |
| `relatedSlugs` | `string[]` | Slugs of related entries (any category). |
| `sources` | `EntrySource[]` | Citations shown in the Sources section. |
| `aiSummary` | `string` | Reserved for future AI-generated content. Leave blank. |
| `aiStatus` | `AiInsightStatus` | Reserved. Leave blank. |
| `aiGeneratedAt` | `string` | Reserved. Leave blank. |

---

## Scoring Guide

Scores are 0–100 integers. They represent cultural metrics, not objective measurements.

| Score | What it measures |
|---|---|
| `relevance` | How culturally significant this entry is right now. |
| `brainrot` | How chaotic, absurd, or Gen Alpha the content is. |
| `cringe` | Cringe factor — does it make you uncomfortable to admit you know this? |
| `popularity` | (optional) Broad mainstream awareness. |
| `virality` | (optional) Speed of spread. |
| `influence` | (optional) Impact on other content/culture. |
| `longevity` | (optional) Expected shelf life. |
| `discussion` | (optional) Amount of active discourse. |

**Guidelines:**
- `relevance` 90+ = universally known
- `relevance` 70–89 = well-known in relevant communities
- `brainrot` 80+ = peak Gen Alpha / terminally online
- `cringe` 80+ = embarrassing to reference unironically

---

## Adding a Trend Entry

Trends live in `lib/data/trends.ts` as `BaseEntry[]`.
Use this for content that doesn't fit meme, slang, event, or creator.

```ts
{
  id: "t10",
  slug: "example-trend",
  title: "Example Trend",
  category: "trend",           // or "brainrot"
  description: "One-sentence description.",
  imageGradient: "from-violet-500 via-purple-500 to-pink-500",
  scores: { relevance: 75, brainrot: 60, cringe: 40 },
  addedAt: "2026-07-15",
  views: 120000,
  trendDirection: "rising",
  tags: ["gaming", "tiktok"],
}
```

---

## Adding a Meme Entry

Memes live in `lib/data/memes.ts` as `MemeEntry[]`.

```ts
{
  id: "m10",
  slug: "example-meme",
  title: "Example Meme",
  category: "meme",
  description: "What this meme is in one or two sentences.",
  imageGradient: "from-pink-500 via-rose-500 to-red-500",
  scores: { relevance: 80, brainrot: 70, cringe: 50 },
  addedAt: "2026-07-15",
  views: 200000,
  trendDirection: "rising",
  tags: ["reaction", "twitter"],

  // Meme-specific required fields:
  meaning: "Full explanation of what the meme means and why it's funny.",
  origin: "Where and how it started. Be specific if known.",
  timeline: [
    { date: "Jan 2026", event: "First appearances on Reddit" },
    { date: "Feb 2026", event: "Goes viral on TikTok" },
  ],
  examples: [
    "Example usage sentence 1",
    "Example usage sentence 2",
  ],
  relatedSlugs: ["other-meme-slug"],

  // Optional:
  affiliateProduct: {
    name: "Related Product Name",
    description: "Brief description",
    priceLabel: "$19.99",
  },
  sources: [
    {
      title: "Example Meme — Know Your Meme",
      url: "https://knowyourmeme.com/memes/example",
      domain: "knowyourmeme.com",
    },
  ],
}
```

---

## Adding a Slang Entry

Slang lives in `lib/data/slang.ts` as `SlangEntry[]`.

```ts
{
  id: "s10",
  slug: "example-word",
  title: "Example Word",
  category: "slang",
  description: "Short description for cards.",
  imageGradient: "from-cyan-500 via-blue-500 to-indigo-500",
  scores: { relevance: 82, brainrot: 35, cringe: 20 },
  addedAt: "2026-07-15",
  views: 150000,
  trendDirection: "stable",
  tags: ["gen-z", "twitter"],

  // Slang-specific required fields:
  definition: "Clear, full definition of what this word means.",
  origin: "Where the word came from. Platform, community, or person.",
  usageExamples: [
    "Example sentence using the slang.",
    "Another example, ideally ironic or funny.",
  ],
  relatedSlugs: ["other-slang-slug"],

  // Optional:
  sources: [
    {
      title: "Example Word — Know Your Meme",
      url: "https://knowyourmeme.com/memes/example-word",
      domain: "knowyourmeme.com",
    },
  ],
}
```

---

## Adding a Creator Entry

Creators live in `lib/data/creators.ts` as `CreatorEntry[]`.

Only document real public figures with documented internet culture impact.
Do not invent statistics. Use approximate strings like `"~10M"` for follower counts.

```ts
{
  id: "cr10",
  slug: "creator-name",
  title: "Creator Name",
  category: "creator",
  description: "One sentence describing their internet culture impact.",
  imageGradient: "from-sky-500 via-cyan-500 to-teal-500",
  scores: { relevance: 85, brainrot: 40, cringe: 20 },
  addedAt: "2026-07-15",
  views: 100000,
  trendDirection: "rising",
  tags: ["youtube", "gaming"],

  // Creator-specific optional fields:
  careerStart: "2020",
  platforms: [
    { platform: "youtube", handle: "CreatorName", url: "https://youtube.com/@CreatorName" },
    { platform: "tiktok", handle: "@creatorname", url: "https://tiktok.com/@creatorname" },
  ],
  followers: {
    youtube: "~5M",
    tiktok: "~3M",
  },
  notableMoments: [
    "Known for X viral moment in 2024",
    "Coined the phrase Y",
  ],
  relatedSlugs: ["related-trend-slug", "related-meme-slug"],
  sources: [
    { title: "Creator Name Wikipedia", domain: "en.wikipedia.org" },
  ],
}
```

**Platform values:** `"youtube"` | `"tiktok"` | `"twitch"` | `"instagram"` | `"x"`

---

## Adding an Event Entry

Events live in `lib/data/events.ts` as `EventEntry[]`.
Events are cultural moments with a timeline — they began and sometimes ended.

```ts
{
  id: "e10",
  slug: "example-event",
  title: "Example Event",
  category: "event",
  description: "What this event was in one or two sentences.",
  imageGradient: "from-emerald-500 via-teal-500 to-cyan-500",
  scores: { relevance: 88, brainrot: 55, cringe: 30 },
  addedAt: "2026-07-15",
  views: 400000,
  trendDirection: "declining",
  tags: ["twitter", "2024", "drama"],

  // Event-specific fields:
  platform: "TikTok, X",          // optional: main platform(s)
  startDate: "2024-06-01",        // optional
  endDate: "2024-09-01",          // optional
  impact: "One-sentence cultural impact statement.",
  highlights: [
    "Key moment 1",
    "Key moment 2",
    "Key moment 3",
  ],
  relatedSlugs: ["related-event-slug"],

  // Optional:
  sources: [
    { title: "Source name", url: "https://example.com", domain: "example.com" },
  ],
}
```

---

## Images

### Using gradient placeholders (current default)

Set `imageGradient` to a Tailwind gradient. This is shown automatically until a real image is added.

```ts
imageGradient: "from-violet-500 via-purple-500 to-pink-500",
```

Pick colors that match the tone of the entry. Examples:
- Memes: bright, warm colors (pink, red, orange)
- Slang: cool blues/cyans
- Events: emerald/teal
- Creators: sky/cyan

### Adding a real image

When a real image is available, add `imageUrl`:

```ts
imageUrl: "https://cdn.example.com/images/entry-cover.jpg",
```

The `MediaGallery` component will automatically use `next/image` instead of the gradient placeholder.
For images to work with `next/image`, the domain must be in `next.config.ts` `remotePatterns`.

---

## Media Embeds

Add embeds to the `mediaEmbeds` array. They appear automatically in the Media section of the detail page.

```ts
mediaEmbeds: [
  {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    caption: "Optional caption text",
  },
  {
    type: "tiktok",
    url: "https://www.tiktok.com/@user/video/VIDEO_ID",
    caption: "Optional caption",
  },
],
```

**Supported types:** `"youtube"` | `"tiktok"` | `"twitter"` | `"instagram"` | `"reddit"`

YouTube embeds render as native iframes. All other types render as styled external link cards.

---

## Sources

Add `sources` to any entry to populate the Sources section.

```ts
sources: [
  {
    title: "Page title or article name",
    url: "https://knowyourmeme.com/...",   // optional but preferred
    domain: "knowyourmeme.com",            // shown as a label
  },
],
```

**Good source types:**
- Know Your Meme pages (for memes/slang)
- Wikipedia articles
- Original news coverage
- Creator's official channels
- Academic or journalism references

**Avoid:**
- Made-up sources
- Clickbait articles
- Sources that don't directly document the entry

---

## Related Entries

`relatedSlugs` on any entry type accepts slugs from **any category** — meme slugs, slang slugs, trend slugs, event slugs, and creator slugs all work. The service layer resolves them cross-collection.

```ts
relatedSlugs: ["rizz", "kai-cenat", "brat-summer"],
```

---

## Slugs

- Lowercase, hyphenated: `very-demure-very-mindful`
- No special characters except hyphens
- Must be **globally unique** across all data files
- Once published, do not change a slug (it would break URLs and related links)

---

## Quality Standards

Before adding an entry:

1. **Is it real?** Only document things that actually happened or exist.
2. **Is it documented?** At least one source you can cite.
3. **Is the description clear?** Someone unfamiliar with the meme/slang should understand from the description alone.
4. **Are scores reasonable?** A niche meme should not have `relevance: 99`.
5. **Are examples accurate?** Usage examples should reflect how the term is actually used.
6. **No spam or hate.** Do not document harassment campaigns, slurs, or content designed to harm individuals.

---

## Research Workflow

Follow this workflow when creating or updating any article.

```
Research
↓
Exact entity identification
↓
Source verification
↓
Fact extraction
↓
Article writing
↓
Human review
```

### Step 1 — Research

Gather all available information about the topic from multiple sources before writing anything.

Do not rely on a single source as the complete truth.

| Category | Preferred sources |
|---|---|
| Memes | Know Your Meme, original viral posts/videos, reputable coverage |
| Slang | Know Your Meme, original usage examples, reputable explanations |
| Creators | Official channels (YouTube/Twitch), platform profiles, reputable reporting |
| Events | Official announcements, primary sources, reputable news coverage |

### Step 2 — Exact entity identification

Before writing, confirm exactly what you are documenting.

- What is the precise title commonly used?
- Is this the same entity as a similarly-named topic?
- Are there alternate spellings or names? Which is most widely accepted?

**Before attaching any source to an article, verify that the source matches the exact entity being documented — not just a similar name.**

Example: "Say Wallahi Bro" requires a source specifically about "Say Wallahi Bro," not a generic page about the phrase "say wallahi."

Never assume two similarly named topics are the same topic.

**Topic context vs word origin:** Distinguish the origin of a word/phrase from the origin of the internet meme or trend. Brief linguistic context is fine; the article must primarily document the meme format, creators, platforms, and spread.

### Step 3 — Source verification

Every source URL must be verified before being included.

Never:
- Invent URLs from memory
- Assume a KYM or Wikipedia page exists based on the topic name
- Use a source that refers to a different but similarly named topic
- Keep a source if the URL cannot be confirmed

If a source cannot be verified, leave the sources array empty rather than fabricating a citation.

### Step 4 — Fact extraction

Compare what different sources say. Keep only verified, consistent information.

If sources disagree: do not present uncertain claims as fact. Omit the claim or note the uncertainty.

Combine verified facts from multiple sources into the article — do not copy a single source.

### Step 5 — Article writing

Write the summary, origin, and explanation using only confirmed information.

If a field cannot be populated with verified information:
- Leave it blank
- Use a placeholder (e.g. `"Information unavailable"`)
- Never guess

A shorter accurate article is always better than a longer inaccurate one.

### Step 6 — Human review

Creator entries require additional care because:
- Multiple people may share similar names or handles
- Follower counts change rapidly — always use approximate strings like `"~10M"`
- Biographical claims must be supported by a source
- Do not fabricate career histories, notable moments, or relationships

If limited reliable information exists: create a short entry with confirmed facts only (name, platform, brief description, official channel). Do not invent a biography.

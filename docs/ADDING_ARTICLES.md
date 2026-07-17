# Adding Articles to Internet Culture Hub

A step-by-step guide for contributors and AI-assisted workflows.

---

## Quick start

1. Create `lib/content/[category]/[slug].ts`
2. Export a typed entry object (see required fields below)
3. Import and add it to `lib/content/[category]/index.ts`
4. Run `npm run build` to confirm no TypeScript errors
5. Run `npm run audit:media` to check media quality

---

## Categories

| Category  | Type          | Index file                        |
|-----------|---------------|-----------------------------------|
| `meme`    | `MemeEntry`   | `lib/content/memes/index.ts`      |
| `slang`   | `SlangEntry`  | `lib/content/slang/index.ts`      |
| `creator` | `CreatorEntry`| `lib/content/creators/index.ts`   |
| `event`   | `EventEntry`  | `lib/content/events/index.ts`     |
| `trend`   | `BaseEntry`   | `lib/content/trends/index.ts`     |

---

## Required fields (all categories)

Every entry must include:

```ts
{
  id: "unique-id",              // Unique across all entries. Use slug-based ID.
  slug: "entry-slug",           // URL slug. Matches the filename without .ts
  title: "Entry Title",
  category: "meme",             // One of: meme slang creator event trend brainrot
  description: "...",           // 1–3 sentences summarising the topic.
  trendDirection: "stable",     // rising | declining | stable | new
  addedAt: "2024-01-01",
  imageGradient: "from-violet-500 to-indigo-500",  // Tailwind gradient — always required as fallback
  scores: {
    relevance: 75,              // 0–100
    brainrot: 60,               // 0–100
    cringe: 45,                 // 0–100
  },
  views: 0,
}
```

---

## Category-specific required fields

### MemeEntry
```ts
origin: "Reddit, 2013",
meaning: "...",
timeline: [{ date: "2013", event: "First appeared on Reddit" }],
examples: ["Example usage 1", "Example usage 2"],
relatedSlugs: ["doge", "pepe"],
```

### SlangEntry
```ts
definition: "...",
origin: "...",
usageExamples: ["Example of real internet usage"],
relatedSlugs: [],
```

### CreatorEntry
```ts
// All fields optional except those inherited from BaseEntry
platforms: [{ platform: "youtube", handle: "ChannelName", url: "https://..." }],
followers: { youtube: "~15M" },
careerStart: "2016",
notableMoments: ["Won Streamy Award 2022", "..."],
```

### EventEntry
```ts
impact: "...",
highlights: ["Key moment 1", "Key moment 2"],
relatedSlugs: [],
startDate: "2024-01-01",
```

---

## Adding media

Media is optional. Articles without media use the `imageGradient` as a placeholder.
When media exists, it drives the article card thumbnail, the hero image, and the gallery.

### Media architecture

```
entry.media?: MediaItem[]
  │
  ├── role: "featured" + type: "image" | "gif"
  │   → Article card thumbnail + hero image
  │
  ├── role: "featured" + type: "video" | "embed"
  │   → Shown directly below the hero (when no featured image exists)
  │
  ├── role: "supporting" + type: "image" | "gif"
  │   → Gallery section — supporting images
  │
  ├── role: "video" + type: "video" | "embed"
  │   → Gallery section — embedded video player
  │
  └── role: "reference" + type: "embed"
      → Gallery section — link cards (Know Your Meme, Wikipedia, etc.)
```

### MediaItem fields

| Field         | Required | Description                                                    |
|---------------|----------|----------------------------------------------------------------|
| `role`        | Yes      | `featured` \| `supporting` \| `video` \| `reference`          |
| `type`        | Yes      | `image` \| `video` \| `gif` \| `embed`                        |
| `url`         | Yes      | Full URL. Images must point directly to the image file.        |
| `title`       | Yes      | Short descriptive title                                        |
| `source`      | Yes      | Source name (e.g. `"Wikimedia Commons"`)                       |
| `sourceUrl`   | Yes      | Link to the source page (not the image URL itself)             |
| `platform`    | Yes      | `youtube` \| `wikimedia` \| `knowyourmeme` \| `original` \| `other` \| ... |
| `attribution` | No       | Who to credit (e.g. `"Photo by Atsuko Sato"`)                 |
| `license`     | No       | `"CC BY-SA 4.0"` \| `"Fair use"` \| `"Public domain"` \| ... |
| `description` | No       | One sentence explaining why this media was chosen              |
| `date`        | No       | Original date (`"2010"` or `"2010-02-04"`)                     |
| `verified`    | No       | Set `true` only after manually confirming the URL works        |

### Media priority rules

**Memes**
- Featured: Original or most iconic version of the meme image
- Supporting: Important variations, remixes, cultural spin-offs
- Video: Only when it genuinely helps explain the meme's history

**Creators**
- Featured: Official press image, Wikimedia Commons photo, or recognisable profile image
- Never use a YouTube thumbnail as featured if a better image exists
- Video: One defining introductory clip

**Events**
- Featured: The defining image most associated with the event
- Video: Official footage or culturally significant coverage

**Slang**
- Only add media when it genuinely helps explain the term
- Do not force an image onto every slang article

### Image URL requirements

Images must be **direct image file URLs** — the URL must serve the raw image, not an HTML page.

Good:
```
https://upload.wikimedia.org/wikipedia/commons/a/ab/image.jpg   ✓ (direct Wikimedia file)
https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg               ✓ (YouTube thumbnail CDN)
https://raw.githubusercontent.com/org/repo/main/image.png       ✓ (GitHub raw)
```

Bad:
```
https://commons.wikimedia.org/wiki/File:image.jpg               ✗ (HTML page)
https://www.google.com/images/...                               ✗ (search result)
https://upload.wikimedia.org/...thumb/.../400px-image.jpg       ✗ (thumbnail CDN blocks hotlinks)
```

### Video URL requirements

YouTube embeds use the full watch URL — the renderer extracts the video ID:
```
https://www.youtube.com/watch?v=VIDEO_ID   ✓
https://youtu.be/VIDEO_ID                  ✓
https://www.youtube.com/embed/VIDEO_ID     ✓
```

Always verify the video is public and not age-restricted before setting `verified: true`.

---

## Templates

Ready-to-copy templates are in `lib/content/templates/mediaTemplate.ts`:

- `IMAGE_ARTICLE_MEDIA` — article with a strong representative image
- `VIDEO_ARTICLE_MEDIA` — article defined by a key video
- `MIXED_ARTICLE_MEDIA` — full example: image + supporting + video + reference

---

## Validation

Run the content validator:
```bash
npm run validate
```

Run the media-specific audit:
```bash
npm run audit:media
```

The audit groups articles into:
- **No media** — only gradient fallback
- **Missing featured** — has media but no featured image/gif
- **Has warnings** — featured media exists but metadata is incomplete
- **Production-ready** — all checks pass

---

## Example: minimal meme entry (no media)

```ts
import type { MemeEntry } from "@/types";

const chickenJockey: MemeEntry = {
  id: "chicken-jockey",
  slug: "chicken-jockey",
  title: "Chicken Jockey",
  category: "meme",
  description: "A rare Minecraft mob that became a widespread internet joke about unexpected chaos.",
  trendDirection: "stable",
  addedAt: "2024-01-01",
  imageGradient: "from-yellow-500 to-orange-500",
  scores: { relevance: 70, brainrot: 85, cringe: 30 },
  views: 0,
  origin: "Minecraft / Reddit",
  meaning: "...",
  timeline: [],
  examples: [],
  relatedSlugs: [],
};

export default chickenJockey;
```

## Example: meme entry with media

```ts
const doge: MemeEntry = {
  // ... required fields ...
  imageGradient: "from-yellow-500 to-amber-500",  // always keep as fallback
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
      title: "Original Doge meme — Kabosu (2010)",
      source: "Wikimedia / Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Original_Doge_meme.jpg",
      platform: "wikimedia",
      attribution: "Photo by Atsuko Sato (2010)",
      license: "Fair use",
      description: "The original Kabosu photo that became one of the most replicated meme formats in internet history.",
      date: "2010",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=Yj7ja6BANLM",
      title: "What is Doge? — Behind The Meme",
      source: "YouTube / Behind The Meme",
      sourceUrl: "https://www.youtube.com/watch?v=Yj7ja6BANLM",
      platform: "youtube",
      attribution: "Behind The Meme",
      description: "4-minute explainer on the full history of the Doge meme.",
      date: "2016-08-28",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/doge",
      title: "Doge — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/doge",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Comprehensive Doge documentation including format history and cultural impact.",
      date: "2010",
      verified: true,
    },
  ],
};
```

---

## AI-assisted media workflow

When an AI suggests media items, the workflow is:

1. AI generates a `MediaItem[]` with `verified: false`
2. Human opens every URL and confirms it loads the correct content
3. Human changes `verified: true` on confirmed items
4. Run `npm run audit:media` — should show no warnings for verified items
5. Commit and push

AI-generated items that have not been human-verified **must remain** `verified: false`.
Do not bulk-set `verified: true` without manual confirmation.

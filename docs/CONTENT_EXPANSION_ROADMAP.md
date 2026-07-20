# Content Expansion Roadmap

Strategic planning list of **~100 missing encyclopedia entries** for Internet Culture Hub.

Planning data only — **no articles are created from this file**.  
No UI, database, or API.

---

## Source of truth

| Item | Location |
|------|----------|
| Roadmap seeds | `lib/intelligence/contentRoadmap.ts` → `CONTENT_EXPANSION_ROADMAP` |
| Gap registry (same rows) | `lib/intelligence/contentGap.ts` → `CONTENT_GAP_REGISTRY` |
| Types | `lib/intelligence/contentGapTypes.ts` |
| Coverage helpers | `findCoverageGaps`, `suggestNextArticles`, `prioritizeContentGaps` |
| Validation | `npm run validate` (`validateContentGapRegistry`) |

---

## How eras are organized

| Roadmap era | Years | Typical `culturalEra` values |
|-------------|-------|------------------------------|
| `early-internet` | 1990s–2005 | `pre-internet`, `early-web` |
| `web-2` | 2005–2015 | `web-2` |
| `social-media` | 2015–2020 | `social` |
| `tiktok-modern` | 2020–present | `short-form`, `gen-alpha` |

---

## Categories

| Roadmap category | Article folder when written |
|------------------|-----------------------------|
| `meme` | `lib/content/memes/` |
| `slang` | `lib/content/slang/` |
| `creator` | `lib/content/creators/` |
| `event` | `lib/content/events/` |
| `platform` | usually `trends/` (platform culture) |
| `community` | usually `trends/` (scene / community culture) |
| `trend` | `lib/content/trends/` (kept for compatibility) |

Use `gapCategoryToArticleCategory()` when bridging to article creation.

---

## Fields on each planned entry

- **name** — human title  
- **category** — meme / slang / platform / creator / event / community  
- **importance** — `high` | `medium` | `low` (cultural weight)  
- **why it matters** — `reason`  
- **related entries** — `relatedTopics` (existing slugs + planned labels)  
- **suggested priority** — `priority` `1` | `2` | `3` (build order)  
- **roadmapEra** — which internet era bucket  
- **status** — `missing` → `planned` → `drafted` → `published`

### Prioritization logic

Prefer rows that score well on:

1. Cultural importance (`importance: high`)
2. Search / recognition demand (reflected in priority 1 picks)
3. Historical significance (earlier foundational formats first when tied)
4. Relationship to existing entries (fills a hole next to published neighbors)

**Default writing order:** `priority: 1` → then high importance → then medium.

```ts
import {
  prioritizeContentGaps,
  listRoadmapByEra,
  summarizeContentRoadmap,
} from "@/lib/intelligence";

prioritizeContentGaps(); // ready-to-write order
listRoadmapByEra("early-internet");
summarizeContentRoadmap(); // counts by era / category / priority
```

---

## How to use this roadmap

1. Run `summarizeContentRoadmap()` or skim `CONTENT_EXPANSION_ROADMAP`.
2. Pick a **priority 1** gap that is still `missing` / `planned`.
3. Research + write a real article (article-creation rules).
4. In the same PR, set that row’s `status` to `published`.
5. Prefer linking new articles to `relatedTopics` neighbors.
6. Add new roadmap rows when you discover important gaps — don’t invent articles from thin air without a registry row for major topics.

---

## What not to do

- Do not auto-generate article files from the roadmap  
- Do not treat the roadmap as published encyclopedia content  
- Do not add UI, DB, or APIs for this list  
- Do not mark `published` until the canonical slug exists in the catalog  

---

## Related docs

- Gap system overview: `CONTENT_COVERAGE.md`
- Intelligence model: `INTELLIGENCE_DATA_MODEL.md`
- Article workflow: `.cursor/rules/article-creation.mdc`

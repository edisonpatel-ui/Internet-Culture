# Content Coverage Intelligence

Internal planning layer for **what Internet Culture Hub should cover next**.

No database, UI, API, or AI calls. Curators edit a TypeScript registry; validation keeps it consistent.

---

## Why this exists

Before adding a new article, check whether the topic is:

1. Already published
2. Already planned in the gap registry
3. A high-importance cultural gap worth prioritizing

This reduces duplicate work and helps the catalog grow toward culturally important coverage — not just whatever is convenient to write.

---

## Architecture

| Piece | Location |
|-------|----------|
| Gap model + registry | `lib/intelligence/contentGap.ts` |
| Expansion roadmap (~100) | `lib/intelligence/contentRoadmap.ts` |
| Roadmap guide | `docs/CONTENT_EXPANSION_ROADMAP.md` |
| Gap → coverage helpers | `lib/intelligence/coverage.ts` (`COVERAGE_TARGETS` derived) |
| Validation | `validateContentGapRegistry()` → `npm run validate` |
| Opportunity scoring | `scoreCoverageGapOpportunities()` in `opportunity.ts` |
| Public barrel | `@/lib/intelligence` |

**Do not** create article files from this registry automatically. Status moves by hand when you plan, draft, and publish.

```
CONTENT_GAP_REGISTRY  →  COVERAGE_TARGETS  →  findCoverageGaps / suggestNextArticles
                              ↓
                     scoreCoverageGapOpportunities
```

---

## Gap entry fields

```ts
{
  id: "gap-copypasta",              // unique stable id
  name: "Copypasta",                // human label
  suggestedSlug: "copypasta",       // future article slug
  category: "meme",                 // meme | slang | trend | creator | platform | event
  importance: "high",               // high | medium | low
  culturalEra: ["early-web", "web-2"],
  relatedTopics: ["4chan", "greentext"],
  clusters: ["classic-internet"],   // from lib/intelligence/clusters.ts
  status: "missing",                // missing | planned | drafted | published
  reason: "Foundational internet humor format…",
  satisfiedBy: [],                  // existing slugs that partially help
  matchHints: ["copypasta"],        // title/slug/tag phrases
  notes: "optional curator note",
}
```

### Category notes

| Gap category | When creating an article |
|--------------|--------------------------|
| `meme` / `slang` / `trend` / `creator` / `event` | Same folder / `ContentCategory` |
| `platform` | Usually a **`trend`** (or sometimes **`event`**) article — there is no `platform` content category |

Use `gapCategoryToArticleCategory()` when bridging to article creation.

### Status workflow

| Status | Meaning |
|--------|---------|
| `missing` | Important gap; not scheduled yet |
| `planned` | Accepted onto the roadmap |
| `drafted` | Article file in progress (local / PR) |
| `published` | Canonical slug exists in the catalog |

When you publish an article whose slug matches `suggestedSlug`, set `status: "published"`. Validation warns if the slug exists but status is still open.

---

## How to expand content (recommended process)

1. **Scan open gaps first**
   ```ts
   import { prioritizeContentGaps, findCoverageGaps } from "@/lib/intelligence";
   prioritizeContentGaps(); // high → medium → low
   ```
2. **Prefer `importance: "high"` + `status: "missing" | "planned"`** over inventing a new topic.
3. **Add a registry row before drafting** if the topic is new and culturally important.
4. **Research + write** following `.cursor/rules/article-creation.mdc` and `docs/EDITORIAL_STYLE_GUIDE.md`.
5. **On publish**, set the gap row to `status: "published"` (same PR when possible).
6. **Run** `npm run validate` — duplicate ids/slugs and invalid categories fail the build.

Do **not** invent importance. If you are unsure, use `medium` and leave a `notes` field.

---

## Validation rules

Wired into `npm run validate` (via `runContentValidation`):

| Code | Severity | Check |
|------|----------|--------|
| `CONTENT_GAP_DUPLICATE_ID` | error | Duplicate `id` |
| `CONTENT_GAP_DUPLICATE_SLUG` | error | Duplicate `suggestedSlug` |
| `CONTENT_GAP_INVALID_CATEGORY` | error | Category not in the allowed set |
| `CONTENT_GAP_INVALID_IMPORTANCE` | error | Importance not high/medium/low |
| `CONTENT_GAP_INVALID_STATUS` | error | Status not in the allowed set |
| `CONTENT_GAP_INVALID_ERA` | error | Era not in `CulturalEra` |
| `CONTENT_GAP_INVALID_CLUSTER` | error | Unknown cluster id |
| `CONTENT_GAP_INVALID_SLUG` | error | Slug not kebab-case |
| `CONTENT_GAP_MISSING_FIELD` | error | Required field empty |
| `CONTENT_GAP_STATUS_STALE` | warning | Catalog has slug but status ≠ published |
| `CONTENT_GAP_PUBLISHED_MISSING` | warning | Status published but slug absent |

---

## What this system does **not** do

- Create articles
- Change routing, UI, SEO, or search
- Call AI APIs
- Replace editorial judgment
- Auto-close gaps from fuzzy title matches alone (canonical `suggestedSlug` required)

Related tooling that *consumes* gaps:

- `findCoverageGaps(catalog)`
- `suggestNextArticles(catalog)`
- `scoreCoverageGapOpportunities(catalog)`
- AI assistance heuristics (`identifyWeakCoverage`) — still no public chatbot

---

## Related docs

- Cultural intelligence overview: `INTELLIGENCE_DATA_MODEL.md`
- Article workflow: `ADDING_ARTICLES.md` / `.cursor/rules/article-creation.mdc`
- Writing standards: `EDITORIAL_STYLE_GUIDE.md`

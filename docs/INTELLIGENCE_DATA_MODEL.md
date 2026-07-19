# Cultural Intelligence Data Model (Phase 7)

Internal foundation for future Internet Culture Hub intelligence features.

**Phase 7 does not add:** public AI chat, accounts, dashboards, or new UI sections.

---

## Goals

1. Structured cultural metadata (era, platform, audience, format, signals, lifecycle)
2. Cultural clusters that connect entries through meaningful neighborhoods
3. Recommendation logic that prefers multi-signal evidence over filler
4. Internal importance modeling (not public encyclopedia scores)
5. Trend movement / lifecycle intelligence (Phase 7C)
6. Trend signal framework + opportunity scoring (interfaces + internal utilities)
7. Backward-compatible optional fields (existing articles stay valid)

---

## Where metadata lives

| Layer | Location | Precedence |
|-------|----------|------------|
| Optional on entry | `entry.intelligence?: CulturalIntelligence` | Highest (cultural) |
| Optional on entry | `entry.trendIntelligence?: TrendIntelligence` | Highest (trend) |
| Internal registry | `lib/intelligence/registry.ts` | Middle (cultural) |
| Trend registry | `lib/intelligence/trendRegistry.ts` | Middle (trend) |
| Derived defaults | tags / category / description heuristics | Lowest |

Resolve with:

```ts
import {
  getCulturalIntelligence,
  getTrendIntelligence,
  getCulturalImportance,
} from "@/lib/intelligence";

const meta = getCulturalIntelligence(entry);
const trend = getTrendIntelligence(entry);
```

Do **not** bulk-edit every article. Prefer registries for seeds. Inference is always **read-only** — it must never overwrite `trendDirection`, encyclopedia `scores`, or article prose.

---

## `CulturalIntelligence` fields

Defined in `types/index.ts`:

| Field | Purpose | Example (Skibidi Toilet) |
|-------|---------|--------------------------|
| `era` | Historical bucket | `gen-alpha`, `short-form` |
| `originPlatform` | Home platform | `youtube-shorts` |
| `culturalCategory` | Freeform labels | `brainrot`, `serialized-web-series` |
| `audience` | Who it belongs to | `gen-alpha`, `gen-z` |
| `formatType` | Form of the object | `animated-meme` |
| `lifecycleStage` | Explicit arc stage | omit unless curated |
| `signals` | Short labels for AI/tools | `Brainrot`, `Gen Alpha`, `Short-form video` |
| `importance` | Internal 0–100 dimensions | see below |

All fields are optional.

### Cultural signals

Signals are short, reusable labels (not paragraphs). They power overlap scoring and future retrieval.

Good: `Brainrot`, `Creator economy`, `Imageboard`  
Avoid: long sentences, invented statistics, one-off trivia

---

## Trend intelligence (Phase 7C)

Optional `TrendIntelligence` on entries / `TREND_INTELLIGENCE_REGISTRY`:

| Field | Purpose |
|-------|---------|
| `lifecycleStage` | Explicit trend lifecycle override |
| `momentum` | `accelerating` \| `stable` \| `cooling` \| `unknown` |
| `confidence` | 0–100 confidence in the trend read |
| `observationNotes` | Short curator / AI notes |
| `detectedSignals` | Freeform labels observed so far |
| `signalIds` | IDs from the trend signal framework |

```ts
import { getTrendIntelligence } from "@/lib/intelligence";

const trend = getTrendIntelligence(entry);
// trend.lifecycleStage, trend.momentum, trend.confidence,
// trend.detectedSignals, trend.signalBundle
```

**Hard rules**

- Do not auto-write `trendDirection`
- Do not replace public `scores`
- Do not mutate article metadata from inference helpers

---

## Lifecycle stages

```
emerging → rising → peak → declining → legacy
```

| Stage | Meaning |
|-------|---------|
| Emerging | New / early traction |
| Rising | Actively climbing |
| Peak | Highly current / culturally hot |
| Declining | Cooling off |
| Legacy | Historically important, no longer peaking |

### Multi-signal inference (Phase 7C)

`inferLifecycleStage(entry, nowYear?, ctx?)` combines:

- public fields (`trendDirection`, optional `status`, age, relevance/influence)
- cultural importance (high + cool activity → **legacy**, not “irrelevant”)
- cluster membership (hot clusters can support rising)
- cultural signals / eras (classic internet bias toward legacy)
- optional trend momentum

Example: old meme + high importance + low current activity → **legacy**.

### Important rules

- Distinct from `trendDirection` (`rising` | `stable` | `declining` | `new`)
- Distinct from optional `status` (`EntryStatus`)
- Inference is **read-only** — never writes catalog files
- Do not auto-change existing statuses during Phase 7

```ts
import { inferLifecycleStage, getCulturalIntelligence } from "@/lib/intelligence";

inferLifecycleStage(entry);           // derived guess
getCulturalIntelligence(entry).lifecycleStage; // explicit if set, else inferred
getCulturalIntelligence(entry).lifecycleSource; // "explicit" | "inferred"
```

---

## Trend signal framework (Phase 7C)

Interfaces only — **no external APIs connected yet**.

| Category | Signal IDs |
|----------|------------|
| Search | `search-growth`, `internal-search-demand` |
| Platform | `tiktok-activity`, `youtube-activity`, `reddit-activity`, `creator-activity` |
| Cultural | `new-related-entries`, `cluster-growth`, `audience-expansion` |
| Content | `article-views`, `clicks`, `engagement` |

```ts
import {
  TREND_SIGNAL_DEFINITIONS,
  collectTrendSignalPlaceholders,
  mergeTrendSignalObservations,
} from "@/lib/intelligence";

// All values null until sources are wired
collectTrendSignalPlaceholders(entry.slug);
```

### Future data sources (prepared, not wired)

| Signal family | Likely future source |
|---------------|----------------------|
| Search growth | External search-interest APIs |
| Internal search demand | Hub search / analytics logs |
| TikTok / YouTube / Reddit / creator activity | Platform APIs or curated feeds |
| Cluster growth / new related entries | Catalog graph diffs (internal) |
| Views / clicks / engagement | Site analytics |

Until wired, collectors return placeholder observations with `value: null`. Do not invent metrics.

---

## Opportunity scoring (Phase 7C — internal)

Answers: **“What topics deserve attention?”**

Not a public score. Does not replace encyclopedia `Scores`.

```ts
import {
  scoreTrendOpportunity,
  rankTrendOpportunities,
  scoreCoverageGapOpportunities,
} from "@/lib/intelligence";

const assessment = scoreTrendOpportunity(entry, catalog);
// assessment.tier: high | medium | low | watch
// assessment.signals, assessment.reasons, assessment.recommendation
```

Considers:

- cultural importance
- lifecycle stage
- momentum signals (trend intelligence / proxies)
- coverage gap / thin graph
- cluster growth proxy
- platform spread
- measured signal observations when provided later

Example shape:

```
Topic: new-meme-slug
Signals: rising cluster, high platform spread, low coverage
Recommendation: High opportunity
```

---

## Cultural clusters (Phase 7B)

Reusable internal neighborhoods in `lib/intelligence/clusters.ts`:

| Cluster ID | Label |
|------------|-------|
| `classic-internet` | Classic Internet |
| `gaming-culture` | Gaming Culture |
| `creator-economy` | Creator Economy |
| `brainrot-culture` | Brainrot Culture |
| `tiktok-culture` | TikTok Culture |
| `youtube-culture` | YouTube Culture |
| `streaming-culture` | Streaming Culture |
| `animal-memes` | Animal Memes |

Membership is hard (`memberSlugs`) or soft (≥2 signal/platform/tag matches). Not public filters.

---

## Internal importance modeling (Phase 7B)

Optional `importance` on `CulturalIntelligence`:

| Dimension | Meaning |
|-----------|---------|
| `historicalSignificance` | How foundational to internet history |
| `culturalLongevity` | How long it stayed sticky |
| `platformImpact` | How much it shaped a platform / model |
| `audienceReach` | How wide the audience was/is |

Resolve with `getCulturalImportance(entry)`. Never expose as a public encyclopedia score.

---

## Recommendation logic

Public related cards still use `getRelatedRecommendations` (editorial graph + high-bar auto-fill).

Internal connection tooling:

```ts
import {
  getConnectedEntries,
  findCoverageGaps,
  suggestNextArticles,
  buildIntelligenceSnapshot,
  intelligenceOverlapScore,
} from "@/lib/intelligence";
```

Recommendations consider graph relationships, shared cultural signals, platform/era/audience overlap, and cluster membership. Quality over quantity — no filler links.

---

## How future AI systems should use this

1. **Retrieve** entry + `getCulturalIntelligence` + `getTrendIntelligence` + optional importance
2. **Expand** with `getConnectedEntries` / relationships / clusters
3. **Prioritize work** with `rankTrendOpportunities` / coverage gaps
4. **Ground** answers in prose + `sources` — never invent facts
5. **Ingest future signals** via `mergeTrendSignalObservations` when APIs exist
6. **Respect lifecycle / opportunity** as soft hints — not publish gates or public scores

Intelligence metadata is a **hint layer**, not a replacement for encyclopedia prose or sources.

---

## Registry seed anchors (Phase 7B)

Curated in `lib/intelligence/registry.ts` (metadata only — articles not rewritten):

**Creators:** `mrbeast`, `kai-cenat`, `pewdiepie`, `dream`, `amp`  
**Memes:** `doge`, `pepe`, `wojak`, `skibidi-toilet`, `rickroll`  
**Platforms:** `youtube-creator-era`, `tiktok-rise`, `streamer-culture`, `reddit-culture`, `4chan`  
**Culture:** `creator-economy`, `brainrot`

---

## Validation

`npm run validate` soft-checks:

- Unknown enum values on `intelligence.*` / `trendIntelligence.*` → warning
- Registry slugs that do not exist → warning
- `importance.*` / `confidence` outside 0–100 → warning
- Unknown `trendIntelligence.signalIds` → warning

Missing intelligence fields are always valid.

---

## Authoring guidance

1. Prefer registry seeds if you are not rewriting the article
2. Set `lifecycleStage` only when a human has judged the arc
3. Keep cultural `signals` short and reusable
4. Use `trendIntelligence` sparingly for momentum / notes — do not invent platform metrics
5. Never expose opportunity / importance / trend confidence as public scores

---

## Related code

| Path | Role |
|------|------|
| `types/index.ts` | `CulturalIntelligence`, `TrendIntelligence`, enums |
| `lib/intelligence/culturalMeta.ts` | Resolve cultural defaults + overlap |
| `lib/intelligence/clusters.ts` | Cluster definitions + membership |
| `lib/intelligence/importance.ts` | Internal importance resolve |
| `lib/intelligence/lifecycle.ts` | Multi-signal lifecycle inference |
| `lib/intelligence/trendSignals.ts` | Signal framework (interfaces) |
| `lib/intelligence/trendRegistry.ts` | Trend slug seeds |
| `lib/intelligence/trendIntelligence.ts` | Resolve trend intelligence |
| `lib/intelligence/opportunity.ts` | Internal opportunity scoring |
| `lib/intelligence/registry.ts` | Cultural slug seeds |
| `lib/intelligence/coverage.ts` | Connected / gaps / next / snapshot |
| `lib/intelligence/related.ts` | Related ranking |
| `lib/intelligence/validateIntelligence.ts` | Soft validate |

# Cultural Intelligence Data Model (Phase 7)

Internal foundation for future Internet Culture Hub intelligence features.

**Phase 7 does not add:** public AI chat, accounts, dashboards, or new UI sections.

---

## Goals

1. Structured cultural metadata (era, platform, audience, format, signals, lifecycle)
2. Cultural clusters that connect entries through meaningful neighborhoods
3. Recommendation logic that prefers multi-signal evidence over filler
4. Internal importance modeling (not public encyclopedia scores)
5. Backward-compatible optional fields (existing articles stay valid)
6. Clear docs for future AI / tooling consumers

---

## Where metadata lives

| Layer | Location | Precedence |
|-------|----------|------------|
| Optional on entry | `entry.intelligence?: CulturalIntelligence` | Highest |
| Internal registry | `lib/intelligence/registry.ts` | Middle |
| Derived defaults | tags / category / description heuristics | Lowest |

Resolve with:

```ts
import { getCulturalIntelligence } from "@/lib/intelligence";

const meta = getCulturalIntelligence(entry);
// meta.era, meta.originPlatform, meta.signals, meta.clusters, meta.lifecycleStage, …
```

Do **not** bulk-edit every article. Prefer the registry for seeds; add `intelligence` on a file only when an author is already editing that entry.

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

Membership is:

1. **Hard** — slug listed in `memberSlugs`
2. **Soft** — at least two matches among `matchSignals` / `matchPlatforms` / `matchTags`

```ts
import { resolveClusterIds, sharedClusterIds } from "@/lib/intelligence";

getCulturalIntelligence(entry).clusters;
sharedClusterIds(aInput, bInput);
```

Clusters are **not** public filters or navigation. Culture topics without a dedicated article (Classic Internet, Gaming Culture) live as clusters, not orphan registry keys.

---

## Internal importance modeling (Phase 7B)

Optional `importance` on `CulturalIntelligence`:

| Dimension | Meaning |
|-----------|---------|
| `historicalSignificance` | How foundational to internet history |
| `culturalLongevity` | How long it stayed sticky |
| `platformImpact` | How much it shaped a platform / model |
| `audienceReach` | How wide the audience was/is |

Rules:

- Values are 0–100 when set
- **Not** public UI scores — do not replace `scores.relevance|influence|cringe|brainrot`
- Resolve with `getCulturalImportance(entry)` (explicit registry/entry values win; light derived hints fill gaps)
- Used only as a soft affinity boost when cluster/signal evidence already exists

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

### Important rules

- Distinct from `trendDirection` (`rising` | `stable` | `declining` | `new`)
- Distinct from optional `status` (`EntryStatus`)
- `inferLifecycleStage(entry)` is **read-only** — it never writes catalog files
- Do not auto-change existing statuses during Phase 7

```ts
import { inferLifecycleStage, getCulturalIntelligence } from "@/lib/intelligence";

inferLifecycleStage(entry);           // derived guess
getCulturalIntelligence(entry).lifecycleStage; // explicit if set, else inferred
getCulturalIntelligence(entry).lifecycleSource; // "explicit" | "inferred"
```

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

Recommendations consider:

| Signal | Source |
|--------|--------|
| Graph relationships | `relationships.*`, curated `relatedSlugs` |
| Shared cultural signals | `intelligence.signals` / registry |
| Platform overlap | `originPlatform` |
| Era overlap | `era` |
| Audience overlap | `audience` |
| Cluster membership | `CULTURAL_CLUSTERS` |

**Quality over quantity:**

- Auto-fill requires multi-signal evidence (raised thresholds)
- `intelligenceOverlapScore` returns `0` for thin single-dimension matches
- Same-cluster alone is a strong solo reason; bare same-category popularity is not
- Do not invent filler “related” links

These APIs are for **server/tooling** use — not public AI UI in Phase 7.

---

## How future AI systems should use this

1. **Retrieve** the entry + `getCulturalIntelligence(entry)` (+ optional `getCulturalImportance`)
2. **Expand** with `getConnectedEntries` / typed `relationships` / shared clusters
3. **Ground** answers in `sources`, `origin` / `meaning` / `definition` prose — never invent facts
4. **Suggest coverage** via `suggestNextArticles` — humans still research and write
5. **Respect lifecycle / importance** as soft ranking hints — not publish gates or public score replacements

Intelligence metadata is a **hint layer**, not a replacement for encyclopedia prose or sources.

---

## Registry seed anchors (Phase 7B)

Curated in `lib/intelligence/registry.ts` (metadata only — articles not rewritten):

**Creators:** `mrbeast`, `kai-cenat`, `pewdiepie`, `dream`, `amp`  
**Memes:** `doge`, `pepe`, `wojak`, `skibidi-toilet`, `rickroll`  
**Platforms (mapped to existing entries):** `youtube-creator-era`, `tiktok-rise`, `streamer-culture`, `reddit-culture`, `4chan`  
**Culture:** `creator-economy`, `brainrot`  
*(Classic Internet / Gaming Culture → clusters, not missing-slug registry keys)*

---

## Validation

`npm run validate` soft-checks:

- Unknown enum values on `intelligence.*` → warning
- Registry slugs that do not exist → warning
- `importance.*` outside 0–100 → warning

Missing `intelligence` is always valid.

---

## Authoring guidance

When editing an entry and you know the signals:

1. Prefer adding a registry seed if you are not already rewriting the article
2. Or add `intelligence: { … }` on the entry
3. Set `lifecycleStage` only when a human has judged the arc
4. Keep `signals` short and reusable (`Brainrot`, not a paragraph)
5. Set `importance` only for major anchors — never expose it as a public score
6. Never invent platforms or eras — if unsure, omit and let defaults fill `unknown`

---

## Related code

| Path | Role |
|------|------|
| `types/index.ts` | `CulturalIntelligence`, `CulturalImportance` |
| `lib/intelligence/culturalMeta.ts` | Resolve defaults + overlap score |
| `lib/intelligence/clusters.ts` | Cluster definitions + membership |
| `lib/intelligence/importance.ts` | Internal importance resolve |
| `lib/intelligence/lifecycle.ts` | Stage inference |
| `lib/intelligence/registry.ts` | Slug seeds |
| `lib/intelligence/coverage.ts` | Connected / gaps / next |
| `lib/intelligence/related.ts` | Related ranking (+ cluster/signals) |
| `lib/intelligence/validateIntelligence.ts` | Soft validate |

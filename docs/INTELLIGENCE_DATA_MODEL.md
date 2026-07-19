# Cultural Intelligence Data Model (Phase 7)

Internal foundation for future Internet Culture Hub intelligence features.

**Phase 7 does not add:** public AI chat, accounts, dashboards, or new UI sections.

---

## Goals

1. Structured cultural metadata (era, platform, audience, format, signals, lifecycle)
2. Backward-compatible optional fields (existing articles stay valid)
3. Lifecycle modeling without auto-writing catalog statuses
4. Utilities for “connected?”, “missing?”, “create next?”
5. Clear docs for future AI / tooling consumers

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
// meta.era, meta.originPlatform, meta.signals, meta.lifecycleStage, …
```

Do **not** bulk-edit every article. Prefer the registry for seeds; add `intelligence` on a file only when an author is already editing that entry.

---

## `CulturalIntelligence` fields

Defined in `types/index.ts`:

| Field | Purpose | Example (Skibidi Toilet) |
|-------|---------|--------------------------|
| `era` | Historical bucket | `gen-alpha`, `short-form` |
| `originPlatform` | Home platform | `youtube-shorts` |
| `culturalCategory` | Freeform clusters | `brainrot`, `serialized-web-series` |
| `audience` | Who it belongs to | `gen-alpha`, `gen-z` |
| `formatType` | Form of the object | `animated-meme` |
| `lifecycleStage` | Explicit arc stage | omit unless curated |
| `signals` | Short labels for AI/tools | `Brainrot`, `Gen Alpha`, `Short-form video` |

All fields are optional.

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

## Recommendation utilities

```ts
import {
  getConnectedEntries,
  findCoverageGaps,
  suggestNextArticles,
  buildIntelligenceSnapshot,
} from "@/lib/intelligence";

const catalog = getAllEntriesSync();

// What is connected to this?
getConnectedEntries(entry, catalog);

// What curated topics are missing?
findCoverageGaps(catalog);

// What should be created / enriched next?
suggestNextArticles(catalog);

// Compact payload for future AI tooling
buildIntelligenceSnapshot(entry, catalog);
```

These build on existing `getRelatedRecommendations` and add intelligence-signal overlap. They are for **server/tooling** use — not public UI in Phase 7.

---

## How future AI systems should use this

1. **Retrieve** the entry + `getCulturalIntelligence(entry)`
2. **Expand** with `getConnectedEntries` / typed `relationships`
3. **Ground** answers in `sources`, `origin` / `meaning` / `definition` prose — never invent facts
4. **Suggest coverage** via `suggestNextArticles` — humans still research and write
5. **Respect lifecycle** as a soft signal for “is this current or historical?” — not a publish gate

Intelligence metadata is a **hint layer**, not a replacement for encyclopedia prose or sources.

---

## Skibidi Toilet example (registry seed)

```ts
// lib/intelligence/registry.ts
"skibidi-toilet": {
  era: ["gen-alpha", "short-form"],
  originPlatform: "youtube-shorts",
  culturalCategory: ["meme", "brainrot", "serialized-web-series"],
  audience: ["gen-alpha", "gen-z"],
  formatType: "animated-meme",
  signals: ["Brainrot", "Gen Alpha", "Short-form video", "YouTube Shorts"],
}
```

Equivalent optional shape on an article file:

```ts
intelligence: {
  era: ["gen-alpha", "short-form"],
  originPlatform: "youtube-shorts",
  culturalCategory: ["meme", "brainrot"],
  audience: ["gen-alpha", "gen-z"],
  formatType: "animated-meme",
  signals: ["Brainrot", "Gen Alpha", "Short-form video"],
}
```

---

## Validation

`npm run validate` soft-checks:

- Unknown enum values on `intelligence.*` → warning
- Registry slugs that do not exist → warning

Missing `intelligence` is always valid.

---

## Authoring guidance

When editing an entry and you know the signals:

1. Prefer adding a registry seed if you are not already rewriting the article
2. Or add `intelligence: { … }` on the entry
3. Set `lifecycleStage` only when a human has judged the arc
4. Keep `signals` short and reusable (`Brainrot`, not a paragraph)
5. Never invent platforms or eras — if unsure, omit and let defaults fill `unknown`

---

## Related code

| Path | Role |
|------|------|
| `types/index.ts` | `CulturalIntelligence` + enums |
| `lib/intelligence/culturalMeta.ts` | Resolve defaults + merge |
| `lib/intelligence/lifecycle.ts` | Stage inference |
| `lib/intelligence/registry.ts` | Slug seeds |
| `lib/intelligence/coverage.ts` | Connected / gaps / next |
| `lib/intelligence/related.ts` | Existing related ranking |
| `lib/intelligence/validateIntelligence.ts` | Soft validate |

# Encyclopedia Knowledge Base

Permanent knowledge models for how Internet Culture Hub understands internet culture.

**Status:** RC3-D architecture only. No SDKs, UI, routes, or live content writes.

Code: `lib/ai/knowledge/`

Related:

- [`AI_EDITORIAL_PLATFORM.md`](./AI_EDITORIAL_PLATFORM.md)
- [`EDITORIAL_WORKFLOW.md`](./EDITORIAL_WORKFLOW.md)
- [`EDITORIAL_INTELLIGENCE.md`](./EDITORIAL_INTELLIGENCE.md)

---

## How the encyclopedia thinks

Internet culture is modeled as overlapping **kinds** (meme, slang, event, creator, platform, community, trend, format, technology, movement, subculture, media), each with definitions, relationships, article shapes, and research needs (`taxonomy`).

Topics move through **lifecycles** (memes) and **evolution stages** (slang), sit inside **eras** (`internetHistory`), and spread for structured **virality drivers** — never auto-scored vanity metrics.

Creators are evaluated along **influence dimensions**; platforms and communities have durable **culture profiles**. Impact is discussed through a fixed **framework** of language, media, identity, history, etc.

Everything is constrained by **encyclopedia principles**: teach first, preserve uncertainty, prefer primary evidence, human approval required.

---

## How AI should consume knowledge

Future models should:

1. Classify the subject against the taxonomy (human confirms).
2. Pick the matching research pattern.
3. Use platform/community/era profiles as context — not as invented facts.
4. Reason about lifecycle / virality / impact with the provided dimensions.
5. Emit packages (RC3-B) that cite evidence (RC3-C) and respect principles.

Knowledge files are **assets**, not prompts. Prompts may *reference* them; they should not duplicate them.

---

## How workflows use knowledge

```
Idea
  → taxonomy + classification
  → researchPatterns + researchMethodology (RC3-C)
  → ResearchPackage (RC3-B)
  → DraftPackage guided by typicalArticleStructure
  → review against encyclopediaPrinciples + qualityAssessment
  → publish (human)
```

Update workflows re-check era/lifecycle placement when culture shifts.

---

## Future admin usage

- Dropdowns for era, platform, community, lifecycle stage
- Research checklists per pattern
- Principle lint hints before commit
- Knowledge-graph edge suggestions for related entries

---

## Future search usage

- Alias expansion from classification / taxonomy examples
- Platform and community facets
- Era filters
- “Format” and “movement” as discovery dimensions beyond core categories

---

## Future recommendation usage

- Knowledge-graph relation kinds (precursor, parody, same era…)
- Community/platform affinity
- Lifecycle-aware “legacy vs rising” framing (editorial, not engagement hacks)

---

## Module map

| File | Role |
|------|------|
| `taxonomy.ts` | Master kinds |
| `memeLifecycle.ts` | Meme stages |
| `slangEvolution.ts` | Slang stages |
| `creatorInfluence.ts` | Influence dimensions |
| `platformCulture.ts` | Platform profiles |
| `communityTaxonomy.ts` | Community profiles |
| `internetHistory.ts` | Eras |
| `viralityModel.ts` | Spread drivers |
| `culturalImpactFramework.ts` | Impact dimensions |
| `researchPatterns.ts` | Per-kind research playbooks |
| `encyclopediaPrinciples.ts` | Editorial philosophy |
| `classification.ts` | Topic classification envelope |
| `knowledgeGraph.ts` | Node/edge schema |

---

## RC3 stack

| Phase | Role |
|-------|------|
| RC3-A | Providers / prompts / pipelines |
| RC3-B | Packages / workflows / state |
| RC3-C | Evidence & evaluation reasoning |
| RC3-D | **What culture is** — shared knowledge assets |

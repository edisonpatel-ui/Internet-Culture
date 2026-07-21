# Editorial Intelligence Engine

How Internet Culture Hub teaches future AI models to **research and evaluate**
culture — without inventing facts or auto-publishing.

**Status:** RC3-C architecture. Pure typed logic + structures. No SDKs, UI, or routes.

Code: `lib/ai/intelligence/`  
Related: [`AI_EDITORIAL_PLATFORM.md`](./AI_EDITORIAL_PLATFORM.md), [`EDITORIAL_WORKFLOW.md`](./EDITORIAL_WORKFLOW.md)

> Not the same as `lib/intelligence/` (live-site cultural scores / related recommendations).

---

## How the engine thinks

1. **Follow a fixed research sequence** (`researchMethodology`) — never skip to prose.
2. **Classify sources** (`sourceEvaluation`) before trusting claims.
3. **Score evidence** (`evidenceScoring` + `factConfidence`) — preserve Low/Unknown.
4. **Record contradictions** instead of picking a winner (`contradictionAnalysis`).
5. **Build timelines** with uncertain dates allowed (`timelineBuilder`).
6. **Recommend** impact, relationships, links, entities, quality fixes — humans decide.

---

## Research

```
Identify subject
    ↓
Collect sources
    ↓
Extract facts
    ↓
Extract chronology
    ↓
Identify platforms / aliases / entities
    ↓
Cultural impact notes
    ↓
Find contradictions
    ↓
Score evidence
    ↓
ResearchPackage (RC3-B)
```

---

## Evidence

```
Claim
    ↓
Attach SourceCategory[]
    ↓
scoreEvidence → High | Medium | Low | Unknown
    ↓
assessFactConfidence → Very High … Unknown
    ↓
Human accepts / rejects before draft fields
```

Example heuristics (implemented as pure functions):

- 3 independent journalism + official + archive → **Very High**
- Single Reddit category → **Low**

---

## Validation

```
DraftPackage / prose
    ↓
qualityAssessment (recommendations)
    ↓
ReviewPackage / SeoReviewPackage (RC3-B workflows)
    ↓
npm run validate (hard gate)
    ↓
Human approval → publish
```

---

## Relationship discovery

```
Entry under research
    ↓
entityExtraction
    ↓
relationshipDiscovery (predecessor, parody, same era, …)
    ↓
internalLinkSuggestions (related / missing / hub / creator / platform)
    ↓
Human writes relatedSlugs / relationships in lib/content
```

---

## Publishing

```
Approved packages
    ↓
Human maps fields → article template
    ↓
validate + media audit
    ↓
git commit → deploy
    ↓
Later: update workflow + NeedsUpdate state (RC3-B)
```

AI never writes `lib/content/` or sets `verified: true`.

---

## Module map

| File | Role |
|------|------|
| `researchMethodology.ts` | Required research steps |
| `sourceEvaluation.ts` | Source category credibility profiles |
| `evidenceScoring.ts` | High/Medium/Low/Unknown |
| `factConfidence.ts` | Combine evidence → confidence labels |
| `contradictionAnalysis.ts` | Preserve disputes |
| `timelineBuilder.ts` | Dated events with precision |
| `culturalImpact.ts` | Impact recommendations (no auto scores) |
| `relationshipDiscovery.ts` | Cultural edge kinds |
| `internalLinkSuggestions.ts` | Link / missing-article suggestions |
| `entityExtraction.ts` | People, platforms, memes, … + aliases |
| `qualityAssessment.ts` | Editorial quality recommendations |

---

## RC3 stack

| Phase | Focus |
|-------|--------|
| RC3-A | Providers, prompts, pipelines |
| RC3-B | Packages, workflows, editorial state |
| RC3-C | **How** research/evaluation should reason |

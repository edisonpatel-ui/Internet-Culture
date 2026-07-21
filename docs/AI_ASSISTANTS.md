# AI Assistants

**RC4-A — blueprint only.** Catalog of future internal assistants.  
No chatbot on the public site. No providers wired in this phase.

Parent: [`EDITORIAL_OPERATING_SYSTEM.md`](./EDITORIAL_OPERATING_SYSTEM.md)  
Implements against: `lib/ai` (RC3-A–D)

---

## Design rules for every assistant

1. Returns a **structured package or recommendation list**, not a silent site edit.
2. Sets **`requiresHumanReview: true`** (or equivalent).
3. Uses **Knowledge (RC3-D)** + **Intelligence (RC3-C)** — does not invent ontology.
4. Is **provider-agnostic** (`AIProvider`).
5. Logs **model id + prompt id + timestamp** in future AI Activity dashboard.
6. **Never** appears in public UI.

---

## Assistant catalog

### Research Assistant

| | |
|--|--|
| **Purpose** | Produce `ResearchPackage` from a topic brief |
| **Inputs** | Topic, category hint, seed URLs, notes |
| **Outputs** | Research package |
| **Uses** | `researchPatterns`, methodology steps, taxonomy |
| **Validation** | `validateResearchPackage` |

### Writing Assistant

| | |
|--|--|
| **Purpose** | Map research → `DraftPackage` fields |
| **Inputs** | Approved research |
| **Outputs** | Draft package (not markdown article file) |
| **Uses** | Taxonomy `typicalArticleStructure`, principles |
| **Validation** | `validateDraftPackage` |

### Editorial Assistant

| | |
|--|--|
| **Purpose** | Style + accuracy recommendations |
| **Inputs** | Prose / draft fields |
| **Outputs** | `ReviewPackage` |
| **Uses** | Encyclopedia principles, quality dimensions |
| **Validation** | Critical findings block publish |

### SEO Assistant

| | |
|--|--|
| **Purpose** | Metadata and discoverability recommendations |
| **Inputs** | Title, slug, description, lead |
| **Outputs** | `SeoReviewPackage` |
| **Uses** | Category URL rules, internal link graph |
| **Validation** | No clickbait; slug hygiene |

### Media Assistant

| | |
|--|--|
| **Purpose** | Suggest MediaItems + search hints |
| **Inputs** | Title, category, description |
| **Outputs** | Suggested media (`verified: false`) |
| **Uses** | Media architecture rules |
| **Validation** | Forbidden hosts rejected; human verifies URLs |

### Internal Linking Assistant

| | |
|--|--|
| **Purpose** | Suggest related / hub / missing links |
| **Inputs** | Entry + candidate slugs |
| **Outputs** | Internal link suggestion result |
| **Uses** | Knowledge graph relation kinds |
| **Validation** | Only existing slugs or explicit gap cards |

### Fact Check Assistant

| | |
|--|--|
| **Purpose** | Confidence labels per claim |
| **Inputs** | Claims + source categories |
| **Outputs** | Fact confidence results |
| **Uses** | `factConfidence`, `evidenceScoring` |
| **Validation** | Weak-only stacks capped at Low |

### Timeline Builder

| | |
|--|--|
| **Purpose** | Structured chronology with precision |
| **Inputs** | Event candidates |
| **Outputs** | Timeline build result |
| **Uses** | `timelineBuilder` |
| **Validation** | Unknown/approx dates preserved |

### Source Evaluator

| | |
|--|--|
| **Purpose** | Classify sources and citation priority |
| **Inputs** | URLs / titles |
| **Outputs** | Source category profiles applied |
| **Uses** | `sourceEvaluation` |
| **Validation** | Unknown category = high verification difficulty |

### Relationship Finder

| | |
|--|--|
| **Purpose** | Cultural edges between entries |
| **Inputs** | Source entry + catalog |
| **Outputs** | Relationship discovery result |
| **Uses** | `relationshipDiscovery`, knowledge graph |
| **Validation** | Human picks edges to write |

### Gap Detector

| | |
|--|--|
| **Purpose** | Surface missing encyclopedia coverage |
| **Inputs** | Catalog + roadmap registry |
| **Outputs** | Gap / opportunity list |
| **Uses** | Content gap / roadmap intelligence |
| **Validation** | Does not auto-create articles |

### Trend Watcher

| | |
|--|--|
| **Purpose** | Flag rising cultural topics for research queue |
| **Inputs** | Editorial signals / external notes (future) |
| **Outputs** | Idea cards — not public “live trending” claims |
| **Uses** | Virality model (qualitative) |
| **Validation** | Separate from public Rankings honesty |

### Update Detector

| | |
|--|--|
| **Purpose** | Diff live entry vs new research |
| **Inputs** | Snapshot + research package |
| **Outputs** | `UpdatePackage` |
| **Uses** | Update workflow |
| **Validation** | Always human review required |

### Quality Reviewer

| | |
|--|--|
| **Purpose** | Missing context, weak sources, AI-style prose, etc. |
| **Inputs** | Draft / published prose |
| **Outputs** | Quality assessment result |
| **Uses** | `qualityAssessment` |
| **Validation** | Recommendations only — no auto-rewrite |

### Duplicate Detector

| | |
|--|--|
| **Purpose** | Catch same-topic / near-title collisions |
| **Inputs** | Title, aliases, slug |
| **Outputs** | Collision warnings + merge suggestions |
| **Uses** | Catalog index + classification aliases |
| **Validation** | Blocks new slug if hard duplicate |

### Entity Extractor

| | |
|--|--|
| **Purpose** | People, platforms, memes, slang, orgs… |
| **Inputs** | Research notes / prose |
| **Outputs** | Entity extraction result |
| **Uses** | `entityExtraction` |
| **Validation** | Aliases normalized; human confirms catalog links |

### Headline Assistant

| | |
|--|--|
| **Purpose** | Clear encyclopedia titles (not clickbait) |
| **Inputs** | Working title + category |
| **Outputs** | Title alternatives + rationale |
| **Uses** | Principles: teach before impressing |
| **Validation** | Human picks final title |

### Metadata Assistant

| | |
|--|--|
| **Purpose** | Descriptions, aliases, tags |
| **Inputs** | Draft fields |
| **Outputs** | Metadata suggestions |
| **Uses** | SEO package fields |
| **Validation** | Description length / clarity checks |

### Schema Assistant

| | |
|--|--|
| **Purpose** | JSON-LD / schema recommendations |
| **Inputs** | Category + entry shape |
| **Outputs** | Schema notes (Article, Person, Event caveats) |
| **Uses** | Existing `lib/seo` patterns |
| **Validation** | Warn on Event rich-result mismatch for cultural “events” |

---

## Invocation model (future)

```
Admin UI → Assistant id → Prompt template (RC3-A)
  → Provider (RC3-A)
  → Intelligence helpers (RC3-C)
  → Knowledge context (RC3-D)
  → Package (RC3-B)
  → Human approval → Workflow transition
```

Public pages never import assistants.

# Editorial Pipelines

**RC4-A — blueprint only.** Describes the full publishing pipeline stages.

Parent: [`EDITORIAL_OPERATING_SYSTEM.md`](./EDITORIAL_OPERATING_SYSTEM.md)  
Code foundations: RC3-A providers · RC3-B workflows · RC3-C intelligence · RC3-D knowledge

---

## Pipeline overview

```
Research
  → Source evaluation
  → Fact confidence
  → Timeline
  → Relationships
  → Internal links
  → Draft
  → Editorial review
  → SEO review
  → Media
  → Validation
  → Publishing
  → Monitoring
  → Update detection
```

Each stage has: **purpose**, **inputs**, **outputs**, **AI assistance**, **human duty**, **gate**.

---

## 1. Research

| | |
|--|--|
| **Purpose** | Build a supportable understanding before prose |
| **Inputs** | Idea, gap card, seed URLs, category hint |
| **Outputs** | `ResearchPackage` |
| **AI** | Research Assistant; uses knowledge taxonomy + research patterns |
| **Human** | Accept/reject sources; resolve “not this” |
| **Gate** | At least one credible source path; contradictions recorded |

Follow RC3-C methodology steps end-to-end; do not skip to draft.

---

## 2. Source evaluation

| | |
|--|--|
| **Purpose** | Classify and prioritize evidence |
| **Inputs** | Candidate sources |
| **Outputs** | Sources tagged with `SourceCategory` profiles |
| **AI** | Source Evaluator Assistant |
| **Human** | Confirm category; demote weak-only stacks |
| **Gate** | No “High” confidence on Reddit/social-only stacks |

---

## 3. Fact confidence

| | |
|--|--|
| **Purpose** | Label each claim Very High → Unknown |
| **Inputs** | Facts + source categories |
| **Outputs** | Confidence labels + reasons |
| **AI** | Fact Check Assistant (`assessFactConfidence`) |
| **Human** | Drop or hedge Low/Unknown claims in draft |
| **Gate** | Critical identity claims should not rest on Unknown |

---

## 4. Timeline

| | |
|--|--|
| **Purpose** | Ordered chronology with uncertain dates allowed |
| **Inputs** | Dated/approx events + sources |
| **Outputs** | `TimelineEvent[]` / chronology in research package |
| **AI** | Timeline Builder |
| **Human** | Fix precision; never invent day-level dates |
| **Gate** | Uncertain items flagged, not deleted |

---

## 5. Relationships

| | |
|--|--|
| **Purpose** | Discover cultural edges (parody, precursor, same era…) |
| **Inputs** | Entities + catalog candidates |
| **Outputs** | Relationship discovery result |
| **AI** | Relationship Finder + Entity Extractor |
| **Human** | Choose edges that teach readers |
| **Gate** | No invented slugs |

---

## 6. Internal links

| | |
|--|--|
| **Purpose** | Suggest related / missing / hub links |
| **Inputs** | Relationship set + catalog |
| **Outputs** | Internal link suggestions |
| **AI** | Internal Linking Assistant |
| **Human** | Write `relatedSlugs` / `relationships` in content |
| **Gate** | Targets must exist or be logged as gaps |

---

## 7. Draft

| | |
|--|--|
| **Purpose** | Structured field proposals — not markdown dump |
| **Inputs** | Approved `ResearchPackage` |
| **Outputs** | `DraftPackage` |
| **AI** | Writing Assistant (maps to taxonomy `typicalArticleStructure`) |
| **Human** | Edit voice; remove hype; fill examples |
| **Gate** | Title, slug, summary present; principles checklist |

---

## 8. Editorial review

| | |
|--|--|
| **Purpose** | Teach-first quality, accuracy, style |
| **Inputs** | Draft or human prose |
| **Outputs** | `ReviewPackage` recommendations |
| **AI** | Editorial Assistant + Quality Reviewer |
| **Human** | Apply or dismiss recommendations |
| **Gate** | No critical unresolved accuracy issues |

---

## 9. SEO review

| | |
|--|--|
| **Purpose** | Title, description, slug, linking, schema notes |
| **Inputs** | Title/slug/description |
| **Outputs** | `SeoReviewPackage` |
| **AI** | SEO / Headline / Metadata / Schema Assistants |
| **Human** | Approve metadata; avoid clickbait |
| **Gate** | Category-native URL rules respected |

---

## 10. Media

| | |
|--|--|
| **Purpose** | Representative, licensed, host-safe media |
| **Inputs** | Media suggestions + search hints |
| **Outputs** | `MediaItem[]` with `verified: false` until human confirms |
| **AI** | Media Assistant |
| **Human** | Open URLs; set `verified: true` only after confirm |
| **Gate** | Featured URL loads; no forbidden hosts; YouTube oEmbed when used |

---

## 11. Validation

| | |
|--|--|
| **Purpose** | Hard mechanical gates |
| **Inputs** | Content files / pending commit |
| **Outputs** | Pass/fail + warnings |
| **AI** | None required (may summarize warnings) |
| **Human** | Fix errors; triage warnings |
| **Gate** | `npm run validate` (+ build before release); optional media/editorial audits |

---

## 12. Publishing

| | |
|--|--|
| **Purpose** | Make the entry live |
| **Inputs** | Approved content + green gates |
| **Outputs** | Deployed encyclopedia page |
| **AI** | None |
| **Human** | Commit / merge / deploy; final accountability |
| **Gate** | CI validate + build; SITE_URL correct in production |

---

## 13. Monitoring

| | |
|--|--|
| **Purpose** | Watch health, search, engagement, breakage |
| **Inputs** | Analytics, GSC, Speed Insights, error logs |
| **Outputs** | Alerts + queue items |
| **AI** | Optional summarization of anomalies |
| **Human** | Prioritize fixes vs new coverage |
| **Gate** | Broken media / 404 spikes create Update or Media jobs |

---

## 14. Update detection

| | |
|--|--|
| **Purpose** | Compare live entry vs new research |
| **Inputs** | `ExistingArticleSnapshot` + new `ResearchPackage` |
| **Outputs** | `UpdatePackage` |
| **AI** | Update Detector + Trend Watcher |
| **Human** | Decide revise / monitor / no-op |
| **Gate** | `humanReviewRequired: true` always |

---

## Parallelism

Stages 2–6 may overlap inside Research.  
Editorial / SEO / Media reviews may run in parallel after Draft, but **Validation → Publishing** stays serial.

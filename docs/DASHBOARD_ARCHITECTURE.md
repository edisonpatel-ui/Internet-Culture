# Dashboard Architecture

**RC4-A — blueprint only.** Every future admin dashboard page specified.  
No UI implementation in this phase.

Parent: [`ADMIN_PLATFORM.md`](./ADMIN_PLATFORM.md)

For each page: **purpose · users · inputs · outputs · AI assistance · validation · future expansion**

---

## Overview

| | |
|--|--|
| **Purpose** | Single-pane health of editorial ops + site |
| **Users** | All staff; leadership default home |
| **Inputs** | Queue counts, CI status, coverage %, open blockers |
| **Outputs** | Links into queues; alerts |
| **AI assistance** | Optional daily briefing summary |
| **Validation** | Read-only; no publish from here |
| **Future expansion** | Customizable widgets per role |

---

## Today's work

| | |
|--|--|
| **Purpose** | Personal/assigned tasks due now |
| **Users** | Editors, writers, reviewers |
| **Inputs** | Assignee, due date, priority, stage |
| **Outputs** | Ordered work list |
| **AI assistance** | Suggest next-best job (gap value × effort) |
| **Validation** | Cannot advance without stage gates |
| **Future expansion** | Slack/email digest |

---

## Research Queue

| | |
|--|--|
| **Purpose** | Topics needing evidence packages |
| **Users** | Research editors |
| **Inputs** | Ideas, gaps, seed URLs |
| **Outputs** | Jobs in Research states; ResearchPackages |
| **AI assistance** | Research, Source Evaluator, Fact Check, Timeline, Entity Extractor |
| **Validation** | `validateResearchPackage` |
| **Future expansion** | Batch import from roadmap |

---

## Draft Queue

| | |
|--|--|
| **Purpose** | Approved research awaiting DraftPackage / human write |
| **Users** | Writers |
| **Inputs** | ResearchPackage |
| **Outputs** | DraftPackage; content file stubs (later) |
| **AI assistance** | Writing Assistant, Headline, Metadata |
| **Validation** | `validateDraftPackage` |
| **Future expansion** | Side-by-side template field mapper |

---

## Review Queue

| | |
|--|--|
| **Purpose** | Editorial review of prose/fields |
| **Users** | Reviewers, editor-in-chief |
| **Inputs** | Draft or PR diff |
| **Outputs** | ReviewPackage; approve / request changes |
| **AI assistance** | Editorial Assistant, Quality Reviewer, Duplicate Detector |
| **Validation** | No critical accuracy opens |
| **Future expansion** | Multi-reviewer sign-off |

---

## Publishing Queue

| | |
|--|--|
| **Purpose** | Ready-to-live entries awaiting final gate |
| **Users** | Approvers |
| **Inputs** | Passed reviews + validate green |
| **Outputs** | Publish action → live catalog |
| **AI assistance** | Final checklist reminder only |
| **Validation** | CI validate + build; human checkbox |
| **Future expansion** | Scheduled publish windows |

---

## Update Queue

| | |
|--|--|
| **Purpose** | Published entries flagged for revision |
| **Users** | Research + writers |
| **Inputs** | UpdatePackage, broken media, GSC notes |
| **Outputs** | Revision jobs back into Research/Review |
| **AI assistance** | Update Detector, Trend Watcher |
| **Validation** | `humanReviewRequired` |
| **Future expansion** | Auto-file from monitoring rules |

---

## Media Queue

| | |
|--|--|
| **Purpose** | Verify URLs, attribution, roles |
| **Users** | Media editors |
| **Inputs** | Unverified MediaItems; suggestions |
| **Outputs** | `verified: true/false`; replacements |
| **AI assistance** | Media Assistant (hints only) |
| **Validation** | Host rules; oEmbed for YouTube; human eyes |
| **Future expansion** | Live HEAD checks in CI optional job |

---

## SEO Queue

| | |
|--|--|
| **Purpose** | Titles, descriptions, slugs, linking, schema notes |
| **Users** | SEO editor |
| **Inputs** | Entries near publish / GSC queries |
| **Outputs** | SeoReviewPackage applied by human |
| **AI assistance** | SEO, Schema, Metadata, Internal Linking |
| **Validation** | Canonical category URLs; noindex policy respected |
| **Future expansion** | Query→entry opportunity list |

---

## Quality Queue

| | |
|--|--|
| **Purpose** | Soft audit debt (prose, thin entries, weak graphs) |
| **Users** | Editors |
| **Inputs** | `audit:quality` / editorial flags |
| **Outputs** | Improve / merge / keep decisions |
| **AI assistance** | Quality Reviewer |
| **Validation** | Does not block CI unless promoted to error |
| **Future expansion** | Auto-bucket refresh on schedule |

---

## Analytics

| | |
|--|--|
| **Purpose** | Understand readership (Vercel Analytics, GA4) |
| **Users** | Leadership, editors |
| **Inputs** | Page views, custom events, referrers |
| **Outputs** | Priority hints for updates/gaps |
| **AI assistance** | Optional narrative summary |
| **Validation** | No PII; respect analytics privacy rules |
| **Future expansion** | Entry-level funnels |

---

## Growth

| | |
|--|--|
| **Purpose** | Coverage growth rate, publish cadence, roadmap burn-down |
| **Users** | Leadership |
| **Inputs** | Publish counts, gap closure, category mix |
| **Outputs** | Goals vs actual |
| **AI assistance** | Gap Detector prioritization |
| **Validation** | Honest metrics (no vanity inflation) |
| **Future expansion** | OKR panels |

---

## Search Console

| | |
|--|--|
| **Purpose** | Indexing, queries, canonical issues |
| **Users** | SEO / ops |
| **Inputs** | GSC API or exported reports (future) |
| **Outputs** | Fix tasks → SEO / Update / Site Health |
| **AI assistance** | Cluster queries to gap ideas |
| **Validation** | Distinguish rich-result quirks vs real errors |
| **Future expansion** | Direct GSC API integration |

---

## Site Health

| | |
|--|--|
| **Purpose** | CI, build, CSP, broken media, performance |
| **Users** | Ops, engineers |
| **Inputs** | GitHub Actions, Speed Insights, error logs |
| **Outputs** | Incidents + owners |
| **AI assistance** | Summarize failing checks |
| **Validation** | Production SITE_URL / CSP headers sanity |
| **Future expansion** | Uptime + synthetic article probes |

---

## AI Activity

| | |
|--|--|
| **Purpose** | Audit trail of assistant runs |
| **Users** | Leadership, ops, editors |
| **Inputs** | Provider, prompt id, job id, tokens (future), outcome |
| **Outputs** | Transparency + cost control |
| **AI assistance** | n/a (meta) |
| **Validation** | No secrets in logs |
| **Future expansion** | Cost budgets per provider |

---

## Content Coverage

| | |
|--|--|
| **Purpose** | What the encyclopedia already covers by category/era/platform |
| **Users** | All editors |
| **Inputs** | Catalog aggregates + knowledge tags |
| **Outputs** | Heatmaps / counts |
| **AI assistance** | Classify untagged entries (suggestions) |
| **Validation** | Counts match validate catalog |
| **Future expansion** | Faceted explorer |

---

## Content Gaps

| | |
|--|--|
| **Purpose** | High-value missing topics |
| **Users** | Editors, leadership |
| **Inputs** | Gap registry / roadmap |
| **Outputs** | Research Queue enrollment |
| **AI assistance** | Gap Detector |
| **Validation** | No auto article creation |
| **Future expansion** | Search demand overlay |

---

## Roadmap

| | |
|--|--|
| **Purpose** | Planned sequence of coverage work |
| **Users** | Leadership, editors |
| **Inputs** | `contentRoadmap` / manual plan |
| **Outputs** | Scheduled jobs |
| **AI assistance** | Re-rank by opportunity score (editorial) |
| **Validation** | Status drift warnings (existing validate soft checks) |
| **Future expansion** | Milestone releases (“Brainrot pack”) |

---

## Cross-cutting UX rules (when built)

1. Every AI card shows **Requires human review**.  
2. Stage transitions use the **state machine** — illegal jumps error clearly.  
3. Publish is a **destructive-feeling** confirmation (name the slug).  
4. Public encyclopedia preview opens in a new context — admin chrome never leaks to `noindex`-miss pages.  
5. Empty queues celebrate quality-first pacing — not “create junk to fill.”

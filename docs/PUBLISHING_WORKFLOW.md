# Publishing Workflow

**RC4-A — blueprint only.** Content lifecycle states, transitions, and publish rules.

Parent: [`EDITORIAL_OPERATING_SYSTEM.md`](./EDITORIAL_OPERATING_SYSTEM.md)  
State machine foundation: `lib/ai/editorialState.ts` (RC3-B)

---

## 1. Lifecycle states

| State | Meaning | Public? |
|-------|---------|---------|
| **Idea** | Pitch or gap captured | No |
| **Research** | Evidence in progress | No |
| **Draft** | Structured fields exist | No |
| **Review** | Editorial / SEO / media in flight | No |
| **Published** | Live on the encyclopedia | Yes |
| **Evergreen** | Published + stable; light touch | Yes |
| **Needs Update** | Material change suspected | Yes (stale risk) |
| **Historical** | Important; framed as past-tense culture | Yes |
| **Archived** | Retained; not expanded; may soft-hide from promos | Optional |

Mapping to RC3-B `EditorialState` (implementation detail later):

| Lifecycle | EditorialState (approx.) |
|-----------|---------------------------|
| Idea / Research | ResearchRequested → ResearchComplete |
| Draft | DraftGenerated → HumanEditing |
| Review | EditorialReview → SEOReview → Approved |
| Published / Evergreen | Published |
| Needs Update | NeedsUpdate |
| Archived | Archived |

---

## 2. Transitions

```
Idea ──▶ Research ──▶ Draft ──▶ Review ──▶ Published
                                              │
                          ┌───────────────────┼───────────────────┐
                          ▼                   ▼                   ▼
                     Evergreen          Needs Update         Historical
                          │                   │                   │
                          └──────▶ Review / Research ◀────────────┘
                                              │
                                              ▼
                                         Published
                                              │
                                              ▼
                                          Archived
```

### Allowed transition rules

| From | To | Requires |
|------|-----|----------|
| Idea | Research | Topic named; not duplicate |
| Research | Draft | Research package approved |
| Draft | Review | Draft package + human edit pass |
| Review | Published | Editorial + SEO + media OK; validate pass; human approve |
| Published | Evergreen | Time stable + no open update jobs (editorial judgment) |
| Published / Evergreen | Needs Update | Update package or manual flag |
| Needs Update | Research or Review | Scope of change |
| Any pre-publish | Archived | Explicit kill / defer |
| Published / Historical | Archived | Policy decision (keep URL or redirect) |

Invalid jumps (e.g. Idea → Published) are rejected by the state machine.

---

## 3. Publishing checklist (human)

1. Sources present and adequate for claims  
2. Media verified where featured  
3. Scores are editorial estimates (honest labeling)  
4. Related links resolve  
5. `npm run validate` clean for errors  
6. Optional: `audit:media` / `audit:editorial` for release trains  
7. SITE_URL correct if production metadata touched  
8. Named approver recorded (future audit log)

---

## 4. What “Publish” means technically (future options)

| Mode | Mechanism | Notes |
|------|-----------|--------|
| A (near-term) | PR to `lib/content/` + CI | Matches today’s file CMS |
| B | Admin write → generated files → CI | Same gates |
| C | Headless CMS → build ingest | Still validate at build |

All modes: **AI never pushes production alone.**

---

## 5. Evergreen vs Historical vs Needs Update

- **Evergreen** — definitions stable (e.g. classic memes); schedule light link/media checks.  
- **Historical** — event is “completed”; page stays educational; avoid fake “rising” framing.  
- **Needs Update** — new facts, platform death, meaning shift, or broken media; prioritize in Update Queue.

---

## 6. Unpublish / archive policy

Prefer **archive over delete** for SEO and trust:

- Keep URL when possible with “historical” framing  
- Or 308 to canonical successor  
- Remove from promos / Rankings inclusion lists if misleading  

Hard deletes are exceptional and documented.

---

## 7. Monitoring after publish

| Signal | Action |
|--------|--------|
| GSC soft-404 / crawl issues | Site Health + fix |
| Broken media | Media Queue |
| Surge of related searches | Gap Detector / Update |
| Rankings honesty regressions | Product fix, not AI hype |

---

## 8. Quality-first publishing rule

If forced to choose: **ship one well-sourced entry** over five thin stubs. Coverage grows via roadmap queues, not panic publishing.

# Editorial Operating System

**RC4-A — architecture blueprint only.**  
No admin UI, routes, APIs, or runtime behavior in this phase.

This document is the master blueprint for the future **Internet Culture Hub Editorial Operating System**: how humans and AI jointly research, draft, review, publish, and maintain the encyclopedia at scale.

Related:

| Doc | Focus |
|-----|--------|
| [`ADMIN_PLATFORM.md`](./ADMIN_PLATFORM.md) | Admin surfaces, roles, navigation |
| [`EDITORIAL_PIPELINES.md`](./EDITORIAL_PIPELINES.md) | End-to-end pipeline stages |
| [`AI_ASSISTANTS.md`](./AI_ASSISTANTS.md) | Assistant catalog |
| [`PUBLISHING_WORKFLOW.md`](./PUBLISHING_WORKFLOW.md) | Publish / update / archive |
| [`DASHBOARD_ARCHITECTURE.md`](./DASHBOARD_ARCHITECTURE.md) | Every dashboard page |
| [`AI_EDITORIAL_PLATFORM.md`](./AI_EDITORIAL_PLATFORM.md) | RC3-A code foundation |
| [`EDITORIAL_WORKFLOW.md`](./EDITORIAL_WORKFLOW.md) | RC3-B lifecycle |
| [`EDITORIAL_INTELLIGENCE.md`](./EDITORIAL_INTELLIGENCE.md) | RC3-C reasoning |
| [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md) | RC3-D knowledge assets |

---

## 1. Overall philosophy

### How a professional editorial team manages the encyclopedia

Internet Culture Hub is a **reference work**, not a trend feed. Editors own:

1. **Truth** — origins, definitions, and claims must be supportable.
2. **Teaching** — a newcomer understands the first two sentences.
3. **Coverage** — intentional gaps filled via roadmap, not random virality.
4. **Maintenance** — published entries age; updates are first-class work.
5. **Trust** — sources, media verification, and honest scores.

Day-to-day work is queue-driven: research → draft → review → publish → monitor → update. The public site remains a static, validated catalog (`lib/content/`) until a deliberate content-store migration.

### How AI assists — not replaces — humans

| AI may | AI must not |
|--------|-------------|
| Propose research packages | Invent origins, dates, or stats |
| Suggest drafts as structured fields | Auto-write `lib/content/` |
| Flag quality / SEO / duplicate risks | Set `media.verified: true` |
| Suggest links, entities, timelines | Bypass `npm run validate` |
| Rank queues by editorial priority | Publish or deploy |

**Human approval is mandatory** before any catalog change. AI is a junior researcher and copy desk — never the publisher of record.

### Editorial workflow (compressed)

```
Idea / Gap
  → Research (+ intelligence + knowledge)
  → Draft (structured package)
  → Human editing
  → Editorial + SEO + Media review
  → Validation gates
  → Approval → Publish (commit / deploy)
  → Monitoring
  → Update detection → Revision cycle
```

Full stage detail: [`EDITORIAL_PIPELINES.md`](./EDITORIAL_PIPELINES.md).

### Quality-first publishing

Ship fewer, better entries. Gates (today and future):

- Content validation (`npm run validate`)
- Media / editorial / quality audits
- Source presence and confidence labels
- Style-guide teach-first checks
- Human sign-off on AI-assisted packages

Rankings, scores, and “trending” language stay honest — no overpromise.

### Future scalability

Architecture scales from **one editor** → **small team** → **large org** without redesign:

| Layer | Role | Scales by |
|-------|------|-----------|
| Knowledge (RC3-D) | Shared ontology | Additive profiles |
| Intelligence (RC3-C) | Evidence reasoning | Pure functions / rules |
| Workflows (RC3-B) | Job state machine | More jobs / roles |
| Providers (RC3-A) | Model swap | New vendor adapters |
| Admin OS (RC4) | Queues + assistants | Role-based dashboards |
| Public site | Read-only encyclopedia | SSG / future CMS read path |

Staffing adds **roles and queues**, not parallel architectures.

---

## 2. System map

```
┌─────────────────────────────────────────────────────────┐
│                 Editorial Operating System                │
│  Dashboards · Queues · Assistants · Approvals · Audit    │
└───────────────┬─────────────────────────────▲───────────┘
                │                             │
                ▼                             │
┌───────────────────────┐         ┌───────────┴───────────┐
│ RC3-A Providers/Prompts│         │ Public Website        │
│ RC3-B Packages/Workflow│────────▶│ lib/content (validated)│
│ RC3-C Intelligence     │         │ Search / SEO / Analytics│
│ RC3-D Knowledge        │         └───────────────────────┘
└───────────────────────┘
```

---

## 3. Content lifecycle (OS view)

| State | Meaning |
|-------|---------|
| Idea | Captured gap or pitch |
| Research | Evidence gathering |
| Draft | Structured field proposals |
| Review | Editorial / SEO / media |
| Published | Live on the site |
| Evergreen | Stable; light monitoring |
| Needs Update | Material change suspected |
| Historical | Important but no longer “current” |
| Archived | Retained, not actively expanded |

Transitions: [`PUBLISHING_WORKFLOW.md`](./PUBLISHING_WORKFLOW.md).

---

## 4. Knowledge flow

```
Providers (RC3-A)
    ↓
Knowledge (RC3-D)     ← taxonomy, eras, principles, platforms
    ↓
Research patterns
    ↓
Reasoning (RC3-C)     ← evidence, confidence, contradictions
    ↓
Workflow packages (RC3-B)
    ↓
Human editor
    ↓
Validation gates
    ↓
Website (public)
```

AI never jumps from provider output to the website.

---

## 5. Roles (future)

| Role | Focus |
|------|--------|
| Editor-in-chief | Standards, approvals, roadmap |
| Research editor | Sources, contradictions, timelines |
| Writer | Draft packages → content files |
| Media editor | URL verification, attribution |
| SEO editor | Titles, descriptions, linking |
| Ops | CI, deploy, Search Console, health |

One person may wear all hats initially; the OS still uses the same queues.

---

## 7. Future monetization support

Monetization plugs into **`lib/integrations`** flags and providers — never into editorial truth.

| Surface | Admin OS role | Public role |
|---------|---------------|-------------|
| Ads | Slot status / fill health | Render only if enabled |
| Affiliate | Product placeholders → live links | Disclosure + inactive until ready |
| Shop | Catalog sync status | Optional storefront later |
| Premium | Entitlement flags | Gated features if ever added |
| Newsletter | Campaign ops | Signup surfaces |
| Sponsors | Deal metadata (private) | Labeled sponsorship modules |
| Analytics | Already dual Vercel + GA4 | Measurement only |

**Rule:** Editorial queues and AI assistants stay independent of revenue. No “paid placement” in Research/Draft truth packages.

---

## 8. Future integrations

| Integration | OS use |
|-------------|--------|
| Search Console | SEO + Site Health dashboards |
| GA4 | Analytics dashboard (existing public wiring) |
| Vercel | Deploy, Analytics, Speed Insights |
| OpenAI / Anthropic / Gemini | `AIProvider` adapters (RC3-A) |
| GitHub | CI, PR publish path, Actions |
| Image providers | Media Assistant allowlists (Wikimedia, etc.) |
| Video providers | YouTube oEmbed verification |

Secrets stay server-only. Admin shows **connection status**, not raw keys.

---

## 9. Five-year vision

### Year 0–1 — One editor
- File-based `lib/content/`
- CI validate + build
- Docs + RC3 architecture
- Light admin: queues as checklists / CLI

### Year 1–2 — Small team (2–5)
- Auth’d admin shell
- One live provider
- Shared queues + audit log
- Gap/roadmap dashboards
- Still human publish via PR or gated write

### Year 2–3 — Editorial desk
- Role permissions
- Parallel review lanes
- Media verification staffing
- CMS or DB ingest **behind the same packages/gates**
- Knowledge graph powers related + search facets

### Year 3–5 — Large organization
- Multiple desks (Brainrot, Classic, Creators…)
- Formal style council
- SLA on Needs Update
- Assistants specialized per desk
- Public product still encyclopedia-first

**Architecture invariance:** Providers, knowledge, intelligence, workflows, human approval, validation, website — the same stack. Scale adds **people and queues**, not a second CMS ideology.

---

## 10. Non-goals (RC4-A)

- No admin pages or components
- No API routes
- No public UI changes
- No SDK installs
- No `lib/content` edits from this phase

RC4-A is **blueprint only**. Implementation is a later RC.

---

## 11. Success criteria (when built later)

1. An editor can clear a day’s queues without leaving the admin OS.
2. Every AI suggestion shows provenance + confidence + “requires human review.”
3. Publish always runs validation; failures block promotion.
4. Coverage and gaps are visible alongside writing work.
5. The public site remains encyclopedia-first, not a trend dashboard.

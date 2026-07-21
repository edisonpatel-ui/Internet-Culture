# Admin Platform

**RC4-A — blueprint only.** No routes, pages, or components yet.

Describes the future **internal** Admin AI platform for Internet Culture Hub: who uses it, how it is navigated, and how it stays separate from the public encyclopedia.

Parent: [`EDITORIAL_OPERATING_SYSTEM.md`](./EDITORIAL_OPERATING_SYSTEM.md)

---

## 1. Purpose

Give editors a single operating surface to:

- See work queues (research, draft, review, publish, update, media, SEO, quality)
- Invoke AI assistants without exposing them publicly
- Track coverage, gaps, roadmap, and site health
- Approve packages before anything touches `lib/content/`
- Monitor analytics and Search Console signals

The public site stays read-only for visitors. Admin is **staff-only**, never indexed.

---

## 2. Users

| User | Needs |
|------|--------|
| Solo editor | All queues + AI assist + validate/publish checklist |
| Research specialist | Research / fact-check / sources / contradictions |
| Writer | Draft queue + writing assistant + templates |
| Reviewer | Editorial / SEO / quality queues |
| Media editor | Media verification queue |
| Leadership | Overview, growth, coverage, roadmap |
| Engineer / ops | Site health, CI, integrations (read-mostly) |

Auth (future): private SSO or password gate; no public accounts product required for v1 admin.

---

## 3. Information architecture

```
Admin
├── Overview
├── Work
│   ├── Today's work
│   ├── Research Queue
│   ├── Draft Queue
│   ├── Review Queue
│   ├── Publishing Queue
│   ├── Update Queue
│   ├── Media Queue
│   ├── SEO Queue
│   └── Quality Queue
├── Intelligence
│   ├── Content Coverage
│   ├── Content Gaps
│   ├── Roadmap
│   └── AI Activity
├── Growth & Trust
│   ├── Analytics
│   ├── Search Console
│   └── Site Health
└── System
    ├── Integrations status
    ├── Provider settings (server-only)
    └── Audit log
```

Exact URLs are deferred; do **not** ship `/admin` until auth exists. `robots.ts` already reserves `/admin/` disallow as a future path.

---

## 4. Core concepts

### Job

An editorial unit of work with state from RC3-B (`EditorialState`): ResearchRequested → … → Published → NeedsUpdate.

### Package

Structured AI/human payloads: Research, Draft, Review, SEO, Update (RC3-B). Never raw “paste into production.”

### Queue

Filtered list of jobs by stage + priority + assignee.

### Assistant

Named AI capability that returns a package or recommendation set ([`AI_ASSISTANTS.md`](./AI_ASSISTANTS.md)).

### Gate

Hard check (validate, media audit, human checkbox) before stage advance.

---

## 5. Security & isolation

| Rule | Why |
|------|-----|
| Admin not in public nav | Product is encyclopedia, not CMS |
| `noindex` on all admin | Avoid Search Console noise |
| Server-only secrets | Provider keys never `NEXT_PUBLIC_*` |
| Audit log of approvals | Accountability |
| No AI auto-commit | Human publisher of record |

---

## 6. Relationship to public site

| Public | Admin |
|--------|-------|
| Consume validated content | Produce / maintain content |
| Search encyclopedia | Search queues + catalog |
| Rankings as honesty-first views | Rankings as editorial signals (optional) |
| No chatbot | Assistants behind auth |

Publishing bridge (future options): git PR from admin, or CMS write → generate TS/JSON → CI validate → deploy. Architecture assumes **validation before go-live** either way.

---

## 7. Monetization hooks (admin-visible, not public product)

Admin may later show status panels for ads, affiliate, shop, premium, newsletter, sponsors — using `lib/integrations` flags. Public pages only render monetization when deliberately enabled. See OS §8 in [`EDITORIAL_OPERATING_SYSTEM.md`](./EDITORIAL_OPERATING_SYSTEM.md).

---

## 8. Implementation phases (future)

1. **Docs** (RC4-A) — this blueprint  
2. **Auth + shell** — empty admin layout, no AI  
3. **Queues read-only** — jobs as data, no providers  
4. **Assistants wired** — one provider, human approve  
5. **Publish path** — gated write + CI  
6. **Analytics / GSC panels** — ops dashboards  

No phase skips human approval or validate gates.

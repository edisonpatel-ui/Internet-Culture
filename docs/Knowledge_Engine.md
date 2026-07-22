# Internet Culture Hub — Knowledge Engine v1

> **Status: Experimental · Phase 2+ · Future Development**
>
> The Knowledge Engine powers the **Experimental AI Lab** at `/admin/experimental`.
> It is **not** part of the Version 1 encyclopedia content workflow
> (Cursor research → `lib/content/` → commit).
> Architecture is fully preserved for future use.
> See `docs/EDITORIAL_OS_EXPERIMENTAL.md` and `docs/VERSION_1_CONTENT_WORKFLOW.md`.

## Purpose

The Knowledge Engine is responsible for discovering, verifying, organizing, and packaging knowledge before an article is ever generated.

It is **not** an article writer.

Its responsibility is to answer one question:

> "Do we know enough to confidently publish an encyclopedia article?"

Only after the answer is **yes** should article generation begin.

---

# Guiding Principle

> **The editor should almost never perform research.**

Before presenting anything to the editor, the Knowledge Engine must exhaust every reasonable method of finding evidence.

Research Review is a **verification** stage, not a research stage.

The editor should primarily:

- verify AI conclusions
- optionally make editorial adjustments
- approve publication

Never ask the editor to search for information that the engine can reasonably determine itself.

Never stop early because one source is missing.

Only after every stage has been attempted may a field become **Unknown**.

Success metric:

> The editor reviews nearly complete encyclopedia articles instead of completing unfinished research.

---

# Core Philosophy

The AI should perform as much research as reasonably possible before involving a human editor.

The editor's role is:

- reviewing conclusions
- making subjective editorial decisions
- approving publication

The editor should NOT:

- manually research dates
- manually determine categories
- manually find sources
- manually search for media
- manually build timelines
- manually discover aliases
- manually connect related entries

Those are responsibilities of the Knowledge Engine.

---

# Design Principles

## 1. Research before writing

Never generate articles directly from a topic.

Correct flow:

Topic → Knowledge Engine → Research Package → Article Generator

Never:

Topic → Article Generator

---

## 2. Evidence before confidence

Confidence must come from evidence — not from AI certainty.

Every major conclusion should be backed by one or more sources.

---

## 3. Fail honestly

If enough evidence cannot be found **after all stages are attempted**:

DO NOT invent dates, timelines, sources, cultural impact, creators, or media.

Instead: mark the field as **Unknown**.

If required fields remain Unknown: research fails. No draft. No publish.

---

## 4. Human approval is the final gate

The editor approves knowledge. The system performs implementation.

---

# Research Order (exhaust all)

Every topic passes through these stages. Never skip ahead to Unknown.

1. **Resolve the entity** — aliases, duplicates, ambiguous names, what it is NOT
2. **Search trusted sources** — official, Know Your Meme, Wikipedia, Wikimedia, academic, news (priority order)
3. **Search additional reliable sources**
4. **Search archives** when needed
5. **Search official creator pages**
6. **Search image/video sources** — best representative media (see Media Discovery)
7. **Search the existing ICH encyclopedia**
8. **Compare all evidence**
9. **Resolve conflicts**
10. **Build the most complete ResearchPackage possible**

Only after every stage has been attempted may a field become Unknown.

## Required vs optional (completion rules)

**Required** (may block article generation / Research Failed):

- Canonical entity · Title · Summary / basic explanation · Category · Slug · Minimum trustworthy sources

**Optional** (never Research Failed — set to Unknown with reason + sources searched):

- Exact creator / origin date / first upload · Full timeline · Complete cultural impact · Representative media · Extra aliases · Additional SEO

**Research Failed** only when the engine cannot identify the topic or cannot produce the minimum required package. Editors should usually see **Research Complete** with a Completeness summary.

---

# Media Discovery

Goal: find the **best representative media** for the article — not only a perfectly verified Wikimedia asset.

Search: official pages, creator media, Wikimedia, reliable screenshots, reference images, trusted image sources, live ICH media.

If a representative asset is found but cannot be fully verified, store it as:

```ts
verified: false
```

with attribution and source URL.

Do **not** leave articles without media simply because a fully verified asset could not be found.

---

# Editorial Workflow

Topic → Initial Assessment → (if qualifies) Knowledge Engine → Research Package → Research Review (verify) → Generate Encyclopedia Draft → Article Preview / Draft Studio → Approve → Publish → Live Encyclopedia (`lib/content`)

If Initial Assessment rejects the topic: show Topic Assessment only — no ResearchPackage, no Draft.

**Drafts** (`/admin/experimental/drafts`) is the experimental queue of unpublished encyclopedia articles generated from approved research. It is not a brainstorming tool and is not the Version 1 content workflow.

---

# Published Article Update

Published Article → Search → Open live article → Enter requested change → Knowledge Engine researches **only** the requested change → Updated article preview with highlighted differences → Approve → Automatically update `lib/content`, indexes, SEO, validation, and rebuild.

Admin route: `/updates`

---

# Success Criteria

A successful Knowledge Engine should:

- research independently
- verify information
- resolve ambiguity
- find trustworthy sources
- discover relationships
- generate complete research packages
- require minimal editor intervention
- fail honestly when knowledge is insufficient
- never fabricate completeness
- never ask editors to finish research the engine can do

---

# Long-Term Vision

The editor should spend nearly all of their time reviewing article quality rather than researching facts.

The Knowledge Engine should become the authoritative source of truth for every article before writing begins.

Every future AI model should plug into this pipeline rather than replacing it.

Code entrypoint: `lib/ai/knowledgeEngine/` (`runKnowledgeEngine`).

/**
 * Initial Assessment — gate before Knowledge Engine full research.
 *
 * Determines whether a topic qualifies for an ICH encyclopedia article.
 * Failed assessments never create a ResearchPackage or Draft.
 */

import { getAllEntriesSync } from "@/lib/services/entries";

export interface AssessmentCheck {
  id:
    | "distinct_concept"
    | "trustworthy_info"
    | "notable_for_ich"
    | "basic_summary_possible";
  label: string;
  pass: boolean;
  note: string;
}

export interface TopicAssessment {
  id: string;
  topic: string;
  assessedAt: string;
  /** True → proceed to Knowledge Engine. False → stop. */
  qualifies: boolean;
  confidence: number;
  checks: AssessmentCheck[];
  /** Human-readable assessment narrative. */
  explanation: string;
  rejectionReasons: string[];
  /** Shown when rejected — e.g. try again later. */
  recommendation: string;
  /** Suggested next step when qualifies. */
  nextStep: "knowledge_engine" | "rejected";
}

export interface InitialAssessmentInput {
  topic: string;
  notes?: string;
  /** Optional free-form context from research intake. */
  context?: string;
}

const CULTURE_SIGNALS =
  /\b(meme|slang|trend|tiktok|youtube|streamer|creator|viral|brainrot|aesthetic|challenge|copypasta|format|macro|gif|vine|tumblr|reddit|discord|gen\s*[zαa]|internet|online|fandom|stan|ship|edit|sound|audio|phrase|catchphrase)\b/i;

const REJECT_PATTERNS: Array<{ re: RegExp; reason: string }> = [
  {
    re: /^(asdf|test|hello|hi|stuff|things|random|idk|lorem|xxx+)$/i,
    reason: "Topic looks like a placeholder or nonsense string, not a culture concept.",
  },
  {
    re: /^(meme|slang|trend|tiktok|youtube|viral)$/i,
    reason: "Topic is a category label, not a distinct encyclopedia entity.",
  },
];

function slugify(topic: string): string {
  return (
    topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || ""
  );
}

function wordCount(topic: string): number {
  return topic.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Run Initial Assessment for a proposed encyclopedia topic.
 */
export function runInitialAssessment(
  input: InitialAssessmentInput,
): TopicAssessment {
  const topic = input.topic.trim();
  const context = `${input.notes ?? ""} ${input.context ?? ""}`.trim();
  const assessedAt = new Date().toISOString();
  const id = `ta_${Date.now().toString(36)}`;

  const checks: AssessmentCheck[] = [];
  const rejectionReasons: string[] = [];

  // Empty topic
  if (!topic) {
    return {
      id,
      topic: "",
      assessedAt,
      qualifies: false,
      confidence: 0.95,
      checks: [
        {
          id: "distinct_concept",
          label: "Distinct internet culture concept",
          pass: false,
          note: "No topic provided.",
        },
        {
          id: "trustworthy_info",
          label: "Enough trustworthy public information",
          pass: false,
          note: "Cannot assess sources without a topic.",
        },
        {
          id: "notable_for_ich",
          label: "Notable enough for ICH",
          pass: false,
          note: "Empty topics are never notable.",
        },
        {
          id: "basic_summary_possible",
          label: "Basic summary from reliable sources",
          pass: false,
          note: "No summary possible.",
        },
      ],
      explanation: "Topic Assessment rejected: empty topic.",
      rejectionReasons: ["Topic is required."],
      recommendation: "Enter a specific internet culture concept and try again.",
      nextStep: "rejected",
    };
  }

  // Distinct concept
  let distinctPass = true;
  let distinctNote = `"${topic}" appears to name a specific culture concept.`;
  for (const p of REJECT_PATTERNS) {
    if (p.re.test(topic)) {
      distinctPass = false;
      distinctNote = p.reason;
      rejectionReasons.push(p.reason);
      break;
    }
  }
  if (distinctPass && topic.length < 2) {
    distinctPass = false;
    distinctNote = "Topic is too short to identify a distinct concept.";
    rejectionReasons.push(distinctNote);
  }
  if (distinctPass && wordCount(topic) === 1 && topic.length < 4) {
    distinctPass = false;
    distinctNote =
      "Single ultra-short token is unlikely to be a distinct encyclopedia entity.";
    rejectionReasons.push(distinctNote);
  }
  checks.push({
    id: "distinct_concept",
    label: "Distinct internet culture concept",
    pass: distinctPass,
    note: distinctNote,
  });

  // Trustworthy public information (heuristic — mock engine)
  const catalog = getAllEntriesSync();
  const slug = slugify(topic);
  const exact = catalog.find(
    (e) =>
      e.slug === slug || e.title.toLowerCase() === topic.toLowerCase(),
  );
  const related = catalog.filter((e) => {
    const hay = `${e.title} ${e.slug} ${(e.tags ?? []).join(" ")}`.toLowerCase();
    const q = topic.toLowerCase();
    return (
      hay.includes(q) ||
      q.split(/\s+/).some((w) => w.length > 3 && hay.includes(w))
    );
  });

  let infoPass = true;
  let infoNote =
    "Initial scan suggests enough public culture documentation may exist to attempt a minimum article.";
  if (exact) {
    infoPass = false;
    infoNote = `A live encyclopedia entry already exists (/${exact.category}/${exact.slug}). Use Published Article Update instead of a new research job.`;
    rejectionReasons.push(infoNote);
  } else if (
    !CULTURE_SIGNALS.test(topic) &&
    !CULTURE_SIGNALS.test(context) &&
    related.length === 0 &&
    wordCount(topic) === 1
  ) {
    infoPass = false;
    infoNote =
      "No clear internet-culture signal and no related ICH coverage — trustworthy public documentation looks too thin for a minimum article right now.";
    rejectionReasons.push(infoNote);
  } else if (related.length > 0) {
    infoNote = `Related ICH coverage found (${related
      .slice(0, 3)
      .map((e) => e.slug)
      .join(", ")}) — suggests documentable culture context.`;
  }
  checks.push({
    id: "trustworthy_info",
    label: "Enough trustworthy public information",
    pass: infoPass,
    note: infoNote,
  });

  // Notable for ICH
  let notablePass = true;
  let notableNote =
    "Topic appears within ICH’s internet-culture scope (meme, slang, trend, creator, event, or adjacent).";
  if (
    /^(my |our |personal |private )/i.test(topic) ||
    /\b(diary|journal|homework|resume)\b/i.test(topic)
  ) {
    notablePass = false;
    notableNote =
      "Topic reads as personal/private material, not public internet culture.";
    rejectionReasons.push(notableNote);
  }
  if (
    notablePass &&
    !CULTURE_SIGNALS.test(topic) &&
    !CULTURE_SIGNALS.test(context) &&
    related.length === 0 &&
    !exact
  ) {
    // Soft fail only if also thin on info — already handled; keep notable if multi-word proper concept
    if (wordCount(topic) >= 2) {
      notableNote =
        "Multi-word concept without explicit culture keywords — may still be notable; proceed with caution.";
    } else {
      notablePass = false;
      notableNote =
        "Not clearly notable for an internet-culture encyclopedia without stronger culture signals.";
      rejectionReasons.push(notableNote);
    }
  }
  checks.push({
    id: "notable_for_ich",
    label: "Notable enough for ICH",
    pass: notablePass,
    note: notableNote,
  });

  // Basic summary possible
  let summaryPass = true;
  let summaryNote =
    "A basic encyclopedia summary can likely be drafted from public culture sources once research runs.";
  if (!distinctPass || !infoPass) {
    summaryPass = false;
    summaryNote =
      "Cannot construct a reliable basic summary until the topic is distinct and documentable.";
    if (!rejectionReasons.includes(summaryNote)) {
      rejectionReasons.push(summaryNote);
    }
  }
  checks.push({
    id: "basic_summary_possible",
    label: "Basic summary from reliable sources",
    pass: summaryPass,
    note: summaryNote,
  });

  const qualifies = checks.every((c) => c.pass);
  const passed = checks.filter((c) => c.pass).length;
  const confidence = qualifies
    ? Math.min(0.9, 0.55 + passed * 0.08)
    : Math.max(0.35, 0.85 - (4 - passed) * 0.12);

  const explanation = qualifies
    ? `Topic Assessment: "${topic}" qualifies for encyclopedia research. All intake checks passed — proceed to the Knowledge Engine.`
    : `Topic Assessment: "${topic}" does not qualify for an encyclopedia article at this time. ${rejectionReasons[0] ?? "One or more intake checks failed."}`;

  return {
    id,
    topic,
    assessedAt,
    qualifies,
    confidence,
    checks,
    explanation,
    rejectionReasons: qualifies ? [] : [...new Set(rejectionReasons)],
    recommendation: qualifies
      ? "Proceed to Knowledge Engine research."
      : "Do not create a ResearchPackage or Draft. Try again later if more trustworthy public information becomes available, or refine the topic to a distinct internet-culture concept.",
    nextStep: qualifies ? "knowledge_engine" : "rejected",
  };
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type ReactNode } from "react";
import type { ApprovedResearch, ResearchPackage } from "@/lib/ai/packages";
import {
  EDITORIAL_AUTO_ACCEPT_THRESHOLD,
  allCategoryOptions,
  autoAcceptedDecisions,
  buildEditorialDecisions,
  decisionsNeedingEditorAction,
  formatConfidencePercent,
  type EditorialDecision,
  type EditorialDecisionOutcome,
} from "@/lib/ai/research/editorialDecisions";
import { approveResearchAction } from "@/lib/admin/researchReview/actions";
import { generateDraftFromApprovedAction } from "@/lib/admin/draftGeneration/actions";

interface ResearchReviewWorkspaceProps {
  researchPackage: ResearchPackage;
  existingApproval?: ApprovedResearch | null;
  existingDraftId?: string | null;
}

function Section({
  title,
  children,
  description,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
      <h2 className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      )}
      <div className="mt-3">{children}</div>
    </section>
  );
}

type ChoiceState = {
  action: "keep" | "alternative" | "other";
  chosenValue: string;
  chosenLabel: string;
};

function DecisionCard({
  decision,
  choice,
  onKeep,
  onAlternative,
  onOpenOther,
  onPickOther,
  showOtherPicker,
  otherOptions,
}: {
  decision: EditorialDecision;
  choice: ChoiceState;
  onKeep: () => void;
  onAlternative: (opt: { value: string; label: string }) => void;
  onOpenOther: () => void;
  onPickOther: (opt: { value: string; label: string }) => void;
  showOtherPicker: boolean;
  otherOptions: Array<{ id: string; label: string; value: string }>;
}) {
  return (
    <article className="rounded-lg border border-amber-900/40 bg-amber-950/10 p-4">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-100">{decision.label}</h3>
        <p className="text-xs text-amber-200/80">
          Confidence: {formatConfidencePercent(decision.confidence)}
        </p>
      </header>

      <p className="mt-3 text-sm text-zinc-200">
        <span className="text-zinc-500">AI recommends: </span>
        <span className="font-medium text-white">
          {decision.recommendation.label}
        </span>
      </p>

      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wide text-zinc-500">
          Reasoning
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
          {decision.reasoning}
        </p>
      </div>

      {decision.alternatives.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-wide text-zinc-500">
            Alternative
            {decision.alternatives.length > 1 ? "s" : ""}
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            {decision.alternatives.map((a) => a.label).join(" · ")}
          </p>
        </div>
      )}

      <p className="mt-3 text-xs text-zinc-500">
        If you do nothing: {decision.ifNoAction}
      </p>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-wide text-zinc-500">
          Actions
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onKeep}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
              choice.action === "keep"
                ? "border-emerald-700 bg-emerald-950/50 text-emerald-200"
                : "border-zinc-600 text-zinc-200 hover:border-zinc-400"
            }`}
          >
            Keep recommendation
          </button>
          {decision.alternatives.map((alt) => (
            <button
              key={alt.id}
              type="button"
              onClick={() => onAlternative(alt)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                choice.action === "alternative" &&
                choice.chosenValue === alt.value
                  ? "border-violet-700 bg-violet-950/40 text-violet-200"
                  : "border-zinc-600 text-zinc-200 hover:border-zinc-400"
              }`}
            >
              Choose {alt.label}
            </button>
          ))}
          {otherOptions.length > 0 && (
            <button
              type="button"
              onClick={onOpenOther}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                choice.action === "other" || showOtherPicker
                  ? "border-zinc-500 bg-zinc-900 text-zinc-100"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              Choose different…
            </button>
          )}
        </div>

        {showOtherPicker && otherOptions.length > 0 && (
          <label className="mt-3 block text-[11px] uppercase tracking-wide text-zinc-500">
            Choose different option
            <select
              value={choice.action === "other" ? choice.chosenValue : ""}
              onChange={(e) => {
                const opt = otherOptions.find((o) => o.value === e.target.value);
                if (opt) onPickOther(opt);
              }}
              className="mt-1.5 block w-full max-w-xs rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm normal-case text-zinc-100"
            >
              <option value="" disabled>
                Select…
              </option>
              {otherOptions.map((o) => (
                <option key={o.id} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )}

        <p className="mt-3 text-xs text-zinc-500">
          Current choice:{" "}
          <span className="text-zinc-300">{choice.chosenLabel}</span>
        </p>
      </div>
    </article>
  );
}

/**
 * Structured Research Review — AI recommendations + click choices.
 * High-confidence decisions auto-accept. No free-text research homework.
 */
export function ResearchReviewWorkspace({
  researchPackage: pkg,
  existingApproval,
  existingDraftId,
}: ResearchReviewWorkspaceProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editorNotes, setEditorNotes] = useState(
    existingApproval?.editorNotes.join("\n") ?? "",
  );
  const [showBrief, setShowBrief] = useState(false);
  const [otherPickerId, setOtherPickerId] = useState<string | null>(null);

  const decisions = useMemo(() => buildEditorialDecisions(pkg), [pkg]);
  const needsAction = useMemo(
    () => decisionsNeedingEditorAction(decisions),
    [decisions],
  );
  const autoAccepted = useMemo(
    () => autoAcceptedDecisions(decisions),
    [decisions],
  );

  const [choices, setChoices] = useState<Record<string, ChoiceState>>(() => {
    const initial: Record<string, ChoiceState> = {};
    for (const d of decisions) {
      initial[d.id] = {
        action: "keep",
        chosenValue: d.recommendation.value,
        chosenLabel: d.recommendation.label,
      };
    }
    return initial;
  });

  function setKeep(decision: EditorialDecision) {
    setOtherPickerId(null);
    setChoices((prev) => ({
      ...prev,
      [decision.id]: {
        action: "keep",
        chosenValue: decision.recommendation.value,
        chosenLabel: decision.recommendation.label,
      },
    }));
  }

  function setAlternative(
    decision: EditorialDecision,
    opt: { value: string; label: string },
  ) {
    setOtherPickerId(null);
    setChoices((prev) => ({
      ...prev,
      [decision.id]: {
        action: "alternative",
        chosenValue: opt.value,
        chosenLabel: opt.label,
      },
    }));
  }

  function setOther(
    decision: EditorialDecision,
    opt: { value: string; label: string },
  ) {
    setOtherPickerId(decision.id);
    setChoices((prev) => ({
      ...prev,
      [decision.id]: {
        action: "other",
        chosenValue: opt.value,
        chosenLabel: opt.label,
      },
    }));
  }

  function buildOutcomes(): EditorialDecisionOutcome[] {
    // Record outcomes for decisions the editor touched OR that needed action
    // (defaults to keep). Auto-accepted ones are implicit.
    return needsAction.map((d) => {
      const c = choices[d.id] ?? {
        action: "keep" as const,
        chosenValue: d.recommendation.value,
        chosenLabel: d.recommendation.label,
      };
      return {
        decisionId: d.id,
        action: c.action,
        chosenValue: c.chosenValue,
        chosenLabel: c.chosenLabel,
      };
    });
  }

  function onApprove() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await approveResearchAction({
        packageId: pkg.id,
        decisionOutcomes: buildOutcomes(),
        editorNotes,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage(`Research approved (${result.approvedId}).`);
      router.refresh();
    });
  }

  function onApproveAndGenerate() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await approveResearchAction({
        packageId: pkg.id,
        decisionOutcomes: buildOutcomes(),
        editorNotes,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const draft = await generateDraftFromApprovedAction(result.approvedId);
      if (!draft.ok) {
        setError(draft.error);
        setMessage(`Research approved (${result.approvedId}).`);
        router.refresh();
        return;
      }
      router.push(`/article-preview/${draft.draftId}`);
      router.refresh();
    });
  }

  const thresholdPct = Math.round(EDITORIAL_AUTO_ACCEPT_THRESHOLD * 100);

  return (
    <div className="space-y-5">
      <header className="border-b border-zinc-800 pb-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          Research Review
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          {pkg.title}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          AI already finished research. Review only ambiguous decisions — then
          generate the article.
        </p>
        {pkg.completeness && (
          <p className="mt-2 text-xs text-zinc-500">
            Completeness {Math.round(pkg.completeness.score * 100)}%
            {" · "}
            Auto-accept ≥ {thresholdPct}% confidence
          </p>
        )}
        {existingApproval && (
          <p className="mt-2 text-xs text-emerald-400/90">
            Already approved as {existingApproval.id}. Re-approve replaces it
            (in-memory).
          </p>
        )}
      </header>

      {needsAction.length === 0 ? (
        <Section
          title="No ambiguous decisions"
          description="Every AI recommendation cleared the confidence threshold. You can approve without changing anything."
        >
          <p className="text-sm text-zinc-400">
            Ideal path: approve → generate article → review in Article Preview →
            publish prep.
          </p>
        </Section>
      ) : (
        <Section
          title="Decisions that need you"
          description="AI always recommends first. Pick Keep, an alternative, or a different structured option — no free-text research answers."
        >
          <div className="space-y-4">
            {needsAction.map((decision) => {
              const choice = choices[decision.id] ?? {
                action: "keep" as const,
                chosenValue: decision.recommendation.value,
                chosenLabel: decision.recommendation.label,
              };
              const otherOptions =
                decision.kind === "category"
                  ? allCategoryOptions(
                      decision.recommendation.value as
                        | "meme"
                        | "slang"
                        | "trend"
                        | "brainrot"
                        | "event"
                        | "creator",
                    ).filter(
                      (o) =>
                        !decision.alternatives.some((a) => a.value === o.value),
                    )
                  : [];

              return (
                <DecisionCard
                  key={decision.id}
                  decision={decision}
                  choice={choice}
                  onKeep={() => setKeep(decision)}
                  onAlternative={(opt) => setAlternative(decision, opt)}
                  onOpenOther={() => setOtherPickerId(decision.id)}
                  onPickOther={(opt) => setOther(decision, opt)}
                  showOtherPicker={otherPickerId === decision.id}
                  otherOptions={otherOptions}
                />
              );
            })}
          </div>
        </Section>
      )}

      {autoAccepted.length > 0 && (
        <Section
          title="Automatically accepted"
          description={`Recommendations at or above ${thresholdPct}% confidence — no editor click required.`}
        >
          <ul className="space-y-2">
            {autoAccepted.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <span className="text-zinc-300">
                  <span className="text-zinc-500">{d.label}: </span>
                  {d.recommendation.label}
                </span>
                <span className="text-xs text-emerald-400/80">
                  {formatConfidencePercent(d.confidence)} · auto
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Research brief">
        <button
          type="button"
          onClick={() => setShowBrief((v) => !v)}
          className="text-sm text-zinc-300 underline hover:text-white"
        >
          {showBrief ? "Hide research summary" : "Show research summary"}
        </button>
        {showBrief && (
          <div className="mt-4 space-y-4 text-sm text-zinc-400">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Summary
              </p>
              <p className="mt-1 text-zinc-300">{pkg.summary}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Origin
              </p>
              <p className="mt-1 text-zinc-300">{pkg.origin}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Timeline
              </p>
              <ul className="mt-1 space-y-1">
                {pkg.timeline.map((t, i) => (
                  <li key={`${t.when}-${i}`}>
                    <span className="text-zinc-500">{t.when}: </span>
                    {t.what}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">
                Sources ({pkg.sources.length})
              </p>
              <ul className="mt-1 space-y-1">
                {pkg.sources.slice(0, 6).map((s, i) => (
                  <li key={`${s.title}-${i}`}>{s.title}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Section>

      <Section
        title="Editor comment"
        description="Optional. Only for genuine editorial notes — not for answering research questions."
      >
        <textarea
          value={editorNotes}
          onChange={(e) => setEditorNotes(e.target.value)}
          rows={2}
          placeholder="Optional comment for the draft…"
          className="w-full resize-y rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-600"
        />
      </Section>

      <section className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          Continue
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          Approving accepts AI recommendations (and any choices above). Does not
          write <code className="text-zinc-300">lib/content</code>.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={onApproveAndGenerate}
            className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
          >
            {pending ? "Working…" : "Approve & generate article"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={onApprove}
            className="rounded-md border border-zinc-600 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900 disabled:opacity-50"
          >
            Approve research only
          </button>
          {existingDraftId && (
            <Link
              href={`/article-preview/${existingDraftId}`}
              className="rounded-md border border-zinc-600 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Open article preview
            </Link>
          )}
        </div>
        {message && (
          <p className="mt-2 text-xs text-emerald-400/90">{message}</p>
        )}
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        {existingApproval && existingApproval.changesMade.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-zinc-500">
            {existingApproval.changesMade.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

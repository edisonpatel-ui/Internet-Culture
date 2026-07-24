"use client";

import { useId, useState } from "react";
import {
  FEEDBACK_CATEGORY_OPTIONS,
  type FeedbackCategory,
} from "@/lib/feedback/types";
import { submitFeedback } from "@/lib/feedback/submitFeedback";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-secondary)]/30";

const labelClass = "block text-sm font-medium text-zinc-300";

export function FeedbackForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setPending(true);
    setStatus("idle");
    setMessage("");

    const result = await submitFeedback({
      category: String(data.get("category") ?? "") as FeedbackCategory,
      articlePage: String(data.get("articlePage") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
    });

    setPending(false);

    if (result.ok) {
      setStatus("success");
      setMessage("Thanks — your feedback was sent.");
      form.reset();
      return;
    }

    setStatus("error");
    setMessage(result.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card space-y-5 p-6 sm:p-8"
      aria-labelledby={`${formId}-heading`}
      noValidate
    >
      <div>
        <h2
          id={`${formId}-heading`}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Send feedback
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Tell us what to fix, add, or improve. Submissions are reviewed by the
          editorial team.
        </p>
      </div>

      <div>
        <label htmlFor={`${formId}-category`} className={labelClass}>
          Category{" "}
          <span className="text-zinc-500" aria-hidden>
            *
          </span>
        </label>
        <select
          id={`${formId}-category`}
          name="category"
          required
          className={fieldClass}
          defaultValue="problem"
          disabled={pending}
        >
          {FEEDBACK_CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${formId}-articlePage`} className={labelClass}>
          Article / Page{" "}
          <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <input
          id={`${formId}-articlePage`}
          name="articlePage"
          type="text"
          autoComplete="off"
          maxLength={500}
          className={fieldClass}
          disabled={pending}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-subject`} className={labelClass}>
          Subject{" "}
          <span className="text-zinc-500" aria-hidden>
            *
          </span>
        </label>
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          required
          maxLength={160}
          autoComplete="off"
          className={fieldClass}
          disabled={pending}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Message{" "}
          <span className="text-zinc-500" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          maxLength={3500}
          className={`${fieldClass} min-h-[9rem] resize-y`}
          disabled={pending}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            className={fieldClass}
            disabled={pending}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email{" "}
            <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            className={fieldClass}
            disabled={pending}
          />
        </div>
      </div>

      {status !== "idle" ? (
        <p
          role="status"
          className={
            status === "success"
              ? "text-sm text-emerald-400/90"
              : "text-sm text-rose-300/90"
          }
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

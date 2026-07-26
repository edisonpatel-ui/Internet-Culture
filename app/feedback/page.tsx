import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { FeedbackTopicCards } from "@/components/feedback/FeedbackTopicCards";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Feedback & Suggestions",
  description: `Help improve ${SITE_NAME} — report problems, request articles, and share suggestions that make the encyclopedia more accurate and complete.`,
  path: "/feedback",
});

const FAQ_ITEMS = [
  {
    question: "How are articles reviewed?",
    answer:
      "Published entries are researched against sources, checked for category fit, and written for clarity. Corrections and updates are reviewed the same way — claims need a traceable source before they replace existing text.",
  },
  {
    question: "How are article requests prioritized?",
    answer:
      "Requests are weighed by cultural relevance, how often the topic comes up, whether a reliable origin can be documented, and whether the catalog already covers something too similar. High-demand gaps and clear origin stories usually move first.",
  },
  {
    question: "Are suggestions guaranteed to be published?",
    answer:
      "No. Every submission is read, but not every idea becomes an entry. Some topics lack durable sources, duplicate existing pages, or fall outside the encyclopedia’s scope. When a suggestion is declined, it still helps clarify what readers are looking for.",
  },
  {
    question: "How often is content updated?",
    answer:
      "The catalog is maintained on an ongoing basis. New entries and revisions land as research is finished — there is no fixed weekly quota. Freshness labels and Current Popularity scores are adjusted when a topic’s place in today’s internet clearly changes.",
  },
] as const;

export default function FeedbackPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mb-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Help Improve {SITE_NAME}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          This encyclopedia is actively maintained. Reader feedback helps
          improve accuracy, fill gaps in the catalog, and make topics easier to
          find — so the next person who looks something up gets a clearer
          answer.
        </p>
      </header>

      <section
        aria-labelledby="feedback-types-heading"
        className="mb-10"
      >
        <h2
          id="feedback-types-heading"
          className="mb-6 text-2xl font-bold text-white"
        >
          What you can send
        </h2>
        <FeedbackTopicCards />
      </section>

      <section
        id="send-feedback"
        aria-label="Feedback form"
        className="mb-14 scroll-mt-24"
      >
        <FeedbackForm />
      </section>

      <section
        aria-labelledby="feedback-faq-heading"
        className="mb-12 glass-card p-6 sm:p-8"
      >
        <h2
          id="feedback-faq-heading"
          className="mb-6 text-2xl font-bold text-white"
        >
          FAQ
        </h2>
        <dl className="space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question}>
              <dt className="text-base font-semibold text-white">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="glass-card p-6 text-center sm:p-8">
        <h2 className="mb-3 text-xl font-bold text-white">
          Every submission is reviewed
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400">
          Reports, article requests, and suggestions are read by the editorial
          team and used to improve the encyclopedia over time — whether that
          means fixing a detail, expanding an entry, or adding a missing topic.
          For copyright or privacy matters, use the{" "}
          <Link
            href="/contact"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Contact
          </Link>{" "}
          page instead.
        </p>
      </section>
    </main>
  );
}

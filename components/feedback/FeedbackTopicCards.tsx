import { FEEDBACK_TOPIC_CARDS } from "@/lib/feedback/topics";

/** Read-only topic cards — the unified form handles submission. */
export function FeedbackTopicCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FEEDBACK_TOPIC_CARDS.map((card) => (
        <article key={card.id} className="glass-card flex flex-col p-6 sm:p-7">
          <h2 className="text-xl font-bold text-white">{card.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {card.description}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
            {card.examples.map((example) => (
              <li key={example} className="flex gap-2">
                <span className="text-zinc-600" aria-hidden>
                  ·
                </span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

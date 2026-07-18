interface ResultsCountProps {
  total: number;
  /** Display noun as shown in the UI (usually already plural), e.g. "memes". */
  noun?: string;
}

export function ResultsCount({ total, noun = "results" }: ResultsCountProps) {
  if (total === 0) {
    return <p className="text-sm text-zinc-500">0 {noun}</p>;
  }

  return (
    <p className="text-sm text-zinc-400">
      <span className="font-medium text-zinc-200">{total}</span> {noun}
    </p>
  );
}

interface ResultsCountProps {
  total: number;
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

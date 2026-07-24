import { cn, getScoreBarColor, getScoreColor } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  icon?: string;
  compact?: boolean;
  /** When set, shown instead of the numeric score (e.g. "Unknown"). */
  displayValue?: string;
}

export function ScoreBar({
  label,
  score,
  icon,
  compact,
  displayValue,
}: ScoreBarProps) {
  const shown = displayValue ?? String(score);
  const barWidth = displayValue ? 0 : score;
  return (
    <div className={cn("space-y-1", compact && "space-y-0.5")}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">
          {icon && (
            <span className="mr-1" aria-hidden>
              {icon}
            </span>
          )}
          {label}
        </span>
        <span
          className={cn(
            "font-semibold tabular-nums",
            displayValue ? "text-zinc-500" : getScoreColor(score),
          )}
        >
          {shown}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            displayValue ? "bg-zinc-700/40" : getScoreBarColor(score),
          )}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

interface ScoreGroupProps {
  relevance: number;
  influence: number;
  cringe: number;
  brainrot: number;
  compact?: boolean;
  showAll?: boolean;
}

export function ScoreGroup({
  relevance,
  influence,
  cringe,
  brainrot,
  compact,
  showAll = true,
}: ScoreGroupProps) {
  return (
    <div className={cn("space-y-2", compact && "space-y-1.5")}>
      <ScoreBar label="Relevance" score={relevance} icon="📈" compact={compact} />
      {showAll && (
        <>
          <ScoreBar label="Influence" score={influence} icon="⚡" compact={compact} />
          <ScoreBar label="Cringe" score={cringe} icon="😬" compact={compact} />
          <ScoreBar label="Brainrot" score={brainrot} icon="🧠" compact={compact} />
        </>
      )}
    </div>
  );
}

import { cn, getScoreBarColor, getScoreColor } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  icon?: string;
  compact?: boolean;
}

export function ScoreBar({ label, score, icon, compact }: ScoreBarProps) {
  return (
    <div className={cn("space-y-1", compact && "space-y-0.5")}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </span>
        <span className={cn("font-semibold tabular-nums", getScoreColor(score))}>
          {score}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            getScoreBarColor(score)
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

interface ScoreGroupProps {
  relevance: number;
  brainrot: number;
  cringe: number;
  compact?: boolean;
  showAll?: boolean;
}

export function ScoreGroup({
  relevance,
  brainrot,
  cringe,
  compact,
  showAll = true,
}: ScoreGroupProps) {
  return (
    <div className={cn("space-y-2", compact && "space-y-1.5")}>
      <ScoreBar label="Relevance" score={relevance} icon="📈" compact={compact} />
      {showAll && (
        <>
          <ScoreBar label="Brainrot" score={brainrot} icon="🧠" compact={compact} />
          <ScoreBar label="Cringe" score={cringe} icon="😬" compact={compact} />
        </>
      )}
    </div>
  );
}

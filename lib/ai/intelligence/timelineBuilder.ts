/**
 * Timeline builder — historical event structures with uncertain dates (RC3-C).
 */

export type DatePrecision =
  | "day"
  | "month"
  | "year"
  | "approx"
  | "unknown"
  | "range";

export type TimelineImportance = "critical" | "major" | "minor" | "context";

export interface TimelineSourceRef {
  title: string;
  url?: string;
}

export interface TimelineEvent {
  /** Free-form date label (e.g. "2013-12", "c. 2010", "unknown"). */
  date: string;
  precision: DatePrecision;
  description: string;
  /** 0–1 confidence in dating + description. */
  confidence: number;
  sources: TimelineSourceRef[];
  importance: TimelineImportance;
  /** End date when precision is "range". */
  dateEnd?: string;
}

export interface TimelineBuildResult {
  events: TimelineEvent[];
  /** Events with unknown/approx dating that need human attention. */
  uncertainCount: number;
  notes: string[];
}

/**
 * Assemble a timeline; sorts known year-leading dates when possible.
 * Does not invent events.
 */
export function buildTimeline(
  events: TimelineEvent[],
  notes: string[] = [],
): TimelineBuildResult {
  const sorted = [...events].sort((a, b) => {
    const ay = parseInt(a.date, 10);
    const by = parseInt(b.date, 10);
    if (Number.isFinite(ay) && Number.isFinite(by)) return ay - by;
    if (Number.isFinite(ay)) return -1;
    if (Number.isFinite(by)) return 1;
    return 0;
  });

  return {
    events: sorted,
    uncertainCount: sorted.filter(
      (e) =>
        e.precision === "unknown" ||
        e.precision === "approx" ||
        e.confidence < 0.5,
    ).length,
    notes,
  };
}

export function createTimelineEvent(
  event: TimelineEvent,
): TimelineEvent {
  return {
    ...event,
    confidence: Math.max(0, Math.min(1, event.confidence)),
  };
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}K`;
  return views.toString();
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  if (score >= 40) return "text-orange-400";
  return "text-zinc-400";
}

export function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-zinc-500";
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    meme: "Meme",
    slang: "Slang",
    trend: "Trend",
    brainrot: "Brainrot",
    event: "Event",
  };
  return labels[category] ?? category;
}

export function getTrendDirectionLabel(direction: string): string {
  const labels: Record<string, string> = {
    rising: "Rising",
    declining: "Declining",
    stable: "Stable",
    new: "New",
  };
  return labels[direction] ?? direction;
}

export function getTrendDirectionColor(direction: string): string {
  const colors: Record<string, string> = {
    rising: "text-emerald-400",
    declining: "text-red-400",
    stable: "text-zinc-400",
    new: "text-violet-400",
  };
  return colors[direction] ?? "text-zinc-400";
}

export function getTrendDirectionIcon(direction: string): string {
  const icons: Record<string, string> = {
    rising: "↑",
    declining: "↓",
    stable: "→",
    new: "★",
  };
  return icons[direction] ?? "—";
}

export function getDetailHref(category: string, slug: string): string {
  if (category === "meme") return `/memes/${slug}`;
  if (category === "slang") return `/slang/${slug}`;
  if (category === "event") return `/events/${slug}`;
  return `/trending/${slug}`;
}

export function getOverallScore(scores: {
  relevance: number;
  brainrot: number;
  cringe: number;
  popularity?: number;
  virality?: number;
  influence?: number;
}): number {
  const base = scores.relevance * 0.5 + scores.brainrot * 0.3 + scores.cringe * 0.2;
  return Math.min(100, Math.round(base));
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

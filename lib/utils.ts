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

export function getDetailHref(
  category: string,
  slug: string
): string {
  if (category === "meme") return `/memes/${slug}`;
  if (category === "slang") return `/slang/${slug}`;
  return `/trending#${slug}`;
}

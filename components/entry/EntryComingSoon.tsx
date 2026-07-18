export interface ComingSoonItem {
  title: string;
  description: string;
}

const DEFAULT_ITEMS: ComingSoonItem[] = [
  {
    title: "More media",
    description: "Additional images and clips for this entry.",
  },
  {
    title: "Expanded timeline",
    description: "More dated milestones as sources allow.",
  },
  {
    title: "Reader notes",
    description: "Optional community examples — not live yet.",
  },
  {
    title: "Longer background",
    description: "Extra context when the short entry isn't enough.",
  },
];

interface EntryComingSoonProps {
  items?: ComingSoonItem[];
  /** Number of columns in the grid. Defaults to 2. */
  cols?: 2 | 3;
}

export function EntryComingSoon({
  items = DEFAULT_ITEMS,
  cols = 2,
}: EntryComingSoonProps) {
  const colClass = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`mb-8 grid gap-4 ${colClass}`}>
      {items.map((item) => (
        <div
          key={item.title}
          className="glass-card border-dashed border-white/10 p-5"
        >
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Coming Soon
          </p>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

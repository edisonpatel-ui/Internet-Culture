export const PLATFORM_META: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  youtube: { label: "YouTube", icon: "▶", color: "text-red-400" },
  tiktok: { label: "TikTok", icon: "♪", color: "text-pink-400" },
  twitter: { label: "X (Twitter)", icon: "✕", color: "text-sky-400" },
  instagram: { label: "Instagram", icon: "◆", color: "text-fuchsia-400" },
  reddit: { label: "Reddit", icon: "◎", color: "text-orange-400" },
  twitch: { label: "Twitch", icon: "●", color: "text-purple-400" },
  wikimedia: {
    label: "Wikimedia Commons",
    icon: "⊕",
    color: "text-emerald-400",
  },
  knowyourmeme: {
    label: "Know Your Meme",
    icon: "◈",
    color: "text-yellow-400",
  },
  original: { label: "Original Upload", icon: "↑", color: "text-zinc-400" },
  other: { label: "External Source", icon: "↗", color: "text-zinc-400" },
};

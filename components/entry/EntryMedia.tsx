import { MediaEmbedPlayer } from "@/components/media/MediaEmbed";
import type { MediaEmbed } from "@/types";

interface EntryMediaProps {
  embeds?: MediaEmbed[];
}

/**
 * Renders embedded media (YouTube iframes, link cards) when the entry has mediaEmbeds.
 * Returns null when no embeds exist — safe to always include in detail pages.
 */
export function EntryMedia({ embeds }: EntryMediaProps) {
  if (!embeds || embeds.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-white">Media</h2>
      <div className="space-y-4">
        {embeds.map((embed, i) => (
          <MediaEmbedPlayer key={i} embed={embed} />
        ))}
      </div>
    </div>
  );
}

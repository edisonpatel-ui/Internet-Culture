import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Attribution Guidelines",
  description: `How ${SITE_NAME} credits media, sources, and third-party material in encyclopedia entries.`,
  path: "/attribution",
});

export default function AttributionPage() {
  return (
    <LegalPageShell
      title="Attribution Guidelines"
      description={`How ${SITE_NAME} credits sources and media used in encyclopedia entries.`}
      lastUpdated="2026-07-22"
    >
      <LegalSection title="Purpose">
        <p>
          Clear attribution helps readers verify claims and respects creators.
          These guidelines describe our editorial practice for sources and
          media.
        </p>
      </LegalSection>

      <LegalSection title="Written sources">
        <p>
          Articles list sources when claims depend on external reporting or
          archives (for example Know Your Meme, Wikipedia, mainstream press, or
          primary posts). Prefer primary reporting and established culture
          archives over rumor. Source lists appear at the bottom of entries
          when available.
        </p>
      </LegalSection>

      <LegalSection title="Media items">
        <p>When an entry includes media, we aim to record:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>A short title and description</li>
          <li>Source name and a link to the source page</li>
          <li>Platform (for example YouTube or Wikimedia Commons)</li>
          <li>Attribution / credit text</li>
          <li>License notes when known</li>
        </ul>
        <p>
          Featured images power article cards and heroes. Videos and supporting
          images appear in galleries. Reference links may point to encyclopedia
          or archive pages about the topic.
        </p>
      </LegalSection>

      <LegalSection title="Preferred media hosts">
        <ul className="list-disc space-y-2 pl-5">
          <li>Wikimedia Commons (direct file URLs, not ephemeral thumbnails)</li>
          <li>YouTube (official or clearly attributable uploads; thumbnails via YouTube CDN)</li>
          <li>Know Your Meme and other stable culture archives when appropriate</li>
        </ul>
        <p>
          We avoid hotlinking fragile social CDNs (for example short-lived
          Instagram, TikTok, or X media URLs) because they break and complicate
          attribution.
        </p>
      </LegalSection>

      <LegalSection title="Fair use and commentary">
        <p>
          Some media is used for commentary, criticism, or historical
          documentation of a meme or event. That use is limited to what is
          needed to identify the subject. Rights holders who believe material
          should be removed can follow our{" "}
          <Link
            href="/dmca"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Copyright / DMCA Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Trademarks">
        <p>
          Brand names, logos, and platform marks belong to their owners. Mention
          in an encyclopedia entry does not imply endorsement.
        </p>
      </LegalSection>

      <LegalSection title="Corrections">
        <p>
          If credit is missing or incorrect, contact us via the{" "}
          <Link
            href="/contact"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Contact
          </Link>{" "}
          page with the article URL and the correct attribution details.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}

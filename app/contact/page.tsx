import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { CONTACT_EMAIL, DMCA_EMAIL } from "@/lib/siteContact";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Contact",
  description: `Contact ${SITE_NAME} for corrections, privacy questions, and copyright notices.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPageShell
      title="Contact"
      description={`Reach ${SITE_NAME} for editorial corrections, privacy questions, or copyright notices.`}
      lastUpdated="2026-07-22"
    >
      <LegalSection title="Editorial corrections">
        <p>
          Found an inaccurate origin date, broken source link, or missing
          context? Email us with the article URL, what should change, and a
          reliable source when possible.
        </p>
        {CONTACT_EMAIL ? (
          <p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Correction request")}`}
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-500">
            A public contact inbox will be published when{" "}
            <code className="text-zinc-400">NEXT_PUBLIC_CONTACT_EMAIL</code> is
            set for the production domain. Until then, prefer filing feedback
            through the project&apos;s maintained repository if one is linked
            from deployment docs.
          </p>
        )}
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          For privacy requests, see the{" "}
          <Link
            href="/privacy"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Privacy Policy
          </Link>
          {CONTACT_EMAIL ? (
            <>
              {" "}
              or email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Privacy request")}`}
                className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </>
          ) : null}
          .
        </p>
      </LegalSection>

      <LegalSection title="Copyright / DMCA">
        <p>
          Copyright notices follow the process on our{" "}
          <Link
            href="/dmca"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Copyright / DMCA Policy
          </Link>
          .
          {DMCA_EMAIL ? (
            <>
              {" "}
              Notices:{" "}
              <a
                href={`mailto:${DMCA_EMAIL}?subject=${encodeURIComponent("DMCA notice")}`}
                className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
              >
                {DMCA_EMAIL}
              </a>
            </>
          ) : null}
        </p>
      </LegalSection>

      <LegalSection title="What we cannot do">
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide legal advice about memes, trademarks, or fair use</li>
          <li>Guarantee removal timelines for third-party hosted media</li>
          <li>Offer partnership or affiliate placement without a separate agreement</li>
        </ul>
      </LegalSection>
    </LegalPageShell>
  );
}

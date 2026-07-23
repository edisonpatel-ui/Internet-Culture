import { createMetadata } from "@/lib/seo";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { DMCA_EMAIL } from "@/lib/siteContact";
import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Copyright / DMCA Policy",
  description: `How to submit a copyright complaint about material on ${SITE_NAME}.`,
  path: "/dmca",
});

export default function DmcaPage() {
  return (
    <LegalPageShell
      title="Copyright / DMCA Policy"
      description={`${SITE_NAME} respects intellectual property. This page explains how to report allegedly infringing material.`}
      lastUpdated="2026-07-22"
    >
      <LegalSection title="Our approach">
        <p>
          Encyclopedia entries may describe cultural works and, where
          appropriate, display media under fair use, licenses, or with
          attribution. See{" "}
          <Link
            href="/attribution"
            className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
          >
            Attribution Guidelines
          </Link>
          . If you believe material on this site infringes your copyright, you
          may send a notice as described below.
        </p>
      </LegalSection>

      <LegalSection title="How to send a notice">
        <p>A complete notice should include:</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Identification of the copyrighted work claimed to have been
            infringed
          </li>
          <li>
            The URL(s) on {SITE_NAME} where the allegedly infringing material
            appears
          </li>
          <li>
            Your contact information (name, mailing address, telephone number,
            and email)
          </li>
          <li>
            A statement that you have a good-faith belief that use of the
            material is not authorized by the copyright owner, its agent, or
            the law
          </li>
          <li>
            A statement that the information in the notice is accurate, and
            under penalty of perjury, that you are authorized to act on behalf
            of the copyright owner
          </li>
          <li>Your physical or electronic signature</li>
        </ol>
        {DMCA_EMAIL ? (
          <p>
            Send notices to:{" "}
            <a
              href={`mailto:${DMCA_EMAIL}?subject=${encodeURIComponent("DMCA notice")}`}
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              {DMCA_EMAIL}
            </a>
          </p>
        ) : (
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-500">
            Configure{" "}
            <code className="text-zinc-400">NEXT_PUBLIC_DMCA_EMAIL</code> or{" "}
            <code className="text-zinc-400">NEXT_PUBLIC_CONTACT_EMAIL</code> in
            production so a stable inbox appears here. Until then, use the{" "}
            <Link
              href="/contact"
              className="text-[var(--accent-secondary)] underline decoration-white/10 underline-offset-2 hover:text-white"
            >
              Contact
            </Link>{" "}
            page channels.
          </p>
        )}
      </LegalSection>

      <LegalSection title="Counter-notice">
        <p>
          If material you posted or supplied was removed and you believe it was
          a mistake, you may send a counter-notice with your contact details, a
          description of the material and where it appeared, a statement under
          penalty of perjury that you have a good-faith belief it was removed by
          mistake, consent to jurisdiction of an appropriate court, and your
          signature.
        </p>
      </LegalSection>

      <LegalSection title="Repeat infringement">
        <p>
          We may limit or terminate access for users who repeatedly infringe
          copyrights, where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Misrepresentation">
        <p>
          Knowingly misrepresenting that material is infringing may expose you
          to liability under applicable law. Please only send notices you are
          authorized to make.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}

/**
 * Public contact addresses for legal / support pages.
 * Override with `NEXT_PUBLIC_CONTACT_EMAIL` when needed.
 * Shown on the Contact page. Feedback form delivery uses Resend (FEEDBACK_TO_EMAIL).
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "edisonpatel@gmail.com";

export const DMCA_EMAIL =
  process.env.NEXT_PUBLIC_DMCA_EMAIL?.trim() || CONTACT_EMAIL;

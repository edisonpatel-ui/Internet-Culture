/**
 * Public contact addresses for legal / support pages.
 * Set `NEXT_PUBLIC_CONTACT_EMAIL` in production after the domain is live.
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const DMCA_EMAIL =
  process.env.NEXT_PUBLIC_DMCA_EMAIL?.trim() || CONTACT_EMAIL;

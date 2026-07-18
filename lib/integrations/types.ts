/**
 * Future integration contracts — interfaces only.
 *
 * Phase 4B prepares the architecture so auth, data, AI, ads, affiliate,
 * and shop can plug in later without inventing parallel systems.
 *
 * Do NOT implement providers here. Do NOT import SDKs.
 */

/** Auth session shape for a future provider (Clerk, Supabase Auth, etc.). */
export interface AuthSession {
  userId: string;
  email?: string;
  displayName?: string;
}

/**
 * Authentication port — swap implementations without touching UI.
 * Not wired. Call sites should not exist until a real provider is chosen.
 */
export interface AuthProvider {
  getSession(): Promise<AuthSession | null>;
  signIn?(options?: Record<string, unknown>): Promise<void>;
  signOut?(): Promise<void>;
}

/**
 * Database / BaaS port (e.g. Supabase) for user data, comments, collections.
 * Content encyclopedia remains file-based in `lib/content/` until a migration.
 */
export interface DataStoreProvider {
  readonly name: string;
  /** Health check — used by future ops tooling. */
  ping(): Promise<boolean>;
}

/** AI assist port — summaries, draft suggestions. Never auto-publish. */
export interface AiAssistProvider {
  suggestRelatedSlugs?(
    entrySlug: string,
    candidates: string[],
  ): Promise<string[]>;
  draftDescription?(title: string, notes: string): Promise<string>;
}

/** Ad slot identifiers — reserve DOM hooks without loading ad SDKs. */
export type AdSlotId =
  | "article-inline"
  | "article-sidebar"
  | "home-footer"
  | "search-footer";

export interface AdSlotProps {
  slot: AdSlotId;
  /** When false, render nothing (default until ads are enabled). */
  enabled?: boolean;
}

/**
 * Affiliate / commerce link port.
 * Entries already support `affiliateProduct` placeholders on meme types;
 * this interface covers a future link resolver + disclosure layer.
 */
export interface AffiliateLink {
  id: string;
  label: string;
  href: string;
  merchant?: string;
  /** Required disclosure string for UI. */
  disclosure: string;
}

export interface AffiliateProvider {
  resolveProduct?(productId: string): Promise<AffiliateLink | null>;
}

/** Future shop / merch surface — not a second catalog of encyclopedia entries. */
export interface ShopProvider {
  listFeatured?(): Promise<
    Array<{ id: string; title: string; href: string; priceLabel: string }>
  >;
}

/**
 * Registry of optional integrations. All fields optional / null until enabled.
 * Keep a single registry — do not create parallel config objects per feature.
 */
export interface IntegrationRegistry {
  auth: AuthProvider | null;
  dataStore: DataStoreProvider | null;
  ai: AiAssistProvider | null;
  affiliate: AffiliateProvider | null;
  shop: ShopProvider | null;
  /** Feature flags for surfaces that are intentionally dark. */
  flags: {
    adsEnabled: boolean;
    authEnabled: boolean;
    shopEnabled: boolean;
    aiAssistEnabled: boolean;
  };
}

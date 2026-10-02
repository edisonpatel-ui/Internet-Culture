/**
 * lib/customerAuth/passwords.ts
 *
 * Password hashing/verification for customer dashboard login, using the
 * same `bcryptjs` dependency already relied on for admin login
 * (lib/admin/auth/verifyPassword.ts) — no new dependency introduced.
 * Node-only (bcryptjs is not Edge-compatible); every caller of this module
 * runs under `export const runtime = "nodejs"`, same as the rest of
 * lib/customerAuth/**.
 */

import { hashSync, compareSync } from "bcryptjs";

/** Work factor for new hashes. 10 matches the admin auth convention. */
const SALT_ROUNDS = 10;

/** Hashes a plaintext password for storage on a CustomerRecord (lib/customer/store.ts). */
export function hashPassword(password: string): string {
  return hashSync(password, SALT_ROUNDS);
}

/**
 * Verifies a plaintext password against a stored bcrypt hash. Never throws —
 * a malformed/legacy hash value is treated as a non-match rather than an
 * error, so a bad stored value fails closed instead of 500ing the route.
 */
export function verifyPassword(password: string, hash: string): boolean {
  try {
    return compareSync(password, hash);
  } catch {
    return false;
  }
}

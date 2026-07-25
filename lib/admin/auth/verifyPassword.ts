/**
 * Password verification — Node-only (bcrypt). Do not import from proxy/Edge.
 */

import { compareSync } from "bcryptjs";
import { createHash, timingSafeEqual } from "node:crypto";

export function verifyAdminPassword(password: string): boolean {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    try {
      return compareSync(password, hash);
    } catch {
      return false;
    }
  }
  const plain = process.env.ADMIN_PASSWORD ?? "";
  if (!plain) return false;
  const a = createHash("sha256").update(password).digest();
  const b = createHash("sha256").update(plain).digest();
  return timingSafeEqual(a, b);
}

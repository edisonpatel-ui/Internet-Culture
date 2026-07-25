import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createHash } from "node:crypto";
import { authConfig } from "./auth.config";
import {
  getAllowedAdminEmails,
  isAdminAuthConfigured,
} from "@/lib/admin/auth/adminAllowlist";
import { verifyAdminPassword } from "@/lib/admin/auth/verifyPassword";

/**
 * Full Auth.js config (Node). Handlers + server actions import from here.
 * proxy.ts uses auth.config via a separate Edge-safe auth instance.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    Credentials({
      id: "admin-credentials",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!isAdminAuthConfigured()) return null;
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;
        if (!getAllowedAdminEmails().has(email)) return null;
        if (!verifyAdminPassword(password)) return null;
        return {
          id: createHash("sha256").update(email).digest("hex").slice(0, 16),
          email,
          name: "Administrator",
        };
      },
    }),
  ],
});

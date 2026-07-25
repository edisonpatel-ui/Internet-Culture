import type { NextAuthConfig } from "next-auth";
import { getAllowedAdminEmails } from "@/lib/admin/auth/adminAllowlist";

/**
 * Edge-safe Auth.js config (no Node crypto / bcrypt).
 * Used by proxy.ts. Full providers live in auth.ts.
 */
export const authConfig = {
  providers: [],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as const, maxAge: 60 * 60 * 24 * 7 },
  pages: {
    signIn: "/admin/access",
    error: "/admin/access",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.trim().toLowerCase();
      if (!email) return false;
      return getAllowedAdminEmails().has(email);
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email.trim().toLowerCase();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = typeof token.email === "string" ? token.email : "";
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function adminSignInAction(
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  try {
    await signIn("admin-credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
    return { ok: true };
  } catch (e) {
    if (e instanceof AuthError) {
      return { ok: false, error: "Invalid credentials." };
    }
    throw e;
  }
}

export async function adminGoogleSignInAction(): Promise<void> {
  await signIn("google", { redirectTo: "/admin" });
}

export async function adminSignOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

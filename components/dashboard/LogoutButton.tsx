"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="text-sm text-zinc-500 transition-colors hover:text-white disabled:opacity-60"
    >
      {loading ? "Logging out…" : "Log out"}
    </button>
  );
}

import { notFound } from "next/navigation";

/** Legacy unlock URL — do not reveal admin. */
export default function LegacyEditorialUnlockRedirect() {
  notFound();
}

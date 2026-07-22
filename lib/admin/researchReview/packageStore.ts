import type { ResearchPackage } from "@/lib/ai/packages";
import { researchReportToPackage } from "@/lib/ai/packages";
import {
  listSessions,
  resolveReportForSession,
} from "@/lib/admin/research";

let packages: ResearchPackage[] = seedFromSessions();

function seedFromSessions(): ResearchPackage[] {
  return listSessions()
    .filter((s) => s.status !== "archived")
    .map((session) => {
      const report = resolveReportForSession(session);
      return researchReportToPackage(report, {
        session,
        packageId: `rp_${session.id}`,
      });
    });
}

export function listResearchPackages(): ResearchPackage[] {
  return packages.map((p) => structuredClone(p));
}

export function loadResearchPackage(id: string): ResearchPackage | null {
  const found = packages.find((p) => p.id === id);
  return found ? structuredClone(found) : null;
}

/** Replace package snapshot (e.g. after human edits at approval). */
export function saveResearchPackage(pkg: ResearchPackage): ResearchPackage {
  const index = packages.findIndex((p) => p.id === pkg.id);
  if (index < 0) {
    packages = [structuredClone(pkg), ...packages];
  } else {
    packages[index] = structuredClone(pkg);
  }
  return structuredClone(pkg);
}

/** Hard-remove a ResearchPackage from the in-memory store. */
export function deleteResearchPackage(id: string): boolean {
  const before = packages.length;
  packages = packages.filter((p) => p.id !== id);
  return packages.length < before;
}

/** Test / reset helper. */
export function resetResearchPackageStore(): void {
  packages = seedFromSessions();
}

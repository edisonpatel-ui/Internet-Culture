export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  slug?: string;
  id?: string;
  file?: string;
}

export interface ValidationResult {
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export interface CatalogConflict {
  slug: string;
  entries: Array<{ id: string; title: string; category: string }>;
}

export interface CatalogBuildResult {
  /** Deduplicated catalog (intentional trend re-exports collapsed). */
  entries: import("@/types").BaseEntry[];
  /** True conflicts: different entries sharing a slug. */
  slugConflicts: CatalogConflict[];
  /** Different entries sharing an id. */
  idConflicts: Array<{
    id: string;
    entries: Array<{ slug: string; title: string; category: string }>;
  }>;
}

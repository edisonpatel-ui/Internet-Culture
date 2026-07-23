import type { CreatorEntry, PersonType } from "@/types";

/** Default Person Type when an entry omits `personType`. */
export const DEFAULT_PERSON_TYPE: PersonType = "Creator";

/** Resolve public Person Type for a People-section article. */
export function getPersonType(entry: Pick<CreatorEntry, "personType">): PersonType {
  return entry.personType ?? DEFAULT_PERSON_TYPE;
}

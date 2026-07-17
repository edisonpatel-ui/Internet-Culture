import type { CreatorEntry } from "@/types";
import kaiCenat from "./kai-cenat";
import dafuqBoom from "./dafuq-boom";
import joolsLebron from "./jools-lebron";
import mrbeast from "./mrbeast";
import ishowspeed from "./ishowspeed";
import pewdiepie from "./pewdiepie";
import markiplier from "./markiplier";
import pokimane from "./pokimane";
import ksi from "./ksi";
import ninja from "./ninja";
import dukeDennis from "./duke-dennis";
import jynxzi from "./jynxzi";
import sketch from "./sketch";

export const creators: CreatorEntry[] = [
  kaiCenat,
  dafuqBoom,
  joolsLebron,
  mrbeast,
  ishowspeed,
  pewdiepie,
  markiplier,
  pokimane,
  ksi,
  ninja,
  dukeDennis,
  jynxzi,
  sketch,
];

export function getCreatorBySlug(slug: string): CreatorEntry | undefined {
  return creators.find((c) => c.slug === slug);
}

export function getAllCreatorSlugs(): string[] {
  return creators.map((c) => c.slug);
}

export function getAllCreators(): CreatorEntry[] {
  return creators;
}

export function getRelatedCreators(slugs: string[]): CreatorEntry[] {
  return creators.filter((c) => slugs.includes(c.slug));
}

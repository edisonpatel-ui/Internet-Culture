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
import caseoh from "./caseoh";
import loganPaul from "./logan-paul";
import jakePaul from "./jake-paul";
import khabyLame from "./khaby-lame";
import bellaPoarch from "./bella-poarch";
import charliDamelio from "./charli-damelio";
import xqc from "./xqc";
import plaqueboymax from "./plaqueboymax";
import zachKing from "./zach-king";
import amp from "./amp";
import adinRoss from "./adin-ross";
import dream from "./dream";

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
  caseoh,
  loganPaul,
  jakePaul,
  khabyLame,
  bellaPoarch,
  charliDamelio,
  xqc,
  plaqueboymax,
  zachKing,
  amp,
  adinRoss,
  dream,
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

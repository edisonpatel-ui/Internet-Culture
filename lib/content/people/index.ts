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

import addisonRae from "./addison-rae";
import alixEarle from "./alix-earle";
import asmongold from "./asmongold";
import corpseHusband from "./corpse-husband";
import dantdm from "./dantdm";
import davidDobrik from "./david-dobrik";
import emmaChamberlain from "./emma-chamberlain";
import fanum from "./fanum";
import h3h3EthanHilaKlein from "./h3h3-ethan-hila-klein";
import hasanabi from "./hasanabi";
import jacksepticeye from "./jacksepticeye";
import jamesCharles from "./james-charles";
import jeffreeStar from "./jeffree-star";
import jennaMarbles from "./jenna-marbles";
import keemstar from "./keemstar";
import shaneDawson from "./shane-dawson";
import shroud from "./shroud";
import sssniperwolf from "./sssniperwolf";
import technoblade from "./technoblade";
import tfue from "./tfue";
import tommyinnit from "./tommyinnit";
import valkyrae from "./valkyrae";
import wilburSoot from "./wilbur-soot";

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
  addisonRae,
  alixEarle,
  asmongold,
  corpseHusband,
  dantdm,
  davidDobrik,
  emmaChamberlain,
  fanum,
  h3h3EthanHilaKlein,
  hasanabi,
  jacksepticeye,
  jamesCharles,
  jeffreeStar,
  jennaMarbles,
  keemstar,
  shaneDawson,
  shroud,
  sssniperwolf,
  technoblade,
  tfue,
  tommyinnit,
  valkyrae,
  wilburSoot
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

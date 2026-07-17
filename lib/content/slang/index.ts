import type { SlangEntry } from "@/types";
import rizz from "./rizz";
import gyatt from "./gyatt";
import fanumTax from "./fanum-tax";
import sigma from "./sigma";
import delulu from "./delulu";
import slay from "./slay";
import noCap from "./no-cap";
import bussin from "./bussin";
import sus from "./sus";
import yeet from "./yeet";
import based from "./based";
import goat from "./goat";
import mid from "./mid";
import l from "./l";
import larp from "./larp";
import aura from "./aura";
import auraFarming from "./aura-farming";
import chopped from "./chopped";
import haramBall from "./haram-ball";
import halalBall from "./halal-ball";

export const slangTerms: SlangEntry[] = [
  rizz,
  gyatt,
  fanumTax,
  sigma,
  delulu,
  slay,
  noCap,
  bussin,
  sus,
  yeet,
  based,
  goat,
  mid,
  l,
  larp,
  aura,
  auraFarming,
  chopped,
  haramBall,
  halalBall,
];

export function getSlangBySlug(slug: string): SlangEntry | undefined {
  return slangTerms.find((s) => s.slug === slug);
}

export function getAllSlangSlugs(): string[] {
  return slangTerms.map((s) => s.slug);
}

export function getRelatedSlang(slugs: string[]): SlangEntry[] {
  return slangTerms.filter((s) => slugs.includes(s.slug));
}

export function getAllSlang(): SlangEntry[] {
  return slangTerms;
}

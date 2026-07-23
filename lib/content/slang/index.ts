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
import brainrot from "./brainrot";
import simp from "./simp";
import ick from "./ick";
import wDub from "./w-dub";
import frameMogging from "./frame-mogging";
import unc from "./unc";
import highKeyLowKey from "./high-key-low-key";
import cooked from "./cooked";
import cringe from "./cringe";
import glowUp from "./glow-up";
import itsGiving from "./its-giving";
import touchGrass from "./touch-grass";
import ratio from "./ratio";
import pessiPenaldo from "./pessi-penaldo";
import glazing from "./glazing";
import crashOut from "./crash-out";
import lockedIn from "./locked-in";
import typeShii from "./type-shii";
import pookie from "./pookie";
import ateLeftNoCrumbs from "./ate-left-no-crumbs";
import mogging from "./mogging";
import standingOnBusiness from "./standing-on-business";
import npc from "./npc";
import deadass from "./deadass";
import bet from "./bet";
import understoodTheAssignment from "./understood-the-assignment";
import mainCharacterEnergy from "./main-character-energy";
import myShayla from "./my-shayla";
import geeg from "./geeg";
import ez from "./ez";
import gitGud from "./git-gud";
import noob from "./noob";
import lag from "./lag";
import gg from "./gg";
import fomo from "./fomo";

import bffr from "./bffr";
import brainworm from "./brainworm";
import caughtLackin from "./caught-lackin";
import chud from "./chud";
import clickbait from "./clickbait";
import dadBod from "./dad-bod";
import doomscroll from "./doomscroll";
import drip from "./drip";
import extra from "./extra";
import feral from "./feral";
import fitCheck from "./fit-check";
import girlBoss from "./girl-boss";
import girlMath from "./girl-math";
import goated from "./goated";
import himbo from "./himbo";
import hitsDifferent from "./hits-different";
import iconic from "./iconic";
import itsSoOverWeAreSoBack from "./its-so-over-we-are-so-back";
import karen from "./karen";
import kingQueenBehavior from "./king-queen-behavior";
import livingRentFree from "./living-rent-free";
import lore from "./lore";
import rageBait from "./rage-bait";
import receipts from "./receipts";
import redFlagGreenFlag from "./red-flag-green-flag";
import ship from "./ship";
import situationship from "./situationship";
import stan from "./stan";
import talkingStage from "./talking-stage";
import teaSpilling from "./tea-spilling";
import valid from "./valid";
import vibeCheck from "./vibe-check";

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
  brainrot,
  simp,
  ick,
  wDub,
  frameMogging,
  unc,
  highKeyLowKey,
  cooked,
  cringe,
  glowUp,
  itsGiving,
  touchGrass,
  ratio,
  pessiPenaldo,
  glazing,
  crashOut,
  lockedIn,
  typeShii,
  pookie,
  ateLeftNoCrumbs,
  mogging,
  standingOnBusiness,
  npc,
  deadass,
  bet,
  understoodTheAssignment,
  mainCharacterEnergy,
  myShayla,
  geeg,
  ez,
  gitGud,
  noob,
  lag,
  gg,
  fomo,
  bffr,
  brainworm,
  caughtLackin,
  chud,
  clickbait,
  dadBod,
  doomscroll,
  drip,
  extra,
  feral,
  fitCheck,
  girlBoss,
  girlMath,
  goated,
  himbo,
  hitsDifferent,
  iconic,
  itsSoOverWeAreSoBack,
  karen,
  kingQueenBehavior,
  livingRentFree,
  lore,
  rageBait,
  receipts,
  redFlagGreenFlag,
  ship,
  situationship,
  stan,
  talkingStage,
  teaSpilling,
  valid,
  vibeCheck
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

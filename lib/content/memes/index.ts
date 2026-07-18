import type { MemeEntry } from "@/types";
import chickenJockey from "./chicken-jockey";
import ohioFinalBoss from "./ohio-final-boss";
import skibidiToilet from "./skibidi-toilet";
import distortedMemeFace from "./distorted-meme-face";
import npcStreaming from "./npc-streaming";
import romanEmpireMeme from "./roman-empire-meme";
import doge from "./doge";
import harlemShake from "./harlem-shake";
import rickroll from "./rickroll";
import trollface from "./trollface";
import pepe from "./pepe";
import wojak from "./wojak";
import nyanCat from "./nyan-cat";
import keyboardCat from "./keyboard-cat";
import rageComics from "./rage-comics";
import labubu from "./labubu";
import lowCortisol from "./low-cortisol";
import tungTungTungSahur from "./tung-tung-tung-sahur";
import sayWallahiBro from "./say-wallahi-bro";
import dictatorMbappe from "./dictator-mbappe";
import theRizzler from "./the-rizzler";
import gangnamStyle from "./gangnam-style";
import womanYellingAtCat from "./woman-yelling-at-cat";
import saltBae from "./salt-bae";
import leeroyJenkins from "./leeroy-jenkins";
import cornKid from "./corn-kid";
import hawkTuah from "./hawk-tuah";
import chillGuy from "./chill-guy";
import gigachad from "./gigachad";
import badLuckBrian from "./bad-luck-brian";
import successKid from "./success-kid";
import philosoraptor from "./philosoraptor";
import elRisitas from "./el-risitas";
import grumpyCat from "./grumpy-cat";
import hideThePainHarold from "./hide-the-pain-harold";
import disasterGirl from "./disaster-girl";
import oneDoesNotSimply from "./one-does-not-simply";
import distractedBoyfriend from "./distracted-boyfriend";
import thisIsFine from "./this-is-fine";
import expandingBrain from "./expanding-brain";
import surprisedPikachu from "./surprised-pikachu";
import drakeHotlineBling from "./drake-hotline-bling";
import changeMyMind from "./change-my-mind";
import coffinDance from "./coffin-dance";
import amongUsEra from "./among-us-era";
import isThisAPigeon from "./is-this-a-pigeon";
import twoButtons from "./two-buttons";
import loss from "./loss";
import quandaleDingle from "./quandale-dingle";
import lordFarquaadE from "./lord-farquaad-e";
import datBoi from "./dat-boi";
import joshHutchersonWhistleEdit from "./josh-hutcherson-whistle-edit";
import arthursFist from "./arthurs-fist";
import oneHundredMenVsOneGorilla from "./100-men-vs-1-gorilla";
import handsomeSquidward from "./handsome-squidward";
import overlyAttachedGirlfriend from "./overly-attached-girlfriend";
import duBistGutGenug from "./du-bist-gut-genug";
import dafoeLookingUp from "./dafoe-looking-up";

export const memes: MemeEntry[] = [
  chickenJockey,
  ohioFinalBoss,
  skibidiToilet,
  distortedMemeFace,
  npcStreaming,
  romanEmpireMeme,
  doge,
  harlemShake,
  rickroll,
  trollface,
  pepe,
  wojak,
  nyanCat,
  keyboardCat,
  rageComics,
  labubu,
  lowCortisol,
  tungTungTungSahur,
  sayWallahiBro,
  dictatorMbappe,
  theRizzler,
  gangnamStyle,
  womanYellingAtCat,
  saltBae,
  leeroyJenkins,
  cornKid,
  hawkTuah,
  chillGuy,
  gigachad,
  badLuckBrian,
  successKid,
  philosoraptor,
  elRisitas,
  grumpyCat,
  hideThePainHarold,
  disasterGirl,
  oneDoesNotSimply,
  distractedBoyfriend,
  thisIsFine,
  expandingBrain,
  surprisedPikachu,
  drakeHotlineBling,
  changeMyMind,
  coffinDance,
  amongUsEra,
  isThisAPigeon,
  twoButtons,
  loss,
  quandaleDingle,
  lordFarquaadE,
  datBoi,
  joshHutchersonWhistleEdit,
  arthursFist,
  oneHundredMenVsOneGorilla,
  handsomeSquidward,
  overlyAttachedGirlfriend,
  duBistGutGenug,
  dafoeLookingUp,
];

export function getMemeBySlug(slug: string): MemeEntry | undefined {
  return memes.find((m) => m.slug === slug);
}

export function getAllMemeSlugs(): string[] {
  return memes.map((m) => m.slug);
}

export function getRelatedMemes(slugs: string[]): MemeEntry[] {
  return memes.filter((m) => slugs.includes(m.slug));
}

export function getAllMemes(): MemeEntry[] {
  return memes;
}

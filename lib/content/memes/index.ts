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

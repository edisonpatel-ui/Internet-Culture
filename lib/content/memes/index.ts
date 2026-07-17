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

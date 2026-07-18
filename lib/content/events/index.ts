import type { EventEntry } from "@/types";
import bratSummer from "./brat-summer";
import minecraftMoviePremiere from "./minecraft-movie-premiere";
import dupeEconomy from "./dupe-economy";
import aiChatbotWars from "./ai-chatbot-wars";
import shortFormTakeover from "./short-form-takeover";
import vineShutdown from "./vine-shutdown";
import tiktokRise from "./tiktok-rise";
import iceBucketChallenge from "./ice-bucket-challenge";
import coldplayKissCam from "./coldplay-kiss-cam";
import gta6Release from "./gta-6-release";
import oneChipChallenge from "./one-chip-challenge";
import barbenheimer from "./barbenheimer";
import greatMemeReset from "./great-meme-reset";
import gamestopWallstreetbets from "./gamestop-wallstreetbets";
import area51Raid from "./area-51-raid";
import berealWave from "./bereal-wave";
import threadsLaunch from "./threads-launch";
import twitterXTransition from "./twitter-x-transition";

export const events: EventEntry[] = [
  bratSummer,
  minecraftMoviePremiere,
  dupeEconomy,
  aiChatbotWars,
  shortFormTakeover,
  vineShutdown,
  tiktokRise,
  iceBucketChallenge,
  coldplayKissCam,
  gta6Release,
  oneChipChallenge,
  barbenheimer,
  greatMemeReset,
  gamestopWallstreetbets,
  area51Raid,
  berealWave,
  threadsLaunch,
  twitterXTransition,
];

export function getEventBySlug(slug: string): EventEntry | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return events.map((e) => e.slug);
}

export function getRecentEvents(): EventEntry[] {
  return [...events].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}

export function getRelatedEvents(slugs: string[]): EventEntry[] {
  return events.filter((e) => slugs.includes(e.slug));
}

export function getAllEvents(): EventEntry[] {
  return events;
}

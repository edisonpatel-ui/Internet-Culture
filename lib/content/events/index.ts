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
import mostLikedEgg from "./most-liked-egg";
import harambe from "./harambe";
import yannyVsLaurel from "./yanny-vs-laurel";
import youtubeRewind from "./youtube-rewind";
import myspace from "./myspace";
import newgrounds from "./newgrounds";
import fourChan from "./4chan";
import musicalLy from "./musical-ly";
import tumblr from "./tumblr";

import balloonBoy from "./balloon-boy";
import bedBugParisPanic from "./bed-bug-paris-panic";
import blockout2024 from "./blockout-2024";
import chewbaccaMom from "./chewbacca-mom";
import cryptoCollapseScandals from "./crypto-collapse-scandals";
import damnDaniel from "./damn-daniel";
import diddyScandal from "./diddy-scandal";
import fyreFestival from "./fyre-festival";
import kony2012 from "./kony-2012";
import llamaChase from "./llama-chase";
import loveIslandUkViral from "./love-island-uk-viral";
import nftBoomBoredApe from "./nft-boom-bored-ape";
import planeBae from "./plane-bae";
import taylorSwiftErasTour from "./taylor-swift-eras-tour";
import willSmithOscarsSlap from "./will-smith-oscars-slap";

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
  mostLikedEgg,
  harambe,
  yannyVsLaurel,
  youtubeRewind,
  myspace,
  newgrounds,
  fourChan,
  musicalLy,
  tumblr,
  balloonBoy,
  bedBugParisPanic,
  blockout2024,
  chewbaccaMom,
  cryptoCollapseScandals,
  damnDaniel,
  diddyScandal,
  fyreFestival,
  kony2012,
  llamaChase,
  loveIslandUkViral,
  nftBoomBoredApe,
  planeBae,
  taylorSwiftErasTour,
  willSmithOscarsSlap
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

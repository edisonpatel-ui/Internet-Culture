import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s100",
  slug: "nightmare-fuel",
  title: "Nightmare Fuel",
  category: "slang",
  description:
    "Internet slang, coined on Mystery Science Theater 3000, for any image, video, or story disturbing enough to cause nightmares or insomnia.",
  imageGradient: "from-purple-900 via-slate-800 to-black",
  scores: { relevance: 30, influence: 50, cringe: 12, brainrot: 20 },
  addedAt: "2026-09-12",
  historicalDate: "1993-12-24",
  views: 900000,
  trendDirection: "stable",
  tags: ["tv tropes", "horror", "classic internet slang", "mst3k", "creepy media"],
  definition:
    "'Nightmare fuel' describes media — images, video clips, stories, or characters — disturbing enough to cause fear or insomnia. TV Tropes distinguishes 'regular' nightmare fuel (media intentionally designed to scare, like horror films) from 'accidental' nightmare fuel (things that were never meant to be scary but come across as unsettling anyway, often due to uncanny-valley animation or surreal tonal mismatches).",
  origin:
    "The phrase was first used in this sense during episode 521 of Mystery Science Theater 3000, which aired December 24th, 1993 — while watching the film Santa Claus, the robot character Crow T. Robot sees a disturbing animatronic Santa and calls it 'good old-fashioned nightmare fuel.' The phrase spread through MST3K fan newsgroups in the 1990s before being adopted and systematized as a trope category by the website TV Tropes, which popularized it as general internet slang.",
  usageExamples: [
    "\"That children's show scene is pure nightmare fuel\"",
    "Labeling an unintentionally creepy CGI character as 'accidental nightmare fuel'",
    "Warning someone before sharing a disturbing image: 'nightmare fuel incoming'",
  ],
  relatedSlugs: ["loss", "folk-valley", "cringe"],
  sources: [
    {
      title: "Nightmare Fuel — TV Tropes",
      url: "https://tvtropes.org/pmwiki/pmwiki.php/Main/NightmareFuel",
      domain: "tvtropes.org",
    },
  ],
};

export default entry;

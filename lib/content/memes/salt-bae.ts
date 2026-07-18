import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m24",
  slug: "salt-bae",
  title: "Salt Bae",
  category: "meme",
  description:
    "Turkish chef Nusret Gökçe's viral salt-sprinkling gesture — sliding salt down his forearm and into his dishes — became one of the defining reaction images and GIFs of 2017.",
  imageGradient: "from-amber-500 via-yellow-400 to-orange-300",
  scores: { relevance: 70, brainrot: 30, cringe: 25 },
  addedAt: "2026-07-17",
  historicalDate: "2017-01-07",
  views: 3100000,
  trendDirection: "declining",
  tags: ["chef", "viral", "2017", "reaction", "gesture", "instagram"],
  meaning:
    "A reaction image or GIF showing Nusret Gökçe (Salt Bae) performing his signature forearm salt-sprinkling move — used to represent someone doing something with excessive style, confidence, or flair. The image is dropped in comments when someone does something impressively extra or lavish.",
  origin:
    "On January 7, 2017, Turkish restaurateur Nusret Gökçe posted an Instagram video of himself preparing and seasoning meat in an elaborate fashion, culminating in a slow-motion salt sprinkle where he lets salt cascade down his forearm into the meat. The clip went internationally viral within days. Gökçe's Nusr-Et restaurant chain subsequently became a global brand, with celebrity appearances and viral moments at each opening.",
  timeline: [
    { date: "Jan 7, 2017", event: "Nusret Gökçe posts the salt-sprinkling Instagram video — goes internationally viral within 48 hours" },
    { date: "Jan 2017", event: "Meme format spreads across Twitter, Reddit, Facebook — remixed and photoshopped endlessly" },
    { date: "2017–2018", event: "Salt Bae becomes a global cultural figure; opens restaurants in New York, London, Dubai" },
    { date: "2022", event: "Viral controversy at the FIFA World Cup in Qatar — Salt Bae on the pitch touching the World Cup trophy" },
    { date: "2022+", event: "Meme usage declines but remains a recognizable cultural reference" },
  ],
  examples: [
    "Someone posting a perfectly executed recipe photo: [Salt Bae GIF]",
    "When you add the final touch to your outfit and it just works: Salt Bae",
    "Game developer adding one final bug fix before launch: [Salt Bae sprinkling salt]",
  ],
  relatedSlugs: ["gigachad"],
  media: [
    // CC BY 3.0 still of Nusret performing the salt pose — Commons file verified.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Salt_Bae.png",
      title: "Nusret Gökçe (Salt Bae) — signature salt pose (2018)",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Salt_Bae.png",
      platform: "wikimedia",
      attribution: "Terron F.Beckham (CC BY 3.0)",
      license: "CC BY 3.0",
      description:
        "Nusret Gökçe performing the forearm salt-sprinkle gesture that became the Salt Bae meme.",
      date: "2018-02-10",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Salt Bae — Know Your Meme",
      url: "https://knowyourmeme.com/memes/salt-bae",
      domain: "knowyourmeme.com",
    },
    {
      title: "Nusret Gökçe — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Nusret_G%C3%B6k%C3%A7e",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;

import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m159",
  slug: "fruit-fly-brain",
  title: "Fruit Fly Brain",
  category: "meme",
  description:
    "A September 2026 joke format built on a real science milestone: after researchers published a complete wiring map of a male fruit fly's nervous system, creators began 'plugging' the simulated brain into games, parking, and trading.",
  imageGradient: "from-lime-600 via-emerald-700 to-slate-900",
  scores: { relevance: 74, influence: 35, cringe: 30, brainrot: 55 },
  addedAt: "2026-10-18",
  lastUpdated: "2026-10-18",
  historicalDate: "2026-09-03",
  views: 0,
  trendDirection: "new",
  tags: ["science", "connectome", "minecraft", "x", "tiktok", "2026", "deadpan"],
  meaning:
    "'Fruit fly brain' (also 'fly brain simulations') is a joke format in which a creator claims a fruit fly's brain is controlling something unlikely — a Minecraft character, a Beat Saber run, a parking maneuver, a Bitcoin trade, a VTuber. The humor comes from pairing a serious scientific result with an absurdly mundane task and treating the tiny brain as a tiny employee. Note that the meme is about the brain being mapped and simulated; it is not, as the name might suggest, a joke about short attention spans.",
  origin:
    "On 3 September 2026, researchers at HHMI Janelia, the Cambridge Drosophila Connectomics Group and Google Research published the MaleCNS connectome in Cell: a complete wiring map of an adult male fruit fly's central nervous system. Four days later, a YouTuber posted a video about putting a fly brain into Minecraft. Hobbyists load the connectome into a spiking neural network simulator, wire its sensory neurons to a task's inputs, and map motor-neuron output to keypresses, mouse clicks or trade orders, then film the results with deadpan captions.",
  timeline: [
    { date: "2025-10", event: "An early version (v0.9) of the MaleCNS connectome is released." },
    { date: "2026-06", event: "MaleCNS v1.0 is released." },
    { date: "2026-09-03", event: "The connectome is formally published in Cell and shared widely on social media." },
    { date: "2026-09-07", event: "A YouTube video about running a fly brain in Minecraft becomes an early reference point for the trend." },
    { date: "2026-09-08", event: "A Beat Saber demo on X reaches roughly 22 million views within two days." },
    { date: "2026-09", event: "Parking, Bitcoin-trading and VTuber variations spread; the format reaches TikTok by mid-month." },
  ],
  examples: [
    "A fly brain 'playing' Minecraft",
    "A fly brain 'playing' Beat Saber",
    "A fly brain 'parallel parking' a car in a simulator",
    "A fly brain 'trading Bitcoin' in a split-screen video",
    "A VTuber persona said to be powered by the mapped brain",
  ],
  relatedSlugs: [],
  legacy:
    "Too new to judge. It shows how a dense research release can become meme material within days when the underlying data is open enough for hobbyists to play with.",
  sources: [
    {
      title: "MaleCNS connectome — HHMI Janelia",
      url: "https://www.janelia.org/node/70079",
      domain: "janelia.org",
    },
    {
      title: "What's With All These 'Fly Brain Simulations'? — Yahoo Entertainment",
      url: "https://www.yahoo.com/entertainment/articles/whats-fly-brain-simulations-viral-144806619.html",
      domain: "yahoo.com",
    },
  ],
};

export default entry;

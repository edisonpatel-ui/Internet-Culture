import {
  getTrendingToday,
  getPopularMemes,
  getInternetSlang,
  getBrainrotRankingsFromTrends,
} from "@/lib/data/trends";

import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { TrendGridSection } from "@/components/sections/TrendGridSection";
import { RankingSection } from "@/components/sections/RankingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <Hero />

      <TrendGridSection
        title="🔥 Trending Today"
        description="The biggest internet moments right now."
        entries={getTrendingToday()}
      />

      <TrendGridSection
        title="😂 Popular Memes"
        description="Memes everyone is talking about."
        entries={getPopularMemes()}
      />

      <TrendGridSection
        title="💬 Internet Slang"
        description="Words and phrases shaping online culture."
        entries={getInternetSlang()}
      />

      <RankingSection
        rankings={getBrainrotRankingsFromTrends()}
      />
    </main>
  );
}
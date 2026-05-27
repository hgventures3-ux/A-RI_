import Hero from "@/components/Hero";
import BadgeStrip from "@/components/BadgeStrip";
import FlavorExplorer from "@/components/FlavorExplorer";
import SocialProofGrid from "@/components/SocialProofGrid";
import MakhanaEducation from "@/components/MakhanaEducation";
import FlavorVotingCard from "@/components/FlavorVotingCard";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AÉRI — Makhana Graines Soufflées Premium | L'Apéro Réinventé",
  description:
    "Découvrez AÉRI, le snack premium aux graines de makhana soufflées. Makhana France, snack sain apéro, graines soufflées bio. Torréfié à l'huile d'olive, vegan, sans gluten.",
  keywords: [
    "makhana France",
    "snack sain apéro",
    "graines soufflées bio",
    "graines de lotus soufflées",
    "AÉRI snacks",
    "makhana premium",
    "apéro healthy",
  ],
};

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* 1. Hero animation with headline, sub-headline, CTA */}
      <Hero />
      {/* 2. Badge strip */}
      <BadgeStrip />
      {/* 3. Product grid with "Ajouter au Panier" (includes waitlist lock) */}
      <FlavorExplorer />
      {/* 4. Consumer review grid */}
      <SocialProofGrid />
      {/* 5. "Qu'est-ce que le Makhana" educational section */}
      <MakhanaEducation />
      {/* 6. Flavor voting card */}
      <FlavorVotingCard />
      {/* 7. Journal d'AÉRI blog preview */}
      <Blog />
      {/* 8. Footer */}
      <Footer />
    </main>
  );
}

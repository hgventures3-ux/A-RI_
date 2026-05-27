import Hero from "@/components/Hero";
import BadgeStrip from "@/components/BadgeStrip";
import ThreeFlavorLineup from "@/components/ThreeFlavorLineup";
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
    "Découvrez AÉRI, le snack premium aux graines de makhana soufflées. Makhana France, snack sain apéro, graines soufflées bio, graines de lotus soufflées. Torréfié à l'huile d'olive, vegan, sans gluten.",
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
      {/* 2. Badge strip — health claims */}
      <BadgeStrip />
      {/* 3. Three-flavor product lineup visual */}
      <ThreeFlavorLineup />
      {/* 4. Product grid with "Ajouter au Panier" (includes waitlist lock) */}
      <FlavorExplorer />
      {/* 5. Consumer review grid */}
      <SocialProofGrid />
      {/* 6. "Qu'est-ce que le Makhana" educational section (Étape 01, 02, 03) */}
      <MakhanaEducation />
      {/* 7. Flavor voting card */}
      <FlavorVotingCard />
      {/* 8. Journal d'AÉRI blog preview */}
      <Blog />
      {/* 9. Footer */}
      <Footer />
    </main>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function AperoArticle() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      title: "L'Étiquette de l'Apéro",
      subtitle: "Comment ne pas passer pour un barbare devant le fromage.",
      date: "12 Mai 2026",
      paragraphs: [
        "L'apéro en France n'est pas qu'un repas de transition, c'est une véritable institution. C'est l'art de prendre son temps, de décompresser après une longue journée, de partager et de célébrer les petites victoires quotidiennes. Mais attention, un apéro réussi et digne de ce nom demande une certaine discipline et un respect des traditions, tout en sachant innover.",
        "Pendant trop longtemps, nous avons toléré les chips industrielles luisantes d'huile et les cacahuètes tellement salées qu'elles en devenaient une épreuve d'endurance. L'apéro moderne, lui, se veut différent. Il est raffiné, conscient de la santé, et surtout, incroyablement léger. Il s'agit de privilégier la qualité à la quantité.",
        "C'est exactement ici qu'intervient AÉRI. Nos graines de lotus soufflées (Makhana) apportent cette touche d'élégance inattendue que vos invités n'oublieront pas. Avec leur texture aérienne et leurs saveurs sophistiquées comme la Truffe Noire ou les Herbes de Provence, elles transforment une simple table basse en un véritable festin gastronomique.",
        "La règle d'or ? Associez les textures. Servez vos AÉRI croustillants aux côtés d'un fromage à pâte molle comme un Brie truffé, ou d'une tapenade d'olives noires artisanale. Le contraste entre le crémeux et le croquant léger du Makhana est tout simplement divin. Ne sacrifiez plus votre bien-être pour le plaisir : avec AÉRI, vous pouvez enfin savourer l'apéro parfait, sans la moindre culpabilité."
      ],
      back: "← Retour au Journal"
    },
    en: {
      title: "The Art of the Apéro",
      subtitle: "How not to look like a barbarian in front of the cheese board.",
      date: "May 12, 2026",
      paragraphs: [
        "The apéro in France is more than just a transitional meal; it's a true institution. It's the art of taking your time, unwinding after a long day, sharing, and celebrating the small daily victories. But beware, a successful apéro worthy of the name requires a certain discipline and respect for tradition, while knowing how to innovate.",
        "For too long, we have tolerated industrial, oil-soaked chips and peanuts so salty they became an endurance test. The modern apéro, however, aims to be different. It is refined, health-conscious, and above all, incredibly light. It's all about prioritizing quality over quantity.",
        "This is exactly where AÉRI comes in. Our popped lotus seeds (Makhana) bring that unexpected touch of elegance that your guests won't forget. With their airy texture and sophisticated flavors like Black Truffle or Herbes de Provence, they transform a simple coffee table into a true gastronomic feast.",
        "The golden rule? Mix your textures. Serve your crunchy AÉRI alongside a soft cheese like a truffled Brie, or an artisanal black olive tapenade. The contrast between the creaminess and the light crunch of Makhana is simply divine. Stop sacrificing your well-being for pleasure: with AÉRI, you can finally enjoy the perfect apéro, completely guilt-free."
      ],
      back: "← Back to Journal"
    }
  };

  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#FFFFFF] pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-12 text-[#6E6E73] font-semibold hover:underline" style={{ fontFamily: "var(--font-montserrat)" }}>
          {t.back}
        </Link>
        <span className="block text-sm font-medium tracking-wider uppercase text-[#111111]/40 mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
          {t.date} · Culture
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#6E6E73] italic mb-12" style={{ fontFamily: "var(--font-lora)" }}>
          {t.subtitle}
        </p>
        <div className="space-y-8 text-lg text-[#111111]/80 leading-relaxed" style={{ fontFamily: "var(--font-lora)" }}>
          {t.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function SupermarketArticle() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      title: "Les Mensonges de Votre Supermarché",
      subtitle: "Votre snack « healthy » contient plus de surprises que prévu.",
      date: "3 Mai 2026",
      paragraphs: [
        "« Naturel », « Allégé », « Sans culpabilité »… Promenez-vous dans le rayon apéritif de n'importe quel supermarché et vous aurez l'impression de lire des slogans de campagne électorale. Les emballages verts et les polices de caractères 'naturelles' font tout pour vous rassurer. Mais si ces paquets pouvaient rougir, ils seraient écarlates.",
        "Prenons le temps de décortiquer ces fameuses étiquettes. Ce que l'on vous vend comme des 'chips de légumes saines' sont souvent de simples flocons de pomme de terre frits, légèrement colorés à la poudre de betterave, et tout aussi gras que des chips classiques. Et les fameuses galettes de maïs soufflé ? Elles ont souvent un index glycémique si élevé qu'elles perturbent votre taux de sucre dans le sang en un clin d'œil.",
        "Chez AÉRI, nous avons choisi une approche radicalement différente : la transparence totale. Notre ingrédient principal ? La graine d'Euryale Ferox (Makhana). Comment est-elle transformée ? Elle est éclatée à la chaleur, exactement comme du pop-corn, mais sans l'ajout massif d'huile ou de beurre industriel. Le résultat est un snack pur, avec un apport naturel en protéines végétales et une liste d'ingrédients que vous n'avez pas besoin d'un diplôme en chimie pour comprendre.",
        "Il est temps d'arrêter de se faire avoir par le marketing vert de façade. Lisez les ingrédients, regardez les valeurs nutritionnelles réelles, et choisissez des produits qui respectent à la fois votre corps et votre palais. Un vrai super-aliment n'a pas besoin de mentir pour être délicieux."
      ],
      back: "← Retour au Journal"
    },
    en: {
      title: "Your Supermarket's Lies",
      subtitle: "Your 'healthy' snack has more surprises than expected.",
      date: "May 3, 2026",
      paragraphs: [
        "'Natural', 'Light', 'Guilt-free'… Take a walk down the snack aisle of any supermarket and you'll feel like you're reading election campaign slogans. The green packaging and 'natural' fonts do everything to reassure you. But if these bags could blush, they'd be crimson.",
        "Let's take the time to dissect these famous labels. What is sold to you as 'healthy vegetable chips' are often just fried potato flakes, lightly colored with beetroot powder, and just as greasy as classic chips. And those famous popped corn cakes? They often have a glycemic index so high that they spike your blood sugar levels in the blink of an eye.",
        "At AÉRI, we have chosen a radically different approach: total transparency. Our main ingredient? The Euryale Ferox seed (Makhana). How is it processed? It is popped with heat, exactly like popcorn, but without the massive addition of oil or industrial butter. The result is a pure snack, with a natural supply of plant-based protein and an ingredient list you don't need a degree in chemistry to understand.",
        "It's time to stop being fooled by greenwashing marketing. Read the ingredients, look at the actual nutritional values, and choose products that respect both your body and your palate. A true superfood doesn't need to lie to be delicious."
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
          {t.date} · Vérité
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

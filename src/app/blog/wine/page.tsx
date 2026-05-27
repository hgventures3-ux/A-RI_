"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function WineArticle() {
  const { lang } = useLanguage();

  const content = {
    fr: {
      title: "AÉRI & Vins : Le Mariage Parfait",
      subtitle: "Un Bourgogne et un Makhana entrent dans un bar…",
      date: "8 Mai 2026",
      paragraphs: [
        "On a souvent l'habitude d'associer le vin avec des fromages complexes ou de la charcuterie fine. C'est un grand classique, et on ne le remettra pas en question. Mais laissez-nous vous présenter un accord mets-vins auquel vous n'auriez peut-être pas pensé : le vin et le Makhana soufflé AÉRI.",
        "Le secret d'un bon accord réside dans l'équilibre. Prenez par exemple notre saveur 'Truffe Noire'. Le parfum terreux, boisé et intense de la truffe du Périgord se marie de manière spectaculaire avec un vin rouge léger mais structuré, comme un Pinot Noir de Bourgogne. La légèreté aérienne de la graine de lotus permet au vin de s'exprimer sans alourdir le palais, créant une danse élégante en bouche.",
        "Si vous préférez le blanc, notre AÉRI 'Herbes de Provence' est une révélation lorsqu'il est accompagné d'un Sauvignon Blanc bien frais ou d'un Rosé de Bandol. Les notes de thym et de romarin font écho à la minéralité et à la fraîcheur du vin, vous transportant instantanément sur une terrasse ensoleillée du sud de la France.",
        "L'avantage ? Contrairement aux snacks frits qui tapissent le palais de gras et écrasent les subtilités d'un bon millésime, le Makhana nettoie le palais et prépare vos papilles pour la prochaine gorgée. La prochaine fois que vous ouvrez une belle bouteille, laissez tomber les biscuits industriels et sortez un paquet d'AÉRI. Vos invités (et votre vin) vous remercieront."
      ],
      back: "← Retour au Journal"
    },
    en: {
      title: "AÉRI & Wine: The Perfect Marriage",
      subtitle: "A Burgundy and a foxnut walk into a bar…",
      date: "May 8, 2026",
      paragraphs: [
        "We are often used to pairing wine with complex cheeses or fine charcuterie. It's a great classic, and we won't question it. But let us introduce you to a food and wine pairing you might not have considered: wine and popped AÉRI Makhana.",
        "The secret to a good pairing lies in balance. Take our 'Black Truffle' flavor, for example. The earthy, woody, and intense aroma of Périgord truffle pairs spectacularly with a light yet structured red wine, like a Burgundy Pinot Noir. The airy lightness of the lotus seed allows the wine to express itself without heavying the palate, creating an elegant dance in the mouth.",
        "If you prefer white, our AÉRI 'Herbes de Provence' is a revelation when accompanied by a crisp Sauvignon Blanc or a Bandol Rosé. The notes of thyme and rosemary echo the minerality and freshness of the wine, instantly transporting you to a sunny terrace in the South of France.",
        "The advantage? Unlike fried snacks that coat the palate in grease and crush the subtleties of a good vintage, Makhana cleanses the palate and prepares your taste buds for the next sip. The next time you open a nice bottle, ditch the industrial crackers and bring out a bag of AÉRI. Your guests (and your wine) will thank you."
      ],
      back: "← Back to Journal"
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <main className="min-h-screen bg-[#FFFFFF] pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-block mb-12 text-[#6E6E73] font-semibold hover:underline" style={{ fontFamily: "var(--font-montserrat)" }}>
          {t.back}
        </Link>
        <span className="block text-sm font-medium tracking-wider uppercase text-[#111111]/40 mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
          {t.date} · Accords
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

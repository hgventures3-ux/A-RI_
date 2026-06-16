"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  fr: {
    heading: "Ce que nos clients disent",
    subheading: "Découvrez pourquoi les amateurs d'apéro et les professionnels apprécient AÉRI Makhana.",
    reviews: [
      {
        name: "Sophie Martin",
        location: "Paris, France",
        quote: "AÉRI Makhana a complètement transformé nos soirées apéro. Élégant, léger et incroyablement raffiné. C'est le croquant parfait sans culpabilité.",
        image: "/testimonials/sophie.png"
      },
      {
        name: "Julien Dubois",
        location: "Lyon, France",
        quote: "En tant que sportif, je cherchais un en-cas qui soit à la fois sain et gourmand. La qualité de ce makhana est tout simplement exceptionnelle.",
        image: "/testimonials/julien.png"
      },
      {
        name: "Claire Laurent",
        location: "Bordeaux, France",
        quote: "Une texture soufflée magnifique. Mes invités ont été impressionnés par la subtilité du sel de l'Himalaya. C'est le nouveau classique de nos réceptions.",
        image: "/testimonials/claire.png"
      },
      {
        name: "Marc Antoine",
        location: "Monaco",
        quote: "Un produit d'une élégance rare. On sent la qualité premium dès la première bouchée. L'alternative parfaite aux snacks traditionnels.",
        image: "/testimonials/marc.png"
      }
    ]
  },
  en: {
    heading: "What our clients say",
    subheading: "Discover why apéro lovers and professionals appreciate AÉRI Makhana.",
    reviews: [
      {
        name: "Sophie Martin",
        location: "Paris, France",
        quote: "AÉRI Makhana has completely transformed our apéro evenings. Elegant, light, and incredibly refined. It's the perfect crunch without guilt.",
        image: "/testimonials/sophie.png"
      },
      {
        name: "Julien Dubois",
        location: "Lyon, France",
        quote: "As an athlete, I was looking for a snack that is both healthy and gourmet. The quality of this makhana is simply exceptional.",
        image: "/testimonials/julien.png"
      },
      {
        name: "Claire Laurent",
        location: "Bordeaux, France",
        quote: "A magnificent puffed texture. My guests were impressed by the subtlety of the Himalayan salt. It's the new classic for our receptions.",
        image: "/testimonials/claire.png"
      },
      {
        name: "Marc Antoine",
        location: "Monaco",
        quote: "A product of rare elegance. You can taste the premium quality from the first bite. The perfect alternative to traditional snacks.",
        image: "/testimonials/marc.png"
      }
    ]
  },
  hi: {
    heading: "हमारे ग्राहक क्या कहते हैं",
    subheading: "जानें कि अपेरो प्रेमी और पेशेवर AÉRI मखाना की सराहना क्यों करते हैं।",
    reviews: [
      {
        name: "सोफी मार्टिन",
        location: "पेरिस, फ्रांस",
        quote: "AÉRI मखाना ने हमारी अपेरो शामों को पूरी तरह से बदल दिया है। सुरुचिपूर्ण, हल्का, और अविश्वसनीय रूप से परिष्कृत। यह बिना अपराधबोध के एकदम सही कुरकुरापन है।",
        image: "/testimonials/sophie.png"
      },
      {
        name: "जूलियन डुबोइस",
        location: "ल्योन, फ्रांस",
        quote: "एक एथलीट के रूप में, मैं एक ऐसे स्नैक की तलाश में था जो स्वस्थ और स्वादिष्ट दोनों हो। इस मखाने की गुणवत्ता बिल्कुल असाधारण है।",
        image: "/testimonials/julien.png"
      },
      {
        name: "क्लेयर लॉरेंट",
        location: "बोर्डो, फ्रांस",
        quote: "एक शानदार फूला हुआ टेक्सचर। हिमालयन नमक की सूक्ष्मता से मेरे मेहमान प्रभावित हुए। यह हमारे रिसेप्शन के लिए नया क्लासिक है।",
        image: "/testimonials/claire.png"
      },
      {
        name: "मार्क एंटोनी",
        location: "मोनाको",
        quote: "दुर्लभ लालित्य का उत्पाद। आप पहली ही बाइट से प्रीमियम गुणवत्ता का स्वाद ले सकते हैं। पारंपरिक स्नैक्स का सही विकल्प।",
        image: "/testimonials/marc.png"
      }
    ]
  }
};

export default function SocialProofGrid() {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.fr;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.1 }
    })
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] mb-6 tracking-wide"
            style={{ fontFamily: "var(--font-didot), serif" }}
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#4A4A4A] text-sm md:text-base max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {t.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.reviews.map((review, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(28,28,28,0.04)] hover:shadow-[0_16px_40px_rgba(28,28,28,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full border border-[#1C1C1C]/5"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              <p
                className="text-[#1C1C1C]/80 text-[15px] leading-relaxed mb-8 flex-grow italic"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                "{review.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#1C1C1C]/5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#1C1C1C]/10">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h4
                    className="text-[#1C1C1C] font-semibold text-sm mb-0.5"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {review.name}
                  </h4>
                  <p
                    className="text-[#6E6E73] text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

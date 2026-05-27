"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

const FRAME_COUNT = 233;

const heroText = {
  fr: {
    ticker: "• Livraison gratuite sur votre première commande • Free shipping on your first delivery •",
    headline: "AÉRI : L'Apéro Soufflé d'Exception.",
    subheadline: "Croustillant, noble, et naturellement sain. Découvrez la super-graine d'origine indienne qui réinvente vos débuts de soirée.",
    cta: "ACHETER MAINTENANT",
    disclaimer: "Représentation botanique illustrative.",
  },
  en: {
    ticker: "• Free shipping on your first delivery • Livraison gratuite sur votre première commande •",
    headline: "AÉRI: The Ultimate Gourmet Puff.",
    subheadline: "Crunchy, noble, and naturally healthy. Discover the Indian super-seed that reinvents your evening rituals.",
    cta: "SHOP NOW",
    disclaimer: "Illustrative botanical representation.",
  },
  hi: {
    ticker: "• आपके पहले ऑर्डर पर मुफ़्त डिलीवरी • Free shipping on your first delivery •",
    headline: "AÉRI: बेमिसाल गॉर्मे स्नैक।",
    subheadline: "कुरकुरा, शानदार, और प्राकृतिक रूप से स्वस्थ। भारतीय सुपर-सीड की खोज करें जो आपकी शाम को बदल दे।",
    cta: "अभी खरीदें",
    disclaimer: "सचित्र वानस्पतिक प्रतिनिधित्व।",
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const s = heroText[lang as keyof typeof heroText] || heroText.fr;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      const frameStr = i.toString().padStart(3, "0");
      img.src = `/hero-sequence/ezgif-frame-${frameStr}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  // Draw the initial frame once loaded
  useEffect(() => {
    if (loaded && images.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = images[0];
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [loaded, images]);

  // Draw frame on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded || images.length === 0 || !canvasRef.current) return;
    
    let index = Math.floor(latest) - 1;
    if (index < 0) index = 0;
    if (index >= FRAME_COUNT) index = FRAME_COUNT - 1;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = images[index];
    
    if (ctx && img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  });

  // Opacity transform for the text
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh]"
      style={{ background: '#000000' }}
    >
      {/* Infinite Marquee Ticker */}
      <div className="fixed top-0 left-0 right-0 z-[50] bg-[#1C1C1C] text-white overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-2.5">
          <span className="text-xs tracking-widest uppercase px-8" style={{ fontFamily: "var(--font-montserrat)" }}>
            {s.ticker}
          </span>
          <span className="text-xs tracking-widest uppercase px-8" style={{ fontFamily: "var(--font-montserrat)" }}>
            {s.ticker}
          </span>
          <span className="text-xs tracking-widest uppercase px-8" style={{ fontFamily: "var(--font-montserrat)" }}>
            {s.ticker}
          </span>
          <span className="text-xs tracking-widest uppercase px-8" style={{ fontFamily: "var(--font-montserrat)" }}>
            {s.ticker}
          </span>
        </div>
      </div>

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between" style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F9F0E3 35%, #F5E6D0 65%, #EDE0D4 100%)' }}>
        
        {/* Canvas for image sequence */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
           <canvas
             ref={canvasRef}
             className="w-full h-full object-fill mix-blend-darken opacity-90" 
           />
        </div>

        {/* Top Header / Nav Area */}
        <Navbar />

        {/* Hero Copy & CTA */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="z-10 flex flex-col items-center justify-center text-center px-6 flex-1"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-[#1C1C1C]"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            {s.headline}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed mb-8 text-[#4c463e]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {s.subheadline}
          </motion.p>

          <motion.a
            href="/products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-[#1C1C1C] text-white text-sm font-semibold tracking-[0.2em] uppercase rounded-lg transition-all hover:bg-[#333] shadow-lg"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {s.cta}
          </motion.a>
        </motion.div>

        {/* Botanical Disclaimer */}
        <div className="z-10 text-center pb-2">
          <span 
            className="text-[10px] tracking-wide text-[#4c463e]/50"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {s.disclaimer}
          </span>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="z-10 flex flex-col items-center pb-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-8 bg-[#111111]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#111111]/30 mt-1" />
        </motion.div>
      </div>
    </section>
  );
}

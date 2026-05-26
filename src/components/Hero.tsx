"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";

const FRAME_COUNT = 233;

export default function Hero() {
  const { lang } = useLanguage();
  const s = t.hero[lang];

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
      
      // Set canvas dimensions to match the image resolution
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
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between" style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F9F0E3 35%, #F5E6D0 65%, #EDE0D4 100%)' }}>
        
        {/* Canvas for image sequence */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
           <canvas
             ref={canvasRef}
             className="w-full h-full object-cover mix-blend-darken opacity-90" 
           />
        </div>

        {/* Top Header / Nav Area */}
        <header className="fixed top-0 left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 backdrop-blur-md border-b border-[#111111]/5 transition-all"
          style={{ background: 'linear-gradient(180deg, rgba(253, 248, 240, 0.95) 0%, rgba(253, 248, 240, 0.85) 100%)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Link href="/">
              <h2 className="text-xl tracking-widest uppercase text-[#111111] font-semibold cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
                AÉRI
              </h2>
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#111111]/70"
          >
            <Link href="/brand" className="hover:text-[#111111] transition-colors">{s.nav.brand}</Link>
            <Link href="/products" className="hover:text-[#111111] transition-colors">{s.nav.products}</Link>
            <Link href="/contact" className="hover:text-[#111111] transition-colors">{s.nav.contact}</Link>
          </motion.nav>
        </header>



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

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";
import Navbar from "@/components/Navbar";

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
             className="w-full h-full object-fill mix-blend-darken opacity-90" 
           />
        </div>

        {/* Watermark Cover for Veo Logo */}
        <div 
          className="absolute bottom-3 right-3 md:bottom-5 md:right-5 z-[5] bg-[#EAE0D3]/90 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2 rounded flex items-center justify-center"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}
        >
           <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-[#4c463e]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
             AÉRI
           </span>
        </div>

        {/* Top Header / Nav Area */}
        <Navbar />



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

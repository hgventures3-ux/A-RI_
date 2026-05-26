"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";

export default function Superfood() {
  const { lang } = useLanguage();
  const s = t.superfood[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const videoInView = useInView(videoContainerRef, { amount: 0.3 });

  // Mute state
  const [isMuted, setIsMuted] = useState(false); // Try to play with sound first

  // Parallax for background particles
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Pause/Play video based on intersection
  useEffect(() => {
    if (!videoRef.current) return;
    if (videoInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocks autoplay with sound, mute it and play again
          setIsMuted(true);
          videoRef.current?.play().catch(() => {});
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [videoInView]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 md:py-36"
      style={{ background: "#FFFFFF" }}
    >
      {/* Soft gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFFF] to-[#eaddca] opacity-80 pointer-events-none" />

      {/* Floating Lotus Particles (Subtle) */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Particle 1 */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-12 h-12"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#6E6E73] opacity-20">
            <path d="M12 22C12 22 19 16 19 11C19 6 15 2 12 2C9 2 5 6 5 11C5 16 12 22 12 22Z" fill="currentColor"/>
          </svg>
        </motion.div>
        {/* Particle 2 */}
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, -15, 15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[15%] right-[8%] w-16 h-16"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#6E6E73] opacity-20">
            <path d="M12 22C12 22 19 16 19 11C19 6 15 2 12 2C9 2 5 6 5 11C5 16 12 22 12 22Z" fill="currentColor"/>
          </svg>
        </motion.div>
        {/* Particle 3 */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 20, -5, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[30%] w-8 h-8"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#111111] opacity-10">
            <path d="M12 22C12 22 19 16 19 11C19 6 15 2 12 2C9 2 5 6 5 11C5 16 12 22 12 22Z" fill="currentColor"/>
          </svg>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Video */}
          <div className="w-full lg:w-1/2 order-1" ref={videoContainerRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={videoInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-2xl p-2 bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,63,84,0.1)]"
            >
              {/* Luxury Frame */}
              <div className="relative rounded-xl overflow-hidden bg-[#111111] group">
                <video
                  ref={videoRef}
                  src="https://res.cloudinary.com/di5bjgkbl/video/upload/v1779085860/WhatsApp_Video_2026-05-11_at_11.33.38_PM_aft9q4.mp4"
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-auto object-contain block"
                />
                
                {/* Cinematic Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-[#111111]/10 pointer-events-none" />

                {/* Sound Toggle Button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-lg transition-transform hover:scale-110 opacity-0 group-hover:opacity-100 md:opacity-100"
                  aria-label="Toggle Sound"
                >
                  {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  )}
                </button>

                {/* Floating Label */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={videoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-6 left-6"
                >
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-[#FFFFFF] text-xs font-semibold tracking-widest uppercase border border-white/20 shadow-lg"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {s.badge}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Typography */}
          <div className="w-full lg:w-1/2 order-2" ref={textRef}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={textInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block text-xs font-semibold tracking-[0.4em] uppercase text-[#6E6E73] mb-6"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.label}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-8 leading-[1.15]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.title}
              </motion.h2>

              <div className="space-y-8 relative">
                {/* Decorative line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#6E6E73]/40 via-[#6E6E73]/20 to-transparent" />
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="pl-8 text-lg md:text-xl text-[#111111]/75 leading-relaxed"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {s.quote1}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pl-8 text-lg md:text-xl text-[#111111]/75 leading-relaxed"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {s.quote2}
                </motion.p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

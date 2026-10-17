"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface InstagramTile {
  id: string;
  type: "reel" | "image";
  image: string;
  url: string;
  alt: string;
  caption: string;
}

const instagramPosts: InstagramTile[] = [
  {
    id: "reel-1",
    type: "reel",
    image: "/instagram/post_0.jpg",
    url: "https://www.instagram.com/reel/Da2FmdvPgnN/",
    alt: "AÉRI Makhana tasting experience reel",
    caption: "Premier essai. Premier coup de cœur.",
  },
  {
    id: "reel-2",
    type: "reel",
    image: "/instagram/post_1.jpg",
    url: "https://www.instagram.com/reel/Da0c_Jpv4xm/",
    alt: "AÉRI Makhana snack review reel",
    caption: "Les chips ? C'est fini. AÉRI Makhana, validé.",
  },
  {
    id: "post-3",
    type: "image",
    image: "/instagram/post_2.jpg",
    url: "https://www.instagram.com/p/DapWfg2s7Q2/",
    alt: "Healthy snack for Netflix nights with AÉRI",
    caption: "Your Netflix nights deserve a healthier snack.",
  },
  {
    id: "post-4",
    type: "image",
    image: "/instagram/post_3.jpg",
    url: "https://www.instagram.com/p/DakCp5msce0/",
    alt: "Luxury gourmet makhana collection by AÉRI",
    caption: "Who said healthy cannot be luxurious?",
  },
];

export default function InstagramFeed() {
  const { lang } = useLanguage();
  const title = lang === "fr" ? "Suivez AÉRI sur Instagram" : "Follow AÉRI on Instagram";
  const subtitle = "@aeri.makhana";

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1B1A] mb-2"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            {title}
          </h2>
          <a
            href="https://www.instagram.com/aeri.makhana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-500 hover:text-[#1C1C1C] tracking-wider uppercase inline-block transition-colors"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {subtitle}
          </a>
        </motion.div>

        {/* 4 Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${post.alt} - View on Instagram`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF8F5] border border-gray-200 block shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Reel Badge */}
              {post.type === "reel" && (
                <div
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white shadow-sm pointer-events-none group-hover:opacity-0 transition-opacity"
                  title="Instagram Reel"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              )}

              {/* Hover / Touch Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <p className="text-white text-xs font-medium leading-snug line-clamp-3 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-semibold tracking-wide uppercase">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>View on Instagram ↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div>
          <a
            href="https://www.instagram.com/aeri.makhana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] gap-2.5 px-7 py-3 rounded-xl bg-[#1C1C1C] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black active:scale-95 transition-all shadow-sm"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Follow @aeri.makhana on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

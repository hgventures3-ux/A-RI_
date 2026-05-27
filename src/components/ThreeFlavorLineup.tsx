"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const flavors = [
  { name: "Himalayan Salt & Pepper", label: "SIGNATURE", image: "/flavor_salt.png" },
  { name: "Gourmet Truffle Fusion", label: "GOURMET", image: "/flavor_truffle.png" },
  { name: "Mediterranean Herb Fusion", label: "VÉGÉTAL", image: "/flavor_herbes.png" },
];

export default function ThreeFlavorLineup() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden"
      style={{ background: "#F5E6D3" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1C1C] mb-4"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          La Collection AÉRI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm md:text-base text-[#1C1C1C]/60 mb-12 md:mb-16 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Trois saveurs d&apos;exception, torréfiées à l&apos;huile d&apos;olive vierge extra.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {flavors.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center group"
            >
              <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] mb-5 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={f.image}
                  alt={`AÉRI ${f.name} sachet 50g`}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <span
                className="text-[10px] font-bold tracking-[0.3em] uppercase mb-1"
                style={{ fontFamily: "var(--font-montserrat)", color: "#D4AF37" }}
              >
                {f.label}
              </span>
              <span
                className="text-sm font-semibold text-[#1C1C1C]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {f.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

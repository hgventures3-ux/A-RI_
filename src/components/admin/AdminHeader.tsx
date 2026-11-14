"use client";

import { ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/* Admin Header - Top bar focused on Blog & Journal Management */
export default function AdminHeader() {
  const { lang } = useLanguage();
  const isFrench = lang === "fr";

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#e8e0d8] flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Title / Current Workspace Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f5ede3] border border-[#e8e0d8] text-xs font-semibold text-[#1d1b1a]">
          <BookOpen size={14} className="text-[#675d4e]" />
          <span>{isFrench ? "Espace Blog & Journal" : "Blog & Journal Editorial Workspace"}</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* View Live Journal */}
        <Link 
          href="/journal" 
          target="_blank"
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#4c463e] hover:bg-[#f5ede3] rounded-xl transition-colors border border-[#e8e0d8]"
        >
          <ExternalLink size={14} />
          <span className="hidden sm:inline">{isFrench ? "Voir le journal en direct" : "View Live Journal"}</span>
        </Link>

        {/* Admin Avatar & Role */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#e8e0d8]">
          <div className="w-8 h-8 rounded-full bg-[#1d1b1a] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-[#1d1b1a] leading-none">
              AÉRI Editorial
            </p>
            <p className="text-[10px] text-[#4c463e]/60 mt-0.5 leading-none">
              {isFrench ? "Administrateur" : "Administrator"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

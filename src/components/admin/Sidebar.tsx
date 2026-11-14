"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  BookOpen,
  PlusCircle,
  Globe,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";

/* Sidebar Navigation Items - Only Blog / Journal features kept as requested */
const navItems = [
  {
    labelEn: "All Blogs / Articles",
    labelFr: "Tous les blogs / Articles",
    href: "/admin/journal",
    icon: BookOpen,
  },
  {
    labelEn: "Add New Blog",
    labelFr: "Ajouter un blog",
    href: "/admin/journal/new",
    icon: PlusCircle,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLanguage();
  const isFrench = lang === "fr";
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin/journal") {
      return pathname === "/admin/journal" || pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-[#1d1b1a] text-[#fef8f6] lg:hidden shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="cursor-pointer fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          bg-[#1d1b1a] text-[#fef8f6] shadow-2xl
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${collapsed ? "w-[72px]" : "w-[260px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
        `}
      >
        {/* Logo / Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!collapsed && (
            <Link href="/admin/journal" className="flex items-center gap-2">
              <span
                className="text-xl font-bold tracking-wider"
                style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                AÉRI
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fef8f6]/50 font-medium">
                Admin
              </span>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin/journal" className="mx-auto">
              <span className="text-lg font-bold">A</span>
            </Link>
          )}
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setMobileOpen(false);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors hidden lg:block"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
            {!collapsed && (isFrench ? "Gestion du contenu" : "Content Management")}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const label = isFrench ? item.labelFr : item.labelEn;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-[#675d4e] text-white shadow-md font-semibold"
                      : "text-[#fef8f6]/70 hover:text-[#fef8f6] hover:bg-white/8"
                  }
                  ${collapsed ? "justify-center px-2" : ""}
                `}
                title={collapsed ? label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer: Live Website & Logout */}
        <div className="p-2 border-t border-white/10 space-y-1">
          <Link
            href="/journal"
            target="_blank"
            className={`
              flex items-center gap-3 px-3 py-2 rounded-xl w-full
              text-xs font-medium text-[#fef8f6]/70 hover:text-white hover:bg-white/8
              transition-all duration-200
              ${collapsed ? "justify-center px-2" : ""}
            `}
            title={collapsed ? (isFrench ? "Voir le Journal" : "Live Journal") : undefined}
          >
            <Globe size={16} className="shrink-0" />
            {!collapsed && <span>{isFrench ? "Voir le Journal en direct" : "View Live Journal"}</span>}
          </Link>

          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl w-full
              text-sm font-medium text-[#fef8f6]/50 hover:text-red-400 hover:bg-red-500/10
              transition-all duration-200
              ${collapsed ? "justify-center px-2" : ""}
            `}
            title={collapsed ? (isFrench ? "Se déconnecter" : "Logout") : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>{isFrench ? "Se déconnecter" : "Logout"}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

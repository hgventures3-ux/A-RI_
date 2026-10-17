"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlavorExplorer from "@/components/FlavorExplorer";

export default function ProductsClient() {
  return (
    <main
      className="min-h-screen text-[#1C1C1C] flex flex-col font-montserrat"
      style={{
        background: "#FAF8F5",
      }}
    >
      <Navbar />

      <div className="pt-24 lg:pt-28 flex-1">
        <FlavorExplorer />
      </div>

      <Footer />
    </main>
  );
}

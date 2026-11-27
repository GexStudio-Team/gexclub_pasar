import React from "react";
import { Comunidad } from "./components/Comunidad";
import { Ecosistema } from "./components/Ecosistema";
import { Footer } from "./components/Footer";
import { GiantWord } from "./components/Primitives";
import { Hackatones } from "./components/Hackatones";
import { Hero } from "./components/Hero";
import { LiquidForge } from "./components/LiquidForge";
import { Navbar } from "./components/Navbar";

/* ───────────────────────── APP ───────────────────────── */

export default function GexClubV2() {
  return (
    <div className="gx relative min-h-screen overflow-x-clip bg-[#050507] text-white antialiased">
      {/* iluminación ambiental */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#2F7BFF]/[.08] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#B6FF3B]/[.025] blur-[140px]" />
      </div>

      <Navbar />
      <main className="relative">
        <Hero />
        <GiantWord text="GEXCLUB" speed={0.28} className="-mt-[4vw]" />
        <Ecosistema />
        <LiquidForge />
        <Hackatones />
        <Comunidad />
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import { ArrowRight } from "lucide-react";
import { NodeSphere } from "./NodeSphere";

/* ───────────────────────── HERO ───────────────────────── */

export function Hero() {
  const lines = [["Crea."], ["Programa."], ["Diseña", "el", "futuro."]];
  let i = 0;
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <NodeSphere />
      {/* viñeta para legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,7,.55)_0%,rgba(5,5,7,.15)_45%,rgba(5,5,7,0)_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050507]" />

      <div className="relative z-10 mx-auto max-w-5xl pt-24 text-center">
        <p className="gx-fade mono mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3.5 py-1.5 text-[11px] uppercase tracking-[.22em] text-white/60 backdrop-blur"
          style={{ animationDelay: "200ms" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#B6FF3B] blink" />
          Global Ecosystem for eXcellence
        </p>

        <h1 className="text-[13vw] font-extrabold leading-[.92] tracking-[-.05em] text-white sm:text-[8.5vw] xl:text-[8.6rem]">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const delay = 350 + i++ * 120;
                const accent = word === "futuro.";
                return (
                  <span key={wi} className="gx-word mr-[.22em] last:mr-0" style={{ animationDelay: `${delay}ms` }}>
                    {accent ? (
                      <span className="bg-gradient-to-r from-[#2F7BFF] via-[#6aa2ff] to-[#B6FF3B] bg-clip-text text-transparent">{word}</span>
                    ) : word}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="gx-fade mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg" style={{ animationDelay: "1250ms" }}>
          La comunidad juvenil donde se construyen videojuegos, software y experiencias digitales.
          Aquí se aprende haciendo, en equipo y sin miedo a romper cosas.
        </p>

        <div className="gx-fade mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "1450ms" }}>
          <a href="#comunidad"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#050507] transition hover:shadow-[0_0_40px_-6px_rgba(47,123,255,.8)]">
            Unirse a GexClub
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a href="#ecosistema"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.02] px-6 py-3.5 text-sm font-medium text-white/85 backdrop-blur transition hover:border-white/30 hover:bg-white/[.05]">
            Explorar
          </a>
        </div>
      </div>

      <div className="gx-fade mono absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[.3em] text-white/35"
        style={{ animationDelay: "1900ms" }}>
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-4 bg-[#2F7BFF] radar-ping" />
        </span>
      </div>
    </section>
  );
}

import React from "react";
import { Terminal } from "lucide-react";
import { BRAND, LINKS, NAV } from "../data";
import { Logo } from "./Primitives";

export function Footer() {
  return (
    <footer className="border-t border-white/[.06] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/40">{BRAND.tagline}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="text-white/45 transition hover:text-white">{label}</a>
          ))}
          <a href={LINKS.contacto} className="text-white/45 transition hover:text-white">Contacto y alianzas</a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="text-white/45 transition hover:text-white">GitHub</a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/[.06] pt-6 text-xs text-white/30 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} GexClub · Global Ecosystem for eXcellence</span>
        <span className="mono inline-flex items-center gap-2"><Terminal className="h-3.5 w-3.5" /> v2.0 · build the future together</span>
      </div>
    </footer>
  );
}

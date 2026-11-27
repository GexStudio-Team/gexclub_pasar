import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { NAV } from "../data";
import { Logo } from "./Primitives";

/* ───────────────────────── NAVBAR ───────────────────────── */

export function Navbar() {
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "forja" ? "ecosistema" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...NAV.map((n) => n.id), "forja"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const onScroll = () => setScrolled(scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <header className="gx-fade fixed inset-x-0 top-4 z-50 flex justify-center px-4" style={{ animationDelay: "100ms" }}>
      <nav
        className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border px-3 py-2 pl-5 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "border-white/10 bg-[#080A16]/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,.8)]" : "border-white/[.06] bg-white/[.03]"
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-4 py-2 text-[13px] transition-colors ${
                  active === id ? "text-white" : "text-white/50 hover:text-white/85"
                }`}
              >
                {active === id && <span className="absolute inset-0 -z-10 rounded-full bg-white/[.07]" />}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#comunidad"
            className="group hidden items-center gap-1.5 rounded-full bg-[#0078FF] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#2f9bff] sm:flex"
          >
            Unirse <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/80 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="gx-modal absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-3xl border border-white/10 bg-[#080A16]/90 p-2 backdrop-blur-xl md:hidden">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-white/80 hover:bg-white/5">
              {label} <ArrowRight className="h-4 w-4 text-white/30" />
            </a>
          ))}
          <a href="#comunidad" onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[#0078FF] px-4 py-3 font-medium text-white">
            Unirse a GexClub
          </a>
        </div>
      )}
    </header>
  );
}

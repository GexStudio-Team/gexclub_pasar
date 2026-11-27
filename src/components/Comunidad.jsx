import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { LINKS } from "../data";
import { Eyebrow, GiantWord, GithubIcon, InstagramIcon, isPlaceholder, Ph, Reveal, SpotCard } from "./Primitives";

/* ───────────────────────── COMUNIDAD + FOOTER ───────────────────────── */

export function Comunidad() {
  const channels = [
    {
      href: LINKS.discord,
      icon: MessageCircle,
      label: "Servidor de Discord",
      hint: isPlaceholder(LINKS.discord) ? "Pendiente de enlace real" : "Canales, voz y eventos",
      primary: true,
    },
    { href: LINKS.instagram, icon: InstagramIcon, label: "Instagram", hint: "@joingexclub" },
    { href: LINKS.github, icon: GithubIcon, label: "GitHub", hint: "GexStudio-Team" },
  ];
  return (
    <section id="comunidad" className="relative overflow-hidden px-6 pb-24 pt-16 sm:pb-32">
      <GiantWord text="CREATE" speed={0.2} fill className="-mb-[8vw]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF]/[.07] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal><div className="flex justify-center"><Eyebrow index="04">Comunidad</Eyebrow></div></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 text-5xl font-extrabold leading-[.95] tracking-[-.05em] text-white sm:text-7xl">
            Tu próximo proyecto<br />
            <span className="bg-gradient-to-r from-[#2F7BFF] to-[#B6FF3B] bg-clip-text text-transparent">empieza en comunidad.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
            Entra al servidor, preséntate y súmate al próximo reto. No necesitas experiencia; solo ganas de crear.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 text-left sm:grid-cols-3">
          {channels.map(({ href, icon: Icon, label, hint, primary }, i) => {
            const pending = isPlaceholder(href);
            return (
              <Reveal key={label} delay={200 + i * 80}>
                <a
                  href={pending ? undefined : href}
                  target={!pending && href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-disabled={pending || undefined}
                  className={`block h-full ${pending ? "cursor-not-allowed" : ""}`}
                >
                  <SpotCard className={`group flex h-full items-center justify-between gap-4 p-5 ${primary ? "border-[#2F7BFF]/40 bg-[#2F7BFF]/[.08]" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span className={`grid h-11 w-11 place-items-center rounded-xl ${primary ? "bg-[#2F7BFF] text-white" : "border border-white/10 text-white/80"}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-[15px] font-medium text-white">{label}</div>
                        <div className={`text-xs ${pending ? "text-amber-300/70" : "text-white/40"}`}>{hint}</div>
                      </div>
                    </div>
                    {pending ? (
                      <span className="mono text-[10px] uppercase tracking-widest text-amber-300/70">Pendiente</span>
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    )}
                  </SpotCard>
                </a>
              </Reveal>
            );
          })}
        </div>
        {isPlaceholder(LINKS.discord) && (
          <p className="mono mt-4 text-[10px] uppercase tracking-widest text-amber-300/70"><Ph>{LINKS.discord}</Ph></p>
        )}
      </div>
    </section>
  );
}

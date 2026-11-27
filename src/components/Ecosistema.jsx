import React, { useEffect, useRef } from "react";
import { Cpu, Gamepad2, Palette, Users } from "lucide-react";
import { BRAND } from "../data";
import { Eyebrow, Reveal, SpotCard } from "./Primitives";

/* ───────────────────────── SCROLLYTELLING TEXT ───────────────────────── */

function ScrollText({ text }) {
  const ref = useRef(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    const spans = el.querySelectorAll("span[data-w]");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const lit = p * spans.length;
      spans.forEach((s, i) => { s.style.opacity = String(Math.min(1, Math.max(0.14, lit - i + 0.14))); });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <p ref={ref} className="text-3xl font-semibold leading-[1.15] tracking-[-.03em] text-white sm:text-5xl lg:text-[3.6rem]">
      {words.map((w, i) => (
        <span key={i} data-w className={`transition-opacity duration-200 ${/GexClub|juntos/.test(w) ? "text-[#0078FF]" : ""}`}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/* ───────────────────────── ECOSISTEMA (BENTO) ───────────────────────── */

function PixelGrid() {
  const cells = Array.from({ length: 120 });
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }} aria-hidden>
      {cells.map((_, i) => (
        <span key={i} className="aspect-square rounded-[3px] bg-[#0078FF]"
          style={{ animation: `gxPixel ${2.5 + ((i * 7) % 5) * 0.6}s ease-in-out ${(i * 37) % 23 / 10}s infinite`, opacity: 0.08 }} />
      ))}
    </div>
  );
}

function CodeLines() {
  const lines = [
    ["const", " club ", "=", " new ", "Ecosystem", "();"],
    ["club", ".", "build", "(", "ideas", ");"],
    ["await", " club", ".", "ship", "();"],
  ];
  const colors = ["text-[#0078FF]", "text-white/70", "text-white/40", "text-[#9DB8FF]/80", "text-white/80", "text-white/40"];
  return (
    <pre className="mono overflow-hidden rounded-2xl border border-white/[.06] bg-black/40 p-4 text-[11.5px] leading-6" aria-hidden>
      {lines.map((l, i) => (
        <div key={i}><span className="mr-3 text-white/20">{String(i + 1).padStart(2, "0")}</span>
          {l.map((tok, j) => <span key={j} className={colors[j % colors.length]}>{tok}</span>)}
        </div>
      ))}
      <div><span className="mr-3 text-white/20">04</span><span className="blink inline-block h-3.5 w-2 translate-y-0.5 bg-[#9DB8FF]" /></div>
    </pre>
  );
}

function Pillar({ code, icon: Icon, title, desc, tags, children, className = "", delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <SpotCard className="flex h-full flex-col justify-between gap-8 p-7 sm:p-8">
        <div className="flex items-start justify-between">
          <span className="mono text-[11px] tracking-[.2em] text-white/35">{code}</span>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-[#0078FF]">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </span>
        </div>
        {children}
        <div>
          <h3 className="text-2xl font-semibold tracking-[-.02em] text-white">{title}</h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/55">{desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="mono rounded-full border border-white/10 px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-white/50">{t}</span>
            ))}
          </div>
        </div>
      </SpotCard>
    </Reveal>
  );
}

export function Ecosistema() {
  return (
    <section id="ecosistema" className="relative px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal><Eyebrow index="01">¿Qué es GexClub?</Eyebrow></Reveal>
        <div className="mt-10 max-w-5xl">
          <ScrollText text="GexClub es un ecosistema donde jóvenes curiosos se convierten en creadores. Diseñamos juegos, escribimos software y prototipamos ideas — juntos, desde el primer pixel hasta el último commit." />
        </div>

        <div className="mt-24 grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          <Pillar className="md:col-span-4 md:row-span-2" code="P.01" icon={Gamepad2}
            title="Desarrollo de Videojuegos"
            desc="De la idea al prototipo jugable: mecánicas, motores, narrativa y game jams donde cada fin de semana nace un mundo nuevo."
            tags={["Unity", "Godot", "Game Jams", "Pixel Art"]}>
            <PixelGrid />
          </Pillar>
          <Pillar className="md:col-span-2" code="P.02" icon={Cpu} delay={80}
            title="Ingeniería & Software"
            desc="Web, apps, IA y buenas prácticas. Código real, revisiones reales."
            tags={["Web", "IA", "Git"]}>
            <CodeLines />
          </Pillar>
          <Pillar className="md:col-span-2" code="P.03" icon={Palette} delay={160}
            title="Diseño & Arte Digital"
            desc="UI/UX, 3D, ilustración y motion. Porque lo que se ve bien, se usa más."
            tags={["UI/UX", "3D", "Motion"]}>
            <div className="relative h-24 overflow-hidden rounded-2xl border border-white/[.06]" aria-hidden>
              <div className="absolute -left-6 top-2 h-24 w-24 rounded-full bg-[#0078FF]/60 blur-2xl" />
              <div className="absolute right-0 -top-4 h-20 w-20 rounded-full bg-[#6018F0]/40 blur-2xl" />
              <div className="absolute bottom-3 left-4 mono text-[10px] tracking-widest text-white/60">#0078FF · #6018F0</div>
            </div>
          </Pillar>
          <Pillar className="md:col-span-6" code="P.04" icon={Users} delay={100}
            title="Comunidad Juvenil"
            desc="Mentorías, retos, hackatones y amistades que empiezan en un canal de voz y terminan en un proyecto. Para todas las edades, sin requisitos previos."
            tags={["Mentorías", "Retos", "Hackatones", "Talleres"]}>
            <div className="flex items-center gap-4" aria-hidden>
              <div className="flex -space-x-2">
                {["#0078FF", "#6018F0", "#9DB8FF", "#ffffff", "#1848F0"].map((c, i) => (
                  <span key={i} className="h-9 w-9 rounded-full border-2 border-[#01020A]" style={{ background: `radial-gradient(circle at 30% 30%, ${c}, #050713 75%)` }} />
                ))}
              </div>
              <span className="mono text-[11px] uppercase tracking-[.2em] text-white/40">{BRAND.motto}</span>
            </div>
          </Pillar>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, Bell, Calendar, Check, Clock, Image as ImageIcon,
  MapPin, Sparkles, Trophy, X,
} from "lucide-react";
import { PAST_EDITION } from "../data";
import { Eyebrow, GiantWord, isPlaceholder, Ph, Reveal, SpotCard } from "./Primitives";

const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT || "").trim();
const hasFormspreeEndpoint = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(FORMSPREE_ENDPOINT);

/* ───────────────────────── HACKATONES ───────────────────────── */

function RadarVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]" aria-hidden>
      {[1, 0.75, 0.5, 0.25].map((s) => (
        <div key={s} className="absolute rounded-full border border-white/[.08]" style={{ inset: `${(1 - s) * 50}%` }} />
      ))}
      <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-white/[.06]" />
      <div className="absolute inset-0 top-1/2 h-px -translate-y-1/2 bg-white/[.06]" />
      <div className="radar-sweep absolute inset-0 rounded-full" />
      <div className="radar-ping absolute inset-[30%] rounded-full border border-[#0078FF]/50" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0078FF] shadow-[0_0_20px_4px_rgba(0,120,255,.6)]" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="mono mt-24 rounded-full border border-white/10 bg-[#01020A]/80 px-3 py-1 text-[10px] uppercase tracking-[.25em] text-white/50">
          0 señales activas
        </span>
      </div>
    </div>
  );
}

function AlertForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | sending | done | config
  const [errorText, setErrorText] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorText("Revisa el formato del correo.");
      setStatus("error");
      return;
    }
    if (!hasFormspreeEndpoint) {
      setStatus("config");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, _subject: "Nueva alerta GexClub" }),
      });
      if (!res.ok) throw new Error(`Formspree respondió ${res.status}`);
      setStatus("done");
    } catch {
      setErrorText("No se pudo guardar el correo. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#9DB8FF]/25 bg-[#9DB8FF]/[.06] px-5 py-4 text-sm text-white/85" role="status">
        <Check className="h-4 w-4 text-[#9DB8FF]" />
        Listo. Te escribiremos en cuanto anunciemos la próxima convocatoria.
      </div>
    );

  if (status === "config")
    return (
      <div className="rounded-2xl border border-dashed border-amber-400/40 bg-amber-400/[.05] px-5 py-4 text-sm text-amber-200/90" role="status">
        <Ph className="mono text-[11px] uppercase tracking-widest">
          [ CONFIGURAR: VITE_FORMSPREE_ENDPOINT en .env.local ]
        </Ph>
        <p className="mt-2 text-white/60">El formulario está listo; falta el endpoint real de Formspree para enviar.</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="gx-email" className="mono mb-2 block text-[11px] uppercase tracking-[.2em] text-white/40">
        Recibir alerta de la próxima edición
      </label>
      <div className={`flex flex-col gap-2 rounded-2xl border bg-black/30 p-1.5 transition sm:flex-row sm:rounded-full ${
        status === "error" ? "border-red-400/50" : "border-white/10 focus-within:border-[#0078FF]/60"}`}>
        <input id="gx-email" type="email" inputMode="email" autoComplete="email" placeholder="tu@correo.com" value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorText(""); }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none" />
        <button type="submit" disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/[.06] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0078FF] disabled:cursor-wait disabled:opacity-60 sm:rounded-full">
          <Bell className="h-4 w-4" /> {status === "sending" ? "Enviando…" : "Avisarme"}
        </button>
      </div>
      <p className={`mt-2 text-xs ${status === "error" ? "text-red-300/80" : "text-white/35"}`}>
        {status === "error" ? errorText : status === "sending" ? "Guardando tu correo…" : "Sin spam. Un solo correo cuando haya nueva convocatoria."}
      </p>
    </form>
  );
}

function CurrentCalls() {
  const rows = [
    ["Hackatones activos", "Ninguno"],
    ["Inscripciones", "Cerradas"],
    ["Próxima temporada", "En preparación"],
    ["Fecha", "Por anunciar"],
  ];
  return (
    <Reveal>
      <SpotCard className="overflow-hidden">
        <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <RadarVisual />
          <div>
            <span className="mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[10.5px] uppercase tracking-[.2em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Sin convocatorias abiertas
            </span>
            <h3 className="mt-6 text-3xl font-semibold tracking-[-.03em] text-white sm:text-4xl">
              Radar en espera.
              <span className="block text-white/40">La próxima temporada se está cocinando.</span>
            </h3>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/55">
              Por el momento <strong className="font-semibold text-white/85">no hay hackatones activos ni inscripciones abiertas</strong>.
              Estamos diseñando los retos de la siguiente edición. Deja tu correo y serás de los primeros en enterarte cuando se anuncie.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.07] bg-white/[.07]">
              {rows.map(([k, v]) => (
                <div key={k} className="bg-[#080A16] px-4 py-3.5">
                  <dt className="mono text-[10px] uppercase tracking-[.18em] text-white/35">{k}</dt>
                  <dd className="mt-1 text-sm text-white/80">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8"><AlertForm /></div>
          </div>
        </div>
      </SpotCard>
    </Reveal>
  );
}

function StatusTag() {
  return (
    <span className="mono inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[.18em] text-white/75">
      <Check className="h-3 w-3 text-[#9DB8FF]" /> Finalizado • Edición pasada
    </span>
  );
}

function PastEditionCard({ onOpen }) {
  const e = PAST_EDITION;
  return (
    <Reveal>
      <SpotCard className="overflow-hidden">
        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          {/* Visual */}
          <div className="relative min-h-[260px] overflow-hidden border-b border-white/[.06] bg-[linear-gradient(135deg,#071230_0%,#01020A_70%)] lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute -bottom-10 -left-4 select-none text-[13rem] font-extrabold leading-none tracking-[-.08em] text-white/[.06]">01</div>
            <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-[#0078FF]/30 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
              <span className="mono text-[11px] uppercase tracking-[.25em] text-white/45">{e.edition}</span>
              <div>
                <p className="mono text-[11px] uppercase tracking-[.25em] text-[#9DB8FF]/80">{e.subtitle}</p>
                <p className="mt-2 text-3xl font-bold tracking-[-.03em] text-white">{e.title}</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-7 sm:p-9">
            <StatusTag />
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-white/35" />{e.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-white/35" />{e.time}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-white/35" /><Ph>{e.location}</Ph></span>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-white/60"><Ph>{e.summary}</Ph></p>
            <p className="mono mt-3 text-[10px] uppercase tracking-widest text-amber-300/70"><Ph>{e.note}</Ph></p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.07] bg-white/[.07] sm:grid-cols-4">
              {e.stats.map((s) => (
                <div key={s.label} className="bg-[#080A16] px-4 py-4">
                  <div className="text-2xl font-semibold tracking-tight text-white"><Ph>{s.value}</Ph></div>
                  <div className="mono mt-1 text-[10px] uppercase tracking-[.15em] text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={onOpen}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-[#0078FF] hover:bg-[#0078FF]/10">
              Ver memoria del evento
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </SpotCard>
    </Reveal>
  );
}

function MemoryModal({ open, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (ev) => ev.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;
  const e = PAST_EDITION;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="gx-memory-title">
      <div className="absolute inset-0 bg-[#01020A]/75 backdrop-blur-md" onClick={onClose} />
      <div className="gx-modal relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#080A16] sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[.06] bg-[#080A16]/90 px-6 py-4 backdrop-blur sm:px-8">
          <StatusTag />
          <button ref={closeRef} onClick={onClose} aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/5 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-10 pt-8 sm:px-8">
          <p className="mono text-[11px] uppercase tracking-[.25em] text-white/40">{e.edition} · Memoria del evento</p>
          <h3 id="gx-memory-title" className="mt-3 text-3xl font-bold tracking-[-.03em] text-white sm:text-4xl">
            {e.title} <span className="text-white/40">— {e.subtitle}</span>
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{e.date}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{e.time}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /><Ph>{e.location}</Ph></span>
          </div>

          <p className="mt-6 leading-relaxed text-white/65"><Ph>{e.summary}</Ph></p>
          <p className="mono mt-3 text-[10px] uppercase tracking-widest text-amber-300/70"><Ph>{e.note}</Ph></p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {e.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4">
                <div className="text-2xl font-semibold text-white"><Ph>{s.value}</Ph></div>
                <div className="mono mt-1 text-[10px] uppercase tracking-[.15em] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          <h4 className="mono mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-white/45">
            <Trophy className="h-3.5 w-3.5 text-[#9DB8FF]" /> Ganadores
          </h4>
          <ol className="mt-4 divide-y divide-white/[.06] rounded-2xl border border-white/[.07]">
            {e.winners.map((w) => (
              <li key={w.place} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="mono text-[11px] uppercase tracking-[.18em] text-[#0078FF]">{w.place}</span>
                <span className="text-sm text-white/80"><Ph>{w.team}</Ph> <span className="text-white/30">·</span> <Ph className="text-white/50">{w.project}</Ph></span>
              </li>
            ))}
          </ol>

          <h4 className="mono mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-white/45">
            <Sparkles className="h-3.5 w-3.5 text-[#9DB8FF]" /> Logros e impacto
          </h4>
          <ul className="mt-4 space-y-3">
            {e.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/65">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0078FF]" /><Ph>{h}</Ph>
              </li>
            ))}
          </ul>

          <h4 className="mono mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-white/45">
            <ImageIcon className="h-3.5 w-3.5 text-[#9DB8FF]" /> Galería
          </h4>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {e.photos.map((src, i) => (
              isPlaceholder(src) ? (
                <div key={i} className="mono grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-amber-400/40 bg-amber-400/[.04] px-2 text-center text-[10px] uppercase tracking-widest text-amber-300/70">
                  <Ph>{src}</Ph>
                </div>
              ) : (
                <img key={i} src={src} alt={`Foto ${i + 1} de ${e.edition}`} className="aspect-[4/3] w-full rounded-2xl object-cover" />
              )
            ))}
          </div>

          <p className="mt-8 text-sm text-white/45"><span className="text-white/60">Mentores, jurado y aliados:</span> <Ph>{e.partners}</Ph></p>

          <div className="mt-10 rounded-2xl border border-white/[.07] bg-white/[.02] px-5 py-4 text-sm text-white/55">
            Esta edición ya finalizó y no admite registros. ¿Quieres participar en la próxima?{" "}
            <a href="#hackatones" onClick={onClose} className="text-[#9DB8FF] underline-offset-4 hover:underline">Activa la alerta del radar</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hackatones() {
  const [modal, setModal] = useState(false);
  return (
    <section id="hackatones" className="relative px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal><Eyebrow index="03">Hackatones</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-[-.04em] text-white sm:text-6xl">
            Construir contra el reloj, <span className="text-white/35">aprender para siempre.</span>
          </h2>
        </Reveal>

        {/* Bloque A — Convocatorias actuales */}
        <div className="mt-16">
          <Reveal><p className="mono mb-5 text-[11px] uppercase tracking-[.22em] text-white/40">Convocatorias actuales</p></Reveal>
          <CurrentCalls />
        </div>
      </div>

      {/* Bloque B — Archivo */}
      <GiantWord text="ARCHIVE" speed={-0.22} className="mt-24 -mb-[12vw]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mono text-[11px] uppercase tracking-[.22em] text-white/40">Archivo · 01 edición indexada</p>
              <h3 className="mt-3 text-3xl font-bold tracking-[-.03em] text-white sm:text-5xl">Ediciones Anteriores</h3>
            </div>
            <p className="max-w-sm text-sm text-white/45">El registro de lo que ya construimos. Cada edición queda aquí como memoria de la comunidad.</p>
          </div>
        </Reveal>
        <div className="mt-10"><PastEditionCard onOpen={() => setModal(true)} /></div>
      </div>

      <MemoryModal open={modal} onClose={() => setModal(false)} />
    </section>
  );
}

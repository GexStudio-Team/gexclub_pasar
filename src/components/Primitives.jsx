import React, { useState } from "react";
import { BRAND } from "../data";
import { useInView, useParallax } from "../hooks";

/* ───────────────────────── PRIMITIVAS UI ───────────────────────── */

export const isPlaceholder = (v) => typeof v === "string" && v.trim().startsWith("[");

/** Pinta los textos pendientes en ámbar con borde discontinuo. */
export function Ph({ children, className = "" }) {
  if (!isPlaceholder(children)) return <span className={className}>{children}</span>;
  return (
    <span className={`${className} rounded-md border border-dashed border-amber-400/50 bg-amber-400/[.06] px-1.5 text-amber-300/90`}>
      {children}
    </span>
  );
}

export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`rv ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function SpotCard({ className = "", children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      className={`spot rounded-3xl border border-white/[.07] bg-white/[.015] backdrop-blur-[2px] transition-colors duration-500 hover:bg-white/[.025] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ index, children }) {
  return (
    <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[.25em] text-white/45">
      <span className="text-[#0078FF]">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      {children}
    </div>
  );
}

export function GiantWord({ text, speed = 0.25, fill = false, className = "" }) {
  const ref = useParallax(speed, "x");
  return (
    <div aria-hidden className={`pointer-events-none relative select-none overflow-hidden ${className}`}>
      <div ref={ref} className={`giant ${fill ? "fill" : ""} text-center text-[26vw] will-change-transform`}>
        {text}
      </div>
    </div>
  );
}

export function Logo({ compact = false }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <a href="#inicio" className="group flex items-center gap-2.5" aria-label="GexClub — inicio">
      {imgOk ? (
        <img src={BRAND.logoMark} alt="" onError={() => setImgOk(false)} className="h-7 w-7 rounded-md object-cover" />
      ) : (
        <span className="mono grid h-7 w-7 place-items-center rounded-md bg-[#0078FF] text-[11px] font-bold text-white">GX</span>
      )}
      {!compact && (
        <span className="mono text-[13px] font-bold tracking-tight text-white">
          GEX<span className="text-[#0078FF]">_</span>CLUB
        </span>
      )}
    </a>
  );
}

/* Iconos de marca (lucide ya no incluye logos de terceros) */
export const GithubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
);
export const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
);

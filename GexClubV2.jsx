/**
 * GexClub — Web v2
 * React + Tailwind CSS + lucide-react. Canvas 2D nativo para la esfera de nodos (sin Three.js).
 *
 * ▸ Todo lo marcado con  [ COMPLETAR … ]  es un espacio reservado para datos reales.
 *   Edita el objeto PAST_EDITION y LINKS más abajo; la UI resalta en ámbar
 *   cualquier texto que empiece por "[" para que no se te escape ninguno.
 */
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Gamepad2, Cpu, Palette, Users, Bell, X, Calendar,
  MapPin, Trophy, MessageCircle, Menu, Check, Clock, Sparkles, Terminal, Image as ImageIcon,
} from "lucide-react";

/* ───────────────────────── DATOS EDITABLES ───────────────────────── */

const BRAND = {
  logoMark: "https://gexclub.novatechdevelopment.com/brand/gex-mark-dark-square.png",
  tagline: "Build the future together.",
  motto: "Create. Learn. Collaborate. Excel.",
};

const LINKS = {
  discord: "#", // [ COMPLETAR: invitación al servidor de Discord ]
  instagram: "https://www.instagram.com/joingexclub/",
  github: "https://github.com/GexStudio-Team",
  contacto: "https://gexclub.novatechdevelopment.com/contacto/",
};

// Primer hackatón (ya finalizado). Reemplaza los valores entre corchetes.
const PAST_EDITION = {
  edition: "Edición 01",
  title: "Gex Club Hackathon 2026",
  subtitle: "Crea el Futuro",
  date: "31 de octubre de 2026",
  time: "8:30 a. m. – 6:30 p. m.",
  location: "[ COMPLETAR: sede / ciudad ]",
  summary:
    "[ COMPLETAR: resumen de impacto en 2–3 líneas. Ej.: qué reto se planteó, qué se construyó y qué dejó la jornada en la comunidad. ]",
  stats: [
    { value: "[ 00 ]", label: "Participantes" },
    { value: "[ 00 ]", label: "Equipos" },
    { value: "[ 00 ]", label: "Proyectos entregados" },
    { value: "10 h", label: "De construcción" },
  ],
  winners: [
    { place: "1.er lugar", team: "[ Nombre del equipo ]", project: "[ Nombre del proyecto ]" },
    { place: "2.º lugar", team: "[ Nombre del equipo ]", project: "[ Nombre del proyecto ]" },
    { place: "3.er lugar", team: "[ Nombre del equipo ]", project: "[ Nombre del proyecto ]" },
  ],
  highlights: [
    "[ COMPLETAR: logro destacado 1 ]",
    "[ COMPLETAR: logro destacado 2 ]",
    "[ COMPLETAR: logro destacado 3 ]",
  ],
  partners: "[ COMPLETAR: mentores, jurado y aliados ]",
};

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "hackatones", label: "Hackatones" },
  { id: "comunidad", label: "Comunidad" },
];

/* ───────────────────────── ESTILOS GLOBALES ───────────────────────── */

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
:root{ --accent:#2F7BFF; --lime:#B6FF3B; --bg:#050507; }
html{ scroll-behavior:smooth; background:var(--bg); }
body{ background:var(--bg); }
.gx{ font-family:Inter,ui-sans-serif,system-ui,sans-serif; }
.gx .mono{ font-family:'JetBrains Mono',ui-monospace,monospace; }
.gx ::selection{ background:var(--accent); color:#fff; }

@keyframes gxWord{ from{opacity:0; filter:blur(16px); transform:translateY(35%)} to{opacity:1; filter:blur(0); transform:none} }
@keyframes gxFade{ from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:none} }
@keyframes gxSweep{ to{ transform:rotate(360deg) } }
@keyframes gxPing{ 0%{transform:scale(.4); opacity:.8} 100%{transform:scale(1); opacity:0} }
@keyframes gxBlink{ 0%,100%{opacity:1} 50%{opacity:.25} }
@keyframes gxPixel{ 0%,100%{opacity:.06} 50%{opacity:.65} }
@keyframes gxModal{ from{opacity:0; transform:translateY(24px) scale(.98)} to{opacity:1; transform:none} }

.gx-word{ display:inline-block; opacity:0; animation:gxWord 1s cubic-bezier(.2,.7,.1,1) forwards; will-change:transform,filter,opacity; }
.gx-fade{ opacity:0; animation:gxFade .9s cubic-bezier(.2,.7,.1,1) forwards; }

.rv{ opacity:0; transform:translateY(28px); filter:blur(6px); transition:opacity .9s cubic-bezier(.2,.7,.1,1), transform .9s cubic-bezier(.2,.7,.1,1), filter .9s; }
.rv.in{ opacity:1; transform:none; filter:none; }

.spot{ position:relative; isolation:isolate; }
.spot::before,.spot::after{ content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:0; transition:opacity .35s; }
.spot::before{ background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(47,123,255,.10), transparent 45%); z-index:-1; }
.spot::after{ padding:1px; background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(47,123,255,.85), rgba(182,255,59,.25) 30%, transparent 60%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
.spot:hover::before,.spot:hover::after{ opacity:1; }

.radar-sweep{ background:conic-gradient(from 0deg, rgba(47,123,255,.45), rgba(47,123,255,0) 22%); animation:gxSweep 4.5s linear infinite; }
.radar-ping{ animation:gxPing 3s cubic-bezier(.2,.6,.3,1) infinite; }
.blink{ animation:gxBlink 1.6s ease-in-out infinite; }
.gx-modal{ animation:gxModal .5s cubic-bezier(.2,.7,.1,1) both; }

.giant{ font-weight:800; letter-spacing:-.06em; line-height:.8; white-space:nowrap; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.09); }
.giant.fill{ color:rgba(255,255,255,.025); -webkit-text-stroke:0; }

@media (prefers-reduced-motion: reduce){
  .gx-word,.gx-fade{ animation:none; opacity:1; }
  .rv{ transition:none; opacity:1; transform:none; filter:none; }
  .radar-sweep,.radar-ping,.blink{ animation:none; }
}
`;

/* ───────────────────────── HOOKS ───────────────────────── */

function useInView(options = { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

/** Desplaza el elemento según su posición relativa al centro del viewport (sin re-render). */
function useParallax(speed = 0.25, axis = "x") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anchor = el.parentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = anchor.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const off = r.top + r.height / 2 - innerHeight / 2;
      el.style.transform = axis === "x"
        ? `translate3d(${off * speed}px,0,0)`
        : `translate3d(0,${off * speed}px,0)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [speed, axis]);
  return ref;
}

/* ───────────────────────── PRIMITIVAS UI ───────────────────────── */

const isPlaceholder = (v) => typeof v === "string" && v.trim().startsWith("[");

/** Pinta los textos pendientes en ámbar con borde discontinuo. */
function Ph({ children, className = "" }) {
  if (!isPlaceholder(children)) return <span className={className}>{children}</span>;
  return (
    <span className={`${className} rounded-md border border-dashed border-amber-400/50 bg-amber-400/[.06] px-1.5 text-amber-300/90`}>
      {children}
    </span>
  );
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`rv ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function SpotCard({ className = "", children, ...rest }) {
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

function Eyebrow({ index, children }) {
  return (
    <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[.25em] text-white/45">
      <span className="text-[#2F7BFF]">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      {children}
    </div>
  );
}

function GiantWord({ text, speed = 0.25, fill = false, className = "" }) {
  const ref = useParallax(speed, "x");
  return (
    <div aria-hidden className={`pointer-events-none relative select-none overflow-hidden ${className}`}>
      <div ref={ref} className={`giant ${fill ? "fill" : ""} text-center text-[26vw] will-change-transform`}>
        {text}
      </div>
    </div>
  );
}

function Logo({ compact = false }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <a href="#inicio" className="group flex items-center gap-2.5" aria-label="GexClub — inicio">
      {imgOk ? (
        <img src={BRAND.logoMark} alt="" onError={() => setImgOk(false)} className="h-7 w-7 rounded-md object-cover" />
      ) : (
        <span className="mono grid h-7 w-7 place-items-center rounded-md bg-[#2F7BFF] text-[11px] font-bold text-white">GX</span>
      )}
      {!compact && (
        <span className="mono text-[13px] font-bold tracking-tight text-white">
          GEX<span className="text-[#2F7BFF]">_</span>CLUB
        </span>
      )}
    </a>
  );
}

/* Iconos de marca (lucide ya no incluye logos de terceros) */
const GithubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
);
const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
);

/* ───────────────────────── ESFERA DE NODOS (Canvas) ───────────────────────── */

function NodeSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Distribución de Fibonacci → malla tipo geodésica
    const fib = (n) => {
      const pts = [], g = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i;
        pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
      }
      return pts;
    };
    const buildEdges = (pts, k) => {
      const seen = new Set(), out = [];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], d = [];
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const q = pts[j];
          d.push([j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2]);
        }
        d.sort((a, b) => a[1] - b[1]);
        for (let m = 0; m < k; m++) {
          const j = d[m][0], key = i < j ? i * 1000 + j : j * 1000 + i;
          if (!seen.has(key)) { seen.add(key); out.push(i, j); }
        }
      }
      return new Uint16Array(out);
    };

    const small = innerWidth < 768;
    const outer = fib(small ? 150 : 230), inner = fib(small ? 60 : 90);
    const eOuter = buildEdges(outer, 3), eInner = buildEdges(inner, 4);
    const pOuter = new Float32Array(outer.length * 3), pInner = new Float32Array(inner.length * 3);

    let w = 0, h = 0, raf = 0, running = false, t = 0;
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, px: -1e4, py: -1e4 };
    let scrollT = 0, scrollS = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (pts, out, R, ry, rx, cx, cy) => {
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx), f = R * 2.6;
      for (let i = 0; i < pts.length; i++) {
        const x = pts[i][0] * R, y = pts[i][1] * R, z = pts[i][2] * R;
        const x1 = x * cY - z * sY, z1 = x * sY + z * cY;
        const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
        const s = f / (f + z2);
        out[i * 3] = cx + x1 * s; out[i * 3 + 1] = cy + y1 * s; out[i * 3 + 2] = z2 / R; // depth −1 (cerca) … 1 (lejos)
      }
    };

    // Agrupa aristas en 4 cubos de opacidad → 4 strokes por esfera (rápido)
    const drawMesh = (proj, edges, rgb, baseA, lw) => {
      const buckets = [[], [], [], []];
      for (let e = 0; e < edges.length; e += 2) {
        const a = edges[e] * 3, b = edges[e + 1] * 3;
        const depth = (proj[a + 2] + proj[b + 2]) * 0.5; // −1..1
        const bi = Math.min(3, Math.max(0, Math.floor(((1 - depth) / 2) * 4)));
        buckets[bi].push(a, b);
      }
      ctx.lineWidth = lw;
      for (let k = 0; k < 4; k++) {
        const list = buckets[k];
        if (!list.length) continue;
        ctx.strokeStyle = `rgba(${rgb},${baseA * (0.15 + k * 0.28)})`;
        ctx.beginPath();
        for (let i = 0; i < list.length; i += 2) {
          ctx.moveTo(proj[list[i]], proj[list[i] + 1]);
          ctx.lineTo(proj[list[i + 1]], proj[list[i + 1] + 1]);
        }
        ctx.stroke();
      }
    };

    const drawNodes = (proj, n, rgb, baseA, size, cursor) => {
      for (let i = 0; i < n; i++) {
        const x = proj[i * 3], y = proj[i * 3 + 1], d = proj[i * 3 + 2];
        const near = (1 - d) / 2; // 0 lejos … 1 cerca
        let r = size * (0.45 + near * 0.9), a = baseA * (0.2 + near * 0.8);
        if (cursor) {
          const dx = x - mouse.px, dy = y - mouse.py, dist = Math.hypot(dx, dy);
          if (dist < 150 && near > 0.35) {
            const k = 1 - dist / 150;
            ctx.strokeStyle = `rgba(182,255,59,${k * 0.55})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(mouse.px, mouse.py); ctx.lineTo(x, y); ctx.stroke();
            r += k * 2.2; a = Math.min(1, a + k);
            ctx.fillStyle = `rgba(182,255,59,${a})`;
            ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
            continue;
          }
        }
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
    };

    const frame = () => {
      raf = 0;
      t += reduce ? 0 : 1;
      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;
      scrollS += (scrollT - scrollS) * 0.08;

      ctx.clearRect(0, 0, w, h);
      const base = Math.min(w, h) * (w < 768 ? 0.36 : 0.31);
      const cx = w / 2 + mouse.sx * 18, cy = h / 2 + mouse.sy * 14 - scrollS * h * 0.08;
      const p = Math.min(scrollS, 1.4);

      const ryO = t * 0.0022 + mouse.sx * 0.6 + p * 1.2;
      const rxO = 0.35 + mouse.sy * 0.45;
      const RO = base * (1 + p * 0.55);
      const RI = base * 0.52 * (1 + p * 1.9); // la esfera interna se expande y atraviesa la externa
      const fade = Math.max(0, 1 - p * 0.55);

      project(outer, pOuter, RO, ryO, rxO, cx, cy);
      project(inner, pInner, RI, -ryO * 1.6 + 0.8, rxO * -0.7, cx, cy);

      // halo central
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.25);
      g.addColorStop(0, `rgba(47,123,255,${0.14 * fade})`);
      g.addColorStop(1, "rgba(47,123,255,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      drawMesh(pInner, eInner, "182,255,59", 0.38 * fade, 0.6);
      drawMesh(pOuter, eOuter, "47,123,255", 0.55 * fade, 0.7);
      drawNodes(pInner, inner.length, "182,255,59", 0.7 * fade, 1.3, false);
      drawNodes(pOuter, outer.length, "120,165,255", 0.95 * fade, 1.6, true);

      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    const start = () => { if (!running) { running = true; if (!raf) raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); raf = 0; };
    const kick = () => { if (reduce && !raf) raf = requestAnimationFrame(frame); };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.px = e.clientX - r.left; mouse.py = e.clientY - r.top;
      mouse.x = (mouse.px / r.width) * 2 - 1; mouse.y = (mouse.py / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => { mouse.px = mouse.py = -1e4; mouse.x = mouse.y = 0; };
    const onScroll = () => { scrollT = scrollY / innerHeight; kick(); };

    resize(); onScroll();
    const ro = new ResizeObserver(() => { resize(); kick(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    addEventListener("scroll", onScroll, { passive: true });
    if (reduce) raf = requestAnimationFrame(frame);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

/* ───────────────────────── NAVBAR ───────────────────────── */

function Navbar() {
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
          scrolled ? "border-white/10 bg-[#0a0a0f]/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,.8)]" : "border-white/[.06] bg-white/[.03]"
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
            className="group hidden items-center gap-1.5 rounded-full bg-[#2F7BFF] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#4a8dff] sm:flex"
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
        <div className="gx-modal absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-3xl border border-white/10 bg-[#0a0a0f]/90 p-2 backdrop-blur-xl md:hidden">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-white/80 hover:bg-white/5">
              {label} <ArrowRight className="h-4 w-4 text-white/30" />
            </a>
          ))}
          <a href="#comunidad" onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[#2F7BFF] px-4 py-3 font-medium text-white">
            Unirse a GexClub
          </a>
        </div>
      )}
    </header>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
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
        <span key={i} data-w className={`transition-opacity duration-200 ${/GexClub|juntos/.test(w) ? "text-[#2F7BFF]" : ""}`}>
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
        <span key={i} className="aspect-square rounded-[3px] bg-[#2F7BFF]"
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
  const colors = ["text-[#2F7BFF]", "text-white/70", "text-white/40", "text-[#B6FF3B]/80", "text-white/80", "text-white/40"];
  return (
    <pre className="mono overflow-hidden rounded-2xl border border-white/[.06] bg-black/40 p-4 text-[11.5px] leading-6" aria-hidden>
      {lines.map((l, i) => (
        <div key={i}><span className="mr-3 text-white/20">{String(i + 1).padStart(2, "0")}</span>
          {l.map((tok, j) => <span key={j} className={colors[j % colors.length]}>{tok}</span>)}
        </div>
      ))}
      <div><span className="mr-3 text-white/20">04</span><span className="blink inline-block h-3.5 w-2 translate-y-0.5 bg-[#B6FF3B]" /></div>
    </pre>
  );
}

function Pillar({ code, icon: Icon, title, desc, tags, children, className = "", delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <SpotCard className="flex h-full flex-col justify-between gap-8 p-7 sm:p-8">
        <div className="flex items-start justify-between">
          <span className="mono text-[11px] tracking-[.2em] text-white/35">{code}</span>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-[#2F7BFF]">
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

function Ecosistema() {
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
              <div className="absolute -left-6 top-2 h-24 w-24 rounded-full bg-[#2F7BFF]/60 blur-2xl" />
              <div className="absolute right-0 -top-4 h-20 w-20 rounded-full bg-[#B6FF3B]/40 blur-2xl" />
              <div className="absolute bottom-3 left-4 mono text-[10px] tracking-widest text-white/60">#2F7BFF · #B6FF3B</div>
            </div>
          </Pillar>
          <Pillar className="md:col-span-6" code="P.04" icon={Users} delay={100}
            title="Comunidad Juvenil"
            desc="Mentorías, retos, hackatones y amistades que empiezan en un canal de voz y terminan en un proyecto. Para todas las edades, sin requisitos previos."
            tags={["Mentorías", "Retos", "Hackatones", "Talleres"]}>
            <div className="flex items-center gap-4" aria-hidden>
              <div className="flex -space-x-2">
                {["#2F7BFF", "#B6FF3B", "#7aa8ff", "#ffffff", "#3d5bff"].map((c, i) => (
                  <span key={i} className="h-9 w-9 rounded-full border-2 border-[#050507]" style={{ background: `radial-gradient(circle at 30% 30%, ${c}, #0b0b12 75%)` }} />
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
      <div className="radar-ping absolute inset-[30%] rounded-full border border-[#2F7BFF]/50" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F7BFF] shadow-[0_0_20px_4px_rgba(47,123,255,.6)]" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="mono mt-24 rounded-full border border-white/10 bg-[#050507]/80 px-3 py-1 text-[10px] uppercase tracking-[.25em] text-white/50">
          0 señales activas
        </span>
      </div>
    </div>
  );
}

function AlertForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | done

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("error"); return; }
    // TODO: conectar con tu backend / newsletter (Mailchimp, Brevo, Formspree, Supabase…)
    setStatus("done");
  };

  if (status === "done")
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#B6FF3B]/25 bg-[#B6FF3B]/[.06] px-5 py-4 text-sm text-white/85" role="status">
        <Check className="h-4 w-4 text-[#B6FF3B]" />
        Listo. Te escribiremos en cuanto anunciemos la próxima convocatoria.
      </div>
    );

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="gx-email" className="mono mb-2 block text-[11px] uppercase tracking-[.2em] text-white/40">
        Recibir alerta de la próxima edición
      </label>
      <div className={`flex flex-col gap-2 rounded-2xl border bg-black/30 p-1.5 transition sm:flex-row sm:rounded-full ${
        status === "error" ? "border-red-400/50" : "border-white/10 focus-within:border-[#2F7BFF]/60"}`}>
        <input id="gx-email" type="email" inputMode="email" autoComplete="email" placeholder="tu@correo.com" value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none" />
        <button type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/[.06] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2F7BFF] sm:rounded-full">
          <Bell className="h-4 w-4" /> Avisarme
        </button>
      </div>
      <p className={`mt-2 text-xs ${status === "error" ? "text-red-300/80" : "text-white/35"}`}>
        {status === "error" ? "Revisa el formato del correo." : "Sin spam. Un solo correo cuando haya nueva convocatoria."}
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
                <div key={k} className="bg-[#08080c] px-4 py-3.5">
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
      <Check className="h-3 w-3 text-[#B6FF3B]" /> Finalizado • Edición pasada
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
          <div className="relative min-h-[260px] overflow-hidden border-b border-white/[.06] bg-[linear-gradient(135deg,#0b1430_0%,#050507_70%)] lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute -bottom-10 -left-4 select-none text-[13rem] font-extrabold leading-none tracking-[-.08em] text-white/[.06]">01</div>
            <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-[#2F7BFF]/30 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
              <span className="mono text-[11px] uppercase tracking-[.25em] text-white/45">{e.edition}</span>
              <div>
                <p className="mono text-[11px] uppercase tracking-[.25em] text-[#B6FF3B]/80">{e.subtitle}</p>
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

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.07] bg-white/[.07] sm:grid-cols-4">
              {e.stats.map((s) => (
                <div key={s.label} className="bg-[#08080c] px-4 py-4">
                  <div className="text-2xl font-semibold tracking-tight text-white"><Ph>{s.value}</Ph></div>
                  <div className="mono mt-1 text-[10px] uppercase tracking-[.15em] text-white/40">{s.label}</div>
                </div>
              ))}
            </div>

            <button onClick={onOpen}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-[#2F7BFF] hover:bg-[#2F7BFF]/10">
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
      <div className="absolute inset-0 bg-[#050507]/75 backdrop-blur-md" onClick={onClose} />
      <div className="gx-modal relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0a0a0f] sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[.06] bg-[#0a0a0f]/90 px-6 py-4 backdrop-blur sm:px-8">
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

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {e.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4">
                <div className="text-2xl font-semibold text-white"><Ph>{s.value}</Ph></div>
                <div className="mono mt-1 text-[10px] uppercase tracking-[.15em] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          <h4 className="mono mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-white/45">
            <Trophy className="h-3.5 w-3.5 text-[#B6FF3B]" /> Ganadores
          </h4>
          <ol className="mt-4 divide-y divide-white/[.06] rounded-2xl border border-white/[.07]">
            {e.winners.map((w) => (
              <li key={w.place} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="mono text-[11px] uppercase tracking-[.18em] text-[#2F7BFF]">{w.place}</span>
                <span className="text-sm text-white/80"><Ph>{w.team}</Ph> <span className="text-white/30">·</span> <Ph className="text-white/50">{w.project}</Ph></span>
              </li>
            ))}
          </ol>

          <h4 className="mono mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-white/45">
            <Sparkles className="h-3.5 w-3.5 text-[#B6FF3B]" /> Logros e impacto
          </h4>
          <ul className="mt-4 space-y-3">
            {e.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/65">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F7BFF]" /><Ph>{h}</Ph>
              </li>
            ))}
          </ul>

          <h4 className="mono mt-10 flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-white/45">
            <ImageIcon className="h-3.5 w-3.5 text-[#B6FF3B]" /> Galería
          </h4>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              // Sustituye por <img src="..." alt="..." className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div key={n} className="mono grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-amber-400/40 bg-amber-400/[.04] text-[10px] uppercase tracking-widest text-amber-300/70">
                [ Foto {n} ]
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-white/45"><span className="text-white/60">Mentores, jurado y aliados:</span> <Ph>{e.partners}</Ph></p>

          <div className="mt-10 rounded-2xl border border-white/[.07] bg-white/[.02] px-5 py-4 text-sm text-white/55">
            Esta edición ya finalizó y no admite registros. ¿Quieres participar en la próxima?{" "}
            <a href="#hackatones" onClick={onClose} className="text-[#7aa8ff] underline-offset-4 hover:underline">Activa la alerta del radar</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

function Hackatones() {
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

/* ───────────────────────── COMUNIDAD + FOOTER ───────────────────────── */

function Comunidad() {
  const channels = [
    { href: LINKS.discord, icon: MessageCircle, label: "Servidor de Discord", hint: "Canales, voz y eventos", primary: true },
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
          {channels.map(({ href, icon: Icon, label, hint, primary }, i) => (
            <Reveal key={label} delay={200 + i * 80}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block h-full">
                <SpotCard className={`group flex h-full items-center justify-between gap-4 p-5 ${primary ? "border-[#2F7BFF]/40 bg-[#2F7BFF]/[.08]" : ""}`}>
                  <div className="flex items-center gap-4">
                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${primary ? "bg-[#2F7BFF] text-white" : "border border-white/10 text-white/80"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[15px] font-medium text-white">{label}</div>
                      <div className="text-xs text-white/40">{hint}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </SpotCard>
              </a>
            </Reveal>
          ))}
        </div>
        {LINKS.discord === "#" && (
          <p className="mono mt-4 text-[10px] uppercase tracking-widest text-amber-300/70">[ COMPLETAR: enlace de invitación a Discord ]</p>
        )}
      </div>
    </section>
  );
}

function Footer() {
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

/* ───────────────────────── LIQUID FORGE (metal líquido → control) ─────────────────────────
 * Animación 3D controlada por scroll con Three.js r147.
 * En el Artifact se carga desde jsDelivr. En un proyecto con npm puedes instalar `three@0.147.0`
 * y asignar window.THREE antes de montar, o adaptar ensureThree() a imports.
 */

const THREE_SRC = [
  "https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js",
  "https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/environments/RoomEnvironment.js",
  "https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/geometries/RoundedBoxGeometry.js",
];
let threePromise;
function ensureThree() {
  if (window.THREE && window.THREE.RoomEnvironment && window.THREE.RoundedBoxGeometry) return Promise.resolve(window.THREE);
  if (threePromise) return threePromise;
  const load = (src) => new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = src; s.async = false;
    s.onload = res; s.onerror = () => rej(new Error("No se pudo cargar " + src));
    document.head.appendChild(s);
  });
  threePromise = THREE_SRC.reduce((p, src) => p.then(() => (src.includes("/build/") && window.THREE ? null : load(src))), Promise.resolve())
    .then(() => window.THREE);
  return threePromise;
}

const FORGE_STAGES = [
  [0.0, "Idea", "Todo proyecto empieza como algo sin forma."],
  [0.15, "Impulso", "Le das energía y la idea se levanta."],
  [0.29, "Prototipo", "Primera versión: simple, redonda y funcional."],
  [0.46, "Arquitectura", "Se aplana y se ordena. Ahora hay una base."],
  [0.55, "Iteración", "Pruebas, errores, picos. Así se aprende de verdad."],
  [0.645, "Ensamblaje", "Código, electrónica y diseño encajan pieza por pieza."],
  [0.85, "Tu juego", "Del caos al control. Esto se construye en GexClub."],
];

function createForge({ THREE, canvas, stage, track, onStage, onProgress }) {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Perlin 3D
  const perm = new Uint8Array(512);
  { const p = [...Array(256).keys()]; let s = 1337;
    for (let i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]]; }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255]; }
  const fd = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const gr = (h, x, y, z) => { h &= 15; const u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z; return (h & 1 ? -u : u) + (h & 2 ? -v : v); };
  const noise = (x, y, z) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fd(x), v = fd(y), w = fd(z);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z, B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
    return lerp(lerp(lerp(gr(perm[AA], x, y, z), gr(perm[BA], x - 1, y, z), u), lerp(gr(perm[AB], x, y - 1, z), gr(perm[BB], x - 1, y - 1, z), u), v),
      lerp(lerp(gr(perm[AA + 1], x, y, z - 1), gr(perm[BA + 1], x - 1, y, z - 1), u), lerp(gr(perm[AB + 1], x, y - 1, z - 1), gr(perm[BB + 1], x - 1, y - 1, z - 1), u), v), w);
  };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  const blue = new THREE.PointLight(0x2f7bff, 3.2, 16); blue.position.set(-3.5, 2.2, -2.5); scene.add(blue);
  const lime = new THREE.PointLight(0xb6ff3b, 1.8, 14); lime.position.set(3.5, 1.2, -3); scene.add(lime);
  const keyL = new THREE.DirectionalLight(0xffffff, 0.6); keyL.position.set(2, 6, 4); scene.add(keyL);

  // Reflejo / halo en el suelo
  const glowTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d");
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    r.addColorStop(0, "rgba(47,123,255,0.55)"); r.addColorStop(0.45, "rgba(47,123,255,0.12)"); r.addColorStop(1, "rgba(47,123,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(c);
  })();
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo.rotation.x = -Math.PI / 2; halo.position.y = 0.001; scene.add(halo);

  /* metal líquido */
  const liquid = new THREE.MeshPhysicalMaterial({ color: 0x020203, metalness: 0.15, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.25 });
  const small = innerWidth < 768;
  const blobGeo = new THREE.SphereGeometry(1, small ? 140 : 190, small ? 100 : 130);
  const blob = new THREE.Mesh(blobGeo, liquid); scene.add(blob);
  const posAttr = blobGeo.attributes.position, VN = posAttr.count, base = new Float32Array(posAttr.array);
  const spikeF = new Float32Array(VN), liftF = new Float32Array(VN);
  {
    const N = 110, dirs = [], g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2 * 0.86 - 0.02, r = Math.sqrt(1 - y * y), t = g * i; dirs.push([Math.cos(t) * r, y, Math.sin(t) * r]); }
    for (let i = 0; i < VN; i++) {
      const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2];
      let m = -1; for (const d of dirs) { const dt = x * d[0] + y * d[1] + z * d[2]; if (dt > m) m = dt; }
      spikeF[i] = Math.pow(clamp((m - 0.983) / 0.017), 1.15) * (y > -0.55 ? 1 : 0.15);
      liftF[i] = Math.pow(Math.max(0, y), 4);
    }
  }
  // [p, sx, sy, sz, hover, ruido, lift, púas]
  const BK = [
    [0.0, 1.6, 0.07, 1.6, 0, 0.16, 0, 0], [0.09, 1.6, 0.07, 1.6, 0, 0.16, 0, 0],
    [0.22, 0.85, 0.95, 0.85, 0, 0.22, 1.1, 0], [0.33, 1, 1, 1, 0.35, 0, 0, 0], [0.43, 1, 1, 1, 0.35, 0, 0, 0],
    [0.51, 1.75, 0.2, 1.75, 0.1, 0.03, 0, 0], [0.58, 1.05, 0.85, 1.05, 0.15, 0.05, 0, 0.85], [0.65, 1.05, 0.85, 1.05, 0.2, 0.05, 0, 1],
    [0.74, 0, 0, 0, 0.5, 0.1, 0, 0.2], [1, 0, 0, 0, 0.5, 0, 0, 0],
  ];
  const sampleKeys = (keys, p) => {
    let i = 0; while (i < keys.length - 2 && p > keys[i + 1][0]) i++;
    const a = keys[i], b = keys[i + 1], t = easeInOut(clamp((p - a[0]) / (b[0] - a[0] || 1)));
    return a.map((v, k) => lerp(v, b[k], t));
  };
  function updateBlob(p, time) {
    const [, sx, sy, sz, hover, nAmp, lift, spike] = sampleKeys(BK, p);
    blob.visible = sx > 0.01; if (!blob.visible) return;
    blob.scale.set(sx, sy, sz);
    blob.position.y = sy + hover + Math.sin(time * 1.4) * 0.04 * hover;
    blob.rotation.y = time * 0.15 + p * 4;
    const arr = posAttr.array, t = time * 0.55, f = sy < 0.3 ? 2.6 : 1.6;
    for (let i = 0; i < VN; i++) {
      const j = i * 3, x = base[j], y = base[j + 1], z = base[j + 2];
      let r = 1;
      if (nAmp > 0.001) r += nAmp * noise(x * f + t, y * f + t * 0.6, z * f - t * 0.8);
      if (spike > 0.001) r += spike * spikeF[i] * (1.15 + 0.1 * Math.sin(time * 3 + i * 0.013));
      let yy = y * r;
      if (lift > 0.001) yy += lift * liftF[i] * (1.1 + 0.25 * noise(x * 2 + t, 3.1, z * 2));
      arr[j] = x * r; arr[j + 1] = yy; arr[j + 2] = z * r;
    }
    posAttr.needsUpdate = true; blobGeo.computeVertexNormals();
  }

  /* control de videojuego (primitivas) */
  const M = {
    shell: new THREE.MeshPhysicalMaterial({ color: 0x07080b, metalness: 0.25, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.85 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x15161b, roughness: 0.8, envMapIntensity: 0.5 }),
    pcb: new THREE.MeshStandardMaterial({ color: 0x0a1f52, emissive: 0x2f7bff, emissiveIntensity: 0.25, roughness: 0.5 }),
    chip: new THREE.MeshStandardMaterial({ color: 0x0c0c0e, metalness: 0.4, roughness: 0.4 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xbfc4cc, metalness: 1, roughness: 0.2 }),
    blue: new THREE.MeshStandardMaterial({ color: 0x2f7bff, emissive: 0x2f7bff, emissiveIntensity: 0.2, roughness: 0.3 }),
    lime: new THREE.MeshStandardMaterial({ color: 0xb6ff3b, emissive: 0xb6ff3b, emissiveIntensity: 0.15, roughness: 0.3 }),
    white: new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.35 }),
    bar: new THREE.MeshStandardMaterial({ color: 0x2f7bff, emissive: 0x2f7bff, emissiveIntensity: 0, roughness: 0.2 }),
  };
  const pad = new THREE.Group(); scene.add(pad);
  const parts = [], CENTER = new THREE.Vector3(0, 0.2, 0);
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  function part(geo, mat, pos, rot = [0, 0, 0], t0 = 0.66, dur = 0.08, scl = [1, 1, 1]) {
    const mesh = new THREE.Mesh(geo, mat);
    const final = new THREE.Vector3(...pos);
    parts.push({ mesh, final, frot: new THREE.Euler(...rot), fscale: new THREE.Vector3(...scl),
      start: CENTER.clone().lerp(final, 0.1).add(new THREE.Vector3((rnd() - 0.5) * 0.4, (rnd() - 0.2) * 0.5, (rnd() - 0.5) * 0.4)),
      spin: new THREE.Vector3((rnd() - 0.5) * 3, (rnd() - 0.5) * 3, (rnd() - 0.5) * 3), t0, t1: t0 + dur });
    pad.add(mesh); return mesh;
  }
  const RB = (w, h, d, r = 0.04) => new THREE.RoundedBoxGeometry(w, h, d, 4, r);
  const BX = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const CY = (a, b, h, s = 36) => new THREE.CylinderGeometry(a, b, h, s);
  const SP = (r, a = 32, b = 24) => new THREE.SphereGeometry(r, a, b);

  // interior
  part(BX(1.9, 0.035, 0.78), M.pcb, [0, -0.02, -0.02], [0, 0, 0], 0.645, 0.07);
  for (const [x, z, w, d] of [[-0.35, -0.1, 0.28, 0.28], [0.25, 0.12, 0.2, 0.2], [0.55, -0.18, 0.16, 0.12], [-0.05, 0.22, 0.14, 0.1]])
    part(BX(w, 0.05, d), M.chip, [x, 0.02, z], [0, 0, 0], 0.66 + rnd() * 0.02, 0.06);
  part(RB(0.7, 0.12, 0.32, 0.04), M.metal, [0, 0.07, 0.26], [0, 0, 0], 0.675, 0.06); // batería
  for (const x of [-1.05, 1.05]) part(CY(0.12, 0.12, 0.2, 24), M.metal, [x, -0.02, 0.4], [Math.PI / 2, 0, 0], 0.68, 0.06); // motores de vibración

  // carcasa
  part(RB(2.4, 0.32, 1.02, 0.15), M.shell, [0, 0, 0], [0, 0, 0], 0.72, 0.08);
  for (const x of [-1.04, 1.04]) part(SP(1, 40, 28), M.shell, [x * 0.97, -0.05, 0.34], [0, x < 0 ? 0.25 : -0.25, x < 0 ? 0.3 : -0.3], 0.735, 0.08, [0.4, 0.21, 0.56]);
  for (const x of [-0.85, 0.85]) {
    part(RB(0.62, 0.12, 0.2, 0.05), M.rubber, [x, 0.08, -0.55], [0, 0, 0], 0.75, 0.06);
    part(RB(0.42, 0.18, 0.2, 0.06), M.rubber, [x, -0.06, -0.62], [0.35, 0, 0], 0.755, 0.06);
  }
  // cruceta
  part(RB(0.4, 0.07, 0.12, 0.025), M.rubber, [-0.8, 0.18, -0.08], [0, 0, 0], 0.77, 0.06);
  part(RB(0.12, 0.07, 0.4, 0.025), M.rubber, [-0.8, 0.18, -0.08], [0, 0, 0], 0.772, 0.06);
  // botones de acción
  for (const [dx, dz, mat] of [[0, -0.17, M.blue], [0.17, 0, M.lime], [0, 0.17, M.white], [-0.17, 0, M.blue]])
    part(SP(0.075), mat, [0.8 + dx, 0.17, -0.08 + dz], [0, 0, 0], 0.775 + rnd() * 0.015, 0.06, [1, 0.55, 1]);
  // joysticks
  for (const [x, ring] of [[-0.38, M.blue], [0.38, M.lime]]) {
    part(CY(0.2, 0.22, 0.06), M.rubber, [x, 0.17, 0.27], [0, 0, 0], 0.785, 0.06);
    part(CY(0.06, 0.06, 0.16, 16), M.rubber, [x, 0.25, 0.27], [0, 0, 0], 0.79, 0.06);
    part(CY(0.16, 0.15, 0.06), M.rubber, [x, 0.34, 0.27], [0, 0, 0], 0.795, 0.06);
    part(new THREE.TorusGeometry(0.155, 0.012, 10, 40), ring, [x, 0.37, 0.27], [Math.PI / 2, 0, 0], 0.8, 0.06);
  }
  // centro
  for (const x of [-0.2, 0.2]) part(RB(0.14, 0.04, 0.06, 0.02), M.rubber, [x, 0.17, -0.22], [0, 0, 0], 0.805, 0.05);
  part(CY(0.08, 0.08, 0.04), M.bar, [0, 0.17, 0.02], [0, 0, 0], 0.81, 0.05);
  part(BX(0.9, 0.03, 0.035), M.bar, [0, 0.06, -0.515], [0, 0, 0], 0.815, 0.05); // barra de luz

  function updatePad(p, time) {
    for (const o of parts) {
      const k = clamp((p - o.t0) / (o.t1 - o.t0)), m = o.mesh;
      if (k <= 0) { m.visible = false; continue; }
      m.visible = true;
      const e = easeOut(k);
      m.position.lerpVectors(o.start, o.final, e);
      m.position.y += Math.sin(e * Math.PI) * 0.3;
      m.rotation.set(o.frot.x + o.spin.x * (1 - e), o.frot.y + o.spin.y * (1 - e), o.frot.z + o.spin.z * (1 - e));
      const s = 0.05 + 0.95 * easeOut(clamp(k * 1.4));
      m.scale.set(o.fscale.x * s, o.fscale.y * s, o.fscale.z * s);
    }
    const glow = smooth(clamp((p - 0.84) / 0.06));
    M.bar.emissiveIntensity = glow * 2.6;
    M.blue.emissiveIntensity = 0.2 + glow * 0.9;
    M.lime.emissiveIntensity = 0.15 + glow * 0.8;
    const fin = smooth(clamp((p - 0.82) / 0.16));
    pad.position.y = 1.0;
    pad.rotation.set(fin * 0.38, -0.25 + Math.sin(time * 0.5) * 0.1 * fin, Math.sin(time * 0.7) * 0.04 * fin);
    halo.material.opacity = 0.6 + glow * 0.6;
  }

  // [p, camX, camY, camZ, tx, ty, tz]
  const CK = [
    [0, 0, 5.2, 8.8, 0, 0.2, 0], [0.1, 0.6, 4.4, 8.4, 0, 0.3, 0], [0.22, 3.4, 2.2, 6.6, 0, 1.0, 0],
    [0.36, 0.4, 1.7, 6.4, 0, 1.3, 0], [0.5, -2.0, 4.6, 6.2, 0, 0.5, 0], [0.62, -4.2, 2.4, 6.0, 0, 1.0, 0],
    [0.74, 2.6, 4.4, 5.4, 0, 0.9, 0], [0.88, 0.8, 3.4, 7.4, 0, 1.0, 0], [1, 0, 2.8, 7.6, 0, 1.05, 0],
  ];
  const tgt = new THREE.Vector3();

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = w < 860 ? 44 : 30;
    if (w >= 860) camera.setViewOffset(w, h, -w * 0.15, 0, w, h); else camera.setViewOffset(w, h, 0, h * 0.08, w, h);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(stage); resize();

  let target = 0, current = 0, visible = false, raf = 0, lastStage = -1;
  const readScroll = () => { const r = track.getBoundingClientRect(); target = clamp(-r.top / (r.height - innerHeight)); };
  addEventListener("scroll", readScroll, { passive: true }); readScroll(); current = target;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(stage);

  const clock = new THREE.Clock();
  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const time = reduce ? 0 : clock.getElapsedTime();
    current += (target - current) * (reduce ? 1 : 0.085);
    const p = current;
    updateBlob(p, time); updatePad(p, time);
    const c = sampleKeys(CK, p);
    camera.position.set(c[1], c[2], c[3]); tgt.set(c[4], c[5], c[6]); camera.lookAt(tgt);
    let si = 0; for (let i = 0; i < FORGE_STAGES.length; i++) if (p >= FORGE_STAGES[i][0]) si = i;
    if (si !== lastStage) { lastStage = si; onStage(si); }
    onProgress(p);
    renderer.render(scene, camera);
  };
  frame();

  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    removeEventListener("scroll", readScroll);
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    Object.values(M).forEach((m) => m.dispose()); liquid.dispose(); glowTex.dispose(); envTex.dispose(); pmrem.dispose();
    renderer.dispose();
  };
}

function LiquidForge() {
  const trackRef = useRef(null), stageRef = useRef(null), canvasRef = useRef(null), barRef = useRef(null), pctRef = useRef(null);
  const [stageIdx, setStageIdx] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let dispose, alive = true;
    ensureThree()
      .then((THREE) => {
        if (!alive) return;
        dispose = createForge({
          THREE, canvas: canvasRef.current, stage: stageRef.current, track: trackRef.current,
          onStage: setStageIdx,
          onProgress: (p) => {
            if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
            if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(2, "0");
          },
        });
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => { alive = false; dispose && dispose(); };
  }, []);

  const [, title, desc] = FORGE_STAGES[stageIdx];
  return (
    <section id="forja" ref={trackRef} className="relative" style={{ height: "640vh" }} aria-label="De una idea a tu primer juego">
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(120%_90%_at_62%_45%,#0b1226_0%,#050507_60%)]">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
        {status !== "ready" && (
          <div className="mono absolute inset-0 grid place-items-center text-[11px] uppercase tracking-[.3em] text-white/35">
            {status === "error" ? "No se pudo cargar la animación 3D" : "Fundiendo material…"}
          </div>
        )}

        <div className="pointer-events-none absolute left-6 top-[18vh] z-10 max-w-[88vw] sm:left-[5vw] md:max-w-[min(520px,44vw)]">
          <Eyebrow index="02">La forja</Eyebrow>
          <h2 className="mt-6 text-[11vw] font-extrabold uppercase leading-[.88] tracking-[-.045em] text-white md:text-[clamp(44px,6.2vw,96px)]">
            De una idea<br />líquida a tu<br />
            <span className="bg-gradient-to-r from-[#2F7BFF] to-[#B6FF3B] bg-clip-text text-transparent">primer juego.</span>
          </h2>
          <p className="mt-6 hidden max-w-[34ch] text-[15px] leading-relaxed text-white/55 md:block">
            Haz scroll y mira cómo una idea sin forma se convierte en algo que puedes sostener en tus manos.
          </p>
        </div>

        <div className="absolute bottom-[max(36px,6vh)] left-6 z-10 w-[min(360px,80vw)] sm:left-[5vw]" aria-live="polite">
          <div className="mono flex items-baseline gap-3 text-[11px] uppercase tracking-[.18em] text-white/35">
            <b className="font-medium text-[#B6FF3B]">{String(stageIdx + 1).padStart(2, "0")}</b>
            <span>/ {String(FORGE_STAGES.length).padStart(2, "0")}</span><span>Fase</span>
          </div>
          <div key={stageIdx} className="gx-fade" style={{ animationDuration: ".5s" }}>
            <h3 className="mt-3 text-2xl font-bold tracking-[-.02em] text-white">{title}</h3>
            <p className="mt-1 min-h-[3em] text-sm leading-relaxed text-white/55">{desc}</p>
          </div>
        </div>

        <div className="mono absolute right-[max(24px,3vw)] top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] tracking-[.15em] text-white/35 md:flex" aria-hidden>
          <span ref={pctRef}>00</span>
          <div className="relative h-[28vh] w-px overflow-hidden bg-white/10">
            <i ref={barRef} className="absolute inset-0 origin-top bg-[#2F7BFF]" style={{ transform: "scaleY(0)" }} />
          </div>
          <span>100</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── APP ───────────────────────── */

export default function GexClubV2() {
  return (
    <div className="gx relative min-h-screen overflow-x-clip bg-[#050507] text-white antialiased">
      <style>{GLOBAL_CSS}</style>
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

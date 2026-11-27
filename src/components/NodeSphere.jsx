import React, { useEffect, useRef } from "react";

/* ───────────────────────── ESFERA DE NODOS (Canvas) ───────────────────────── */

export function NodeSphere() {
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
            ctx.strokeStyle = `rgba(157,184,255,${k * 0.55})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(mouse.px, mouse.py); ctx.lineTo(x, y); ctx.stroke();
            r += k * 2.2; a = Math.min(1, a + k);
            ctx.fillStyle = `rgba(157,184,255,${a})`;
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
      g.addColorStop(0, `rgba(0,120,255,${0.14 * fade})`);
      g.addColorStop(1, "rgba(0,120,255,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      drawMesh(pInner, eInner, "157,184,255", 0.38 * fade, 0.6);
      drawMesh(pOuter, eOuter, "0,120,255", 0.55 * fade, 0.7);
      drawNodes(pInner, inner.length, "157,184,255", 0.7 * fade, 1.3, false);
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

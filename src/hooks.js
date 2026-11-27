import { useEffect, useRef, useState } from "react";

/* ───────────────────────── HOOKS ───────────────────────── */

export function useInView(options = { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }) {
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
export function useParallax(speed = 0.25, axis = "x") {
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

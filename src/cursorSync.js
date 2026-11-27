/* Sincronización de cursores en desarrollo, sobre el WebSocket de HMR de Vite.
 * Solo se activa con `import.meta.env.DEV`. No se incluye en el build de producción.
 */

const COLORS = {
  AGENTE: "#B6FF3B",
  INVITADO: "#2F7BFF",
};

let started = false;

export function initCursorSync() {
  if (!import.meta.hot || started) return;
  started = true;

  const hot = import.meta.hot;
  const params = new URLSearchParams(location.search);
  const name = (params.get("cursor") || "INVITADO").toUpperCase();
  const color = COLORS[name] || "#FFB84D";
  const id = `${name}-${Math.random().toString(36).slice(2, 10)}`;
  const cursors = new Map();

  const layer = document.createElement("div");
  layer.id = "gx-live-cursors";
  layer.style.cssText =
    "position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:hidden;";
  document.body.appendChild(layer);

  const badge = document.createElement("div");
  badge.id = "gx-live-cursors-badge";
  badge.style.cssText =
    "position:fixed;left:14px;bottom:14px;background:#0a0a0f;border:1px solid rgba(182,255,59,.35);color:#B6FF3B;font:600 10px/1.4 ui-monospace,monospace;letter-spacing:.14em;padding:6px 10px;border-radius:99px;display:flex;align-items:center;gap:7px;";
  badge.innerHTML =
    '<span style="width:7px;height:7px;border-radius:50%;background:#B6FF3B;animation:gx-live-pulse 1.2s infinite"></span><span id="gx-live-count">CURSORES EN VIVO · 0</span>';
  layer.appendChild(badge);

  const style = document.createElement("style");
  style.textContent =
    "@keyframes gx-live-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}";
  document.head.appendChild(style);

  const count = () => {
    const el = badge.querySelector("#gx-live-count");
    if (el) el.textContent = `CURSORES EN VIVO · ${cursors.size}`;
  };

  const remove = (cursorId) => {
    const entry = cursors.get(cursorId);
    if (!entry) return;
    entry.el.remove();
    cursors.delete(cursorId);
    count();
  };

  const make = (payload) => {
    const el = document.createElement("div");
    el.style.cssText =
      "position:absolute;left:0;top:0;will-change:transform;transition:transform .09s linear;";
    el.innerHTML =
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.75))">` +
      `<path d="M4 2.5 19.5 12l-7 1.2-3.3 6.8L4 2.5Z" fill="${payload.color}" stroke="#050507" stroke-width="1.3"/></svg>` +
      `<span style="position:absolute;left:16px;top:16px;white-space:nowrap;background:#0a0a0f;border:1px solid ${payload.color}88;color:${payload.color};font:600 10px/1.4 ui-monospace,monospace;letter-spacing:.14em;padding:3px 7px;border-radius:6px;">${payload.name}</span>`;
    layer.appendChild(el);
    return el;
  };

  const ripple = (x, y, cursorColor) => {
    const ring = document.createElement("div");
    ring.style.cssText =
      `position:absolute;left:${x}px;top:${y}px;width:10px;height:10px;margin:-5px 0 0 -5px;border:2px solid ${cursorColor};border-radius:50%;transition:all .5s ease-out;`;
    layer.appendChild(ring);
    requestAnimationFrame(() => {
      ring.style.width = "46px";
      ring.style.height = "46px";
      ring.style.margin = "-23px 0 0 -23px";
      ring.style.opacity = "0";
    });
    setTimeout(() => ring.remove(), 560);
  };

  const render = (payload) => {
    if (!payload || !payload.id) return;
    if (payload.type === "leave") {
      remove(payload.id);
      return;
    }
    let entry = cursors.get(payload.id);
    if (!entry) {
      entry = { el: make(payload), t: Date.now() };
      cursors.set(payload.id, entry);
      count();
    }
    entry.t = Date.now();
    entry.el.style.transform = `translate(${payload.x}px, ${payload.y}px)`;
    if (payload.type === "click") ripple(payload.x, payload.y, payload.color);
  };

  hot.on("gx-cursor", render);

  let lastMove = 0;
  const send = (event, type) => {
    const now = Date.now();
    if (type === "move" && now - lastMove < 32) return;
    lastMove = now;
    const payload = {
      id,
      name,
      color,
      x: event.clientX,
      y: event.clientY,
      type,
    };
    render(payload);
    hot.send("gx-cursor", payload);
  };

  addEventListener("pointermove", (event) => send(event, "move"), { passive: true });
  addEventListener("pointerdown", (event) => send(event, "click"), { passive: true });
  addEventListener("beforeunload", () => hot.send("gx-cursor", { id, type: "leave" }));

  setInterval(() => {
    for (const [cursorId, entry] of cursors) {
      if (Date.now() - entry.t > 15000) remove(cursorId);
    }
  }, 5000);

  window.__gxCursorSync = {
    id,
    name,
    remote: () => [...cursors.keys()],
    stop: () => {
      removeEventListener("pointermove", send);
      hot.off("gx-cursor");
      layer.remove();
      style.remove();
      started = false;
      return "sincronización detenida";
    },
  };
}

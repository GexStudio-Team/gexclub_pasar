/* Cursor de trabajo del agente: aparece solo cuando cambia un archivo real.
 * Lo dispara el watcher de Vite (`gx-work`), nunca el ratón ni un temporizador.
 * Solo desarrollo; no se incluye en el build de producción.
 */

let started = false;

const sectionFor = (file) => {
  if (/Navbar\.jsx$/.test(file)) return null;
  if (/(Hero|NodeSphere)\.jsx$/.test(file)) return "inicio";
  if (/Ecosistema\.jsx$/.test(file)) return "ecosistema";
  if (/LiquidForge\.jsx$/.test(file)) return "forja";
  if (/Hackatones\.jsx$|data\.js$/.test(file)) return "hackatones";
  if (/(Comunidad|Footer)\.jsx$/.test(file)) return "comunidad";
  return null;
};

export function initCursorSync() {
  if (!import.meta.hot || started) return;
  started = true;
  const hot = import.meta.hot;

  const layer = document.createElement("div");
  layer.id = "gx-work-cursor";
  layer.style.cssText =
    "position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:hidden;";
  document.body.appendChild(layer);

  const cursor = document.createElement("div");
  cursor.style.cssText =
    "position:absolute;left:0;top:0;will-change:transform,opacity;opacity:0;transition:opacity .25s ease,transform .12s linear;";
  cursor.innerHTML =
    '<svg width="25" height="25" viewBox="0 0 24 24" fill="none" style="filter:drop-shadow(0 2px 7px rgba(0,0,0,.8))">' +
    '<path d="M4 2.5 19.5 12l-7 1.2-3.3 6.8L4 2.5Z" fill="#9DB8FF" stroke="#01020A" stroke-width="1.3"/></svg>' +
    '<span style="position:absolute;left:17px;top:17px;white-space:nowrap;background:#080A16;border:1px solid rgba(157,184,255,.55);color:#9DB8FF;font:600 10px/1.4 ui-monospace,monospace;letter-spacing:.12em;padding:4px 8px;border-radius:6px;">AGENTE · TRABAJANDO</span>';
  layer.appendChild(cursor);
  const cursorLabel = cursor.querySelector("span");

  const badge = document.createElement("div");
  badge.style.cssText =
    "position:fixed;left:14px;bottom:14px;background:#080A16;border:1px solid rgba(157,184,255,.38);color:#9DB8FF;font:600 10px/1.4 ui-monospace,monospace;letter-spacing:.12em;padding:6px 10px;border-radius:99px;display:flex;align-items:center;gap:7px;opacity:0;transition:opacity .25s ease;";
  badge.innerHTML =
    '<span style="width:7px;height:7px;border-radius:50%;background:#9DB8FF;animation:gx-work-pulse 1.1s infinite"></span><span>AGENTE TRABAJANDO</span>';
  layer.appendChild(badge);
  const badgeLabel = badge.querySelector("span:last-child");

  const style = document.createElement("style");
  style.textContent =
    "@keyframes gx-work-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}";
  document.head.appendChild(style);

  let tx = innerWidth * 0.5;
  let ty = innerHeight * 0.42;
  let cx = tx;
  let cy = ty;
  const follow = () => {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);

  let hideTimer = null;
  let active = false;
  let lastFile = null;
  const historial = [];

  const show = (file) => {
    active = true;
    lastFile = file;
    cursor.style.opacity = "1";
    badge.style.opacity = "1";
    cursorLabel.textContent = `AGENTE · EDITANDO ${file.split("/").pop()}`;
    badgeLabel.textContent = `TRABAJANDO EN ${file}`;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      cursor.style.opacity = "0";
      badge.style.opacity = "0";
      active = false;
    }, 4200);
  };

  const ripple = (x, y, delay) => {
    setTimeout(() => {
      const ring = document.createElement("div");
      ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:10px;height:10px;margin:-5px 0 0 -5px;border:2px solid #9DB8FF;border-radius:50%;transition:all .45s ease-out;`;
      layer.appendChild(ring);
      requestAnimationFrame(() => {
        ring.style.width = "44px";
        ring.style.height = "44px";
        ring.style.margin = "-22px 0 0 -22px";
        ring.style.opacity = "0";
      });
      setTimeout(() => ring.remove(), 520);
    }, delay);
  };

  hot.on("gx-work", (payload) => {
    if (!payload || !payload.file) return;
    historial.push({ file: payload.file, at: payload.at || Date.now() });
    const section = sectionFor(payload.file);
    const el = section ? document.getElementById(section) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      if (el) {
        const r = el.getBoundingClientRect();
        tx = Math.min(Math.max(r.left + Math.min(r.width * 0.28, 220), 24), innerWidth - 280);
        ty = Math.min(Math.max(r.top + Math.min(r.height * 0.22, 150), 24), innerHeight - 48);
      } else {
        tx = Math.min(innerWidth * 0.5, innerWidth - 280);
        ty = innerHeight * 0.42;
      }
      ripple(tx, ty, 0);
      ripple(tx, ty, 180);
    }, el ? 420 : 0);

    show(payload.file);
  });

  window.__gxWorkCursor = {
    get activo() {
      return active;
    },
    get ultimo() {
      return lastFile;
    },
    get historial() {
      return historial.slice();
    },
    stop: () => {
      clearTimeout(hideTimer);
      hot.off("gx-work");
      layer.remove();
      style.remove();
      started = false;
      return "cursor de trabajo detenido";
    },
  };
}

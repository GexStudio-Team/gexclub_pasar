import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Eyebrow } from "./Primitives";

/* ───────────────────────── LIQUID FORGE (metal líquido → logo → control) ─────────────────────────
 * Animación 3D controlada por scroll con Three.js r147 importado desde npm.
 */

/* Se inserta un tramo de longitud W en q = Q_LOGO: el líquido forma el logo
 * de GexClub, lo sostiene y vuelve a la gota antes del ensamblaje. */
const Q_LOGO = 0.22, W = 0.3, TOTAL = 1 + W;

const FORGE_STAGES = [
  [0.0, "Idea", "Todo proyecto empieza como algo sin forma."],
  [0.15, "Impulso", "Le das energía y la idea se levanta."],
  [0.27, "GexClub", "La idea encuentra su forma dentro de la comunidad."],
  [0.29 + W, "Prototipo", "Primera versión: simple, redonda y funcional."],
  [0.46 + W, "Arquitectura", "Se aplana y se ordena. Ahora hay una base."],
  [0.55 + W, "Iteración", "Pruebas, errores, picos. Así se aprende de verdad."],
  [0.645 + W, "Ensamblaje", "Código, electrónica y diseño encajan pieza por pieza."],
  [0.85 + W, "Tu juego", "Del caos al control. Esto se construye en GexClub."],
];

function createForge({ canvas, stage, track, onStage, onProgress }) {
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
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
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
  // Estado de la gota: el logo lo usa como origen de cada uno de sus vértices.
  const B = { sx: 1, sy: 1, sz: 1, py: 0, ry: 0, nAmp: 0, lift: 0, t: 0, f: 1.6, time: 0 };
  function updateBlob(p, time, shrink) {
    const [, sx, sy, sz, hover, nAmp, lift, spike] = sampleKeys(BK, p);
    B.sx = sx; B.sy = sy; B.sz = sz; B.nAmp = nAmp; B.lift = lift;
    B.py = sy + hover + Math.sin(time * 1.4) * 0.04 * hover;
    B.ry = time * 0.15 + p * 4; B.t = time * 0.55; B.f = sy < 0.3 ? 2.6 : 1.6; B.time = time;
    const s = 1 - shrink;
    blob.visible = sx > 0.01 && s > 0.01; if (!blob.visible) return;
    blob.scale.set(sx * s, sy * s, sz * s);
    blob.position.y = B.py;
    blob.rotation.y = B.ry;
    const arr = posAttr.array, t = B.t, f = B.f;
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

  /* ── Logo de GexClub en metal líquido ─────────────────────────────────────────────────
   * Emblema propio construido con primitivas: un hexágono en forma de "E" con
   * tres ranuras diagonales y tres puntos. Se genera en un marco girado 30°
   * y se subdivide para poder deformarlo sin facetas.
   */
  function buildLogoGeometry() {
    // [u, v, radio de esquina]
    const P = [
      [-100, -173, 20], [100, -173, 20], [145, -95, 26],
      [-44, -95, 15], [-44, -65, 15],          // ranura 1
      [88, -65, 30], [88, -5, 30],             // brazo 2
      [-87, -5, 15], [-87, 25, 15],            // ranura 2
      [118, 25, 30], [118, 85, 30],            // brazo 3
      [-52, 85, 15], [-52, 115, 15],           // ranura 3
      [21, 115, 29], [21, 173, 29],            // brazo inferior
      [-100, 173, 20], [-200, 0, 22],
    ];
    const main = new THREE.Shape(), n = P.length;
    for (let i = 0; i < n; i++) {
      const [px, py, pr] = P[i], A = P[(i - 1 + n) % n], C = P[(i + 1) % n];
      const ax = A[0] - px, ay = A[1] - py, cx = C[0] - px, cy = C[1] - py;
      const la = Math.hypot(ax, ay), lc = Math.hypot(cx, cy), r = Math.min(pr, la / 2, lc / 2);
      const x1 = px + (ax / la) * r, y1 = py + (ay / la) * r, x2 = px + (cx / lc) * r, y2 = py + (cy / lc) * r;
      if (i === 0) main.moveTo(x1, -y1); else main.lineTo(x1, -y1);
      main.quadraticCurveTo(px, -py, x2, -y2);
    }
    main.closePath();
    const dots = [[144, -32, 25], [165, 55, 22], [68, 144, 25]].map(([u, v, r]) => {
      const dot = new THREE.Shape(); dot.absarc(u, -v, r, 0, Math.PI * 2, false); return dot;
    });

    const DEPTH = 40, BEV = 16;
    let g = new THREE.ExtrudeGeometry([main, ...dots], {
      depth: DEPTH, curveSegments: small ? 8 : 12, bevelEnabled: true,
      bevelThickness: BEV, bevelSize: 12, bevelOffset: 0, bevelSegments: small ? 3 : 5,
    });
    g.translate(-8, 0, -DEPTH / 2);
    g.rotateZ(Math.PI / 6);
    g.scale(0.0052, 0.0052, 0.0052);
    g = new TessellateModifier(small ? 0.075 : 0.05, small ? 10 : 24).modify(g);
    g.deleteAttribute("normal"); g.deleteAttribute("uv");
    g = mergeVertices(g, 1e-5);
    g.computeVertexNormals();
    return g;
  }
  const logoGeo = buildLogoGeometry();
  const LC = new THREE.Vector3(0, 1.2, 0);                       // centro del logo en escena
  const LN = logoGeo.attributes.position.count;
  const lBase = new Float32Array(logoGeo.attributes.position.array); // posición final (relativa a LC)
  const lNorm = new Float32Array(logoGeo.attributes.normal.array);
  const lDelay = new Float32Array(LN);
  for (let i = 0; i < LN; i++) lDelay[i] = clamp(Math.hypot(lBase[i * 3], lBase[i * 3 + 1]) / 1.2);
  const logoMat = liquid.clone();
  const C_DARK = new THREE.Color(0x020203), C_BRAND = new THREE.Color(0x1638c9);
  const logo = new THREE.Mesh(logoGeo, logoMat); logo.frustumCulled = false; logo.visible = false; scene.add(logo);

  function updateLogo(k, hold, time) {
    logo.visible = k > 0.0005; if (!logo.visible) return;
    const arr = logoGeo.attributes.position.array;
    const sway = Math.sin(time * 0.6) * 0.2 * hold, ca = Math.cos(sway), sa = Math.sin(sway);
    const cr = Math.cos(B.ry), sr = Math.sin(B.ry);
    const D = 0.7, t = time * 0.7;
    for (let i = 0; i < LN; i++) {
      const j = i * 3;
      // destino: el logo, con un leve vaivén mientras se sostiene
      const bx = lBase[j], by = lBase[j + 1], bz = lBase[j + 2];
      const Lx = LC.x + bx * ca + bz * sa, Ly = LC.y + by, Lz = LC.z - bx * sa + bz * ca;
      // origen: el punto de la gota en esa misma dirección, con su ruido y sus púas
      const rx = Lx, ry = Ly - B.py, rz = Lz;
      let ux = (rx * cr - rz * sr) / B.sx, uy = ry / B.sy, uz = (rx * sr + rz * cr) / B.sz;
      const il = 1 / (Math.hypot(ux, uy, uz) || 1); ux *= il; uy *= il; uz *= il;
      let r = 1;
      if (B.nAmp > 0.001) r += B.nAmp * noise(ux * B.f + B.t, uy * B.f + B.t * 0.6, uz * B.f - B.t * 0.8);
      let sy = uy * r;
      if (B.lift > 0.001) { const yy = Math.max(0, uy); sy += B.lift * yy * yy * yy * yy * (1.1 + 0.25 * noise(ux * 2 + B.t, 3.1, uz * 2)); }
      const lx = ux * r * B.sx, ly = sy * B.sy, lz = uz * r * B.sz;
      const Sx = lx * cr + lz * sr, Sy = B.py + ly, Sz = -lx * sr + lz * cr;
      // el centro se forma primero y los puntos al final
      const e = easeInOut(clamp(k * (1 + D) - lDelay[i] * D));
      const rip = (0.09 * Math.sin(Math.PI * e) + 0.01 * hold) * noise(Lx * 2.3 + t, Ly * 2.3 - t * 0.7, Lz * 2.3 + t * 0.5);
      arr[j] = Sx + (Lx - Sx) * e + lNorm[j] * rip;
      arr[j + 1] = Sy + (Ly - Sy) * e + lNorm[j + 1] * rip;
      arr[j + 2] = Sz + (Lz - Sz) * e + lNorm[j + 2] * rip;
    }
    logoGeo.attributes.position.needsUpdate = true; logoGeo.computeVertexNormals();
    logoMat.color.copy(C_DARK).lerp(C_BRAND, hold * 0.75);
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
  const RB = (w, h, d, r = 0.04) => new RoundedBoxGeometry(w, h, d, 4, r);
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
  const LOGO_CAM = [0, 0.4, 1.35, 6.6, 0, 1.2, 0]; // cámara frontal para el logo
  const tgt = new THREE.Vector3();

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = w < 860 ? 44 : 30;
    if (w >= 860) camera.setViewOffset(w, h, -w * 0.15, 0, w, h); else camera.setViewOffset(w, h, 0, h * 0.08, w, h);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(stage); resize();

  let target = 0, current = 0, visible = false, raf = 0, lastStage = -1, tick = 0;
  const readScroll = () => { const r = track.getBoundingClientRect(); target = clamp(-r.top / (r.height - innerHeight)); };
  addEventListener("scroll", readScroll, { passive: true }); readScroll(); current = target;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(stage);

  const clock = new THREE.Clock();
  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    const time = reduce ? 0 : clock.getElapsedTime();
    current += (target - current) * (reduce ? 1 : 0.085);
    const P = current * TOTAL;

    /* Tramo del logo: formar (0–0.38), sostener (0.38–0.62) y volver a la gota. */
    let q, s = -1;
    if (P < Q_LOGO) q = P;
    else if (P < Q_LOGO + W) { q = Q_LOGO; s = (P - Q_LOGO) / W; }
    else q = P - W;
    const k = s < 0 ? 0 : s < 0.38 ? smooth(s / 0.38) : s < 0.62 ? 1 : 1 - smooth((s - 0.62) / 0.38);
    const hold = k * k * k;
    const camK = s < 0 ? 0 : smooth(clamp(s / 0.3)) * (1 - smooth(clamp((s - 0.7) / 0.3)));

    updateBlob(q, time, smooth(clamp(k / 0.2)));
    /* Durante la pausa del logo basta con deformar 30 veces por segundo;
     * el render y la cámara siguen a 60 fps. */
    tick++;
    if (k < 0.999 || tick % 2 === 0) updateLogo(k, hold, time);
    updatePad(q, time);
    const c = sampleKeys(CK, q);
    for (let i = 1; i < 7; i++) c[i] = lerp(c[i], LOGO_CAM[i], camK);
    camera.position.set(c[1], c[2], c[3]); tgt.set(c[4], c[5], c[6]); camera.lookAt(tgt);
    let si = 0; for (let i = 0; i < FORGE_STAGES.length; i++) if (P >= FORGE_STAGES[i][0]) si = i;
    if (si !== lastStage) { lastStage = si; onStage(si); }
    onProgress(current);
    renderer.render(scene, camera);
  };
  frame();

  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    removeEventListener("scroll", readScroll);
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    Object.values(M).forEach((m) => m.dispose()); liquid.dispose(); logoMat.dispose(); glowTex.dispose(); envTex.dispose(); pmrem.dispose();
    renderer.dispose();
  };
}

export function LiquidForge() {
  const trackRef = useRef(null), stageRef = useRef(null), canvasRef = useRef(null), barRef = useRef(null), pctRef = useRef(null);
  const [stageIdx, setStageIdx] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let dispose;
    try {
      dispose = createForge({
        canvas: canvasRef.current, stage: stageRef.current, track: trackRef.current,
        onStage: setStageIdx,
        onProgress: (p) => {
          if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
          if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100)).padStart(2, "0");
        },
      });
      setStatus("ready");
    } catch {
      setStatus("error");
    }
    return () => { dispose && dispose(); };
  }, []);

  const [, title, desc] = FORGE_STAGES[stageIdx];
  return (
    <section id="forja" ref={trackRef} className="relative" style={{ height: "830vh" }} aria-label="De una idea a tu primer juego">
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

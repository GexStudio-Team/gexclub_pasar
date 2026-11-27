Continúa el desarrollo de la **web v2 de GexClub**, una comunidad juvenil de tecnología, desarrollo de videojuegos y hackatones (sitio actual: https://gexclub.novatechdevelopment.com). La carpeta del proyecto es:

`C:\Users\Duvan Altamar\GexClub-v2`

## Archivos

> Estado actual: el proyecto ya fue migrado a Vite. La fuente canonical es `src/App.jsx` y los componentes en `src/components/`. Los archivos listados abajo como “heredados” se conservan solo como referencia del prototipo. Las descripciones de “La forja” en este brief corresponden al estado original; la implementación vigente (830vh, tramo de logo líquido) está documentada en `docs/Arquitectura.md` y `docs/ADR-003-logo-liquido.md`.

- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`: configuración del proyecto Vite.
- `index.html`: entrada HTML del proyecto Vite.
- `src/main.jsx`, `src/App.jsx`, `src/data.js`, `src/hooks.js`, `src/index.css`: aplicación real.
- `src/components/`: componentes separados de la landing.
- `GexClubV2.jsx` **(heredado)**: componente único original.
- `preview.html` **(heredado)**: vista previa con Babel e importmap. Si se necesita, ejecuta `python -m http.server 5178` y abre http://localhost:5178/preview.html.
- `gexclub-v2.html` **(heredado)**: versión publicada como Claude Artifact.
- `onix-t1.html` **(heredado)**: demo independiente de ÓNIX, referencia de “La forja”.

Para desarrollar, usa `npm install` y `npm run dev` (http://127.0.0.1:5173/). Para compilar, usa `npm run build`.

## Estructura de GexClubV2.jsx (en orden)

1. **Datos editables:** `BRAND`, `LINKS`, `PAST_EDITION` y `NAV`. Cualquier texto que empiece por `[` es un dato pendiente, y el componente `Ph` lo muestra en ámbar con borde discontinuo.
2. **`GLOBAL_CSS`:** keyframes y clases propias (`gx-word`, `rv`, `spot`, `radar-*`, `giant`) más la fuente Inter + JetBrains Mono. Colores: fondo `#050507`, acento `#2F7BFF` y secundario `#B6FF3B`.
3. **Hooks y primitivas:** `useInView`, `useParallax`, `Reveal`, `SpotCard` (borde de 1px con brillo que sigue al cursor), `GiantWord` (tipografía gigante con parallax) y `Logo` (si la imagen no carga, muestra "GX").
4. **`NodeSphere`:** canvas 2D nativo con dos esferas geodésicas de nodos (la exterior azul y la interior lima). Reaccionan al cursor y se expanden con el scroll, y la animación se pausa con un IntersectionObserver.
5. **`Navbar`:** píldora flotante con glassmorphism y la sección activa resaltada.
6. **`Hero`:** titular que aparece palabra por palabra, de desenfocado a nítido.
7. **`Ecosistema` (01):** texto que se ilumina con el scroll (`ScrollText`) y una cuadrícula tipo bento con los 4 pilares.
8. **`LiquidForge` (02, "La forja"):** sección con posición sticky y 640vh de alto. Con Three.js r147, metal líquido (una esfera de 190×130 deformada con ruido Perlin en la CPU) pasa por charco, gota, esfera, disco y púas. Después se ensambla un control de videojuego hecho con primitivas. La lógica está en `createForge()`, las fases en `FORGE_STAGES`, y `ensureThree()` carga los scripts.
9. **`Hackatones` (03):**
   - **Bloque A:** radar en espera, "Sin convocatorias abiertas", y un formulario de alerta por correo (`AlertForm`).
   - **Bloque B:** "Ediciones Anteriores" con la Edición 01 (Gex Club Hackathon 2026, "Crea el Futuro", 31 oct 2026, 8:30 a. m. – 6:30 p. m.) y el modal `MemoryModal`.
10. **`Comunidad` (04) y `Footer`.**

## Reglas que no se pueden romper

- **No mostrar ningún hackatón activo.** Nada de contadores regresivos ni botones de "Inscríbete ahora". El bloque A debe decir con claridad que no hay convocatorias ni inscripciones abiertas.
- **La Edición 01 está finalizada.** Lleva la etiqueta `FINALIZADO • EDICIÓN PASADA` y su modal no tiene ninguna opción de registro.
- **Textos en español**, con tono moderno, tecnológico y juvenil.
- **No usar marcas, logos ni imágenes de terceros** (por ejemplo, Mercedes). Las animaciones 3D usan modelos propios hechos con primitivas.
- **Mantener 60 fps:** pausar los canvas que estén fuera de pantalla, limitar el devicePixelRatio a 1.75–2 y respetar `prefers-reduced-motion`.

## Tareas pendientes (en orden sugerido)

1. ~~**Migrar a un proyecto Vite + React + Tailwind**~~ **COMPLETADO** el 2026-11-27. Ver `docs/ADR-001-migracion-vite.md`.
2. **Datos de `PAST_EDITION`:** completados con valores `TEMP` autorizados provisionalmente. **Pendiente:** reemplazar por datos reales cuando el usuario los proporcione, incluido `LINKS.discord`.
3. ~~**Conectar `AlertForm` a Formspree**~~ **IMPLEMENTADO** mediante `VITE_FORMSPREE_ENDPOINT`. **Pendiente:** crear `.env.local` con el ID real.
4. ~~**Usar el logo oficial en local**~~ **COMPLETADO**: `public/brand/gex-mark-dark-square.png`.
5. **Probar en móvil** (375–430 px de ancho): el titular del hero, la sección La forja (cámara y `setViewOffset` en pantallas angostas), el bento y el modal.
6. **Rendimiento:** considerar mover la deformación del líquido a un vertex shader, porque ahora se calcula en la CPU y se recalculan las normales en cada cuadro. Probar en un equipo de gama baja.
7. **Mejora visual opcional:** en la fase "Iteración" las púas se ven como pétalos gruesos. Deberían ser agujas más finas, como un ferrofluido.

Antes de cambiar nada, lee el código canonical actual (`src/App.jsx` y `src/components/`). Después de cada cambio, comprueba en el navegador que la consola no tenga errores.

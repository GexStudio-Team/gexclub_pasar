# Prompt para OpenCode en la otra PC — GexClub v2

Copia y pega el bloque siguiente en OpenCode en la otra máquina.

---

Continúa el desarrollo de la **web v2 de GexClub** desde el repositorio oficial. La fuente canonical es `src/`; los archivos `GexClubV2.jsx`, `preview.html`, `gexclub-v2.html`, `onix-t1.html` y `forja-logo.html` son heredados y solo se conservan como referencia.

## Repositorio y rama

```bash
git clone https://github.com/GexStudio-Team/gexclub_pasar.git
cd gexclub_pasar
git checkout v2
npm install
npm run dev
```

Si prefieres trabajar sobre la rama de entrega creada para este paquete:

```bash
git checkout v2-entrega
```

La rama `main` contiene el historial del sitio v0.4.0 publicado en `https://gexclub.novatechdevelopment.com`. **No la modifiques.** Tampoco modifiques el directorio `deploy/` local ni intentes publicar sobre el sitio vivo.

## Estado actual

- Vite 5 + React 18 + Tailwind 3 + `lucide-react` + `three@0.147.0`.
- Components separados en `src/components/`; datos en `src/data.js`; hooks en `src/hooks.js`; estilos en `src/index.css`.
- Bundle dividido en chunks `three`, `react`, `icons`, `index`. No hay scripts CDN.
- “La forja” incluye el tramo de metal líquido → logo de GexClub → control, con pista de `830vh` y ocho fases.
- Paleta derivada del logo oficial: acento `#0078FF`, violeta `#6018F0`, secundario `#9DB8FF`, fondo `#01020A`. El verde lima fue eliminado.
- Edición 01 finalizada con fecha 31 oct 2026, horario 8:30–18:30 y sede en Barranquilla tomadas del sitio v0.4.0 y Luma. Cifras, ganadores y fotos siguen marcados como `TEMP`.
- `AlertForm` usa `VITE_FORMSPREE_ENDPOINT`. Sin endpoint, muestra aviso ámbar y no hace fetch.
- Cursor del agente solo en desarrollo y solo ante cambios reales de archivo.

## Reglas obligatorias

1. Lee el código canonical antes de editar. No sobrescribas trabajo existente.
2. No mostrar hackatones activos, contadores regresivos ni botones “Inscríbete ahora”.
3. La Edición 01 siempre debe quedar como `FINALIZADO • EDICIÓN PASADA`; su modal no ofrece registro.
4. Textos en español, tono moderno, tecnológico y juvenil.
5. Todo texto que empiece por `[` se muestra en ámbar mediante el componente `Ph`.
6. No usar marcas, logos ni imágenes de terceros. La escena 3D solo usa primitivas propias.
7. Mantener 60 fps: pausar canvas fuera de pantalla, DPR 1,75–2 y respetar `prefers-reduced-motion`.
8. Los datos temporales deben seguir marcados como `TEMP`. Nunca inventes datos reales.
9. No poner secretos ni endpoints reales en el repositorio; usar `.env.local`.
10. Después de cada cambio: `npm run build`, verificar consola sin errores y actualizar `README.md`, `CHANGELOG.md`, `TODO.md` y `docs/` según aplique.
11. Commits y push siempre en `v2` o en la rama acordada. Nunca en `main`.

## Pendientes

- Confirmar `VITE_FORMSPREE_ENDPOINT` real en `.env.local`.
- Reemplazar por datos reales las cifras, ganadores y tres fotos de `PAST_EDITION` en `src/data.js`.
- Conseguir la invitación real de Discord para `LINKS.discord`; hoy es placeholder ámbar.
- Terminar el registro de Discord con `gexstudioteam@gmail.com`: faltan fecha de nacimiento y código de verificación. No inventar ninguno de los dos.
- Decidir si se indexa `mattpocock/skills` tras leer `docs/Informe-skills-agentes.md`. No se ha descargado nada.
- Probar en móvil de 375–430 px: hero, “La forja”, bento y modal.
- Confirmar si `GithubIcon` e `InstagramIcon` deben sustituirse por iconos genéricos para cumplir estrictamente la regla de no logos de terceros.
- Abrir PR de `v2` contra `main` solo cuando el usuario lo autorice.

## Verificación rápida

```bash
npm run build
npm run preview
```

Revisa que no haya errores en consola en `http://127.0.0.1:5173/` y `http://127.0.0.1:4173/`.

## Documentación clave

- `docs/Arquitectura.md` — mapa de módulos y estado del proyecto.
- `docs/ADR-001-migracion-vite.md`
- `docs/ADR-002-division-chunks.md`
- `docs/ADR-003-logo-liquido.md`
- `docs/ADR-004-paleta-y-datos-reales.md`
- `docs/Informe-skills-agentes.md`
- `CHANGELOG.md` y `TODO.md`.

Empieza con una auditoría: `git status`, rama actual, relación con `origin`, y lectura de los archivos que vayas a tocar. Luego propón el siguiente paso concreto antes de editar.

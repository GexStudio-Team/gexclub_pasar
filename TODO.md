# TODO

Estado de la web v2 de GexClub.

## Completadas

- [x] Leer `GexClubV2.jsx` completamente antes de editar.
- [x] Verificar consola limpia en la vista previa heredada.
- [x] Migrar a Vite + React + Tailwind 3 + lucide-react + `three@0.147.0`.
- [x] Extraer `GLOBAL_CSS` a `src/index.css`.
- [x] Dividir el componente único en `src/components/`.
- [x] Sustituir `ensureThree()` por imports de `three/examples/jsm`.
- [x] Verificar build y consola del navegador después de la migración.
- [x] Completar `PAST_EDITION` con valores `TEMP` marcados como provisionales.
- [x] Renderizar fotos `TEMP` o imágenes reales desde `PAST_EDITION.photos`.
- [x] Mostrar aviso de provisionalidad en tarjeta y modal.
- [x] Dejar `LINKS.discord` como placeholder no navegable con aviso ámbar.
- [x] Conectar `AlertForm` a Formspree mediante `VITE_FORMSPREE_ENDPOINT`.
- [x] Copiar el logo oficial a `public/brand/` y usar ruta local.
- [x] Ignorar `public/` en el watcher de Vite para evitar `EBUSY`.
- [x] Dividir el bundle JS en chunks `three`, `react`, `icons` y `index`.
- [x] Verificar el build dividido en `http://127.0.0.1:4173/` sin errores de consola.
- [x] Inicializar Git en `GexClub-v2` y configurar `origin` a `gexclub_pasar` (commit local `6d641b7`).
- [x] Mostrar el cursor del agente solo cuando ocurre un cambio real, avisado por el watcher de Vite (`src/cursorSync.js` y el plugin `gx-agent-work-cursor`). Sin movimiento animado en reposo y sin referencias en el build de producción.
- [x] Portar el tramo de metal líquido → logo de GexClub a `src/components/LiquidForge.jsx`, con módulos npm de Three.js, cámara dedicada y deformación limitada a 30 Hz durante la pausa (ADR-003).
- [x] Alinear la paleta con el PNG oficial: `#0078FF`, `#6018F0`, `#9DB8FF` y fondo `#01020A`; eliminar el verde lima de CSS, Tailwind, Canvas 2D y Three.js (ADR-004).
- [x] Cargar datos reales del sitio v0.4.0 y Luma: fecha, horario, sede, formato, resumen y correo de contacto (ADR-004).
- [x] Investigar `mattpocock/skills` y dejar el informe en `docs/Informe-skills-agentes.md` sin descargarlo ni instalarlo.

## En progreso

- [ ] Registro de Discord con `gexstudioteam@gmail.com`: formulario abierto, pero detenido a la espera de la fecha de nacimiento y del código de verificación. Gmail aparece sin sesión iniciada.

## Pendientes

### Datos reales

El sitio v0.4.0 no publica resultados de la edición. Reemplazar antes de publicar lo que sigue marcado como `TEMP`:

- [x] `PAST_EDITION.location` con sede y ciudad reales (Luma: Castillo de la Alboraya, Barranquilla).
- [x] `PAST_EDITION.summary` con resumen real de impacto (copies oficiales de sitio y Luma).
- [x] `PAST_EDITION.partners` con organizador y sede reales.
- [ ] Cifras reales de `PAST_EDITION.stats`.
- [ ] Ganadores reales de `PAST_EDITION.winners`.
- [ ] Tres fotos reales en `PAST_EDITION.photos`.
- [ ] `LINKS.discord` con la invitación real.

### Agentes y skills

- [ ] Decidir si se indexa `mattpocock/skills` tras revisar `docs/Informe-skills-agentes.md`. No se ha descargado nada.

### Configuración

- [ ] Crear `.env.local` desde `.env.example` con el endpoint real de Formspree.

### Calidad y rendimiento

- [ ] Probar en móvil de 375 a 430 px: hero, “La forja”, bento y modal. La herramienta `browse` estaba desconectada; requiere reconectar el navegador.
- [ ] Evaluar mover la deformación del líquido a un vertex shader para reducir costo en CPU.
- [ ] Afinar las púas de la fase “Iteración” para parecerse más a agujas de ferrofluido.
- [ ] Confirmar si se sustituyen `GithubIcon` e `InstagramIcon` por iconos genéricos para cumplir estrictamente la regla de no usar logos de terceros.

### Versionado y publicación

- [x] Definir la estrategia para publicar en `GexStudio-Team/gexclub_pasar`: se acordó una rama `v2` separada porque `main` contiene el historial del sitio v0.4.0.
- [x] Publicar los commits en `origin/v2` sin modificar `origin/main`.

### Pendiente de decisión futura

- [ ] Si se requiere, unificar `v2` con `main` mediante PR o fusión controlada, conservando `deploy/` y `codigo-completo/`.

## Referencias

- `PROMPT-ANTIGRAVITY.md`: brief original y reglas no negociables.
- `docs/Arquitectura.md`: arquitectura actual del proyecto.
- `docs/ADR-001-migracion-vite.md`: decisión de migración a Vite.
- `docs/ADR-002-division-chunks.md`: decisión de división de chunks.
- `CHANGELOG.md`: historial de cambios y verificaciones.

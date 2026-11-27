# CHANGELOG

Registro de cambios de GexClub v2. Las marcas de tiempo están en zona horaria `America/Bogota`.

## [Unreleased] — 2026-11-27 06:40 America/Bogota

### Cursores en vivo para la revisión en OpenCode

| Tipo | Qué | Por qué |
| --- | --- | --- |
| `feat` | Se agregó `src/cursorSync.js` y el plugin `gx-live-cursor-relay` en `vite.config.js` para sincronizar cursores entre pestañas mediante el WebSocket de HMR de Vite. | Permitir ver en el Review pane el cursor del agente moviéndose en tiempo real mientras construye la página. |
| `feat` | Cada cliente dibuja también su propio cursor, con nombre, color y anillo al hacer clic; el contador del overlay muestra los cursores en pantalla. | Que la pestaña observada muestre el movimiento, no solo el cursor ajeno. |
| `docs` | Se documentó el uso en `README.md`, `TODO.md` y `docs/Arquitectura.md`. | Mantener trazabilidad de una herramienta de desarrollo que no afecta al sitio publicado. |

### Verificación

| Prueba | Resultado |
| --- | --- |
| Dos pestañas (`?cursor=AGENTE` y `?cursor=INVITADO`) | Sincronización bidireccional: ambas muestran los dos cursores en las mismas coordenadas y el contador `CURSORES EN VIVO · 2`. |
| Consola del navegador | Sin errores en ninguna de las dos pestañas. |
| `npm run build` | Correcto, sin avisos. `Select-String` sobre `dist/assets/*.js` no encuentra `gx-cursor` ni `gx-live-cursors`: el relay no entra en producción. |

## [Unreleased] — 2026-11-27 01:23 America/Bogota

### Estrategia de publicación

| Tipo | Qué | Por qué |
| --- | --- | --- |
| `feat` | La rama local de trabajo pasa a llamarse `v2` y la publicación se realiza en `origin/v2`. | Evitar un push non-fast-forward sobre `gexclub_pasar/main`, que contiene el historial del sitio v0.4.0. |
| `docs` | Se actualizan `TODO.md` y `docs/Arquitectura.md` con la rama de publicación acordada. | Mantener trazabilidad entre la decisión, el repositorio local y GitHub. |

### Verificación

| Prueba | Resultado |
| --- | --- |
| Rama local | `v2`, con los commits `6d641b7` y `47e9d66` más el commit documental de esta entrada. |
| Rama remota | `origin/v2` creada desde esta raíz. `origin/main` permanece en `67c1c33`. |

## [Unreleased] — 2026-11-27 01:20 America/Bogota

### División de chunks y versionado local

| Tipo | Qué | Por qué |
| --- | --- | --- |
| `perf` | Se configuró `build.rollupOptions.output.manualChunks` en `vite.config.js` para separar `three`, `react`, `lucide-react` y el resto de dependencias. | Eliminar el aviso de chunk único mayor a 500 kB y permitir cachá independiente por dependencia. |
| `feat` | Se inicializó Git en `GexClub-v2` sobre la rama `main` y se configuró `origin` apuntando a `GexStudio-Team/gexclub_pasar`. | Versionar el proyecto v2 en el repositorio acordado. |
| `docs` | Se agregó `docs/ADR-002-division-chunks.md` y se actualizaron `README.md`, `TODO.md` y `docs/Arquitectura.md`. | Mantener documentación y trazabilidad sincronizadas con el código. |

### Verificación

| Prueba | Resultado |
| --- | --- |
| `npm run build` | Correcto, sin aviso de tamaño. Chunks: `three` 417,53 kB, `react` 141,67 kB, app 52,96 kB, `icons` 9,10 kB y CSS 31,11 kB. |
| Build servido en `http://127.0.0.1:4173/` | Correcto. Secciones y canvas de “La forja” activos; sin errores en consola. |
| Servidor de desarrollo en `http://127.0.0.1:5173/` | Correcto tras el reinicio provocado por el cambio de `vite.config.js`; sin errores en consola. |
| Estado Git | Commit local `6d641b7` con 34 archivos y árbol limpio. Sin push: `gexclub_pasar/main` contiene un commit previo con historial no relacionado. |

### Deuda detectada

- El remoto `gexclub_pasar/main` ya contiene `deploy/` y `codigo-completo/`. Publicar esta raíz requiere decidir entre rama nueva, fusión de historiales o repositorio separado.

## [Unreleased] — 2026-11-27 01:06 America/Bogota

### Datos provisionales y Formspree

| Tipo | Qué | Por qué |
| --- | --- | --- |
| `feat` | Se completaron sede, resumen, cifras, ganadores, logros, aliados y tres fotos con valores `TEMP` claramente marcados, y se agregó `note` de provisionalidad en tarjeta y modal. | El usuario autorizó datos temporales para continuar sin bloquear el desarrollo. |
| `feat` | La galería del modal ahora consume `PAST_EDITION.photos`; muestra placeholders ámbar o imágenes reales según el valor. | Permitir reemplazar las fotos sin editar el componente. |
| `feat` | `LINKS.discord` quedó como placeholder no navegable y con aviso ámbar en Comunidad. | Evitar enlaces rotos mientras no exista la invitación real. |
| `feat` | `AlertForm` envía correos a Formspree mediante `VITE_FORMSPREE_ENDPOINT`, con estados `idle`, `error`, `sending`, `done` y `config`. | Sustituir la confirmación local por integración real configurable. |
| `feat` | Se copió el logo oficial a `public/brand/gex-mark-dark-square.png` y `BRAND.logoMark` usa la ruta local. | Eliminar dependencia de la URL externa para el logo. |
| `fix` | Se ignoró `public/` en el watcher de Vite. | Evitar el error `EBUSY` al copiar archivos estáticos con el servidor activo. |
| `docs` | Se agregó `.env.example` y se actualizaron `README.md`, `TODO.md` y `docs/Arquitectura.md`. | Mantener documentación y configuración sincronizadas con el código. |

### Verificación

| Prueba | Resultado |
| --- | --- |
| `npm run build` | Correcto. |
| Envio con correo inválido | Muestra “Revisa el formato del correo.” Sin errores en consola. |
| Envio con correo válido sin endpoint | Muestra aviso ámbar de `VITE_FORMSPREE_ENDPOINT`; no realiza fetch ni genera errores. |
| Modal de memoria | Muestra aviso de datos provisionales y tres fotos `TEMP`; sin botón de inscripción. |
| Logo local | Servido desde `/brand/gex-mark-dark-square.png`; sin errores en consola. |

## [Unreleased] — 2026-11-27 00:53 America/Bogota

### Migración a Vite

| Tipo | Qué | Por qué |
| --- | --- | --- |
| `feat` | Se creó un proyecto Vite + React 18 + Tailwind CSS 3 + lucide-react + Three.js 0.147.0. | Convertir el prototipo de un único JSX en un proyecto real, mantenible y compilable. |
| `refactor` | Se dividió `GexClubV2.jsx` en `src/App.jsx`, `src/data.js`, `src/hooks.js` y componentes en `src/components/`. | Separar datos, hooks y UI para reducir acoplamiento y facilitar futuras ediciones. |
| `refactor` | Se movió `GLOBAL_CSS` a `src/index.css` junto con las directivas de Tailwind. | Mantener los estilos globales en el lugar que corresponde al proyecto Vite. |
| `refactor` | Se sustituyó `ensureThree()` por imports estáticos de `three`, `RoomEnvironment` y `RoundedBoxGeometry`. | Eliminar la carga remota de scripts y fijar la versión de Three.js mediante npm. |
| `docs` | Se agregaron `README.md`, `TODO.md`, `docs/Arquitectura.md` y `docs/ADR-001-migracion-vite.md`. | Cumplir la política de documentación continua y dejar trazable la decisión arquitectónica. |

### Verificación

| Prueba | Resultado |
| --- | --- |
| `npm run build` | Correcto. 1590 módulos transformados; único aviso no bloqueante de chunk mayor a 500 kB. |
| Carga de `http://127.0.0.1:5173/` | Correcta. Sin mensajes de error en consola. |
| Scroll hasta “La forja” | Correcto. Canvas presente y fases activas; sin errores en consola. |
| Apertura y cierre del modal de memoria | Correcta. Etiqueta `FINALIZADO • EDICIÓN PASADA` visible; sin errores en consola. |

### Deuda detectada

- Los iconos `GithubIcon` e `InstagramIcon` siguen siendo logos de terceros. Se conservaron para no mezclar la migración con un cambio visual; requieren confirmación antes de sustituirlos por iconos genéricos.
- `dist/` existe como resultado del build; está ignorado por Git mediante `.gitignore`.

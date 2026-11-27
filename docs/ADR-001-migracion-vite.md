# ADR-001: Migración del prototipo a Vite

| Campo | Valor |
| --- | --- |
| Estado | Aceptada |
| Fecha | 2026-11-27 00:53 America/Bogota |
| Alcance | Web v2 de GexClub |

## Contexto

El prototipo vivía en un único archivo `GexClubV2.jsx` y dependía de dos copias generadas manualmente:

- `preview.html`, con Babel standalone e importmaps.
- `gexclub-v2.html`, con React UMD y scripts de Three.js desde CDN.

Cualquier cambio en el JSX obligaba a regenerar ambas copias. Además, `ensureThree()` cargaba Three.js desde jsDelivr en tiempo de ejecución, sin control de versión por package manager.

## Problema

- No existía un build reproducible ni un servidor de desarrollo estándar.
- Las copias generadas podían quedar desincronizadas del JSX.
- Las dependencias externas se resolvían en runtime desde CDNs.
- El archivo único dificultaba localizar datos editables y componentes.

## Opciones consideradas

1. Mantener el flujo Babel + copias HTML generadas.
2. Migrar a Vite + React + Tailwind 3, con Three.js como dependencia npm.
3. Migrar a otro bundler sin ecosistema Tailwind integrado.

## Decisión

Se adoptó la opción 2:

- Vite 5 como bundler y servidor de desarrollo.
- React 18 y Tailwind CSS 3.
- lucide-react para iconos.
- `three@0.147.0` instalado con npm.
- `src/App.jsx` como punto de composición, con datos, hooks y componentes separados.
- `ensureThree()` eliminado en favor de imports de `three` y `three/examples/jsm`.

## Justificación

- Vite ofrece HMR y build de producción sin configuración compleja.
- Tailwind 3 mantiene compatibilidad con las clases existentes del prototipo.
- Three.js 0.147.0 conserva el comportamiento de la demo de referencia.
- Separar `data.js` permite completar los datos pendientes sin tocar componentes.
- Las copias heredadas se conservan solo como referencia, no como fuente canonical.

## Consecuencias

### Positivas

- Build reproducible con `npm run build`.
- Dependencias fijadas en `package.json` y `package-lock.json`.
- Menor riesgo de desincronización entre fuente y vista previa.
- Estructura preparada para pruebas y optimizaciones posteriores.

### Negativas o pendientes

- El bundle JS supera 500 kB; Vite emite una advertencia no bloqueante.
- Las copias heredadas quedaron desactualizadas respecto a la nueva estructura.
- La carpeta aún no está versionada en Git.
- La deuda visual de iconos de terceros se trasladó al nuevo módulo `Primitives.jsx`.

## Verificación

- `npm run build`: correcto.
- Carga en navegador: sin errores de consola.
- Escena “La forja”: canvas activo y fases respondiendo al scroll.
- Modal de memoria: apertura y cierre sin errores.

## Referencias

- `PROMPT-ANTIGRAVITY.md`, sección “Tareas pendientes”, punto 1.
- `CHANGELOG.md`, entrada `[Unreleased] — 2026-11-27 00:53 America/Bogota`.

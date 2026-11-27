# GexClub v2

Web v2 de GexClub: una comunidad juvenil de tecnología, desarrollo de videojuegos y hackatones. Esta carpeta contiene la implementación React moderna del sitio, separada del sitio v0.4.0 que sigue publicado en `https://gexclub.novatechdevelopment.com`.

> Estado: migrada a Vite + React + Tailwind CSS 3. La fuente principal es `src/App.jsx` y sus componentes en `src/components/`.

## ¿Qué incluye?

- Portada con esfera geodésica animada en Canvas 2D.
- Sección “La forja”: animación 3D controlada por scroll con metal líquido y un control de videojuego ensamblado con primitivas propias.
- Ecosistema de pilares: videojuegos, ingeniería, diseño y comunidad.
- Bloque de hackatones sin convocatorias activas y archivo de la Edición 01 con etiqueta **FINALIZADO • EDICIÓN PASADA**.
- Modal de memoria del evento, sin opciones de inscripción.
- Enlaces a comunidad y pie de página.

## Tecnologías

| Capa | Tecnología |
| --- | --- |
| Bundler y servidor de desarrollo | Vite 5 |
| UI | React 18 |
| Estilos | Tailwind CSS 3 + CSS propio |
| Iconos | lucide-react |
| 3D | Three.js 0.147.0 |
| Lenguaje | JavaScript (JSX) |

## Requisitos previos

- Node.js 18 o superior.
- npm 9 o superior.

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

Abre `http://127.0.0.1:5173/`.

## Build de producción

```bash
npm run build
```

Los archivos quedan en `dist/`. Para revisar el build local:

```bash
npm run preview
```

Abre `http://127.0.0.1:4173/`.

El build separa las dependencias en chunks (`three`, `react`, `icons`) y deja el código de la aplicación en `index`, para evitar un archivo único de más de 500 kB. El detalle técnico está en `docs/ADR-002-division-chunks.md`.

## Datos editables

Los datos de la Edición 01 están en `src/data.js`. Los valores que empiezan con `[` se resaltan en ámbar. En este momento son **ejemplos marcados como `TEMP`**, autorizados provisionalmente; deben reemplazarse por información real antes de publicar.

Pendiente de datos reales:

- Sede, resumen, cifras, ganadores, logros, aliados y tres fotos de la Edición 01.
- Enlace de invitación a Discord.

El logo oficial se sirve desde `public/brand/gex-mark-dark-square.png`.

## Alerta por correo

El formulario usa Formspree. Copia `.env.example` como `.env.local` y reemplaza `TU_FORM_ID` por el ID real:

```bash
cp .env.example .env.local
```

```text
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/TU_FORM_ID
```

Sin esa variable, el formulario valida el correo y muestra un aviso ámbar, pero no intenta enviar nada.

## Archivos heredados

Estos archivos se conservan como referencia del prototipo original y **no son la fuente canonical** después de la migración:

| Archivo | Uso anterior |
| --- | --- |
| `GexClubV2.jsx` | Componente único original. |
| `preview.html` | Vista previa con Babel + importmap. |
| `gexclub-v2.html` | Versión publicada como Claude Artifact. |
| `onix-t1.html` | Demo independiente de ÓNIX, referencia de “La forja”. |

El servidor heredado `python -m http.server 5178` sirve esas copias; el desarrollo actual usa Vite en el puerto `5173`.

## Reglas del proyecto

- No mostrar hackatones activos, contadores regresivos ni botones de inscripción.
- La Edición 01 siempre se muestra como finalizada.
- Textos en español, con tono moderno, tecnológico y juvenil.
- No usar marcas, logos ni imágenes de terceros en las animaciones 3D.
- Pausar los canvas fuera de pantalla, limitar `devicePixelRatio` y respetar `prefers-reduced-motion`.

## Contribuir

1. Editar los componentes en `src/`; evitar editar las copias heredadas.
2. Ejecutar `npm run build`.
3. Verificar en el navegador que la consola no tenga errores.
4. Actualizar `CHANGELOG.md`, `TODO.md` y `docs/` cuando cambie el comportamiento.

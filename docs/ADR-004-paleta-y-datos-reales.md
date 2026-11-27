# ADR-004 — Alineación de paleta con el logo y carga de datos reales del sitio v0.4.0

## Contexto

La revisión visual del frontend mostró un acento verde lima (`#B6FF3B`) usado en titulares, iconos, estados, luces 3D y fondos. Ese color no aparece en el emblema oficial `public/brand/gex-mark-dark-square.png`: el muestreo del PNG muestra como colores dominantes un azul eléctrico (`#0078FF`), un azul violeta (`#6018F0`), un azul suave (`#9DB8FF`) y un fondo casi negro (`#01020A`).

Paralelamente, el sitio público `https://gexclub.novatechdevelopment.com` (v0.4.0) contiene información verificable que la v2 aún no había incorporado, y existen discrepancias entre ese sitio y la ficha pública de Luma.

## Problema

Unificar la identidad visual con el logo sin perder contraste ni accesibilidad, e incorporar solo los datos que puedan verificarse, sin inventar cifras, ganadores ni fotos de una edición que el propio sitio no documenta.

## Opciones consideradas

1. **Mantener el verde lima como acento secundario.** Contrasta bien sobre fondo oscuro, pero no pertenece a la paleta del logo y genera una identidad divergente.
2. **Copiar literalmente los tokens del sitio v0.4.0** (`#2c91ff`, `#a64bf3`, `#070b16`). Es fiel al sitio anterior, pero no coincide con el PNG oficial que ya usa la v2.
3. **Derivar la paleta del PNG oficial y usar el sitio v0.4.0 solo como fuente de contenido.** Mantiene una sola identidad gráfica y separa claramente color de información.

## Decisión

Se adopta la opción 3.

### Paleta canonical

| Token | Valor | Origen |
| --- | --- | --- |
| `--accent` | `#0078FF` | Azul dominante del logo. |
| `--violet` | `#6018F0` | Violeta presente en el degradado del logo. |
| `--secondary` | `#9DB8FF` | Azul suave para texto, iconos y estados. |
| `--bg` | `#01020A` | Fondo dominante del PNG. |

Se eliminaron `#B6FF3B`, `#2F7BFF`, `rgba(182,255,59,…)`, `rgba(47,123,255,…)` y el fondo `#050507` de `src/`, `tailwind.config.js` e `index.html`. También se renombraron las variables `lime` a `violet`/`secondary` en la escena 3D y en la configuración de Tailwind.

### Datos incorporados

De `src/data.js`:

- `BRAND.tagline` pasó a la frase real del pie del sitio: «Forjamos el futuro construyendo software, videojuegos y comunidad, juntos.»
- `PAST_EDITION.location`: «Institución Educativa Distrital Castillo de la Alboraya · Barranquilla», según la ficha pública de Luma. El sitio v0.4.0 decía «Lugar por confirmar»; se priorizó la ficha del evento ya realizado.
- `PAST_EDITION.summary`: fusión literal de los copies públicos del sitio y Luma, incluido el público de 14–18 años.
- `PAST_EDITION.partners`: `GexStudio (organización) · Institución Educativa Distrital Castillo de la Alboraya (sede)`.
- `LINKS.email`: `mailto:gexstudioteam@gmail.com`, añadido al pie.

Siguen marcados como `TEMP` las cifras de participantes/equipos/proyectos, los ganadores y las fotos: el sitio oficial no publica resultados ni imágenes de la edición. `LINKS.discord` sigue siendo placeholder porque no existe invitación pública en el sitio v0.4.0 ni en sus chunks.

## Consecuencias

- No queda ningún token verde en `src/` ni en `dist/`. La interfaz usa azul/violeta del logo en degradados, radar, esfera de nodos, luces de Three.js, estados y cursor de desarrollo.
- Se conserva el contraste: el texto secundario pasó de verde lima a `#9DB8FF`, más claro sobre `#01020A`.
- La ficha de Edición 01 muestra datos reales de fecha, horario y sede sin reactivar inscripciones ni contadores.
- El informe del repositorio de skills evaluado queda documentado en `docs/Informe-skills-agentes.md`; no se descargó ni instaló nada.
- El registro de Discord con `gexstudioteam@gmail.com` quedó detenido: no se cuenta con la fecha de nacimiento ni con una sesión iniciada en Gmail para leer el código de verificación. No se creó la cuenta.

## Estado

Aceptada e implementada en la rama `v2`. Verificada en `5173` y `4173` sin errores de consola.

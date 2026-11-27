# ADR-002: División del bundle JavaScript

| Campo | Valor |
| --- | --- |
| Estado | Aceptada |
| Fecha | 2026-11-27 01:20 America/Bogota |
| Alcance | Configuración de build de GexClub v2 |

## Contexto

Después de la migración a Vite, `npm run build` generaba un único archivo JavaScript de aproximadamente 622 kB y emitía una advertencia de Vite por superar los 500 kB. El proyecto incluye Three.js 0.147.0, React 18 y lucide-react en el mismo bundle.

## Problema

- Un solo archivo JS incrementa el costo de descarga inicial y evita la cachá independiente por dependencia.
- La advertencia de Vite obscurece otras señales de build.
- Las dependencias estables (`three`, `react`) se invalidan al cambiar cualquier código de la aplicación.

## Opciones consideradas

1. Aumentar `build.chunkSizeWarningLimit` para silenciar la advertencia.
2. Cargar Three.js de forma dinámica solo en la sección “La forja”.
3. Configurar `build.rollupOptions.output.manualChunks` para separar dependencias por proveedor.

## Decisión

Se adoptó la opción 3. `vite.config.js` define una función `manualChunks` que normaliza la ruta a `/` y asigna:

| Condición | Chunk |
| --- | --- |
| `node_modules/three/` | `three` |
| `node_modules/lucide-react/` | `icons` |
| `node_modules/react/`, `node_modules/react-dom/`, `node_modules/scheduler/` | `react` |
| Otros paquetes en `node_modules/` | `vendor` |
| Código de la aplicación | chunk principal `index` |

No se aumentó el límite de advertencia ni se introdujo carga dinámica, para no alterar el comportamiento de la escena 3D ni el orden de montaje de React.

## Justificación

- Mantiene el mismo código de aplicación y la misma API pública.
- Separa la dependencia más pesada (`three`) del resto.
- Permite que el navegador conserve en cachá los chunks de dependencias cuando cambia solo la UI.
- Es una configuración local de build, sin cambios en componentes ni en datos.

## Consecuencias

### Positivas

| Chunk | Tamaño |
| --- | --- |
| `three` | 417,53 kB |
| `react` | 141,67 kB |
| `index` (aplicación) | 52,96 kB |
| `icons` | 9,10 kB |
| CSS | 31,11 kB |

`npm run build` ya no emite la advertencia de tamaño.

### Negativas o pendientes

- El total transferido es similar; la mejora está en cachá y paralelismo de descarga, no en reducción de bytes.
- `vendor` queda vacío con las dependencias actuales, pero se conserva para futuras librerías.
- La división se verificó en servidor de desarrollo y en build de producción; no se midió el impacto en usuarios reales.

## Verificación

- `npm run build`: correcto, sin avisos de chunk grande.
- `http://127.0.0.1:4173/`: build de producción sin errores en consola; secciones y canvas de “La forja” activos.
- `http://127.0.0.1:5173/`: servidor de desarrollo sin errores en consola tras el reinicio por cambio de configuración.

## Referencias

- `docs/ADR-001-migracion-vite.md`: decisión de migración a Vite.
- `CHANGELOG.md`, entrada `2026-11-27 01:20 America/Bogota`.

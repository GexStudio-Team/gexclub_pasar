# ADR-003 — Tramo de metal líquido → logo de GexClub en “La forja”

## Contexto

La sección “La forja” ya animaba una gota de metal líquido que se transformaba en un control de videojuego ensamblado con primitivas propias. El prototipo local `forja-logo.html` incorporaba además un tramo intermedio en el que el líquido formaba el emblema de GexClub, lo sostenía y regresaba a la gota. Ese tramo no estaba en la fuente canonical `src/components/LiquidForge.jsx`.

## Problema

Incorporar el tramo del logo sin romper la línea de tiempo existente, sin introducir dependencias nuevas, sin cargar scripts desde CDN y sin degradar el objetivo de 60 fps ni las reglas de accesibilidad ya vigentes.

## Opciones consideradas

1. **Textura con el PNG oficial del logo.** Fácil de implementar, pero no permite la transición vértice a vértice desde la superficie deformada de la gota y añadiría un asset raster a la escena 3D.
2. **Copiar el demo heredado con sus etiquetas `<script>` de CDN.** Reproduce el efecto, pero reintroduce dependencias externas que la migración a Vite eliminó y rompe la estrategia de caché por chunks.
3. **Construir el emblema con geometría propia y deformarla en CPU.** Conserva el origen de cada vértice en la gota, mantiene todo el código dentro de `three` importado desde npm y no usa imágenes de terceros.

## Decisión

Se adopta la opción 3. Se portan únicamente las funciones `buildLogoGeometry()` y `updateLogo()` del prototipo local a `createForge()`, con estos ajustes:

- imports npm de `TessellateModifier` y `mergeVertices` desde `three/examples/jsm`, sin CDN;
- constants `Q_LOGO = 0.22`, `W = 0.3` y `TOTAL = 1.3`, con la fase “GexClub” en `P = 0.27` y el resto de fases desplazado `+W`;
- cámara interpolada hacia `LOGO_CAM` durante el tramo, con retorno al recorrido original;
- estado `B` de la gota compartido para que cada vértice del logo nazca desde la superficie deformada correspondiente;
- subdivisión adaptativa (`0.05`/24 iteraciones en escritorio, `0.075`/10 en pantallas menores a 768 px);
- actualización de vértices a 30 Hz mientras el logo está completamente sostenido (`k >= 0.999`), con render y cámara a 60 fps;
- altura de la pista aumentada de `640vh` a `830vh` para dar espacio al tramo insertado.

## Consecuencias

- El chunk `three` pasa de 417,53 kB a 449,64 kB (117,14 kB gzip) y `index` de 52,96 kB a 55,99 kB. No aparece el aviso de chunk mayor a 500 kB.
- Se conservan el `IntersectionObserver` que pausa el bucle fuera de pantalla, el `devicePixelRatio` limitado a 1,75 y el respeto a `prefers-reduced-motion`.
- La fase “GexClub” pasa a formar parte del contador de ocho fases; la etiqueta `FINALIZADO • EDICIÓN PASADA` y el resto del contenido no se modifican.
- El emblema se genera con `THREE.Shape`, `ExtrudeGeometry`, `TessellateModifier` y `mergeVertices`; no se usa ningún logotipo de terceros.

## Estado

Aceptada e implementada en la rama `v2`. Verificada en los servidores de desarrollo (`5173`) y de producción local (`4173`).

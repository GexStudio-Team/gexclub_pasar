# Changelog â€” Gex Club Â· Sitio Oficial

Todos los cambios notables de este repositorio se documentan en este archivo.
Formato basado en [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Las marcas de tiempo corresponden a la zona horaria `America/Bogota` (UTCâˆ’05:00).

---

## [0.4.0] â€” 2026-09-21

### Changed

- **Hackathon / Game Jam — Actualización de fecha y botones Luma**:
  - Fecha establecida para el **31 de octubre de 2026** (8:30 a. m. a 6:30 p. m.).
  - Los botones de inscripción en el Hero y en la sección de Hackathons ahora envían directamente a la página oficial de Luma en una nueva pestaña (	arget="_blank").
  - Se mantiene únicamente el iframe interactivo embebido al pie de /hackathons.

- **MÃ³dulo Sobre nosotros â€” imagen proporcionada al texto** (`src/app/about/page.js`): Ãºnica ediciÃ³n sobre la versiÃ³n elegida. La imagen del hero ahora se ajusta en proporciÃ³n al cuadro de texto: se eliminÃ³ el `min-h-[40vh]` de la columna izquierda y la imagen pasÃ³ a `absolute inset-0 h-full w-full object-cover object-center` (ocupa el panel completo segÃºn la altura del bloque de texto, sin clave visual ni `min-h` artificial).
- **NÃºmero de versiÃ³n en Statusbar** (`src/components/layout/Statusbar.jsx`): el rÃ³tulo superior pasa de `v2.6.0` a **`v0.4.0`**, alineado con la release semÃ¡ntica actual de la escalera SemVer del repo (features + estructura desde `v0.3.0` â†’ MINOR).
- **Perfil de Duvan â€” `<QUIEN_ES />` reemplaza a `<tech_en_la_terminal />`** (`src/app/aliados/duvan-altamar/page.js`): **la UI y los cuadros se mantienen exactamente igual** (misma grilla `sm:grid-cols-2` + columna de video; sin romper el layout). Ãšnicamente la **primera celda** cambia: el tÃ­tulo pasa a **`<QUIEN_ES />`** y su contenido son los **roles reales de Duvan** (`DUVAN_ROLES`) â€” Joven Creativo 2025, TÃ©cnico en Sistemas IUB 2026, Candidato a CLJ 2025, LÃ­der de transformaciÃ³n 2026, Fundador de GEX Studio y Gex Club, Programador Joven con iniciativa â€” escritos **libres uno por lÃ­nea con el prompt de terminal `>_`** (sin cuadros por separado item a item). El resto de celdas (`<liderazgo />`, `<redes />`, `<showcase />`, `<acerca />`) y el video quedan intactos.

### Added

- **UI de la secciÃ³n Comunidad renovada** (`/community`, `src/app/community/page.js`): se elimina la grilla tipo tabla (`grid gap-px bg-border` con celdas `bg-background`) y los **bloques quedan al aire libre**, separados con mucho aire (`mt-28`), lÃ­neas divisorias degradadas y **textos sin encasillar** (etiqueta mono `[ 0X ] / slug` + tÃ­tulo display grande + pÃ¡rrafo `text-lg`). Los **elementos visuales** (video del programador y foto *Red de pares*) van en **card flotante** (`.float-wrap` + `.float-card`) con marco degradado animado, glow azul/violeta, levitaciÃ³n suave y **hover con inclinaciÃ³n**. Nuevo orden: 01 Aprendizaje compartido + video Â· 02 Proyectos actuales + botÃ³n Â· 03 Primer hackathon + botÃ³n reto Â· 04 Red de pares + imagen Â· 05 Una comunidad para crear (pilares al aire con borde izquierdo activo) Â· 06 Ãšnete al ecosistema Â· 07 Lo que queremos construir.
- **Botones premium** (`globals.css`, `.btn-live` / `.btn-live-red`): reemplazan a los antiguos `aura-btn` (conic-gradient giratorio) en Comunidad. Combinan **borde degradado en movimiento** (keyframes `border-flow`, colores del logo), **barrido de luz diagonal** al hover (`::before` con `skewX`), **glow multicapa** azul/violeta, **levantamiento elÃ¡stico** (`cubic-bezier(0.34,1.56,0.64,1)`), **tracking que se expande** y **rebote del icono** (`translate(5px,-5px) scale(1.15)` con drop-shadow). Variante roja para el reto del hackathon.
- **Entradas escalonadas y testimonios premium** (`Testimonials.jsx`, `.fade-up`): tarjetas aireadas (`border-border/70 bg-card/60 backdrop-blur-sm`, `gap-6`) con **numeraciÃ³n fantasma** `01`â€“`03`, **entrada `fade-up` escalonada** (delays `0/140/280 ms`) que se re-dispara en cada rotaciÃ³n gracias al `key={startIndex}`, hover con levitaciÃ³n y sombra azul, y pie con flecha que se desplaza. Sin el grid tipo tabla anterior.
- **CTA de comunidad al aire libre** (`CommunityCta.jsx`): se elimina la card encasillada; el bloque ahora es **layout abierto** (texto a la izquierda y botÃ³n `btn-live` a la derecha) con **glow ambiental** `bg-primary/15 blur-[110px]` detrÃ¡s y etiqueta `[ 06 ] / ecosistema`.
- **Componente `VideoLoop`** (`src/components/ui/VideoLoop.jsx`): reproductor de video *client* con **reproducciÃ³n infinita** (usa `onEnded` + `setTimeout` + `play`), **pausa configurable al final** (`gapMs`, default 2000 ms) y **velocidad configurable** (`speed` vÃ­a `playbackRate`); soporta `autoPlay`, `muted`, `playsInline` y `object-cover`.
- **Video en MisiÃ³n y VisiÃ³n** (`/home`, `MissionSection.jsx`): la foto flotante fue reemplazada por el **corto institucional** (`public/brand/corto-home.mp4`) en su misma posiciÃ³n, **sin animaciÃ³n**, con `object-cover` hasta los bordes y gradiente de legibilidad; reproducciÃ³n infinita con pausa de 2 s al final (estÃ©tica en desktop y mÃ³vil, sin extender la card).
- **SecciÃ³n "Nuestra invitaciÃ³n"** (`CommunityInviteSection.jsx`, insertada en `/home` entre MisiÃ³n y Eventos): versiÃ³n invertida de la secciÃ³n grande de misiones â€” texto a la izquierda, **video de comunidad** (`public/brand/video-comunidad.mp4`, `min-h-[30vh] lg:min-h-[38vh]`) a la derecha â€” con botÃ³n **"Conoce mÃ¡s sobre nosotros"** â†’ `/about` y el texto oficial: *"Somos una comunidad de jÃ³venes creadores, impulsada por y para adolescentes. No esperamos el futuro; lo programamos. [â€¦] Â¡SÃºmate y construye el futuro con nosotros!"* (mensaje final separado y en negrita).
- **Comunidad rediseÃ±ada** (`/community`, primera secciÃ³n): grilla `lg:grid-cols-2` en **zigzag** con 4 bloques â€” 01 Aprendizaje compartido | **video del programador** (`public/brand/video-programador.mp4`, `speed 0.9`); botÃ³n con **aura** "Ver proyectos" â†’ `/projects` | 02 Proyectos actuales; 03 Primer hackathon | botÃ³n con **aurora roja viva** "Â¡Build the future!" â†’ `/hackathons`; imagen **Red de pares** (`public/brand/red-de-pares.jpg`, 417Ã—626) | 04 Red de pares â€” manteniendo la sobriedad de colores oscuros.
- **Animaciones CSS** (`globals.css`): `.aurora-boreal` (aurora horizontal animada de **izquierda a derecha** con los colores del logo Gex Club â€” azul `#008BFE`, violeta `#8b5cf6`/`#a855f7`, cian â€” keyframes `aurora-drift` 16 s) y `.aura-btn` / `.aura-btn-red` (conic-gradient giratorio con keyframes `aura-spin` 5 s; el rojo usa `--aura-color: rgba(255,59,48,0.85)`).
- **Aurora boreal en portadas del vault** (`ProjectCard.jsx`): todas las cards de proyectos llevan `aurora-boreal` animada de fondo; **GEX_OS conserva la temÃ¡tica de terminal** con un diseÃ±o creativo propio (ventana tipo *boot* con puntos de trÃ¡fico y lÃ­neas `> init gex_core â€¦`).
- **Perfil del fundador â€” "Cosas que soy"** (`/aliados/duvan-altamar`): se reemplazÃ³ la divisiÃ³n tech/liderazgo por la lista de **roles reales de Duvan**, cada uno con **coronita**: Joven Creativo 2025; TÃ©cnico en Sistemas InformÃ¡ticos (IUB Universidad de Barranquilla, 2026); Candidato a CLJ (Consejos Locales de Juventud) 2025; LÃ­der de transformaciÃ³n Â· Activo 2026; Fundador de Gex Studio y Gex Club; Programador Joven con iniciativa. El **nombre central** encabeza el recuadro grande y el **video de presentaciÃ³n se retirÃ³** dejando un **espacio reservado para la foto oficial** (marco punteado).
- **Brandon como co-fundador**: el rol de Brandon pasÃ³ de *Desarrollador* a **Co-fundador Â· GexStudio Team** (constante `BRANDON_CARRANZA.role` en `content.js`, card de `/aliados` y descripciÃ³n), coherente con el perfil del fundador.
- **InscripciÃ³n a hackatones simplificada** (`/hackathons`): los botones Luma redundantes de cada evento de la lista (`EventList.jsx`) se reemplazaron por el aviso **"InscripciÃ³n arriba â†‘"**; solo el CTA del hero/flagship y el del bloque "Detalle del evento" mantienen el checkout (el iframe embebido ya cubre la inscripciÃ³n directa). Se redujo el estrÃ©s visual y los embebidos duplicados.
- **Aurora boreal en "Proyectos actuales"** (`/community`): la celda 02 del estado de la comunidad recibe `aurora-boreal` de fondo (animada de izquierda a derecha, colores del logo) **sin quitar los cuadros existentes**, con overlay oscuro para mantener la legibilidad y la sobriedad de la paleta.
- **Perfil del fundador â€” header corregido** (`/aliados/duvan-altamar`): se revierte el rediseÃ±o visual amplio y se conserva el estilo previo; Ãºnicamente se corrige la composiciÃ³n del header â€” **logo de Gex e isotipo** pasan a un grid de 2 columnas (texto a la izquierda, isotipo centrado a la derecha en desktop y centrado en mÃ³vil, sin hover) y los **tÃ­tulos del nombre** ajustan su interlineado (`leading-[0.95]`) para una jerarquÃ­a mÃ¡s limpia.
- **Perfil de Duvan restaurado desde borradores** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): el usuario descartÃ³ el rediseÃ±o desde cero; se **elimina todo el apartado actual** (hero con foto enmarcada, tira de contexto, roles numerados, redes/showcase/acerca en 3 columnas) y se **restaura el perfil guardado en `GexClub Documentos\borradores\Perfil_Antiguo_Duvan_GexClubPage`**: hero con corona + badge Fundador + logo de Gex Club con glow, columnas Tech en la terminal / Liderazgo / Redes / Showcase / Acerca, **video de presentaciÃ³n** (`/brand/video-fundador.mp4`) enmarcado con borde `primary/40` y glow azul, y CTAs GEX_OS + vault.
- **Perfil de Duvan rediseÃ±ado desde cero** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): reorganizaciÃ³n completa y profesional del apartado personal, con una estructura limpia en 5 bloques:
  1. **Hero**: badge de rol con corona, nombre en tipografÃ­a display grande, resumen, CTAs ("Abrir GEX_OS" + "Ver el vault") y la foto enmarcada con borde `primary/40` (tamaÃ±o contenido `w-56` â†’ `sm:w-64` â†’ `lg:w-72`) con pie de foto discreto.
  2. **Contexto**: tira de 4 tarjetas con iconos (UbicaciÃ³n Barranquilla, TÃ©cnico en Sistemas IUB, Joven Creativo 2025 Â· CLJ, Creador de GEX_OS).
  3. **Cosas que soy**: lista vertical apilada uno encima del otro (sin grid ni frases extra), con **numeraciÃ³n mono `01`â€¦`06`** y hover `border-primary/50`, mÃ¡s contador `/{6} assets` a la derecha.
  4. **Conectar**: redes (Instagram/GitHub), showcase (chips de stack) y bloque acerca en 3 columnas.
  5. **Acciones finales**: CTAs de GEX_OS y vault.
- **Perfil de Duvan: roles apilados y sin frase extra** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): la lista "Cosas que soy" vuelve a un **layout vertical apilado** (`flex flex-col gap-3`, uno encima del otro, sin las 2 columnas del grid anterior) y se **elimina el blockquote** de declaraciÃ³n que quedaba debajo, dejando solo los cuadros con el rol y la corona.
- **Banner de Proyectos con colores del logo** (`src/app/globals.css`, `/projects`): las auroras neÃ³n del banner "PROYECTOS ACTUALES" ahora usan **exclusivamente la paleta del logo de Gex Club**: azul elÃ©ctrico `#1687FF`, violeta `#7747FF` y celeste `#00B4FF` (mÃ¡s el `#008BFE` del degradado original), eliminados el cian `#00E5FF` y el magenta `#FF00D4` de la versiÃ³n anterior. Se mantienen la cuadrÃ­cula blueprint (ya en azul/violeta del logo), el nÃºcleo pulsante, la lÃ­nea superior de luz y la tipografÃ­a `neon-title` iluminada (ahora `#008BFE`/`#7747FF`/`#00B4FF`), todo sobre fondo negro profundo.
- **Banner de Proyectos: cuadrÃ­cula + ola lÃ­quida neÃ³n** (`src/app/projects/page.js`, `src/app/globals.css`, `/projects`): se **reincorpora la cuadrÃ­cula blueprint** (`aurora-neon-grid`: lÃ­neas azul `rgba(22,135,255,.22)` y violeta `rgba(119,71,255,.22)` de 32 px) **encima** de las auroras neÃ³n y bajo el contenido, manteniendo el estilo original de "cuadrados". Las ondas fluyen debajo como ola lÃ­quida en **cian / azul elÃ©ctrico / violeta** (`aurora-neon-wave-1/2/3`, `blur(30px)` + `saturate(1.35)` + `mix-blend-screen`, oscilaciÃ³n 12/16/20 s con rotaciÃ³n y translaciÃ³n suaves), con nÃºcleo pulsante (`aurora-neon-core`, 7 s), lÃ­nea superior de luz y tipografÃ­a `neon-title` iluminada sobre fondo negro profundo.
- **Perfil de Duvan: columnas balanceadas** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): con la foto ahora mÃ¡s grande (`w-52` â†’ `sm:w-50` â†’ `lg:w-150`), la columna izquierda se rediseÃ±a para aprovechar el espacio: los roles "Cosas que soy" pasan a **tarjetas en grid de 2 columnas** (`grid gap-3 sm:grid-cols-2`, con el rol "TÃ©cnicoâ€¦" en `col-span-2`), y se aÃ±ade un **blockquote** final con `mt-auto` (margen automÃ¡tico) que empuja la declaraciÃ³n al fondo de la celda, equilibrando la altura con la foto; ademÃ¡s la columna de la foto se **centra verticalmente** con `items-center justify-center`.
- **Foto de Duvan simplificada (sin marco premium)** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): tras revisiÃ³n, se retiran el resplandor degradado exterior, el badge "Fundador" y el marco interior â€” la foto vuelve al estilo limpio de siempre (marco `border-primary/30` + sombra azul sutil `35px`), en la misma ubicaciÃ³n (columna derecha, centrada en mÃ³vil y alineada a la izquierda en escritorio), con un tamaÃ±o intermedio: `w-52` â†’ `sm:w-64` â†’ `lg:w-72` (208/256/288 px) â€” mÃ¡s grande que la versiÃ³n compacta anterior pero un poco menor que la "premium".
- **Auroras neÃ³n en el banner de Proyectos** (`src/app/projects/page.js`, `src/app/globals.css`, `/projects`): el banner horizontal "PROYECTOS ACTUALES" ahora luce un **fondo negro profundo** (`#05040e â†’ #000`) sobre el que fluyen **3 capas de ondas etÃ©reas neÃ³n** en **cian / magenta / violeta** (`aurora-neon-wave-1/2/3`, gradientes lineales `115Â°/200Â°/70Â°` con `blur(30px)` + `saturate(1.35)` + `mix-blend-screen`) que **oscilan suavemente** con `neon-drift-1/2/3` (12 s / 16 s / 20 s, `ease-in-out infinite alternate`, con rotaciÃ³n y translaciÃ³n sutiles). Debajo, un **nÃºcleo luminoso pulsante** (`aurora-neon-core`, tres radiales cian/fucsia/violeta con `blur(46px)`, `neon-pulse` 7 s) imita el movimiento de energÃ­a interna; una **lÃ­nea superior de luz neÃ³n** (`aurora-neon-line`, cianâ†’fucsiaâ†’violeta) remata el borde. El texto "PROYECTOS ACTUALES" gana **tipografÃ­a iluminada** (`neon-title`: `text-shadow` de 14 px cian, 34 px violeta, 70 px fucsia). Se retira la cuadrÃ­cula anterior y el borde pasa a `border-primary/25`.
- **UI de la foto de Duvan mejorada** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): la foto oficial ahora es **bastante mÃ¡s grande** (`w-56` â†’ `sm:w-72` â†’ `lg:w-80`, `aspect-[3/4]` con `width/height` explÃ­citos 640Ã—853) y se presenta como **marco premium**: resplandor degradado cianâ†’violetaâ†’fucsia con `blur-2xl` alrededor, borde `primary/40`, `p-1.5` interior y sombra azul (`shadow-[0_0_45px_rgba(22,135,255,0.2)]`), mÃ¡s un **badge "Fundador"** flotante en la esquina superior derecha con `backdrop-blur`.
- **Foto oficial de Duvan en su perfil** (`src/app/aliados/duvan-altamar/page.js`, `/aliados/duvan-altamar`): se incorpora `public/brand/foto-duvan-altamar.jpeg` (copiada desde `GexClub Documentos\marketing\imagenes-gexclub-page\Foto_DuvanAltamar.jpeg`) reemplazando el placeholder "Espacio reservado para tu foto". AdemÃ¡s la **secciÃ³n `<foto />` se reduce de tamaÃ±o** para eliminar el vacÃ­o tras la lista "Cosas que soy": la imagen ahora es compacta (`aspect-[3/4]`, `w-44` â†’ `sm:w-52` â†’ `lg:w-56`, con `fill` + `object-cover`), la lista de roles acorta su espaciado (`mt-6 space-y-3.5`) y el pie de foto describe la imagen oficial. Se conserva el marco con borde `primary/30` y brillo azul sutil.
- **Fondos animados en las cards de Proyectos** (`src/components/projects/ProjectCard.jsx`, `src/app/globals.css`, `/projects`): los recuadros superiores de las tarjetas (excepto **GEX OS**, que conserva su pantalla de boot) ahora llevan **dos capas animadas llamativas** con `mix-blend-screen`:
  - **`aurora-card`**: aurora boreal viva de colores pastel Gex (azul `rgba(0,139,254)`, violeta `rgba(168,85,247)`, celeste `rgba(0,180,255)`, fucsia `rgba(232,121,249)`) que se desplaza lentamente con `aurora-card-drift` (7 s, `alternate`, fondos `340%`/`300%`).
  - **`aurora-beam`**: barrido diagonal de luz que **atraviesa la card cada 4.5 s** (`aurora-beam-sweep`, gradiente `115deg` con opacidad pulsante), efecto brillante tipo lÃ¡ser.
  - Se **elimina el componente `WormWave`** (la ola-gusano del banner "Proyectos actuales" no convenciÃ³ al usuario): fuera el import, el overlay y el archivo `src/components/projects/WormWave.jsx`; el banner vuelve a su estado limpio (cuadrÃ­cula + isotipo `gex-glow`/`gex-float`). La animaciÃ³n ahora vive **en los fondos de las cards**, no en el banner.
- **InscripciÃ³n vÃ­a Luma** (reemplaza el formulario de Google Forms):
  - Nuevo componente `LumaCheckoutButton` (`src/components/events/LumaCheckoutButton.jsx`): botÃ³n de checkout de Luma estilizado con la identidad Gex Club, que carga el script `embed.lu.ma/checkout-button.js` vÃ­a `next/script` con `strategy="afterInteractive"` (no bloquea el LCP). Si el script no carga, el enlace navega a la pÃ¡gina oficial del evento (fallback natural).
  - CTA del **hero** (`InscrÃ­bete al hackathon`), **flagship** de `/hackathons` y botÃ³n de cada **evento** en `EventList.jsx` ahora usan el botÃ³n Luma.
  - **PÃ¡gina del evento embebida** en `/hackathons`: iframe responsive (`luma.com/embed/.../simple`) en una grilla junto a la descripciÃ³n "Detalle del evento" (mobile-first, `min-h-[420px]`, borde `border-border`).
  - Constantes centralizadas en `src/lib/content.js`: `LUMA_EVENT_ID`, `LUMA_EVENT_URL`, `LUMA_EMBED_URL`, `LUMA_CHECKOUT_SCRIPT`. El comando `hackathon` de GEX_OS muestra la URL oficial de Luma.
- **Imagen de MisiÃ³n y VisiÃ³n** (`/home`): la imagen flotante de la secciÃ³n 03 ya no es el isotipo con blend, sino la fotografÃ­a oficial de comunidad (`public/brand/imagen-mision-vision.jpeg`, 960Ã—1280) con marco sutil (`border-primary/20`), sombra `primary` y dimensiones adaptativas (`max-h-[72%] max-w-[88%]`, `object-contain`) que respetan el layout desktop y el mÃ³vil.
- **Imagen "Who We Are"** (`/about`): la secciÃ³n `&lt;who_we_are&gt;` de la pÃ¡gina Sobre Nosotros muestra la fotografÃ­a **`Frame2` del video institucional** (`public/brand/frame2.jpg`, 736Ã—981). **Sin animaciÃ³n**: se eliminaron los efectos `gex-float`/`gex-glow`; en desktop ocupa todo el panel izquierdo (`object-cover`) y en mÃ³vil aparece como foto flotante a la derecha del texto (`float-right`, `w-40 sm:w-48`) para no robar espacio vertical.
- **Mentores y aliados**: nuevo apartado de **Duvan Altamar** fijado **arriba** del listado (`/aliados`), diferenciado de Brandon:
  - Perfil integral (`/aliados/duvan-altamar`) con tarjeta del **video corto de presentaciÃ³n del fundador** como card flotante de bordes redondeados (`rounded-2xl`) con `poster` del isotipo y `preload="metadata"` (el vÃ­deo de 18 MB no bloquea la carga inicial).
  - Rol **`Fundador Â· GexStudio Team`** (corona + badge), fondo tipo **auroras** con los colores del logo (`#008BFE` azul + violeta `#a855f7`) tanto en la card resumida como en el perfil.
  - InformaciÃ³n dividida en **tech** (diseÃ±Ã³ y desarrollÃ³ GEX_OS, arquitectura frontend del ecosistema) y **liderazgo** (creaciÃ³n de Gex Club, direcciÃ³n de GexStudio Team, estÃ¡ndar de calidad).
  - Redes: Instagram `@duvanltbaq` y GitHub `GexStudio-Team`; botones de acciÃ³n a GEX_OS y al vault de proyectos.
  - Datos centralizados en `src/lib/content.js` (`DUVAN_ALTAMAR`, `DUVAN_TECH`, `DUVAN_LEADERSHIP`).
- **Logo con fondo oscuro en navbar y footer**: el texto `GEX_CLUB` fue reemplazado por el **isotipo con fondo oscuro** en el sidebar de escritorio (`gex-mark-dark-square.png`), el header y menÃº mÃ³vil (`gex-club-logo-dark.png`) y el footer (`gex-club-logo-dark.png`); el isotipo horizontal con letras (`public/brand/gex-club-logo-dark.png`, 1774Ã—887) ya no es exclusivo de la secciÃ³n de marcas.
- **AÃ±o de fundaciÃ³n corregido**: todas las referencias `EST. 2024` pasaron a **`EST. 2025`** (sidebar, banner de GEX_OS, `whoami` y `neofetch` de la terminal).
- **Perfil del fundador â€” rediseÃ±o** (`/aliados/duvan-altamar`):
  - **Card Ãºnica**: el header con nombres y presentaciÃ³n ya no comparte espacio con el video; el **isotipo sin fondo** (`gex-club-logo-transparent.png`, 1536Ã—1024) acompaÃ±a el nombre en grande en el espacio que antes ocupaba el video.
  - **Video por fuera**: la tarjeta del video de presentaciÃ³n quedÃ³ como **card independiente** a la derecha del contenido, ocupando **todo el alto de su columna** (`flex-1 self-stretch`), con bordes redondeados (`rounded-2xl`) y `object-cover`.
  - **ReproducciÃ³n infinita**: el video ahora corre con `autoPlay` + `loop` + `muted` + `playsInline` (arranca solo, sin clic) y se **eliminÃ³ el poster** con el isotipo oscuro (y el `preload="metadata"`) para que no se vea un logo estÃ¡tico antes de cargar.
  - **Secciones equilibradas**: contenido interior reorganizado en grilla de 2 columnas uniformes (`sm:grid-cols-2`): tech | liderazgo / redes | showcase / acerca (a lo ancho). **Redes apiladas una sobre otra** (`flex-col gap-4`) en su propia celda.
- **Proyectos â€” desarrollador visible**: cada card del vault ahora muestra `GexStudio Team Â· <desarrollador>` (campo `developer` en `content.js`) en la franja inferior antes de entrar a la ficha; GEX_OS lista a **Duvan Altamar** y los demÃ¡s proyectos a **Brandon Carranza**.
- **Ficha de proyecto dinÃ¡mica** (`/projects/[slug]`): el panel lateral "Desarrollador" dejÃ³ de estar fijo a Brandon; ahora resuelve los datos segÃºn `developer` del proyecto (GEX_OS â†’ Duvan Altamar con GitHub e Instagram; los demÃ¡s â†’ Brandon Carranza con GitHub, LinkedIn y contacto). La card de GEX_OS ademÃ¡s acredita explÃ­citamente en su descripciÃ³n que fue diseÃ±ada y desarrollada por Duvan Altamar.
- **Limpieza de tags decorativos** `{'// â€¦'}`: se eliminaron los rÃ³tulos redundantes que flotaban en las secciones (`// since_2024`, `// rendering future`, `// the_foundry`, `// the_vault`, `// Gex Club`, `// proyecto Â· GexStudio Team`, `// GexStudio Team Â· perfil`) para reducir ruido visual; los rÃ³tulos `&lt;mission&gt;`, `&lt;who_we_are&gt;`, etc. se conservan como lenguaje visual del sitio, y los mensajes `// â€¦` de la terminal GEX_OS se mantienen porque son salida funcional de comandos.

### Changed

- **Hackathon / Game Jam — Actualización de fecha y botones Luma**:
  - Fecha establecida para el **31 de octubre de 2026** (8:30 a. m. a 6:30 p. m.).
  - Los botones de inscripción en el Hero y en la sección de Hackathons ahora envían directamente a la página oficial de Luma en una nueva pestaña (	arget="_blank").
  - Se mantiene únicamente el iframe interactivo embebido al pie de /hackathons.

- **Deuda tÃ©cnica eliminada (ESLint)**: se reescribiÃ³ `eslint.config.mjs` reemplazando el patrÃ³n `FlatCompat` (incompatible con ESLint 9.39, causaba `TypeError: Converting circular structure to JSON` y rompÃ­a `npm run lint`) por la configuraciÃ³n **flat nativa** (`defineConfig`/`globalIgnores` de `eslint/config` + `eslint-config-next/core-web-vitals`, que en v16 exporta flat directamente). `npm run lint` vuelve a funcionar.
- **Experiencia mÃ³vil (Fase 2)**: los **4 pilares** ahora son un carrusel horizontal deslizable (`snap-x`, scrollbar oculta, hint "swipe â†’") en mÃ³vil/tablet y conservan la grilla en desktop (`lg`); las tarjetas de **eventos** se compactaron en mÃ³vil (fecha y estado en la misma fila, paddings reducidos, metadatos inline) manteniendo el layout de escritorio.
- **Footer mÃ³vil**: la columna de **Redes** ahora queda a la **derecha** de **NavegaciÃ³n** en pantallas pequeÃ±as (grilla de 2 columnas); en desktop se conserva el orden original (1.5fr / 1fr / 1fr).
- **Espaciado superior del layout mÃ³vil**: el `main` ahora reserva `pt-[88px]` en mÃ³vil (statusbar 32px + header 56px) para que la frase "Global Ecosystem for eXcellence" del hero no quede oculta bajo el nav fijo; desktop mantiene `pt-8`.
- **Imagen del vault** (`/projects`): reducida en mÃ³vil (`h-36 w-36` vs `h-64 w-64`) y pegada mÃ¡s a la derecha para que no sobresalga de la franja de tÃ­tulo; en desktop conserva proporciones grandes (`h-52 w-52 md`).
- **Experiencia mÃ³vil de la home (Fase 1)**: espaciados adaptativos (`py-12 lg:py-24` en Pillars, MisiÃ³n, Eventos y CTA; padding interior del CTA compacto), hero con **texto primero** en mÃ³vil (se invirtiÃ³ el orden de la visual 3D), **hero compacto** (`lg:min-h-[88vh]`, tÃ­tulo `text-4xl` en mÃ³vil, visual 3D `min-h` reducida) y **TerminalLauncher oculto cerca del final de pÃ¡gina** (260px del bottom) para no tapar CTA ni footer. Sin cambios en desktop (`lg:` preserva el layout original).
- **`next.config.mjs`**: se aÃ±adiÃ³ `allowedDevOrigins: ['192.168.1.23']` para permitir ver el sitio en desarrollo desde la red local (advertencias de cross-origin de Next.js al acceder por IP de red). Sin efecto en producciÃ³n (solo aplica al modo dev).

### Fixed

- **Hydration mismatch en el countdown de `/hackathons`** (`CountdownTimer.jsx`): el contador renderizaba valores distintos entre el server (SSG) y el cliente porque `Date.now()` se evaluaba en entornos diferentes (p. ej. `17` vs `16` segundos), lo que regeneraba el Ã¡rbol en el cliente. Se aplicÃ³ el patrÃ³n canÃ³nico para relojes: estado inicial perezoso + `suppressHydrationWarning` en los dÃ­gitos (escape hatch oficial de React para contenido basado en tiempo) y actualizaciones **solo** dentro del callback del intervalo (se eliminÃ³ el `setState` sÃ­ncrono del `useEffect` que ademÃ¡s incumplÃ­a `react-hooks/set-state-in-effect`).
- **Bug de fecha en eventos**: `2026-10-03` se mostraba como "02 oct" (o "2") porque `new Date('YYYY-MM-DD')` interpreta la fecha como medianoche UTC y en `America/Bogota` (UTCâˆ’5) caÃ­a en el dÃ­a anterior. Se aÃ±adiÃ³ `parseLocalDate`/`formatDateEs` en `src/lib/utils.js` (parsing local) y se aplicÃ³ en `EventsPreview.jsx` y `EventList.jsx`. El countdown se alimenta de `startAt` con offset `-05:00`, por lo que ya era correcto.
- **Warnings y errores de lint residuales**: se corrigieron los 8 casos de `react/jsx-no-comment-textnodes` (textos `// â€¦` en JSX ahora van entre llaves `{'// â€¦'}`), el `react-hooks/set-state-in-effect` en `Terminal.jsx` (la bienvenida de GEX_OS se inicializa vÃ­a lazy `useState` en lugar de `boot()` dentro de `useEffect`), los 5 avisos `@next/next/no-img-element` (migraciÃ³n a `next/image` con `width`/`height` reales, aprovechando `images.unoptimized`) y el `@next/next/no-location-assign-relative-destination` en `TerminalLauncher.jsx` (ahora usa `useRouter().push('/gexos')`).

### Docs

- **DocumentaciÃ³n tÃ©cnica actualizada** a la realidad del proyecto v0.3.0 (`public/Docs/DOCUMENTACION_TECNICA.md`): se reemplazÃ³ la versiÃ³n obsoleta (backend en memoria, API Routes) por la arquitectura actual (export estÃ¡tico, `content.js`, GEX_OS, "G" 3D, estrategia de contenido, versionado y backlog).
- `README.md`: la tabla de ramas refleja `main` como Ãºnica rama activa (post-merge de GEX_OS) y enlaza a la documentaciÃ³n tÃ©cnica y a Releases.
- `CONTRIBUTING.md`: el Definition of Done usa `npm run build` como verificaciÃ³n principal (el `lint` arrastra un fallo de configuraciÃ³n pre-existente) y documenta el flujo de squash merge.
- **Perfil de la organizaciÃ³n `GexStudio-Team/.github`** (`8710048`): se corrigiÃ³ la codificaciÃ³n UTF-8 de `profile/README.md` y `CONTRIBUTING.md`, que mostraba texto ilegible en la portada de la org. El README del perfil ahora incluye GEX_OS como proyecto activo.

### Planeado

- AuditorÃ­a SEO: imagen OG, Twitter Cards, JSON-LD y metadatos canÃ³nicos.
- Formulario de inscripciÃ³n a hackathons con identidad de marca (embebido, sin salir del sitio).
- Pipeline CI/CD con GitHub Actions y artefacto de publicaciÃ³n.

---

## [0.3.0] â€” 2026-09-08

### Added

- **GEX_OS v1.0** â€” Terminal interactiva en `/gexos` (PR #2):
  - LibrerÃ­a de comandos (`src/lib/commands.js`) alimentada por `src/lib/content.js`.
  - Componentes: `Terminal.jsx` (shell con historial y autocompletado), `MatrixRain.jsx` (lluvia digital en Canvas), `GexAscii.jsx` (logo ASCII), `TerminalLauncher.jsx` (acceso global).
  - Comandos: `help`, `ls`, `cat <slug>`, `hackathon`, `social`, `contacto`, `whoami`, `neofetch`, `matrix`, `sudo`, `clear`, `exit`, `pwd`, `date` (con alias en espaÃ±ol).
  - Acceso global: botÃ³n flotante tras scroll + atajo `Ctrl+K` desde cualquier pÃ¡gina.
  - Ruta `/gexos` integrada a la navegaciÃ³n (sidebar y menÃº mÃ³vil) y al `sitemap.xml`.
  - Registro de GEX_OS como proyecto en el vault (`PROJECTS` en `content.js`) con ficha dinÃ¡mica (`/projects/gex-os`).

### Fixed

- **`clear`/`matrix`/`exit` en GEX_OS**: los comandos especiales fallaban porque el objeto `LINE` no exponÃ­a los tones reservados y el filtro `OUTPUT_TYPES` los descartaba antes de procesarlos. Se reordenÃ³ la evaluaciÃ³n en `Terminal.jsx` (tones especiales primero) y los runners de `commands.js` ahora devuelven el tone correcto directamente.

> Nota: `npm run lint` presentaba un error de configuraciÃ³n **pre-existente** (FlatCompat + ESLint 9, `next/core-web-vitals`) no relacionado con GEX_OS; el build estÃ¡tico se generaba correctamente. **Resuelto en `Unreleased`** (configuraciÃ³n flat nativa).

### Planeado

- AuditorÃ­a SEO: imagen OG, Twitter Cards, JSON-LD y metadatos canÃ³nicos.
- Formulario de inscripciÃ³n a hackathons con identidad de marca (embebido, sin salir del sitio).
- Pipeline CI/CD con GitHub Actions y artefacto de publicaciÃ³n.
- DocumentaciÃ³n tÃ©cnica profesional: `docs/`, arquitectura y guÃ­a de despliegue.
- Resolver error de configuraciÃ³n de ESLint (FlatCompat).

---

## [0.2.0] â€” 2026-09-08

### Added

- `LICENSE` (MIT) con titularidad de GexStudio Team.
- `CONTRIBUTING.md` con estÃ¡ndares de colaboraciÃ³n para la comunidad.
- `CHANGELOG.md` con polÃ­tica de documentaciÃ³n continua.

### Changed

- **Hackathon / Game Jam — Actualización de fecha y botones Luma**:
  - Fecha establecida para el **31 de octubre de 2026** (8:30 a. m. a 6:30 p. m.).
  - Los botones de inscripción en el Hero y en la sección de Hackathons ahora envían directamente a la página oficial de Luma en una nueva pestaña (	arget="_blank").
  - Se mantiene únicamente el iframe interactivo embebido al pie de /hackathons.

- `README.md`: incorpora badge de licencia y secciÃ³n de contribuciÃ³n.
- `.gitignore`: se ignoran notas locales del entorno (`EXPLICACION_LOCAL.md`).

### Removed

- `EXPLICACION_LOCAL.md` del control de versiones (se conserva como nota local del equipo; contenÃ­a rutas del entorno de desarrollo).

---

## [0.1.0] â€” 2026-09-05

VersiÃ³n base publicada del sitio oficial.

### Added

- Hero con marca "G" 3D a pantalla completa (`Three.js`): geometrÃ­a de bloques metÃ¡licos/translÃºcidos, conexiones neÃ³n lima, `UnrealBloomPass` y partÃ­culas de polvo digital.
- Auto-fit de cÃ¡mara sobre el tamaÃ±o real de la pieza para adaptarse a toda resoluciÃ³n.
- Respeto de `prefers-reduced-motion`.

### Fixed (relevantes de fases previas)

- Estructura interna de carpetas del repositorio reorganizada.
- Contenido centralizado en `src/lib/content.js` (eventos, proyectos, aliados, contacto).

---

## [0.0.1] â€” Inicios (historia temprana)

ConstrucciÃ³n inicial del sitio: rutas institucionales, estructura Next.js App Router,
paleta oscura con acentos azul/violeta, tipografÃ­a JetBrains Mono, y memoria del proyecto
conservada en ramas de respaldo (`edition`, `main-anterior`, `legacy-*`).

---

<!-- Enlaces de comparaciÃ³n entre versiones (se activan al crearse tags):
[Unreleased]: https://github.com/GexStudio-Team/GexClub-Page/compare/v0.3.0...HEAD
[0.3.0]:      https://github.com/GexStudio-Team/GexClub-Page/releases/tag/v0.3.0
[0.2.0]:      https://github.com/GexStudio-Team/GexClub-Page/releases/tag/v0.2.0
[0.1.0]:      https://github.com/GexStudio-Team/GexClub-Page/releases/tag/v0.1.0
-->

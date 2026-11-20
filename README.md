# gexclub_pasar

Repositorio de respaldo y puente de trabajo del sitio **Gex Club**. Permite continuar la edición desde otra computadora sin depender de los archivos locales originales.

## Contenido

| Carpeta | Qué contiene | Para qué sirve |
|---|---|---|
| `deploy/` | Build estático final: HTML, CSS, JS, imágenes y videos (121 archivos). | Subir tal cual al File Manager de Hostinger. No requiere Node.js ni `npm`. |
| `codigo-completo/` | Proyecto Next.js completo: `src/`, `public/`, configuración, `package.json`, `package-lock.json` y documentación (69 archivos). | Editar, probar y generar un nuevo build. |

`deploy/` reproduce exactamente el sitio publicado en https://gexclub.novatechdevelopment.com.

## Estado del código incluido

- Versión visible en la barra de estado: `v0.4.0`.
- Hackathon / Game Jam de desarrollo de videojuegos: sábado 31 de octubre de 2026, 8:30 a. m. a 6:30 p. m.
- Botones de inscripción del Hero y de `/hackathons`: enlace directo a Luma en pestaña nueva.
- Único embebido de Luma: al final de la página `/hackathons`.
- Origen: commit `8a05333` de `GexStudio-Team/GexClub-Page`, rama `main`.

## Cómo trabajar desde otra PC

```bash
cd codigo-completo
npm install
npm run dev      # servidor local de desarrollo
npm run build    # genera la carpeta out/ con el sitio estático
```

Las dependencias no se incluyen en el repositorio (`node_modules`, `.next` y `out` se generan con `npm install` / `npm run build`).

## Cómo publicar una actualización

1. Editar y verificar el código en `codigo-completo/`.
2. Ejecutar `npm run build`.
3. Copiar el contenido de `out/` dentro de `deploy/` (reemplazando el anterior).
4. Subir el contenido de `deploy/` al alojamiento.

## Nota

Repositorio público, creado a petición del propietario para facilitar el acceso desde varios equipos.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sitio institucional de EMED (Escuela de Mediación) orientado a captación de leads y matrículas. Construido con Astro 5 + React 19 + Tailwind CSS 4.

## Commands

```bash
npm install          # Instalar dependencias (Node 18+, npm 9+)
npm run dev          # Dev server → http://localhost:4321
npm run build        # Build de producción → dist/
npm run preview      # Sirve el build generado localmente

# Deployment
npm run deploy:zip   # Build + ZIP listo para subir al hosting
./deploy.sh          # Build + tar.gz en deploys/

# Geo data
python3 scripts/build_geojson.py   # Regenerar GeoJSON para mapas
```

No hay scripts de lint ni tests configurados actualmente.

## Environment Variables

Copiar `.env.example` a `.env` y configurar:

| Variable | Descripción |
|----------|-------------|
| `FTP_HOST/USER/PASSWORD/REMOTE_PATH` | Para deploy FTP |

## Architecture

### Data Flow

El contenido académico vive en JSON estáticos dentro de `src/data/` (`diplomados.json`, `cursos.json`, `productos.json`). La capa `src/lib/productos.ts` los lee y expone funciones de filtrado (`getByType`, `getBySlug`, etc.). Editar directamente los JSON para actualizar contenido.

### Astro vs React

- **`.astro` files** → componentes y páginas server-rendered (SSG). Toda la lógica de fetch de datos ocurre aquí, en el frontmatter (`---`).
- **`.tsx` files** → solo para componentes que requieren interactividad en el cliente (mapas `MapaChile*.tsx`, sliders). Se montan con `client:only="react"` en las páginas Astro.

No mezclar lógica de datos dentro de componentes React; el fetch siempre va en el `.astro` padre que lo invoca.

### Routing

Basado en archivos bajo `src/pages/`. Rutas dinámicas activas:
- `/diplomados/[slug].astro` — detalle de diplomado
- `/programas/[id].astro` — ruta alternativa por ID

### Styling

- Tailwind 4 para layout y espaciado (utility-first, mobile-first).
- Variables de tema en `src/styles/theme.css` (colores, tipografía).
- Estilos de componente dentro de bloques `<style>` en archivos `.astro`/`.tsx`.
- No usar CSS inline para estilo visual; preferir clases Tailwind o los bloques `<style>`.

### Geographic Data

Los mapas usan D3 + Leaflet con datos GeoJSON en `/data/`. Para actualizar datos geográficos, modificar los CSV fuente y ejecutar `scripts/build_geojson.py`.

## Documentation

La documentación estructurada está en `docs/`:

- `docs/01_pilares/DESIGN_SYSTEM.md` — tokens visuales y reglas de diseño
- `docs/01_pilares/ESTRATEGIA_SEO.md` — estrategia SEO por página
- `docs/01_pilares/PLAN_DE_DESARROLLO.md` — roadmap y tareas abiertas
- `docs/01_pilares/DEPLOY_GUIDE.md` — procedimiento de deploy detallado
- `docs/03_desarrollo/CODEBASE_OVERVIEW.md` — referencia técnica ampliada
- `docs/reporte/` — reportes de cambios con timestamp (crear uno al finalizar sesiones significativas)

Antes de iniciar trabajo mayor, revisar `PLAN_DE_DESARROLLO.md` para tareas abiertas y `DESIGN_SYSTEM.md` para respetar los tokens visuales.

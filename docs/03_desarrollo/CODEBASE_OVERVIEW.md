# EMED Web – Codebase Overview

Descripcion tecnica del arbol `src/`, datasets y scripts auxiliares para acelerar el onboarding.

## 1. Capas principales
1. **Pages (`src/pages/`)**: paginas Astro (SSR/SSG). Cada ruta publica (`/diplomados`, `/cursos`, `/contacto`, etc.) vive aqui y compone secciones declarativas.
2. **Componentes (`src/components/`)**: dividido por familias (`layout`, `sections`, `ui`, `forms`, mapas interactivos en React/D3). Los mapas `Mapa*.tsx` renderizan datos de `data/`.
3. **Layouts (`src/layouts/Layout.astro`)**: shell global (head, header/footer, tipografias) compartido por todas las paginas.
4. **Librerias (`src/lib/`)**: conectores de datos (`wp.ts`) y helpers para datasets estaticos (`productos.ts`).
5. **Datos (`src/data/*.json`)**: salida del pipeline de extraccion (diplomados, cursos, productos). Para datos geograficos se usa `/data` en la raiz.
6. **Estilos (`src/styles/`)**: CSS modulado por base/typography/components + `theme.css` para tokens.
7. **Tipos (`src/types/`)**: definiciones TypeScript (`producto.ts`, `woocommerce.ts`, `env.d.ts`).

## 2. Referencia por directorio
| Ruta | Descripcion |
|------|-------------|
| `src/pages/index.astro` | Landing principal que importa `HeroCarousel`, `ProgramsGrid`, `MapaImpacto`, etc. |
| `src/pages/programas/[id].astro` | Pagina dinamica para un programa, alimentada por `getProductoPorSlug` o `getProductsGraphQL`. |
| `src/components/layout/Header.astro` y `SiteHeader.astro` | Navegacion principal + barra adhesiva. |
| `src/components/sections/*` | Secciones reutilizables: `ProgramsAccordion`, `WhyStudyMediation`, `PageHero`, etc. |
| `src/components/forms/ContactForm.astro` | Formulario base listo para integrar APIs externas. |
| `src/components/MapaChileGeoJSON.tsx` | Visualizacion React+D3 usando `data/` y `scripts/build_geojson.py`. |
| `src/lib/wp.ts` | Cliente WP/WooCommerce con cache TTL, GraphQL fallback y normalizacion de metacampos (`_emed_*`). |
| `src/lib/productos.ts` | API estatico para `src/data/*.json` con filtros, queries por slug/id, buscador y helpers de categorias/etiquetas. |
| `extract-data.mjs` / `extract-wordpress-data.js` | Scripts Node para generar los JSON consumidos por `src/data`. |
| `scripts/build_geojson.py` | Une CSV + GeoJSON para el mapa de impacto. |

## 3. Flujo de datos detallado
1. **WooCommerce REST/GraphQL**: `getProducts`, `getProductsGraphQL`, `getProductBySlug` y `getProductDetail` viven en `src/lib/wp.ts`. Hay cache in-memory (`apiCache`), manejo de errores tipado (`WooCommerceError`, `ApiError`) y helpers (`getMetaValue`, `formatPrice`).
2. **Modo offline**: `src/lib/productos.ts` permite trabajar sin WordPress leyendo `src/data/productos.json`, `diplomados.json` y `cursos.json`. Los filtros (`ProductoFiltros`) cubren `tipo`, `modalidad`, `destacado`, etc.
3. **Mapas**: `data/chile_regiones_emed_simplified.geojson`, `data/datos_regionales_emed.csv` y `data/posiciones_etiquetas.json` se combinan para alimentar el componente `MapaImpacto`. El script Python genera la version simplificada.
4. **Stylesystem**: `src/styles/global.css` importa resets (`base/reset.css`) y tipografia (`base/typography.css`). `theme.css` define CSS custom properties alineadas con `docs/01_pilares/DESIGN_SYSTEM.md`.

## 4. Integraciones clave
- **WordPress/WooCommerce**: definidas en `.env`, `wp.ts` utiliza `WP_DOMAIN`, `WP_GRAPHQL_URL`, `WC_KEY`, `WC_SECRET`. Ver `docs/04_integraciones/WORDPRESS-WOOCOMMERCE.md`.
- **Map data**: `MapaImpacto.astro` y `MapaImpacto.tsx` funcionan como wrappers Astro/React, comunicandose con D3/Leaflet segun la pagina (`impacto.astro`).
- **Formularios**: `ContactForm.astro` expone `handleSubmit` listo para conectar un endpoint (actualmente placeholder).

## 5. Scripts y tooling
| Archivo | Uso |
|---------|-----|
| `extract-data.mjs` | Fetch directo al WP REST local, mapea metacampos `_emed_*` y guarda JSON en `src/data/`. |
| `extract-wordpress-data.js` | Version modular que puede correrse desde Node/TS. |
| `scripts/build_geojson.py` | Normaliza shapes y datos CSV antes de publicarlos en `/data`. |
| `deploy.sh` | Build + empaquetado `.tar.gz` en `deploys/`. |

## 6. TODO de documentacion detectado
- Completar los `TODO` dentro de los pilares (`CLAUDE_GUIDE`, `DESIGN_SYSTEM`, etc.) con la informacion de `src/`.
- Registrar ADRs cuando cambie la integracion con WordPress (`docs/01_pilares/CLAUDE_GUIDE.md`).
- Agregar ejemplos de consumo en `docs/03_desarrollo/DESARROLLO.md` para `src/lib/wp.ts` y `src/lib/productos.ts`.

Mantener este archivo actualizado cuando se creen nuevos modulos o scripts.

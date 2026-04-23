# CLAUDE.md — EMED Web

This file documents the codebase structure, development conventions, and workflows for AI assistants working on this project.

## Project Overview

**EMED** (Escuela de Mediación) is a Chilean mediation education institution founded in 2005. This is their marketing/informational website built with Astro. It showcases diplomados (diploma programs) and courses in mediation, pulling product data dynamically from a WordPress/WooCommerce backend.

- **Language of content**: Spanish (Chilean audience)
- **Dev server URL**: `http://localhost:4321`
- **Build output**: `./dist/`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5.x (static site generator with islands architecture) |
| UI Components | React 19 (used only for interactive islands) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Typography | Inter Variable (`@fontsource-variable/inter`) |
| Maps | D3.js v7 + GeoJSON data |
| CMS/Backend | WordPress + WooCommerce (REST API + WPGraphQL) |
| Language | TypeScript (strict mode) |
| Package Manager | npm |

---

## Commands

Run all commands from the project root:

```sh
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
./deploy.sh          # Build and package a .tar.gz deploy archive
```

There is **no test suite** configured. There are no lint scripts defined in `package.json`.

---

## Environment Variables

Create a `.env` file at the project root (never commit it — already in `.gitignore`):

```sh
WP_DOMAIN=https://your-wordpress-site.com   # WordPress site URL (no trailing slash)
WC_KEY=ck_xxxxxxxxxxxx                       # WooCommerce consumer key
WC_SECRET=cs_xxxxxxxxxxxx                    # WooCommerce consumer secret
WP_GRAPHQL_URL=https://your-site.com/graphql # Optional — defaults to ${WP_DOMAIN}/graphql
```

The app works without WooCommerce configured: program pages fall back to hardcoded data defined in `src/pages/programas/[id].astro`.

---

## Project Structure

```
EMED-web/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML shell (head SEO, SiteHeader, SiteFooter slot)
│   ├── pages/                    # File-based routing (each file = a route)
│   │   ├── index.astro           # Homepage
│   │   ├── admision.astro
│   │   ├── contacto.astro
│   │   ├── cursos.astro
│   │   ├── diplomados.astro
│   │   ├── empresas.astro
│   │   ├── financiamiento.astro
│   │   ├── impacto.astro
│   │   ├── mediacion.astro
│   │   ├── nosotros.astro
│   │   ├── diplomados/           # Static diplomado detail pages
│   │   │   ├── mediacion-escolar.astro
│   │   │   ├── mediacion-familiar.astro
│   │   │   └── mediacion-laboral.astro
│   │   └── programas/
│   │       └── [id].astro        # Dynamic route — product pages from WooCommerce
│   ├── components/
│   │   ├── layout/               # SiteHeader.astro, SiteFooter.astro
│   │   ├── sections/             # Full-width page sections (Hero, Programs grid, etc.)
│   │   ├── ui/                   # Small reusable UI pieces (cards, buttons, banners)
│   │   ├── forms/                # ContactForm.astro, NewsletterForm.astro
│   │   ├── examples/             # Reference/example components
│   │   └── Mapa*.tsx             # Interactive Chile map (React/D3 islands)
│   ├── lib/
│   │   └── wp.ts                 # All WordPress/WooCommerce API calls
│   ├── types/
│   │   ├── env.d.ts              # Astro env type declarations
│   │   └── woocommerce.ts        # TypeScript interfaces for WooCommerce + EMED product types
│   ├── styles/
│   │   ├── global.css            # Main stylesheet — imports Tailwind + theme.css
│   │   ├── theme.css             # CSS custom properties (design tokens + utility classes)
│   │   ├── base/                 # reset.css, typography.css
│   │   └── components/           # buttons.css, sections.css
│   └── assets/
│       └── images/               # SVGs and PNGs (logo, hero illustrations, brand seals)
├── public/
│   ├── favicon.svg
│   └── data/                     # GeoJSON and CSV files served statically for the map
│       ├── chile_regiones_emed_simplified.geojson
│       ├── datos_regionales_emed.csv
│       └── ...
├── data/                         # Source data files (not served directly)
├── docs/                         # Internal planning docs (not part of the build)
├── wordpress-config/             # WordPress/WooCommerce setup guides and PHP snippets
├── scripts/
│   └── build_geojson.py          # Python script to process/simplify GeoJSON source data
├── deploys/                      # Generated .tar.gz deploy archives (gitignored)
├── astro.config.mjs              # Astro config (React integration, Tailwind via Vite)
├── tsconfig.json                 # TypeScript strict config
└── deploy.sh                     # Build + package script for shared hosting deployment
```

---

## Design System

### Color Palette

All colors are defined as CSS custom properties in `src/styles/theme.css` and also exposed as Tailwind utility classes.

| Variable | Hex | Usage |
|---|---|---|
| `--color-celeste` | `#7EC5D6` | Primary brand color, header background, CTA buttons |
| `--color-turquesa` | `#00A6B1` | Secondary brand, hover states |
| `--color-naranja` | `#F5821F` | Accent, "Diplomado" badges, highlighted CTAs |
| `--color-amarillo` | `#FDB813` | Accent, warm highlights |
| `--color-beige` | `#FFF7E7` | Section backgrounds |
| `--color-crema` | `#FEF7E8` | Alternate section backgrounds |
| `--color-verde` | `#22C55E` | Success, employment opportunities |

**Important rule**: Any `<a>` or `<button>` with a colored background (`bg-celeste`, `bg-naranja`, etc.) must have white text. This is enforced globally in `src/styles/global.css` via attribute selectors.

### Typography

- **Primary font**: Inter Variable
- **Weights**: 400 (normal), 600 (semibold), 700 (bold)
- **Headings**: `font-weight: var(--font-weight-semibold)`, `line-height: 1.2`, `margin: 0`

### Spacing / Layout

- Use the `.container` utility class for page-width content with responsive max-widths and auto horizontal margins.
- Section vertical padding is typically `py-16` or `py-20`.
- The header is fixed at the top — `body` has `padding-top: 80px` applied from `SiteHeader.astro` styles.

---

## Architecture Patterns

### Astro + React Islands

Astro renders everything to static HTML by default. React components are only used when interactivity is required (e.g., the interactive Chile map). These are loaded as client-side islands using directives:

```astro
<!-- Only load/hydrate on client, skip SSR entirely -->
<MapaChileGeoJSON client:only="react" />
```

Prefer Astro components (`.astro`) for non-interactive UI. Use React (`.tsx`) only when browser APIs or state are required.

### Component File Naming

- Astro components: `PascalCase.astro`
- React components: `PascalCase.tsx`
- Pages: `kebab-case.astro`
- Prefixed with underscore (`_`) = deprecated/old pages kept for reference (e.g., `_diplomados-y-cursos-old.astro`)

### Layout Pattern

Every page uses `src/layouts/Layout.astro` which automatically includes `SiteHeader` and `SiteFooter`. Pages only need to provide the `<slot />` content:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Page Title" description="Page description">
  <!-- Page content goes here -->
</Layout>
```

The `Layout` accepts optional `title` and `description` props for SEO meta tags.

---

## WordPress / WooCommerce Integration (`src/lib/wp.ts`)

### API Strategy

The app uses a **GraphQL-first, REST fallback** approach:

1. Attempts to fetch products via WPGraphQL (faster, structured)
2. On failure, falls back to WooCommerce REST API v3
3. On both failures, hardcoded fallback data is used in `programas/[id].astro`

### Key Exported Functions

```typescript
getEmedProducts(filters?)          // Get all products (GraphQL first)
getEmedProductById(id)             // Get single product by WooCommerce database ID
getEmedProductBySlug(slug)         // Get product by URL slug
getFeaturedEmedProducts()          // Get featured products only
getEmedProductsByType(type)        // Filter by 'Diplomado' or 'Curso'
clearProductCache()                // Clear the in-memory 5-minute cache
```

### EMED Product Custom Fields

Products in WooCommerce use custom meta fields prefixed with `_emed_`:

| Key | Type | Description |
|---|---|---|
| `_emed_tipo` | `'Diplomado' \| 'Curso'` | Program type |
| `_emed_duracion` | string | Duration (e.g., "120 horas") |
| `_emed_modalidad` | `'Presencial' \| 'Online' \| 'Mixto'` | Delivery mode |
| `_emed_destacado` | boolean string | Featured flag |
| `_emed_beneficios` | string[] | List of benefits |
| `_emed_temario` | array | Curriculum modules |
| `_emed_requisitos` | string[] | Admission requirements |
| `_emed_metodologia` | string/string[] | Teaching methodology |
| `_emed_certificacion` | string/string[] | Certification details |
| `_emed_empleabilidad` | string[] | Job opportunity sectors |
| `_emed_brochure` | object/string | Downloadable brochure file |
| `_emed_ubicacion` | string | Location (for in-person programs) |

### Response Caching

API responses are cached in memory for 5 minutes (`CACHE_TTL = 5 * 60 * 1000`). Cache is per-filter-combination. Use `clearProductCache()` if stale data is suspected during development.

### Price Formatting

Prices are stored as strings in WooCommerce (e.g., `"450000"`). The `formatPrice()` helper converts them to Chilean peso format: `"$450.000"`.

---

## Dynamic Routing: `programas/[id].astro`

This page handles all program detail pages. It uses `getStaticPaths()` to pre-generate routes from WooCommerce slugs at build time. If WooCommerce is unavailable during build, it falls back to a hardcoded list of 6 program slugs.

At page load time, it:
1. Fetches the product by slug from WooCommerce
2. Falls back to the hardcoded `programasFallback` array if not found
3. Returns a 404 response if neither source has the program

The fetched data is mapped to a `programaDisplay` object that normalizes WooCommerce fields alongside the fallback data shape.

---

## Navigation Structure

Defined in `SiteHeader.astro`:

| Label | Route |
|---|---|
| HOME | `/` |
| DIPLOMADOS | `/diplomados` |
| CURSOS | `/cursos` |
| NOSOTROS | `/nosotros` |
| ADMISIÓN | `/admision` |
| CONTACTO | `/contacto` |

The header is fixed/sticky with a `bg-celeste` background and becomes slightly transparent on scroll.

---

## Map Component (`MapaChileGeoJSON.tsx`)

Interactive SVG map of Chile's regions rendered with D3.js. It:

- Fetches `/data/chile_regiones_emed_simplified.geojson` at runtime
- Colors regions by impact level using a threshold-based color scale
- Shows tooltips on hover with region stats
- Uses Mercator projection centered at `[-71, -40]` (central Chile)
- Renders as a React island with `client:only="react"` to avoid SSR issues with D3

**Props**: `className`, `height` (default `"700px"`), `title`

---

## Deployment

The site targets **shared hosting** (not a cloud platform). Deployment is manual:

```sh
./deploy.sh
```

This script:
1. Runs `npm run build` to generate static files in `./dist/`
2. Creates a timestamped `.tar.gz` archive in `./deploys/`
3. The archive is manually uploaded to the hosting provider
4. On the server: `tar -xzf emed-web-TIMESTAMP.tar.gz`

The `deploys/` directory is **not** in `.gitignore` — archives are committed. The `dist/` directory is ignored.

---

## Key Conventions for AI Assistants

1. **All user-visible text is in Spanish** — maintain this for any new content or UI strings.

2. **Prefer Astro components over React** — only use `.tsx` when interactivity requires browser APIs or React state.

3. **Use CSS custom properties for colors and spacing**, not raw hex values. Reference `src/styles/theme.css` for the full token list.

4. **Buttons with background colors must have white text** — enforce with `color: white !important` or rely on the global CSS rule in `global.css`.

5. **WooCommerce data may be unavailable** — always handle fetch errors gracefully and provide fallback content. The `programas/[id].astro` pattern is the reference implementation.

6. **No test runner is configured** — validate changes by running `npm run build` and checking for TypeScript errors and build output.

7. **Use `client:only="react"` for D3/map components** — D3 manipulates the DOM directly and must not run during SSR.

8. **Product URL structure**:
   - Diplomados: `/diplomados/{slug}`
   - Cursos: `/cursos/{slug}`
   - Dynamic program pages: `/programas/{slug}`

9. **Old/deprecated pages** are prefixed with `_` (e.g., `_programas-old.astro`) — do not modify these.

10. **The `wordpress-config/` directory** contains reference material for WordPress/WooCommerce configuration. Do not modify these during frontend work.

# EMED Web

Sitio institucional de la Escuela de Mediacion EMED construido con Astro 5, React 19 y contenido proveniente de WordPress/WooCommerce. Este README resume el stack, los comandos y la documentacion esencial para trabajar en el repo.

## Tabla de contenidos
- [Descripcion](#descripcion)
- [Stack](#stack)
- [Requisitos previos](#requisitos-previos)
- [Instalacion rapida](#instalacion-rapida)
- [Configuracion de entorno](#configuracion-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Flujo de datos e integraciones](#flujo-de-datos-e-integraciones)
- [Documentacion complementaria](#documentacion-complementaria)
- [Contribucion](#contribucion)
- [Contacto](#contacto)

## Descripcion
El proyecto entrega paginas informativas, catalogos de diplomados y cursos, testimonios y visualizaciones interactivas (mapa de impacto) optimizadas para SEO y performance. El contenido academico se administra en WordPress/WooCommerce y se consume mediante REST, GraphQL o datasets estaticos.

## Stack
### Frontend
- Astro (SSR/SSG) + React para componentes interactivos
- Tailwind CSS 4 y hojas CSS modulares en `src/styles`
- D3 y Leaflet para visualizaciones geografias

### Datos e integraciones
- WordPress + WooCommerce como CMS headless
- WP REST API y WPGraphQL (`src/lib/wp.ts`)
- Datos estaticos generados desde scripts (`src/data/*.json`)

### Tooling
- Node 18+, npm 9+
- Scripts auxiliares: `extract-data.mjs`, `extract-wordpress-data.js`, `scripts/build_geojson.py`

## Requisitos previos
- Node.js >= 18
- npm >= 9
- Instancia de WordPress/WooCommerce (local o remota)
- Git (opcional pero recomendado)

## Instalacion rapida
```bash
# 1. Clonar
git clone <repo-url>
cd EMED-web

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env
```

## Configuracion de entorno
Definir credenciales WordPress/WooCommerce en `.env`.

| Variable | Descripcion |
|----------|-------------|
| `WP_DOMAIN` | Dominio base del WordPress fuente |
| `WP_API_URL` | Endpoint REST (`https://tu-wp.com/wp-json`) |
| `WP_GRAPHQL_URL` | Endpoint GraphQL (`https://tu-wp.com/graphql`) |
| `WC_KEY` / `WC_SECRET` | Credenciales API para WooCommerce |

## Scripts disponibles
| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Dev server en `http://localhost:4321` |
| `npm run build` | Build de produccion en `dist/` |
| `npm run preview` | Sirve el build generado |
| `npm run astro` | Acceso directo a la CLI de Astro |
| `./deploy.sh` | Ejecuta build y genera paquete `.tar.gz` en `deploys/` |

## Estructura del proyecto
```
EMED-web/
├── src/                 # Codigo de la app (Astro/React)
│   ├── pages/           # Paginas publicas
│   ├── components/      # Layout, secciones, UI y mapas
│   ├── lib/             # Consumidores de APIs y helpers
│   ├── data/            # JSON generados desde WordPress
│   ├── styles/          # CSS modular (base, componentes, theme)
│   ├── layouts/         # Layouts compartidos
│   └── types/           # Tipos TypeScript
├── data/                # GeoJSON/CSV para mapas
├── docs/                # Documentacion estructurada (ver tabla abajo)
├── scripts/             # Herramientas para datos (ej. `build_geojson.py`)
├── public/              # Assets estaticos
├── astro.config.mjs     # Config Astro + React + Tailwind
├── extract-data.mjs     # Script manual contra WooCommerce REST
└── extract-wordpress-data.js # Variante Node/GraphQL
```

## Flujo de datos e integraciones
1. **Extraccion**: `extract-data.mjs` y `extract-wordpress-data.js` descargan productos desde WooCommerce, normalizan campos (`beneficios`, `temario`, `brochure`, etc.) y generan JSON en `src/data/`.
2. **Consumo dinamico**: `src/lib/wp.ts` ofrece funciones (`getProducts`, `getProductsGraphQL`, `getPageInfo`, etc.) con cache in-memory y fallback REST/GraphQL.
3. **Consumo estatico**: `src/lib/productos.ts` lee los JSON locales para ambientes sin WordPress.
4. **Geo data**: `scripts/build_geojson.py` combina CSV/GeoJSON y alimenta los componentes `Mapa*.tsx`.

## Documentacion complementaria
- `docs/README.md` – mapa general de toda la documentacion.
- `docs/00_metodologia/INIT.md` – metodologia Claude + Human.
- `docs/01_pilares/*.md` – docs pilares (Claude Guide, Design System, Estrategia SEO, Plan Desarrollo, Deploy Guide).
- `docs/03_desarrollo/CODEBASE_OVERVIEW.md` – referencia tecnica del codebase (pages, componentes, lib, scripts).
- Reportes con timestamp en `docs/reporte/`.

## Contribucion
1. Crear branch desde `v1`.
2. Seguir la metodologia de `INIT.md` (docs pilares + reporte).
3. Ejecutar `npm run lint`/tests (cuando existan) antes de PR.
4. Documentar cambios en `docs/reporte/` y actualizar los pilares afectados.

## Contacto
- Sitio: [https://www.emed.cl](https://www.emed.cl)
- Email: info@emed.cl

Desarrollado por el equipo EMED + asistentes IA.

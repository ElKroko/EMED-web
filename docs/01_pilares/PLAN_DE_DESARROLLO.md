# PLAN DE DESARROLLO — EMED Web

**Versión:** 1.0
**Última actualización:** 2025-11-19
**Relación:** sincronizar con `docs/05_planes/` y `INIT.md`

---

## Información del Proyecto

- **Objetivo:** Crear sitio web institucional moderno para EMED que genere leads calificados, impulse matrículas en diplomados/cursos, y posicione a la escuela como referente en mediación en Chile
- **Estado actual:** MVP Completado — Sitio estático funcional con 18 páginas generadas
- **Notas rápidas:**
  - ✅ Migración de WordPress/WooCommerce a Astro completada
  - ✅ Sitio 100% estático funcionando con datos JSON
  - ✅ Design system implementado (crema base + celeste/naranja/amarillo)
  - ⏳ Pendiente: Integración dinámica con WordPress
  - ⏳ Pendiente: Backend para formularios de contacto
  - ⏳ Pendiente: Optimización SEO técnico

---

## Historial de Cambios

### 2025-11-19
- **14:00** - Completado DESIGN_SYSTEM.md v1.0 con todos los tokens
- **14:30** - Actualizado PLAN_DE_DESARROLLO.md con roadmap real del proyecto

### 2025-11-18
- **18:55** - Reorganización completa de documentación según metodología INIT.md
- **18:30** - Creación de estructura de carpetas docs/ (00_metodologia, 01_pilares, etc.)

### 2025-11-18 (antes de reorganización)
- Migración WordPress → Astro static
- Extracción de productos a JSON (`productos.json`, `diplomados.json`, `cursos.json`)
- Implementación de páginas core (home, nosotros, admisión, diplomados, cursos, contacto)
- Unificación de heroes con SVG celeste y formas orgánicas
- Incremento de tamaños de fuente en cards home
- Cambio de imágenes (Mediación Escolar, Mediación Laboral)

---

## 1. Roadmap Detallado de Implementación

### Sprint 0 — Setup y Migración ✅ COMPLETADO

**Objetivo:** Migrar de WordPress/WooCommerce a Astro con datos estáticos

**Tareas:**
- [x] Inicializar proyecto Astro 5 con integración React
- [x] Configurar Tailwind CSS 4 con @tailwindcss/vite
- [x] Crear estructura de carpetas (components, pages, styles, data, lib)
- [x] Instalar dependencias (D3, Leaflet, @fontsource-variable/inter)
- [x] Crear `theme.css` con tokens de diseño
- [x] Extraer productos desde WooCommerce a JSON (extract-data.mjs)
- [x] Crear helpers de datos (`src/lib/productos.ts`)
- [x] Setup de Git + .gitignore

**Criterios de Aceptación:**
- ✓ Proyecto Astro funciona con `npm run dev`
- ✓ Tailwind CSS compilando correctamente
- ✓ JSON de productos generados (`productos.json`, `diplomados.json`, `cursos.json`)
- ✓ Tokens CSS cargando globalmente

**Entregables:**
- ✓ Proyecto base Astro 5 + React 19
- ✓ Sistema de tokens CSS completo
- ✓ Datos estáticos en JSON (3 diplomados + 2 cursos)

---

### Sprint 1 — Páginas Core y Componentes Base ✅ COMPLETADO

**Objetivo:** Implementar estructura de páginas principales y componentes reutilizables

**Tareas:**
- [x] Crear Layout base con Header y Footer
- [x] Implementar SiteHeader (navbar celeste sticky)
- [x] Implementar SiteFooter (gradiente + newsletter)
- [x] Página Home con HeroCarousel + ProgramsGrid
- [x] Página Nosotros con historia + equipo
- [x] Página Admisión con modalidades + matriz de programas
- [x] Página Diplomados (listado con filtro por tipo)
- [x] Página Cursos (listado)
- [x] Página Contacto con formulario + FAQs
- [x] Componentes de sección (WaveSection, GradientBridge, PageHero)
- [x] Componentes UI (BenefitCard, ModeCard, CTAButtonsRow)

**Criterios de Aceptación:**
- ✓ Todas las páginas core accesibles y responsive
- ✓ Header sticky funcionando
- ✓ Footer con gradiente y formulario newsletter
- ✓ Navegación entre páginas funcional
- ✓ Cards de programas mostrando datos desde JSON

**Entregables:**
- ✓ 9 páginas principales funcionando
- ✓ 30+ componentes reutilizables creados
- ✓ Sistema de navegación completo

---

### Sprint 2 — Páginas Dinámicas y Detalles ✅ COMPLETADO

**Objetivo:** Implementar páginas de detalle de productos y funcionalidades avanzadas

**Tareas:**
- [x] Página `/diplomados/[slug]` con SSG (getStaticPaths)
- [x] Página `/programas/[slug]` para cursos
- [x] Componente MapaImpacto con Leaflet + D3
- [x] Página `/impacto` con mapa interactivo
- [x] Unificar heroes (SVG celeste con ondas orgánicas)
- [x] Agregar imágenes a cards de programas
- [x] Mejorar indicador de destacado (estrella sin fondo)
- [x] Incrementar tamaños de fuente en home

**Criterios de Aceptación:**
- ✓ Rutas dinámicas generando páginas estáticas correctamente
- ✓ Mapa de impacto renderizando con datos GeoJSON
- ✓ Heros consistentes en todas las páginas
- ✓ Cards con imágenes contextualmente apropiadas
- ✓ Jerarquía visual clara (fuentes más grandes en precio)

**Entregables:**
- ✓ 18 páginas estáticas totales (9 fijas + 9 dinámicas)
- ✓ Mapa interactivo de impacto funcionando
- ✓ Sistema de imágenes implementado

---

### Sprint 3 — Optimización y Ajustes Finales ✅ COMPLETADO

**Objetivo:** Pulir diseño, mejorar legibilidad y preparar para deploy

**Tareas:**
- [x] Homologar estilo de heroes (celeste SVG + ondas)
- [x] Mejorar contraste en página de contacto
- [x] Cambiar imágenes de Mediación Escolar y Laboral
- [x] Ajustar tamaños de fuente para jerarquía visual
- [x] Crear script deploy.sh (build + tar.gz)
- [x] Optimizar imágenes (lazy loading)
- [x] Implementar design tokens consistentes
- [x] Reorganizar documentación según INIT.md

**Criterios de Aceptación:**
- ✓ Todas las páginas con contraste WCAG AA mínimo
- ✓ Fondo crema global consistente
- ✓ Heroes unificados (no más fondos de imagen con overlay negro)
- ✓ Imágenes de programas contextualmente apropiadas
- ✓ Deploy script funcional generando paquete tar.gz
- ✓ Documentación organizada en carpetas temáticas

**Entregables:**
- ✓ Sitio pulido y consistente visualmente
- ✓ Script de deploy automatizado
- ✓ Documentación estructurada (INIT.md, 4 pilares, reportes)

---

### Sprint 4 — Integración Dinámica con WordPress ⏳ PENDIENTE

**Objetivo:** Conectar el sitio con WordPress/WooCommerce para contenido dinámico

**Tareas:**
- [ ] Implementar fetcheo dinámico de productos desde WP REST API
- [ ] Configurar cache in-memory para reducir requests
- [ ] Implementar fallback REST + GraphQL
- [ ] Crear endpoints serverless para formularios
- [ ] Integrar envío de formulario de contacto con backend
- [ ] Implementar newsletter signup con servicio de email
- [ ] Agregar regeneración incremental (ISR) para productos

**Criterios de Aceptación:**
- [ ] Productos se actualizan automáticamente cuando cambian en WordPress
- [ ] Formularios envían datos correctamente
- [ ] Cache funciona (reducción de llamadas a WP)
- [ ] Fallback a JSON si WordPress no disponible

**Entregables:**
- [ ] API routes en Astro para formularios
- [ ] Integración WP REST API + GraphQL funcional
- [ ] Sistema de cache implementado

---

### Sprint 5 — SEO Técnico y Performance ⏳ PENDIENTE

**Objetivo:** Optimizar SEO técnico, performance y Core Web Vitals

**Tareas:**
- [ ] Implementar meta tags dinámicos por página
- [ ] Crear sitemap.xml automatizado
- [ ] Configurar robots.txt
- [ ] Agregar JSON-LD structured data (Organization, Course)
- [ ] Optimizar imágenes (WebP, srcset, blur placeholders)
- [ ] Implementar preload de recursos críticos
- [ ] Configurar headers de cache
- [ ] Alcanzar Lighthouse score > 90 en todas las categorías

**Criterios de Aceptación:**
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse SEO > 95
- [ ] Lighthouse Accessibility > 95
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

**Entregables:**
- [ ] Sitemap y robots.txt
- [ ] Structured data en todas las páginas clave
- [ ] Imágenes optimizadas (WebP + lazy loading)

---

### Sprint 6 — Analytics y Conversión ⏳ PENDIENTE

**Objetivo:** Implementar tracking, analytics y optimización de conversión

**Tareas:**
- [ ] Integrar Google Analytics 4
- [ ] Configurar eventos de conversión (form submit, click CTA, etc.)
- [ ] Implementar Facebook Pixel (si aplica)
- [ ] Configurar Google Tag Manager
- [ ] Crear dashboards de métricas
- [ ] Implementar A/B testing en CTAs principales
- [ ] Optimizar funnels de conversión

**Criterios de Aceptación:**
- [ ] Eventos tracking correctamente en GA4
- [ ] Funnels de conversión configurados
- [ ] Dashboards mostrando métricas clave

**Entregables:**
- [ ] GA4 + GTM implementados
- [ ] Eventos de conversión configurados
- [ ] Dashboards de reporting

---

## Próximos Pasos

### Fase Actual: **Post-MVP — Preparación para Fase Dinámica**

**Objetivo:** Completar documentación y planificar integración WordPress

### Tareas Inmediatas

- [x] Completar DESIGN_SYSTEM.md con todos los tokens
- [x] Completar PLAN_DE_DESARROLLO.md con roadmap detallado
- [ ] Completar CLAUDE_GUIDE.md (llenar TODOs restantes)
- [ ] Completar ESTRATEGIA_SEO.md con keywords y meta descriptions
- [ ] Decidir arquitectura para formularios (Netlify Forms, Formspree, API propia)
- [ ] Planificar migración de datos JSON → WP dinámico

### Checklist Deploy a Producción

- [x] Build funcional (`npm run build`)
- [x] Script deploy.sh generando tar.gz
- [ ] Servidor de hosting configurado
- [ ] Dominio apuntando a servidor
- [ ] SSL/TLS configurado
- [ ] Variables de entorno en producción (.env)
- [ ] Backup de datos JSON
- [ ] Monitoring configurado (uptime, errors)
- [ ] Analytics instalado
- [ ] Formularios conectados a backend

---

## 2. Stack Tecnológico

### Frontend Framework
- **Astro 5.10.1**: Static Site Generator con soporte SSR/SSG
- **React 19.1.0**: Para componentes interactivos (mapas, formularios)
- **TypeScript**: Tipado estático (parcial, principalmente en lib/)

### Estilos
- **Tailwind CSS 4.1.11**: Utility-first con @tailwindcss/vite
- **CSS Modules**: Variables CSS en `src/styles/theme.css`
- **@fontsource-variable/inter**: Tipografía variable weight

### Herramientas de Desarrollo
- **Node.js**: 18+ (recomendado 20 LTS)
- **npm**: 9+ para gestión de paquetes
- **Vite**: Bundler integrado con Astro
- **Git**: Control de versiones

### Optimización
- **Lazy loading**: Imágenes con `loading="lazy"`
- **Tree-shaking**: Automático con Vite
- **CSS Minification**: Automático en build
- **Code Splitting**: Por ruta en Astro

### Integraciones
- **WordPress + WooCommerce**: CMS headless (extracción de datos)
- **WP REST API**: Para productos y contenido
- **WPGraphQL**: Alternativa para queries complejas (futuro)
- **D3.js 7.9.0**: Visualizaciones de datos
- **Leaflet 1.9.4**: Mapas interactivos

### Hosting
- **Target**: Servidor estático (Netlify, Vercel, servidor Apache/Nginx)
- **Build Output**: Carpeta `dist/` con HTML/CSS/JS estáticos
- **Deploy**: Script `deploy.sh` genera `emed-web-[timestamp].tar.gz`

---

## 3. Criterios de Aceptación por Sprint

### Sprint 0
- ✓ Proyecto compila sin errores
- ✓ Tailwind genera CSS correctamente
- ✓ JSON de productos con estructura válida

### Sprint 1
- ✓ Navegación entre páginas funcional
- ✓ Header sticky al scroll
- ✓ Footer con gradient correcto
- ✓ Componentes reutilizables bien separados (UI/Layout/Sections)

### Sprint 2
- ✓ SSG generando 18 páginas estáticas
- ✓ Rutas dinámicas /diplomados/[slug] funcionando
- ✓ Mapa renderiza sin errores de consola
- ✓ Imágenes cargando correctamente

### Sprint 3
- ✓ Contraste WCAG AA en todas las combinaciones
- ✓ Fondo crema consistente en todo el sitio
- ✓ Deploy script genera tar.gz sin errores

### Sprint 4 (futuro)
- [ ] Productos actualizados en < 5min desde edición en WP
- [ ] Formularios envían correctamente (sin errors 500)
- [ ] Cache reduce requests a WP en 80%+

### Sprint 5 (futuro)
- [ ] Lighthouse Performance > 90
- [ ] Sitemap.xml generado correctamente
- [ ] LCP < 2.5s en 75% de pageviews

---

## 4. Checklist de Desarrollo

Antes de cada commit significativo:

- [x] **Documentación actualizada** (pilares si aplica)
- [ ] **Tests ejecutados** (cuando se implementen)
- [x] **Reporte generado** en `docs/reporte/` (para cambios mayores)
- [x] **Build exitoso** (`npm run build` sin errores)
- [x] **Linting** (Astro check + prettier si aplica)
- [x] **Contraste verificado** (herramientas WCAG)
- [x] **Responsive tested** (mobile/tablet/desktop)
- [x] **Git commit con mensaje descriptivo**

---

## 5. Dependencias y Requisitos

### Requisitos de Sistema
- **Node.js**: >= 18.0.0 (recomendado 20 LTS)
- **npm**: >= 9.0.0
- **Git**: Cualquier versión reciente
- **Navegador moderno**: Chrome/Firefox/Safari/Edge últimas 2 versiones

### Dependencias de Producción (package.json)
```json
{
  "@astrojs/react": "^4.3.0",
  "@fontsource-variable/inter": "^5.2.6",
  "@tailwindcss/vite": "^4.1.11",
  "@types/d3": "^7.4.3",
  "astro": "^5.10.1",
  "d3": "^7.9.0",
  "leaflet": "^1.9.4",
  "react": "^19.1.0",
  "tailwindcss": "^4.1.11"
}
```

### Dependencias de Desarrollo
```json
{
  "@types/leaflet": "^1.9.19",
  "@types/react": "^19.1.8"
}
```

### Servicios Externos (Futuros)
- **WordPress/WooCommerce**: Para gestión de productos
- **Email Service**: Para formularios (Resend, SendGrid, etc.)
- **Analytics**: Google Analytics 4
- **CDN**: Cloudflare o similar (opcional)
- **Hosting**: Netlify/Vercel/VPS con Node.js

---

## 6. Métricas de Éxito

### Performance (Lighthouse)
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 90

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Conversión (Objetivos de Negocio)
- **Form Submissions**: > 20/mes (contacto)
- **Newsletter Signups**: > 50/mes
- **Program Page Views**: > 500/mes
- **Bounce Rate**: < 60%
- **Avg. Session Duration**: > 2min

### Estabilidad
- **Uptime**: > 99.5%
- **Build Success Rate**: > 95%
- **Error Rate**: < 1% de requests

---

## 7. Estructura de Componentes

### 7.1 Atoms (UI Básicos)
**Ubicación:** `src/components/ui/`

- **BenefitCard.astro**: Card cuadrada con borde blanco
- **ModeCard.astro**: Card de modalidad con icono
- **CTAButtonsRow.astro**: Fila de botones CTA
- **CalloutBanner.astro**: Banner destacado con CTA
- **DisclaimerText.astro**: Texto legal pequeño

### 7.2 Molecules (Formularios y Secciones Pequeñas)
**Ubicación:** `src/components/forms/` y `src/components/sections/`

- **ContactForm.astro**: Formulario de contacto
- **NewsletterForm.astro**: Signup newsletter
- **PageHero.astro**: Hero interior con título
- **GradientBridge.astro**: Transición de gradiente
- **WaveSection.astro**: Contenedor con ondas SVG
- **HeroSVG.astro / MidHeroSVG.astro**: Fondos SVG orgánicos

### 7.3 Organisms (Secciones Complejas)
**Ubicación:** `src/components/sections/`

- **HeroCarousel.astro / HeroSlider.astro**: Carrusel home
- **ProgramsGrid.astro**: Grid de programas destacados
- **ProgramsAccordion.astro**: Acordeón de programas
- **ProgramMatrix.astro**: Tabla de modalidades
- **ModesGrid.astro**: Grid de modalidades de estudio
- **TwoColumnBlock.astro / TwoColumnIntro.astro**: Layouts 2 columnas
- **WhyStudyMediation.astro**: Sección de beneficios
- **AccreditationBanner.astro**: Banner de acreditaciones
- **YouTubeVideoSection.astro**: Embed de video

### 7.4 Layout
**Ubicación:** `src/components/layout/`

- **Layout.astro**: Wrapper global (HTML + head + body)
- **Header.astro / SiteHeader.astro**: Navbar sticky
- **Footer.astro / SiteFooter.astro**: Footer con gradiente

### 7.5 Interactivos (React)
**Ubicación:** `src/components/`

- **MapaImpacto.astro**: Mapa Leaflet + D3

### 7.6 Árbol por Página

#### Home (/)
```
Layout
├── SiteHeader
├── HeroSlider
│   └── HeroSlide (x3)
├── CTAButtonsRow
├── TwoColumnBlock (Mediación)
│   └── WaveSection
├── WhyStudyMediation
│   └── BenefitCard (x4)
├── ProgramsGrid
│   └── ProgramCard (x6)
├── AccreditationBanner
└── SiteFooter
    └── NewsletterForm
```

#### Diplomados (/diplomados)
```
Layout
├── SiteHeader
├── PageHero (SVG celeste)
├── ProgramsGrid (filtrado tipo=Diplomado)
│   └── ProgramCard (x3)
└── SiteFooter
```

#### Admisión (/admision)
```
Layout
├── SiteHeader
├── PageHero
├── TwoColumnIntro
├── CalloutBanner (Financiamiento)
├── ModesGrid
│   └── ModeCard (x3)
├── ProgramMatrix
└── SiteFooter
```

---

## 8. Convenciones de Código

### Naming
- **Componentes**: PascalCase (`Button.astro`, `ServiceCard.tsx`)
- **Páginas**: kebab-case (`index.astro`, `servicios.astro`)
- **Datos**: kebab-case (`products.json`, `team.json`)
- **Utilidades**: camelCase (`getDiplomados`, `formatPrice`)

### Estructura de Archivos
- **Componentes Astro**: `.astro` extension
- **Componentes React**: `.tsx` extension
- **Estilos**: CSS en `<style>` scoped de Astro o `src/styles/*.css`
- **Datos**: JSON en `src/data/`
- **Tipos**: TypeScript en `src/types/` (opcional)

### Imports
- **Orden**: Astro imports → React imports → Tipos → Datos → Estilos
- **Paths**: Relativos desde el archivo actual

### CSS
- **Preferir**: Tailwind utility classes
- **Variables CSS**: Usar tokens de `theme.css`
- **Scoped styles**: Para casos específicos que no se pueden con Tailwind

### Comentarios
- **HTML/Astro**: `<!-- Comentario -->`
- **JavaScript**: `// Comentario` o `/* Comentario */`
- **CSS**: `/* Comentario */`

---

## 9. Flujo de Git

### Branching Strategy
- **main**: Producción estable (no tocar directamente)
- **v1**: Development branch principal (trabajo actual)
- **feature/[nombre]**: Features nuevas (opcional, para cambios grandes)
- **fix/[nombre]**: Bugfixes (opcional)

### Commits
- **Formato**: `tipo: descripción breve`
- **Tipos**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- **Ejemplos**:
  - `feat: agregar imágenes a cards de programas`
  - `fix: corregir contraste en página de contacto`
  - `docs: actualizar DESIGN_SYSTEM.md con tokens`
  - `style: homologar heroes con SVG celeste`

### Pull Requests (si aplica)
- Crear desde feature branch hacia `v1`
- Incluir descripción detallada
- Referenciar issues si existen

---

## 10. Recursos y Referencias

### Documentos Pilares
- **INIT.md**: Metodología de trabajo Claude + Human
- **CLAUDE_GUIDE.md**: Contexto rápido del proyecto
- **DESIGN_SYSTEM.md**: Tokens y componentes visuales
- **ESTRATEGIA_SEO.md**: Plan SEO por página
- **DEPLOY_GUIDE.md**: Proceso de deploy

### Documentación Técnica
- **docs/03_desarrollo/CODEBASE_OVERVIEW.md**: Explicación de `src/`, datos, scripts
- **docs/03_desarrollo/COMPONENTES.md**: Catálogo de componentes
- **docs/03_desarrollo/CONFIGURACION.md**: Variables de entorno y tooling

### Reportes
- **docs/reporte/**: Todos los cambios timestamped

### Externos
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [D3 Gallery](https://observablehq.com/@d3/gallery)
- [Leaflet Docs](https://leafletjs.com/reference.html)

---

## 11. Próximos Pasos Post-MVP

### Corto Plazo (1-2 meses)
- [ ] Integración dinámica con WordPress REST API
- [ ] Backend para formularios (Netlify Functions, Vercel Edge, etc.)
- [ ] Newsletter signup funcional
- [ ] Google Analytics 4 + Tag Manager
- [ ] Optimización SEO técnico (sitemap, structured data)
- [ ] Deploy a producción en servidor real
- [ ] SSL/TLS configurado
- [ ] Dominio apuntando correctamente

### Mediano Plazo (3-6 meses)
- [ ] Blog de contenido (integrado con WordPress)
- [ ] Sistema de testimonios dinámico
- [ ] Pasarela de pago para inscripciones (integración WooCommerce)
- [ ] Área de estudiantes (login/dashboard)
- [ ] Calendario de eventos
- [ ] Sistema de notificaciones (email automático en inscripción)
- [ ] A/B testing en CTAs principales

### Largo Plazo (6-12 meses)
- [ ] App mobile con React Native (compartir componentes)
- [ ] Sistema de clases online (integración Zoom/Google Meet)
- [ ] Plataforma LMS interna
- [ ] Certificados digitales automatizados
- [ ] Sistema de referidos/afiliados
- [ ] Chatbot de atención (IA)
- [ ] Personalización de contenido por usuario

---

## 12. Notas Finales

### Decisiones Pendientes
- **Backend formularios**: ¿Netlify Forms, Formspree, API propia con Node.js?
- **Email service**: ¿Resend, SendGrid, AWS SES?
- **Hosting producción**: ¿Netlify, Vercel, VPS propio?
- **CMS dinámico**: ¿Mantener WordPress o migrar a Strapi/Sanity?

### Riesgos Identificados
- **Dependencia de WordPress**: Si WordPress cae, sitio estático sigue funcionando pero sin actualizaciones
- **Formularios sin backend**: Actualmente no envían datos reales
- **Sin analytics**: No hay métricas de uso actual
- **Sin tests**: Falta suite de tests automatizados

### Lecciones Aprendidas
- ✅ Astro excelente para sitios contenido-heavy con poca interactividad
- ✅ Tailwind CSS 4 más rápido que v3 gracias a CSS nativo
- ✅ JSON estático funciona bien para MVP (3 diplomados + 2 cursos)
- ✅ SVG para formas orgánicas mejor que imágenes (performance + flexibilidad)
- ⚠️ Integración WordPress requiere más tiempo del estimado
- ⚠️ Design system debe estar completo ANTES de componentes (para evitar refactors)

---

**Última actualización:** 2025-11-19
**Versión:** 1.0
**Mantenido por:** Equipo EMED + Claude AI

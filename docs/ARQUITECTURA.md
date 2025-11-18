# 🏗️ Arquitectura del Proyecto EMED-web

## Tabla de Contenidos
- [Visión General](#visión-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Patrones de Diseño](#patrones-de-diseño)
- [Flujo de Datos](#flujo-de-datos)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Sistema de Componentes](#sistema-de-componentes)
- [Gestión de Estado](#gestión-de-estado)

## Visión General

EMED-web es una aplicación web estática (SSG - Static Site Generation) construida con Astro que funciona como sitio institucional. Utiliza WordPress como CMS headless para la gestión de contenido, específicamente productos/cursos mediante WooCommerce.

### Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENTE (NAVEGADOR)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Sitio Estático (HTML/CSS/JS)              │    │
│  │                                                     │    │
│  │  - Páginas pre-renderizadas (Astro)               │    │
│  │  - Componentes interactivos (React/D3.js)         │    │
│  │  - Estilos (TailwindCSS)                          │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │ Build Time Data Fetch
                            │
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (WordPress)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  WordPress   │  │ WooCommerce  │  │     ACF      │     │
│  │     CMS      │  │  (Productos) │  │ (Campos)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              API Layer                            │      │
│  │  - REST API (wp-json/wc/v3)                      │      │
│  │  - GraphQL (WPGraphQL)                           │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### 🎨 Frontend

#### Astro (Framework Principal)
- **Versión**: 5.10.1
- **Rol**: Framework de sitios estáticos con SSG
- **Beneficios**:
  - Generación de HTML estático ultra-rápido
  - Cero JavaScript por defecto (Islands Architecture)
  - Soporte multi-framework (React, Vue, Svelte, etc.)
  - SEO optimizado out-of-the-box

#### React
- **Versión**: 19.1.0
- **Rol**: Componentes interactivos (mapas, visualizaciones)
- **Uso**: Solo para componentes que requieren interactividad
- **Directiva**: `client:only="react"` o `client:load`

#### TailwindCSS
- **Versión**: 4.1.11
- **Rol**: Framework de utilidades CSS
- **Configuración**: Via Vite plugin
- **Personalización**: Variables CSS en `src/styles/theme.css`

#### TypeScript
- **Rol**: Tipado estático
- **Configuración**: `tsconfig.json`
- **Tipos**: Definidos en `src/types/`

### 📊 Visualización de Datos

#### D3.js
- **Versión**: 7.9.0
- **Uso**: Mapas interactivos de Chile, gráficos
- **Componentes**: `MapaChileGeoJSON.tsx`, `MapaD3.tsx`

#### Leaflet
- **Versión**: 1.9.4
- **Uso**: Mapas geográficos alternativos
- **Integración**: Via React components

### 🔌 Backend/API

#### WordPress (Headless CMS)
- **Rol**: Gestión de contenido
- **API**: REST API + GraphQL
- **Endpoints**:
  - Posts: `/wp-json/wp/v2/posts`
  - Pages: `/wp-json/wp/v2/pages`

#### WooCommerce
- **Rol**: Gestión de productos/cursos
- **API**: WooCommerce REST API v3
- **Endpoints**:
  - Products: `/wp-json/wc/v3/products`
- **Autenticación**: Consumer Key + Secret

#### WPGraphQL
- **Rol**: Queries GraphQL optimizadas
- **Beneficios**: Mejor performance, queries específicas
- **Fallback**: Si GraphQL falla, usa REST API

### 🎨 Diseño

#### Tipografía
- **Fuente**: Inter Variable Font
- **Implementación**: `@fontsource-variable/inter`
- **Características**: Variable font con weight dinámico

#### Sistema de Colores
Definido en `src/styles/theme.css`:
- Azul institucional (`--color-azul`)
- Naranjo corporativo (`--color-naranjo`)
- Colores auxiliares (crema, beige, gris)
- Gradientes personalizados

## Patrones de Diseño

### 1. Component-Driven Architecture

Separación clara de componentes por responsabilidad:

```
components/
├── ui/           # Componentes atómicos reutilizables
├── sections/     # Secciones completas de página
├── layout/       # Estructura de la aplicación
└── forms/        # Formularios específicos
```

### 2. Islands Architecture (Astro)

- **Concepto**: Solo los componentes interactivos cargan JavaScript
- **Implementación**: Directivas `client:*`
- **Beneficio**: Performance óptima

Ejemplo:
```astro
<!-- Solo carga JS si es necesario -->
<MapaChileGeoJSON client:only="react" />

<!-- Componente estático (sin JS) -->
<HeroSlider slides={data} />
```

### 3. Headless CMS Pattern

- **WordPress**: Backend (solo gestión de contenido)
- **Astro**: Frontend (presentación)
- **API**: Capa de comunicación (REST/GraphQL)

### 4. Static Site Generation (SSG)

- **Build Time**: Datos se obtienen durante el build
- **Output**: Archivos HTML estáticos
- **Ventajas**:
  - Velocidad de carga extrema
  - SEO optimizado
  - Seguridad (no hay backend expuesto)
  - Hosting económico

### 5. API Gateway Pattern

El archivo `src/lib/wp.ts` actúa como gateway:
- Abstrae la complejidad de las APIs
- Maneja autenticación
- Implementa fallbacks (GraphQL → REST)
- Cache de respuestas

## Flujo de Datos

### 1. Build Time (Generación del Sitio)

```
┌─────────────────────────────────────────────────────────┐
│  1. npm run build                                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. Astro procesa páginas                                │
│     - Lee archivos .astro                                │
│     - Ejecuta código del frontmatter (---)              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. Fetch de datos (src/lib/wp.ts)                      │
│     a. Intenta GraphQL                                   │
│     b. Si falla, usa REST API                           │
│     c. Cachea respuestas                                │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. Renderiza componentes                                │
│     - Componentes Astro → HTML estático                 │
│     - Componentes React → JS solo si necesario          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  5. Output en /dist                                      │
│     - index.html, /programas/index.html, etc.           │
│     - CSS optimizado y minificado                       │
│     - JS mínimo (solo componentes interactivos)         │
└─────────────────────────────────────────────────────────┘
```

### 2. Runtime (Navegador)

```
Usuario visita la página
         ↓
HTML estático se carga (instantáneo)
         ↓
CSS se aplica (estilos visibles)
         ↓
[OPCIONAL] JS de componentes interactivos se carga
         ↓
Componentes React se hidratan (mapas, carruseles)
         ↓
Sitio completamente interactivo
```

## Estructura de Carpetas

### Organización por Capas

```
src/
├── pages/           # Routing (filesystem-based)
├── layouts/         # Templates de página
├── components/      # UI Components
├── lib/             # Lógica de negocio y utilidades
├── types/           # Definiciones TypeScript
├── styles/          # Estilos globales y temas
└── assets/          # Recursos estáticos
```

### Principios de Organización

1. **Colocation**: Archivos relacionados juntos
2. **Separación de responsabilidades**: UI, lógica, tipos
3. **Escalabilidad**: Fácil agregar nuevas features
4. **Mantenibilidad**: Código fácil de encontrar

## Sistema de Componentes

### Jerarquía de Componentes

```
Layout (wrapper principal)
  ├── SiteHeader (navegación)
  ├── Main (contenido)
  │   ├── Section Components
  │   │   ├── HeroSlider
  │   │   ├── ProgramsGrid
  │   │   └── TwoColumnBlock
  │   └── UI Components
  │       ├── Button
  │       ├── Card
  │       └── Form
  └── SiteFooter (pie de página)
```

### Tipos de Componentes

#### 1. **Layout Components** (`src/components/layout/`)
- `Layout.astro`: Template HTML base
- `SiteHeader.astro`: Navegación principal
- `SiteFooter.astro`: Pie de página

#### 2. **Section Components** (`src/components/sections/`)
Bloques completos de contenido:
- `HeroSlider.astro`: Carrusel hero
- `ProgramsGrid.astro`: Grid de programas
- `TwoColumnBlock.astro`: Sección de 2 columnas

#### 3. **UI Components** (`src/components/ui/`)
Componentes reutilizables básicos:
- `CTAButtonsRow.astro`: Fila de botones CTA
- `BenefitCard.astro`: Tarjeta de beneficio
- `ModeCard.astro`: Tarjeta de modalidad

#### 4. **Form Components** (`src/components/forms/`)
- `ContactForm.astro`: Formulario de contacto
- `NewsletterForm.astro`: Suscripción newsletter

#### 5. **Interactive Components** (React)
Componentes con estado e interactividad:
- `MapaChileGeoJSON.tsx`: Mapa de Chile interactivo
- `MapaD3.tsx`: Visualizaciones D3.js

### Convenciones de Componentes

#### Componente Astro
```astro
---
// Importaciones
import Layout from '../layouts/Layout.astro';

// Props interface
export interface Props {
  title: string;
  items?: string[];
}

// Props destructuring
const { title, items = [] } = Astro.props;

// Lógica del componente
const processedItems = items.map(item => item.toUpperCase());
---

<!-- Template -->
<div class="component">
  <h2>{title}</h2>
  <ul>
    {processedItems.map(item => (
      <li>{item}</li>
    ))}
  </ul>
</div>

<style>
  /* Estilos scoped (opcional) */
  .component {
    padding: 1rem;
  }
</style>
```

#### Componente React
```tsx
import React from 'react';

interface Props {
  data: any[];
  onSelect?: (item: any) => void;
}

export default function InteractiveComponent({ data, onSelect }: Props) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div>
      {data.map(item => (
        <button onClick={() => onSelect?.(item)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
```

## Gestión de Estado

### Estado en Astro (Build Time)

- **Props**: Pasados de padres a hijos
- **Frontmatter**: Variables locales del componente
- **Sin estado global**: No necesario (SSG)

### Estado en React (Runtime)

- **useState**: Estado local del componente
- **No hay state management global**: Componentes aislados
- **Props drilling**: Para pasar datos entre componentes

### Datos del CMS

- **Fetch en build time**: `src/lib/wp.ts`
- **Cache local**: Map en memoria (5 min TTL)
- **No hay estado dinámico**: Datos estáticos post-build

## Optimizaciones

### Performance

1. **Código mínimo**: Solo JS necesario se envía
2. **HTML estático**: Carga ultra-rápida
3. **CSS optimizado**: TailwindCSS tree-shaking
4. **Imágenes**: Optimización automática de Astro
5. **Lazy loading**: Componentes interactivos con `client:visible`

### SEO

1. **Meta tags**: Configurados en Layout
2. **URLs limpias**: Routing basado en archivos
3. **Sitemap**: Generación automática
4. **Semantic HTML**: Estructura correcta

### Caching

1. **API responses**: Cache en memoria (build time)
2. **Static assets**: Cache en navegador
3. **CDN ready**: Archivos estáticos optimizados

## Escalabilidad

### Agregar Nueva Feature

1. Crear componente en carpeta apropiada
2. Definir tipos en `src/types/`
3. Agregar lógica en `src/lib/` si necesario
4. Usar en página correspondiente

### Performance con Crecimiento

- **Build time**: Puede aumentar con más páginas
- **Runtime**: Siempre rápido (static)
- **Solución**: Considerar ISR (Incremental Static Regeneration) si crece mucho

### Mantenibilidad

- Separación clara de responsabilidades
- Tipos TypeScript para prevenir errores
- Documentación inline en código
- Estructura predecible y consistente

---

**Última actualización**: Octubre 2025

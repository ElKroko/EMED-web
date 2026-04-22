# 👨‍💻 Guía de Desarrollo - EMED-web

## Tabla de Contenidos
- [Workflow de Desarrollo](#workflow-de-desarrollo)
- [Convenciones de Código](#convenciones-de-código)
- [Crear Nuevas Páginas](#crear-nuevas-páginas)
- [Crear Nuevos Componentes](#crear-nuevos-componentes)
- [Trabajar con la API](#trabajar-con-la-api)
- [Testing y Debugging](#testing-y-debugging)
- [Git Workflow](#git-workflow)
- [Mejores Prácticas](#mejores-prácticas)

## Workflow de Desarrollo

### 1. Setup Inicial

```bash
# Clonar el repositorio
git clone <repository-url>
cd EMED-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Entorno de Desarrollo

```bash
# Servidor de desarrollo (Hot reload)
npm run dev
# → http://localhost:4321

# Build de producción
npm run build

# Preview del build
npm run preview

# Comandos Astro
npm run astro -- --help
```

### 3. Estructura de Trabajo

```
1. Crear rama feature
2. Desarrollar funcionalidad
3. Probar localmente
4. Commit y push
5. Pull Request
6. Code review
7. Merge a main
8. Deploy automático
```

## Convenciones de Código

### Nombres de Archivos

```
✅ Correcto:
- PascalCase para componentes: UserCard.astro, HeroSlider.tsx
- kebab-case para páginas: mediacion-familiar.astro
- camelCase para utilities: getProducts.ts

❌ Incorrecto:
- usercard.astro, hero_slider.tsx
- MediacionFamiliar.astro
- get-products.ts
```

### Estructura de Componentes Astro

```astro
---
// 1. Imports
import Layout from '../layouts/Layout.astro';
import Component from '../components/Component.astro';

// 2. Props Interface
export interface Props {
  title: string;
  items?: string[];
}

// 3. Props Destructuring
const { title, items = [] } = Astro.props;

// 4. Data Fetching
const data = await fetchData();

// 5. Logic
const processedData = data.map(item => ({
  ...item,
  slug: item.name.toLowerCase()
}));
---

<!-- 6. Template -->
<Layout>
  <h1>{title}</h1>
  <ul>
    {processedData.map(item => (
      <li>{item.name}</li>
    ))}
  </ul>
</Layout>

<!-- 7. Styles (opcional) -->
<style>
  h1 {
    color: var(--color-naranja);
  }
</style>
```

### Estructura de Componentes React

```typescript
// 1. Imports
import React from 'react';

// 2. Interfaces
interface Props {
  data: Array<{
    id: number;
    name: string;
  }>;
  onSelect?: (id: number) => void;
}

// 3. Component
export default function MyComponent({ data, onSelect }: Props) {
  // 4. State
  const [selected, setSelected] = React.useState<number | null>(null);

  // 5. Handlers
  const handleClick = (id: number) => {
    setSelected(id);
    onSelect?.(id);
  };

  // 6. Render
  return (
    <div className="my-component">
      {data.map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={selected === item.id ? 'active' : ''}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
```

### Estilos

```css
/* Prioridad de uso: */

/* 1. Tailwind (preferido para layout/spacing) */
<div class="flex items-center gap-4 p-8">

/* 2. Variables CSS (para valores del tema) */
<div style="background: var(--gradient-naranja-amarillo);">

/* 3. CSS Scoped (para estilos específicos del componente) */
<style>
  .component-specific {
    /* estilos aquí */
  }
</style>

/* 4. Global CSS (solo para estilos verdaderamente globales) */
/* En src/styles/global.css */
```

## Crear Nuevas Páginas

### Página Estática Simple

```bash
# Crear archivo
touch src/pages/mi-nueva-pagina.astro
```

```astro
---
import Layout from '../layouts/Layout.astro';
import PageHero from '../components/sections/PageHero.astro';
---

<Layout
  title="Mi Nueva Página - EMED"
  description="Descripción de la página"
>
  <PageHero
    title="Mi Nueva Página"
    subtitle="Subtítulo opcional"
  />

  <section class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-8">Contenido</h2>
      <p>Contenido de la página...</p>
    </div>
  </section>
</Layout>
```

**URL resultante**: `/mi-nueva-pagina`

### Página Dinámica (con datos de API)

```bash
# Crear archivo
touch src/pages/programas/[slug].astro
```

```astro
---
import Layout from '../../layouts/Layout.astro';
import { getEmedProducts, getEmedProductBySlug } from '../../lib/wp';

// Generar rutas estáticas
export async function getStaticPaths() {
  const products = await getEmedProducts();

  return products.map(product => ({
    params: { slug: product.slug },
    props: { product }
  }));
}

// Props del componente
const { product } = Astro.props;
---

<Layout
  title={`${product.name} - EMED`}
  description={product.short_description}
>
  <h1>{product.name}</h1>
  <p>{product.description}</p>

  <!-- Más contenido -->
</Layout>
```

**URLs resultantes**: `/programas/mediacion-familiar`, `/programas/mediacion-escolar`, etc.

### Página con Subdirectorios

```bash
mkdir -p src/pages/diplomados
touch src/pages/diplomados/index.astro
touch src/pages/diplomados/mediacion-familiar.astro
```

**URLs**:
- `/diplomados/` → `index.astro`
- `/diplomados/mediacion-familiar` → `mediacion-familiar.astro`

## Crear Nuevos Componentes

### Componente UI (Astro)

```bash
touch src/components/ui/Button.astro
```

```astro
---
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  type?: 'button' | 'submit';
  class?: string;
}

const {
  variant = 'primary',
  href,
  type = 'button',
  class: className = ''
} = Astro.props;

const variantClasses = {
  primary: 'bg-gradient-naranja-amarillo text-white',
  secondary: 'bg-celeste text-white',
  outline: 'border-2 border-naranja text-naranja hover:bg-naranja hover:text-white'
};

const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all';
const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
---

{href ? (
  <a href={href} class={classes}>
    <slot />
  </a>
) : (
  <button type={type} class={classes}>
    <slot />
  </button>
)}
```

**Uso**:
```astro
<Button variant="primary" href="/contacto">
  Contáctanos
</Button>
```

### Componente Section (Astro)

```bash
touch src/components/sections/FeatureGrid.astro
```

```astro
---
import FeatureCard from '../ui/FeatureCard.astro';

export interface Props {
  title: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const { title, features } = Astro.props;
---

<section class="py-20 bg-crema">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">
      {title}
    </h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map(feature => (
        <FeatureCard
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  </div>
</section>
```

### Componente Interactivo (React)

```bash
touch src/components/InteractiveMap.tsx
```

```typescript
import React, { useState } from 'react';

interface Region {
  id: string;
  name: string;
  value: number;
}

interface Props {
  regions: Region[];
  className?: string;
}

export default function InteractiveMap({ regions, className = '' }: Props) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId === selectedRegion ? null : regionId);
  };

  return (
    <div className={`interactive-map ${className}`}>
      <div className="map-container">
        {regions.map(region => (
          <div
            key={region.id}
            className={`region ${selectedRegion === region.id ? 'selected' : ''}`}
            onClick={() => handleRegionClick(region.id)}
          >
            {region.name}: {region.value}
          </div>
        ))}
      </div>

      {selectedRegion && (
        <div className="region-info">
          {/* Info de región seleccionada */}
        </div>
      )}
    </div>
  );
}
```

**Uso en Astro**:
```astro
---
import InteractiveMap from '../components/InteractiveMap.tsx';

const regions = [
  { id: 'rm', name: 'Región Metropolitana', value: 150 },
  // ...
];
---

<InteractiveMap
  client:visible
  regions={regions}
  className="w-full max-w-4xl mx-auto"
/>
```

## Trabajar con la API

### Fetch de Datos en Build Time

```astro
---
import { getEmedProducts } from '../lib/wp';

// Datos se obtienen una vez durante el build
const products = await getEmedProducts({
  per_page: 10,
  featured: true
});
---

<div class="products-grid">
  {products.map(product => (
    <div class="product-card">
      <h3>{product.name}</h3>
      <p>{product.precio_formateado}</p>
    </div>
  ))}
</div>
```

### Crear Nueva Función de API

```typescript
// En src/lib/wp.ts

/**
 * Obtener cursos por categoría
 */
export const getCoursesByCategory = async (
  categorySlug: string
): Promise<EmedProductsResponse> => {
  try {
    const products = await getEmedProducts({
      category: categorySlug,
      per_page: 100
    });

    return products.filter(p => p.tipo === 'Curso');
  } catch (error) {
    console.error(`Error fetching courses for ${categorySlug}:`, error);
    return [];
  }
};
```

### Manejo de Errores

```astro
---
import { getEmedProducts } from '../lib/wp';

let products = [];
let error = null;

try {
  products = await getEmedProducts();
} catch (e) {
  error = e.message;
  console.error('Error loading products:', e);
}
---

{error ? (
  <div class="error-message">
    <p>Error al cargar productos: {error}</p>
    <p>Por favor, intenta de nuevo más tarde.</p>
  </div>
) : (
  <div class="products-grid">
    {products.map(product => (
      <ProductCard product={product} />
    ))}
  </div>
)}
```

## Testing y Debugging

### Debug en Desarrollo

```astro
---
const data = await fetchData();

// Console logs (visible en terminal del servidor)
console.log('Data fetched:', data);

// Debug en el navegador
if (import.meta.env.DEV) {
  console.log('Development mode - Data:', data);
}
---

<!-- Debug visual en desarrollo -->
{import.meta.env.DEV && (
  <pre>{JSON.stringify(data, null, 2)}</pre>
)}
```

### Verificar Build

```bash
# Build y verificar errores
npm run build

# Preview del build
npm run preview

# Verificar en diferentes navegadores
# Chrome, Firefox, Safari, Edge
```

### Testing de Componentes React

```bash
# Instalar testing library (opcional)
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

```typescript
// MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent data={[]} />);
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });
});
```

### Performance Debugging

```bash
# Lighthouse (Chrome DevTools)
# 1. Build del proyecto
npm run build
npm run preview

# 2. Abrir Chrome DevTools
# 3. Lighthouse tab → Generate report

# Analizar bundle size
npm run build -- --analyze
```

## Git Workflow

### Branches

```bash
# Crear feature branch
git checkout -b feature/nueva-funcionalidad

# Crear fix branch
git checkout -b fix/corregir-bug

# Crear hotfix (urgente en producción)
git checkout -b hotfix/error-critico
```

### Commits

**Convención**:
```
tipo(scope): descripción breve

Descripción detallada (opcional)

Refs: #123
```

**Tipos**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Estilos (no afecta lógica)
- `refactor`: Refactorización
- `perf`: Mejora de performance
- `test`: Tests
- `chore`: Tareas de mantenimiento

**Ejemplos**:
```bash
git commit -m "feat(programs): agregar filtro por modalidad"
git commit -m "fix(api): corregir fetch de productos destacados"
git commit -m "docs(readme): actualizar instrucciones de instalación"
git commit -m "style(components): mejorar espaciado en cards"
```

### Pull Requests

**Template**:
```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Nueva funcionalidad
- [ ] Corrección de bug
- [ ] Mejora de performance
- [ ] Refactorización
- [ ] Documentación

## Testing
- [ ] Probado localmente
- [ ] Probado en build de producción
- [ ] Tests agregados/actualizados

## Screenshots (si aplica)
![screenshot](url)

## Checklist
- [ ] Código sigue las convenciones del proyecto
- [ ] Comentarios agregados donde es necesario
- [ ] Documentación actualizada
- [ ] Sin warnings de build
```

## Mejores Prácticas

### Performance

1. **Lazy loading de componentes pesados**:
```astro
<MapaChileGeoJSON client:visible />
```

2. **Optimizar imágenes**:
```astro
<Image
  src={image}
  alt="Description"
  width={800}
  height={600}
  format="webp"
  quality={80}
/>
```

3. **Code splitting automático** (Astro lo hace por defecto)

### Accesibilidad

1. **Siempre incluir alt en imágenes**:
```astro
<img src="..." alt="Descripción significativa" />
```

2. **Jerarquía de headings correcta**:
```astro
<h1>Título principal</h1>
  <h2>Sección</h2>
    <h3>Subsección</h3>
```

3. **Labels en formularios**:
```astro
<label for="email">Email:</label>
<input id="email" type="email" name="email" />
```

4. **Contraste de colores adecuado** (mínimo 4.5:1)

### SEO

1. **Meta tags en cada página**:
```astro
<Layout
  title="Título específico de la página"
  description="Descripción única y descriptiva"
>
```

2. **URLs amigables**:
```
✅ /diplomados/mediacion-familiar
❌ /programa?id=123&type=diplomado
```

3. **Headings semánticos**:
```astro
<h1>Solo uno por página (título principal)</h1>
<h2>Secciones principales</h2>
<h3>Subsecciones</h3>
```

### Seguridad

1. **No exponer API keys en frontend**
2. **Sanitizar contenido HTML de WordPress**:
```astro
<div set:html={sanitizeHTML(product.description)} />
```

3. **HTTPS en producción siempre**

### Código Limpio

1. **DRY (Don't Repeat Yourself)**:
```astro
<!-- ❌ Malo -->
<div class="px-6 py-3 rounded-lg bg-naranja text-white">Botón 1</div>
<div class="px-6 py-3 rounded-lg bg-naranja text-white">Botón 2</div>

<!-- ✅ Bueno -->
<Button variant="primary">Botón 1</Button>
<Button variant="primary">Botón 2</Button>
```

2. **Nombres descriptivos**:
```typescript
// ❌ Malo
const d = await getData();
const x = d.filter(i => i.t === 'D');

// ✅ Bueno
const products = await getEmedProducts();
const diplomados = products.filter(p => p.tipo === 'Diplomado');
```

3. **Comentarios significativos**:
```typescript
// ❌ Malo
// Loop products
products.forEach(...)

// ✅ Bueno
// Filter out unpublished products and sort by date
const publishedProducts = products
  .filter(p => p.status === 'publish')
  .sort((a, b) => new Date(b.date) - new Date(a.date));
```

---

**Última actualización**: Octubre 2025

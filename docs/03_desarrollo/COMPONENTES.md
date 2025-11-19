# 🧩 Catálogo de Componentes - EMED-web

## Tabla de Contenidos
- [Componentes de Layout](#componentes-de-layout)
- [Componentes de Secciones](#componentes-de-secciones)
- [Componentes UI](#componentes-ui)
- [Componentes de Formularios](#componentes-de-formularios)
- [Componentes Interactivos (React)](#componentes-interactivos-react)
- [Guía de Uso](#guía-de-uso)

## Componentes de Layout

### `Layout.astro`
**Ubicación**: `src/layouts/Layout.astro`

Template principal del sitio que envuelve todas las páginas.

**Props**:
```typescript
interface Props {
  title?: string;
  description?: string;
}
```

**Uso**:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Título de la Página"
  description="Descripción para SEO"
>
  <!-- Contenido de la página -->
</Layout>
```

**Características**:
- Meta tags SEO
- Open Graph tags
- Importación de fuentes (Inter Variable)
- Estilos globales
- Header y Footer automáticos

---

### `SiteHeader.astro`
**Ubicación**: `src/components/layout/SiteHeader.astro`

Navegación principal del sitio.

**Características**:
- Logo EMED
- Menú de navegación
- Responsive (hamburger menu en móvil)
- Active state en página actual

**Estructura**:
```astro
<header>
  <nav>
    <a href="/">Logo</a>
    <ul>
      <li><a href="/nosotros">Nosotros</a></li>
      <li><a href="/programas">Programas</a></li>
      <li><a href="/diplomados">Diplomados</a></li>
      <li><a href="/cursos">Cursos</a></li>
      <li><a href="/admision">Admisión</a></li>
      <li><a href="/contacto">Contacto</a></li>
    </ul>
  </nav>
</header>
```

---

### `SiteFooter.astro`
**Ubicación**: `src/components/layout/SiteFooter.astro`

Pie de página con información institucional.

**Secciones**:
- Información de contacto
- Enlaces rápidos
- Redes sociales
- Copyright

## Componentes de Secciones

### `HeroSlider.astro`
**Ubicación**: `src/components/sections/HeroSlider.astro`

Carrusel hero con imágenes y texto destacado.

**Props**:
```typescript
interface Props {
  slides: Array<{
    img: string;
    heading: string;
    sub: string;
    ctaText: string;
    ctaLink: string;
  }>;
  autoplay?: boolean;
  autoplayDelay?: number; // en ms
}
```

**Uso**:
```astro
---
const heroSlides = [
  {
    img: "https://example.com/image.jpg",
    heading: "FORMANDO MEDIADORES",
    sub: "DESDE 2005",
    ctaText: "Conoce nuestros programas",
    ctaLink: "/programas"
  }
];
---

<HeroSlider
  slides={heroSlides}
  autoplay={true}
  autoplayDelay={6000}
/>
```

**Características**:
- Autoplay configurable
- Navegación con dots
- Transiciones suaves
- Responsive

---

### `ProgramsGrid.astro`
**Ubicación**: `src/components/sections/ProgramsGrid.astro`

Grid de programas disponibles.

**Características**:
- Obtiene datos de WooCommerce automáticamente
- Muestra programas destacados
- Grid responsive (1/2/3 columnas)
- Tarjetas con imagen, título, descripción

**Uso**:
```astro
<ProgramsGrid />
```

**Datos internos**:
```typescript
// Obtiene productos automáticamente
const programs = await getEmedProducts({
  featured: true,
  per_page: 6
});
```

---

### `TwoColumnBlock.astro`
**Ubicación**: `src/components/sections/TwoColumnBlock.astro`

Sección de dos columnas para contenido.

**Props**:
```typescript
interface Props {
  heading?: string;
  content: string; // HTML permitido
  reverse?: boolean; // Invierte orden en móvil
}
```

**Uso**:
```astro
<TwoColumnBlock
  heading="¿Qué es la Mediación?"
  content={`<p>La mediación es...</p>`}
  reverse={false}
/>
```

---

### `TwoColumnBlockWithVideo.astro`
**Ubicación**: `src/components/sections/TwoColumnBlockWithVideo.astro`

Sección de dos columnas con video embebido.

**Props**:
```typescript
interface Props {
  videoId: string; // YouTube video ID
  heading?: string;
  content: string;
  reverse?: boolean;
  youtubeChannelUrl?: string;
}
```

**Uso**:
```astro
<TwoColumnBlockWithVideo
  videoId="dQw4w9WgXcQ"
  heading="Video Institucional"
  content={`<p>Conoce más sobre EMED</p>`}
  youtubeChannelUrl="https://youtube.com/@emediacion"
/>
```

---

### `WhyStudyMediation.astro`
**Ubicación**: `src/components/sections/WhyStudyMediation.astro`

Sección de beneficios de estudiar mediación.

**Props**:
```typescript
interface Props {
  showMidHeroSVG?: boolean;
  midHeroSVGColor1?: string;
  midHeroSVGColor2?: string;
}
```

**Uso**:
```astro
<WhyStudyMediation
  showMidHeroSVG={true}
  midHeroSVGColor1="#F7C97B"
  midHeroSVGColor2="#EE800C"
/>
```

**Características**:
- Grid de tarjetas de beneficios
- Iconos ilustrativos
- Fondo SVG decorativo opcional

---

### `AccreditationBanner.astro`
**Ubicación**: `src/components/sections/AccreditationBanner.astro`

Banner de acreditaciones y certificaciones.

**Props**:
```typescript
interface Props {
  mascotSrc?: string; // Ruta a imagen mascota/sello
}
```

**Uso**:
```astro
<AccreditationBanner
  mascotSrc="/assets/images/emed_acreditado.png"
/>
```

---

### `ModesGrid.astro`
**Ubicación**: `src/components/sections/ModesGrid.astro`

Grid de modalidades de estudio.

**Uso**:
```astro
<ModesGrid />
```

**Características**:
- Muestra modalidades: Presencial, Online, Mixto
- Tarjetas con iconos
- Descripción de cada modalidad

---

### `PageHero.astro`
**Ubicación**: `src/components/sections/PageHero.astro`

Hero simple para páginas internas.

**Props**:
```typescript
interface Props {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}
```

**Uso**:
```astro
<PageHero
  title="Nosotros"
  subtitle="Más de 20 años formando mediadores"
  backgroundImage="/images/hero-nosotros.jpg"
/>
```

## Componentes UI

### `CTAButtonsRow.astro`
**Ubicación**: `src/components/ui/CTAButtonsRow.astro`

Fila de botones CTA destacados.

**Props**:
```typescript
interface Props {
  items: Array<{
    label: string;
    href: string;
    icon?: string; // Emoji o HTML
  }>;
  useSVGBackground?: boolean;
}
```

**Uso**:
```astro
<CTAButtonsRow
  useSVGBackground={false}
  items={[
    { label: "+20 años de experiencia", href: "/nosotros", icon: "📅" },
    { label: "+6000 mediadores formados", href: "/programas", icon: "👥" }
  ]}
/>
```

---

### `BenefitCard.astro`
**Ubicación**: `src/components/ui/BenefitCard.astro`

Tarjeta de beneficio/característica.

**Props**:
```typescript
interface Props {
  icon: string; // Emoji o HTML
  title: string;
  description: string;
}
```

**Uso**:
```astro
<BenefitCard
  icon="🎓"
  title="Certificación Reconocida"
  description="Certificado con validez nacional"
/>
```

---

### `ModeCard.astro`
**Ubicación**: `src/components/ui/ModeCard.astro`

Tarjeta de modalidad de estudio.

**Props**:
```typescript
interface Props {
  mode: 'Presencial' | 'Online' | 'Mixto';
  title: string;
  description: string;
  icon?: string;
}
```

**Uso**:
```astro
<ModeCard
  mode="Online"
  title="Clases en Vivo"
  description="Participa desde cualquier lugar"
  icon="💻"
/>
```

---

### `CalloutBanner.astro`
**Ubicación**: `src/components/ui/CalloutBanner.astro`

Banner de llamada a la acción destacado.

**Props**:
```typescript
interface Props {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: 'primary' | 'secondary';
}
```

**Uso**:
```astro
<CalloutBanner
  title="¿Listo para ser mediador?"
  subtitle="Inscríbete ahora en nuestros programas"
  ctaText="Ver admisión"
  ctaLink="/admision"
  variant="primary"
/>
```

## Componentes de Formularios

### `ContactForm.astro`
**Ubicación**: `src/components/forms/ContactForm.astro`

Formulario de contacto.

**Campos**:
- Nombre
- Email
- Teléfono
- Mensaje
- Programa de interés (select)

**Uso**:
```astro
<ContactForm />
```

**Características**:
- Validación HTML5
- Estilos consistentes
- Responsive

---

### `NewsletterForm.astro`
**Ubicación**: `src/components/forms/NewsletterForm.astro`

Formulario de suscripción a newsletter.

**Campos**:
- Email

**Uso**:
```astro
<NewsletterForm />
```

## Componentes Interactivos (React)

### `MapaChileGeoJSON.tsx`
**Ubicación**: `src/components/MapaChileGeoJSON.tsx`

Mapa interactivo de Chile con datos regionales.

**Props**:
```typescript
interface Props {
  title?: string;
  height?: string; // CSS height
  className?: string;
}
```

**Uso**:
```astro
<MapaChileGeoJSON
  client:only="react"
  title="Nuestro Impacto Regional"
  height="800px"
  className="w-full max-w-7xl mx-auto"
/>
```

**Características**:
- Visualización D3.js
- Datos de GeoJSON
- Tooltip con información regional
- Zoom y pan
- Colores según datos

**Datos**:
- Archivo GeoJSON: `public/data/chile_regiones_emed_simplified.geojson`
- Datos CSV: `public/data/datos_regionales_emed.csv`

---

### `MapaD3.tsx`
**Ubicación**: `src/components/MapaD3.tsx`

Mapa D3.js base (versión simplificada).

**Props**:
```typescript
interface Props {
  width?: number;
  height?: number;
}
```

**Uso**:
```astro
<MapaD3
  client:load
  width={800}
  height={600}
/>
```

---

### `MapaImpacto.tsx`
**Ubicación**: `src/components/MapaImpacto.tsx`

Mapa de impacto con estadísticas.

**Props**:
```typescript
interface Props {
  data?: any[]; // Datos personalizados
  interactive?: boolean;
}
```

**Uso**:
```astro
<MapaImpacto
  client:visible
  interactive={true}
/>
```

## Guía de Uso

### Crear un Nuevo Componente Astro

1. **Crear archivo** en la carpeta apropiada:
```bash
# UI component
touch src/components/ui/MiComponente.astro

# Section component
touch src/components/sections/MiSeccion.astro
```

2. **Definir estructura**:
```astro
---
// Props interface
export interface Props {
  title: string;
  items?: string[];
}

// Destructure props
const { title, items = [] } = Astro.props;
---

<!-- Template -->
<div class="mi-componente">
  <h2>{title}</h2>
  <ul>
    {items.map(item => (
      <li>{item}</li>
    ))}
  </ul>
</div>

<!-- Estilos scoped (opcional) -->
<style>
  .mi-componente {
    padding: 2rem;
  }
</style>
```

3. **Usar el componente**:
```astro
---
import MiComponente from '../components/ui/MiComponente.astro';
---

<MiComponente
  title="Título"
  items={['Item 1', 'Item 2']}
/>
```

### Crear un Nuevo Componente React

1. **Crear archivo**:
```bash
touch src/components/MiComponenteReact.tsx
```

2. **Definir componente**:
```typescript
import React from 'react';

interface Props {
  data: any[];
  onSelect?: (item: any) => void;
}

export default function MiComponenteReact({ data, onSelect }: Props) {
  const [selected, setSelected] = React.useState<any>(null);

  const handleClick = (item: any) => {
    setSelected(item);
    onSelect?.(item);
  };

  return (
    <div className="mi-componente-react">
      {data.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item)}
          className="btn"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
```

3. **Usar en Astro**:
```astro
---
import MiComponenteReact from '../components/MiComponenteReact.tsx';

const data = [
  { name: 'Item 1' },
  { name: 'Item 2' }
];
---

<MiComponenteReact
  client:load
  data={data}
/>
```

### Estrategias de Carga de React

| Directiva | Cuándo Usar | Descripción |
|-----------|-------------|-------------|
| `client:load` | Componentes críticos | Carga inmediata al cargar página |
| `client:idle` | Interactividad secundaria | Carga cuando navegador está idle |
| `client:visible` | Contenido below-fold | Carga cuando entra en viewport |
| `client:only="react"` | Solo cliente | No renderiza en servidor (SSR) |

### Mejores Prácticas

1. **Props tipadas**: Siempre define interfaces de Props
2. **Valores por defecto**: Usa destructuring con defaults
3. **Componentes pequeños**: Un componente = una responsabilidad
4. **Reutilización**: Crea componentes genéricos
5. **Documentación**: Comenta props complejas
6. **Performance**: Usa `client:visible` para componentes pesados

### Ejemplo Completo

```astro
---
// src/components/sections/FeaturedPrograms.astro
import { getEmedProducts } from '../../lib/wp';
import ProgramCard from '../ui/ProgramCard.astro';

export interface Props {
  limit?: number;
  showCTA?: boolean;
}

const { limit = 3, showCTA = true } = Astro.props;

// Fetch data
const programs = await getEmedProducts({
  featured: true,
  per_page: limit
});
---

<section class="featured-programs py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">
      Programas Destacados
    </h2>

    <div class="grid md:grid-cols-3 gap-8">
      {programs.map(program => (
        <ProgramCard
          title={program.name}
          description={program.short_description}
          image={program.images[0]?.src}
          link={`/programas/${program.slug}`}
        />
      ))}
    </div>

    {showCTA && (
      <div class="text-center mt-12">
        <a href="/programas" class="btn-primary">
          Ver todos los programas
        </a>
      </div>
    )}
  </div>
</section>

<style>
  .featured-programs {
    background: var(--color-crema);
  }
</style>
```

---

**Última actualización**: Octubre 2025

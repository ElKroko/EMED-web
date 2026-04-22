# 🎨 Estilos y Sistema de Temas - EMED-web

## Tabla de Contenidos
- [Sistema de Diseño](#sistema-de-diseño)
- [Paleta de Colores](#paleta-de-colores)
- [Tipografía](#tipografía)
- [Espaciado y Layout](#espaciado-y-layout)
- [Componentes de Estilo](#componentes-de-estilo)
- [TailwindCSS](#tailwindcss)
- [Guía de Uso](#guía-de-uso)

## Sistema de Diseño

EMED-web utiliza un sistema de diseño basado en:
- **Variables CSS** para tokens de diseño
- **TailwindCSS** para utilidades
- **Componentes reutilizables** para patrones comunes

### Archivo de Variables
**Ubicación**: `src/styles/theme.css`

Todas las variables de diseño están centralizadas en este archivo.

## Paleta de Colores

### Colores Primarios (Institucionales)

```css
--color-celeste: #7EC5D6     /* Celeste EMED */
--color-turquesa: #00A6B1    /* Turquesa */
--color-naranja: #F5821F     /* Naranja corporativo */
--color-amarillo: #FDB813    /* Amarillo */
--color-beige: #FFF7E7       /* Beige */
--color-verde: #22C55E       /* Verde */
```

**Uso recomendado**:
- **Celeste**: Headers, elementos destacados
- **Turquesa**: CTAs secundarios, enlaces
- **Naranja**: CTAs principales, botones importantes
- **Amarillo**: Highlights, badges
- **Beige**: Backgrounds, fondos suaves
- **Verde**: Estados positivos, éxito

### Colores Especiales

```css
/* Admisión/Financiamiento */
--color-amarillo-banner: #F7D659
--color-naranja-gradiente: #F47A1F
--color-amarillo-gradiente: #FDBF30
--color-crema: #FEF7E8
```

### Colores Neutros (Escala de Grises)

```css
--color-white: #FFFFFF
--color-black: #000000
--color-gray-100: #F3F4F6  /* Muy claro */
--color-gray-200: #E5E7EB
--color-gray-300: #D1D5DB
--color-gray-400: #9CA3AF
--color-gray-500: #6B7280  /* Medio */
--color-gray-600: #4B5563
--color-gray-700: #374151
--color-gray-800: #1F2937
--color-gray-900: #111827  /* Muy oscuro */
```

### Gradientes

```css
/* Naranja → Amarillo */
--gradient-naranja-amarillo: linear-gradient(135deg,
  var(--color-naranja) 0%,
  var(--color-amarillo) 100%);

/* Marino → Beige */
--gradient-marino-beige: linear-gradient(180deg,
  #2C5282 0%,
  var(--color-beige) 100%);

/* Admisión/Financiamiento */
--gradient-admision-financiamiento: linear-gradient(135deg,
  var(--color-naranja-gradiente) 0%,
  var(--color-amarillo-gradiente) 100%);

/* Crema → Azul */
--gradient-crema-azul: linear-gradient(180deg,
  var(--color-crema) 0%,
  #2C5282 100%);

/* Footer */
--gradient-footer: linear-gradient(180deg,
  var(--color-crema) 0%,
  rgba(40, 109, 138, 1) 30%);
```

### Clases de Utilidad de Color

```css
/* Texto */
.text-celeste { color: var(--color-celeste); }
.text-turquesa { color: var(--color-turquesa); }
.text-naranja { color: var(--color-naranja); }
.text-amarillo { color: var(--color-amarillo); }

/* Backgrounds */
.bg-celeste { background-color: var(--color-celeste); }
.bg-turquesa { background-color: var(--color-turquesa); }
.bg-naranja { background-color: var(--color-naranja); }
.bg-amarillo { background-color: var(--color-amarillo); }
.bg-beige { background-color: var(--color-beige); }
.bg-verde { background-color: var(--color-verde); }
.bg-crema { background-color: var(--color-crema); }

/* Gradientes */
.bg-gradient-naranja-amarillo { background: var(--gradient-naranja-amarillo); }
.bg-gradient-marino-beige { background: var(--gradient-marino-beige); }
.bg-gradient-admision-financiamiento { background: var(--gradient-admision-financiamiento); }
.bg-gradient-crema-azul { background: var(--gradient-crema-azul); }
.bg-gradient-footer { background: var(--gradient-footer); }
```

## Tipografía

### Fuente Principal

**Inter Variable Font**
- **Familia**: 'Inter Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif
- **Peso disponible**: 100-900 (variable)
- **Implementación**: `@fontsource-variable/inter`

### Variables de Tipografía

```css
/* Familia */
--font-family-primary: 'Inter Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

/* Pesos */
--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Tamaños */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */
--font-size-7xl: 4.5rem;    /* 72px */
```

### Clases de Utilidad Tipográficas

```css
/* Peso */
.font-normal { font-weight: 400; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

/* Tamaño */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.text-5xl { font-size: 3rem; }
.text-6xl { font-size: 3.75rem; }
.text-7xl { font-size: 4.5rem; }
```

### Jerarquía Tipográfica

| Elemento | Tamaño | Peso | Uso |
|----------|--------|------|-----|
| H1 | 4xl-6xl | bold | Títulos principales de página |
| H2 | 3xl-4xl | bold | Títulos de sección |
| H3 | 2xl-3xl | semibold | Subtítulos |
| H4 | xl-2xl | semibold | Encabezados menores |
| Body | base-lg | normal | Texto de párrafo |
| Small | sm-xs | normal | Texto auxiliar |

## Espaciado y Layout

### Sistema de Espaciado (múltiplos de 4px)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Breakpoints Responsivos

```css
--breakpoint-sm: 640px;   /* Tablets pequeñas */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Pantallas grandes */
```

### Container (Contenedor Responsivo)

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

/* Máximos por breakpoint */
@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;    /* 2px */
--radius-base: 0.25rem;   /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-full: 9999px;    /* Círculo completo */
```

### Sombras

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1),
               0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
             0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
             0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Z-Index

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

## Componentes de Estilo

### Botones

**Ubicación**: `src/styles/components/buttons.css`

```css
/* Botón primario */
.btn-primary {
  background: var(--gradient-naranja-amarillo);
  color: var(--color-white);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-base);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Botón secundario */
.btn-secondary {
  background-color: var(--color-celeste);
  color: var(--color-white);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-base);
}

/* Botón outline */
.btn-outline {
  border: 2px solid var(--color-naranja);
  color: var(--color-naranja);
  background-color: transparent;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-base);
}

.btn-outline:hover {
  background-color: var(--color-naranja);
  color: var(--color-white);
}
```

### Secciones

**Ubicación**: `src/styles/components/sections.css`

```css
/* Sección con padding estándar */
.section {
  padding-top: var(--space-20);
  padding-bottom: var(--space-20);
}

/* Sección hero */
.section-hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sección con background */
.section-bg-beige {
  background-color: var(--color-beige);
}

.section-bg-crema {
  background-color: var(--color-crema);
}
```

### Cards

```css
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.card-image {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-4);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
}

.card-description {
  color: var(--color-gray-600);
  font-size: var(--font-size-base);
}
```

## TailwindCSS

### Configuración

**Archivo**: `astro.config.mjs`

```javascript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### TailwindCSS v4

El proyecto usa TailwindCSS v4 via Vite plugin, que:
- **No requiere** archivo de configuración separado
- Se configura directamente en `theme.css`
- Usa `@layer` para organizar estilos

### Layers de Tailwind

```css
/* En theme.css */
@layer theme {
  :root {
    /* Variables aquí */
  }
}

@layer utilities {
  /* Utilidades personalizadas */
}

@layer components {
  /* Componentes reutilizables */
}
```

### Clases Personalizadas con @apply

```css
.btn {
  @apply px-6 py-3 rounded-lg font-semibold transition-all;
}

.card-hover {
  @apply transition-transform hover:scale-105 hover:shadow-xl;
}

.text-gradient {
  @apply bg-gradient-to-r from-orange-500 to-yellow-400
         bg-clip-text text-transparent;
}
```

## Guía de Uso

### Usar Variables CSS

```html
<!-- En HTML/Astro -->
<div style="background-color: var(--color-celeste);">
  Contenido
</div>

<h1 style="font-size: var(--font-size-5xl); color: var(--color-naranja);">
  Título
</h1>
```

```css
/* En CSS */
.mi-componente {
  background: var(--gradient-naranja-amarillo);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
```

### Usar Clases de Utilidad

```html
<!-- Colores -->
<div class="bg-celeste text-white">
  Fondo celeste, texto blanco
</div>

<!-- Gradientes -->
<div class="bg-gradient-naranja-amarillo">
  Fondo con gradiente
</div>

<!-- Tipografía -->
<h1 class="text-5xl font-bold text-naranja">
  Título Grande Naranja
</h1>

<!-- Espaciado con Tailwind -->
<section class="py-20 px-4">
  <div class="container">
    Contenido centrado
  </div>
</section>
```

### Combinar Variables y Tailwind

```html
<div class="p-8 rounded-xl" style="background: var(--gradient-crema-azul);">
  <!-- Padding y border-radius de Tailwind -->
  <!-- Background con variable CSS -->
</div>
```

### Responsive Design

```html
<!-- Mobile first approach -->
<div class="text-base md:text-2xl lg:text-4xl">
  <!-- base: móvil -->
  <!-- md: tablets (768px+) -->
  <!-- lg: desktop (1024px+) -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- 1 columna móvil, 2 tablets, 3 desktop -->
</div>
```

### Ejemplo Completo: Card de Programa

```astro
<div class="card">
  <div class="card-image">
    <img src={program.image} alt={program.name} />
  </div>

  <h3 class="card-title text-naranja">
    {program.name}
  </h3>

  <p class="card-description">
    {program.description}
  </p>

  <div class="flex gap-4 mt-6">
    <span class="bg-celeste text-white px-4 py-2 rounded-full text-sm">
      {program.modalidad}
    </span>
    <span class="bg-amarillo text-gray-900 px-4 py-2 rounded-full text-sm">
      {program.duracion}
    </span>
  </div>

  <button class="btn-primary mt-6 w-full">
    Ver más
  </button>
</div>

<style>
  .card {
    background: var(--color-white);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-md);
    transition: var(--transition-base);
  }

  .card:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }
</style>
```

### Dark Mode (Preparación Futura)

Variables preparadas para dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-gray-900);
    --color-text: var(--color-white);
    /* etc. */
  }
}
```

### Mejores Prácticas

1. **Usar variables CSS** para valores reutilizables
2. **Tailwind para layout y spacing** rápido
3. **Componentes reutilizables** en archivos separados
4. **Mobile-first** approach en responsive
5. **Consistencia** en espaciado (múltiplos de 4)
6. **Accesibilidad** con contraste adecuado

### Recursos Adicionales

- **Variables CSS**: `src/styles/theme.css`
- **Reset CSS**: `src/styles/base/reset.css`
- **Tipografía**: `src/styles/base/typography.css`
- **Botones**: `src/styles/components/buttons.css`
- **Secciones**: `src/styles/components/sections.css`
- **Estilos globales**: `src/styles/global.css`

---

**Última actualización**: Octubre 2025

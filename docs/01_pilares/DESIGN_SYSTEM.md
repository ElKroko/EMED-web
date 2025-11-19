# DESIGN SYSTEM — EMED Web

**Versión:** 1.0
**Última actualización:** 2025-11-19
**Fuente base:** `src/styles/theme.css` + `src/styles/global.css` + análisis de componentes

---

## 1. Identidad Visual

### 1.1 Personalidad de marca
**EMED** (Escuela de Mediación) se posiciona como una institución educativa **profesional, confiable, cercana y experta** en mediación. La identidad visual debe transmitir:
- **Profesionalismo**: Colores serios y estructurados
- **Confianza**: Uso de azules/celestes que generan seguridad
- **Calidez**: Naranjas y amarillos que aportan energía positiva
- **Accesibilidad**: Diseño limpio, legible y sin barreras

### 1.2 Estética principal
- **Moderna y limpia**: Uso generoso de espacio en blanco (crema)
- **Formas orgánicas**: Ondas SVG en transiciones entre secciones
- **Jerarquía visual clara**: Títulos grandes, texto legible, CTAs destacados
- **Imágenes humanas**: Personas en contextos educativos y profesionales

### 1.3 Tipografía
- **Familia principal**: `Inter Variable` (Google Fonts)
- **Justificación**: Tipografía sans-serif moderna, altamente legible en pantallas, con excelente soporte de pesos variables
- **Pesos utilizados**:
  - 400 (Normal): Cuerpo de texto, párrafos
  - 600 (Semibold): Subtítulos, énfasis medio
  - 700 (Bold): Títulos, CTAs, headings principales

### 1.4 Recursos y Assets
- **Imágenes**: Unsplash (educación, mediación, trabajo en equipo)
- **Iconos**: SVG inline (educación, ubicación, contacto, características)
- **Logotipos**: Logo EMED, sellos SENCE/IRAM/Proific
- **Componentes modulares**: Cards, accordions, forms, grids

---

## 2. Design Tokens

### 2.1 Superficies (Fondos)

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--color-crema` | `#FEF3E2` | **Fondo base de todo el sitio** — color de fondo principal |
| `--color-beige` | `#FFF7E7` | Fondo alternativo para variaciones |
| `--color-white` | `#FFFFFF` | Cards, modales, superficies elevadas |
| `--color-amarillo-banner` | `#F7D659` | Fondos de secciones específicas (Modalidades de Estudio) |

**Principio**: El sitio usa **fondo crema global** (`#FEF3E2`). Las secciones con colores de fondo usan SVG de formas orgánicas sobre este base, NO cambian el fondo del body.

### 2.2 Colores Primarios

| Token | Valor HEX | Uso Principal |
|-------|-----------|--------------|
| `--color-celeste` | `#7EC5D6` | **Color primario** — Navbar, heros, links principales |
| `--color-turquesa` | `#00A6B1` | **Variante primaria** — Hover de celeste, énfasis secundario |
| `--color-naranja` | `#F5821F` | **CTA principal** — Botones de acción, destacados, precios |
| `--color-amarillo` | `#FDB813` | **Acentos** — Gradientes, decoraciones, hover de naranja |
| `--color-verde` | `#22C55E` | **Success/Positivo** — Estados de éxito, badges positivos |

### 2.3 Colores de Gradiente

| Token | Valores | Uso |
|-------|---------|-----|
| `--gradient-naranja-amarillo` | `linear-gradient(135deg, #F5821F 0%, #FDB813 100%)` | Sección "¿Por qué estudiar mediación?", CTAs destacados |
| `--gradient-marino-beige` | `linear-gradient(180deg, #2C5282 0%, #FFF7E7 100%)` | Transiciones de sección azul a crema |
| `--gradient-crema-azul` | `linear-gradient(180deg, #FEF3E2 0%, #2C5282 100%)` | Inverso del anterior |
| `--gradient-footer` | `linear-gradient(180deg, #FEF3E2 0%, rgba(40, 109, 138, 1) 30%)` | Footer background |
| `--gradient-celeste-overlay` | `rgba(126, 197, 214, 0.3)` | Overlay translúcido sobre imágenes de hero |
| `--gradient-admision-financiamiento` | `linear-gradient(135deg, #F47A1F 0%, #FDBF30 100%)` | Banner de financiamiento en Admisión |

**Reglas de uso**:
- ✅ Usar gradientes en secciones de impacto visual alto
- ✅ Combinar con texto blanco para contraste WCAG AA
- ❌ NO usar más de un gradiente por vista
- ❌ NO aplicar gradientes a textos (solo fondos)

### 2.4 Colores Neutros

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--color-gray-100` | `#F3F4F6` | Fondos sutiles, hover states ligeros |
| `--color-gray-200` | `#E5E7EB` | Bordes suaves, separadores |
| `--color-gray-300` | `#D1D5DB` | Bordes visibles, inputs inactivos |
| `--color-gray-400` | `#9CA3AF` | Placeholder text |
| `--color-gray-500` | `#6B7280` | Texto secundario, metadata |
| `--color-gray-600` | `#4B5563` | Texto normal, body copy |
| `--color-gray-700` | `#374151` | Texto enfatizado |
| `--color-gray-800` | `#1F2937` | **Texto principal** — color de cuerpo de texto |
| `--color-gray-900` | `#111827` | Títulos, headings, máximo contraste |
| `--color-black` | `#000000` | Uso reservado (iconos, bordes críticos) |

### 2.5 Tipografía — Tokens de Color

| Token | Valor | Uso |
|-------|-------|-----|
| `text-gray-800` | `#1F2937` | **Texto body principal** |
| `text-gray-600` | `#4B5563` | Texto secundario, descripciones |
| `text-gray-500` | `#6B7280` | Metadata, labels |
| `text-white` | `#FFFFFF` | Texto sobre fondos oscuros o de color |
| `text-celeste` | `#7EC5D6` | Links, énfasis |
| `text-naranja` | `#F5821F` | Precios, destacados |

### 2.6 Escala Tipográfica

| Token | Tamaño | Uso |
|-------|--------|-----|
| `--font-size-xs` | `0.75rem` (12px) | Disclaimer, copyright, metadata muy pequeña |
| `--font-size-sm` | `0.875rem` (14px) | Texto auxiliar, labels de formularios |
| `--font-size-base` | `1rem` (16px) | **Texto base de lectura** |
| `--font-size-lg` | `1.125rem` (18px) | Texto enfatizado, leads |
| `--font-size-xl` | `1.25rem` (20px) | Subtítulos pequeños |
| `--font-size-2xl` | `1.5rem` (24px) | Subtítulos medianos |
| `--font-size-3xl` | `1.875rem` (30px) | Títulos de sección |
| `--font-size-4xl` | `2.25rem` (36px) | Títulos destacados |
| `--font-size-5xl` | `3rem` (48px) | Hero headings |
| `--font-size-6xl` | `3.75rem` (60px) | Hero principal (desktop) |
| `--font-size-7xl` | `4.5rem` (72px) | Uso reservado (displays especiales) |

**Principio de uso**:
- Mobile: Reducir 1-2 niveles (ej. 5xl → 3xl)
- Desktop: Escala completa
- Line-height: 1.2 para headings, 1.6 para body

---

## 3. Sistema de Elevación y Sombras

### 3.1 Tokens de Sombra

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Hover sutil en elementos planos |
| `--shadow-base` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Cards en reposo |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Cards hover, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Modales, elementos flotantes |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Hero cards, CTAs principales |

### 3.2 Principios de Elevación

**Niveles de elevación** (z-axis):
1. **Nivel 0** (plano): Texto, imágenes, fondos
2. **Nivel 1** (`shadow-base`): Cards normales
3. **Nivel 2** (`shadow-md`): Cards en hover, acordeones expandidos
4. **Nivel 3** (`shadow-lg`): Modales, overlays
5. **Nivel 4** (`shadow-xl`): Tooltips, popovers

**Reglas**:
- ✅ Usar sombras solo en elementos interactivos o contenedores
- ✅ Incrementar sombra en hover para feedback visual
- ❌ NO aplicar sombras a texto
- ❌ NO mezclar sombras de diferentes niveles en el mismo componente

---

## 4. Radios y Espaciado

### 4.1 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-none` | `0` | **Default** — la mayoría de elementos no tienen border-radius |
| `--radius-sm` | `0.125rem` (2px) | Badges muy pequeños |
| `--radius-base` | `0.25rem` (4px) | Inputs, small buttons |
| `--radius-md` | `0.375rem` (6px) | Cards secundarios |
| `--radius-lg` | `0.5rem` (8px) | **Cards principales** — BenefitCard, ModeCard |
| `--radius-xl` | `0.75rem` (12px) | Cards grandes, modales |
| `--radius-2xl` | `1rem` (16px) | **Tablas, secciones destacadas** — ProgramMatrix |
| `--radius-full` | `9999px` | Badges circulares, avatares |

**Principio EMED**: Diseño predominantemente **recto** (radius 0), con radios suaves (8-16px) solo en cards interactivos y beneficios.

### 4.2 Escala de Espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | `0.25rem` (4px) | Espacios micro |
| `--space-2` | `0.5rem` (8px) | Padding interno muy pequeño |
| `--space-3` | `0.75rem` (12px) | Gaps entre ítems relacionados |
| `--space-4` | `1rem` (16px) | **Padding base de componentes** |
| `--space-5` | `1.25rem` (20px) | Spacing interno medio |
| `--space-6` | `1.5rem` (24px) | Gaps entre secciones pequeñas |
| `--space-8` | `2rem` (32px) | Padding de cards grandes |
| `--space-10` | `2.5rem` (40px) | Márgenes entre bloques |
| `--space-12` | `3rem` (48px) | Separación de secciones |
| `--space-16` | `4rem` (64px) | Padding vertical de secciones |
| `--space-20` | `5rem` (80px) | **Padding section estándar** (py-20 en Tailwind) |
| `--space-24` | `6rem` (96px) | Secciones hero |
| `--space-32` | `8rem` (128px) | Separaciones dramáticas |

---

## 5. Component Tokens

### 5.1 Botones
*Ver ejemplos completos en sección 8 (Mapeo a Tailwind)*

**Variantes**:
- **Primario** (naranja): CTAs principales
- **Secundario** (celeste): Acciones secundarias
- **Ghost** (outline): Acciones terciarias

**Estados**: Normal, Hover, Focus, Active, Disabled

### 5.2 Cards
- **Program Card**: Imagen + contenido + CTA
- **Benefit Card**: Cuadrada con borde blanco
- **Mode Card**: Icono + título + descripción

### 5.3 Badges / Chips
- **Badge Tipo Programa**: Circular, naranja (Diplomado) / turquesa (Curso)
- **Badge Estadística**: Glass effect sobre hero

### 5.4 Formularios
- **Input Field**: Border gray-300, focus celeste
- **Textarea**: Min-height 120px
- **Submit**: Btn-primary full-width

### 5.5 Navbar
- Sticky, fondo celeste, logo + links blancos

### 5.6 Footer
- Gradiente crema → azul, logo + newsletter + contacto

---

## 6. Reglas de Uso del Gradiente

### 6.1 Dónde SÍ usar

✅ Hero overlays, sección "Por qué estudiar", footer, gradient bridges

### 6.2 Dónde NO usar

❌ Texto, formularios, cards de contenido, navbar, múltiples gradientes por vista

### 6.3 Contraste

- Texto sobre gradiente: SIEMPRE blanco
- Verificar WCAG AA mínimo (4.5:1)

---

## 7. Comportamientos y Accesibilidad

### 7.1 Estados Interactivos
- **Hover**: Cambio color + transform + sombra
- **Focus**: Ring visible
- **Active**: Transform reducido
- **Disabled**: Opacity 0.5

### 7.2 Contraste WCAG AA
- Texto normal: 4.5:1 mínimo
- Texto grande: 3:1 mínimo
- UI elements: 3:1 mínimo

### 7.3 Movimiento Reducido
- Soporte `prefers-reduced-motion`

### 7.4 Semántica HTML
- Buttons para acciones, anchors para navegación
- Headings jerárquicos
- Alt text en imágenes

---

## 8. Mapeo a Tailwind CSS 4

Tailwind CSS 4 lee `src/styles/theme.css` automáticamente. Variables CSS → utility classes.

```html
<!-- Colores -->
<div class="bg-celeste text-white">Fondo celeste</div>
<p class="text-gray-800">Texto principal</p>

<!-- Spacing -->
<div class="p-4">Padding 1rem</div>
<div class="mb-8">Margin-bottom 2rem</div>

<!-- Typography -->
<h1 class="text-5xl font-bold">Hero</h1>
<p class="text-base">Body</p>

<!-- Border Radius -->
<div class="rounded-xl">12px radius</div>

<!-- Shadows -->
<div class="shadow-lg hover:shadow-xl">Card</div>
```

---

## 9. Aplicaciones por Página

- **Home**: Hero celeste + grid programas + gradientes
- **Admisión**: Hero celeste + modalities + matrix
- **Diplomados**: Grid cards con imágenes
- **Contacto**: Hero + formulario + FAQs

---

## 10. Do's and Don'ts

### ✅ DO
1. Mantener contraste AA
2. Usar tokens CSS
3. Jerarquía de headings
4. Espaciado consistente
5. Colores de marca
6. Fondo crema global
7. Lazy loading
8. Alt text
9. Transiciones suaves
10. Testing responsive

### ⚠️ DON'T
1. ❌ Improvisar tonos
2. ❌ Texto sobre gradientes complejos
3. ❌ Más de 2 gradientes/página
4. ❌ Modificar fondo body
5. ❌ Botones sin hover/focus
6. ❌ Elementos táctiles < 44px
7. ❌ Headings fuera de orden
8. ❌ Hardcodear colores
9. ❌ Animaciones largas
10. ❌ Links sin indicador visual

---

## 11. Checklist de Implementación

- [ ] Tokens CSS usando variables
- [ ] Contraste WCAG AA verificado
- [ ] Estados interactivos definidos
- [ ] Responsive (mobile-first)
- [ ] Accesibilidad (semántica + ARIA)
- [ ] Imágenes optimizadas
- [ ] Performance (< 1.8s FCP)
- [ ] Consistencia con patrones existentes
- [ ] Componente documentado

---

## 12. Decisiones de Implementación

### ¿Por qué Inter Variable?
Legibilidad, pesos variables, gratis, neutral y profesional

### ¿Por qué fondo crema?
Reduce fatiga visual, genera calidez, contraste suficiente, cards se elevan

### ¿Por qué Tailwind CSS 4?
Utility-first, CSS nativo, integración Astro, tree-shaking

### ¿Por qué SVG para formas?
Escalable, peso mínimo, configurable, responsive

---

## 13. Versionado

### Changelog

#### v1.0 — 2025-11-19
- ✅ Documento completo con todos los tokens
- ✅ Component tokens especificados
- ✅ Reglas de accesibilidad
- ✅ Mapeo a Tailwind CSS 4
- ✅ Do's and Don'ts
- ✅ Checklist

---

## 14. Mantenimiento

### Cuándo actualizar
- Nuevo token → sección 2
- Nuevo componente → sección 5
- Cambio tipografía/colores → secciones 1-2
- Nueva regla → sección 7
- Decisión importante → sección 12

### Proceso
1. Modificar `theme.css`
2. Actualizar este doc
3. Actualizar componentes
4. Crear reporte
5. Incrementar versión

---

**Última actualización:** 2025-11-19
**Mantenido por:** Equipo EMED + Claude AI
**Fuente de verdad:** `src/styles/theme.css`

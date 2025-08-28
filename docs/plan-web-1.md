### 1. Panorama general del layout

| Zona                                       | Propósito                       | Elementos visuales clave                                                                                                                  |
| ------------------------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Header fijo**                            | Navegación principal            | Logo EMED (blanco), menú horizontal (HOME, ADMISION, PROGRAMAS…), fondo celeste (#7EC5D6 aprox.)                                          |
| **Hero / Carrusel**                        | Impacto inicial & claim         | Foto a pantalla completa con overlay celeste translúcido, título “FORMANDO MEDIADORES DESDE 2005”, flechas de slider & pagination         |
| **Mini-CTAs**                              | 3 beneficios ganchos            | “adquiere herramientas” · “contagia actitud” · “desarrolla técnica” en tres celdas con separadores finos                                  |
| **Sección “Mediación”**                    | Definición de la disciplina     | Dos columnas: texto descriptivo a la izquierda, foto grupal a la derecha; fondo celeste con onda blanca que “corta” la sección            |
| **Sección “¿Por qué estudiar mediación?”** | Ventajas del programa           | Fondo degradado naranja → amarillo con curva superior; grid 2×3: foto lifestyle + cuatro tarjetas beneficio (box con borde fino blanco)   |
| **“Programas”**                            | Oferta formativa                | Título centered, lista en acordeón (Familia · Escolar · Laboral) con línea inferior y símbolo “+”                                         |
| **Acreditación**                           | Prueba social / confianza       | Texto “Te capacitamos con acreditación”, logotipo SENCE & sello IRAM en degradado marino-beige, gran isotipo circular (turquesa/amarillo) |
| **Footer**                                 | Información de contacto & legal | Logo EMED grande, sello IRAM, íconos redes, formulario “Suscríbete a nuestro newsletter”, dirección y teléfono                            |

---

### 2. Descomposición en componentes Astro

| Componente                  | Props sugeridos                               | Ubicación/uso                                                |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **`<Layout>`**              | `title`, `description`, `children`            | Envoltura global, incluye `<SiteHeader>` y `<SiteFooter>`    |
| **`<SiteHeader>`**          | `links[]`, `logoSrc`                          | Menú, estado sticky, breakpoint para menú hamburguesa        |
| **`<HeroSlider>`**          | `slides[{img, heading, sub}]`, `autoplay`     | Carrusel con transición fade; overlay gradiente configurable |
| **`<CTAButtonsRow>`**       | `items[{label, href}]`                        | Las tres mini-CTAs; reutilizable en otras páginas            |
| **`<WaveSection>`**         | `colorTop`, `colorBottom`, `children`         | Wrapper que renderiza SVG onda arriba y/o abajo              |
| **`<TwoColumnBlock>`**      | `image`, `imageAlt`, `heading`, `content`     | Sección “Mediación”; orden de columnas con prop `reverse`    |
| **`<WhyStudyMediation>`**   | –                                             | Internamente usa `<BenefitCard>` + `<Figure>`                |
| **`<BenefitCard>`**         | `title`, `text`                               | Tarjetas cuadradas con borde 1 px blanco & padding           |
| **`<ProgramsAccordion>`**   | `programs[{title, description, url}]`         | Acordeón accesible; ícono +/- rotado vía CSS                 |
| **`<AccreditationBanner>`** | `heading`, `sub`, `badges[]`, `mascotSrc`     | Sección sobre degradado vertical                             |
| **`<NewsletterForm>`**      | `action`, `placeholder`                       | Input + botón submit; listo para integrar con API            |
| **`<SiteFooter>`**          | `socials[{icon, href}]`, `contact`, `address` | Tres columnas responsive                                     |

> **Patrón sugerido**: Mantén un directorio `/components/ui/` para átomos (Button, Card, Icon) y otro `/components/sections/` para moléculas/organismos completos como `WhyStudyMediation`.

---

### 3. Mapa de vistas/páginas Astro

```
src/pages/
└── index.astro          ← home (layout descrito)
└── programas/[slug].astro
└── admision.astro
└── mediacion.astro
└── nosotros.astro
└── contacto.astro
```

Cada página reutiliza los mismos bloques (ej. `<ProgramsAccordion>` se puede hidratar con datos específicos por ruta).

---

### 4. Variables de diseño (tokens)

| Token                 | Valor aproximado                                                                        |
| --------------------- | --------------------------------------------------------------------------------------- |
| **Colores primarios** | Celeste #7EC5D6 · Turquesa #00A6B1 · Naranja #F5821F · Amarillo #FDB813 · Beige #FFF7E7 |
| **Tipografía**        | Familia geométrica sans (parece Montserrat / Poppins) · pesos 400/600 · tracking ligero |
| **Espaciado base**    | `--space-1: 0.5rem` · `--space-2: 1rem` · `--space-4: 2rem`                             |
| **Radios**            | 0 px excepto cards “WhyStudy” (8 px)                                                    |
| **Sombras**           | Suaves solo en hover de botones/cards                                                   |

Define estos tokens en `/styles/theme.css` y consúmelos con `var(--color-primary)` para coherencia.

---

### 5. Consideraciones responsive

* **Mobile-first**: Pila vertical, acordeón auto-cerrable.
* **Breakpoints**: 768 px para pasar de columna única a 2-column y 1024 px para ampliar paddings.
* **Ondas SVG**: Escalables al 100 % de ancho; duplica la ruta y usa `preserveAspectRatio="none"`.

---

### 6. Próximos pasos

1. **Crear tokens y utilidades** en `/styles/`.
2. **Generar los componentes “shell”** (`.astro` + `.scss/ts` si ocupas).
3. **Cargar contenido estático** o desde markdown/JSON y alimentar props.
4. **Agregar interactividad mínima** (acordeón, slider) con islands de Astro + `astro/client`.

Cuando tengas el siguiente screenshot o detalles de otras páginas, pásamelo y seguimos afinando la descomposición 🔧.

### 1. Panorama general de la página **Admisión**

| Zona                               | Propósito                     | Elementos visuales                                                                                                                                                                                                        |
| ---------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header** (persistente)           | Navegación global             | Logo EMED, menú horizontal, línea divisor, fondo celeste                                                                                                                                                                  |
| **Page-Hero**                      | Identidad de la vista         | Título “Admisión” alineado derecha, gran bloque celeste con borde ondulado inferior blanco                                                                                                                                |
| **Sección “Fórmate con nosotros”** | Presentación + CTA            | Layout 2-columnas: <br>• Izq.: heading, lista de motivos (4 líneas subrayadas) y 2 botones (“Programas”, “Inscríbete aquí”).<br>• Der.: foto aula celebrando (con recorte libre)<br>Fondo crema con onda celeste superior |
| **Financiamiento**                 | Opciones de becas / SENCE     | Bloque degradado naranja↘︎amarillo con curva; copy principal, links subrayados, logo SENCE, botón outline “Financiamiento por SENCE”                                                                                      |
| **Modalidad de Estudio**           | Explicar formatos             | Fondo amarillo suave. Intro pequeña, grid 3 tarjetas **ModoCard** (Asincrónico / Sincrónico / Presencial) con icono + título + descripción                                                                                |
| **Matriz de programas**            | Qué modo ofrece cada programa | Tabla redondeada con filas de programas y columnas ✔︎/○ para asincrónico, sincrónico, presencial                                                                                                                          |
| **Disclaimer**                     | Requisito legal               | Texto pequeño bajo la tabla (“Por normativa del Ministerio…”)                                                                                                                                                             |
| **Gradient-Bridge**                | Transición visual             | Degradado vertical crema→azul (mismo que home)                                                                                                                                                                            |
| **Footer**                         | Contacto + newsletter         | Igual a Home: logo grande, sellos IRAM/SENCE/Proific, formulario, redes, dirección, teléfono                                                                                                                              |

---

### 2. Descomposición en componentes Astro

| Componente             | Props principales                                                         | Reutilización                                                              |
| ---------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **`<Layout>`**         | `title`, `children`                                                       | Shell global (ya definido)                                                 |
| **`<PageHero>`**       | `heading`, `bgColor`, `waveDir`                                           | Encabezado interior de secciones (usa `<WaveSection>`)                     |
| **`<TwoColumnIntro>`** | `image`, `imageAlt`, `heading`, `bullets[]`, `primaryCta`, `secondaryCta` | Para “Fórmate con nosotros” (puede servir en otras landing internas)       |
| **`<CalloutBanner>`**  | `heading`, `subLinks[]`, `logo`, `cta`                                    | Bloque “Financiamiento”; admite cualquier color de fondo o gradiente       |
| **`<ModesGrid>`**      | `modes[{icon, title, text}]`                                              | Contenedor de las 3 tarjetas                                               |
| **`<ModeCard>`**       | `icon`, `title`, `text`, `bg`                                             | Tarjeta con borde y padding; icono configurable (lucide-react)             |
| **`<ProgramMatrix>`**  | `rows[{program, modality, async, sync, pres}]`                            | Tabla accesible; los bullets negros/blancos pueden mapearse a `true/false` |
| **`<DisclaimerText>`** | `text`                                                                    | Pequeño, color gris-700, tamaño xs                                         |
| **`<GradientBridge>`** | `from`, `to`, `height`                                                    | Degradado vertical empleado entre secciones                                |
| **`<SiteFooter>`**     | •                                                                         | Ya creado en la Home                                                       |

> **Tip:** coloca `<WaveSection>` como wrapper reutilizable (SVG top/bottom) y dentro renderizas cualquiera de las secciones anteriores.

---

### 3. Estructura de carpetas sugerida

```
src/components/
  ui/
    Button.astro
    Card.astro
    Icon.astro
  sections/
    PageHero.astro
    TwoColumnIntro.astro
    CalloutBanner.astro
    ModesGrid.astro
    ProgramMatrix.astro
    GradientBridge.astro
  layout/
    Layout.astro
    SiteHeader.astro
    SiteFooter.astro

src/pages/
  admision.astro        ← compone en orden:
                            <PageHero>
                            <TwoColumnIntro>
                            <CalloutBanner>
                            <ModesGrid>
                            <DisclaimerText>
                            <ProgramMatrix>
                            <GradientBridge>
```

Cada sección se monta dentro de `<Layout>` para heredar el mismo header y footer.

---

### 4. Tokens & estilos específicos nuevos

| Token                        | Valor aprox.                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| **Amarillo-banner**          | `#F7D659`                                                                                        |
| **Naranja-gradiente inicio** | `#F47A1F`                                                                                        |
| **Amarillo-gradiente fin**   | `#FDBF30`                                                                                        |
| **Ícono base**               | 48 px (svg fill #000)                                                                            |
| **Tabla border-radius**      | 16 px                                                                                            |
| **Circulitos matriz**        | 12 px; fondo `var(--color-primary)` o `transparent` con `border: 1px solid var(--color-primary)` |

---

### 5. Consideraciones responsive

* **Intro 2-column** → col-reverse en < 640 px (imagen arriba, texto abajo).
* **ModesGrid** pasa de 3 columnas a stack vertical (gap 1.5 rem).
* **ProgramMatrix**: convierte círculos a emoji ✔︎/○ o table overflow-x para < 360 px.
* **Gradientes y ondas** usan `preserveAspectRatio="none"` para llenar ancho.

---

### 6. Próximos pasos

1. **Copiar** los componentes ya hechos en la Home (Header, Footer, WaveSection).
2. **Crear** `PageHero`, `TwoColumnIntro`, `CalloutBanner`, `ModesGrid` y `ProgramMatrix` con props descritos.
3. **Agregar contenido‬** estático o desde CMS (Markdown/JSON) para alimentar los props.
4. **Verificar contraste** de texto sobre los gradientes (WCAG AA).
5. **Implementar accesibilidad**: roles ARIA en tabla, botones `<button>` reales, foco visible.

Con esto tendrás la página **Admisión** completamente modular y lista para hidratarse solo donde haga falta. ¡Avísame cuando quieras revisar otra pantalla o profundizar en algún componente!

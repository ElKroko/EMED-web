# Propuesta de Mejoras de Diseño y Validaciones Futuras

## 1. Estandarización de Acordeones
**Observación:** Actualmente existen múltiples implementaciones de acordeones (FAQs en Contacto, FAQs en Diplomados, Plan de Estudios en detalle de diplomado). En algunos casos eran estáticos (sin script) y en otros tenían lógica duplicada que causaba conflictos.
**Mejora Sugerida:** Crear un componente reutilizable `<Accordion />` o `<AccordionGroup />` en `src/components/ui` que encapsule la lógica de apertura/cierre y animación. Esto evitará duplicar scripts en cada página (`contacto.astro`, `diplomados.astro`, etc.) y asegurará un comportamiento consistente.

## 2. Consistencia en Márgenes de Botones
**Observación:** Se detectaron botones con márgenes inconsistentes, algunos usando `margin-top: auto` y otros sin margen explícito, lo que provoca que queden pegados al texto en resoluciones móviles o tarjetas con contenido variable.
**Mejora Sugerida:**
- Estandarizar el uso de clases de espaciado (e.g., `mt-4` o `my-4`) en los componentes de botón o en sus contenedores.
- Revisar el componente `CTAButtonsRow` y las tarjetas de Diplomas para asegurar que siempre haya un espacio vertical mínimo.

## 3. Manejo de Fondos SVG
**Observación:** Se han retirado los SVGs de fondo amarillo/naranja según solicitud para mantener el fondo color crema.
**Mejora Sugerida:**
- Si se requiere mayor interés visual en el futuro sin usar SVGs pesados, considerar el uso de **patrones sutiles** (ruido, puntos) con baja opacidad sobre el color crema, o degradados CSS muy suaves que respeten la paleta de colores definida.
- Centralizar el fondo base en el `Layout.astro` principal en lugar de aplicarlo individualmente en cada página, para evitar secciones con `bg-white` o `bg-transparent` accidentales que rompan la continuidad del color crema.

## 4. Componentes de UI (Pestañas/Badges)
**Observación:** Los elementos tipo "badges" o etiquetas (e.g., "MÁS POPULAR", "Online") se construyen manualmente con `divs` y clases `gap`.
**Mejora Sugerida:**
- Crear un componente `<BadgeList items={...} />` que maneje automáticamente el wrapping y el espaciado (`gap`) para asegurar que siempre se vean alineados y con el margen correcto en todas las vistas.

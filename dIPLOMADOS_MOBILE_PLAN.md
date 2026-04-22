# Plan de Optimización Móvil - Páginas de Diplomados

**Objetivo:** Homologar la estructura y diseño de las páginas de diplomados (`mediacion-familiar`, `mediacion-escolar`, `mediacion-laboral`) para garantizar una experiencia móvil óptima, alineada con los cambios realizados en el Home.

## Archivos a Modificar
1.  `src/pages/diplomados/mediacion-familiar.astro`
2.  `src/pages/diplomados/mediacion-escolar.astro`
3.  `src/pages/diplomados/mediacion-laboral.astro`

## Cambios Identificados

### 1. Optimización del Hero Section
*   **Problema:** El padding vertical `py-32` es excesivo para pantallas móviles, desperdiciando espacio valioso antes del contenido.
*   **Solución:** Reducir el padding a `py-20 md:py-32`.
*   **Tipografía:** Ajustar el título H1 de `text-4xl` a `text-3xl md:text-4xl lg:text-5xl` para evitar cortes de palabras en pantallas muy estrechas.

### 2. Espaciado de Secciones (Padding)
*   **Problema:** La sección principal de contenido usa `py-20` (80px), lo que genera grandes espacios en blanco entre el hero y el contenido en móviles.
*   **Solución:** Cambiar `py-20` a `py-12 md:py-20`.

### 3. Títulos de Secciones (H2/H3)
*   **Problema:** Títulos como "¿Por qué elegir...?" usan `text-3xl` fijo o tamaños grandes que pueden verse desproporcionados.
*   **Solución:** Ajustar a `text-2xl md:text-3xl` para mantener jerarquía sin abrumar.

### 4. Botones de Acción (CTA)
*   **Problema:** Verificar que los botones "Hablar con un Asesor" y "WhatsApp" se apilen verticalmente en móviles para facilitar el clic, en lugar de intentar comprimirse horizontalmente.
*   **Acción:** Asegurar que el contenedor tenga `flex-col md:flex-row` si es un flexbox, o `grid-cols-1` si es grid.

### 5. Tarjetas y Grillas
*   **Problema:** Elementos como "Requisitos" o "Beneficios" en grillas de 1 columna pueden hacer el scroll muy largo.
*   **Solución:** Mantener la pila en móvil pero verificar margenes inferiores (`mb-6` -> `mb-4`) para compactar la vista.

## Ejecución
Se aplicarán estos cambios de forma sistemática en los tres archivos `.astro` mencionados.

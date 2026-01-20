# Plan de Implementación Web EMED 2026

Este plan detalla los cambios solicitados para la actualización del sitio web, ordenados por página.

## 1. Página de Inicio (`index.astro`)
- [ ] **Sección Impacto**:
    - Actualizar título a "Impacto Social Positivo" y "Nuestro Impacto en Mediación Familiar".
    - Verificar visibilidad del logo EMED.
    - [x] Actualizar layout de páginas de diplomados (mediacion-familiar, escolar, laboral) para tener sidebar sticky y contenido principal unificado.
    - Actualizar textos de aranceles a "desde" y agregar nota "consultar por facilidades de pago".
- [ ] **Cards de Programas (`ProgramsGrid.astro`)**:
    - Asegurar que la información se extraiga dinámicamente del JSON actualizado (Horas, Modalidad, Precio).
    - Verificar consistencia:
        - Familiar: 220 horas
        - Escolar: 240 horas
        - Laboral: 240 horas

## 2. Mediación Familiar (`mediacion-familiar.astro`)
- [x] **Metadata**: Actualizar duración (220h), modalidad (Online + Presencial), precio (desde $750.000).
- [x] **Header**: Badge de modalidad y detalles rápidos actualizados.
- [x] **Información del Programa**: Actualizar sidebar con los nuevos datos.
- [x] **Malla Curricular**: Implementar acordeón con nuevo temario (Módulos 1-4).
- [x] **Metodología**: Detallar horas online (170h) vs presencial (50h).
- [x] **Formación Online**: Estructura de 2 etapas (Asincrónica/Sincrónica).
- [x] **Diferenciadores**: Lista actualizada (Casos reales, Docentes activos, Pasantía, Seguimiento).
- [ ] **Descargables**: Agregar botones de descarga (Malla, Calendario, Aranceles).

## 3. Mediación Escolar (`mediacion-escolar.astro`)
- [x] **Metadata**: Actualizar duración (240h), modalidad (100% Online), precio (desde $450.000).
- [x] **Header/Sidebar**: Actualizar datos y badges.
- [x] **Contenido**: 
    - Nuevo título principal "Transformando la Convivencia Escolar".
    - Metodología adaptada (100% online, sincrónico/asincrónico).
    - Horarios compatibles con trabajo docente.
    - Beneficios únicos y campo de aplicación ampliado.
- [ ] **Descargables**: Agregar botones de descarga (Malla, Calendario, Aranceles).

## 4. Mediación Laboral (`mediacion-laboral.astro`)
- [x] **Metadata**: Actualizar duración (240h), modalidad (100% Online), precio (desde $480.000).
- [x] **Header/Sidebar**: Actualizar datos y badges.
- [x] **Contenido**:
    - Enfoque en "Mejor clima laboral" y "Impacto organizacional".
    - Nuevo programa empresarial (Diagnóstico, Mediación, Marco Legal, Práctica).
    - Casos reales y beneficios empresariales.
- [ ] **Descargables**: Agregar botones de descarga (Malla, Calendario, Aranceles).

## 5. Financiamiento e Institucional (`financiamiento.astro`, `nosotros.astro`)
- [x] **Financiamiento**: Eliminar menciones a "SENCE".
- [ ] **Quienes Somos**: 
    - Actualizar texto editorial (20+ años, propósito).
    - Agregar bloque "Promesa de Valor" (Formación práctica, Acompañamiento, Certificación).
    - Agregar mención "Certificación IPCHILE".
- [ ] **Misión/Visión**: Actualizar textos según nuevos lineamientos.

## 6. Globales
- [x] **Formularios**: Eliminar opción de horario "noche (18 a 21)".
- [x] **Consistencia**: Verificar que no queden datos hardcodeados antiguos en componentes compartidos.

# INIT.MD - Metodología de Trabajo Claude + Human

**Versión:** 1.0
**Fecha:** 2025-10-24
**Propósito:** Documento de inicialización para replicar la metodología de trabajo colaborativa Claude AI + Human Developer en cualquier proyecto web

---

## 📋 Tabla de Contenidos

1. [Filosofía de Trabajo](#1-filosofía-de-trabajo)
2. [Estructura de Documentos Pilares](#2-estructura-de-documentos-pilares)
3. [Sistema de Reportes](#3-sistema-de-reportes)
4. [Uso de Subagentes](#4-uso-de-subagentes)
5. [Flujo de Trabajo Típico](#5-flujo-de-trabajo-típico)
6. [Setup Inicial del Proyecto](#6-setup-inicial-del-proyecto)
7. [Comandos y Convenciones](#7-comandos-y-convenciones)
8. [Best Practices](#8-best-practices)

---

## 1. Filosofía de Trabajo

### Principios Core

1. **Documentación como Memoria Persistente**
   - Los documentos pilares son la "memoria RAM" del proyecto
   - Toda decisión importante se documenta inmediatamente
   - Claude usa estos documentos para mantener contexto entre sesiones

2. **Trabajo Silencioso y Eficiente**
   - Claude trabaja con subagentes sin narrar cada paso
   - Solo reporta resultados finales al usuario
   - Usa TodoWrite para tracking interno de progreso

3. **Reportes Granulares con Timestamps**
   - Cada cambio significativo genera un reporte
   - Formato: `YYYY-MM-DD_HH-MM_descripcion-cambio.md`
   - Ubicación: `/docs/reporte/`

4. **Versionado y Trazabilidad**
   - Todos los documentos pilares tienen versión
   - Historial de cambios en cada documento
   - Decisiones importantes se registran en ADR (Architecture Decision Records)

---

## 2. Estructura de Documentos Pilares

Los **4 documentos pilares** son la base del proyecto. Deben crearse al inicio y actualizarse constantemente.

### 2.1 CLAUDE_GUIDE.md

**Propósito:** Contexto rápido del proyecto para Claude AI

**Contenido esencial:**
```markdown
# CLAUDE GUIDE — [Nombre del Proyecto]

## 1. RESUMEN DEL PROYECTO
- ¿Qué es el proyecto?
- Objetivo principal
- Propuesta de valor
- Público objetivo

## 2. ESTRUCTURA DE ARCHIVOS Y DÓNDE BUSCAR
- Documentación clave
- Estructura del proyecto
- Referencias rápidas

## 3. PRINCIPIOS DE DESARROLLO
- Stack tecnológico
- Atomic Design y Separation of Concerns
- Convenciones de código
- Performance y Accesibilidad

## 4. DESIGN GUIDELINES
- Personalidad visual
- Paleta de colores
- Tipografía
- Tokens principales

## 5. ARQUITECTURA DE INFORMACIÓN
- Páginas del sitio
- Footer estructura

## 6. MENSAJES CLAVE Y TONO
- Copy scaffold
- Tono por canal
- Pautas de escritura

## 7. QUÉ HACER Y QUÉ NO HACER
- DO ✓
- DON'T ✗

## 8. REFERENCIAS RÁPIDAS
- Documentos clave
- Mapa de tokens
- Componentes UI clave

## 9. ROADMAP DE IMPLEMENTACIÓN
- Sprint 0, 1, 2, 3...

## 10. KEYWORDS Y SEO

## 11. GOBERNANZA Y OPS

## NOTAS FINALES PARA CLAUDE
Instrucciones específicas de cómo usar este documento

## Registro de Decisiones (ADR)
### [FECHA] Decisión Importante
**Decisión:** Qué se decidió
**Razón:** Por qué se tomó esa decisión
**Impacto:** Consecuencias de la decisión
**Estado:** ✅ Implementado | ⏳ Pendiente | ❌ Revertido
```

**Cuándo actualizar:**
- Nueva decisión técnica o de diseño
- Cambio de herramientas o tecnologías
- Pivote en la arquitectura
- Nuevas restricciones o reglas

---

### 2.2 DESIGN_SYSTEM.md

**Propósito:** Especificación completa del sistema de diseño

**Contenido esencial:**
```markdown
# Design System — [Nombre del Proyecto]

## 1. Identidad Visual
- Personalidad de marca
- Estética principal
- Tipografías (familia, pesos, por qué se eligió)
- Imágenes y assets

## 2. Design Tokens
### 2.1 Superficies (Fondos)
| Token | Valor HEX | Uso |
|-------|-----------|-----|
| bg.canvas | #... | ... |
| bg.surface | #... | ... |

### 2.2 Tipografía
- Font family + import (Google Fonts, etc.)
- Tokens de color de texto
- Escala tipográfica completa

### 2.3 Gradiente de Marca (si aplica)
- Especificaciones exactas
- Dónde SÍ usar
- Dónde NO usar

### 2.4 Estados y Feedback
| Token | Valor HEX | Uso |
|-------|-----------|-----|
| success | #... | ... |

## 3. Paleta de Colores — Resumen Completo
Todas las variables CSS

## 4. Sistema de Elevación y Sombras
- Tokens de sombras
- Principios

## 5. Radios y Espaciados
- Border radius
- Spacing scale

## 6. Component Tokens
### 6.1 Botones
- Primario
- Secundario
- Ghost

### 6.2 Cards
### 6.3 Badges / Chips
### 6.4 Formularios
### 6.5 Navbar
### 6.6 Footer

## 7. Reglas de Uso del Gradiente (si aplica)

## 8. Comportamientos y Accesibilidad
- Modo oscuro/claro
- Contraste
- Estados de foco
- Movimiento reducido
- Semántica HTML
- Tamaño de texto

## 9. Mapeo a Tailwind (o CSS Framework)
```javascript
// tailwind.config.js
```

## 10. Aplicaciones a Páginas Específicas

## 11. Do's and Don'ts

## Checklist de Implementación
Antes de considerar completo

## Decisiones de Implementación
Por qué X tecnología, por qué valores arbitrarios, etc.

## Versionado
Versión, fecha, historial de cambios

## Mantenimiento del Design System
```

**Cuándo actualizar:**
- Nuevo token o color agregado
- Cambio de fuente o escala tipográfica
- Nuevo componente con variantes
- Ajuste en sistema de espaciado

---

### 2.3 ESTRATEGIA_SEO.md

**Propósito:** Plan completo de posicionamiento orgánico

**Contenido esencial:**
```markdown
# Estrategia SEO — [Nombre del Proyecto]

**Estado actual:** [Fase del proyecto]

## Estado del Proyecto
- Performance actual (build, páginas, fuentes, imágenes)

## 1. Keywords Principales
### 1.1 Keywords Primarias (High Priority)
- Lista de keywords por categoría
- Volumen y competencia

### 1.2 Keywords Secundarias
- Long-tail educativas
- Long-tail comerciales

### 1.3 Keywords de Nicho

## 2. Estructura de Contenido SEO por Página
### 2.1 HOME (/)
- Title Tag
- Meta Description
- Estructura de Headings
- Contenido SEO Estratégico
- Internal Links

### 2.2 SERVICIOS (/servicios)
[Repetir estructura]

### 2.3 NOSOTROS
### 2.4 CASOS
### 2.5 CONTACTO
### 2.6 BLOG (PLACEHOLDER)

## 3. Estrategia de Contenido: Blog Placeholder
### 3.1 Categorías de Contenido
### 3.2 Formatos de Contenido
### 3.3 Tono y Estilo Editorial

## 4. Plan de Contenidos Inicial (Lanzamiento)
### 4.1 Primeras 4 Cápsulas de Micro-Learning
### 4.2 Caso de Estudio Inicial
### 4.3 Calendario Editorial (Primeros 3 Meses)

## 5. Technical SEO Requirements
### 5.1 Performance Optimization
- Lighthouse Targets
- Core Web Vitals
- Implementación

### 5.2 Optimización de Imágenes
### 5.3 Tipografías Optimizadas
### 5.4 HTML Semántico y Accesibilidad
### 5.5 Mobile Optimization
### 5.6 Hosting y CDN
### 5.7 Sitemap y Robots.txt
### 5.8 Structured Data (JSON-LD)

## 6. Link Building Interno
### 6.1 Estrategia de Silos de Contenido
### 6.2 Anchor Text Strategy
### 6.3 Link Flow (PageRank Sculpting)
### 6.4 Breadcrumbs

## 7. Schema Markup Recomendado

## 8. Métricas y KPIs SEO
### 8.1 Métricas Técnicas (Performance)
### 8.2 Métricas de Visibilidad
### 8.3 Métricas de Contenido
### 8.4 Métricas de Conversión
### 8.5 Métricas de Autoridad
### 8.6 Dashboard de Seguimiento

## 9. Calendario Editorial

## 10. Quick Wins SEO (Primeras 4 Semanas)

## 11. Herramientas SEO Recomendadas

## Checklist Pre-Lanzamiento

## 12. Recursos de Aprendizaje Continuo
```

**Cuándo actualizar:**
- Nuevas keywords descubiertas
- Cambios en estrategia de contenido
- Actualización de métricas mensuales
- Nuevas herramientas implementadas

---

### 2.4 PLAN_DE_DESARROLLO.md

**Propósito:** Roadmap ejecutable del proyecto

**Contenido esencial:**
```markdown
# Plan de Desarrollo - [Nombre del Proyecto]

## Información del Proyecto
**Versión:** X.X
**Última actualización:** YYYY-MM-DD
**Objetivo:** [Objetivo principal]
**Estado actual:** [MVP | Beta | Producción]

## Historial de Cambios
### YYYY-MM-DD
- **HH:MM** - Descripción del cambio
- **HH:MM** - Descripción del cambio

## 1. Roadmap Detallado de Implementación

### Sprint 0 — Setup y Fundamentos ✅ | ⏳ | ❌
**Objetivo:** [Objetivo del sprint]

#### Tareas
- [ ] Tarea 1
- [ ] Tarea 2

#### Criterios de Aceptación
- ✓ Criterio 1
- ✓ Criterio 2

#### Entregables
- Entregable 1
- Entregable 2

---

### Sprint 1 — [Nombre]
[Repetir estructura]

## Próximos Pasos
### Fase Actual: [Nombre de la fase]
**Objetivo:** [Objetivo de la fase]

#### Tareas Inmediatas
- [ ] Tarea 1

#### Deploy a Producción
- [ ] Pasos para deploy

## 2. Stack Tecnológico
### Frontend Framework
### Estilos
### Herramientas de Desarrollo
### Optimización
### Integraciones
### Hosting

## 3. Criterios de Aceptación por Sprint

## 4. Checklist de Desarrollo

## 5. Dependencias y Requisitos Técnicos

## 6. Métricas de Éxito

## 7. Estructura de Componentes
### 7.1 Componentes UI (Atoms)
### 7.2 Componentes Layout
### 7.3 Componentes Blocks
### 7.4 Árbol de Componentes por Página

## 8. Convenciones de Código

## 9. Flujo de Git

## 10. Recursos y Referencias

## 11. Próximos Pasos Post-MVP
```

**Cuándo actualizar:**
- Al completar cada sprint
- Nueva funcionalidad agregada al roadmap
- Cambio en prioridades
- Migración de herramientas
- Cada cambio técnico significativo

---

### 2.5 DEPLOY_GUIDE.md (Opcional pero recomendado)

**Propósito:** Guía paso a paso para desplegar el proyecto

**Contenido esencial:**
```markdown
# 🚀 Guía de Deploy - [Nombre del Proyecto]

## 📋 Requisitos Previos
## 🛠️ Instalación y Configuración
## 🚀 Proceso de Deploy
## 📦 Archivos Generados
## 🌐 Subir a tu Hosting
## ✅ Verificación Post-Deploy
## 🔧 Solución de Problemas
## 📊 Optimizaciones Incluidas
## 🔄 Actualizaciones Futuras
## 🎯 Comandos Rápidos
```

**Cuándo actualizar:**
- Cambios en proceso de build
- Nuevo hosting o CDN
- Nuevas optimizaciones
- Cambios en estructura de archivos

---

## 3. Sistema de Reportes

### 3.1 Estructura de Reportes

**Ubicación:** `/docs/reporte/`

**Formato de nombre:** `YYYY-MM-DD_HH-MM_descripcion-kebab-case.md`

**Ejemplos:**
- `2025-10-24_08-30_card-border-shine-effects.md`
- `2025-10-23_19-34_fix-tailwind-spacing.md`
- `2025-10-24_07-50_h1-size-increase.md`

### 3.2 Template de Reporte

```markdown
# [Título del Cambio]

**Fecha:** YYYY-MM-DD HH:MM
**Tipo:** [Enhancement | Fix | Feature | Refactor | Documentation]
**Estado:** [Completado | En Progreso | Bloqueado] ✓ | ⏳ | ❌

---

## Resumen

[1-2 párrafos explicando qué se hizo y por qué]

## Motivación

[Razón del cambio: problema reportado, solicitud de usuario, mejora proactiva]

## Implementación

### [Sección del Cambio 1]

**Archivo:** `ruta/al/archivo.ext`
**Líneas modificadas:** X, Y, Z
**Cambios realizados:** [Descripción]

[Bloque de código si es relevante]

### [Sección del Cambio 2]
[Repetir estructura]

## Archivos Modificados

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| path/to/file.ext | Modificado | Descripción del cambio |

## Resultados

### Antes:
- [Estado anterior]

### Después:
- ✓ [Mejora 1]
- ✓ [Mejora 2]

## Testing Recomendado

- [ ] Verificar X
- [ ] Probar Y
- [ ] Validar Z

## Próximos Pasos (si aplica)

[Tareas relacionadas pendientes o mejoras futuras]

---

**Implementado por:** [Nombre o "Claude" o "Claude + User"]
**Tiempo de implementación:** [Estimado]
**Líneas de código modificadas:** [Número]
```

### 3.3 Tipos de Reportes

| Tipo | Cuándo usar |
|------|-------------|
| **Feature** | Nueva funcionalidad completa |
| **Enhancement** | Mejora a funcionalidad existente |
| **Fix** | Corrección de bug o error |
| **Refactor** | Reestructuración de código sin cambio de funcionalidad |
| **Documentation** | Actualización de documentos pilares |
| **Performance** | Optimización de velocidad o rendimiento |
| **Accessibility** | Mejora de accesibilidad |

### 3.4 Cuándo Crear un Reporte

**SIEMPRE crear reporte para:**
- Cambios en design system (nuevos tokens, componentes)
- Migraciones de tecnología (ej. Tailwind v4 → v3)
- Decisiones arquitectónicas importantes
- Implementación de features completas
- Fixes de bugs críticos

**OPCIONAL crear reporte para:**
- Ajustes menores de estilo (cambio de padding, color)
- Refactors pequeños
- Correcciones de typos

---

## 4. Uso de Subagentes

### 4.1 ¿Qué son los Subagentes?

Los subagentes son instancias especializadas de Claude que se enfocan en tareas específicas y trabajan en paralelo.

**Beneficios:**
- ✅ Trabajo simultáneo en múltiples tareas
- ✅ Especialización por tipo de trabajo
- ✅ Reduce tiempo total de implementación
- ✅ Mantiene al usuario informado sin abrumarlo

### 4.2 Tipos de Subagentes Disponibles

| Subagente | Descripción | Cuándo usar |
|-----------|-------------|-------------|
| **general-purpose** | Tareas complejas multi-step | Implementar features completas |
| **Explore** | Exploración de codebase | "Dónde se maneja X?", "Cómo funciona Y?" |
| **statusline-setup** | Configurar status line de Claude Code | Setup de IDE |
| **output-style-setup** | Crear output styles | Personalización de IDE |

### 4.3 Cuándo Usar Subagentes

**✅ USA subagentes cuando:**
- Tienes múltiples tareas independientes (ej. aplicar border-shine a 5 tipos de cards)
- Necesitas explorar el codebase para entender algo
- La tarea tiene múltiples pasos y puede llevar tiempo
- Quieres trabajar en paralelo para ser más eficiente

**❌ NO uses subagentes cuando:**
- La tarea es muy simple (cambiar un valor, fix de 1 línea)
- Las tareas dependen secuencialmente una de otra
- Ya conoces exactamente el archivo y línea a modificar

### 4.4 Cómo Solicitar Trabajo con Subagentes

**Ejemplo de solicitud del usuario:**
```
"Aplica el efecto de borde brillante a:
- Las cards de servicios
- Las cards del equipo
- Las cards de casos
- Las cards de testimonios
Usa subagentes para hacerlo en paralelo"
```

**Cómo Claude responde:**
1. Crea TodoWrite con las tareas
2. Lanza múltiples subagentes en paralelo (1 por tipo de card)
3. Cada subagente reporta su resultado
4. Claude resume todo al usuario en un mensaje final

### 4.5 Template de Prompt para Subagente

```markdown
## Prompt para Subagente

**Tipo:** general-purpose | Explore

**Descripción:** [3-5 palabras]

**Prompt:**
[Contexto del proyecto]

YOUR TASK:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

IMPORTANT:
- [Restricción 1]
- [Restricción 2]

Return a summary of [qué debe reportar].
```

**Ejemplo real:**
```markdown
Apply border shine to service cards

**Prompt:**
Apply the border shine effect to all service cards in the website.

CONTEXT:
- The border shine effect class already exists in src/styles/global.css as `.border-shine-effect`
- This effect creates an animated cyan gradient on card borders on hover
- One service card (Marketing Digital) already has this effect and looks beautiful

YOUR TASK:
1. Find all service card components and pages where service cards are rendered
2. Add the `border-shine-effect` class to ALL service cards (not just Marketing Digital)
3. Ensure the effect is applied consistently across:
   - Service cards in the home page
   - Service cards in the servicios page
   - Any other locations where service cards appear

IMPORTANT:
- Only add the class, don't modify any other styling
- Make sure all service cards have the same hover effect
- Test that the class is properly added to each card element

Return a summary of which files you modified and how many service cards now have the effect.
```

---

## 5. Flujo de Trabajo Típico

### 5.1 Inicio de Sesión Nueva

**Usuario dice:** "Hola Claude, vamos a trabajar en [proyecto]"

**Claude hace:**
1. **Lee CLAUDE_GUIDE.md** → Contexto rápido del proyecto
2. **Revisa últimos reportes** → Entender qué se hizo recientemente
3. **Confirma comprensión** → "Entendido, estamos trabajando en [proyecto], última actualización fue [cambio]. ¿En qué trabajamos hoy?"

### 5.2 Recibir Nueva Tarea

**Usuario dice:** "Quiero agregar X funcionalidad"

**Claude hace:**
1. **Analiza complejidad:**
   - Simple → Hacer directamente
   - Complejo → Usar TodoWrite + Subagentes

2. **Si es complejo:**
   ```markdown
   Voy a usar el TodoWrite tool para planear:
   - Tarea 1
   - Tarea 2
   - Tarea 3

   Ahora voy a usar 3 subagentes en paralelo...
   ```

3. **Ejecuta trabajo** (silenciosamente con subagentes)

4. **Reporta resultado:**
   ```markdown
   ✅ Completado! He agregado X funcionalidad.

   ## Resumen:
   - Modificado: file1.ext, file2.ext
   - Agregado: fileN.ext
   - Total de cambios: 16 archivos

   ## Reporte:
   Documentado en [docs/reporte/2025-10-24_10-30_nombre.md]
   ```

### 5.3 Actualizar Documentos Pilares

**Usuario dice:** "Actualiza los documentos pilares con los cambios"

**Claude hace:**
1. Lee los 4 documentos pilares
2. Identifica qué secciones actualizar
3. Agrega decisiones al ADR de CLAUDE_GUIDE.md
4. Actualiza versión y fecha
5. Reporta qué se modificó

### 5.4 Crear Reporte

**Claude hace automáticamente:**
- Después de cada cambio significativo
- Formato: `YYYY-MM-DD_HH-MM_descripcion.md`
- Ubicación: `/docs/reporte/`
- Contenido completo según template

---

## 6. Setup Inicial del Proyecto

### 6.1 Checklist de Setup

Cuando inicias un proyecto NUEVO con esta metodología:

```markdown
## Fase 1: Estructura de Documentación

- [ ] Crear carpeta `/docs/`
- [ ] Crear carpeta `/docs/reporte/`
- [ ] Crear `CLAUDE_GUIDE.md` con template
- [ ] Crear `DESIGN_SYSTEM.md` con template
- [ ] Crear `ESTRATEGIA_SEO.md` con template
- [ ] Crear `PLAN_DE_DESARROLLO.md` con template
- [ ] Crear `DEPLOY_GUIDE.md` (opcional)
- [ ] Crear este `init.md` como referencia

## Fase 2: Configuración del Proyecto

- [ ] Inicializar proyecto (npm/yarn init, Astro init, etc.)
- [ ] Configurar framework/stack según decisión
- [ ] Setup Git + .gitignore
- [ ] Configurar herramientas de desarrollo (ESLint, Prettier)
- [ ] Crear estructura de carpetas base

## Fase 3: Documentar Decisiones Iniciales

- [ ] Completar sección Stack Tecnológico en PLAN_DE_DESARROLLO
- [ ] Definir Design Tokens en DESIGN_SYSTEM
- [ ] Listar keywords iniciales en ESTRATEGIA_SEO
- [ ] Crear roadmap básico en PLAN_DE_DESARROLLO

## Fase 4: Primer Commit

- [ ] Commit inicial con estructura completa
- [ ] README básico (referencia a docs/)
- [ ] Crear primer reporte: `YYYY-MM-DD_HH-MM_setup-inicial.md`
```

### 6.2 Prompt de Inicialización para Claude

Cuando inicias un proyecto nuevo, dale este prompt a Claude:

```markdown
Hola Claude, vamos a iniciar un proyecto nuevo con nuestra metodología colaborativa.

**Proyecto:** [Nombre del Proyecto]
**Objetivo:** [Descripción breve del objetivo]
**Stack inicial:** [Framework, CSS, herramientas]

Por favor:
1. Crea la estructura de documentos pilares en /docs/
2. Inicializa CLAUDE_GUIDE.md con la información que te voy a dar
3. Crea DESIGN_SYSTEM.md con un template base
4. Crea ESTRATEGIA_SEO.md con estructura básica
5. Crea PLAN_DE_DESARROLLO.md con roadmap inicial
6. Crea el primer reporte de setup

Voy a darte la información del proyecto a continuación:
[Pegar información del proyecto]
```

---

## 7. Comandos y Convenciones

### 7.1 Comandos del Usuario

| Comando | Significado | Claude hace |
|---------|-------------|-------------|
| `"usa subagentes"` | Trabajar en paralelo | Lanza múltiples agentes especializados |
| `"actualiza docs pilares"` | Sync docs con cambios | Lee y actualiza los 4 pilares |
| `"silencioso"` | No narrar trabajo | Solo reporta resultados finales |
| `"crea reporte"` | Documentar cambio | Genera reporte con timestamp |
| `"revisa [archivo]"` | Leer y analizar | Lee archivo y propone mejoras |

### 7.2 Convenciones de Naming

**Archivos de documentación:**
- PascalCase para pilares: `CLAUDE_GUIDE.md`, `DESIGN_SYSTEM.md`
- kebab-case para reportes: `2025-10-24_08-30_card-border-shine.md`

**Componentes (si aplica framework como React/Astro):**
- PascalCase: `Button.astro`, `ServiceCard.tsx`

**Páginas:**
- kebab-case: `index.astro`, `servicios.astro`

**Datos:**
- kebab-case: `services.json`, `team.json`

### 7.3 Estructura de Carpetas Recomendada

```
proyecto/
├── docs/
│   ├── CLAUDE_GUIDE.md
│   ├── DESIGN_SYSTEM.md
│   ├── ESTRATEGIA_SEO.md
│   ├── PLAN_DE_DESARROLLO.md
│   ├── DEPLOY_GUIDE.md
│   ├── init.md (este archivo)
│   └── reporte/
│       ├── 2025-10-23_14-48_setup-inicial.md
│       ├── 2025-10-24_08-30_feature-x.md
│       └── ...
├── src/
│   ├── components/
│   │   ├── ui/           (Atoms: Button, Card, Input)
│   │   ├── layout/       (Layout: Navbar, Footer, Container)
│   │   └── blocks/       (Molecules/Organisms: Hero, Grid)
│   ├── pages/
│   ├── styles/
│   └── data/
├── public/
├── package.json
└── [config files]
```

---

## 8. Best Practices

### 8.1 Para el Usuario

**DO ✓**
- Ser específico en las solicitudes ("aplica X a Y y Z")
- Pedir uso de subagentes cuando hay múltiples tareas
- Solicitar actualización de docs pilares después de cambios grandes
- Revisar reportes generados para entender qué se hizo

**DON'T ✗**
- Asumir que Claude recuerda todo de sesiones anteriores (sin CLAUDE_GUIDE)
- Pedir cambios sin contexto (Claude necesita saber el proyecto)
- Olvidar actualizar docs pilares (se vuelve desincronizado)

### 8.2 Para Claude

**DO ✓**
- Leer CLAUDE_GUIDE.md al inicio de cada sesión
- Usar TodoWrite para tareas complejas
- Crear reportes con timestamps
- Actualizar ADR en CLAUDE_GUIDE cuando hay decisiones importantes
- Usar subagentes en paralelo cuando es posible
- Ser conciso en respuestas al usuario
- Documentar TODO

**DON'T ✗**
- Asumir que tienes contexto sin leer docs
- Narrar cada paso cuando se pidió trabajo silencioso
- Olvidar crear reportes después de cambios significativos
- Modificar código sin entender el design system
- Usar emojis a menos que el usuario lo pida

### 8.3 Debugging de la Metodología

**Problema:** Claude no tiene contexto del proyecto
**Solución:** Verificar que CLAUDE_GUIDE.md exista y esté actualizado

**Problema:** Cambios no documentados
**Solución:** Revisar que se estén creando reportes en /docs/reporte/

**Problema:** Docs pilares desactualizados
**Solución:** Solicitar explícitamente actualización después de features grandes

**Problema:** Claude toma decisiones inconsistentes
**Solución:** Verificar que DESIGN_SYSTEM.md tenga reglas claras (Do's and Don'ts)

---

## 9. Ejemplo Completo de Sesión

### Sesión: Agregar Dark Mode Toggle

**Usuario:**
```
Hola Claude, quiero agregar un toggle de dark mode al navbar.
Usa subagentes para hacerlo eficientemente.
```

**Claude (internamente):**
1. Lee CLAUDE_GUIDE.md
2. Ve que hay regla "Dark-only design, NO toggle"
3. Responde al usuario

**Claude:**
```
Hola! Revisé el CLAUDE_GUIDE.md y veo que el proyecto tiene una decisión
arquitectónica de "Dark-only design" sin toggle.

Opciones:
1. Mantenemos dark-only (recomendado por simplicidad)
2. Cambiamos a dual theme (requiere refactor del design system)

¿Quieres que procedamos con opción 2? Si sí, voy a:
- Actualizar CLAUDE_GUIDE.md y DESIGN_SYSTEM.md
- Crear toggle component
- Agregar tokens para light mode
- Documentar decisión en ADR
```

**Usuario:**
```
Tienes razón, mejor mantengamos dark-only. En cambio, agrega
un efecto de shine a todos los botones en hover.
```

**Claude:**
```
Perfecto! Voy a aplicar efecto shine a todos los botones.

[Usa TodoWrite con 3 tareas]
[Lanza 3 subagentes: uno para componentes UI, uno para pages, uno para blocks]

✅ Completado! He aplicado el efecto shine a todos los botones.

## Resumen:
- Modificados: 5 archivos
- Botones afectados: 23 instancias
- Efecto: Gradiente animado en hover

## Archivos:
- src/components/ui/Button.astro
- src/styles/global.css (nuevo efecto shine-effect)
- [lista de otros archivos]

## Reporte:
Documentado en docs/reporte/2025-10-24_10-45_button-shine-effects.md
```

---

## 10. Migración de Proyecto Existente

Si ya tienes un proyecto y quieres adoptar esta metodología:

### Paso 1: Auditoría
```markdown
- [ ] Revisa decisiones técnicas tomadas
- [ ] Documenta stack actual
- [ ] Lista componentes existentes
- [ ] Identifica design tokens en uso
```

### Paso 2: Crear Docs Pilares
```markdown
- [ ] CLAUDE_GUIDE.md con estado actual
- [ ] DESIGN_SYSTEM.md con tokens extraídos
- [ ] ESTRATEGIA_SEO.md con keywords actuales
- [ ] PLAN_DE_DESARROLLO.md con roadmap futuro
```

### Paso 3: Primer Reporte
```markdown
- [ ] Crear reporte de migración: YYYY-MM-DD_HH-MM_migracion-metodologia.md
- [ ] Documentar estructura actual
- [ ] Listar archivos clave
```

### Paso 4: Commit Inicial de Docs
```markdown
git add docs/
git commit -m "docs: implementar metodología Claude + Human con documentos pilares"
```

---

## 11. Templates Rápidos

### Template: Solicitud de Feature

```markdown
**Feature:** [Nombre de la funcionalidad]

**Descripción:** [Qué debe hacer]

**Ubicación:** [Dónde debe aparecer]

**Diseño:** [Cómo debe verse (tokens de design system)]

**Comportamiento:** [Interacciones, hover states, etc.]

**Usa subagentes:** Sí / No

**Actualizar docs pilares:** Sí / No
```

### Template: Reporte de Bug

```markdown
**Bug:** [Descripción breve]

**Pasos para reproducir:**
1. Ir a [página]
2. Hacer [acción]
3. Ver [resultado incorrecto]

**Comportamiento esperado:** [Qué debería pasar]

**Comportamiento actual:** [Qué pasa en realidad]

**Archivos probables:** [Hint de dónde puede estar el bug]

**Prioridad:** Alta / Media / Baja
```

### Template: Decisión Arquitectónica (ADR)

```markdown
### [YYYY-MM-DD] [Título de la Decisión]

**Decisión:** [Qué se decidió hacer]

**Razón:** [Por qué se tomó esta decisión, qué problema resuelve]

**Alternativas consideradas:**
1. Opción A - [razón de descarte]
2. Opción B - [razón de descarte]

**Impacto:** [Consecuencias de la decisión, qué cambia]

**Trade-offs:** [Qué ganamos vs qué perdemos]

**Estado:** ✅ Implementado | ⏳ Pendiente | ❌ Revertido

**Referencias:** [Links a documentación, PRs, issues]
```

---

## 12. Glosario

| Término | Significado |
|---------|-------------|
| **Documentos Pilares** | Los 4-5 documentos core que mantienen la memoria del proyecto |
| **ADR** | Architecture Decision Record - registro de decisiones importantes |
| **Subagente** | Instancia especializada de Claude que trabaja en tarea específica |
| **TodoWrite** | Tool de Claude para tracking interno de tareas |
| **Reporte** | Documento markdown con timestamp que documenta un cambio |
| **Design Token** | Variable de diseño reutilizable (color, spacing, typography) |
| **Silent Mode** | Modo de trabajo donde Claude no narra pasos, solo reporta resultado |
| **Atomic Design** | Metodología de componentes: Atoms → Molecules → Organisms |

---

## 13. Recursos Adicionales

### Documentación de Referencia
- **Claude Code Docs:** [https://docs.claude.com/en/docs/claude-code](https://docs.claude.com/en/docs/claude-code)
- **Atomic Design:** [https://atomicdesign.bradfrost.com/](https://atomicdesign.bradfrost.com/)
- **ADR Guidelines:** [https://github.com/joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record)

### Herramientas Útiles
- **Markdown Preview:** VS Code extension para previsualizar .md
- **Git Graph:** Visualizar commits y branches
- **Todo Tree:** Resaltar TODOs en código

---

## 14. FAQ

**Q: ¿Por qué 4 documentos pilares y no solo 1?**
A: Separación de concerns. Cada documento tiene un propósito específico y se actualiza en momentos diferentes. CLAUDE_GUIDE es contexto rápido, DESIGN_SYSTEM es referencia visual, ESTRATEGIA_SEO es marketing, PLAN_DE_DESARROLLO es ejecución.

**Q: ¿Tengo que crear reportes para CADA cambio?**
A: No. Solo para cambios significativos: nuevas features, fixes importantes, decisiones arquitectónicas, migraciones de tecnología. Cambios menores (typos, ajustes de padding) no necesitan reporte.

**Q: ¿Qué pasa si los docs pilares se desactualizan?**
A: Claude pierde contexto y puede tomar decisiones inconsistentes. Solución: Pedir explícitamente "actualiza los docs pilares" cada 5-10 cambios significativos.

**Q: ¿Puedo usar esta metodología con otro AI (no Claude)?**
A: Sí, pero deberás adaptar la parte de subagentes (específico de Claude). Los docs pilares y reportes funcionan con cualquier AI o incluso sin AI.

**Q: ¿Cuánto tiempo toma el setup inicial?**
A: Entre 1-2 horas para crear los 4 docs pilares con contenido básico. Después, el mantenimiento es incremental (~5-10 min por actualización).

---

## 15. Conclusión

Esta metodología está diseñada para:
- ✅ **Mantener contexto** entre sesiones de Claude
- ✅ **Documentar decisiones** de forma automática
- ✅ **Trabajar eficientemente** con subagentes en paralelo
- ✅ **Escalar proyectos** sin perder coherencia
- ✅ **Onboardear rápido** a nuevos developers (humanos o AI)

**Regla de Oro:** Si duda, documenta. Los docs pilares son tu memoria externa.

---

**Última actualización:** 2025-10-24
**Versión:** 1.0
**Creado por:** Digitalismo + Claude AI
**Licencia:** Libre para uso en proyectos propios

---

**¿Preguntas o mejoras a esta metodología?**
Crea un issue o discusión en el repositorio del proyecto.

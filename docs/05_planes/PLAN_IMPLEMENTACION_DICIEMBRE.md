# Plan de Implementación - Cambios Web EMED (Diciembre 2025)

## Resumen Ejecutivo

Este documento describe la estrategia de implementación de todos los cambios solicitados para la web de EMED, basándose en el plan de cambios detallado en `plan_cambios_web_diciembre.md`.

**Duración estimada:** Implementación completa en fases ordenadas
**Alcance:** Sin cambios de alcance - solo correcciones e implementaciones según lo solicitado

---

## Análisis del Estado Actual

### Estructura del Proyecto
- **Framework:** Astro (SSG)
- **Estilos:** Tailwind CSS v4
- **Componentes React:** Para funcionalidades interactivas (mapas, etc.)
- **Source of Truth:** Archivos JSON en `/src/data/`:
  - `diplomados.json` - Datos de los 3 diplomados
  - `cursos.json` - Datos de cursos
  - `productos.json` - Consolidado de todos los productos

### Problemas Identificados

1. **Metadata inconsistente:** Los datos actuales en `diplomados.json` NO coinciden con lo solicitado
   - Mediación Familiar: 120h (debe ser 220h), $450.000 (debe ser desde $750.000), "Presencial + Online" (debe ser "Online + Presencial (Prácticas)")
   - Mediación Escolar: 80h (debe ser 240h), $320.000 (debe ser desde $450.000)
   - Mediación Laboral: 100h (debe ser 240h), Presencial (debe ser 100% Online), $380.000 (debe ser desde $480.000)

2. **Contenido hardcodeado:** Algunos textos están directamente en archivos `.astro` en lugar de estar centralizados

3. **Falta de componentes:** No existen componentes para:
   - Mallas curriculares/Plan de estudios con acordeón
   - Sección de metodología híbrida
   - Bloques de diferenciación

---

## Estrategia de Implementación

### Principio Central: "Single Source of Truth"

Toda la metadata de programas estará centralizada en los archivos JSON. Los componentes renderizarán dinámicamente desde estos datos. Esto garantiza:
- ✅ Consistencia en toda la web (cards, fichas, bloques)
- ✅ Fácil mantenimiento futuro
- ✅ Sin inconsistencias entre secciones

---

## Fases de Implementación

### FASE 1: Centralización de Datos (CRÍTICO)

**Objetivo:** Actualizar archivos JSON con metadata correcta y estructura ampliada

#### 1.1 Actualizar `src/data/diplomados.json`

Para cada diplomado, actualizar:

**Mediación Familiar:**
```json
{
  "duracion": "220 horas",
  "modalidad": "Online + Presencial (Prácticas)",
  "precio_formateado": "desde $750.000",
  "precio": 750000,
  "duracion_online": "170 horas",
  "duracion_presencial": "50 horas",
  "diferenciadores": [
    "Metodología basada en casos reales del sistema judicial chileno",
    "Docentes mediadores activos con años de experiencia práctica",
    "Pasantía obligatoria en centros de mediación familiar reconocidos",
    "Seguimiento post-certificación para inserción laboral efectiva"
  ],
  "malla_curricular": [
    {
      "modulo": "Módulo 1: Fundamentos Mediación Familiar",
      "horas": 30,
      "contenido": [...]
    },
    {
      "modulo": "Módulo 2: Técnicas y Herramientas Especializadas",
      "horas": 35,
      "contenido": [...]
    },
    {
      "modulo": "Módulo 3: Práctica Supervisada",
      "horas": 30,
      "contenido": [...]
    },
    {
      "modulo": "Módulo 4: Pasantía Obligatoria",
      "horas": 25,
      "tipo": "presencial",
      "contenido": [...]
    }
  ],
  "formacion_online": {
    "etapa_asincronica": {
      "titulo": "Etapa asincrónica (plataforma)",
      "descripcion": "acceso 24/7, estudio a ritmo propio, material/actividades"
    },
    "etapa_sincronica": {
      "titulo": "Etapa sincrónica (Zoom)",
      "descripcion": "sesiones en vivo (no grabadas), formato taller, reflexión en grupo, dudas con docente"
    }
  },
  "cta_mensaje": "Un asesor académico te contactará para resolver tus dudas referentes a tu formación como mediador familiar y posterior inscripción en el registro de mediadores del Ministerio de Justicia."
}
```

**Mediación Escolar:**
```json
{
  "duracion": "240 horas",
  "modalidad": "100% online",
  "precio_formateado": "desde $450.000",
  "precio": 450000,
  "titulo_principal": "Transformando la Convivencia Escolar",
  "metodologia_adaptada": {
    "titulo": "Metodología adaptada a trabajo escolar",
    "descripcion": "100% online + sincrónico/asincrónico + talleres virtuales; orientado a compatibilizar jornada"
  },
  "beneficios_unicos": [
    "Flexibilidad horaria total",
    "Material descargable permanente",
    "Casos prácticos del ámbito educativo",
    "Certificación válida para instituciones educativas",
    "Herramientas digitales incluidas",
    "Comunidad de práctica"
  ],
  "certificacion_detallada": "mención a NCH 2728 + reconocimiento",
  "campo_aplicacion": [
    "Colegios y liceos",
    "Departamentos de convivencia escolar",
    "MINEDUC",
    "Consultorías educativas",
    "Proyectos gubernamentales"
  ]
}
```

**Mediación Laboral:**
```json
{
  "duracion": "240 horas",
  "modalidad": "100% online",
  "precio_formateado": "desde $480.000",
  "precio": 480000,
  "impacto_organizacion": [
    "Reducción de conflictos laborales",
    "Mejora del clima organizacional",
    "Aumento de productividad",
    "Disminución de rotación de personal"
  ],
  "programa_empresarial": [
    {
      "modulo": "Diagnóstico de Conflictos Organizacionales",
      "horas": 25
    },
    {
      "modulo": "Mediación en Relaciones Laborales",
      "horas": 30
    },
    {
      "modulo": "Marco Legal Laboral Chileno",
      "horas": 20
    },
    {
      "modulo": "Práctica Empresarial Intensiva",
      "horas": 25
    }
  ],
  "casos_reales": "Lista de casos empresariales reales",
  "beneficios_empresariales": [
    "Reducción de costos por litigios",
    "Mejora en retención de talento",
    "Ambiente laboral más saludable",
    "Cumplimiento normativo"
  ]
}
```

#### 1.2 Sincronizar `productos.json`
Actualizar el archivo consolidado con los mismos cambios para mantener coherencia.

---

### FASE 2: Componentes Reutilizables

**Objetivo:** Crear componentes genéricos que rendericen desde los datos JSON

#### 2.1 Componente `PlanEstudios.astro`
Acordeón interactivo para mostrar mallas curriculares:
- Props: `modulos` (array de objetos)
- Renderiza módulos con horas
- Acordeón con animaciones
- Responsive

#### 2.2 Componente `MetodologiaHibrida.astro`
Bloque comparativo Online vs Presencial:
- Props: `horasOnline`, `horasPresencial`, `detalles`
- Dos columnas con iconos
- Bullets por modalidad

#### 2.3 Componente `Diferenciadores.astro`
Lista de puntos que diferencian el programa:
- Props: `items` (array de strings)
- Checkmarks con iconos
- Diseño limpio

#### 2.4 Componente `FormacionOnline.astro`
Estructura de 2 etapas (asincrónica/sincrónica):
- Props: `etapas` (objeto con 2 fases)
- Diseño visual atractivo

---

### FASE 3: Actualizar Páginas de Diplomados

**Objetivo:** Actualizar archivos `.astro` para usar datos JSON y nuevos componentes

#### 3.1 `/src/pages/diplomados/mediacion-familiar.astro`

**Cambios:**
1. Hero:
   - Actualizar badges: "Online + Presencial (Prácticas)"
   - Mostrar "220 horas", "desde $750.000"

2. Sección "Lo que te diferenciará":
   - Reemplazar bullets hardcodeados por `diplomadoWC.diferenciadores`
   - Usar componente `<Diferenciadores />`

3. Plan de Estudios:
   - Reemplazar acordeón hardcodeado
   - Usar componente `<PlanEstudios modulos={diplomadoWC.malla_curricular} />`
   - Mostrar horas por módulo

4. Sección "¿Cómo es la formación online?":
   - Usar componente `<FormacionOnline etapas={diplomadoWC.formacion_online} />`

5. Metodología:
   - Usar componente `<MetodologiaHibrida horasOnline={170} horasPresencial={50} />`

6. CTA:
   - Reemplazar mensaje por `{diplomadoWC.cta_mensaje}`

7. Sidebar "Información del Programa":
   - Renderizar desde JSON: `{duracion}`, `{modalidad}`, `{precio_formateado}`

#### 3.2 `/src/pages/diplomados/mediacion-escolar.astro`

**Cambios:**
1. Metadata: 240 horas, 100% online, desde $450.000
2. Copy: Usar `diplomadoWC.titulo_principal`
3. Metodología: Usar `diplomadoWC.metodologia_adaptada`
4. Beneficios únicos: Renderizar desde `diplomadoWC.beneficios_unicos`
5. Campo de aplicación: Usar `diplomadoWC.campo_aplicacion`

#### 3.3 `/src/pages/diplomados/mediacion-laboral.astro`

**Cambios:**
1. Metadata: 240 horas, 100% online, desde $480.000
2. Impacto organizacional: Usar `diplomadoWC.impacto_organizacion`
3. Plan de estudios empresarial: Componente con `diplomadoWC.programa_empresarial`
4. Beneficios empresariales: Renderizar desde JSON

---

### FASE 4: Actualizar Home y Cards

**Objetivo:** Asegurar que cards y home muestren metadata correcta

#### 4.1 Componente `ProgramsGrid.astro`
- Leer datos desde JSON
- Renderizar cards con: horas, modalidad, precio "desde"
- Consistencia total con fichas

#### 4.2 Home (`/src/pages/index.astro`)
- Sección "Impacto Social":
  - Actualizar título a "Impacto Social Positivo" / "Nuestro Impacto en Mediación Familiar"
  - Verificar que logo EMED se visualice
  - Mostrar aranceles como "desde" + nota de facilidades de pago

---

### FASE 5: Cambios Transversales

#### 5.1 Formularios: Eliminar horario "noche (18 a 21)"
- Buscar componente de formularios (`ContactForm.astro`, etc.)
- Eliminar opción de horario nocturno
- Verificar en todos los formularios

#### 5.2 Limpieza de "SENCE"
**Ubicaciones a limpiar:**
- Página Financiamiento (`/src/pages/financiamiento.astro`)
- CTA final (buscar en componentes)
- Mantener estructura, solo eliminar la palabra "SENCE"

#### 5.3 Hero Slider (Home)
- Actualizar slide 3: Cambiar "ACREDITADOS POR SENCE E IRAM" a solo mencionar acreditaciones válidas

---

### FASE 6: Secciones Institucionales

#### 6.1 Página "Nosotros" / "Quiénes Somos"
- Reemplazar bloque completo (20+ años, mediación viva, propósito)
- Agregar "Promesa de Valor" con 3 items:
  - Formación práctica
  - Acompañamiento
  - Certificación
- **Agregar:** "Certificación IPCHILE para Mediación Familiar"

#### 6.2 Misión y Visión
- Mantener texto de misión (competencias técnicas y socioemocionales)
- Actualizar "Visión": impulsar cultura de diálogo/cuidado; mediación como práctica cotidiana

#### 6.3 "Fórmate con nosotros"
- Reordenar con 4 ejes: acompañamiento, excelencia, flexibilidad, respaldo/certificaciones

#### 6.4 Financiamiento
- Eliminar "SENCE" donde se indica
- Mantener contenido sobre modalidades de estudio
- Coherencia con modalidades de diplomados (escolar y laboral = 100% online)

---

### FASE 7: Testing y QA

#### 7.1 Checklist de Consistencia
- ✅ Horas/modalidad/arancel idénticos en: Home cards, listados, fichas, bloques
- ✅ Responsive: acordeones y cajas de metodología en mobile
- ✅ Formularios: sin opción "noche (18–21)"
- ✅ Búsqueda de texto: "SENCE" no aparece en bloques indicados
- ✅ Logos: EMED visible en sección Impacto y certificaciones

#### 7.2 Testing Cross-Browser
- Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Android

#### 7.3 Testing de Performance
- Lighthouse scores
- Tiempo de carga
- Imágenes optimizadas

---

## Orden de Implementación Recomendado

### Semana 1: Fundamentos
1. ✅ Actualizar `diplomados.json` con toda la metadata correcta
2. ✅ Sincronizar `productos.json`
3. ✅ Crear componentes reutilizables:
   - `PlanEstudios.astro`
   - `MetodologiaHibrida.astro`
   - `Diferenciadores.astro`
   - `FormacionOnline.astro`

### Semana 2: Diplomados
4. ✅ Actualizar ficha Mediación Familiar
5. ✅ Actualizar ficha Mediación Escolar
6. ✅ Actualizar ficha Mediación Laboral

### Semana 3: Transversal y Home
7. ✅ Actualizar componente `ProgramsGrid.astro`
8. ✅ Actualizar Home (sección Impacto, cards)
9. ✅ Limpiar formularios (eliminar horario noche)
10. ✅ Eliminar "SENCE" de secciones indicadas

### Semana 4: Institucional y QA
11. ✅ Actualizar secciones institucionales (Nosotros, Misión, Visión, Fórmate, Financiamiento)
12. ✅ Testing completo según checklist
13. ✅ Correcciones finales
14. ✅ Deploy a producción

---

## Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Inconsistencias al actualizar JSON | Alto | Crear script de validación que verifique coherencia |
| Componentes no responsive | Medio | Testing mobile-first, usar Tailwind responsive utilities |
| Pérdida de SEO por cambios de contenido | Medio | Mantener meta tags, URLs y estructura semántica |
| Formularios rotos | Alto | Testing exhaustivo de todos los formularios |
| Enlaces rotos | Medio | Validación de links antes de deploy |

---

## Métricas de Éxito

1. ✅ **Consistencia total:** Mismo programa muestra mismas horas/modalidad/precio en toda la web
2. ✅ **Sin menciones SENCE:** 0 apariciones en bloques indicados
3. ✅ **Formularios limpios:** Sin opción horario noche en ningún formulario
4. ✅ **Performance:** Lighthouse score >90 en todas las páginas
5. ✅ **Zero bugs:** Ningún error 404, formulario roto o layout quebrado

---

## Notas Técnicas

### Comandos útiles
```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Preparar assets
npm run prepare:assets
```

### Estructura de archivos clave
```
EMED-web/
├── src/
│   ├── data/
│   │   ├── diplomados.json          ← SOURCE OF TRUTH
│   │   ├── cursos.json
│   │   └── productos.json           ← Sync con diplomados.json
│   ├── pages/
│   │   ├── index.astro              ← Home
│   │   ├── diplomados/
│   │   │   ├── mediacion-familiar.astro
│   │   │   ├── mediacion-escolar.astro
│   │   │   └── mediacion-laboral.astro
│   │   ├── financiamiento.astro
│   │   └── nosotros.astro
│   ├── components/
│   │   ├── sections/
│   │   │   ├── ProgramsGrid.astro   ← Cards de programas
│   │   │   ├── PlanEstudios.astro   ← NUEVO
│   │   │   ├── MetodologiaHibrida.astro ← NUEVO
│   │   │   └── Diferenciadores.astro ← NUEVO
│   │   └── forms/
│   │       └── ContactForm.astro    ← Limpiar horarios
│   └── lib/
│       └── productos.ts              ← Funciones de acceso a datos
```

---

## Conclusión

Este plan garantiza:
- ✅ **Centralización:** Un solo lugar para actualizar metadata
- ✅ **Consistencia:** Imposible que haya discrepancias
- ✅ **Mantenibilidad:** Cambios futuros son simples
- ✅ **Escalabilidad:** Fácil agregar nuevos diplomados

La clave está en seguir el principio **"Single Source of Truth"**: los archivos JSON son la verdad absoluta, y todos los componentes solo renderizan desde ahí.

---

**Próximo paso:** Comenzar con FASE 1 - Actualizar archivos JSON con toda la metadata correcta.

# Plan de Desarrollo: Actualización Mediación Escolar - Malla 2026

## 📋 Resumen Ejecutivo

Actualizar la página del Diplomado en Mediación Escolar para reflejar la nueva malla 2026, con estructura de **3 etapas consecutivas** (Curso 1 + Curso 2 + Ciclo de Diplomado), manteniendo la estética premium actual.

---

## 🎯 Objetivos

1. Reflejar la nueva estructura de "Ruta de Aprendizaje" con 3 etapas
2. Actualizar contenidos según la malla 2026 proporcionada
3. Preparar la página para futura V2 donde los cursos serán independientes
4. Mantener la estética y UX premium actual

---

## 📦 Cambios a Implementar

### FASE 1: Actualizar JSON de Datos (diplomados.json)

**Archivo:** `src/data/diplomados.json`

#### 1.1 Actualizar campo `modalidad`
```json
// ANTES
"modalidad": "100% online"

// DESPUÉS  
"modalidad": "Online (Asincrónico + Sincrónico)"
```

#### 1.2 Reemplazar `temario` completo con nueva estructura
```json
"temario": [
  {
    "modulo": "Curso 1: Bases Psicosociales de la Convivencia Escolar",
    "grupo": "Formación Asincrónica",
    "horas_estimadas": "Acceso en plataforma",
    "resumen": "Fundamentos psicosociales para comprender y abordar la convivencia escolar.",
    "competencias": [
      "Comprender la relación entre sociedad y conflicto en el contexto escolar",
      "Desarrollar competencias psicosociales para la intervención educativa",
      "Aplicar inteligencia emocional en situaciones conflictivas"
    ],
    "contenido": [
      "Sociedad y conflicto",
      "Competencias psicosociales (Parte I)",
      "Competencias psicosociales (Parte II)",
      "Competencias psicoemocionales",
      "Inteligencia emocional y técnicas de manejo de situaciones conflictivas"
    ],
    "evidencia": "Cuestionarios en plataforma"
  },
  {
    "modulo": "Curso 2: Mediación desde el Enfoque MINEDUC",
    "grupo": "Formación Asincrónica",
    "horas_estimadas": "Acceso en plataforma",
    "resumen": "Marco normativo y metodológico del MINEDUC para la mediación escolar.",
    "competencias": [
      "Dominar el enfoque MINEDUC para la convivencia escolar",
      "Diseñar e implementar programas de mediación escolar",
      "Aplicar técnicas de mediación adaptadas al contexto educativo"
    ],
    "contenido": [
      "Enfoque MINEDUC (Parte I)",
      "Enfoque MINEDUC (Parte II)",
      "Introducción a la mediación escolar",
      "Elaboración y gestión de un programa de mediación escolar",
      "Mediación y su aplicación en el contexto escolar"
    ],
    "evidencia": "Cuestionarios en plataforma"
  },
  {
    "modulo": "Ciclo de Diplomado: Jornadas en Vivo",
    "grupo": "Formación Sincrónica (Zoom)",
    "horas_estimadas": "Clases en vivo",
    "resumen": "Aplicación práctica intensiva con docentes expertos en tiempo real.",
    "competencias": [
      "Integrar conocimientos teóricos en la práctica mediadora",
      "Conducir procesos de mediación escolar con casos reales",
      "Diseñar protocolos de intervención para establecimientos"
    ],
    "contenido": [
      "Enfoque MINEDUC (aplicación práctica)",
      "Elaboración y gestión de un programa de mediación escolar",
      "Técnicas de Mediación Escolar",
      "Taller de Casos"
    ],
    "evidencia": "Participación activa y evaluación práctica"
  }
]
```

#### 1.3 Actualizar `requisitos`
```json
"requisitos": [
  "Personas que trabajan actualmente en establecimientos escolares o desean integrarse a este ámbito",
  "Interés en la convivencia y mediación escolar",
  "Conocimiento básico del contexto escolar (deseable, no excluyente)",
  "Acceso a internet estable"
]
```

#### 1.4 Actualizar `certificacion`
```json
"certificacion": [
  "Diploma de Especialización en Mediación Escolar",
  "Acreditación bajo la norma NCh 2728",
  "Reconocimiento SENCE",
  "Válido para instituciones educativas públicas y privadas de Chile"
]
```

#### 1.5 Actualizar `empleabilidad` / `campo_aplicacion`
```json
"empleabilidad": [
  "Colegios y liceos públicos y privados",
  "Equipos y departamentos de convivencia escolar",
  "Supervisión y apoyo técnico-pedagógico (MINEDUC y sostenedores)",
  "Consultoría y asesoría educativa",
  "Proyectos y programas de educación (organismos públicos, fundaciones, ONG)"
]
```

#### 1.6 Agregar nuevo campo `ruta_aprendizaje`
```json
"ruta_aprendizaje": {
  "descripcion": "La formación se organiza en 3 etapas consecutivas, donde cada curso es requisito del siguiente y el Diplomado se obtiene al completar toda la ruta.",
  "etapas": [
    {
      "numero": 1,
      "nombre": "Curso 1: Bases Psicosociales de la Convivencia Escolar",
      "modalidad": "Online asincrónico",
      "descripcion": "Fundamentos teóricos en plataforma de estudio"
    },
    {
      "numero": 2,
      "nombre": "Curso 2: Mediación desde el enfoque MINEDUC",
      "modalidad": "Online asincrónico",
      "descripcion": "Marco normativo y metodológico MINEDUC"
    },
    {
      "numero": 3,
      "nombre": "Ciclo de Diplomado",
      "modalidad": "Jornadas en vivo por Zoom",
      "descripcion": "Aplicación práctica con docentes expertos"
    }
  ]
}
```

#### 1.7 Actualizar `metodologia`
```json
"metodologia": [
  {
    "titulo": "Formación Asincrónica",
    "icono": "laptop",
    "descripcion": "Acceso 24/7 a plataforma de estudio con material didáctico, videos y cuestionarios. Avanza a tu ritmo."
  },
  {
    "titulo": "Formación Sincrónica", 
    "icono": "video",
    "descripcion": "Clases en vivo por Zoom con docentes expertos. Talleres prácticos, análisis de casos y resolución de dudas en tiempo real."
  }
]
```

---

### FASE 2: Actualizar Página mediacion-escolar.astro

**Archivo:** `src/pages/diplomados/mediacion-escolar.astro`

#### 2.1 Actualizar badges del Hero
- Cambiar badge "100% online" → "Online Mixto"
- Mantener badge "CONVIVENCIA ESCOLAR"

#### 2.2 Agregar nueva sección "Ruta de Aprendizaje"
Ubicación: Después de "¿Por qué elegir el diplomado?" y antes de "Metodología"

```html
<!-- Nueva Sección: Ruta de Aprendizaje -->
<div class="bg-white rounded-2xl p-8 shadow-lg">
  <h2 class="text-3xl font-bold text-gray-800" style="margin-bottom: 10px;">
    Ruta de Aprendizaje
  </h2>
  <p class="text-lg text-gray-600 mb-8 leading-relaxed">
    La formación se organiza en <strong>3 etapas consecutivas</strong>, donde cada curso 
    es requisito del siguiente y el Diplomado se obtiene al completar toda la ruta:
  </p>
  
  <!-- Timeline Visual con 3 etapas -->
  <div class="space-y-6">
    <!-- Etapa 1 -->
    <div class="flex items-start">
      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-celeste text-white flex items-center justify-center font-bold text-xl">
        1
      </div>
      <div class="ml-4 flex-1">
        <div class="bg-gradient-to-r from-celeste/10 to-transparent p-4 rounded-xl border-l-4 border-celeste">
          <h4 class="font-bold text-gray-800">Curso 1: Bases Psicosociales de la Convivencia Escolar</h4>
          <span class="inline-block mt-1 px-2 py-0.5 bg-celeste/20 text-celeste text-xs font-semibold rounded">
            Online Asincrónico
          </span>
          <p class="text-gray-600 text-sm mt-2">Fundamentos teóricos en plataforma de estudio</p>
        </div>
      </div>
    </div>
    
    <!-- Conector -->
    <div class="ml-6 w-0.5 h-4 bg-gray-200"></div>
    
    <!-- Etapa 2 -->
    <div class="flex items-start">
      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-turquesa text-white flex items-center justify-center font-bold text-xl">
        2
      </div>
      <div class="ml-4 flex-1">
        <div class="bg-gradient-to-r from-turquesa/10 to-transparent p-4 rounded-xl border-l-4 border-turquesa">
          <h4 class="font-bold text-gray-800">Curso 2: Mediación desde el enfoque MINEDUC</h4>
          <span class="inline-block mt-1 px-2 py-0.5 bg-turquesa/20 text-turquesa text-xs font-semibold rounded">
            Online Asincrónico
          </span>
          <p class="text-gray-600 text-sm mt-2">Marco normativo y metodológico MINEDUC</p>
        </div>
      </div>
    </div>
    
    <!-- Conector -->
    <div class="ml-6 w-0.5 h-4 bg-gray-200"></div>
    
    <!-- Etapa 3 (Diplomado) -->
    <div class="flex items-start">
      <div class="flex-shrink-0 w-12 h-12 rounded-full bg-naranja text-white flex items-center justify-center font-bold text-xl">
        3
      </div>
      <div class="ml-4 flex-1">
        <div class="bg-gradient-to-r from-naranja/10 to-transparent p-4 rounded-xl border-l-4 border-naranja">
          <h4 class="font-bold text-gray-800">Ciclo de Diplomado</h4>
          <span class="inline-block mt-1 px-2 py-0.5 bg-naranja/20 text-naranja text-xs font-semibold rounded">
            Jornadas en Vivo (Zoom)
          </span>
          <p class="text-gray-600 text-sm mt-2">Aplicación práctica con docentes expertos</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Nota informativa -->
  <div class="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start">
    <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    <div class="ml-3">
      <p class="text-green-800 font-semibold">Este Diplomado incluye todo el paquete</p>
      <p class="text-green-700 text-sm">Al inscribirte obtienes acceso a Curso 1 + Curso 2 + Ciclo de Certificación, todo incluido en una sola matrícula.</p>
    </div>
  </div>
</div>
```

#### 2.3 Actualizar sección de Metodología
Reemplazar `MetodologiaOnline` con contenido específico que explique:
- **Asincrónico**: Material en plataforma, acceso 24/7, cuestionarios
- **Sincrónico**: Clases en vivo por Zoom, talleres prácticos

#### 2.4 Actualizar sección de Certificación
- Agregar mención a NCh 2728
- Agregar reconocimiento SENCE
- Especificar validez para instituciones públicas y privadas

#### 2.5 Actualizar sección de Campo Laboral
Usar los 5 campos de aplicación nuevos con iconos apropiados.

#### 2.6 Actualizar Malla (NewPlanEstudios)
El componente ya debería funcionar con la nueva estructura del temario en JSON.

---

### FASE 3: Actualizar Información del Sidebar

#### 3.1 Ajustar información del programa
- Modalidad: "Online (Asincrónico + Sincrónico)"
- Mantener duración si sigue siendo 240 horas
- Confirmar precio actual

---

## 📝 Orden de Ejecución

| # | Tarea | Archivo | Prioridad |
|---|-------|---------|-----------|
| 1 | Actualizar JSON con nueva malla | `diplomados.json` | 🔴 Alta |
| 2 | Actualizar badge modalidad en Hero | `mediacion-escolar.astro` | 🔴 Alta |
| 3 | Agregar sección "Ruta de Aprendizaje" | `mediacion-escolar.astro` | 🔴 Alta |
| 4 | Actualizar sección Metodología | `mediacion-escolar.astro` | 🟡 Media |
| 5 | Actualizar sección Certificación | `mediacion-escolar.astro` | 🟡 Media |
| 6 | Actualizar sección Campo Laboral | `mediacion-escolar.astro` | 🟡 Media |
| 7 | Actualizar requisitos (vienen del JSON) | Auto | 🟢 Baja |
| 8 | Verificar funcionamiento NewPlanEstudios | `mediacion-escolar.astro` | 🟢 Baja |
| 9 | Ajustar sidebar si es necesario | `mediacion-escolar.astro` | 🟢 Baja |

---

## 🔮 Preparación para V2 (Cursos Independientes)

La estructura del JSON con `ruta_aprendizaje` y temario modular permite:
- En V2, crear páginas individuales para cada curso
- Mostrar que son "parte del diplomado" o "curso independiente"
- Ofrecer precios separados por curso
- Mantener consistencia de datos entre página del diplomado y cursos individuales

---

## ⏱️ Estimación de Tiempo

| Fase | Tiempo Estimado |
|------|-----------------|
| Fase 1 (JSON) | 10 minutos |
| Fase 2 (Página) | 25 minutos |
| Fase 3 (Sidebar) | 5 minutos |
| **Total** | **~40 minutos** |

---

## ✅ Checklist Final

- [ ] JSON actualizado con nueva malla
- [ ] Badge de modalidad actualizado
- [ ] Sección "Ruta de Aprendizaje" visible
- [ ] Metodología refleja asincrónico + sincrónico
- [ ] Certificación incluye NCh 2728 y SENCE
- [ ] Campo laboral actualizado
- [ ] Requisitos actualizados
- [ ] Malla muestra los 3 bloques correctamente
- [ ] Prueba visual completa en navegador

# 📋 Guía Completa: Crear Diplomados en WordPress/WooCommerce

## ⚠️ IMPORTANTE - Problemas Solucionados

Esta guía incluye las correcciones para los problemas que tuvimos:
- ✅ Infinite recursion en wp.ts **SOLUCIONADO**
- ✅ Mapping de campos ACF **ACTUALIZADO** 
- ✅ Configuración de REST API **VERIFICADA**

## 🔧 Pre-requisitos

1. **Plugin ACF activado** en WordPress
2. **Código ACF copiado** en functions.php desde: `wordpress-config/acf-emed-fields.php`
3. **WooCommerce configurado** con claves API

---

## 📝 Paso 1: Configuración Básica WooCommerce

### Para cada diplomado:

1. Ve a **WooCommerce > Productos > Añadir nuevo**
2. **Tipo de producto**: Producto simple (no variable, no agrupado)
3. **Estado**: Borrador primero, Publicar después de completar

---

## 🎯 DIPLOMADO 1: MEDIACIÓN FAMILIAR

### Datos Básicos WooCommerce:
```
✅ Nombre del producto: Diplomado en Mediación Familiar
✅ Slug: mediacion-familiar
✅ Descripción corta: Especialízate en la resolución de conflictos familiares con técnicas específicas para dinámicas familiares complejas y casos de alta sensibilidad emocional.
✅ Descripción completa: Este diplomado está diseñado para profesionales que deseen especializarse en la mediación de conflictos familiares. Aborda desde los fundamentos teóricos hasta la práctica supervisada, cumpliendo con todos los requisitos del Ministerio de Justicia para el registro oficial de mediadores familiares.
✅ Precio regular: 450000
✅ Precio de venta: 350000
✅ Destacar producto: ✅ SÍ marcado
✅ Estado stock: En stock
```

### 🔑 Campos ACF (EMED - Información del Programa):

**IMPORTANTE**: Los campos aparecen al final de la página de edición del producto.

```
✅ Tipo de Programa: Diplomado (seleccionar del dropdown)

✅ Duración: 120 horas

✅ Modalidad: Presencial + Online (o "Mixto" si está disponible)

✅ Programa Destacado: ✅ SÍ marcado

✅ Ubicación: Santiago Centro

✅ Beneficios del Programa (Agregar UNO POR UNO):
1. Certificación reconocida por el Ministerio de Justicia
2. Prácticas con casos reales supervisados
3. Inserción en registro oficial de mediadores
4. Metodología actualizada según normativa vigente
5. Networking con profesionales del área
6. Material de apoyo descargable
7. Seguimiento post-certificación

✅ Temario del Programa (Agregar UNO POR UNO):
1. Módulo 1: Fundamentos de la Mediación Familiar (30 horas)
2. Módulo 2: Técnicas y Herramientas Especializadas (35 horas)
3. Módulo 3: Práctica Supervisada (30 horas)
4. Módulo 4: Pasantía Obligatoria (25 horas presenciales)

✅ Requisitos de Ingreso (Agregar UNO POR UNO):
1. Título profesional universitario de al menos 8 semestres
2. Experiencia laboral mínima de 2 años
3. Entrevista personal con equipo académico
4. Carta de motivación
5. Disponibilidad para asistir a pasantía presencial

✅ Metodología (Agregar UNO POR UNO):
1. Modalidad híbrida que combina clases teóricas online con talleres prácticos presenciales
2. La pasantía final es 100% presencial según normativa del Ministerio de Justicia

✅ Certificación (Agregar UNO POR UNO):
1. Diploma de Especialización en Mediación Familiar otorgado por EMED
2. Válido para inscripción en el Registro de Mediadores del Ministerio de Justicia

✅ Empleabilidad (Agregar UNO POR UNO):
1. Centros de Mediación Familiar
2. Tribunales de Familia
3. Consultoría independiente
4. ONGs especializadas
5. Servicios municipales
```

---

## 🎯 DIPLOMADO 2: MEDIACIÓN ESCOLAR

### Datos Básicos WooCommerce:
```
✅ Nombre del producto: Diplomado en Mediación Escolar
✅ Slug: mediacion-escolar
✅ Descripción corta: Aprende a mediar conflictos educativos trabajando con estudiantes, padres y equipos docentes en ambientes escolares complejos.
✅ Descripción completa: Formación especializada para profesionales de la educación que buscan implementar programas de mediación escolar efectivos. Incluye herramientas específicas para el trabajo con menores y metodologías adaptadas al contexto educativo.
✅ Precio regular: 320000
✅ Precio de venta: 250000
✅ Destacar producto: ❌ NO marcado
✅ Estado stock: En stock
```

### 🔑 Campos ACF (EMED - Información del Programa):
```
✅ Tipo de Programa: Diplomado

✅ Duración: 80 horas

✅ Modalidad: Online

✅ Programa Destacado: ❌ NO marcado

✅ Ubicación: (Dejar vacío - es online)

✅ Beneficios del Programa (Agregar UNO POR UNO):
1. Flexibilidad horaria total para profesores
2. Material descargable permanente
3. Casos prácticos del ámbito educativo chileno
4. Certificación válida para instituciones educativas
5. Herramientas digitales incluidas
6. Acceso a comunidad de práctica educativa

✅ Temario del Programa (Agregar UNO POR UNO):
1. Módulo 1: Convivencia Escolar y Diagnóstico (20 horas)
2. Módulo 2: Mediación Entre Pares (20 horas)
3. Módulo 3: Mediación con Familias y Comunidad Educativa (25 horas)
4. Módulo 4: Proyecto de Implementación (15 horas)

✅ Requisitos de Ingreso (Agregar UNO POR UNO):
1. Título en educación o afines
2. Experiencia en establecimientos educacionales
3. Conocimiento básico de convivencia escolar
4. Acceso a internet estable

✅ Metodología (Agregar UNO POR UNO):
1. 100% online con clases sincrónicas semanales
2. Material asincrónico disponible 24/7
3. Talleres prácticos virtuales
4. Evaluaciones asincrónicas

✅ Certificación (Agregar UNO POR UNO):
1. Diploma de Especialización en Mediación Escolar
2. Reconocido por instituciones educativas públicas y privadas de Chile

✅ Empleabilidad (Agregar UNO POR UNO):
1. Colegios y liceos públicos y privados
2. Departamentos de convivencia escolar
3. Supervisión educacional (MINEDUC)
4. Consultoría educativa
5. Proyectos gubernamentales de educación
```

---

## 🎯 DIPLOMADO 3: MEDIACIÓN LABORAL

### Datos Básicos WooCommerce:
```
✅ Nombre del producto: Diplomado en Mediación Laboral
✅ Slug: mediacion-laboral
✅ Descripción corta: Desarrolla habilidades para resolver conflictos laborales y mejorar el clima organizacional en empresas y organizaciones.
✅ Descripción completa: Programa especializado para profesionales de recursos humanos, abogados laborales y líderes organizacionales que buscan implementar sistemas efectivos de resolución de conflictos en el ámbito laboral.
✅ Precio regular: 380000
✅ Precio de venta: 290000
✅ Destacar producto: ❌ NO marcado
✅ Estado stock: En stock
```

### 🔑 Campos ACF (EMED - Información del Programa):
```
✅ Tipo de Programa: Diplomado

✅ Duración: 100 horas

✅ Modalidad: Presencial

✅ Programa Destacado: ❌ NO marcado

✅ Ubicación: Santiago Centro

✅ Beneficios del Programa (Agregar UNO POR UNO):
1. Orientado específicamente a profesionales de RRHH
2. Casos empresariales reales de Chile
3. Networking con otros profesionales RRHH
4. Certificación para consultorías laborales
5. Metodología práctica aplicable inmediatamente
6. Herramientas de diagnóstico organizacional

✅ Temario del Programa (Agregar UNO POR UNO):
1. Módulo 1: Diagnóstico de Conflictos Organizacionales (25 horas)
2. Módulo 2: Mediación en Relaciones Laborales (30 horas)
3. Módulo 3: Marco Legal Laboral Chileno (20 horas)
4. Módulo 4: Práctica Empresarial Intensiva (25 horas)

✅ Requisitos de Ingreso (Agregar UNO POR UNO):
1. Título profesional en RRHH, Psicología, Derecho o afines
2. Experiencia laboral mínima de 3 años
3. Conocimientos básicos de legislación laboral
4. Entrevista con coordinador académico

✅ Metodología (Agregar UNO POR UNO):
1. Modalidad presencial con metodología teórico-práctica empresarial
2. Incluye talleres vivenciales y análisis de casos reales de empresas chilenas
3. Simulacros organizacionales con feedback especializado

✅ Certificación (Agregar UNO POR UNO):
1. Diploma de Especialización en Mediación Laboral otorgado por EMED
2. Reconocido por empresas y organizaciones en Chile

✅ Empleabilidad (Agregar UNO POR UNO):
1. Departamentos de Recursos Humanos
2. Consultorías organizacionales
3. Sindicatos y federaciones
4. Empresas de servicios laborales
5. Organismos públicos
```

---

## ✅ Verificación Final

### Después de crear cada producto:

1. **Guardar como Borrador** primero
2. **Verificar que todos los campos ACF estén llenos**
3. **Publicar el producto**
4. **Ir a la página del frontend**: `/programas/mediacion-familiar` (o escolar/laboral)
5. **Verificar que aparezcan todos los datos correctamente**

### URLs de verificación:
- https://tu-sitio.com/programas/mediacion-familiar
- https://tu-sitio.com/programas/mediacion-escolar  
- https://tu-sitio.com/programas/mediacion-laboral

### Si los campos ACF no aparecen:
1. Verifica que el plugin ACF esté activo
2. Verifica que el código de `acf-emed-fields.php` esté en functions.php
3. El producto debe ser tipo "Producto simple" (no variable ni agrupado)

### Si los datos no aparecen en el frontend:
1. Ve a **Ajustes > Enlaces permanentes** → Clic en "Guardar cambios"
2. Limpia el caché si tienes plugins de cache
3. Verifica que llenaste TODOS los campos ACF

---

## 🔄 Integración con /diplomados-y-cursos

Una vez que creates los 3 diplomados como productos WooCommerce:

1. **La página `/diplomados-y-cursos` seguirá mostrando los diplomados estáticos** (no afectará)
2. **Las páginas individuales `/programas/[slug]` mostrarán los datos reales de WooCommerce**
3. **Los filtros por tipo "Diplomado" funcionarán** en otras partes del sitio

¡Con esta configuración tendrás los mejores de ambos mundos!
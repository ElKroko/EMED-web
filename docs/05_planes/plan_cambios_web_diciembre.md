# Plan de mejoras Web EMED (ordenado para implementación)

## 0) Objetivo

Implementar, **sin cambios de alcance**, todas las correcciones solicitadas en el correo: actualización de **horas**, **modalidades**, **aranceles “desde”**, reemplazos de **copy**, incorporación de **mallas/planes de estudio**, ajustes de **secciones institucionales** y limpieza de menciones **SENCE** donde se indica.

---

## 1) Cambios transversales (aplican a toda la web)

### 1.1 Normalización de “fichas” de programas (evitar inconsistencias)

**Problema observado en capturas:** horas/modo/precio aparecen distintos entre cards, secciones y fichas.

**Acción (recomendación técnica):** centralizar metadata de programas en un solo “source of truth” (JSON/TS/YAML) y renderizar:

* Cards de Home / Programas
* Fichas de cada diplomado
* Bloques “Información del programa”

**Valores objetivo según capturas:**

* **Mediación Familiar**: **220 horas**; **Modalidad: Online + Presencial (Prácticas)**; **Arancel: desde $750.000**. (ver capturas de págs. 2–6)
* **Mediación Escolar**: **240 horas**; **Modalidad: 100% online**; **Arancel: desde $450.000**. (ver págs. 2, 6–10)
* **Mediación Laboral**: **240 horas**; **Modalidad: 100% online**; **Arancel: desde $480.000**. (ver págs. 3, 11–15)

**Criterio de aceptación:** en todo el sitio, el mismo programa muestra **exactamente** las mismas horas/modalidad/arancel.

---

### 1.2 Formularios: eliminar opción de horario “noche (18 a 21)”

En el despliegue de “horario”, se solicita **eliminar** esa opción. (págs. 6 y 8)

**Criterio de aceptación:** la opción no aparece en ningún formulario donde exista ese selector.

---

### 1.3 Limpieza de “SENCE” en secciones indicadas

En “Financiamiento” y CTA final, se pide **eliminar la palabra “SENCE”** y **mantener lo demás**. (págs. 19–20)

**Criterio de aceptación:** no aparece “SENCE” en esos bloques específicos (manteniendo estructura/CTA).

---

## 2) Home / Sección “Impacto” y Cards de Programas

### 2.1 Bloque “Impacto Social”

* Cambiar título/etiqueta según captura: **“Impacto Social Positivo”** y **“Nuestro Impacto en Mediación Familiar”**. (pág. 1)
* Revisar que el **logo EMED** se visualice correctamente (“no aparece”). (pág. 1)
* Actualizar “valores vigentes” y mostrar aranceles como **“desde”**, más nota tipo: **“consultar por facilidades de pago”**. (pág. 1)

### 2.2 Cards (Home / Programas)

Actualizar el “detalle de horas” que aparece en cada card:

* Familiar → **220 horas** (pág. 2)
* Escolar → **240 horas** (págs. 2 y 6/8 muestran el objetivo 240h en ficha)
* Laboral → asegurar coherencia con **240 horas** y **100% online** (págs. 3 y 11–15)

**Criterio de aceptación:** cards reflejan los mismos valores que las fichas internas.

---

## 3) Ficha “Diplomado Mediación Familiar” (implementación por bloques)

### 3.1 Encabezado + copy de introducción

* Corregir orden y texto para que diga: **“Online + Presencial (Prácticas)”**. (pág. 3)
* Asegurar que se repita consistentemente en toda la página.

### 3.2 “Información del programa”

Actualizar el bloque completo para reflejar:

* **Duración: 220 horas**
* **Modalidad: Online + Presencial (Prácticas)**
* **Inversión: desde $750.000**
  (la captura muestra este bloque desalineado con valores antiguos). (págs. 3–4)

### 3.3 “Lo que te diferenciará”

Reemplazar por los bullets entregados (según captura): (pág. 4)

* Metodología basada en casos reales del sistema judicial chileno
* Docentes mediadores activos con años de experiencia práctica
* Pasantía obligatoria en centros de mediación familiar reconocidos
* Seguimiento post-certificación para inserción laboral efectiva

### 3.4 “Plan de estudios / Malla”

* Incorporar componente tipo acordeón/tabla con módulos y horas: (pág. 5)

  * Módulo 1: Fundamentos Mediación Familiar (**30 h**)
  * Módulo 2: Técnicas y Herramientas Especializadas (**35 h**)
  * Módulo 3: Práctica Supervisada (**30 h**)
  * Módulo 4: Pasantía Obligatoria (**25 h presenciales**)
* Se pide que sea **gráfica/visualmente genérica** y que explique el plan de estudio. (pág. 5)

### 3.5 “¿Cómo es la formación online?” (2 etapas)

Reemplazar por estructura de 2 etapas: (pág. 5)

* **Etapa asincrónica (plataforma):** acceso 24/7, estudio a ritmo propio, material/actividades.
* **Etapa sincrónica (Zoom):** sesiones en vivo (no grabadas), formato taller, reflexión en grupo, dudas con docente.

### 3.6 Bloque “Metodología” (horas online vs presencial)

Ajustar el bloque comparativo para explicitar:

* **Modalidad Online (170 h)**
* **Modalidad Presencial (50 h)**
  (con los bullets de cada lado, según captura). (pág. 6)

### 3.7 CTA / Mensaje de contacto

Reemplazar por el texto indicado: (pág. 6)

> “Un asesor académico te contactará para resolver tus dudas referentes a tu formación como mediador familiar y posterior inscripción en el registro de mediadores del Ministerio de Justicia.”

---

## 4) Ficha “Diplomado Mediación Escolar” (implementación por bloques)

### 4.1 Metadata del programa

* **Duración: 240 horas** (pág. 8)
* **Modalidad: 100% online** (págs. 7–9)
* **Inversión: desde $450.000** (pág. 8)

### 4.2 Reemplazos de copy principales

* Reemplazar textos en “Transformando la Convivencia Escolar” y descripción general según captura. (pág. 7)
* Incluir “Ruta de aprendizaje” (estructura por cursos + diplomado) tal como se ve en la imagen. (pág. 7)

### 4.3 “Metodología adaptada a trabajo escolar”

Reemplazar el recuadro por el texto entregado (100% online + sincrónico/asincrónico + talleres virtuales; orientado a compatibilizar jornada). (pág. 8)

### 4.4 “¿Listo para mejorar la convivencia…?”

Reemplazar CTA por el texto indicado (orientador académico + implementación). (pág. 8)

### 4.5 “Horarios” + Beneficios únicos

* Reemplazar texto a: “Horarios 100% compatibles con tu trabajo…” (pág. 9)
* Beneficios Únicos (lista tal cual captura): flexibilidad, material descargable permanente, casos prácticos, certificación válida, herramientas digitales, comunidad de práctica. (págs. 9–10)

### 4.6 Requisitos, Certificación y Campo de aplicación

* **Requisitos de ingreso**: bloques/listas según captura. (pág. 10)
* **Certificación**: mención a NCH 2728 + reconocimiento (según texto mostrado). (pág. 10)
* **Campo de aplicación**: lista completa (colegios, deptos convivencia, MINEDUC, consultorías, proyectos, etc.). (pág. 11)

---

## 5) Ficha “Diplomado Mediación Laboral” (implementación por bloques)

### 5.1 Metadata del programa

* **Duración: 240 horas**
* **Modalidad: 100% online** (se pide explícito en varias capturas)
* **Inversión: desde $480.000** (pág. 11)

### 5.2 Copy de cabecera y promesa (“Mejor clima laboral”)

Actualizar el texto de enfoque/beneficio e “Impacto directo en tu organización” con los bullets que aparecen. (pág. 12)

### 5.3 Plan de estudios (Programa Empresarial)

Insertar acordeón/tabla con módulos y horas: (pág. 12)

* Diagnóstico de Conflictos Organizacionales (**25 h**)
* Mediación en Relaciones Laborales (**30 h**)
* Marco Legal Laboral Chileno (**20 h**)
* Práctica Empresarial Intensiva (**25 h**)

### 5.4 Networking, casos reales y comunidad

* Ajustar recuadro “Casos Empresariales Reales” con la lista indicada. (pág. 13)
* Mantener/ordenar “Red y Comunidad Profesional EMED” según texto de captura. (pág. 13)

### 5.5 Beneficios empresariales (reemplazo de recuadro)

Reemplazar por la lista “Beneficios Empresariales” indicada. (pág. 14)

### 5.6 Requisitos, Certificación y Campo de aplicación

* Requisitos: título afín + experiencia + conocimientos + entrevista. (pág. 15)
* Certificación: texto actualizado (EMED + validez para organizaciones; según captura). (pág. 15)
* Campo de aplicación: RRHH/Gestión de personas, consultorías, sindicatos, organismos públicos, etc. (pág. 16)

---

## 6) Secciones institucionales (Quienes Somos / Misión / Visión / Fórmate / Financiamiento)

### 6.1 “Quiénes somos”

Reemplazar el bloque completo por el texto editorial que aparece en captura (20+ años, mediación viva, propósito). (pág. 16)

Agregar bloque “Promesa de Valor” con 3 items (según diseño mostrado): (pág. 16)

* Formación práctica
* Acompañamiento
* Certificación

Además: **agregar “Certificación IPCHILE para Mediación Familiar”** en el apartado de certificaciones donde corresponda. (pág. 16)

### 6.2 “Nuestra Misión” y “Nuestra Visión”

* Mantener el texto largo de misión y su enfoque (competencias técnicas y socioemocionales). (pág. 17)
* Reemplazar recuadros de “Nuestra Visión” por el texto indicado (impulsar cultura de diálogo/cuidado; mediación como práctica cotidiana). (pág. 17)

### 6.3 “Fórmate con nosotros”

Reordenar/limpiar el bloque con los 4 ejes: acompañamiento, excelencia, flexibilidad, respaldo/certificaciones, según captura. (pág. 18)

### 6.4 “Financiamiento y descuentos” + “Modalidad de estudio”

* Mantener el contenido, pero **eliminar la palabra “SENCE”** donde se solicita. (págs. 19–20)
* Revisar texto de modalidades (asincrónico / sincrónico / presencial) y dejarlo coherente con programas (sobre todo escolar y laboral = 100% online). (pág. 19)

### 6.5 CTA final “Inicia tu carrera como Mediador Profesional”

* Eliminar “SENCE” del bloque, manteniendo el resto (asesoría, info financiamiento, respuesta WhatsApp). (pág. 20)

---

## 7) Checklist de QA antes de cerrar

* Consistencia de horas/modalidad/arancel en: **Home cards**, **listados**, **fichas**, **bloques de info**.
* Responsive: acordeones de malla y cajas de metodología en mobile.
* Formularios: opción “noche (18–21)” eliminada en todos los lugares.
* Búsqueda de texto: “SENCE” no aparece en los bloques indicados.
* Logos: EMED se visualiza correctamente en “Impacto” y certificaciones.

---

Si tu asistente de código trabaja por tickets, este plan ya está “troceado” por épicas (Home / Familiar / Escolar / Laboral / Institucional). Lo más importante: **centraliza la metadata** y renderiza desde ahí; si lo dejan hardcodeado por sección, estas inconsistencias van a reaparecer.

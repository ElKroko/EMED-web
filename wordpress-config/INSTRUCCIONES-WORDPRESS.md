# Instrucciones para configurar ACF en WordPress

## Problema identificado
Los campos personalizados de ACF no se están mostrando en las páginas de programas porque:
1. Los campos ACF no están correctamente integrados en WordPress
2. Los datos no se están sincronizando con WooCommerce
3. El mapeo en Astro necesitaba actualizaciones

## Solución implementada

### 1. Copia el código ACF a functions.php
Copia todo el contenido del archivo `wordpress-config/acf-emed-fields.php` a tu archivo `functions.php` del tema activo de WordPress.

**Ubicación**: `/wp-content/themes/tu-tema-activo/functions.php`

```php
// Pega aquí todo el código del archivo acf-emed-fields.php
```

### 2. Verifica que ACF esté instalado
- Plugin ACF (Advanced Custom Fields) debe estar instalado y activado
- Versión recomendada: ACF Pro o ACF Free (mínimo 5.0)

### 3. Campos configurados
Los siguientes campos están configurados para productos WooCommerce:

#### Campos simples:
- **Tipo de Programa**: Diplomado/Curso
- **Duración**: Texto libre (ej: "120 horas")
- **Modalidad**: Presencial/Online/Mixto
- **Ubicación**: Texto libre
- **Programa Destacado**: Sí/No

#### Campos repetidores:
- **Beneficios**: Lista de beneficios del programa
- **Temario**: Lista de módulos del programa
- **Requisitos**: Lista de requisitos de ingreso
- **Metodología**: Lista de puntos metodológicos
- **Certificación**: Lista de certificaciones
- **Empleabilidad**: Lista de oportunidades laborales

### 4. Cómo llenar los campos en WordPress

1. Ve a **Productos > Todos los productos**
2. Edita un producto existente o crea uno nuevo
3. Desplázate hacia abajo hasta encontrar la sección **"EMED - Información del Programa"**
4. Llena los campos:

#### Ejemplo de llenado:
- **Tipo**: Diplomado
- **Duración**: 120 horas
- **Modalidad**: Presencial + Online
- **Destacado**: ✓ (marcado)

#### Beneficios (uno por línea):
- Certificación reconocida por el Ministerio de Justicia
- Prácticas con casos reales supervisados
- Inserción en registro oficial de mediadores

#### Temario (uno por línea):
- Módulo 1: Fundamentos de la Mediación
- Módulo 2: Técnicas y Herramientas
- Módulo 3: Práctica Supervisada

#### Requisitos (uno por línea):
- Título profesional universitario de al menos 8 semestres
- Experiencia laboral mínima de 2 años

#### Metodología (uno por línea):
- Modalidad híbrida que combina clases teóricas online con talleres prácticos presenciales
- La pasantía final es 100% presencial según normativa del Ministerio de Justicia

#### Certificación (uno por línea):
- Diploma de Especialización en Mediación Familiar otorgado por EMED
- Válido para inscripción en el Registro de Mediadores del Ministerio de Justicia

#### Empleabilidad (uno por línea):
- Centros de Mediación Familiar
- Tribunales de Familia
- Consultoría independiente

### 5. Verificar que funciona

1. **Guarda el producto** después de llenar todos los campos
2. **Ve a la página del producto** en el frontend de tu sitio web
3. **Verifica que se muestren todas las secciones**:
   - ✅ Beneficios (sidebar derecho)
   - ✅ Requisitos (sidebar derecho)
   - ✅ Certificación (sidebar derecho)  
   - ✅ Empleabilidad (sidebar derecho)
   - ✅ Plan de Estudios/Temario (contenido principal)
   - ✅ Metodología (contenido principal)

### 6. Solución de problemas

#### Si los campos no aparecen:
1. Verifica que ACF esté activado
2. Asegúrate de que pegaste todo el código en functions.php
3. Revisa el log de errores de PHP

#### Si los campos aparecen pero están vacíos:
1. Verifica que llenaste los campos en el admin de WordPress
2. Guarda el producto nuevamente
3. Limpia cualquier caché de WordPress

#### Si aparecen errores:
1. Revisa que tu tema sea compatible con WooCommerce
2. Verifica que no haya conflictos con otros plugins
3. Consulta los logs de error de WordPress

### 7. Archivos modificados en el proyecto Astro

Los siguientes archivos fueron actualizados para soportar los nuevos campos:

- ✅ `src/lib/wp.ts` - Mapeo mejorado de campos ACF
- ✅ `src/types/woocommerce.ts` - Tipos actualizados
- ✅ `src/pages/programas/[id].astro` - Nuevas secciones HTML

### 8. Siguiente paso

Una vez que hayas configurado todo en WordPress, la página de programas debería mostrar toda la información como aparece en el fallback demo.

¡Los campos de beneficios, requisitos, metodología, certificación y empleabilidad ahora deberían aparecer correctamente!
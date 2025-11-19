# 🔌 Integración WordPress/WooCommerce - EMED-web

## Tabla de Contenidos
- [Visión General](#visión-general)
- [Configuración de WordPress](#configuración-de-wordpress)
- [Campos Personalizados ACF](#campos-personalizados-acf)
- [Estructura de Productos](#estructura-de-productos)
- [API GraphQL y REST](#api-graphql-y-rest)
- [Guía: Crear Diplomados/Cursos](#guía-crear-diplomadoscursos)
- [Troubleshooting](#troubleshooting)

## Visión General

EMED-web utiliza WordPress como CMS headless para gestionar el contenido de cursos y diplomados. La integración funciona de la siguiente manera:

```
WordPress/WooCommerce (Backend)
         ↓
    API Layer (GraphQL + REST)
         ↓
    src/lib/wp.ts (Funciones de API)
         ↓
    Componentes Astro (Frontend)
```

### Ventajas de esta Arquitectura

- **Separación de responsabilidades**: Backend y Frontend independientes
- **Flexibilidad**: Cambiar frontend sin afectar datos
- **Performance**: Sitio estático super rápido
- **Gestión simplificada**: WordPress familiar para editores
- **Escalabilidad**: Fácil agregar más features

## Configuración de WordPress

### Plugins Requeridos

#### 1. WooCommerce
**Versión mínima**: 8.0

**Instalación**:
```bash
WordPress Admin → Plugins → Add New → Buscar "WooCommerce"
```

**Configuración básica**:
- Currency: Chilean Peso (CLP)
- Products: Simple products
- Reviews: Disabled (opcional)
- Stock: Disabled (cursos no tienen stock físico)

#### 2. WPGraphQL
**Versión mínima**: 1.14

**Instalación**:
```bash
WordPress Admin → Plugins → Add New → Buscar "WPGraphQL"
```

**Configuración**:
- Endpoint: `/graphql`
- Public Introspection: Enabled (desarrollo), Disabled (producción)
- Debug Mode: Enabled (solo desarrollo)

#### 3. WPGraphQL for WooCommerce
**Versión mínima**: 0.12

**Instalación**:
```bash
WordPress Admin → Plugins → Add New → Buscar "WPGraphQL WooCommerce"
```

#### 4. Advanced Custom Fields (ACF)
**Versión mínima**: 6.0

**Instalación**:
```bash
WordPress Admin → Plugins → Add New → Buscar "Advanced Custom Fields"
```

### Configuración de Permalinks

Para URLs limpias y compatibilidad con API:

```
Settings → Permalinks → Post name (/%postname%/)
```

Guardar cambios para regenerar reglas de reescritura.

### CORS Configuration

Si WordPress está en diferente dominio que el frontend:

**Opción 1: Plugin**
- Instalar "WP REST API - CORS"
- Activar y configurar dominios permitidos

**Opción 2: wp-config.php**
```php
// Agregar antes de "That's all, stop editing!"
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

## Campos Personalizados ACF

### Instalación de Campos

Los campos personalizados definen la estructura de datos de cada curso/diplomado.

**Archivo**: `wordpress-config/acf-emed-fields.php`

**Instalación**:
1. Copia el contenido del archivo
2. Pega en `functions.php` de tu tema activo
3. O usa ACF Tools → Import

### Estructura de Campos

```php
'emed-info' => [
  'title' => 'EMED - Información del Programa',
  'fields' => [
    // Campos básicos
    'tipo' => ['Diplomado', 'Curso'],
    'duracion' => 'Texto',
    'modalidad' => ['Presencial', 'Online', 'Mixto'],
    'destacado' => 'True/False',
    'ubicacion' => 'Texto',

    // Campos tipo Repeater
    'beneficios' => ['Beneficio 1', 'Beneficio 2', ...],
    'temario' => [
      ['Módulo 1', 'Contenido módulo 1'],
      ['Módulo 2', 'Contenido módulo 2'],
      ...
    ],
    'requisitos' => ['Requisito 1', 'Requisito 2', ...],
    'metodologia' => ['Metodología 1', 'Metodología 2', ...],
    'certificacion' => ['Certificación 1', 'Certificación 2', ...],
    'empleabilidad' => ['Área 1', 'Área 2', ...],

    // Campo file
    'brochure' => 'File (PDF)'
  ]
]
```

### Keys de Campos ACF

Los campos ACF usan prefijo `_emed_`:

| Campo Frontend | Meta Key ACF | Tipo |
|---------------|--------------|------|
| `tipo` | `_emed_tipo` | Select |
| `duracion` | `_emed_duracion` | Text |
| `modalidad` | `_emed_modalidad` | Select |
| `destacado` | `_emed_destacado` | True/False |
| `ubicacion` | `_emed_ubicacion` | Text |
| `beneficios` | `_emed_beneficios` | Repeater |
| `temario` | `_emed_temario` | Repeater |
| `requisitos` | `_emed_requisitos` | Repeater |
| `metodologia` | `_emed_metodologia` | Repeater |
| `certificacion` | `_emed_certificacion` | Repeater |
| `empleabilidad` | `_emed_empleabilidad` | Repeater |
| `brochure` | `_emed_brochure` | File |

## Estructura de Productos

### Producto WooCommerce Base

```
Producto (Simple Product)
├── Datos Básicos
│   ├── Nombre: "Diplomado en Mediación Familiar"
│   ├── Slug: "mediacion-familiar"
│   ├── Descripción: Contenido HTML
│   ├── Descripción corta: Resumen breve
│   ├── Precio regular: 450000
│   ├── Precio de venta: 350000
│   └── Destacado: Sí/No
├── Categorías
│   └── "Diplomados" o "Cursos"
├── Imágenes
│   ├── Imagen destacada
│   └── Galería (opcional)
└── EMED - Información del Programa (ACF)
    ├── Tipo: Diplomado
    ├── Duración: 120 horas
    ├── Modalidad: Presencial + Online
    ├── Ubicación: Santiago Centro
    ├── Beneficios: [Array de beneficios]
    ├── Temario: [Array de módulos]
    ├── Requisitos: [Array de requisitos]
    ├── Metodología: [Array de metodologías]
    ├── Certificación: [Array de certificaciones]
    ├── Empleabilidad: [Array de áreas]
    └── Brochure: archivo.pdf
```

### Tipos de Productos

#### Diplomados
- Duración: 80-120 horas
- Certificación oficial
- Modalidad mixta o presencial
- Precio: $250.000 - $450.000

#### Cursos
- Duración: 20-60 horas
- Certificado de participación
- Modalidad preferentemente online
- Precio: $50.000 - $150.000

## API GraphQL y REST

### GraphQL Queries

**Archivo**: `src/lib/wp.ts`

#### Query de Productos
```graphql
query GetProducts($first: Int) {
  products(first: $first) {
    nodes {
      id
      databaseId
      name
      slug
      description
      shortDescription
      price
      regularPrice
      salePrice
      featured
      image {
        sourceUrl
        altText
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      metaData {
        key
        value
      }
    }
  }
}
```

#### Query de Producto Individual
```graphql
query GetProduct($id: ID!) {
  product(id: $id, idType: DATABASE_ID) {
    # ... mismos campos
  }
}
```

### REST API Endpoints

#### Productos
```
GET /wp-json/wc/v3/products
GET /wp-json/wc/v3/products/{id}
```

**Parámetros**:
- `per_page`: Límite de resultados (default: 10)
- `featured`: Solo productos destacados (true/false)
- `category`: Filtrar por categoría (slug o ID)

**Autenticación**:
```
?consumer_key=ck_xxx&consumer_secret=cs_xxx
```

### Funciones de API en Frontend

**Archivo**: `src/lib/wp.ts`

#### Obtener todos los productos
```typescript
import { getEmedProducts } from '../lib/wp';

const products = await getEmedProducts({
  per_page: 10,
  featured: true
});
```

#### Obtener producto por slug
```typescript
import { getEmedProductBySlug } from '../lib/wp';

const product = await getEmedProductBySlug('mediacion-familiar');
```

#### Obtener producto por ID
```typescript
import { getEmedProductById } from '../lib/wp';

const product = await getEmedProductById(123);
```

#### Tipos de respuesta
```typescript
interface EmedProduct {
  // WooCommerce base
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{ src: string; alt: string }>;

  // EMED custom
  tipo: 'Diplomado' | 'Curso';
  duracion: string;
  modalidad: 'Presencial' | 'Online' | 'Mixto';
  destacado: boolean;
  ubicacion?: string;
  beneficios: string[];
  temario: Array<{ modulo: string; contenido: string[] }>;
  requisitos: string[];
  metodologia: string[];
  certificacion: string[];
  empleabilidad: string[];
  precio_formateado: string;
  brochure?: {
    url: string;
    title: string;
  };
}
```

## Guía: Crear Diplomados/Cursos

### Paso 1: Crear Producto en WooCommerce

1. **Ir a WooCommerce → Productos → Añadir nuevo**

2. **Datos básicos**:
   - **Nombre**: Ej. "Diplomado en Mediación Familiar"
   - **Slug**: Ej. "mediacion-familiar" (se genera automático)
   - **Descripción**: Contenido detallado del programa
   - **Descripción corta**: Resumen de 1-2 líneas

3. **Datos del producto**:
   - **Precio regular**: Ej. 450000 (sin puntos ni comas)
   - **Precio de venta**: Ej. 350000 (opcional)

4. **Categoría**:
   - Selecciona "Diplomados" o "Cursos"
   - O crea nueva categoría si es necesario

5. **Imagen destacada**:
   - Subir imagen representativa (1200x800px recomendado)

### Paso 2: Completar Campos ACF

Bajar hasta la sección **"EMED - Información del Programa"**:

#### Campos Simples
```
Tipo de Programa: [Diplomado]
Duración: 120 horas
Modalidad: [Presencial + Online]
Programa Destacado: [✓]
Ubicación: Santiago Centro
```

#### Beneficios del Programa
Click en "Add Row":
```
1. Certificación reconocida por el Ministerio de Justicia
2. Prácticas con casos reales supervisados
3. Inserción en registro oficial de mediadores
... (agregar todos los beneficios)
```

#### Temario del Programa
Click en "Add Row" para cada módulo:
```
Módulo: Módulo 1: Fundamentos de la Mediación Familiar
Contenido del Módulo:
  - Teoría de conflictos
  - Técnicas de comunicación
  - Marco legal chileno
```

#### Requisitos, Metodología, etc.
Repetir el proceso para cada campo tipo repeater.

#### Brochure (Opcional)
- Subir PDF con información del programa
- Máximo 5MB recomendado

### Paso 3: Publicar

1. Click en **"Publicar"** en el panel derecho
2. Verificar que el estado sea "Publicado"

### Paso 4: Verificar en el Frontend

1. Ir a `http://tu-sitio.com/programas/mediacion-familiar`
2. Verificar que todos los datos se muestren correctamente
3. Probar enlaces y descargas

### Ejemplo Completo: Diplomado en Mediación Familiar

Ver archivo `wordpress-config/DATOS-PRODUCTOS-WOOCOMMERCE.md` para datos completos de ejemplo.

**Datos básicos**:
```
Nombre: Diplomado en Mediación Familiar
Slug: mediacion-familiar
Precio regular: 450000
Precio venta: 350000
Destacado: ✓
```

**Campos ACF**:
```
Tipo: Diplomado
Duración: 120 horas
Modalidad: Presencial + Online
Ubicación: Santiago Centro

Beneficios: [7 items]
Temario: [4 módulos]
Requisitos: [5 items]
Metodología: [2 items]
Certificación: [2 items]
Empleabilidad: [5 áreas]
```

## Troubleshooting

### Problema: Campos ACF no aparecen

**Causas posibles**:
- ACF no está instalado o activado
- Código de campos no está en functions.php
- Tipo de producto incorrecto (debe ser "Simple Product")

**Solución**:
1. Verifica que ACF esté activado
2. Copia el código de `acf-emed-fields.php` a `functions.php`
3. Verifica el tipo de producto en "Datos del producto"

### Problema: Datos no aparecen en el frontend

**Causas posibles**:
- Campos ACF no guardados
- WordPress no accesible durante build
- Keys de campos incorrectos

**Solución**:
1. Re-guardar el producto en WordPress
2. Verificar conexión en `.env`
3. Revisar logs en consola del navegador
4. Hacer rebuild: `npm run build`

### Problema: Error 404 en páginas de productos

**Causas posibles**:
- Permalinks no actualizados
- Slug duplicado
- Routing de Astro no configurado

**Solución**:
1. Settings → Permalinks → Save changes
2. Verificar slug único del producto
3. Verificar archivo `src/pages/programas/[id].astro`

### Problema: GraphQL no funciona

**Causas posibles**:
- WPGraphQL no instalado
- Endpoint incorrecto
- Permisos de API

**Solución**:
1. Instalar WPGraphQL
2. Verificar URL en `.env`: `WP_GRAPHQL_URL`
3. Habilitar Public Introspection en desarrollo
4. El sistema fallback a REST automáticamente

### Problema: Credenciales WooCommerce inválidas

**Causas posibles**:
- Keys incorrectos en `.env`
- Permisos insuficientes
- Keys expirados o revocados

**Solución**:
1. Regenerar keys: WooCommerce → Settings → Advanced → REST API
2. Copiar nuevos keys a `.env`
3. Verificar permisos: Read/Write según necesidad
4. Rebuild del proyecto

### Problema: Imágenes no cargan

**Causas posibles**:
- CORS bloqueando imágenes
- URLs incorrectas
- Imágenes no publicadas

**Solución**:
1. Configurar CORS en WordPress
2. Verificar URLs de imágenes en GraphQL response
3. Verificar que imágenes estén en biblioteca de medios

## Testing de la Integración

### Test Manual

1. **Crear producto de prueba** en WordPress
2. **Verificar API REST**:
```bash
curl "http://localhost:8882/wp-json/wc/v3/products?consumer_key=ck_xxx&consumer_secret=cs_xxx"
```

3. **Verificar GraphQL**:
```bash
curl -X POST http://localhost:8882/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { nodes { name } } }"}'
```

4. **Verificar Frontend**:
```bash
npm run dev
# Visitar http://localhost:4321/programas
```

### Datos de Prueba

Usa los datos de ejemplo en `wordpress-config/DATOS-PRODUCTOS-WOOCOMMERCE.md`:
- Diplomado en Mediación Familiar
- Diplomado en Mediación Escolar
- Diplomado en Mediación Laboral

---

**Última actualización**: Octubre 2025

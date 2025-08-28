# 🛍️ Plan de Integración WooCommerce - EMED Web

## 📋 Análisis de Estructura Actual

### Programas EMED Identificados
Basado en tu código actual, tienes estos tipos de programas:

#### **Diplomados** (4 programas)
1. **Mediación Familiar** - $450.000 - 120h - Presencial + Online
2. **Mediación Escolar** - $320.000 - 80h - 100% Online  
3. **Mediación Laboral** - $380.000 - 100h - Presencial
4. **Mediación Comunitaria** - $290.000 - 90h - Mixto

#### **Cursos** (2 programas)
1. **Introducción a la Mediación** - $180.000 - 40h - Online
2. **Técnicas Avanzadas** - $250.000 - 60h - Presencial

## 🎯 Objetivos de la Integración

1. **Centralizar productos** en WooCommerce como fuente única de verdad
2. **Mantener funcionalidad existente** de la web
3. **Habilitar e-commerce completo** (carrito, checkout, pagos)
4. **Sincronizar datos** entre WordPress y Astro automáticamente
5. **Facilitar gestión** para administradores

## 📊 Esquema de Datos WooCommerce

### Estructura de Producto Base (WooCommerce nativo)
```json
{
  "id": 123,
  "name": "Mediación Familiar",
  "slug": "mediacion-familiar", 
  "permalink": "https://emed.cl/producto/mediacion-familiar",
  "type": "simple",
  "status": "publish",
  "featured": true,
  "catalog_visibility": "visible",
  "description": "<p>Especialízate en la resolución...</p>",
  "short_description": "<p>Diploma en Mediación Familiar</p>",
  "price": "450000",
  "regular_price": "450000",
  "sale_price": "",
  "categories": [
    {
      "id": 15,
      "name": "Diplomados",
      "slug": "diplomados"
    }
  ],
  "images": [
    {
      "id": 456,
      "src": "https://emed.cl/wp-content/uploads/mediacion-familiar.jpg"
    }
  ]
}
```

### Campos Personalizados Necesarios (Custom Fields)
```json
{
  "meta_data": [
    {
      "key": "_emed_tipo",
      "value": "Diplomado"
    },
    {
      "key": "_emed_duracion", 
      "value": "120 horas"
    },
    {
      "key": "_emed_modalidad",
      "value": "Presencial + Online"
    },
    {
      "key": "_emed_nivel",
      "value": "Básico - Intermedio"
    },
    {
      "key": "_emed_destacado",
      "value": "true"
    },
    {
      "key": "_emed_beneficios",
      "value": "[\"Certificación reconocida\",\"Prácticas supervisadas\"]"
    },
    {
      "key": "_emed_temario",
      "value": "[\"Fundamentos teóricos\",\"Técnicas de comunicación\"]"
    },
    {
      "key": "_emed_fecha_inicio",
      "value": "2024-03-15"
    },
    {
      "key": "_emed_fecha_fin",
      "value": "2024-06-15"
    },
    {
      "key": "_emed_cupos_disponibles",
      "value": "25"
    },
    {
      "key": "_emed_instructor",
      "value": "Dr. María González"
    },
    {
      "key": "_emed_ubicacion",
      "value": "Santiago Centro"
    },
    {
      "key": "_emed_requisitos",
      "value": "[\"Título profesional\",\"Experiencia mínima\"]"
    }
  ]
}
```

## 🏗️ Estructura de Categorías WooCommerce

### Categorías Principales
```
Programas EMED/
├── Diplomados/
│   ├── Mediación Familiar
│   ├── Mediación Escolar  
│   ├── Mediación Laboral
│   └── Mediación Comunitaria
├── Cursos/
│   ├── Introducción a la Mediación
│   └── Técnicas Avanzadas
└── Modalidades/
    ├── Presencial
    ├── Online
    └── Mixto
```

### Atributos de Producto
```
- Duración (20h, 40h, 60h, 80h, 100h, 120h)
- Modalidad (Presencial, Online, Mixto)
- Nivel (Básico, Intermedio, Avanzado)
- Tipo (Diplomado, Curso)
```

## 🔄 Integración con wp.ts

### Función para Obtener Productos
```typescript
// src/lib/wp.ts - Extensión
export interface EmedProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  featured: boolean;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  // Campos personalizados EMED
  tipo: string;
  duracion: string;
  modalidad: string;
  nivel: string;
  destacado: boolean;
  beneficios: string[];
  temario: string[];
  fecha_inicio: string;
  fecha_fin: string;
  cupos_disponibles: number;
  instructor: string;
  ubicacion: string;
  requisitos: string[];
}

export const getEmedProducts = async (): Promise<EmedProduct[]> => {
  const response = await fetch(`${wcApiUrl}/products?per_page=100`, {
    headers: {
      Authorization: `Basic ${btoa(`${import.meta.env.WC_KEY}:${import.meta.env.WC_SECRET}`)}`
    }
  });
  
  if (!response.ok) throw new Error("Error fetching EMED products");
  const products = await response.json();
  
  return products.map(mapWooCommerceToEmed);
};

const mapWooCommerceToEmed = (wcProduct: any): EmedProduct => {
  const getMetaValue = (key: string, defaultValue: any = '') => {
    const meta = wcProduct.meta_data?.find((m: any) => m.key === key);
    return meta ? meta.value : defaultValue;
  };

  return {
    id: wcProduct.id,
    name: wcProduct.name,
    slug: wcProduct.slug,
    description: wcProduct.description,
    short_description: wcProduct.short_description,
    price: wcProduct.price,
    regular_price: wcProduct.regular_price,
    sale_price: wcProduct.sale_price,
    featured: wcProduct.featured,
    images: wcProduct.images || [],
    categories: wcProduct.categories || [],
    // Mapear campos personalizados
    tipo: getMetaValue('_emed_tipo'),
    duracion: getMetaValue('_emed_duracion'),
    modalidad: getMetaValue('_emed_modalidad'),
    nivel: getMetaValue('_emed_nivel'),
    destacado: getMetaValue('_emed_destacado') === 'true',
    beneficios: JSON.parse(getMetaValue('_emed_beneficios', '[]')),
    temario: JSON.parse(getMetaValue('_emed_temario', '[]')),
    fecha_inicio: getMetaValue('_emed_fecha_inicio'),
    fecha_fin: getMetaValue('_emed_fecha_fin'),
    cupos_disponibles: parseInt(getMetaValue('_emed_cupos_disponibles', '0')),
    instructor: getMetaValue('_emed_instructor'),
    ubicacion: getMetaValue('_emed_ubicacion'),
    requisitos: JSON.parse(getMetaValue('_emed_requisitos', '[]'))
  };
};
```

## 🔧 Configuración WordPress Necesaria

### 1. Plugin: Advanced Custom Fields (ACF)
```php
// Campos personalizados para productos
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
  'key' => 'group_emed_product',
  'title' => 'EMED - Información del Programa',
  'fields' => array(
    array(
      'key' => 'field_emed_tipo',
      'label' => 'Tipo de Programa',
      'name' => 'emed_tipo',
      'type' => 'select',
      'choices' => array(
        'Diplomado' => 'Diplomado',
        'Curso' => 'Curso',
      ),
    ),
    array(
      'key' => 'field_emed_duracion',
      'label' => 'Duración',
      'name' => 'emed_duracion',
      'type' => 'text',
    ),
    array(
      'key' => 'field_emed_modalidad',
      'label' => 'Modalidad',
      'name' => 'emed_modalidad',
      'type' => 'select',
      'choices' => array(
        'Presencial' => 'Presencial',
        'Online' => '100% Online',
        'Mixto' => 'Presencial + Online',
      ),
    ),
    // ... más campos
  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'product',
      ),
    ),
  ),
));

endif;
```

### 2. Hook para Sincronizar Meta Fields
```php
// functions.php
add_action('woocommerce_rest_insert_product_object', 'sync_emed_meta_fields', 10, 3);

function sync_emed_meta_fields($product, $request, $creating) {
    $emed_fields = [
        'emed_tipo',
        'emed_duracion', 
        'emed_modalidad',
        'emed_nivel',
        'emed_destacado',
        'emed_beneficios',
        'emed_temario',
        // ... más campos
    ];
    
    foreach ($emed_fields as $field) {
        if (isset($request[$field])) {
            $product->update_meta_data('_' . $field, $request[$field]);
        }
    }
    $product->save();
}
```

## 📝 Plan de Migración de Datos

### Fase 1: Preparación (Semana 1)
1. **Instalar plugins necesarios** en WordPress
   - WooCommerce
   - Advanced Custom Fields Pro
   - WooCommerce REST API

2. **Configurar campos personalizados**
   - Crear grupo de campos ACF
   - Configurar tipos de datos
   - Establecer validaciones

3. **Configurar categorías y atributos**
   - Crear taxonomías de producto
   - Definir atributos variables
   - Establecer jerarquías

### Fase 2: Creación de Productos (Semana 2)
1. **Crear productos manualmente** (6 productos iniciales)
   - 4 Diplomados
   - 2 Cursos
   - Completar todos los campos personalizados

2. **Configurar imágenes y medios**
   - Subir imágenes de cada programa
   - Optimizar para web
   - Configurar alt texts

3. **Testing de API**
   - Verificar respuestas de WooCommerce API
   - Probar autenticación
   - Validar estructura de datos

### Fase 3: Integración Frontend (Semana 3)
1. **Actualizar wp.ts**
   - Implementar funciones de productos
   - Crear tipos TypeScript
   - Agregar manejo de errores

2. **Migrar páginas de programas**
   - Actualizar /programas para usar WooCommerce
   - Modificar página individual [id].astro
   - Mantener diseño actual

3. **Implementar carrito** (opcional primera fase)
   - Botones "Agregar al carrito"
   - Redirect a checkout WordPress
   - O integración completa

## 🛒 Funcionalidades E-commerce

### Básica (MVP)
- ✅ Mostrar productos desde WooCommerce
- ✅ Información detallada de programas
- ✅ Filtros por tipo/modalidad  
- ✅ Botón "Más información" → WhatsApp
- ✅ Botón "Inscribirse" → Formulario contacto

### Avanzada (Fase 2)
- 🔄 Carrito de compras integrado
- 🔄 Checkout nativo en Astro
- 🔄 Integración con pasarelas de pago
- 🔄 Dashboard de estudiante
- 🔄 Gestión de inscripciones

## 📊 Estructura de URLs

### Actual → Nueva
```
/programas → /programas (listado desde WooCommerce)
/programas/mediacion-familiar → /programas/mediacion-familiar (WC product)
/admision → /inscripcion (proceso WooCommerce)
```

## 🔐 Seguridad y Performance

### API Security
```typescript
// Rate limiting para API calls
const apiCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export const getCachedProducts = async () => {
  const cached = apiCache.get('products');
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const products = await getEmedProducts();
  apiCache.set('products', {
    data: products,
    timestamp: Date.now()
  });
  
  return products;
};
```

### Environment Variables Necesarias
```bash
# .env
WP_DOMAIN=https://tudominio.cl
WC_KEY=ck_xxxxxxxxxxxxx
WC_SECRET=cs_xxxxxxxxxxxxx
```

## 🎯 Próximos Pasos Inmediatos

1. **Crear campos personalizados** en WordPress ACF
2. **Configurar 1 producto de prueba** con todos los campos
3. **Probar API call** desde Astro
4. **Actualizar interfaz TypeScript** en wp.ts
5. **Migrar página de programas** paso a paso

---

**🚀 Este plan te dará una base sólida para integrar WooCommerce manteniendo toda la funcionalidad actual de tu sitio web EMED.**
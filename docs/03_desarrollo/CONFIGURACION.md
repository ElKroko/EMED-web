# ⚙️ Guía de Configuración - EMED-web

## Tabla de Contenidos
- [Variables de Entorno](#variables-de-entorno)
- [Configuración de WordPress](#configuración-de-wordpress)
- [Configuración de WooCommerce](#configuración-de-woocommerce)
- [Configuración de Astro](#configuración-de-astro)
- [Configuración de TailwindCSS](#configuración-de-tailwindcss)
- [Integración de APIs](#integración-de-apis)

## Variables de Entorno

### Archivo `.env`

El proyecto utiliza variables de entorno para configurar las conexiones a WordPress y WooCommerce. Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

### Variables Requeridas

```env
# WordPress Configuration
WP_DOMAIN="http://localhost:8882"
WP_API_URL="http://localhost:8882/wp-json/v2"
WP_GRAPHQL_URL="http://localhost:8882/graphql"

# WooCommerce API Credentials
WC_KEY="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
WC_SECRET="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Descripción de Variables

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `WP_DOMAIN` | URL base de tu instalación WordPress | `http://localhost:8882` o `https://cms.emed.cl` |
| `WP_API_URL` | URL de la API REST de WordPress | `${WP_DOMAIN}/wp-json/v2` |
| `WP_GRAPHQL_URL` | URL del endpoint GraphQL | `${WP_DOMAIN}/graphql` |
| `WC_KEY` | Consumer Key de WooCommerce | `ck_...` |
| `WC_SECRET` | Consumer Secret de WooCommerce | `cs_...` |

### Obtener Credenciales de WooCommerce

1. En WordPress, ve a **WooCommerce → Settings → Advanced → REST API**
2. Haz clic en **Add Key**
3. Configura:
   - **Description**: "EMED Frontend"
   - **User**: Selecciona un usuario administrador
   - **Permissions**: Read
4. Copia el **Consumer key** y **Consumer secret** generados
5. Pégalos en tu archivo `.env`

### Seguridad

⚠️ **IMPORTANTE**:
- **Nunca** commits el archivo `.env` al repositorio
- Asegúrate de que `.env` esté en `.gitignore`
- Usa variables de entorno separadas para desarrollo y producción
- Las credenciales de WooCommerce deben tener permisos de solo lectura

## Configuración de WordPress

### Requisitos

- **WordPress** 6.0 o superior
- **PHP** 8.0 o superior
- **MySQL** 5.7 o superior

### Plugins Requeridos

#### 1. WooCommerce
```bash
# En WordPress Admin:
Plugins → Add New → Buscar "WooCommerce" → Install → Activate
```

Configuración básica:
- Moneda: CLP (Peso Chileno)
- Ubicación: Chile
- Tipo de productos: Virtual (cursos online)

#### 2. WPGraphQL
```bash
# En WordPress Admin:
Plugins → Add New → Buscar "WPGraphQL" → Install → Activate
```

Verifica la instalación:
- Ve a **GraphQL → Settings**
- El endpoint debe estar en: `{tu-dominio}/graphql`
- Habilita "Enable GraphQL Debug Mode" (solo desarrollo)

#### 3. WPGraphQL for WooCommerce
```bash
# En WordPress Admin:
Plugins → Add New → Buscar "WPGraphQL WooCommerce" → Install → Activate
```

#### 4. Advanced Custom Fields (ACF)
```bash
# En WordPress Admin:
Plugins → Add New → Buscar "Advanced Custom Fields" → Install → Activate
```

Importar campos personalizados:
1. Ve a **Custom Fields → Tools**
2. Importa el archivo: `wordpress-config/acf-emed-fields.php`

### Configuración de Permalinks

Para URLs limpias:
1. Ve a **Settings → Permalinks**
2. Selecciona **Post name**: `/%postname%/`
3. Guarda cambios

### CORS (Cross-Origin Resource Sharing)

Si tu frontend está en un dominio diferente, agrega al `wp-config.php`:

```php
// Habilitar CORS para API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

O instala el plugin **WP REST API - CORS**.

## Configuración de WooCommerce

### Configuración General

```
WooCommerce → Settings → General
├── Store Address: Dirección de EMED
├── Selling Location: Chile
├── Currency: Chilean Peso (CLP)
└── Currency Position: Left with space
```

### Productos como Cursos

Los productos representan cursos/diplomados:

```
WooCommerce → Settings → Products
├── Shop Page: /programas/
├── Default Product Type: Simple product
├── Enable SKU: Yes
└── Reviews: Disabled (opcional)
```

### Configuración de API

```
WooCommerce → Settings → Advanced → REST API
├── Enable REST API: Yes
└── Keys: Generar consumer key/secret
```

### Categorías de Productos

Crear categorías para organizar cursos:

1. **Diplomados**
   - Mediación Familiar
   - Mediación Escolar
   - Mediación Laboral

2. **Cursos**
   - Comunicación Efectiva
   - Negociación Avanzada
   - Mediación Comunitaria

## Configuración de Astro

### Archivo `astro.config.mjs`

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Integraciones
  integrations: [react()],

  // Vite configuration
  vite: {
    plugins: [tailwindcss()]
  },

  // Output (static site)
  output: 'static',

  // Build configuration
  build: {
    inlineStylesheets: 'auto'
  },

  // Server configuration (dev)
  server: {
    port: 4321,
    host: true // permite acceso desde red local
  }
});
```

### Configuración de React

Para usar React en Astro:

```astro
---
// En cualquier archivo .astro
import ComponenteReact from '../components/ComponenteReact.tsx';
---

<!-- Diferentes estrategias de carga -->

<!-- Carga inmediata -->
<ComponenteReact client:load />

<!-- Carga cuando sea visible -->
<ComponenteReact client:visible />

<!-- Solo en el cliente (no SSR) -->
<ComponenteReact client:only="react" />

<!-- Carga cuando el navegador esté idle -->
<ComponenteReact client:idle />
```

### TypeScript Configuration

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

## Configuración de TailwindCSS

### Vite Plugin

El proyecto usa `@tailwindcss/vite` (TailwindCSS v4):

```javascript
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### Variables CSS Personalizadas

En `src/styles/theme.css`:

```css
@layer theme {
  :root {
    /* Colores institucionales */
    --color-azul: #1E3A8A;
    --color-naranjo: #EE800C;
    --color-crema: #FFF8F0;

    /* Tipografía */
    --font-sans: 'Inter Variable', system-ui, sans-serif;

    /* Espaciado */
    --container-max-width: 1280px;
  }
}
```

### Uso en Componentes

```astro
<!-- Usar variables CSS -->
<div class="bg-[var(--color-azul)] text-white">
  Contenido
</div>

<!-- O usar clases de Tailwind -->
<div class="bg-blue-900 text-white">
  Contenido
</div>
```

## Integración de APIs

### Funciones de API (`src/lib/wp.ts`)

#### Configuración Interna

```typescript
const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2`;
const wcApiUrl = `${domain}/wp-json/wc/v3`;
const graphqlUrl = import.meta.env.WP_GRAPHQL_URL;
```

#### Cache de API

Sistema de cache simple con TTL:

```typescript
const apiCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Verificar cache antes de fetch
const cacheKey = `products_${JSON.stringify(filters)}`;
const cached = apiCache.get(cacheKey);

if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
  return cached.data;
}
```

### Estrategia de Fallback

GraphQL → REST API:

```typescript
try {
  // Intentar GraphQL primero
  return await getProductsGraphQL(filters);
} catch (graphqlError) {
  // Fallback a REST API
  console.warn('GraphQL failed, using REST API');
  return await getProducts(filters);
}
```

### Autenticación WooCommerce

Dos métodos soportados:

#### 1. Query Parameters (desarrollo)
```typescript
const url = `${wcApiUrl}/products?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`;
```

#### 2. OAuth (producción recomendado)
```typescript
// Requiere configuración adicional de OAuth
// Ver: https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication
```

### Testing de APIs

#### Verificar WordPress API
```bash
curl http://localhost:8882/wp-json/wp/v2/posts
```

#### Verificar WooCommerce API
```bash
curl "http://localhost:8882/wp-json/wc/v3/products?consumer_key=tu_key&consumer_secret=tu_secret"
```

#### Verificar GraphQL
```bash
curl -X POST http://localhost:8882/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { nodes { name } } }"}'
```

## Configuración de Producción

### Variables de Entorno

Crea `.env.production`:

```env
WP_DOMAIN="https://cms.emed.cl"
WP_API_URL="https://cms.emed.cl/wp-json/v2"
WP_GRAPHQL_URL="https://cms.emed.cl/graphql"
WC_KEY="ck_production_key_here"
WC_SECRET="cs_production_secret_here"
```

### Build para Producción

```bash
# Usar variables de producción
NODE_ENV=production npm run build
```

### Consideraciones de Seguridad

1. **HTTPS**: Siempre usar HTTPS en producción
2. **API Keys**: Rotar credenciales periódicamente
3. **CORS**: Restringir orígenes permitidos
4. **Rate Limiting**: Implementar en WordPress
5. **Firewall**: Proteger endpoints de WordPress

## Troubleshooting

### Error: "Cannot fetch products"

**Causa**: Credenciales incorrectas o API no disponible

**Solución**:
1. Verifica las credenciales en `.env`
2. Confirma que WordPress está accesible
3. Revisa los logs de consola para más detalles

### Error: "GraphQL endpoint not found"

**Causa**: WPGraphQL no está instalado o configurado

**Solución**:
1. Instala WPGraphQL plugin
2. Verifica que el endpoint esté activo en `/graphql`
3. Revisa permalinks de WordPress

### CORS Errors

**Causa**: Frontend y WordPress en diferentes dominios

**Solución**:
1. Instala plugin CORS en WordPress
2. O configura headers en `.htaccess` o `wp-config.php`

### Build Errors

**Causa**: Datos faltantes de la API durante build

**Solución**:
1. Verifica que WordPress esté corriendo durante el build
2. Confirma que hay productos publicados en WooCommerce
3. Revisa la conexión de red

---

**Última actualización**: Octubre 2025

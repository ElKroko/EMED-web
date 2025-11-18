# 🎓 EMED-web

Sitio web institucional para EMED - Escuela de Mediación, construido con Astro, React y WordPress como CMS headless.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Desarrollo](#desarrollo)
- [Deploy](#deploy)
- [Documentación](#documentación)

## 📖 Descripción

EMED-web es el sitio web oficial de la Escuela de Mediación EMED, una institución con más de 20 años de experiencia formando mediadores profesionales en Chile. El sitio presenta:

- **Catálogo de Programas**: Diplomados y cursos de mediación (familiar, escolar, laboral, comunitaria)
- **Sistema de Gestión de Contenido**: Integración con WordPress/WooCommerce para administrar cursos
- **Visualizaciones Interactivas**: Mapa de impacto regional con D3.js
- **Diseño Responsive**: Interfaz moderna y accesible en todos los dispositivos
- **Optimización SEO**: Meta tags, URLs amigables y rendimiento optimizado

## 🛠️ Tecnologías

### Frontend
- **[Astro](https://astro.build)** 5.10.1 - Framework de sitios estáticos
- **[React](https://react.dev)** 19.1.0 - Componentes interactivos
- **[TailwindCSS](https://tailwindcss.com)** 4.1.11 - Framework de estilos
- **[TypeScript](https://www.typescriptlang.org)** - Tipado estático

### Visualización de Datos
- **[D3.js](https://d3js.org)** 7.9.0 - Gráficos y mapas interactivos
- **[Leaflet](https://leafletjs.com)** 1.9.4 - Mapas geográficos

### Backend/CMS
- **WordPress** - Sistema de gestión de contenido (headless)
- **WooCommerce** - Gestión de productos/cursos
- **GraphQL + REST API** - Consultas de datos

### Diseño
- **Inter Variable Font** - Tipografía principal
- **Sistema de colores personalizado** - Paleta institucional EMED

## 📦 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **WordPress** con WooCommerce y WPGraphQL (para desarrollo con datos reales)
- **Git** (opcional, para control de versiones)

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd EMED-web
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```env
WP_DOMAIN="http://tu-wordpress.com"
WP_API_URL="http://tu-wordpress.com/wp-json/v2"
WP_GRAPHQL_URL="http://tu-wordpress.com/graphql"
WC_KEY="tu_consumer_key"
WC_SECRET="tu_consumer_secret"
```

## ⚙️ Configuración

### WordPress/WooCommerce

El proyecto requiere una instancia de WordPress con:
- **WooCommerce** instalado y configurado
- **WPGraphQL** y **WPGraphQL for WooCommerce** (plugins)
- **Advanced Custom Fields (ACF)** para campos personalizados

Ver [docs/WORDPRESS-WOOCOMMERCE.md](docs/WORDPRESS-WOOCOMMERCE.md) para instrucciones detalladas.

### Campos Personalizados

Los productos de WooCommerce deben tener campos ACF personalizados:
- Tipo de programa (Diplomado/Curso)
- Duración
- Modalidad (Presencial/Online/Mixto)
- Temario
- Beneficios
- Requisitos
- Metodología
- Certificación

Ver [wordpress-config/acf-emed-fields.php](wordpress-config/acf-emed-fields.php) para la configuración completa.

## 🎮 Comandos Disponibles

| Comando | Acción |
|---------|--------|
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run astro` | Ejecuta comandos CLI de Astro |
| `./deploy.sh` | Genera build y crea archivo comprimido para deploy |

## 📁 Estructura del Proyecto

```
EMED-web/
├── public/                    # Archivos estáticos
│   ├── data/                 # Datos GeoJSON y CSV
│   └── favicon.svg
├── src/
│   ├── assets/               # Imágenes y recursos
│   ├── components/
│   │   ├── examples/         # Componentes de ejemplo
│   │   ├── forms/            # Formularios (contacto, newsletter)
│   │   ├── layout/           # Header, Footer
│   │   ├── sections/         # Secciones reutilizables
│   │   └── ui/               # Componentes UI básicos
│   ├── layouts/
│   │   └── Layout.astro      # Layout principal
│   ├── lib/
│   │   └── wp.ts             # Funciones API WordPress/WooCommerce
│   ├── pages/                # Páginas del sitio
│   │   ├── index.astro       # Home
│   │   ├── programas/        # Páginas dinámicas de programas
│   │   ├── diplomados/       # Páginas de diplomados
│   │   └── ...
│   ├── styles/               # Estilos globales y temas
│   │   ├── base/             # Reset y tipografía
│   │   ├── components/       # Estilos de componentes
│   │   ├── global.css        # Estilos globales
│   │   └── theme.css         # Variables de tema
│   └── types/                # Definiciones TypeScript
├── data/                     # Datos estáticos (GeoJSON, CSV)
├── docs/                     # Documentación del proyecto
├── wordpress-config/         # Configuración WordPress/ACF
├── astro.config.mjs          # Configuración Astro
├── tsconfig.json             # Configuración TypeScript
├── package.json              # Dependencias
└── deploy.sh                 # Script de deploy
```

## 👨‍💻 Desarrollo

### Crear una nueva página

1. Crear archivo en `src/pages/`:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Mi Nueva Página">
  <h1>Contenido aquí</h1>
</Layout>
```

2. La página estará disponible en la URL correspondiente al nombre del archivo

### Crear un componente

1. Crear archivo en la carpeta apropiada:
   - `src/components/ui/` - Componentes básicos
   - `src/components/sections/` - Secciones completas
   - `src/components/layout/` - Componentes de estructura

2. Ejemplo de componente:
```astro
---
export interface Props {
  title: string;
}
const { title } = Astro.props;
---

<div class="mi-componente">
  <h2>{title}</h2>
</div>
```

### Integración con WordPress

Los datos de WordPress/WooCommerce se obtienen mediante las funciones en `src/lib/wp.ts`:

```typescript
import { getEmedProducts, getEmedProductBySlug } from '../lib/wp';

// Obtener todos los productos
const productos = await getEmedProducts();

// Obtener producto por slug
const producto = await getEmedProductBySlug('mediacion-familiar');
```

Ver [docs/DESARROLLO.md](docs/DESARROLLO.md) para más detalles.

## 🚀 Deploy

### Build de Producción

```bash
npm run build
```

Esto genera los archivos estáticos optimizados en `./dist/`

### Deploy Automatizado

El proyecto incluye un script de deploy que:
1. Construye el proyecto
2. Crea un archivo `.tar.gz` con timestamp
3. Almacena el archivo en `./deploys/`

```bash
./deploy.sh
```

### Subir al Hosting

1. Ejecuta `./deploy.sh`
2. Sube el archivo `.tar.gz` generado a tu hosting
3. Extrae el contenido: `tar -xzf archivo.tar.gz`

Ver [docs/DEPLOY.md](docs/DEPLOY.md) para instrucciones detalladas.

## 📚 Documentación

- **[Arquitectura](docs/ARQUITECTURA.md)** - Stack tecnológico y patrones de diseño
- **[Configuración](docs/CONFIGURACION.md)** - Variables de entorno y setup
- **[Componentes](docs/COMPONENTES.md)** - Catálogo de componentes UI
- **[WordPress/WooCommerce](docs/WORDPRESS-WOOCOMMERCE.md)** - Integración CMS
- **[Estilos y Temas](docs/ESTILOS-Y-TEMAS.md)** - Sistema de diseño
- **[Deploy](docs/DEPLOY.md)** - Proceso de despliegue
- **[Desarrollo](docs/DESARROLLO.md)** - Guía para desarrolladores

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es propiedad de EMED - Escuela de Mediación.

## 📧 Contacto

EMED - Escuela de Mediación
- Web: [www.emed.cl](http://www.emed.cl)
- Email: info@emed.cl

---

**Desarrollado con ❤️ para EMED - Formando Mediadores desde 2005**

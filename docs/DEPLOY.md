# 🚀 Guía de Deploy - EMED-web

## Tabla de Contenidos
- [Proceso de Build](#proceso-de-build)
- [Script de Deploy Automático](#script-de-deploy-automático)
- [Deploy Manual](#deploy-manual)
- [Opciones de Hosting](#opciones-de-hosting)
- [Configuración de Producción](#configuración-de-producción)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)

## Proceso de Build

### 1. Build Local

```bash
# Instalar dependencias (primera vez)
npm install

# Generar build de producción
npm run build
```

**Resultado**: Carpeta `./dist/` con archivos estáticos optimizados.

### 2. Archivos Generados

```
dist/
├── index.html                    # Página principal
├── nosotros/
│   └── index.html               # Página "Nosotros"
├── programas/
│   ├── index.html               # Listado de programas
│   ├── mediacion-familiar/
│   │   └── index.html           # Programa individual
│   └── ...
├── _astro/                      # Assets optimizados
│   ├── *.js                     # JavaScript minificado
│   ├── *.css                    # CSS optimizado
│   └── *.woff2                  # Fuentes
├── data/                        # Datos estáticos
│   ├── chile_regiones_emed_simplified.geojson
│   └── datos_regionales_emed.csv
└── favicon.svg
```

### 3. Previsualización Local

```bash
# Preview del build
npm run preview

# Servidor en http://localhost:4321
```

## Script de Deploy Automático

### Uso del Script

**Archivo**: `deploy.sh`

```bash
# Dar permisos de ejecución (primera vez)
chmod +x deploy.sh

# Ejecutar deploy
./deploy.sh
```

### Proceso del Script

1. **Crea directorio de deploys** (si no existe)
2. **Ejecuta build** (`npm run build`)
3. **Genera timestamp** para nombre único
4. **Comprime archivos** en formato `.tar.gz`
5. **Guarda en** `./deploys/emed-web-YYYYMMDD_HHMMSS.tar.gz`

### Output del Script

```
🚀 Iniciando proceso de deploy de EMED Web...
========================================
📦 Construyendo el proyecto...

> emed-web@0.0.1 build
> astro build

✅ Build completado exitosamente

🗜️  Comprimiendo archivos para deploy...
✅ Archivo comprimido creado: deploys/emed-web-20251005_143022.tar.gz
📊 Tamaño del archivo: 2.3M

🎉 Deploy listo para subir!
========================================
📁 Archivo: deploys/emed-web-20251005_143022.tar.gz
📤 Sube este archivo a tu hosting
🌐 Extrae el contenido con: tar -xzf archivo.tar.gz
```

### Contenido del Archivo Comprimido

- ✅ Todas las páginas HTML estáticas
- ✅ CSS y JS optimizados y minificados
- ✅ Fuentes e imágenes
- ✅ Archivos de datos (JSON/CSV)
- ✅ Favicon y assets

## Deploy Manual

### Opción 1: FTP/SFTP

1. **Hacer build**:
```bash
npm run build
```

2. **Subir contenido de `dist/`** via FTP:
   - Host: tu-servidor.com
   - Usuario: tu-usuario
   - Puerto: 21 (FTP) o 22 (SFTP)
   - Directorio destino: `/public_html` o `/www`

3. **Herramientas recomendadas**:
   - FileZilla (GUI)
   - WinSCP (Windows)
   - Cyberduck (Mac)

### Opción 2: cPanel

1. **Hacer build y comprimir**:
```bash
npm run build
cd dist
tar -czf emed-web.tar.gz .
```

2. **Subir archivo** via cPanel File Manager

3. **Extraer en servidor**:
```bash
cd /public_html
tar -xzf emed-web.tar.gz
rm emed-web.tar.gz
```

### Opción 3: SSH

```bash
# 1. Hacer build
npm run build

# 2. Comprimir
cd dist
tar -czf ../emed-web.tar.gz .

# 3. Subir via SCP
scp emed-web.tar.gz usuario@servidor.com:/path/to/web

# 4. Conectar via SSH
ssh usuario@servidor.com

# 5. Extraer
cd /path/to/web
tar -xzf emed-web.tar.gz
rm emed-web.tar.gz
```

## Opciones de Hosting

### 1. Netlify (Recomendado)

**Ventajas**:
- Deploy automático desde Git
- SSL gratis
- CDN global
- Preview de branches

**Setup**:
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Vercel

**Ventajas**:
- Deploy automático
- Edge functions
- Analytics gratis

**Setup**:
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### 3. GitHub Pages

**Ventajas**:
- Gratis para repos públicos
- Fácil setup

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Hosting Tradicional (Shared Hosting)

**Requisitos**:
- Apache o Nginx
- Acceso FTP/SFTP
- Sin requerimientos de Node.js (archivos estáticos)

**Configuración Apache** (`.htaccess`):
```apache
# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 5. AWS S3 + CloudFront

**Ventajas**:
- Escalabilidad
- CDN global
- Pay-as-you-go

**Deploy con AWS CLI**:
```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://mi-bucket-emed --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1234567890 \
  --paths "/*"
```

## Configuración de Producción

### Variables de Entorno

**Archivo**: `.env.production`

```env
# WordPress Production
WP_DOMAIN="https://cms.emed.cl"
WP_API_URL="https://cms.emed.cl/wp-json/v2"
WP_GRAPHQL_URL="https://cms.emed.cl/graphql"

# WooCommerce Production Keys
WC_KEY="ck_production_xxxxx"
WC_SECRET="cs_production_xxxxx"
```

**Build con variables de producción**:
```bash
NODE_ENV=production npm run build
```

### Optimizaciones de Producción

#### 1. Astro Build Optimizations

Ya incluidas por defecto:
- Minificación HTML/CSS/JS
- Tree-shaking
- Code splitting
- Asset optimization

#### 2. Imágenes

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero.jpg';
---

<!-- Astro optimiza automáticamente -->
<Image
  src={hero}
  alt="Hero"
  width={1200}
  height={800}
  format="webp"
  quality={80}
/>
```

#### 3. Fuentes

Ya optimizadas con `@fontsource-variable/inter`:
- Fuentes locales (no Google Fonts)
- Variable font (menor tamaño)
- Subset solo caracteres usados

### Security Headers

**Netlify** (`netlify.toml`):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src 'self' https:; script-src 'self' 'unsafe-inline'"
```

**Apache** (`.htaccess`):
```apache
<IfModule mod_headers.c>
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## CI/CD

### GitHub Actions

**Archivo**: `.github/workflows/deploy.yml`

```yaml
name: Deploy EMED-web

on:
  push:
    branches: [main]

env:
  NODE_VERSION: 18

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          WP_DOMAIN: ${{ secrets.WP_DOMAIN }}
          WP_API_URL: ${{ secrets.WP_API_URL }}
          WP_GRAPHQL_URL: ${{ secrets.WP_GRAPHQL_URL }}
          WC_KEY: ${{ secrets.WC_KEY }}
          WC_SECRET: ${{ secrets.WC_SECRET }}
        run: npm run build

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --dir=dist --prod
```

**Secrets necesarios** (GitHub → Settings → Secrets):
- `WP_DOMAIN`
- `WP_API_URL`
- `WP_GRAPHQL_URL`
- `WC_KEY`
- `WC_SECRET`
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### GitLab CI/CD

**Archivo**: `.gitlab-ci.yml`

```yaml
image: node:18

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
  only:
    - main

deploy:
  stage: deploy
  script:
    - apt-get update && apt-get install -y lftp
    - lftp -c "set ftp:ssl-allow no; open -u $FTP_USER,$FTP_PASSWORD $FTP_HOST; mirror -Rev dist/ /public_html --ignore-time --parallel=10"
  dependencies:
    - build
  only:
    - main
```

## Troubleshooting

### Error: Build falla por API no disponible

**Problema**: WordPress no accesible durante build

**Solución**:
1. Verificar que WordPress esté online
2. Verificar credenciales en `.env`
3. Verificar conexión de red
4. Usar datos mock si WordPress está offline

### Error: Assets no cargan (404)

**Problema**: Rutas de assets incorrectas

**Solución**:
```javascript
// astro.config.mjs
export default defineConfig({
  // Si se despliega en subdirectorio
  base: '/subdirectorio/',
  // Si es dominio raíz
  base: '/'
});
```

### Error: Archivos muy grandes

**Problema**: Límite de tamaño excedido

**Solución**:
1. Optimizar imágenes:
```bash
# Instalar imagemagick
convert input.jpg -quality 80 -resize 1200x output.jpg
```

2. Excluir archivos innecesarios:
```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        external: ['large-unused-library']
      }
    }
  }
});
```

### Error: Páginas dinámicas no funcionan

**Problema**: Routing de páginas `[id].astro`

**Solución**:
Asegurar que `getStaticPaths()` esté implementado:
```astro
---
export async function getStaticPaths() {
  const programs = await getEmedProducts();

  return programs.map(program => ({
    params: { id: program.slug },
    props: { program }
  }));
}
---
```

### Performance Issues

**Problema**: Sitio carga lento

**Solución**:
1. **Habilitar compresión** (Gzip/Brotli)
2. **Usar CDN** (CloudFlare, Netlify)
3. **Lazy load** componentes pesados:
```astro
<MapaChileGeoJSON client:visible />
```
4. **Cachear assets**:
```apache
# .htaccess
ExpiresActive On
ExpiresDefault "access plus 1 year"
```

### CORS Errors en Producción

**Problema**: API bloqueada por CORS

**Solución**:
En WordPress, agregar dominio permitido:
```php
// functions.php
add_filter('allowed_http_origins', function($origins) {
    $origins[] = 'https://emed.cl';
    return $origins;
});
```

---

**Última actualización**: Octubre 2025

# Guía de Deployment - EMED Web

## 📦 Preparación para Deploy

### Opción 1: Deploy Automático con ZIP (Recomendado)

Este método crea automáticamente un archivo ZIP listo para subir a tu hosting.

```bash
npm run deploy:zip
```

Esto hace lo siguiente:
1. Copia automáticamente todos los assets (logos, imágenes) a la carpeta `public`
2. Ejecuta el build de producción
3. Crea un archivo ZIP en la carpeta `deploys/` con todo el contenido necesario

El archivo ZIP se llamará algo como: `emed-web-20251128_143000.zip`

### Opción 2: Build Manual

Si prefieres hacer el build manualmente:

```bash
# 1. Preparar assets
npm run prepare:assets

# 2. Hacer build
npm run build
```

Después de esto, la carpeta `dist/` contendrá todos los archivos para subir a tu hosting.

## 🚀 Subir a tu Hosting

### Pasos para subir:

1. **Extrae el contenido del ZIP** (si usaste deploy:zip)
   - Sube el contenido de la carpeta `dist/` a tu servidor
   - NO subas la carpeta `dist` misma, sino su contenido

2. **Ubicación en el servidor**
   - Sube los archivos a la raíz de tu dominio o subdirectorio
   - Ejemplo: `public_html/` o `www/`

3. **Verificación**
   - Verifica que el archivo `index.html` esté en la raíz
   - Verifica que la carpeta `images/` esté presente con todos los logos

## ✅ Checklist de Assets Críticos

Asegúrate de que estos archivos estén presentes en `dist/images/`:

### Logos Comunes (`images/common/`)
- ✅ `emed_logo.svg` - Logo principal del header
- ✅ `emed_logo_footer.svg` - Logo del footer

### Logos de Marcas (`images/brands/`)
- ✅ `pasificando_logo.png` - Logo Pasificando
- ✅ `IPCHILE.png` - Logo IPCHILE
- ✅ `iram sello.png` - Sello IRAM

### Imágenes de Páginas (`images/pages/`)
- ✅ `emed_acreditado.png` - EMED Acreditado
- ✅ `logo_sence-removebg-preview.png` - Logo SENCE
- ✅ `nch2728.png` - Logo NCH
- ✅ `heroadmision.svg` - Hero de admisión
- ✅ `midhero_admision.svg` - Mid hero de admisión
- ✅ `hero.svg` - Hero principal
- ✅ `midhero.svg` - Mid hero principal

## 🔍 Solución de Problemas

### No aparecen los logos después del deploy

1. **Verifica que exista la carpeta `images/` en tu servidor**
   ```
   public_html/
   ├── images/
   │   ├── common/
   │   ├── brands/
   │   └── pages/
   ├── _astro/
   ├── index.html
   └── ...
   ```

2. **Verifica los permisos de los archivos**
   - Las carpetas deben tener permisos 755
   - Los archivos deben tener permisos 644

3. **Limpia el caché del navegador**
   - Presiona Ctrl+Shift+R (Windows/Linux) o Cmd+Shift+R (Mac)

### La fuente Ubuntu no se ve

Si la fuente Ubuntu no se carga:
1. Verifica que la carpeta `_astro/` esté en el servidor
2. Esta carpeta contiene todos los assets optimizados, incluyendo las fuentes

## 📝 Notas Importantes

- **SIEMPRE** ejecuta `npm run prepare:assets` o `npm run deploy:zip` antes del build final
- El script `prebuild` se ejecuta automáticamente antes de cada build
- Los assets en `src/assets/` son solo para desarrollo
- Los assets en `public/images/` son los que se incluyen en el build final
- NO modifiques manualmente los archivos en `dist/`, se regeneran con cada build

## 🔄 Actualización de Assets

Si añades nuevas imágenes:

1. Colócalas en `src/assets/images/` en la carpeta correspondiente
2. Actualiza las referencias en los componentes usando `/images/ruta/archivo.ext`
3. Ejecuta `npm run prepare:assets` para copiarlas a `public/`
4. Haz el build y deploy nuevamente

## 🆘 Soporte

Si tienes problemas con el deployment:
1. Verifica que todos los assets estén en `public/images/`
2. Revisa la consola del navegador para errores 404
3. Verifica que las rutas en los componentes usen `/images/` y no `/src/assets/images/`

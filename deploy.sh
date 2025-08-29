#!/bin/bash

# Script de deploy para EMED Web
# Genera build y crea ZIP para subir al hosting

echo "🚀 Iniciando proceso de deploy de EMED Web..."
echo "========================================"

# Crear directorio de deploys si no existe
mkdir -p deploys

# Generar timestamp para nombre único
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DEPLOY_NAME="emed-web-$TIMESTAMP"

echo "📦 Construyendo el proyecto..."
npm run build

# Verificar que el build fue exitoso
if [ $? -ne 0 ]; then
    echo "❌ Error en el build. Deploy cancelado."
    exit 1
fi

echo "✅ Build completado exitosamente"

echo "🗜️  Comprimiendo archivos para deploy..."

# Crear TAR.GZ del directorio dist (más compatible que ZIP)
cd dist
tar -czf "../deploys/$DEPLOY_NAME.tar.gz" .

# Volver al directorio raíz
cd ..

echo "✅ Archivo comprimido creado: deploys/$DEPLOY_NAME.tar.gz"

# Mostrar información del archivo
FILE_SIZE=$(du -h "deploys/$DEPLOY_NAME.tar.gz" | cut -f1)
echo "📊 Tamaño del archivo: $FILE_SIZE"

echo ""
echo "🎉 Deploy listo para subir!"
echo "========================================"
echo "📁 Archivo: deploys/$DEPLOY_NAME.tar.gz"
echo "📤 Sube este archivo a tu hosting"
echo "🌐 Extrae el contenido con: tar -xzf archivo.tar.gz"
echo ""
echo "📋 Archivos incluidos:"
echo "   - Todas las páginas HTML estáticas"
echo "   - CSS y JS optimizados"  
echo "   - Fuentes e imágenes"
echo "   - Archivos de datos (JSON/CSV)"
echo ""

# Listar archivos recientes en deploys
echo "📚 Deploys disponibles:"
ls -la deploys/*.tar.gz 2>/dev/null | tail -5 | while read line; do
    echo "   $line"
done

echo ""
echo "✨ ¡Deploy completado! ¡Tu sitio está listo para publicar!"
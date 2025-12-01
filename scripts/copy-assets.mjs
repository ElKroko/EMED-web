#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const srcAssetsDir = path.join(rootDir, 'src', 'assets', 'images');
const publicImagesDir = path.join(rootDir, 'public', 'images');

console.log('📁 Copiando assets a carpeta public...');

// Asegurar que existe la carpeta de destino
if (!existsSync(publicImagesDir)) {
  mkdirSync(publicImagesDir, { recursive: true });
}

// Copiar todas las imágenes de src/assets/images a public/images
try {
  cpSync(srcAssetsDir, publicImagesDir, {
    recursive: true,
    force: true
  });
  console.log('✅ Assets copiados exitosamente a public/images');
} catch (error) {
  console.error('❌ Error al copiar assets:', error.message);
  process.exit(1);
}

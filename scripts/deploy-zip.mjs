#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const deployDir = path.join(rootDir, 'deploys');

const formatTimestamp = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

const ensureDir = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const runBuild = () => {
  console.log('🚀 Ejecutando build de producción...');
  execSync('npm run build', { stdio: 'inherit' });
};

const zipDist = (outputPath) => {
  return new Promise((resolve, reject) => {
    if (!existsSync(distDir)) {
      reject(new Error('La carpeta dist no existe. Ejecuta el build antes de comprimir.'));
      return;
    }

    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(distDir, false);
    archive.finalize();
  });
};

const run = async () => {
  try {
    ensureDir(deployDir);
    runBuild();

    const zipName = `emed-web-${formatTimestamp()}.zip`;
    const zipPath = path.join(deployDir, zipName);

    console.log(`📦 Generando paquete: ${zipPath}`);
    await zipDist(zipPath);

    console.log('✅ Deploy listo. Sube el ZIP a tu hosting y extrae los archivos.');
  } catch (error) {
    console.error('❌ Error durante el deploy:', error.message);
    process.exit(1);
  }
};

run();

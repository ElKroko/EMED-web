import { Client } from 'basic-ftp';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Cargar variables de entorno
function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });

    return envVars;
  } catch (error) {
    log(`❌ Error al cargar .env: ${error.message}`, colors.red);
    log('\n💡 Asegúrate de crear un archivo .env con las credenciales FTP', colors.yellow);
    log('Ejemplo de contenido:', colors.cyan);
    log('FTP_HOST=emediacion.cl', colors.cyan);
    log('FTP_USER=emedroot_loader', colors.cyan);
    log('FTP_PASSWORD=tu_password', colors.cyan);
    log('FTP_REMOTE_PATH=/nuevo.emediacion.cl', colors.cyan);
    process.exit(1);
  }
}

// Validar que todas las variables necesarias existan
function validateEnv(env) {
  const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD', 'FTP_REMOTE_PATH'];
  const missing = required.filter(key => !env[key]);

  if (missing.length > 0) {
    log(`❌ Faltan las siguientes variables en .env:`, colors.red);
    missing.forEach(key => log(`  - ${key}`, colors.yellow));
    process.exit(1);
  }
}

// Obtener todos los archivos de un directorio recursivamente
function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Formatear bytes a tamaño legible
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Función principal de deployment
async function deploy() {
  log('\n🚀 Iniciando deployment a servidor FTP...', colors.bright + colors.cyan);
  log('═'.repeat(60), colors.cyan);

  const startTime = Date.now();
  const env = loadEnv();
  validateEnv(env);

  const distPath = join(__dirname, '..', 'dist');
  const client = new Client();
  client.ftp.verbose = false; // Cambiar a true para debug

  try {
    // 1. Verificar que existe el directorio dist
    log('\n📁 Verificando directorio dist...', colors.blue);
    try {
      statSync(distPath);
      log('✓ Directorio dist encontrado', colors.green);
    } catch (error) {
      log('❌ No se encontró el directorio dist', colors.red);
      log('💡 Ejecuta "npm run build" primero', colors.yellow);
      process.exit(1);
    }

    // 2. Obtener lista de archivos a subir
    const files = getAllFiles(distPath);
    const totalSize = files.reduce((sum, file) => sum + statSync(file).size, 0);

    log(`\n📦 Archivos a subir: ${files.length}`, colors.blue);
    log(`📊 Tamaño total: ${formatBytes(totalSize)}`, colors.blue);

    // 3. Conectar al servidor FTP
    log(`\n🔌 Conectando a ${env.FTP_HOST}...`, colors.blue);
    await client.access({
      host: env.FTP_HOST,
      user: env.FTP_USER,
      password: env.FTP_PASSWORD,
      secure: false, // Cambiar a true si el servidor soporta FTPS
    });
    log('✓ Conectado exitosamente', colors.green);

    // 4. Verificar que existe el directorio remoto
    log(`\n📂 Verificando directorio remoto: ${env.FTP_REMOTE_PATH}`, colors.blue);
    try {
      await client.cd(env.FTP_REMOTE_PATH);
      log('✓ Directorio remoto accesible', colors.green);
    } catch (error) {
      log(`❌ No se pudo acceder a ${env.FTP_REMOTE_PATH}`, colors.red);
      log('💡 Verifica que la ruta en FTP_REMOTE_PATH sea correcta', colors.yellow);
      client.close();
      process.exit(1);
    }

    // 5. Hacer backup del index.html actual (si existe)
    log('\n💾 Creando backup del index.html actual...', colors.blue);
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      await client.rename('index.html', `index.html.backup-${timestamp}`);
      log('✓ Backup creado', colors.green);
    } catch (error) {
      log('ℹ No se encontró index.html previo (primera subida)', colors.yellow);
    }

    // 6. Subir archivos
    log('\n⬆️  Subiendo archivos...', colors.blue);
    let uploadedCount = 0;
    let uploadedSize = 0;

    for (const localFile of files) {
      const relativePath = relative(distPath, localFile);
      const remoteFile = relativePath.replace(/\\/g, '/'); // Convertir \ a / para FTP
      const fileSize = statSync(localFile).size;

      // Crear directorios remotos si es necesario
      const remoteDir = remoteFile.split('/').slice(0, -1).join('/');
      if (remoteDir) {
        try {
          await client.ensureDir(remoteDir);
        } catch (error) {
          // Ignorar errores de directorios que ya existen
        }
      }

      // Subir archivo
      await client.uploadFrom(localFile, remoteFile);
      uploadedCount++;
      uploadedSize += fileSize;

      const progress = Math.round((uploadedCount / files.length) * 100);
      process.stdout.write(`\r  Progreso: ${progress}% (${uploadedCount}/${files.length}) - ${formatBytes(uploadedSize)} subidos`);
    }

    console.log(''); // Nueva línea después del progreso
    log('✓ Todos los archivos subidos exitosamente', colors.green);

    // 7. Validar que los archivos críticos existen en el servidor
    log('\n✅ Validando deployment...', colors.blue);
    const criticalFiles = ['index.html', '_astro', 'favicon.svg'];
    let validationPassed = true;

    for (const file of criticalFiles) {
      try {
        const list = await client.list();
        const exists = list.some(item => item.name === file);

        if (exists) {
          log(`✓ ${file} verificado`, colors.green);
        } else {
          log(`❌ ${file} no encontrado`, colors.red);
          validationPassed = false;
        }
      } catch (error) {
        log(`⚠ No se pudo verificar ${file}`, colors.yellow);
      }
    }

    // 8. Resumen final
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log('\n═'.repeat(60), colors.cyan);
    if (validationPassed) {
      log('🎉 ¡Deployment completado exitosamente!', colors.bright + colors.green);
    } else {
      log('⚠️  Deployment completado con advertencias', colors.yellow);
    }
    log(`⏱️  Tiempo total: ${duration}s`, colors.blue);
    log(`📦 Archivos subidos: ${uploadedCount}`, colors.blue);
    log(`📊 Total transferido: ${formatBytes(uploadedSize)}`, colors.blue);
    log(`🌐 URL: https://${env.FTP_REMOTE_PATH.replace('/', '')}`, colors.cyan);
    log('═'.repeat(60), colors.cyan);

  } catch (error) {
    log('\n❌ Error durante el deployment:', colors.red);
    log(error.message, colors.red);
    if (error.code) {
      log(`Código de error: ${error.code}`, colors.yellow);
    }
    process.exit(1);
  } finally {
    client.close();
  }
}

// Ejecutar deployment
deploy().catch(error => {
  log('\n💥 Error fatal:', colors.red);
  log(error.message, colors.red);
  process.exit(1);
});

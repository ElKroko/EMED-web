// Script temporal para extraer datos de WordPress
// Este script se ejecutará una sola vez para obtener todos los productos

import { getEmedProducts } from './src/lib/wp.ts';
import { writeFileSync } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';

async function extractWordPressData() {
  console.log('🔄 Conectando a WordPress...');

  try {
    // Extraer todos los productos (aumentamos el límite para asegurarnos de obtener todo)
    const productos = await getEmedProducts({ per_page: 100 });

    console.log(`✅ Se extrajeron ${productos.length} productos`);

    // Separar por tipo
    const diplomados = productos.filter(p => p.tipo === 'Diplomado');
    const cursos = productos.filter(p => p.tipo === 'Curso');

    console.log(`📚 Diplomados: ${diplomados.length}`);
    console.log(`📖 Cursos: ${cursos.length}`);

    // Crear directorio de datos si no existe
    const dataDir = './src/data';
    await mkdir(dataDir, { recursive: true });

    // Guardar todos los productos
    writeFileSync(
      `${dataDir}/productos.json`,
      JSON.stringify(productos, null, 2),
      'utf-8'
    );

    // Guardar diplomados por separado
    writeFileSync(
      `${dataDir}/diplomados.json`,
      JSON.stringify(diplomados, null, 2),
      'utf-8'
    );

    // Guardar cursos por separado
    writeFileSync(
      `${dataDir}/cursos.json`,
      JSON.stringify(cursos, null, 2),
      'utf-8'
    );

    // Crear un archivo de índice con información resumida
    const indice = {
      fecha_extraccion: new Date().toISOString(),
      total_productos: productos.length,
      total_diplomados: diplomados.length,
      total_cursos: cursos.length,
      diplomados_lista: diplomados.map(d => ({
        id: d.id,
        nombre: d.nombre,
        slug: d.slug,
        destacado: d.destacado
      })),
      cursos_lista: cursos.map(c => ({
        id: c.id,
        nombre: c.nombre,
        slug: c.slug,
        destacado: c.destacado
      }))
    };

    writeFileSync(
      `${dataDir}/indice.json`,
      JSON.stringify(indice, null, 2),
      'utf-8'
    );

    console.log('\n✅ Datos extraídos exitosamente:');
    console.log(`   📁 ${dataDir}/productos.json`);
    console.log(`   📁 ${dataDir}/diplomados.json`);
    console.log(`   📁 ${dataDir}/cursos.json`);
    console.log(`   📁 ${dataDir}/indice.json`);

    console.log('\n📋 Lista de productos extraídos:');
    console.log('\nDIPLOMADOS:');
    diplomados.forEach(d => {
      console.log(`  - ${d.nombre} (${d.slug}) ${d.destacado ? '⭐' : ''}`);
    });

    console.log('\nCURSOS:');
    cursos.forEach(c => {
      console.log(`  - ${c.nombre} (${c.slug}) ${c.destacado ? '⭐' : ''}`);
    });

  } catch (error) {
    console.error('❌ Error al extraer datos:', error);
    process.exit(1);
  }
}

extractWordPressData();

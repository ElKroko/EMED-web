// Script para extraer datos de WordPress usando fetch directo
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

const WP_API_URL = 'http://localhost:8882/wp-json';
const WC_KEY = 'ck_667844b44decf287e8e67fcac05b943bc5eab93e';
const WC_SECRET = 'cs_25daab25468834f2f4ac14358e71e159a664887f';

async function fetchProducts() {
  const url = `${WP_API_URL}/wc/v3/products?per_page=100&consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`;

  console.log('🔄 Conectando a WordPress...');
  console.log(`URL: ${WP_API_URL}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    console.log(`✅ Se obtuvieron ${products.length} productos de WooCommerce`);

    return products;
  } catch (error) {
    console.error('❌ Error al conectar con WordPress:', error.message);
    console.log('\nℹ️  Asegúrate de que:');
    console.log('   1. WordPress está corriendo en http://localhost:8882');
    console.log('   2. WooCommerce está instalado y activado');
    console.log('   3. Las credenciales API son correctas');
    return null;
  }
}

function getMetaValue(metaData, key) {
  if (!Array.isArray(metaData)) return undefined;
  const meta = metaData.find(m => m.key === key);
  return meta ? meta.value : undefined;
}

function mapWooCommerceToEmed(product) {
  const metaData = product.meta_data || [];

  // Extraer campos personalizados
  const tipo = getMetaValue(metaData, '_emed_tipo') || 'Curso';
  const duracion = getMetaValue(metaData, '_emed_duracion') || '';
  const modalidad = getMetaValue(metaData, '_emed_modalidad') || 'Presencial';
  const destacado = getMetaValue(metaData, '_emed_destacado') === '1' || getMetaValue(metaData, '_emed_destacado') === true;
  const ubicacion = getMetaValue(metaData, '_emed_ubicacion') || '';

  // Arrays
  const beneficios = getMetaValue(metaData, '_emed_beneficios') || [];
  const temario = getMetaValue(metaData, '_emed_temario') || [];
  const requisitos = getMetaValue(metaData, '_emed_requisitos') || [];
  const metodologia = getMetaValue(metaData, '_emed_metodologia') || [];
  const certificacion = getMetaValue(metaData, '_emed_certificacion') || [];
  const empleabilidad = getMetaValue(metaData, '_emed_empleabilidad') || [];

  // Brochure
  const brochureUrl = getMetaValue(metaData, '_emed_brochure');
  const brochure = brochureUrl ? {
    url: brochureUrl,
    title: `Brochure ${product.name}`,
    filename: brochureUrl.split('/').pop() || 'brochure.pdf',
    filesize: 0
  } : undefined;

  return {
    id: product.id,
    nombre: product.name,
    slug: product.slug,
    descripcion: product.description,
    descripcion_corta: product.short_description,
    precio: parseFloat(product.price) || 0,
    precio_regular: parseFloat(product.regular_price) || 0,
    precio_rebajado: product.sale_price ? parseFloat(product.sale_price) : undefined,
    precio_formateado: `$${new Intl.NumberFormat('es-CL').format(parseFloat(product.price) || 0)}`,
    imagen: product.images?.[0]?.src || '',
    galeria: product.images?.map(img => img.src) || [],
    tipo,
    duracion,
    modalidad,
    destacado,
    ubicacion,
    beneficios: Array.isArray(beneficios) ? beneficios : [],
    temario: Array.isArray(temario) ? temario : [],
    requisitos: Array.isArray(requisitos) ? requisitos : [],
    metodologia: Array.isArray(metodologia) ? metodologia : [],
    certificacion: Array.isArray(certificacion) ? certificacion : [],
    empleabilidad: Array.isArray(empleabilidad) ? empleabilidad : [],
    brochure,
    categorias: product.categories?.map(cat => cat.name) || [],
    etiquetas: product.tags?.map(tag => tag.name) || [],
    en_stock: product.stock_status === 'instock'
  };
}

async function extractWordPressData() {
  const rawProducts = await fetchProducts();

  if (!rawProducts) {
    console.log('\n⚠️  No se pudieron extraer datos. Usando datos de ejemplo...');
    return;
  }

  // Mapear productos al formato EMED
  const productos = rawProducts.map(mapWooCommerceToEmed);

  // Separar por tipo
  const diplomados = productos.filter(p => p.tipo === 'Diplomado');
  const cursos = productos.filter(p => p.tipo === 'Curso');

  console.log(`📚 Diplomados: ${diplomados.length}`);
  console.log(`📖 Cursos: ${cursos.length}`);

  // Crear directorio de datos
  try {
    mkdirSync('./src/data', { recursive: true });
  } catch (e) {
    // El directorio ya existe
  }

  // Guardar archivos
  writeFileSync(
    './src/data/productos.json',
    JSON.stringify(productos, null, 2),
    'utf-8'
  );

  writeFileSync(
    './src/data/diplomados.json',
    JSON.stringify(diplomados, null, 2),
    'utf-8'
  );

  writeFileSync(
    './src/data/cursos.json',
    JSON.stringify(cursos, null, 2),
    'utf-8'
  );

  // Crear índice
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
    './src/data/indice.json',
    JSON.stringify(indice, null, 2),
    'utf-8'
  );

  console.log('\n✅ Datos extraídos exitosamente:');
  console.log('   📁 src/data/productos.json');
  console.log('   📁 src/data/diplomados.json');
  console.log('   📁 src/data/cursos.json');
  console.log('   📁 src/data/indice.json');

  console.log('\n📋 Lista de productos extraídos:');
  console.log('\nDIPLOMADOS:');
  diplomados.forEach(d => {
    console.log(`  - ${d.nombre} (${d.slug}) ${d.destacado ? '⭐' : ''}`);
  });

  console.log('\nCURSOS:');
  cursos.forEach(c => {
    console.log(`  - ${c.nombre} (${c.slug}) ${c.destacado ? '⭐' : ''}`);
  });
}

extractWordPressData();

// Funciones para trabajar con productos estáticos
import type { Producto, ProductoFiltros } from '../types/producto';

// Importar datos estáticos
import todosLosProductos from '../data/productos.json';
import diplomadosData from '../data/diplomados.json';
import cursosData from '../data/cursos.json';

/**
 * Obtiene todos los productos
 */
export function getTodosLosProductos(): Producto[] {
  return todosLosProductos as Producto[];
}

/**
 * Obtiene productos con filtros opcionales
 */
export function getProductos(filtros?: ProductoFiltros): Producto[] {
  let productos = getTodosLosProductos();

  if (filtros?.tipo) {
    productos = productos.filter(p => p.tipo === filtros.tipo);
  }

  if (filtros?.destacado !== undefined) {
    productos = productos.filter(p => p.destacado === filtros.destacado);
  }

  if (filtros?.modalidad) {
    productos = productos.filter(p => p.modalidad.includes(filtros.modalidad!));
  }

  if (filtros?.limite) {
    productos = productos.slice(0, filtros.limite);
  }

  return productos;
}

/**
 * Obtiene todos los diplomados
 */
export function getDiplomados(): Producto[] {
  return diplomadosData as Producto[];
}

/**
 * Obtiene todos los cursos
 */
export function getCursos(): Producto[] {
  return cursosData as Producto[];
}

/**
 * Obtiene productos destacados
 */
export function getProductosDestacados(): Producto[] {
  return getProductos({ destacado: true });
}

/**
 * Obtiene un producto por su slug
 */
export function getProductoPorSlug(slug: string): Producto | null {
  const producto = getTodosLosProductos().find(p => p.slug === slug);
  return producto || null;
}

/**
 * Obtiene un producto por su ID
 */
export function getProductoPorId(id: string): Producto | null {
  const producto = getTodosLosProductos().find(p => p.id === id);
  return producto || null;
}

/**
 * Obtiene diplomados destacados
 */
export function getDiplomadosDestacados(): Producto[] {
  return getDiplomados().filter(d => d.destacado);
}

/**
 * Obtiene cursos destacados
 */
export function getCursosDestacados(): Producto[] {
  return getCursos().filter(c => c.destacado);
}

/**
 * Busca productos por nombre o descripción
 */
export function buscarProductos(query: string): Producto[] {
  const queryLower = query.toLowerCase();
  return getTodosLosProductos().filter(p =>
    p.nombre.toLowerCase().includes(queryLower) ||
    p.descripcion.toLowerCase().includes(queryLower) ||
    p.descripcion_corta.toLowerCase().includes(queryLower)
  );
}

/**
 * Obtiene productos por categoría
 */
export function getProductosPorCategoria(categoria: string): Producto[] {
  return getTodosLosProductos().filter(p =>
    p.categorias.includes(categoria)
  );
}

/**
 * Obtiene productos por etiqueta
 */
export function getProductosPorEtiqueta(etiqueta: string): Producto[] {
  return getTodosLosProductos().filter(p =>
    p.etiquetas.includes(etiqueta)
  );
}

/**
 * Obtiene todas las categorías únicas
 */
export function getCategorias(): string[] {
  const categorias = new Set<string>();
  getTodosLosProductos().forEach(p => {
    p.categorias.forEach(c => categorias.add(c));
  });
  return Array.from(categorias).sort();
}

/**
 * Obtiene todas las etiquetas únicas
 */
export function getEtiquetas(): string[] {
  const etiquetas = new Set<string>();
  getTodosLosProductos().forEach(p => {
    p.etiquetas.forEach(e => etiquetas.add(e));
  });
  return Array.from(etiquetas).sort();
}

import { date } from "astro:schema"

const domain = import.meta.env.WP_DOMAIN
const apiUrl = `${domain}/wp-json/wp/v2`
console.log(domain)

export const getPageInfo = async (slug:string) => {
    const response = await fetch(`${apiUrl}/pages?slug=${slug}`)
    if (!response.ok) {
        throw new Error(`Error fetching page info: ${response.statusText}`);
    }
    const [data] = await response.json();
    const { title: {rendered : title}, content: {rendered:content}, date, modified } = data;

    return { title, content }
}

export const getLatestPosts = async ({perPage = 10}: {perPage?: number} = {}) => {
    const response = await fetch(`${apiUrl}/posts?per_page=${perPage}&_embed`)
    if (!response.ok) {
        throw new Error(`Error fetching latest posts: ${response.statusText}`);
    }
    const results = await response.json();
    if (!results.length) throw new Error("No posts found");

    console.log(results)

    const posts = results.map((post: { _embedded?: any; title?: any; excerpt?: any; content?: any; date?: any; slug?: any }) => {
        const {
            title: { rendered: title },
            excerpt: { rendered: excerpt },
            content: { rendered: content },
            date,
            slug
        } = post

        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

        return {title, excerpt, content, date, slug, featuredImage}
    })
    return posts;
}

const wcApiUrl = `${domain}/wp-json/wc/v3`
const graphqlUrl = import.meta.env.WP_GRAPHQL_URL || `${domain}/graphql`

// Import types
import type { 
  WooCommerceProduct, 
  WooCommerceProductsResponse, 
  EmedProduct, 
  EmedProductsResponse,
  ProductFilters,
  WooCommerceError,
  ApiError 
} from '../types/woocommerce';

// Cache for API responses
const apiCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper function to get meta value from WooCommerce product
const getMetaValue = (metaData: any[], key: string, defaultValue: any = ''): any => {
  const meta = metaData?.find((m: any) => m.key === key);
  if (!meta) return defaultValue;
  
  // Handle boolean values
  if (typeof meta.value === 'string' && (meta.value === 'true' || meta.value === 'false')) {
    return meta.value === 'true';
  }
  
  // Try to parse JSON for arrays/objects
  if (typeof meta.value === 'string' && (meta.value.startsWith('[') || meta.value.startsWith('{'))) {
    try {
      const parsed = JSON.parse(meta.value);
      // For temario, we need to transform the format to match the expected structure
      if (key === '_emed_temario' && Array.isArray(parsed)) {
        return parsed.map((item, index) => ({
          modulo: item,
          contenido: [`Contenido del ${item}`] // Fallback content
        }));
      }
      return parsed;
    } catch {
      // If JSON parsing fails, treat as array of strings for repeater fields
      if (key.includes('_emed_')) {
        return [meta.value];
      }
      return meta.value;
    }
  }
  
  return meta.value;
};

// Format Chilean peso price
const formatPrice = (price: string): string => {
  if (!price || price === '0') return '';
  const numericPrice = parseInt(price);
  return `$${numericPrice.toLocaleString('es-CL')}`;
};

// Map WooCommerce product to EMED product format
const mapWooCommerceToEmed = (wcProduct: WooCommerceProduct): EmedProduct => {
  return {
    // Base WooCommerce fields
    id: wcProduct.id,
    name: wcProduct.name,
    slug: wcProduct.slug,
    permalink: wcProduct.permalink,
    description: wcProduct.description,
    short_description: wcProduct.short_description,
    price: wcProduct.price,
    regular_price: wcProduct.regular_price,
    sale_price: wcProduct.sale_price,
    featured: wcProduct.featured,
    on_sale: wcProduct.on_sale,
    stock_status: wcProduct.stock_status,
    images: wcProduct.images || [],
    categories: wcProduct.categories || [],
    
    // EMED custom fields from meta_data (simplified)
    tipo: getMetaValue(wcProduct.meta_data, '_emed_tipo', 'Curso') as 'Diplomado' | 'Curso',
    duracion: getMetaValue(wcProduct.meta_data, '_emed_duracion', ''),
    modalidad: getMetaValue(wcProduct.meta_data, '_emed_modalidad', 'Online') as 'Presencial' | 'Online' | 'Mixto',
    destacado: getMetaValue(wcProduct.meta_data, '_emed_destacado', 'false') === 'true',
    beneficios: getMetaValue(wcProduct.meta_data, '_emed_beneficios', []),
    temario: getMetaValue(wcProduct.meta_data, '_emed_temario', []),
    ubicacion: getMetaValue(wcProduct.meta_data, '_emed_ubicacion'),
    requisitos: getMetaValue(wcProduct.meta_data, '_emed_requisitos', []),
    metodologia: getMetaValue(wcProduct.meta_data, '_emed_metodologia', []),
    certificacion: getMetaValue(wcProduct.meta_data, '_emed_certificacion', []),
    empleabilidad: getMetaValue(wcProduct.meta_data, '_emed_empleabilidad', []),
    precio_formateado: formatPrice(wcProduct.price),
    brochure: (() => {
      const brochureData = getMetaValue(wcProduct.meta_data, '_emed_brochure', null);
      // Si brochureData es un objeto ACF file field
      if (brochureData && typeof brochureData === 'object' && brochureData.url) {
        return {
          url: brochureData.url,
          title: brochureData.title || brochureData.filename || 'Brochure',
          filename: brochureData.filename,
          filesize: brochureData.filesize
        };
      }
      // Si brochureData es solo una URL string
      if (brochureData && typeof brochureData === 'string') {
        return {
          url: brochureData,
          title: 'Brochure'
        };
      }
      return undefined;
    })()
  };
};

// Build query string for API filters
const buildQueryString = (filters: ProductFilters): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
};

// Get all WooCommerce products
export const getProducts = async (filters: ProductFilters = {}): Promise<WooCommerceProductsResponse> => {
  const queryString = buildQueryString(filters);
  
  // Try query parameter authentication as fallback
  const authParams = `consumer_key=${import.meta.env.WC_KEY}&consumer_secret=${import.meta.env.WC_SECRET}`;
  const separator = queryString ? '&' : '?';
  const url = `${wcApiUrl}/products${queryString ? `?${queryString}` : ''}${separator}${authParams}`;
  
  // Debug logging
  console.log('=== WooCommerce API Debug ===');
  console.log('URL (without credentials):', `${wcApiUrl}/products${queryString ? `?${queryString}` : ''}`);
  console.log('WC_KEY exists:', !!import.meta.env.WC_KEY);
  console.log('WC_SECRET exists:', !!import.meta.env.WC_SECRET);
  console.log('WC_KEY starts with:', import.meta.env.WC_KEY?.substring(0, 10));
  console.log('WC_SECRET starts with:', import.meta.env.WC_SECRET?.substring(0, 10));
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Error response body:', errorData);
      const error = new Error(`Error fetching products: ${response.statusText}`) as ApiError;
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    console.error('WooCommerce API Error:', error);
    throw error;
  }
};

// Get all EMED products (mapped format) - Now uses GraphQL first
export const getEmedProducts = async (filters: ProductFilters = {}): Promise<EmedProductsResponse> => {
  console.log('🎯 getEmedProducts called with filters:', filters);
  
  // Try GraphQL first, fallback to REST API if it fails
  try {
    return await getProductsGraphQL(filters);
  } catch (graphqlError) {
    console.warn('GraphQL failed, falling back to REST API:', graphqlError);
    
    const cacheKey = `emed_products_rest_${JSON.stringify(filters)}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    
    try {
      const wcProducts = await getProducts(filters);
      const emedProducts = wcProducts.map(mapWooCommerceToEmed);
      
      apiCache.set(cacheKey, {
        data: emedProducts,
        timestamp: Date.now()
      });
      
      return emedProducts;
    } catch (restError) {
      console.error('Both GraphQL and REST API failed:', { graphqlError, restError });
      throw restError;
    }
  }
};

// Get single EMED product by ID - Now uses GraphQL first
export const getEmedProductById = async (id: number): Promise<EmedProduct | null> => {
  console.log('🎯 getEmedProductById called with id:', id);
  
  // Try GraphQL first
  try {
    const data = await executeGraphQLQuery(SINGLE_PRODUCT_QUERY, { id: id.toString() });
    
    if (!data.product) return null;
    
    const emedProduct = mapGraphQLToEmed(data.product);
    
    // Cache the result
    const cacheKey = `emed_product_graphql_${id}`;
    apiCache.set(cacheKey, {
      data: emedProduct,
      timestamp: Date.now()
    });
    
    return emedProduct;
  } catch (graphqlError) {
    console.warn('GraphQL failed for single product, falling back to REST API:', graphqlError);
    
    // Fallback to REST API
    const cacheKey = `emed_product_rest_${id}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    
    try {
      const response = await fetch(`${wcApiUrl}/products/${id}?consumer_key=${import.meta.env.WC_KEY}&consumer_secret=${import.meta.env.WC_SECRET}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Error fetching product ${id}: ${response.statusText}`);
      }
      
      const wcProduct = await response.json();
      const emedProduct = mapWooCommerceToEmed(wcProduct);
      
      apiCache.set(cacheKey, {
        data: emedProduct,
        timestamp: Date.now()
      });
      
      return emedProduct;
    } catch (restError) {
      console.error(`Both GraphQL and REST failed for product ${id}:`, { graphqlError, restError });
      return null;
    }
  }
};

// Get single EMED product by slug
export const getEmedProductBySlug = async (slug: string): Promise<EmedProduct | null> => {
  try {
    const products = await getEmedProducts({ per_page: 100 });
    return products.find(product => product.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
};

// Get featured EMED products
export const getFeaturedEmedProducts = async (): Promise<EmedProductsResponse> => {
  return getEmedProducts({ featured: true });
};

// Get EMED products by type (Diplomado or Curso)
export const getEmedProductsByType = async (type: 'Diplomado' | 'Curso'): Promise<EmedProductsResponse> => {
  return getEmedProducts({ type });
};

// Clear product cache (useful for development/testing)
export const clearProductCache = (): void => {
  apiCache.clear();
};

// GraphQL helper function
const executeGraphQLQuery = async (query: string, variables?: any) => {
  console.log('=== GraphQL API Debug ===');
  console.log('GraphQL URL:', graphqlUrl);
  console.log('Query:', query.substring(0, 100) + '...');
  
  try {
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    
    console.log('GraphQL Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(`GraphQL errors: ${result.errors.map((e: any) => e.message).join(', ')}`);
    }
    
    return result.data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
};

// Simplified GraphQL query for WooCommerce products
const PRODUCTS_QUERY = `
  query GetProducts($first: Int) {
    products(first: $first) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        sku
        status
        featured
        date
        modified
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
          stockQuantity
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
        }
        image {
          id
          sourceUrl
          altText
          title
        }
        galleryImages {
          nodes {
            id
            sourceUrl
            altText
            title
          }
        }
        productCategories {
          nodes {
            id
            databaseId
            name
            slug
          }
        }
        productTags {
          nodes {
            id
            name
            slug
          }
        }
        metaData {
          key
          value
        }
      }
    }
  }
`;

// Simplified GraphQL query for single product by ID
const SINGLE_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      sku
      status
      featured
      date
      modified
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
        stockStatus
        stockQuantity
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        onSale
        stockStatus
      }
      image {
        id
        sourceUrl
        altText
        title
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
          title
        }
      }
      productCategories {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      productTags {
        nodes {
          id
          name
          slug
        }
      }
      metaData {
        key
        value
      }
    }
  }
`;

// Alternative query using custom post type (if WooGraphQL not available)
const PRODUCTS_CPT_QUERY = `
  query GetProductPosts($first: Int) {
    posts(first: $first, where: { postType: "product" }) {
      nodes {
        id
        databaseId
        title
        slug
        content
        excerpt
        date
        status
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        ... on Product {
          productId: databaseId
        }
      }
    }
  }
`;

// Get products using GraphQL
export const getProductsGraphQL = async (filters: ProductFilters = {}): Promise<EmedProductsResponse> => {
  const cacheKey = `graphql_products_${JSON.stringify(filters)}`;
  const cached = apiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  try {
    // Simplified variables for basic GraphQL query
    const variables = {
      first: filters.per_page || 50
    };
    
    const data = await executeGraphQLQuery(PRODUCTS_QUERY, variables);
    const products = data.products.nodes.map((product: any) => mapGraphQLToEmed(product));
    
    // Cache the results
    apiCache.set(cacheKey, {
      data: products,
      timestamp: Date.now()
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products via GraphQL:', error);
    // Fallback to REST API if GraphQL fails - avoid infinite recursion
    const wcProducts = await getProducts(filters);
    return wcProducts.map(mapWooCommerceToEmed);
  }
};

// Map GraphQL product to EMED format
const mapGraphQLToEmed = (gqlProduct: any): EmedProduct => {
  // Generate permalink from domain and slug
  const permalink = `${domain}/product/${gqlProduct.slug}/`;
  
  return {
    // Base product fields
    id: gqlProduct.databaseId,
    name: gqlProduct.name || '',
    slug: gqlProduct.slug || '',
    permalink: permalink,
    description: gqlProduct.description || '',
    short_description: gqlProduct.shortDescription || '',
    price: gqlProduct.price || '0',
    regular_price: gqlProduct.regularPrice || '0',
    sale_price: gqlProduct.salePrice || '',
    featured: gqlProduct.featured || false,
    on_sale: gqlProduct.onSale || false,
    stock_status: gqlProduct.stockStatus || 'instock',
    images: [
      ...(gqlProduct.image ? [{
        id: gqlProduct.image.id || 0,
        src: gqlProduct.image.sourceUrl || '',
        alt: gqlProduct.image.altText || gqlProduct.image.title || ''
      }] : []),
      ...(gqlProduct.galleryImages?.nodes || []).map((img: any, index: number) => ({
        id: img.id || index + 1,
        src: img.sourceUrl || '',
        alt: img.altText || img.title || ''
      }))
    ],
    categories: (gqlProduct.productCategories?.nodes || []).map((cat: any) => ({
      id: cat.databaseId || parseInt(cat.id) || 0,
      name: cat.name || '',
      slug: cat.slug || ''
    })),
    
    // EMED custom fields from metaData
    tipo: getMetaValue(gqlProduct.metaData || [], '_emed_tipo', 'Curso') as 'Diplomado' | 'Curso',
    duracion: getMetaValue(gqlProduct.metaData || [], '_emed_duracion', ''),
    modalidad: getMetaValue(gqlProduct.metaData || [], '_emed_modalidad', 'Online') as 'Presencial' | 'Online' | 'Mixto',
    destacado: getMetaValue(gqlProduct.metaData || [], '_emed_destacado', 'false') === 'true',
    beneficios: getMetaValue(gqlProduct.metaData || [], '_emed_beneficios', []),
    temario: getMetaValue(gqlProduct.metaData || [], '_emed_temario', []),
    ubicacion: getMetaValue(gqlProduct.metaData || [], '_emed_ubicacion'),
    requisitos: getMetaValue(gqlProduct.metaData || [], '_emed_requisitos', []),
    metodologia: getMetaValue(gqlProduct.metaData || [], '_emed_metodologia', []),
    certificacion: getMetaValue(gqlProduct.metaData || [], '_emed_certificacion', []),
    empleabilidad: getMetaValue(gqlProduct.metaData || [], '_emed_empleabilidad', []),
    precio_formateado: formatPrice(gqlProduct.price || '0')
  };
};

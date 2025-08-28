// Types for WooCommerce integration - EMED Web

export interface WooCommerceImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
  position: number;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooCommerceMetaData {
  id: number;
  key: string;
  value: string | number | boolean;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: WooCommerceCategory[];
  tags: any[];
  images: WooCommerceImage[];
  attributes: any[];
  default_attributes: any[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: WooCommerceMetaData[];
  stock_status: string;
  has_options: boolean;
  post_password: string;
  global_unique_id: string;
}

// EMED specific product interface
export interface EmedProduct {
  // Base WooCommerce fields
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  featured: boolean;
  on_sale: boolean;
  stock_status: string;
  images: WooCommerceImage[];
  categories: WooCommerceCategory[];
  
  // EMED custom fields (simplified)
  tipo: 'Diplomado' | 'Curso';
  duracion: string; // "120 horas"
  modalidad: 'Presencial' | 'Online' | 'Mixto';
  destacado: boolean;
  beneficios: string[];
  temario: string[] | Array<{modulo: string, contenido: string[]}>;
  ubicacion?: string;
  requisitos?: string[];
  metodologia?: string[] | string;
  certificacion?: string[] | string;
  empleabilidad?: string[];
  precio_formateado?: string; // "$450.000"
  brochure?: {
    url: string;
    title?: string;
    filename?: string;
    filesize?: number;
  };
}

// API Response types
export interface WooCommerceProductsResponse extends Array<WooCommerceProduct> {}

export interface EmedProductsResponse extends Array<EmedProduct> {}

// Filter and query types
export interface ProductFilters {
  category?: string;
  type?: 'Diplomado' | 'Curso';
  modalidad?: 'Presencial' | 'Online' | 'Mixto';
  featured?: boolean;
  per_page?: number;
  page?: number;
  orderby?: 'date' | 'title' | 'menu_order' | 'price';
  order?: 'asc' | 'desc';
}

// Error types
export interface WooCommerceError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
}
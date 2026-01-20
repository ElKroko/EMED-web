// Tipos para productos EMED (versión estática sin WordPress)

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  tipo: 'Diplomado' | 'Curso';
  descripcion: string;
  descripcion_corta: string;
  descripcionDetallada?: string;
  duracion: string;
  modalidad: 'Presencial' | 'Online' | 'Mixto' | 'Presencial + Online' | 'Online + Presencial (Prácticas)' | '100% Online' | '100% online' | 'Mixta (Online + Presencial)';
  nivel?: string;
  precio: number;
  precio_regular: number;
  precio_formateado: string;
  precioFinanciado?: string;
  precio_rebajado?: number;
  destacado: boolean;
  imagen: string;
  imagenHero?: string;
  galeria: string[];
  beneficios: string[];
  temario: TemarioModulo[] | string[];
  requisitos: string[];
  metodologia: string[] | string;
  certificacion: string[] | string;
  empleabilidad: string[];
  ubicacion?: string;
  en_stock: boolean;
  categorias: string[];
  etiquetas: string[];
  testimonios?: Testimonio[];
  brochure?: BrochureInfo;
  formacion_online?: {
    etapa_asincronica: {
      titulo: string;
      descripcion: string;
    };
    etapa_sincronica: {
      titulo: string;
      descripcion: string;
    };
  };
  diferenciadores?: string[];
  cta_mensaje?: string;
  duracion_online?: string;
  duracion_presencial?: string;
  faqs?: FAQItem[];
}

export interface TemarioModulo {
  modulo: string;
  contenido: string[];
  horas?: number;
  horas_estimadas?: string;
  grupo?: string;
  resumen?: string;
  competencias?: string[];
  evidencia?: string;
  tipo?: string;
}

export interface FAQItem {
  pregunta: string;
  respuesta: string;
}

export interface Testimonio {
  nombre: string;
  profesion: string;
  testimonio: string;
  rating: number;
}

export interface BrochureInfo {
  url: string;
  title: string;
  filename: string;
  filesize: number;
}

export interface ProductoFiltros {
  tipo?: 'Diplomado' | 'Curso';
  destacado?: boolean;
  modalidad?: string;
  limite?: number;
}

import React, { useEffect, useRef } from 'react';
import { type Map as LeafletMap } from 'leaflet';

interface Props {
  className?: string;
  height?: string;
  title?: string;
}

interface RegionProperties {
  region_nombre: string;
  alumnos_emed: number;
  mediadores_totales: number;
  impacto_pct: number;
}

interface PositionData {
  colores_emed: {
    celeste: string;
    turquesa: string;
    naranja: string;
    amarillo: string;
    verde: string;
    gris: string;
  };
  posiciones_etiquetas: {
    [region: string]: {
      offsetX: number;
      offsetY: number;
    };
  };
}

const MapaImpacto: React.FC<Props> = ({ 
  className = "",
  height = "650px",
  title = "Impacto de EMED por Región"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const geojsonLayerRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const coloresRef = useRef<any>({});
  const posicionesRef = useRef<any>({});

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    const initializeMap = async () => {
      try {
        // Importar Leaflet dinámicamente
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // Mostrar loading
        showLoading(true);

        // Cargar datos
        await loadData();

        // Crear mapa
        createMap(L.default);

        // Cargar GeoJSON
        await loadGeoJSON(L.default);

        // Crear leyenda
        createLegend(L.default);

        // Ocultar loading
        showLoading(false);

        console.log('✅ Mapa EMED inicializado correctamente');
      } catch (error) {
        console.error('❌ Error inicializando mapa:', error);
        showError('Error al cargar el mapa. Verifica que los datos estén disponibles.');
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const loadData = async (): Promise<void> => {
    try {
      const response = await fetch('/data/posiciones_etiquetas.json');
      const data: PositionData = await response.json();
      coloresRef.current = data.colores_emed;
      posicionesRef.current = data.posiciones_etiquetas;
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar las posiciones de etiquetas, usando valores por defecto');
      // Valores por defecto
      coloresRef.current = {
        celeste: "#7EC5D6",
        turquesa: "#5DADE2", 
        naranja: "#F5821F",
        amarillo: "#FDB813",
        verde: "#28A745",
        gris: "#6C757D"
      };
      posicionesRef.current = {};
    }
  };

  const createMap = (L: any): void => {
    if (!mapRef.current) return;

    // Crear mapa centrado en Chile
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [-33.4489, -70.6693], // Santiago
      zoom: 5,
      minZoom: 4,
      maxZoom: 8,
      zoomControl: true,
      attributionControl: true
    });

    // Agregar tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | Datos EMED',
      maxZoom: 18
    }).addTo(mapInstanceRef.current);

    // Crear grupo para markers
    markersGroupRef.current = L.layerGroup().addTo(mapInstanceRef.current);
  };

  const loadGeoJSON = async (L: any): Promise<void> => {
    try {
      const response = await fetch('/data/regiones_impacto.geojson');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const geojsonData = await response.json();
      
      geojsonLayerRef.current = L.geoJSON(geojsonData, {
        style: (feature: any) => getRegionStyle(feature),
        onEachFeature: (feature: any, layer: any) => onEachFeature(feature, layer, L)
      });

      if (mapInstanceRef.current) {
        geojsonLayerRef.current.addTo(mapInstanceRef.current);
        
        // Ajustar vista al contenido
        mapInstanceRef.current.fitBounds(geojsonLayerRef.current.getBounds(), {
          padding: [20, 20]
        });

        // Agregar etiquetas
        addRegionLabels(geojsonData, L);
      }
    } catch (error) {
      throw new Error(`Error cargando GeoJSON: ${(error as Error).message}`);
    }
  };

  const getRegionStyle = (feature: any): any => {
    const impacto = feature?.properties?.impacto_pct || 0;
    const color = getColorByImpact(impacto);
    
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.8
    };
  };

  const getColorByImpact = (impacto: number): string => {
    // Escala de colores basada en impacto (11% - 15.5%)
    if (impacto >= 15) return coloresRef.current.naranja;      // Muy alto
    if (impacto >= 14) return coloresRef.current.amarillo;     // Alto  
    if (impacto >= 13) return coloresRef.current.celeste;      // Medio-alto
    if (impacto >= 12) return coloresRef.current.turquesa;     // Medio
    if (impacto >= 11) return coloresRef.current.verde;        // Bajo
    return coloresRef.current.gris;                            // Sin datos
  };

  const onEachFeature = (feature: any, layer: any, L: any): void => {
    const props: RegionProperties = feature.properties;
    
    // Crear popup
    const popupContent = createPopupContent(props);
    layer.bindPopup(popupContent, {
      closeButton: true,
      autoClose: true,
      className: 'popup-emed'
    });

    // Eventos hover
    layer.on({
      mouseover: (e: any) => highlightFeature(e, L),
      mouseout: (e: any) => resetHighlight(e),
      click: (e: any) => onRegionClick(e)
    });
  };

  const createPopupContent = (props: RegionProperties): string => {
    const { region_nombre, alumnos_emed, mediadores_totales, impacto_pct } = props;
    
    return `
      <div class="popup-content">
        <h4>${region_nombre}</h4>
        <div class="popup-stats">
          <div class="stat-item">
            <span class="stat-label">Alumnos EMED:</span>
            <span class="stat-value">${alumnos_emed.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Mediadores totales:</span>
            <span class="stat-value">${mediadores_totales.toLocaleString()}</span>
          </div>
          <div class="stat-item highlight">
            <span class="stat-label">Impacto:</span>
            <span class="stat-value">${impacto_pct.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    `;
  };

  const highlightFeature = (e: any, L: any): void => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: coloresRef.current.naranja,
      fillOpacity: 0.9
    });
    
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  const resetHighlight = (e: any): void => {
    if (geojsonLayerRef.current) {
      geojsonLayerRef.current.resetStyle(e.target);
    }
  };

  const onRegionClick = (e: any): void => {
    const layer = e.target;
    const props: RegionProperties = layer.feature.properties;
    
    // Abrir popup
    layer.openPopup();
    
    // Log para debug
    console.log(`Región seleccionada: ${props.region_nombre}`, props);
  };

  const addRegionLabels = (geojsonData: any, L: any): void => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    geojsonData.features.forEach((feature: any) => {
      const props: RegionProperties = feature.properties;
      const regionName = props.region_nombre;
      
      // Calcular centroide de la región
      const bounds = L.geoJSON(feature).getBounds();
      const center = bounds.getCenter();
      
      // Aplicar offset si está definido
      const offset = posicionesRef.current[regionName] || { offsetX: 0, offsetY: 0 };
      const labelPosition = [
        center.lat + (offset.offsetY * 0.01), // Convertir offset a grados aprox
        center.lng + (offset.offsetX * 0.01)
      ] as [number, number];

      // Crear marker invisible con etiqueta
      const labelIcon = L.divIcon({
        className: 'region-label',
        html: `<span class="label-text">${regionName}</span>`,
        iconSize: [100, 20],
        iconAnchor: [50, 10]
      });

      const marker = L.marker(labelPosition, { 
        icon: labelIcon,
        interactive: false
      });

      markersGroupRef.current!.addLayer(marker);

      // Agregar línea de llamada si hay offset significativo
      if (Math.abs(offset.offsetX) > 10 || Math.abs(offset.offsetY) > 10) {
        const line = L.polyline([center, labelPosition], {
          color: coloresRef.current.gris,
          weight: 1,
          opacity: 0.6,
          interactive: false
        });
        markersGroupRef.current!.addLayer(line);
      }
    });
  };

  const createLegend = (L: any): void => {
    if (!mapInstanceRef.current) return;

    const legend = L.control({ position: 'bottomleft' });
    
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend-emed');
      
      const ranges = [
        { min: 15, max: '15.5+', color: coloresRef.current.naranja, label: 'Muy Alto' },
        { min: 14, max: 15, color: coloresRef.current.amarillo, label: 'Alto' },
        { min: 13, max: 14, color: coloresRef.current.celeste, label: 'Medio-Alto' },
        { min: 12, max: 13, color: coloresRef.current.turquesa, label: 'Medio' },
        { min: 11, max: 12, color: coloresRef.current.verde, label: 'Bajo' },
        { min: 0, max: 11, color: coloresRef.current.gris, label: 'Sin datos' }
      ];

      div.innerHTML = `
        <h4>Impacto EMED (%)</h4>
        ${ranges.map(range => `
          <div class="legend-item">
            <div class="legend-color" style="background-color: ${range.color}"></div>
            <span class="legend-label">${range.label}</span>
            <span class="legend-range">${range.min}${range.max !== range.min ? ` - ${range.max}` : '+'}</span>
          </div>
        `).join('')}
      `;

      return div;
    };

    legend.addTo(mapInstanceRef.current);
  };

  const showLoading = (show: boolean): void => {
    const loadingEl = mapRef.current?.querySelector('.loading-indicator') as HTMLElement;
    if (loadingEl) {
      loadingEl.style.display = show ? 'flex' : 'none';
    }
  };

  const showError = (message: string): void => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <h4>Error al cargar el mapa</h4>
          <p>${message}</p>
          <button onclick="location.reload()" class="retry-button">
            Reintentar
          </button>
        </div>
      `;
    }
  };

  return (
    <div className={`mapa-impacto-container ${className}`}>
      {title && (
        <div className="mapa-title">
          <h3>{title}</h3>
          <p>Distribución de alumnos formados y mediadores certificados por EMED</p>
        </div>
      )}
      
      <div 
        ref={mapRef}
        className="mapa-leaflet" 
        style={{ height }}
      >
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Cargando mapa interactivo...</p>
        </div>
      </div>

      <style jsx>{`
        .mapa-impacto-container {
          width: 100%;
          margin: 0 auto;
          position: relative;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .mapa-title {
          padding: 1.5rem;
          background: linear-gradient(135deg, #7EC5D6, #5DADE2);
          color: white;
          text-align: center;
        }

        .mapa-title h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .mapa-title p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .mapa-leaflet {
          width: 100%;
          position: relative;
          background: #f8fafc;
        }

        .loading-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(248, 250, 252, 0.95);
          z-index: 1000;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #7EC5D6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-indicator p {
          color: #6b7280;
          font-weight: 500;
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 2rem;
          text-align: center;
          color: #374151;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .error-container h4 {
          margin: 0 0 0.5rem 0;
          color: #dc2626;
          font-weight: 600;
        }

        .error-container p {
          margin: 0 0 1.5rem 0;
          color: #6b7280;
        }

        .retry-button {
          background: #7EC5D6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .retry-button:hover {
          background: #5DADE2;
        }

        /* Estilos globales para Leaflet */
        :global(.popup-emed .leaflet-popup-content-wrapper) {
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        :global(.popup-content) {
          font-family: sans-serif;
          min-width: 200px;
        }

        :global(.popup-content h4) {
          margin: 0 0 1rem 0;
          color: #2c3e50;
          font-weight: 700;
          font-size: 1.1rem;
          border-bottom: 2px solid #7EC5D6;
          padding-bottom: 0.5rem;
        }

        :global(.popup-stats) {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        :global(.stat-item) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.25rem 0;
        }

        :global(.stat-item.highlight) {
          background: rgba(126, 197, 214, 0.1);
          padding: 0.5rem;
          border-radius: 4px;
          margin-top: 0.5rem;
        }

        :global(.stat-label) {
          color: #6b7280;
          font-size: 0.9rem;
        }

        :global(.stat-value) {
          font-weight: 600;
          color: #2c3e50;
        }

        :global(.stat-item.highlight .stat-value) {
          color: #F5821F;
          font-size: 1.1rem;
        }

        :global(.region-label) {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
        }

        :global(.label-text) {
          display: block;
          background: rgba(255, 255, 255, 0.9);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 11px;
          color: #2c3e50;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.1);
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        :global(.legend-emed) {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-family: sans-serif;
          min-width: 180px;
        }

        :global(.legend-emed h4) {
          margin: 0 0 8px 0;
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 4px;
        }

        :global(.legend-item) {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
          font-size: 12px;
        }

        :global(.legend-color) {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          margin-right: 8px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }

        :global(.legend-label) {
          flex-grow: 1;
          color: #374151;
          font-weight: 500;
        }

        :global(.legend-range) {
          color: #6b7280;
          font-size: 11px;
          margin-left: 4px;
        }

        @media (max-width: 768px) {
          .mapa-impacto-container {
            border-radius: 0;
          }
          
          .mapa-title {
            padding: 1rem;
          }
          
          .mapa-title h3 {
            font-size: 1.25rem;
          }
          
          :global(.legend-emed) {
            font-size: 11px;
            padding: 8px;
            min-width: 150px;
          }
          
          :global(.popup-content) {
            min-width: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default MapaImpacto;
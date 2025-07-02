import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  height?: string;
  title?: string;
}

const MapaImpactoSimple: React.FC<Props> = ({ 
  className = "",
  height = "650px",
  title = "Impacto de EMED por Región"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    let L: any;
    let map: any;

    const initMap = async () => {
      try {
        // Importar Leaflet dinámicamente
        L = (await import('leaflet')).default;
        
        // Importar CSS
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(style);

        // Crear mapa
        map = L.map(mapRef.current, {
          center: [-33.4489, -70.6693],
          zoom: 5,
          zoomControl: true
        });

        // Agregar tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Cargar y mostrar datos
        const response = await fetch('/data/regiones_impacto.geojson');
        const data = await response.json();

        L.geoJSON(data, {
          style: (feature: any) => ({
            fillColor: getColor(feature.properties.impacto_pct),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          }),
          onEachFeature: (feature: any, layer: any) => {
            const props = feature.properties;
            layer.bindPopup(`
              <div style="font-family: sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${props.region_nombre}</h4>
                <div><strong>Alumnos EMED:</strong> ${props.alumnos_emed}</div>
                <div><strong>Mediadores totales:</strong> ${props.mediadores_totales}</div>
                <div><strong>Impacto:</strong> ${props.impacto_pct}%</div>
              </div>
            `);
          }
        }).addTo(map);

        console.log('✅ Mapa cargado correctamente');
      } catch (error) {
        console.error('❌ Error cargando mapa:', error);
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div style="padding: 2rem; text-align: center;">Error cargando el mapa</div>';
        }
      }
    };

    const getColor = (impacto: number) => {
      if (impacto >= 15) return '#F5821F'; // naranja
      if (impacto >= 14) return '#FDB813'; // amarillo
      if (impacto >= 13) return '#7EC5D6'; // celeste
      if (impacto >= 12) return '#5DADE2'; // turquesa
      if (impacto >= 11) return '#28A745'; // verde
      return '#6C757D'; // gris
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className={`w-full bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="p-6 bg-gradient-to-r from-celeste to-turquesa text-white text-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">Distribución de alumnos formados y mediadores certificados por EMED</p>
        </div>
      )}
      
      <div 
        ref={mapRef}
        style={{ height }}
        className="w-full bg-gray-100 relative"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-celeste mx-auto mb-2"></div>
            <p className="text-gray-600">Cargando mapa...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaImpactoSimple;
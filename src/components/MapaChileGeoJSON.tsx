import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  height?: string;
  title?: string;
}

const MapaChileGeoJSON: React.FC<Props> = ({ 
  className = "",
  height = "700px",
  title = ""
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || typeof window === 'undefined') return;

    const initMap = async () => {
      try {
        // Importar D3 dinámicamente
        const d3 = await import('d3');

        // Cargar el GeoJSON real de SimpleMaps Chile
        const response = await fetch('/data/chile_regiones_emed_simplified.geojson');
        const geojsonData = await response.json();

        // Configuración del SVG para formato vertical
        const svg = d3.select(svgRef.current);
        const width = 600; // Ancho reducido para formato vertical
        const heightNum = 1000; // Altura aumentada para formato vertical
        
        svg.attr("width", width).attr("height", heightNum);
        svg.selectAll("*").remove();

        // Proyección para Chile completo en formato vertical
        const projection = d3.geoMercator()
          .center([-71, -40]) // Centrado ligeramente más al norte
          .scale(1100) // Escala aumentada para mostrar todo Chile
          .translate([width / 2, heightNum / 2]) // Centrado en el SVG

        const path = d3.geoPath().projection(projection);

        // Colores por impacto
        const getColor = (impacto: number) => {
          if (impacto >= 15) return '#F5821F'; // naranja
          if (impacto >= 14) return '#FDB813'; // amarillo
          if (impacto >= 13) return '#7EC5D6'; // celeste
          if (impacto >= 12) return '#5DADE2'; // turquesa
          if (impacto >= 11) return '#28A745'; // verde
          return '#6C757D'; // gris
        };

        // Crear tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip-geojson")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background", "rgba(44, 62, 80, 0.95)")
          .style("color", "white")
          .style("padding", "16px")
          .style("border-radius", "12px")
          .style("font-size", "14px")
          .style("font-family", "sans-serif")
          .style("pointer-events", "none")
          .style("z-index", "1000")
          .style("box-shadow", "0 8px 32px rgba(0,0,0,0.3)")
          .style("backdrop-filter", "blur(10px)")
          .style("border", "1px solid rgba(255,255,255,0.1)");

        // Fondo simple sin gradiente
        svg.append("rect")
          .attr("width", width)
          .attr("height", heightNum)
          .attr("fill", "#edfbff");

        // Dibujar regiones
        const regions = svg.selectAll(".region")
          .data(geojsonData.features)
          .enter()
          .append("path")
          .attr("class", "region")
          .attr("d", path as any)
          .attr("fill", (d: any) => getColor(d.properties.impacto_emed_pct || 0))
          .attr("stroke", "#ffffffff")
          .attr("stroke-width", 1)
          .style("cursor", "pointer")
          .style("transition", "all 0.3s ease")
          .on("mouseover", function(event, d: any) {
            d3.select(this)
              .attr("stroke", "#F5821F")
              .attr("stroke-width", 3)
              .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.3))");
            
            tooltip.transition()
              .duration(200)
              .style("opacity", 1);
            
            const props = d.properties;
            tooltip.html(`
              <div style="text-align: center;">
                <h4 style="margin: 0 0 12px 0; color: #7EC5D6; border-bottom: 1px solid #7EC5D6; padding-bottom: 4px;">${props.Region}</h4>
                <div style="display: grid; gap: 8px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #bdc3c7;">Alumnos EMED:</span>
                    <strong style="color: #ecf0f1;">${props.alumnos_emed_estimados?.toLocaleString() || 'N/A'}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #bdc3c7;">Mediadores inscritos:</span>
                    <strong style="color: #ecf0f1;">${props.total_mediadores_registrados?.toLocaleString() || 'N/A'}</strong>
                  </div>
                  <div style="margin-top: 8px; padding: 8px; background: linear-gradient(45deg, rgba(245, 130, 31, 0.2), rgba(126, 197, 214, 0.2)); border-radius: 6px; border: 1px solid rgba(245, 130, 31, 0.3);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="color: #f39c12; font-weight: 600;">Impacto EMED:</span>
                      <strong style="color: #f39c12; font-size: 16px;">${props.impacto_emed_pct?.toFixed(1) || '0.0'}%</strong>
                    </div>
                  </div>
                </div>
              </div>
            `)
              .style("left", (event.pageX + 15) + "px")
              .style("top", (event.pageY - 10) + "px");
          })
          .on("mouseout", function() {
            d3.select(this)
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 1.5)
              .style("filter", "none");
            
            tooltip.transition()
              .duration(300)
              .style("opacity", 0);
          });

        // Agregar etiquetas de regiones
        svg.selectAll(".region-label")
          .data(geojsonData.features)
          .enter()
          .append("text")
          .attr("class", "region-label")
          .attr("transform", (d: any) => {
            const centroid = path.centroid(d);
            return `translate(${centroid})`;
          })
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("font-size", "10px")
          .style("font-weight", "600")
          .style("fill", "#2c3e50")
          .style("pointer-events", "none")
          .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
          .text((d: any) => {
            const name = d.properties.Region || '';
            // Simplificar nombres largos
            const shortName = name.replace('Región de ', '').replace('Región del ', '');
            return shortName.length > 12 ? shortName.substring(0, 10) + "..." : shortName;
          });

        // Crear leyenda en la esquina superior derecha (ajustada para formato vertical)
        const legend = svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(420, 50)");

        const legendData = [
          { label: "Alto", range: "14-15%", color: "#FDB813" },
          { label: "Medio-Alto", range: "13-14%", color: "#7EC5D6" },
          { label: "Medio", range: "12-13%", color: "#5DADE2" },
          { label: "Bajo", range: "11-12%", color: "#28A745" },
          { label: "Sin datos", range: "<11%", color: "#6C757D" }
        ];

        // Fondo de la leyenda
        legend.append("rect")
          .attr("x", -20)
          .attr("y", -30)
          .attr("width", 200)
          .attr("height", legendData.length * 28 + 45)
          .attr("fill", "rgba(255, 255, 255, 0.95)")
          .attr("stroke", "#e1e8ed")
          .attr("stroke-width", 1)
          .attr("rx", 10)
          .style("filter", "drop-shadow(0 2px 8px rgba(0,0,0,0.1))");

        // Título de la leyenda
        legend.append("text")
          .attr("x", 80)
          .attr("y", -10)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("font-weight", "600")
          .style("fill", "#2c3e50")
          .text("Nivel de Impacto");

        // Items de la leyenda
        const legendItems = legend.selectAll(".legend-item")
          .data(legendData)
          .enter()
          .append("g")
          .attr("class", "legend-item")
          .attr("transform", (d, i) => `translate(0, ${i * 28 + 12})`);

        legendItems.append("circle")
          .attr("cx", 12)
          .attr("cy", 8)
          .attr("r", 7)
          .attr("fill", d => d.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5);

        legendItems.append("text")
          .attr("x", 26)
          .attr("y", 8)
          .attr("dominant-baseline", "middle")
          .style("font-size", "13px")
          .style("font-weight", "500")
          .style("fill", "#374151")
          .text(d => d.label);

        legendItems.append("text")
          .attr("x", 26)
          .attr("y", 20)
          .attr("dominant-baseline", "middle")
          .style("font-size", "11px")
          .style("fill", "#6b7280")
          .text(d => d.range);

        // Quitar el título del mapa ya que tenemos info panel

        console.log('✅ Mapa GeoJSON de Chile cargado correctamente');

        // Cleanup
        return () => {
          d3.select(".tooltip-geojson").remove();
        };

      } catch (error) {
        console.error('❌ Error cargando mapa GeoJSON:', error);
        if (svgRef.current) {
          svgRef.current.innerHTML = `
            <text x="50%" y="50%" text-anchor="middle" fill="#dc2626" font-size="16">
              Error cargando el mapa. Verifica que el archivo GeoJSON esté disponible.
            </text>
          `;
        }
      }
    };

    initMap();
  }, [height]);

  return (
    <div className={`w-full overflow-visible ${className} min-h-[700px]`}>
    <div className={`w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg overflow-visible`}>
      <div className="flex flex-col lg:flex-row gap-8 p-8 ">
        
        {/* Columna Izquierda - Información y Estadísticas */}
        <div className="flex-1 flex flex-col gap-8 justify-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nuestro Impacto Nacional
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Con presencia en las 16 regiones de Chile, EMED ha formado más de 1,800 mediadores profesionales, 
              representando el 15.5% del registro nacional de mediadores en la Región Metropolitana.
            </p>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-celeste mb-2">1,844</div>
              <div className="text-gray-600 font-medium">Alumnos Formados</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-turquesa mb-2">4,485</div>
              <div className="text-gray-600 font-medium">Mediadores Inscritos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-naranja mb-2">16</div>
              <div className="text-gray-600 font-medium">Regiones con Presencia</div>
            </div>
            <div>
              <p className='text-sm text-gray-500 italic'>* Datos actualizados a julio 2025</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Mapa Vertical */}
        <div className="flex-1 flex items-center justify-center ">
          <svg
            ref={svgRef}
            className="w-full max-w-md h-full"
            style={{ minHeight: "700px", maxHeight: "1200px" }}
            viewBox="0 100 600 800"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default MapaChileGeoJSON;
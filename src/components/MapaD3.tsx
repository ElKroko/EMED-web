import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  height?: string;
  title?: string;
}

interface RegionData {
  region_nombre: string;
  alumnos_emed: number;
  mediadores_totales: number;
  impacto_pct: number;
}

const MapaD3: React.FC<Props> = ({ 
  className = "",
  height = "600px",
  title = ""
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || typeof window === 'undefined') return;

    const initMap = async () => {
      try {
        // Importar D3 dinámicamente
        const d3 = await import('d3');

        // Datos de las regiones con posiciones representativas para Chile
        const regionesData: RegionData[] = [
          { region_nombre: "Arica y Parinacota", alumnos_emed: 45, mediadores_totales: 120, impacto_pct: 12.5 },
          { region_nombre: "Tarapacá", alumnos_emed: 38, mediadores_totales: 95, impacto_pct: 13.2 },
          { region_nombre: "Antofagasta", alumnos_emed: 67, mediadores_totales: 180, impacto_pct: 11.8 },
          { region_nombre: "Atacama", alumnos_emed: 29, mediadores_totales: 85, impacto_pct: 12.1 },
          { region_nombre: "Coquimbo", alumnos_emed: 58, mediadores_totales: 145, impacto_pct: 13.7 },
          { region_nombre: "Valparaíso", alumnos_emed: 156, mediadores_totales: 380, impacto_pct: 14.2 },
          { region_nombre: "Metropolitana", alumnos_emed: 890, mediadores_totales: 2100, impacto_pct: 15.5 },
          { region_nombre: "O'Higgins", alumnos_emed: 89, mediadores_totales: 220, impacto_pct: 13.8 },
          { region_nombre: "Maule", alumnos_emed: 78, mediadores_totales: 195, impacto_pct: 12.9 },
          { region_nombre: "Ñuble", alumnos_emed: 34, mediadores_totales: 90, impacto_pct: 12.4 },
          { region_nombre: "Biobío", alumnos_emed: 142, mediadores_totales: 350, impacto_pct: 14.1 },
          { region_nombre: "Araucanía", alumnos_emed: 67, mediadores_totales: 175, impacto_pct: 11.9 },
          { region_nombre: "Los Ríos", alumnos_emed: 28, mediadores_totales: 75, impacto_pct: 12.6 },
          { region_nombre: "Los Lagos", alumnos_emed: 89, mediadores_totales: 210, impacto_pct: 13.4 },
          { region_nombre: "Aysén", alumnos_emed: 12, mediadores_totales: 35, impacto_pct: 11.2 },
          { region_nombre: "Magallanes", alumnos_emed: 23, mediadores_totales: 60, impacto_pct: 12.8 }
        ];

        // Configuración del SVG
        const svg = d3.select(svgRef.current);
        const width = 800;
        const heightNum = parseInt(height);
        
        svg.attr("width", width).attr("height", heightNum);
        svg.selectAll("*").remove(); // Limpiar contenido previo

        // Colores por impacto
        const getColor = (impacto: number) => {
          if (impacto >= 15) return '#F5821F'; // naranja
          if (impacto >= 14) return '#FDB813'; // amarillo
          if (impacto >= 13) return '#7EC5D6'; // celeste
          if (impacto >= 12) return '#5DADE2'; // turquesa
          if (impacto >= 11) return '#28A745'; // verde
          return '#6C757D'; // gris
        };

        // Posiciones representativas de las regiones (simulando la forma de Chile)
        const regionPositions: { [key: string]: { x: number; y: number; width: number; height: number } } = {
          "Arica y Parinacota": { x: 180, y: 40, width: 80, height: 40 },
          "Tarapacá": { x: 170, y: 85, width: 90, height: 45 },
          "Antofagasta": { x: 160, y: 135, width: 100, height: 60 },
          "Atacama": { x: 150, y: 200, width: 110, height: 50 },
          "Coquimbo": { x: 140, y: 255, width: 115, height: 45 },
          "Valparaíso": { x: 130, y: 305, width: 120, height: 40 },
          "Metropolitana": { x: 135, y: 350, width: 110, height: 35 },
          "O'Higgins": { x: 140, y: 390, width: 105, height: 40 },
          "Maule": { x: 145, y: 435, width: 100, height: 45 },
          "Ñuble": { x: 150, y: 485, width: 95, height: 30 },
          "Biobío": { x: 155, y: 520, width: 90, height: 50 },
          "Araucanía": { x: 160, y: 575, width: 85, height: 45 },
          "Los Ríos": { x: 165, y: 625, width: 80, height: 35 },
          "Los Lagos": { x: 170, y: 665, width: 75, height: 60 },
          "Aysén": { x: 180, y: 730, width: 120, height: 80 },
          "Magallanes": { x: 200, y: 815, width: 180, height: 90 }
        };

        // Crear tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip-d3")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "12px")
          .style("border-radius", "8px")
          .style("font-size", "14px")
          .style("font-family", "sans-serif")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        // Dibujar regiones
        svg.selectAll(".region")
          .data(regionesData)
          .enter()
          .append("rect")
          .attr("class", "region")
          .attr("x", d => regionPositions[d.region_nombre]?.x || 0)
          .attr("y", d => regionPositions[d.region_nombre]?.y || 0)
          .attr("width", d => regionPositions[d.region_nombre]?.width || 50)
          .attr("height", d => regionPositions[d.region_nombre]?.height || 50)
          .attr("fill", d => getColor(d.impacto_pct))
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("rx", 4)
          .style("cursor", "pointer")
          .on("mouseover", function(event, d) {
            d3.select(this)
              .attr("stroke", "#F5821F")
              .attr("stroke-width", 3);
            
            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            
            tooltip.html(`
              <div style="text-align: center;">
                <h4 style="margin: 0 0 8px 0; color: #7EC5D6;">${d.region_nombre}</h4>
                <div><strong>Alumnos EMED:</strong> ${d.alumnos_emed.toLocaleString()}</div>
                <div><strong>Mediadores totales:</strong> ${d.mediadores_totales.toLocaleString()}</div>
                <div style="margin-top: 4px; padding: 4px; background: rgba(245, 130, 31, 0.2); border-radius: 4px;">
                  <strong>Impacto:</strong> ${d.impacto_pct.toFixed(1)}%
                </div>
              </div>
            `)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function() {
            d3.select(this)
              .attr("stroke", "#fff")
              .attr("stroke-width", 2);
            
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });

        // Agregar etiquetas de regiones
        svg.selectAll(".region-label")
          .data(regionesData)
          .enter()
          .append("text")
          .attr("class", "region-label")
          .attr("x", d => (regionPositions[d.region_nombre]?.x || 0) + (regionPositions[d.region_nombre]?.width || 50) / 2)
          .attr("y", d => (regionPositions[d.region_nombre]?.y || 0) + (regionPositions[d.region_nombre]?.height || 50) / 2)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("font-size", "10px")
          .style("font-weight", "600")
          .style("fill", "#2c3e50")
          .style("pointer-events", "none")
          .text(d => d.region_nombre.length > 12 ? d.region_nombre.substring(0, 10) + "..." : d.region_nombre);

        // Crear leyenda
        const legend = svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(520, 50)");

        const legendData = [
          { label: "Muy Alto (15%+)", color: "#F5821F" },
          { label: "Alto (14-15%)", color: "#FDB813" },
          { label: "Medio-Alto (13-14%)", color: "#7EC5D6" },
          { label: "Medio (12-13%)", color: "#5DADE2" },
          { label: "Bajo (11-12%)", color: "#28A745" },
          { label: "Sin datos (<11%)", color: "#6C757D" }
        ];

        // Fondo de la leyenda
        legend.append("rect")
          .attr("x", -10)
          .attr("y", -20)
          .attr("width", 200)
          .attr("height", legendData.length * 25 + 30)
          .attr("fill", "rgba(255, 255, 255, 0.95)")
          .attr("stroke", "#ddd")
          .attr("stroke-width", 1)
          .attr("rx", 8);

        // Título de la leyenda
        legend.append("text")
          .attr("x", 85)
          .attr("y", -5)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("font-weight", "600")
          .style("fill", "#2c3e50")
          .text("Impacto EMED (%)");

        // Items de la leyenda
        const legendItems = legend.selectAll(".legend-item")
          .data(legendData)
          .enter()
          .append("g")
          .attr("class", "legend-item")
          .attr("transform", (d, i) => `translate(0, ${i * 25 + 15})`);

        legendItems.append("rect")
          .attr("width", 16)
          .attr("height", 16)
          .attr("fill", d => d.color)
          .attr("stroke", "#ccc")
          .attr("stroke-width", 1)
          .attr("rx", 3);

        legendItems.append("text")
          .attr("x", 24)
          .attr("y", 8)
          .attr("dominant-baseline", "middle")
          .style("font-size", "12px")
          .style("fill", "#374151")
          .text(d => d.label);

        console.log('✅ Mapa D3 cargado correctamente');

        // Cleanup function
        return () => {
          d3.select(".tooltip-d3").remove();
        };

      } catch (error) {
        console.error('❌ Error cargando mapa D3:', error);
      }
    };

    initMap();
  }, [height]);

  return (
    <div className={`w-full bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="p-6 bg-gradient-to-r from-celeste to-turquesa text-white text-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">Distribución de alumnos formados y mediadores certificados por EMED</p>
        </div>
      )}
      
      <div className="p-4 bg-gray-50">
        <svg
          ref={svgRef}
          className="w-full"
          style={{ height }}
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
};

export default MapaD3;
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

const MapaChileD3: React.FC<Props> = ({ 
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

        // Datos de las regiones
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
        const width = 400;
        const heightNum = parseInt(height);
        
        svg.attr("width", width).attr("height", heightNum);
        svg.selectAll("*").remove();

        // Colores por impacto
        const getColor = (impacto: number) => {
          if (impacto >= 15) return '#F5821F'; // naranja
          if (impacto >= 14) return '#FDB813'; // amarillo
          if (impacto >= 13) return '#7EC5D6'; // celeste
          if (impacto >= 12) return '#5DADE2'; // turquesa
          if (impacto >= 11) return '#28A745'; // verde
          return '#6C757D'; // gris
        };

        // Forma estilizada de Chile usando paths SVG
        const chileRegions = [
          // Arica y Parinacota
          { name: "Arica y Parinacota", path: "M150,20 L200,20 L200,50 L150,50 Z" },
          // Tarapacá
          { name: "Tarapacá", path: "M145,50 L205,50 L205,85 L145,85 Z" },
          // Antofagasta
          { name: "Antofagasta", path: "M140,85 L210,85 L210,130 L140,130 Z" },
          // Atacama
          { name: "Atacama", path: "M135,130 L215,130 L215,170 L135,170 Z" },
          // Coquimbo
          { name: "Coquimbo", path: "M130,170 L220,170 L220,205 L130,205 Z" },
          // Valparaíso
          { name: "Valparaíso", path: "M125,205 L225,205 L225,235 L125,235 Z" },
          // Metropolitana
          { name: "Metropolitana", path: "M120,235 L230,235 L230,260 L120,260 Z" },
          // O'Higgins
          { name: "O'Higgins", path: "M115,260 L235,260 L235,285 L115,285 Z" },
          // Maule
          { name: "Maule", path: "M110,285 L240,285 L240,315 L110,315 Z" },
          // Ñuble
          { name: "Ñuble", path: "M105,315 L245,315 L245,340 L105,340 Z" },
          // Biobío
          { name: "Biobío", path: "M100,340 L250,340 L250,370 L100,370 Z" },
          // Araucanía
          { name: "Araucanía", path: "M95,370 L255,370 L255,405 L95,405 Z" },
          // Los Ríos
          { name: "Los Ríos", path: "M90,405 L260,405 L260,430 L90,430 Z" },
          // Los Lagos
          { name: "Los Lagos", path: "M85,430 L265,430 L265,470 L85,470 Z" },
          // Aysén
          { name: "Aysén", path: "M80,470 L270,470 L270,520 L80,520 Z" },
          // Magallanes
          { name: "Magallanes", path: "M75,520 L275,520 L275,580 L75,580 Z" }
        ];

        // Crear tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip-chile")
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

        // Crear gradiente para el borde de Chile
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
          .attr("id", "borderGradient")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");

        gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#7EC5D6")
          .attr("stop-opacity", 0.8);

        gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#5DADE2")
          .attr("stop-opacity", 0.8);

        // Dibujar borde de Chile
        svg.append("path")
          .attr("d", "M75,15 L280,15 L280,585 L70,585 L70,15 Z")
          .attr("fill", "none")
          .attr("stroke", "url(#borderGradient)")
          .attr("stroke-width", 3)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.4);

        // Título del país
        svg.append("text")
          .attr("x", 175)
          .attr("y", 10)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("font-weight", "700")
          .style("fill", "#2c3e50")
          .style("letter-spacing", "2px")
          .text("CHILE");

        // Dibujar regiones
        chileRegions.forEach((region, index) => {
          const regionData = regionesData.find(r => r.region_nombre === region.name);
          if (!regionData) return;

          const regionGroup = svg.append("g")
            .attr("class", "region-group");

          regionGroup.append("path")
            .attr("d", region.path)
            .attr("fill", getColor(regionData.impacto_pct))
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .style("transition", "all 0.3s ease")
            .on("mouseover", function(event) {
              d3.select(this)
                .attr("stroke", "#F5821F")
                .attr("stroke-width", 4)
                .attr("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.3))");
              
              tooltip.transition()
                .duration(200)
                .style("opacity", 1);
              
              tooltip.html(`
                <div style="text-align: center;">
                  <h4 style="margin: 0 0 12px 0; color: #7EC5D6; border-bottom: 1px solid #7EC5D6; padding-bottom: 4px;">${regionData.region_nombre}</h4>
                  <div style="display: grid; gap: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="color: #bdc3c7;">Alumnos EMED:</span>
                      <strong style="color: #ecf0f1;">${regionData.alumnos_emed.toLocaleString()}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="color: #bdc3c7;">Mediadores totales:</span>
                      <strong style="color: #ecf0f1;">${regionData.mediadores_totales.toLocaleString()}</strong>
                    </div>
                    <div style="margin-top: 8px; padding: 8px; background: linear-gradient(45deg, rgba(245, 130, 31, 0.2), rgba(126, 197, 214, 0.2)); border-radius: 6px; border: 1px solid rgba(245, 130, 31, 0.3);">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #f39c12; font-weight: 600;">Impacto:</span>
                        <strong style="color: #f39c12; font-size: 16px;">${regionData.impacto_pct.toFixed(1)}%</strong>
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
                .attr("stroke-width", 2)
                .attr("filter", "none");
              
              tooltip.transition()
                .duration(300)
                .style("opacity", 0);
            });

          // Agregar etiqueta de región con mejor posicionamiento
          const regionCenter = region.path.match(/M(\d+),(\d+)/);
          if (regionCenter) {
            const x = parseInt(regionCenter[1]) + 60;
            const y = parseInt(regionCenter[2]) + 12;

            regionGroup.append("text")
              .attr("x", x)
              .attr("y", y)
              .attr("text-anchor", "middle")
              .style("font-size", "10px")
              .style("font-weight", "600")
              .style("fill", "#2c3e50")
              .style("pointer-events", "none")
              .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
              .text(region.name.length > 12 ? region.name.substring(0, 10) + "..." : region.name);
          }
        });

        // Crear leyenda mejorada
        const legend = svg.append("g")
          .attr("class", "legend")
          .attr("transform", "translate(320, 80)");

        const legendData = [
          { label: "Muy Alto", range: "15%+", color: "#F5821F" },
          { label: "Alto", range: "14-15%", color: "#FDB813" },
          { label: "Medio-Alto", range: "13-14%", color: "#7EC5D6" },
          { label: "Medio", range: "12-13%", color: "#5DADE2" },
          { label: "Bajo", range: "11-12%", color: "#28A745" },
          { label: "Sin datos", range: "<11%", color: "#6C757D" }
        ];

        // Fondo de la leyenda con gradiente
        const legendBg = legend.append("rect")
          .attr("x", -15)
          .attr("y", -25)
          .attr("width", 160)
          .attr("height", legendData.length * 28 + 40)
          .attr("fill", "rgba(255, 255, 255, 0.95)")
          .attr("stroke", "#e1e8ed")
          .attr("stroke-width", 1)
          .attr("rx", 12)
          .style("filter", "drop-shadow(0 4px 12px rgba(0,0,0,0.1))");

        // Título de la leyenda
        legend.append("text")
          .attr("x", 65)
          .attr("y", -8)
          .attr("text-anchor", "middle")
          .style("font-size", "13px")
          .style("font-weight", "700")
          .style("fill", "#2c3e50")
          .text("Impacto EMED");

        // Items de la leyenda
        const legendItems = legend.selectAll(".legend-item")
          .data(legendData)
          .enter()
          .append("g")
          .attr("class", "legend-item")
          .attr("transform", (d, i) => `translate(0, ${i * 28 + 10})`);

        legendItems.append("circle")
          .attr("cx", 8)
          .attr("cy", 8)
          .attr("r", 6)
          .attr("fill", d => d.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2);

        legendItems.append("text")
          .attr("x", 22)
          .attr("y", 8)
          .attr("dominant-baseline", "middle")
          .style("font-size", "11px")
          .style("font-weight", "600")
          .style("fill", "#374151")
          .text(d => d.label);

        legendItems.append("text")
          .attr("x", 22)
          .attr("y", 20)
          .attr("dominant-baseline", "middle")
          .style("font-size", "9px")
          .style("fill", "#6b7280")
          .text(d => d.range);

        console.log('✅ Mapa estilizado de Chile cargado');

        // Cleanup
        return () => {
          d3.select(".tooltip-chile").remove();
        };

      } catch (error) {
        console.error('❌ Error cargando mapa:', error);
      }
    };

    initMap();
  }, [height]);

  return (
    <div className={`w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg overflow-hidden ${className}`}>
      {title && (
        <div className="p-6 bg-gradient-to-r from-celeste to-turquesa text-white text-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">Distribución de alumnos formados y mediadores certificados por EMED</p>
        </div>
      )}
      
      <div className="p-8">
        <svg
          ref={svgRef}
          className="w-full mx-auto"
          style={{ height }}
          viewBox="0 0 500 600"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
};

export default MapaChileD3;
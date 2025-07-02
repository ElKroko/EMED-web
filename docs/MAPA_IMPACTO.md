# 🗺️ Mapa Interactivo de Impacto EMED

Sistema completo de visualización geográfica del impacto de EMED por región de Chile.

## 📁 Estructura de Archivos

```
├── scripts/
│   └── build_geojson.py           # Script de procesamiento de datos
├── data/
│   ├── chile_regiones_emed_simplified.geojson  # Geometrías regionales
│   ├── datos_regionales_emed.csv              # Métricas por región
│   └── posiciones_etiquetas.json              # Configuración visual
├── src/components/
│   └── MapaImpacto.astro          # Componente Leaflet interactivo
└── public/data/
    └── regiones_impacto.geojson   # Datos procesados (generado)
```

## 🚀 Instalación y Configuración

### 1. **Instalar Dependencias**

```bash
npm install leaflet
npm install --save-dev @types/leaflet  # Si usas TypeScript
```

### 2. **Instalar Python (para script de build)**

```bash
pip install pandas geopandas  # Si tienes datos geoespaciales complejos
# O solo pandas si usas los datos simplificados incluidos
pip install pandas
```

### 3. **Ejecutar Script de Build**

```bash
# Desde la raíz del proyecto
python scripts/build_geojson.py
```

El script:
- ✅ Lee `data/chile_regiones_emed_simplified.geojson`
- ✅ Lee `data/datos_regionales_emed.csv` 
- ✅ Une los datos por nombre de región (maneja tildes/mayúsculas)
- ✅ Genera `public/data/regiones_impacto.geojson`

### 4. **Usar el Componente**

```astro
---
// src/pages/impacto.astro
import Layout from '../layouts/Layout.astro';
import MapaImpacto from '../components/MapaImpacto.astro';
---

<Layout title="Impacto de EMED por Región">
  <section class="py-16">
    <div class="container mx-auto px-4">
      
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Nuestro Impacto Nacional
        </h1>
        <p class="text-xl text-gray-600">
          Descubre cómo EMED ha formado mediadores en todo Chile
        </p>
      </div>

      <!-- Mapa Interactivo -->
      <MapaImpacto 
        client:load
        title="Impacto de EMED por Región"
        height="700px"
        className="max-w-6xl mx-auto"
      />

      <!-- Estadísticas adicionales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
        <div class="text-center">
          <div class="text-3xl font-bold text-celeste mb-2">3,000+</div>
          <div class="text-gray-600">Alumnos Formados</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-turquesa mb-2">7,500+</div>
          <div class="text-gray-600">Mediadores Totales</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-naranja mb-2">15.5%</div>
          <div class="text-gray-600">Máximo Impacto Regional</div>
        </div>
      </div>

    </div>
  </section>
</Layout>
```

## 📊 Formato de Datos

### **CSV de Métricas** (`datos_regionales_emed.csv`)
```csv
region,alumnos_emed,mediadores_totales,impacto_pct
Metropolitana,890,2100,15.5
Valparaíso,156,380,14.2
Biobío,142,350,14.1
```

### **GeoJSON de Regiones** (`chile_regiones_emed_simplified.geojson`)
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "REGION": "Metropolitana" },
      "geometry": { "type": "Polygon", "coordinates": [...] }
    }
  ]
}
```

### **Configuración Visual** (`posiciones_etiquetas.json`)
```json
{
  "colores_emed": {
    "celeste": "#7EC5D6",
    "naranja": "#F5821F",
    "turquesa": "#5DADE2"
  },
  "posiciones_etiquetas": {
    "Metropolitana": { "offsetX": 10, "offsetY": -20 }
  }
}
```

## 🎨 Personalización

### **Props del Componente**
```astro
<MapaImpacto 
  client:load              <!-- OBLIGATORIO: Hidratar en cliente -->
  title="Mi Título"        <!-- Título del mapa (opcional) -->
  height="650px"           <!-- Altura del mapa (default: 650px) -->
  className="mi-clase"     <!-- Clases CSS adicionales -->
/>
```

### **Colores por Impacto**
El mapa usa la siguiente escala automática:
- 🔴 **15%+**: Naranja (impacto muy alto)
- 🟡 **14-15%**: Amarillo (impacto alto)  
- 🔵 **13-14%**: Celeste (impacto medio-alto)
- 🟢 **12-13%**: Turquesa (impacto medio)
- 🟢 **11-12%**: Verde (impacto bajo)
- ⚫ **<11%**: Gris (sin datos)

### **Modificar Estilos**
```css
/* Personalizar popup */
:global(.popup-emed .leaflet-popup-content-wrapper) {
  border-radius: 12px;
  background: linear-gradient(135deg, #fff, #f8fafc);
}

/* Personalizar leyenda */
:global(.legend-emed) {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
}
```

## 🔧 Funcionalidades

### **Interacciones**
- ✅ **Hover**: Resalta región con borde naranja
- ✅ **Click**: Abre popup con métricas detalladas
- ✅ **Zoom**: Controles de zoom integrados
- ✅ **Responsive**: Se adapta a dispositivos móviles

### **Elementos Visuales**
- ✅ **Leyenda**: Bottom-left con rangos de impacto
- ✅ **Etiquetas**: Nombres de regiones con offsets configurables
- ✅ **Líneas de llamada**: Para etiquetas con offset grande
- ✅ **Loading**: Indicador mientras carga datos

### **Datos Mostrados en Popup**
```
[Nombre de la Región]
Alumnos EMED: 890
Mediadores totales: 2,100  
Impacto: 15.5%
```

## 🛠️ Desarrollo y Debug

### **Verificar Datos**
```bash
# Ejecutar script y verificar output
python scripts/build_geojson.py

# Verificar archivo generado existe
ls -la public/data/regiones_impacto.geojson
```

### **Console Logs Útiles**
El componente registra información útil en consola:
```javascript
// Inicialización exitosa
✅ Mapa EMED inicializado correctamente

// Click en región  
Región seleccionada: Metropolitana {alumnos_emed: 890, ...}

// Error de carga
❌ Error inicializando mapa: [detalle del error]
```

### **Troubleshooting**
| Problema | Solución |
|----------|----------|
| "Leaflet no está cargado" | Verificar `npm install leaflet` |
| "Error cargando GeoJSON" | Ejecutar `python scripts/build_geojson.py` |
| Mapa no aparece | Agregar `client:load` al componente |
| Regiones sin color | Verificar nombres en CSV coinciden con GeoJSON |

## 📱 Responsive Design

El mapa se adapta automáticamente:
- **Desktop**: 650px altura, leyenda completa
- **Tablet**: Mantiene funcionalidad, ajusta tamaños
- **Mobile**: Reduce altura, simplifica leyenda

## 🔄 Actualizar Datos

Para actualizar las métricas:

1. **Editar CSV**: Modifica `data/datos_regionales_emed.csv`
2. **Ejecutar Script**: `python scripts/build_geojson.py`  
3. **Refresh**: El mapa cargará los nuevos datos automáticamente

## 🌟 Casos de Uso

### **Página Institucional**
```astro
<MapaImpacto 
  client:load
  title="20 Años Formando Mediadores en Chile"
  className="mb-16"
/>
```

### **Dashboard Interno**
```astro
<MapaImpacto 
  client:load
  title="Métricas de Impacto 2024"
  height="800px"
/>
```

### **Reporte Anual**
```astro
<MapaImpacto 
  client:load
  title="Crecimiento Regional EMED"
  className="print:hidden"
/>
```

---

🎯 **¡El mapa está listo para usar!** Solo ejecuta el script de build y agrega el componente a tu página Astro.
#!/usr/bin/env python3
"""
Script para procesar datos regionales de EMED y generar GeoJSON final
con métricas integradas para el mapa interactivo.
"""

import json
import pandas as pd
import unicodedata
import os
from pathlib import Path

def normalize_string(s):
    """Normaliza string removiendo tildes y convirtiendo a minúsculas"""
    # Remover tildes
    s_normalized = unicodedata.normalize('NFD', s)
    s_no_accents = ''.join(c for c in s_normalized if unicodedata.category(c) != 'Mn')
    return s_no_accents.lower().strip()

def load_data():
    """Carga y procesa los datos fuente"""
    base_path = Path(__file__).parent.parent
    
    # Cargar GeoJSON
    geojson_path = base_path / "data" / "chile_regiones_emed_simplified.geojson"
    csv_path = base_path / "data" / "datos_regionales_emed.csv"
    
    print(f"Cargando GeoJSON: {geojson_path}")
    with open(geojson_path, 'r', encoding='utf-8') as f:
        geojson_data = json.load(f)
    
    print(f"Cargando CSV: {csv_path}")
    df_regional = pd.read_csv(csv_path)
    
    return geojson_data, df_regional

def merge_data(geojson_data, df_regional):
    """Une los datos del GeoJSON con las métricas del CSV"""
    
    # Crear diccionario de métricas normalizado
    metrics_dict = {}
    for _, row in df_regional.iterrows():
        region_normalized = normalize_string(row['region'])
        metrics_dict[region_normalized] = {
            'alumnos_emed': int(row['alumnos_emed']),
            'mediadores_totales': int(row['mediadores_totales']),
            'impacto_pct': float(row['impacto_pct'])
        }
    
    print(f"Métricas disponibles para {len(metrics_dict)} regiones")
    
    # Procesar features del GeoJSON
    features_procesadas = 0
    for feature in geojson_data['features']:
        # Obtener nombre de región del GeoJSON
        region_geojson = feature['properties'].get('REGION', '') or feature['properties'].get('nombre', '')
        region_normalized = normalize_string(region_geojson)
        
        # Buscar métricas correspondientes
        if region_normalized in metrics_dict:
            # Agregar métricas como propiedades
            metrics = metrics_dict[region_normalized]
            feature['properties'].update({
                'alumnos_emed': metrics['alumnos_emed'],
                'mediadores_totales': metrics['mediadores_totales'],
                'impacto_pct': metrics['impacto_pct'],
                'region_nombre': region_geojson  # Preservar nombre original
            })
            features_procesadas += 1
            print(f"✓ {region_geojson}: {metrics['alumnos_emed']} alumnos, {metrics['impacto_pct']}% impacto")
        else:
            # Asignar valores por defecto
            feature['properties'].update({
                'alumnos_emed': 0,
                'mediadores_totales': 0,
                'impacto_pct': 0.0,
                'region_nombre': region_geojson
            })
            print(f"⚠ {region_geojson}: Sin datos - usando valores por defecto")
    
    print(f"Procesadas {features_procesadas} regiones con datos")
    return geojson_data

def save_output(geojson_data):
    """Guarda el GeoJSON procesado en public/data/"""
    base_path = Path(__file__).parent.parent
    output_dir = base_path / "public" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_path = output_dir / "regiones_impacto.geojson"
    
    print(f"Guardando resultado en: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(geojson_data, f, ensure_ascii=False, indent=2)
    
    print("✅ GeoJSON procesado guardado exitosamente")
    return output_path

def generate_sample_data():
    """Genera datos de ejemplo si no existen los archivos fuente"""
    base_path = Path(__file__).parent.parent
    data_dir = base_path / "data"
    data_dir.mkdir(exist_ok=True)
    
    # Datos de ejemplo para CSV
    sample_csv_data = """region,alumnos_emed,mediadores_totales,impacto_pct
Arica y Parinacota,45,120,12.5
Tarapacá,38,95,13.2
Antofagasta,67,180,11.8
Atacama,29,85,12.1
Coquimbo,58,145,13.7
Valparaíso,156,380,14.2
Metropolitana,890,2100,15.5
O'Higgins,89,220,13.8
Maule,78,195,12.9
Ñuble,34,90,12.4
Biobío,142,350,14.1
Araucanía,67,175,11.9
Los Ríos,28,75,12.6
Los Lagos,89,210,13.4
Aysén,12,35,11.2
Magallanes,23,60,12.8"""
    
    csv_path = data_dir / "datos_regionales_emed.csv"
    if not csv_path.exists():
        print("Generando datos CSV de ejemplo...")
        with open(csv_path, 'w', encoding='utf-8') as f:
            f.write(sample_csv_data)
    
    # GeoJSON simplificado de ejemplo (solo algunas regiones)
    sample_geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {"REGION": "Metropolitana"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[-71.5, -33.0], [-70.5, -33.0], [-70.5, -34.0], [-71.5, -34.0], [-71.5, -33.0]]]
                }
            },
            {
                "type": "Feature", 
                "properties": {"REGION": "Valparaíso"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[-72.0, -32.0], [-71.0, -32.0], [-71.0, -33.5], [-72.0, -33.5], [-72.0, -32.0]]]
                }
            }
        ]
    }
    
    geojson_path = data_dir / "chile_regiones_emed_simplified.geojson"
    if not geojson_path.exists():
        print("Generando GeoJSON de ejemplo...")
        with open(geojson_path, 'w', encoding='utf-8') as f:
            json.dump(sample_geojson, f, ensure_ascii=False, indent=2)
    
    # Posiciones de etiquetas
    sample_positions = {
        "colores_emed": {
            "celeste": "#7EC5D6",
            "turquesa": "#5DADE2", 
            "naranja": "#F5821F",
            "amarillo": "#FDB813",
            "verde": "#28A745",
            "gris": "#6C757D"
        },
        "posiciones_etiquetas": {
            "Metropolitana": {"offsetX": 10, "offsetY": -20},
            "Valparaíso": {"offsetX": -30, "offsetY": 10},
            "O'Higgins": {"offsetX": 15, "offsetY": 15},
            "Maule": {"offsetX": -25, "offsetY": -10},
            "Biobío": {"offsetX": 20, "offsetY": 5}
        }
    }
    
    positions_path = data_dir / "posiciones_etiquetas.json"
    if not positions_path.exists():
        print("Generando posiciones de etiquetas de ejemplo...")
        with open(positions_path, 'w', encoding='utf-8') as f:
            json.dump(sample_positions, f, ensure_ascii=False, indent=2)

def main():
    """Función principal"""
    print("🗺️  Iniciando procesamiento de datos EMED...")
    
    try:
        # Verificar si existen los archivos fuente
        base_path = Path(__file__).parent.parent
        geojson_path = base_path / "data" / "chile_regiones_emed_simplified.geojson"
        csv_path = base_path / "data" / "datos_regionales_emed.csv"
        
        if not geojson_path.exists() or not csv_path.exists():
            print("📁 Archivos fuente no encontrados, generando datos de ejemplo...")
            generate_sample_data()
        
        # Cargar datos
        geojson_data, df_regional = load_data()
        
        # Mostrar estadísticas
        print(f"📊 Estadísticas:")
        print(f"   - Regiones en GeoJSON: {len(geojson_data['features'])}")
        print(f"   - Registros en CSV: {len(df_regional)}")
        print(f"   - Rango de impacto: {df_regional['impacto_pct'].min():.1f}% - {df_regional['impacto_pct'].max():.1f}%")
        
        # Procesar y unir datos
        merged_data = merge_data(geojson_data, df_regional)
        
        # Guardar resultado
        output_path = save_output(merged_data)
        
        print(f"\n✅ Proceso completado exitosamente!")
        print(f"📍 Archivo generado: {output_path}")
        print(f"🌐 Listo para usar en MapaImpacto.astro")
        
    except Exception as e:
        print(f"❌ Error durante el procesamiento: {e}")
        raise

if __name__ == "__main__":
    main()
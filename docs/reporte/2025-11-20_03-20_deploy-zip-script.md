# Script de deploy con ZIP

**Fecha:** 2025-11-20 03:20
**Tipo:** Documentation
**Estado:** ✅ Completado

---

## Resumen
Se incorporó un proceso oficial para generar builds comprimidas en ZIP (
pm run deploy:zip), ideal para subir el sitio estático al hosting.

## Motivación
Necesitábamos un flujo sencillo que ejecutara el build y empaquetara el contenido en un formato compatible con la mayoría de hostings compartidos.

## Implementación
- Instalación de rchiver como dev dependency.
- Nuevo script scripts/deploy-zip.mjs que ejecuta 
pm run build, crea deploys/ y comprime dist/ en emed-web-<timestamp>.zip.
- Se añadió el comando deploy:zip en package.json y se documentó en el README.

## Archivos Modificados
| Archivo | Tipo | Descripción |
|---------|------|-------------|
| package.json | Modificado | Nuevo script deploy:zip y dependencia rchiver. |
| package-lock.json | Modificado | Registro de la dependencia rchiver. |
| scripts/deploy-zip.mjs | Nuevo | Script Node para construir y comprimir la carpeta dist/. |
| README.md | Modificado | Documentación del nuevo comando en la tabla de scripts. |

## Resultados
- ✅ 
pm run deploy:zip genera un ZIP con nombre timestamp en deploys/.
- ✅ Proceso documentado para todo el equipo.
- ⚠️ Recordar subir solo el contenido del ZIP extraído en el hosting final.

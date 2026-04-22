#!/usr/bin/env python3
"""
Script de deploy FTP para EMED Web
Sube el contenido de dist/ al servidor VPS via FTP
"""

import ftplib
import os
import sys
from pathlib import Path

# ==========================================
# CONFIGURACIÓN FTP
# ==========================================
FTP_HOST = "emediacion.cl"
FTP_USER = "emedroot_loader"
FTP_PASS = "RNuk07S2PBjZK"
FTP_REMOTE_DIR = "/public_html"  # Ajustar si la carpeta raíz es distinta (ej: /www, /htdocs)

LOCAL_DIST = Path(__file__).parent / "dist"


def upload_dir(ftp, local_path, remote_path):
    """Sube recursivamente un directorio local al servidor FTP."""
    # Crear directorio remoto si no existe
    try:
        ftp.mkd(remote_path)
    except ftplib.error_perm:
        pass  # Ya existe

    items = list(os.scandir(local_path))
    total = len(items)

    for i, entry in enumerate(items, 1):
        remote_entry = f"{remote_path}/{entry.name}"
        if entry.is_dir():
            print(f"  [{i}/{total}] Carpeta: {entry.name}/")
            upload_dir(ftp, entry.path, remote_entry)
        else:
            print(f"  [{i}/{total}] Subiendo: {remote_entry}", end="", flush=True)
            with open(entry.path, "rb") as f:
                ftp.storbinary(f"STOR {remote_entry}", f)
            size_kb = entry.stat().st_size / 1024
            print(f" ({size_kb:.1f} KB)")


def main():
    if not LOCAL_DIST.exists():
        print("ERROR: No existe la carpeta dist/. Ejecuta 'npm run build' primero.")
        sys.exit(1)

    print(f"Conectando a {FTP_HOST}...")
    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.set_pasv(True)
        print(f"Conectado. Subiendo dist/ → {FTP_REMOTE_DIR}\n")

        upload_dir(ftp, LOCAL_DIST, FTP_REMOTE_DIR)

        ftp.quit()
        print("\nDeploy completado exitosamente.")

    except ftplib.all_errors as e:
        print(f"\nERROR FTP: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

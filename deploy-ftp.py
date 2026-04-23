#!/usr/bin/env python3
"""
Script de deploy FTP para EMED Web
Sube el contenido de dist/ al servidor VPS via FTP/FTPS
"""

import ftplib
import os
import ssl
import sys
from pathlib import Path

# ==========================================
# CONFIGURACION FTP
# ==========================================
FTP_HOST = "emediacion.cl"
FTP_USER = "emedroot_loader"
FTP_PASS = "RNuk07S2PBjZK"
FTP_REMOTE_DIR = "/public_html"

LOCAL_DIST = Path(__file__).parent / "dist"


def connect_ftp():
    """Intenta conectar: primero FTP plano, luego FTPS si falla."""
    # Intento 1: FTP plano
    try:
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, 21, timeout=15)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.set_pasv(True)
        print("Conectado via FTP.")
        return ftp
    except Exception as e1:
        print(f"FTP plano fallo: {e1}")

    # Intento 2: FTPS explicito (TLS sobre puerto 21)
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ftp = ftplib.FTP_TLS(context=ctx)
        ftp.connect(FTP_HOST, 21, timeout=15)
        ftp.auth()
        ftp.login(FTP_USER, FTP_PASS)
        ftp.prot_p()
        ftp.set_pasv(True)
        print("Conectado via FTPS (TLS explicito).")
        return ftp
    except Exception as e2:
        print(f"FTPS explicito fallo: {e2}")

    # Intento 3: FTPS implicito (puerto 990)
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ftp = ftplib.FTP_TLS(context=ctx)
        ftp.connect(FTP_HOST, 990, timeout=15)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.prot_p()
        ftp.set_pasv(True)
        print("Conectado via FTPS implicito (puerto 990).")
        return ftp
    except Exception as e3:
        print(f"FTPS implicito fallo: {e3}")
        raise RuntimeError("No se pudo conectar por FTP, FTPS explicito ni FTPS implicito.")


def upload_dir(ftp, local_path, remote_path):
    """Sube recursivamente un directorio local al servidor FTP."""
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
    # Modo parcial: python deploy-ftp.py landings/mediacion-familiar
    subpath = sys.argv[1] if len(sys.argv) > 1 else None

    if subpath:
        local_path = LOCAL_DIST / subpath
        remote_path = f"{FTP_REMOTE_DIR}/{subpath}"
        if not local_path.exists():
            print(f"ERROR: No existe dist/{subpath}. Ejecuta 'npm run build' primero.")
            sys.exit(1)
        print(f"Deploy parcial: dist/{subpath} -> {remote_path}")
    else:
        local_path = LOCAL_DIST
        remote_path = FTP_REMOTE_DIR
        if not local_path.exists():
            print("ERROR: No existe la carpeta dist/. Ejecuta 'npm run build' primero.")
            sys.exit(1)
        print(f"Deploy completo: dist/ -> {FTP_REMOTE_DIR}")

    print(f"Conectando a {FTP_HOST}...")
    try:
        ftp = connect_ftp()
        print()
        upload_dir(ftp, local_path, remote_path)
        ftp.quit()
        print("\nDeploy completado exitosamente.")
    except Exception as e:
        print(f"\nERROR: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

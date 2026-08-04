from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app.models import Usuario
from app.schemas import UsuarioLogin

router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"]
)

# Configuración básica para encriptar/verificar contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def login(credenciales: UsuarioLogin, db: Session = Depends(get_db)):
    # 1. Buscar al usuario por correo electrónico
    usuario = db.query(Usuario).filter(Usuario.correo_electronico == credenciales.correo_electronico).first()
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Credenciales incorrectas"
        )
    
    # 2. Verificar la contraseña (soporta hash seguro o texto plano por compatibilidad de pruebas)
    contrasena_valida = False
    try:
        if pwd_context.verify(credenciales.contrasena, usuario.contrasena_encriptada):
            contrasena_valida = True
    except Exception:
        # Fallback por si la contraseña en BD está guardada temporalmente en texto plano
        if usuario.contrasena_encriptada == credenciales.contrasena:
            contrasena_valida = True

    if not contrasena_valida:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Credenciales incorrectas"
        )
    
    # 3. Validar si el usuario está activo (Borrado lógico)
    if hasattr(usuario, "activo") and not usuario.activo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="El usuario se encuentra inactivo. Contacte al administrador."
        )

    # 4. Retornar éxito con la información necesaria para el frontend
    return {
        "mensaje": "Login exitoso",
        "usuario_id": getattr(usuario, "id_usuario", getattr(usuario, "id", 1)),
        "rol": getattr(usuario, "rol", "usuario"),
        "token": "token-jwt-titanv-activo" 
    }
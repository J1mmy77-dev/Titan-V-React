from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Usuario
from app.schemas import UsuarioLogin
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/login")
def login(credenciales: UsuarioLogin, db: Session = Depends(get_db)):
    usuario = auth_service.autenticar_usuario(db, credenciales)

    if not usuario:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Credenciales incorrectas")

    if not usuario.activo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El usuario se encuentra inactivo. Contacte al administrador.",
        )

    token = auth_service.crear_token_acceso(usuario)

    return {
        "mensaje": "Login exitoso",
        "usuario_id": usuario.id_usuario,
        "rol": usuario.rol,
        "token": token,
        "token_type": "bearer",
    }


@router.get("/verificar")
def verificar_sesion(usuario_actual: Usuario = Depends(auth_service.obtener_usuario_actual)):
    """Útil para que el frontend confirme si el token guardado todavía es válido."""
    return {
        "usuario_id": usuario_actual.id_usuario,
        "nombre": f"{usuario_actual.nombres} {usuario_actual.apellidos}".strip(),
        "rol": usuario_actual.rol,
    }

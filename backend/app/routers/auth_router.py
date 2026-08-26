from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import ACCESS_TOKEN_EXPIRE
from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.security import create_access_token
from app.models import Usuario
from app.schemas import TokenResponse, UsuarioLogin, UsuarioResponse
from app.services import auth_service, usuario_service

router = APIRouter(prefix="/auth", tags=["Autenticación"])


@router.post("/login", response_model=TokenResponse)
def login(credenciales: UsuarioLogin, db: Session = Depends(get_db)):
    usuario = auth_service.autenticar_usuario(db, credenciales)

    if not usuario:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Credenciales incorrectas")

    if hasattr(usuario, "activo") and not usuario.activo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El usuario se encuentra inactivo. Contacte al administrador.",
        )

    token = create_access_token(usuario.id_usuario, usuario.rol)

    return {
        "mensaje": "Login exitoso",
        "usuario_id": usuario.id_usuario,
        "rol": usuario.rol,
        "access_token": token,
        "token_type": "bearer",
        "expires_in": int(ACCESS_TOKEN_EXPIRE.total_seconds()),
    }


@router.get("/me", response_model=UsuarioResponse)
def read_me(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    """Endpoint de referencia para ensayar la demo: confirma que el token es
    válido y devuelve el usuario autenticado a partir de él."""
    return usuario_service.obtener_usuario(db, current_user.id_usuario)

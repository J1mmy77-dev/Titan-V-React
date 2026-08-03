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
    
    # 2. Verificar la contraseña
    # NOTA: Esto asume que cuando creaste el usuario en el CRUD, hasheaste la contraseña.
    # Si las guardaste en texto plano temporalmente, puedes hacer una comparación directa con '==' (solo para pruebas, NUNCA en producción).
    contrasena_valida = pwd_context.verify(credenciales.contrasena, usuario.contrasena_encriptada)
    
    if not contrasena_valida:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Credenciales incorrectas"
        )
    
    # 3. Validar si el usuario está activo (Borrado lógico)
    if not usuario.activo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="El usuario se encuentra inactivo. Contacte al administrador."
        )

    # 4. Retornar éxito (En el futuro, aquí devolverías el JWT generado)
    return {
        "mensaje": "Login exitoso",
        "usuario_id": usuario.id_usuario,
        "rol": usuario.rol,
        "token": "aqui_ira_tu_jwt_token_pronto" 
    }
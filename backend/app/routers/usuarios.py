from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Usuario
from app.schemas import UsuarioCreate, UsuarioResponse, UsuarioUpdate 

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# ==========================================
# FUNCIÓN AUXILIAR: Traductor DB -> Schema
# ==========================================
def adaptar_usuario_a_schema(usuario_db: Usuario):
    """
    Adapta el objeto de la base de datos para que encaje 
    perfectamente con lo que espera Pydantic en UsuarioResponse.
    """
    usuario_db.id = usuario_db.id_usuario
    usuario_db.nombre_completo = f"{usuario_db.nombres} {usuario_db.apellidos}".strip()
    return usuario_db

# ==========================================
# RUTAS CRUD
# ==========================================

@router.get("/", response_model=List[UsuarioResponse])
def get_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    usuarios_db = db.query(Usuario).offset(skip).limit(limit).all()
    # Adaptamos la lista de objetos de DB a los esquemas
    return [adaptar_usuario_a_schema(u) for u in usuarios_db]

@router.get("/{usuario_id}", response_model=UsuarioResponse)
def get_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    return adaptar_usuario_a_schema(usuario)

@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def create_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    # 1. Validar que el correo no esté duplicado
    usuario_existente = db.query(Usuario).filter(Usuario.correo_electronico == usuario.correo_electronico).first()
    if usuario_existente:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El correo electrónico ya está registrado")
    
    # 2. Separar 'nombre_completo' en 'nombres' y 'apellidos'
    partes_nombre = usuario.nombre_completo.split(" ", 1)
    nombres_db = partes_nombre[0]
    apellidos_db = partes_nombre[1] if len(partes_nombre) > 1 else ""

    # 3. Mapeo manual hacia el modelo de Base de Datos
    nuevo_usuario = Usuario(
        nombres=nombres_db,
        apellidos=apellidos_db,
        correo_electronico=usuario.correo_electronico,
        # Si 'rol' es un Enum de Python, extraemos su valor con .value
        rol=usuario.rol.value if hasattr(usuario.rol, 'value') else usuario.rol,
        contrasena_encriptada=usuario.contrasena, # ⚠️ TAREA FUTURA: Aplicar hash (ej. bcrypt) aquí
        fecha_vencimiento_licencia=usuario.fecha_vencimiento_licencia,
        tiene_certificacion_maquinaria=usuario.tiene_certificacion_maquinaria
    )
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    
    return adaptar_usuario_a_schema(nuevo_usuario)

@router.put("/{usuario_id}", response_model=UsuarioResponse)
def update_usuario(usuario_id: int, usuario_actualizado: UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()
    
    if not usuario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    
    # Actualización condicional campo por campo debido a la diferencia de nombres
    if usuario_actualizado.nombre_completo:
        partes = usuario_actualizado.nombre_completo.split(" ", 1)
        usuario.nombres = partes[0]
        usuario.apellidos = partes[1] if len(partes) > 1 else ""
        
    if usuario_actualizado.rol is not None:
        usuario.rol = usuario_actualizado.rol.value if hasattr(usuario_actualizado.rol, 'value') else usuario_actualizado.rol
        
    if usuario_actualizado.activo is not None:
        usuario.activo = usuario_actualizado.activo
        
    if usuario_actualizado.fecha_vencimiento_licencia is not None:
        usuario.fecha_vencimiento_licencia = usuario_actualizado.fecha_vencimiento_licencia
        
    if usuario_actualizado.tiene_certificacion_maquinaria is not None:
        usuario.tiene_certificacion_maquinaria = usuario_actualizado.tiene_certificacion_maquinaria
        
    db.commit()
    db.refresh(usuario)
    
    return adaptar_usuario_a_schema(usuario)

@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario_query = db.query(Usuario).filter(Usuario.id_usuario == usuario_id)
    
    if not usuario_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")
    
    # Borrado físico (Si luego prefieres borrado lógico, cambia usuario.activo = False)
    usuario_query.delete(synchronize_session=False)
    db.commit()
    return None
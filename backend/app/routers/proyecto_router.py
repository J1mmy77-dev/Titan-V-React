from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.permissions import verificar_rol_proyecto
from app.models import RolColaborador, Usuario
from app.schemas import ProyectoCreate, ProyectoResponse, ProyectoUpdate
from app.services import colaborador_service, proyecto_service

router = APIRouter(prefix="/proyectos", tags=["Proyectos"])


@router.get("/", response_model=List[ProyectoResponse])
def get_proyectos(
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Lista todos los proyectos del sistema a cualquier usuario autenticado.
    # Si se quisiera restringir a "mis proyectos", se filtraria por
    # ColaboradorProyecto.usuario_id == current_user.id_usuario.
    return proyecto_service.listar_proyectos(db, skip, limit)


@router.get("/{proyecto_id}", response_model=ProyectoResponse)
def get_proyecto(
    proyecto_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    proyecto = proyecto_service.obtener_proyecto(db, proyecto_id)
    if not proyecto:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Proyecto no encontrado")

    verificar_rol_proyecto(db, current_user, proyecto_id)  # cualquier colaborador puede ver
    return proyecto


@router.post("/", response_model=ProyectoResponse, status_code=status.HTTP_201_CREATED)
def create_proyecto(
    proyecto: ProyectoCreate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    nuevo_proyecto = proyecto_service.crear_proyecto(db, proyecto)
    # Quien crea el proyecto queda automaticamente como su Arquitecto.
    colaborador_service.agregar_arquitecto_inicial(db, nuevo_proyecto.id, current_user.id_usuario)
    return nuevo_proyecto


@router.put("/{proyecto_id}", response_model=ProyectoResponse)
def update_proyecto(
    proyecto_id: int,
    proyecto_actualizado: ProyectoUpdate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not proyecto_service.obtener_proyecto(db, proyecto_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Proyecto no encontrado")

    verificar_rol_proyecto(db, current_user, proyecto_id, RolColaborador.ARQUITECTO)

    return proyecto_service.actualizar_proyecto(db, proyecto_id, proyecto_actualizado)


@router.delete("/{proyecto_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_proyecto(
    proyecto_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not proyecto_service.obtener_proyecto(db, proyecto_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Proyecto no encontrado")

    verificar_rol_proyecto(db, current_user, proyecto_id, RolColaborador.ARQUITECTO)

    proyecto_service.eliminar_proyecto(db, proyecto_id)
    return None

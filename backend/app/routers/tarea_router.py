from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.permissions import verificar_rol_proyecto
from app.models import RolColaborador, Usuario
from app.schemas import ComentarioCreate, ComentarioResponse, TareaCreate, TareaResponse, TareaUpdate
from app.services import tarea_service

router = APIRouter(prefix="/tareas", tags=["Tareas"])


def _obtener_tarea_o_404(db: Session, tarea_id: int):
    tarea = tarea_service.obtener_tarea(db, tarea_id)
    if not tarea:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tarea no encontrada")
    return tarea


@router.get("/", response_model=List[TareaResponse])
def get_tareas(
    proyecto_id: Optional[int] = Query(None, description="Filtrar por proyecto"),
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if proyecto_id is not None:
        verificar_rol_proyecto(db, current_user, proyecto_id)
    return tarea_service.listar_tareas(db, proyecto_id, skip, limit)


@router.get("/{tarea_id}", response_model=TareaResponse)
def get_tarea(
    tarea_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tarea = _obtener_tarea_o_404(db, tarea_id)
    verificar_rol_proyecto(db, current_user, tarea.proyecto_id)
    return tarea


@router.post("/", response_model=TareaResponse, status_code=status.HTTP_201_CREATED)
def create_tarea(
    tarea: TareaCreate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Arquitecto y Trabajador pueden crear tareas; Visualizador solo lee.
    verificar_rol_proyecto(
        db, current_user, tarea.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return tarea_service.crear_tarea(db, tarea)


@router.put("/{tarea_id}", response_model=TareaResponse)
def update_tarea(
    tarea_id: int,
    tarea_actualizada: TareaUpdate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tarea = _obtener_tarea_o_404(db, tarea_id)
    verificar_rol_proyecto(
        db, current_user, tarea.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return tarea_service.actualizar_tarea(db, tarea_id, tarea_actualizada)


@router.delete("/{tarea_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tarea(
    tarea_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tarea = _obtener_tarea_o_404(db, tarea_id)
    # Borrar una tarea es una accion mas sensible: solo el Arquitecto.
    verificar_rol_proyecto(db, current_user, tarea.proyecto_id, RolColaborador.ARQUITECTO)
    tarea_service.eliminar_tarea(db, tarea_id)
    return None


# --- Comentarios anidados bajo una tarea ---

@router.get("/{tarea_id}/comentarios", response_model=List[ComentarioResponse])
def get_comentarios(
    tarea_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tarea = _obtener_tarea_o_404(db, tarea_id)
    verificar_rol_proyecto(db, current_user, tarea.proyecto_id)
    return tarea_service.listar_comentarios(db, tarea_id)


@router.post(
    "/{tarea_id}/comentarios",
    response_model=ComentarioResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_comentario(
    tarea_id: int,
    comentario: ComentarioCreate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tarea = _obtener_tarea_o_404(db, tarea_id)
    # Antes el autor del comentario venia de un query param "usuario_id" (cualquiera
    # podia hacerse pasar por otro usuario). Ahora se toma del token validado.
    verificar_rol_proyecto(
        db, current_user, tarea.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return tarea_service.crear_comentario(db, tarea_id, current_user.id_usuario, comentario)


@router.delete("/comentarios/{comentario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comentario(
    comentario_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    comentario = tarea_service.obtener_comentario(db, comentario_id)
    if not comentario:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comentario no encontrado")

    tarea = _obtener_tarea_o_404(db, comentario.tarea_id)
    verificar_rol_proyecto(
        db, current_user, tarea.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    tarea_service.eliminar_comentario(db, comentario_id)
    return None

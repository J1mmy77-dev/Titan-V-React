from typing import Optional

from sqlalchemy.orm import Session

from app.core.soft_delete import marcar_eliminado, restaurar, sin_eliminados
from app.models import Comentario, Tarea
from app.schemas import ComentarioCreate, TareaCreate, TareaUpdate


# --- Tareas ---

def listar_tareas(
    db: Session, proyecto_id: Optional[int] = None, incluir_eliminados: bool = False, skip: int = 0, limit: int = 100
):
    query = db.query(Tarea)
    if proyecto_id is not None:
        query = query.filter(Tarea.proyecto_id == proyecto_id)
    if not incluir_eliminados:
        query = sin_eliminados(query, Tarea)
    return query.offset(skip).limit(limit).all()


def obtener_tarea(db: Session, tarea_id: int, incluir_eliminados: bool = False) -> Optional[Tarea]:
    query = db.query(Tarea).filter(Tarea.id == tarea_id)
    if not incluir_eliminados:
        query = sin_eliminados(query, Tarea)
    return query.first()


def crear_tarea(db: Session, tarea: TareaCreate) -> Tarea:
    nueva_tarea = Tarea(**tarea.model_dump())
    db.add(nueva_tarea)
    db.commit()
    db.refresh(nueva_tarea)
    return nueva_tarea


def actualizar_tarea(db: Session, tarea_id: int, datos: TareaUpdate) -> Optional[Tarea]:
    tarea = obtener_tarea(db, tarea_id)
    if not tarea:
        return None

    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(tarea, campo, valor)

    db.commit()
    db.refresh(tarea)
    return tarea


def eliminar_tarea(db: Session, tarea_id: int) -> bool:
    """Soft delete: la tarea (y su historial de comentarios) sigue en la base,
    solo deja de aparecer en los listados normales."""
    tarea = obtener_tarea(db, tarea_id)
    if not tarea:
        return False

    marcar_eliminado(db, tarea)
    return True


def restaurar_tarea(db: Session, tarea_id: int) -> Optional[Tarea]:
    tarea = obtener_tarea(db, tarea_id, incluir_eliminados=True)
    if not tarea or tarea.fecha_eliminacion is None:
        return None

    restaurar(db, tarea)
    return tarea


# --- Comentarios (siempre asociados a una tarea) ---

def listar_comentarios(db: Session, tarea_id: int, incluir_eliminados: bool = False):
    query = db.query(Comentario).filter(Comentario.tarea_id == tarea_id)
    if not incluir_eliminados:
        query = sin_eliminados(query, Comentario)
    return query.order_by(Comentario.fecha_comentario).all()


def crear_comentario(db: Session, tarea_id: int, usuario_id: int, comentario: ComentarioCreate) -> Comentario:
    nuevo_comentario = Comentario(
        contenido=comentario.contenido,
        tarea_id=tarea_id,
        usuario_id=usuario_id,
    )
    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)
    return nuevo_comentario


def eliminar_comentario(db: Session, comentario_id: int) -> bool:
    """Soft delete: útil para poder revisar después si un comentario borrado
    contenía información relevante para una disputa o reclamo."""
    comentario = db.query(Comentario).filter(Comentario.id == comentario_id).first()
    if not comentario or comentario.fecha_eliminacion is not None:
        return False

    marcar_eliminado(db, comentario)
    return True

from typing import Optional

from sqlalchemy.orm import Session

from app.models import ColaboradorProyecto, RolColaborador
from app.schemas import ColaboradorCreate, ColaboradorUpdate


def listar_colaboradores(db: Session, proyecto_id: int):
    return db.query(ColaboradorProyecto).filter(ColaboradorProyecto.proyecto_id == proyecto_id).all()


def obtener_colaborador(db: Session, proyecto_id: int, colaborador_id: int) -> Optional[ColaboradorProyecto]:
    return (
        db.query(ColaboradorProyecto)
        .filter(ColaboradorProyecto.id == colaborador_id, ColaboradorProyecto.proyecto_id == proyecto_id)
        .first()
    )


def ya_es_colaborador(db: Session, proyecto_id: int, usuario_id: int) -> bool:
    return (
        db.query(ColaboradorProyecto)
        .filter(
            ColaboradorProyecto.proyecto_id == proyecto_id,
            ColaboradorProyecto.usuario_id == usuario_id,
        )
        .first()
        is not None
    )


def agregar_colaborador(db: Session, proyecto_id: int, datos: ColaboradorCreate) -> ColaboradorProyecto:
    nuevo = ColaboradorProyecto(
        proyecto_id=proyecto_id,
        usuario_id=datos.usuario_id,
        rol=datos.rol.value,
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def agregar_arquitecto_inicial(db: Session, proyecto_id: int, usuario_id: int) -> ColaboradorProyecto:
    """Se llama al crear un proyecto: su creador queda automáticamente como
    Arquitecto de ese proyecto (si no, nadie tendría permiso de agregar al
    primer colaborador)."""
    colaborador = ColaboradorProyecto(
        proyecto_id=proyecto_id,
        usuario_id=usuario_id,
        rol=RolColaborador.ARQUITECTO.value,
    )
    db.add(colaborador)
    db.commit()
    db.refresh(colaborador)
    return colaborador


def actualizar_colaborador(
    db: Session, proyecto_id: int, colaborador_id: int, datos: ColaboradorUpdate
) -> Optional[ColaboradorProyecto]:
    colaborador = obtener_colaborador(db, proyecto_id, colaborador_id)
    if not colaborador:
        return None
    colaborador.rol = datos.rol.value
    db.commit()
    db.refresh(colaborador)
    return colaborador


def eliminar_colaborador(db: Session, proyecto_id: int, colaborador_id: int) -> bool:
    colaborador = obtener_colaborador(db, proyecto_id, colaborador_id)
    if not colaborador:
        return False
    db.delete(colaborador)
    db.commit()
    return True

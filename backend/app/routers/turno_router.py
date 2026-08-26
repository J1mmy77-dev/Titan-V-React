from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.permissions import verificar_rol_proyecto
from app.models import RolColaborador, Usuario
from app.schemas import TurnoCreate, TurnoResponse, TurnoUpdate
from app.services import asistencia_service

router = APIRouter(prefix="/turnos", tags=["Turnos y Asistencia"])


def _obtener_o_404(db: Session, turno_id: int):
    turno = asistencia_service.obtener_turno(db, turno_id)
    if not turno:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Turno no encontrado")
    return turno


@router.get("/", response_model=List[TurnoResponse])
def get_turnos(
    proyecto_id: Optional[int] = Query(None, description="Filtrar por proyecto"),
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if proyecto_id is not None:
        verificar_rol_proyecto(db, current_user, proyecto_id)
    return asistencia_service.listar_turnos(db, proyecto_id, skip, limit)


@router.get("/{turno_id}", response_model=TurnoResponse)
def get_turno(
    turno_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    turno = _obtener_o_404(db, turno_id)
    verificar_rol_proyecto(db, current_user, turno.proyecto_id)
    return turno


@router.post("/", response_model=TurnoResponse, status_code=status.HTTP_201_CREATED)
def create_turno(
    turno: TurnoCreate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    verificar_rol_proyecto(
        db, current_user, turno.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return asistencia_service.crear_turno(db, turno)


@router.put("/{turno_id}", response_model=TurnoResponse)
def update_turno(
    turno_id: int,
    turno_actualizado: TurnoUpdate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    turno = _obtener_o_404(db, turno_id)
    verificar_rol_proyecto(
        db, current_user, turno.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return asistencia_service.actualizar_turno(db, turno_id, turno_actualizado)


@router.delete("/{turno_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_turno(
    turno_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    turno = _obtener_o_404(db, turno_id)
    verificar_rol_proyecto(db, current_user, turno.proyecto_id, RolColaborador.ARQUITECTO)
    asistencia_service.eliminar_turno(db, turno_id)
    return None

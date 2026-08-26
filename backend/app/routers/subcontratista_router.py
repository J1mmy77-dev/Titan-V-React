from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.permissions import verificar_rol_proyecto
from app.models import RolColaborador, Usuario
from app.schemas import SubcontratistaCreate, SubcontratistaResponse, SubcontratistaUpdate
from app.services import subcontratista_service

router = APIRouter(prefix="/subcontratistas", tags=["Subcontratistas"])


def _obtener_o_404(db: Session, subcontratista_id: int):
    subcontratista = subcontratista_service.obtener_subcontratista(db, subcontratista_id)
    if not subcontratista:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subcontratista no encontrado")
    return subcontratista


@router.get("/", response_model=List[SubcontratistaResponse])
def get_subcontratistas(
    proyecto_id: Optional[int] = Query(None, description="Filtrar por proyecto"),
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if proyecto_id is not None:
        verificar_rol_proyecto(db, current_user, proyecto_id)
    return subcontratista_service.listar_subcontratistas(db, proyecto_id, skip, limit)


@router.get("/{subcontratista_id}", response_model=SubcontratistaResponse)
def get_subcontratista(
    subcontratista_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    subcontratista = _obtener_o_404(db, subcontratista_id)
    verificar_rol_proyecto(db, current_user, subcontratista.proyecto_id)
    return subcontratista


@router.post("/", response_model=SubcontratistaResponse, status_code=status.HTTP_201_CREATED)
def create_subcontratista(
    datos: SubcontratistaCreate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Contratar/vincular subcontratistas es una decision de obra: Arquitecto y Trabajador.
    verificar_rol_proyecto(
        db, current_user, datos.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return subcontratista_service.crear_subcontratista(db, datos)


@router.put("/{subcontratista_id}", response_model=SubcontratistaResponse)
def update_subcontratista(
    subcontratista_id: int,
    datos: SubcontratistaUpdate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    subcontratista = _obtener_o_404(db, subcontratista_id)
    verificar_rol_proyecto(
        db, current_user, subcontratista.proyecto_id, RolColaborador.ARQUITECTO, RolColaborador.TRABAJADOR
    )
    return subcontratista_service.actualizar_subcontratista(db, subcontratista_id, datos)


@router.delete("/{subcontratista_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subcontratista(
    subcontratista_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    subcontratista = _obtener_o_404(db, subcontratista_id)
    verificar_rol_proyecto(db, current_user, subcontratista.proyecto_id, RolColaborador.ARQUITECTO)
    subcontratista_service.eliminar_subcontratista(db, subcontratista_id)
    return None

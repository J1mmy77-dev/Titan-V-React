from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import ProyectoObra
# Asumiendo que tienes un archivo schemas.py con estas clases de Pydantic
from app.schemas import ProyectoCreate, ProyectoResponse 

router = APIRouter(
    prefix="/proyectos",
    tags=["Proyectos"]
)

@router.get("/", response_model=List[ProyectoResponse])
def get_proyectos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    proyectos = db.query(ProyectoObra).offset(skip).limit(limit).all()
    return proyectos

@router.get("/{proyecto_id}", response_model=ProyectoResponse)
def get_proyecto(proyecto_id: int, db: Session = Depends(get_db)):
    proyecto = db.query(ProyectoObra).filter(ProyectoObra.id == proyecto_id).first()
    if not proyecto:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Proyecto no encontrado")
    return proyecto

@router.post("/", response_model=ProyectoResponse, status_code=status.HTTP_201_CREATED)
def create_proyecto(proyecto: ProyectoCreate, db: Session = Depends(get_db)):
    nuevo_proyecto = ProyectoObra(**proyecto.model_dump()) # Usar .dict() si usas Pydantic v1
    db.add(nuevo_proyecto)
    db.commit()
    db.refresh(nuevo_proyecto)
    return nuevo_proyecto

@router.put("/{proyecto_id}", response_model=ProyectoResponse)
def update_proyecto(proyecto_id: int, proyecto_actualizado: ProyectoCreate, db: Session = Depends(get_db)):
    proyecto_query = db.query(ProyectoObra).filter(ProyectoObra.id == proyecto_id)
    proyecto = proyecto_query.first()
    
    if not proyecto:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Proyecto no encontrado")
    
    proyecto_query.update(proyecto_actualizado.model_dump(), synchronize_session=False)
    db.commit()
    
    return proyecto_query.first()

@router.delete("/{proyecto_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_proyecto(proyecto_id: int, db: Session = Depends(get_db)):
    proyecto_query = db.query(ProyectoObra).filter(ProyectoObra.id == proyecto_id)
    
    if not proyecto_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Proyecto no encontrado")
    
    proyecto_query.delete(synchronize_session=False)
    db.commit()
    return None
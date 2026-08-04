from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Material
from app.schemas import MaterialCreate, MaterialResponse 

router = APIRouter(
    prefix="/materiales",
    tags=["Materiales"]
)

@router.get("/", response_model=List[MaterialResponse])
def get_materiales(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    materiales = db.query(Material).offset(skip).limit(limit).all()
    return materiales

@router.get("/{material_id}", response_model=MaterialResponse)
def get_material(material_id: int, db: Session = Depends(get_db)):
    material = db.query(Material).filter(Material.id == material_id).first()
    if not material:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material no encontrado")
    return material

@router.post("/", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    nuevo_material = Material(**material.model_dump())
    db.add(nuevo_material)
    db.commit()
    db.refresh(nuevo_material)
    return nuevo_material

@router.put("/{material_id}", response_model=MaterialResponse)
def update_material(material_id: int, material_actualizado: MaterialCreate, db: Session = Depends(get_db)):
    material_query = db.query(Material).filter(Material.id == material_id)
    material = material_query.first()
    
    if not material:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material no encontrado")
    
    material_query.update(material_actualizado.model_dump(), synchronize_session=False)
    db.commit()
    
    return material_query.first()

@router.delete("/{material_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_material(material_id: int, db: Session = Depends(get_db)):
    material_query = db.query(Material).filter(Material.id == material_id)
    
    if not material_query.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Material no encontrado")
    
    material_query.delete(synchronize_session=False)
    db.commit()
    return None
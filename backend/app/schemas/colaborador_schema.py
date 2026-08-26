from pydantic import BaseModel

from app.models import RolColaborador


class ColaboradorBase(BaseModel):
    usuario_id: int
    rol: RolColaborador


class ColaboradorCreate(ColaboradorBase):
    pass


class ColaboradorUpdate(BaseModel):
    rol: RolColaborador


class ColaboradorResponse(ColaboradorBase):
    id: int
    proyecto_id: int

    class Config:
        from_attributes = True

import enum

from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship

from app.core.database import Base


class RolColaborador(str, enum.Enum):
    ARQUITECTO = "Arquitecto"
    TRABAJADOR = "Trabajador"
    VISUALIZADOR = "Visualizador"


class ColaboradorProyecto(Base):
    """Relación N a N entre usuarios y proyectos: define con qué rol participa
    cada usuario en cada proyecto (un mismo usuario puede tener roles distintos
    en proyectos distintos)."""

    __tablename__ = "colaboradores_proyecto"

    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), nullable=False)
    rol = Column(String(50), nullable=False)

    __table_args__ = (
        UniqueConstraint("proyecto_id", "usuario_id", name="unique_colaborador_por_proyecto"),
    )

    proyecto = relationship("ProyectoObra", back_populates="colaboradores")
    usuario = relationship("Usuario", back_populates="colaboraciones")

import enum
from sqlalchemy import Column, Integer, String, Boolean, Date, Time, Float, ForeignKey, DateTime, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# --- ENUMERACIONES (Necesarias para los esquemas y los diagramas) ---
class RolUsuario(int, enum.Enum):
    ADMIN = 1
    SUPERVISOR = 2
    OPERARIO = 3

class EstadoProyecto(str, enum.Enum):
    PLANIFICACION = "Planificación"
    EN_EJECUCION = "En Ejecución"
    FINALIZADO = "Finalizado"

class EstadoTarea(str, enum.Enum):
    PENDIENTE = "Pendiente"
    EN_PROCESO = "En Proceso"
    COMPLETADA = "Completada"

class TipoMovimiento(str, enum.Enum):
    ENTRADA = "Entrada"
    SALIDA = "Salida"
    AJUSTE = "Ajuste"


# --- MODELOS DE BASE DE DATOS ---

class Usuario(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombres = Column(String(100), nullable=False)
    apellidos = Column(String(100), nullable=False)
    correo_electronico = Column(String(150), unique=True, nullable=False)
    contrasena_encriptada = Column(String(255), nullable=False)
    rol = Column(Integer, nullable=False)
    intentos_fallidos = Column(Integer, default=0)
    activo = Column(Boolean, default=True)
    fecha_vencimiento_licencia = Column(Date, nullable=True)
    tiene_certificacion_maquinaria = Column(Boolean, default=False)

    # Relaciones inversas
    comentarios = relationship("Comentario", back_populates="usuario", cascade="all, delete-orphan")
    turnos_relevos = relationship("TurnoRelevo", back_populates="usuario", cascade="all, delete-orphan")
    historial_movimientos = relationship("HistorialMovimiento", back_populates="usuario", cascade="all, delete-orphan")

class ProyectoObra(Base):
    __tablename__ = "proyectos_obra"
    id = Column(Integer, primary_key=True, index=True)
    nombre_proyecto = Column(String(150), nullable=False)
    ubicacion_direccion = Column(String(255), nullable=False)
    estado = Column(String(50), nullable=False)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin_estimada = Column(Date, nullable=False)
    
    # Relaciones
    tareas = relationship("Tarea", back_populates="proyecto", cascade="all, delete-orphan")
    inventario = relationship("InventarioObra", back_populates="proyecto", cascade="all, delete-orphan")
    turnos_relevos = relationship("TurnoRelevo", back_populates="proyecto", cascade="all, delete-orphan")
    historial_movimientos = relationship("HistorialMovimiento", back_populates="proyecto", cascade="all, delete-orphan")
    evidencias = relationship("EvidenciaMultimedia", back_populates="proyecto", cascade="all, delete-orphan")
    actas_campo = relationship("ActaCampo", back_populates="proyecto", cascade="all, delete-orphan")

class Material(Base):
    __tablename__ = "materiales"
    id = Column(Integer, primary_key=True, index=True)
    nombre_material = Column(String(100), nullable=False)
    unidad_medida = Column(String(50), nullable=False)
    
    inventario = relationship("InventarioObra", back_populates="material", cascade="all, delete-orphan")
    historial_movimientos = relationship("HistorialMovimiento", back_populates="material", cascade="all, delete-orphan")

class InventarioObra(Base):
    __tablename__ = "inventario_obras"
    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    material_id = Column(Integer, ForeignKey("materiales.id", ondelete="CASCADE"), nullable=False)
    cantidad_disponible = Column(Float, nullable=False, default=0.0)

    __table_args__ = (UniqueConstraint('proyecto_id', 'material_id', name='unique_material_por_proyecto'),)

    proyecto = relationship("ProyectoObra", back_populates="inventario")
    material = relationship("Material", back_populates="inventario")

class Tarea(Base):
    __tablename__ = "tareas"
    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    nombre_tarea = Column(String(150), nullable=False)
    descripcion = Column(Text, nullable=True)
    estado = Column(String(50), nullable=False)
    fecha_inicio = Column(Date, nullable=True)
    fecha_fin_estimada = Column(Date, nullable=True)
    fecha_asignacion = Column(Date, server_default=func.current_date())

    proyecto = relationship("ProyectoObra", back_populates="tareas")
    comentarios = relationship("Comentario", back_populates="tarea", cascade="all, delete-orphan")

class Comentario(Base):
    __tablename__ = "comentarios"
    id = Column(Integer, primary_key=True, index=True)
    tarea_id = Column(Integer, ForeignKey("tareas.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), nullable=False)
    contenido = Column(Text, nullable=False)
    fecha_comentario = Column(DateTime, server_default=func.now(), nullable=False)

    tarea = relationship("Tarea", back_populates="comentarios")
    usuario = relationship("Usuario", back_populates="comentarios")

class TurnoRelevo(Base):
    __tablename__ = "turnos_relevos"
    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), nullable=False)
    fecha_turno = Column(Date, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)
    estado_asistencia = Column(String(50), nullable=False)

    proyecto = relationship("ProyectoObra", back_populates="turnos_relevos")
    usuario = relationship("Usuario", back_populates="turnos_relevos")

class HistorialMovimiento(Base):
    __tablename__ = "historial_movimientos"
    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    material_id = Column(Integer, ForeignKey("materiales.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), nullable=False)
    tipo_movimiento = Column(String(50), nullable=False)
    cantidad = Column(Float, nullable=False)
    fecha_movimiento = Column(DateTime, server_default=func.now(), nullable=False)

    proyecto = relationship("ProyectoObra", back_populates="historial_movimientos")
    material = relationship("Material", back_populates="historial_movimientos")
    usuario = relationship("Usuario", back_populates="historial_movimientos")

class EvidenciaMultimedia(Base):
    __tablename__ = "evidencias_multimedia"
    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    ruta_archivo = Column(String(255), nullable=False)
    fecha_subida = Column(DateTime, server_default=func.now(), nullable=False)

    proyecto = relationship("ProyectoObra", back_populates="evidencias")

class ActaCampo(Base):
    __tablename__ = "actas_campo"
    id = Column(Integer, primary_key=True, index=True)
    proyecto_id = Column(Integer, ForeignKey("proyectos_obra.id", ondelete="CASCADE"), nullable=False)
    fecha_generacion = Column(DateTime, server_default=func.now(), nullable=False)
    ruta_pdf = Column(String(255), nullable=False)
    firma_supervisor_url = Column(String(255), nullable=True)
    firma_operario_url = Column(String(255), nullable=True)
    coordenadas_gps = Column(String(100), nullable=True)
    marca_agua_timestamp = Column(String(100), nullable=True)

    proyecto = relationship("ProyectoObra", back_populates="actas_campo")
from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime, time
from typing import Optional, List
from .models import RolUsuario, EstadoProyecto, EstadoTarea, TipoMovimiento

# ==========================================
# 1. ESQUEMAS DE USUARIO (AUTH & SST)
# ==========================================

class UsuarioBase(BaseModel):
    nombre_completo: str = Field(..., max_length=150, example="David Felipe Galindo")
    correo_electronico: EmailStr
    rol: RolUsuario
    fecha_vencimiento_licencia: Optional[date] = None
    tiene_certificacion_maquinaria: bool = False

class UsuarioCreate(UsuarioBase):
    """Esquema para el registro: exige la contraseña"""
    contrasena: str = Field(..., min_length=8, max_length=100, example="ClaveSegura123*")

class UsuarioUpdate(BaseModel):
    nombre_completo: Optional[str] = None
    rol: Optional[RolUsuario] = None
    activo: Optional[bool] = None
    fecha_vencimiento_licencia: Optional[date] = None
    tiene_certificacion_maquinaria: Optional[bool] = None

class UsuarioResponse(UsuarioBase):
    """Esquema de respuesta: jamás devuelve la contraseña ni los intentos fallidos"""
    id: int
    activo: bool

    class Config:
        from_attributes = True

class UsuarioLogin(BaseModel):
    """TV-AUTH-02: Credenciales de inicio de sesión"""
    correo_electronico: EmailStr
    contrasena: str


# ==========================================
# 2. ESQUEMAS DE PROYECTO DE OBRA
# ==========================================

class ProyectoBase(BaseModel):
    nombre_proyecto: str = Field(..., max_length=150, example="Torre Titán Norte")
    ubicacion_direccion: str = Field(..., max_length=200, example="Calle 100 #15-30, Bogotá")
    estado: EstadoProyecto = EstadoProyecto.PLANIFICACION
    fecha_inicio: date
    fecha_fin_estimada: date

class ProyectoCreate(ProyectoBase):
    pass

class ProyectoUpdate(BaseModel):
    nombre_proyecto: Optional[str] = None
    ubicacion_direccion: Optional[str] = None
    estado: Optional[EstadoProyecto] = None
    fecha_inicio: Optional[date] = None
    fecha_fin_estimada: Optional[date] = None

class ProyectoResponse(ProyectoBase):
    id: int
    administrador_id: Optional[int] = None

    class Config:
        from_attributes = True


# ==========================================
# 3. ESQUEMAS DE SUBCONTRATISTAS
# ==========================================

class SubcontratistaBase(BaseModel):
    nombre_empresa: str = Field(..., max_length=150)
    nit: str = Field(..., max_length=50)
    fecha_vencimiento_poliza: date
    fecha_vencimiento_ss: date
    estado: str = "Autorizado"

class SubcontratistaCreate(SubcontratistaBase):
    proyecto_id: int

class SubcontratistaResponse(SubcontratistaBase):
    id: int
    proyecto_id: int

    class Config:
        from_attributes = True


# ==========================================
# 4. ESQUEMAS DE INVENTARIO Y MATERIALES
# ==========================================

class MaterialBase(BaseModel):
    nombre_material: str = Field(..., max_length=100, example="Cemento Gris ARGOS")
    unidad_medida: str = Field(..., max_length=20, example="Bultos")

class MaterialCreate(MaterialBase):
    """Esquema para registrar un nuevo tipo de material en el sistema"""
    pass

class MaterialResponse(MaterialBase):
    id: int

    class Config:
        from_attributes = True

class RegistroMovimiento(BaseModel):
    """TV-MAT-03 y TV-OUT-13: Carga para entradas y salidas"""
    material_id: int
    proyecto_id: int
    tipo_movimiento: TipoMovimiento
    cantidad: float = Field(..., gt=0, description="La cantidad debe ser mayor a cero")

class KardexResponse(BaseModel):
    """TV-KDX-14: Formato de salida inmutable para auditorías"""
    id: int
    proyecto_id: int
    material_id: int
    usuario_id: int
    tipo_movimiento: TipoMovimiento
    cantidad: float
    fecha_movimiento: datetime

    class Config:
        from_attributes = True


# ==========================================
# 5. ESQUEMAS DE TAREAS Y COMENTARIOS
# ==========================================

class ComentarioCreate(BaseModel):
    """TV-CMT-06: Validación estricta de un máximo de 300 caracteres"""
    contenido: str = Field(..., min_length=1, max_length=300, example="Corrección: Ajustar el nivelado.")
    tarea_id: Optional[int] = None
    multimedia_id: Optional[int] = None

class ComentarioResponse(BaseModel):
    id: int
    contenido: str
    fecha_comentario: datetime
    usuario_id: int

    class Config:
        from_attributes = True

class TareaBase(BaseModel):
    nombre_tarea: str = Field(..., max_length=150)
    descripcion: str
    estado: EstadoTarea = EstadoTarea.PENDIENTE

class TareaCreate(TareaBase):
    proyecto_id: int
    usuario_id: int # ID del Operario asignado

class TareaResponse(TareaBase):
    id: int
    fecha_asignacion: date
    proyecto_id: int
    usuario_id: int
    comentarios: List[ComentarioResponse] = []

    class Config:
        from_attributes = True


# ==========================================
# 6. ESQUEMAS DE JORNADAS Y ASISTENCIA
# ==========================================

class TurnoBase(BaseModel):
    fecha_turno: date
    hora_inicio: time
    hora_fin: time
    estado_asistencia: str = "Programado"

class TurnoCreate(TurnoBase):
    usuario_id: int
    proyecto_id: int

class TurnoResponse(TurnoBase):
    id: int
    usuario_id: int
    proyecto_id: int

    class Config:
        from_attributes = True
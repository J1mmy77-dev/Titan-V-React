from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

# 1. Importamos todos los routers (Asegúrate de incluir el de auth)
from app.routers.proyectos import router as proyectos_router 
from app.routers.materiales import router as materiales_router
from app.routers.usuarios import router as usuarios_router
from app.routers.auth_router import router as auth_router  # <-- ¡Faltaba esta línea!

# Crear tablas automáticamente
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Titan V API")

# 2. Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Incluimos los routers en la aplicación
app.include_router(proyectos_router)
app.include_router(materiales_router)
app.include_router(usuarios_router)
app.include_router(auth_router)  

# Ruta raíz para verificar estado
@app.get("/")
def read_root():
    return {"status": "online"}
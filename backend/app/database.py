
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Ruta de conexión usando el usuario y base de datos que creamos en Postgres
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:1234@localhost:5432/titanv_db"

# El motor encargado de procesar las consultas
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# La sesión que usaremos en los endpoints para interactuar con las tablas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# La clase base de la cual heredarán nuestros modelos de base de datos
Base = declarative_base()

# Función auxiliar para abrir y cerrar la conexión automáticamente
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
import os
from datetime import timedelta

SECRET_KEY = os.getenv("JWT_SECRET_KEY") 
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY no está configurada")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = timedelta(minutes=int(os.getenv("JWT_EXPIRE_MINUTES", 60)))
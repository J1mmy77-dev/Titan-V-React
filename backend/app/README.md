# 🏗️ Titan V - Sistema de Gestión de Construcción

Titan V es una aplicación web empresarial diseñada para optimizar la logística operativa, el control de inventarios y el reporte de avances en frentes de obra en tiempo real. Este sistema permite dividir la experiencia entre una interfaz pública comercial y un panel de control privado estructurado para ingenieros y administradores de proyectos.

---

## 🚀 Características Principales

* **Panel de Control Unificado (Dashboard):** Administración centralizada mediante pestañas dinámicas (SPA) para una navegación fluida sin recargas de página.
* **Gestión de Proyectos de Obra:** Registro, seguimiento de presupuestos (COP) y control de cronogramas de ejecución.
* **Inventario de Materiales (Stock):** Control exacto de insumos técnicos con asignación relacional a obras específicas.
* **Reportes Diarios de Campo:** Bitácoras detalladas para el registro de actividades y novedades directamente desde el terreno.
* **Sistema de Autenticación Integrado:** Pasarela de acceso segura para personal autorizado con persistencia de sesión local (`localStorage`).

---

## 🛠️ Tecnologías Utilizadas

### Backend (API Rest)
* **Python:** Lenguaje principal de desarrollo.
* **FastAPI:** Framework de alto rendimiento para la construcción de la API.
* **SQLAlchemy:** ORM para el mapeo relacional de datos.
* **Uvicorn:** Servidor ASGI para la ejecución del entorno local.
* **PostgreSQL:** Sistema de gestión de bases de datos relacionales.

### Frontend
* **HTML5 & CSS3:** Arquitectura de vistas y diseño de interfaz moderno con variables de estilo (`:root`).
* **JavaScript (Vanilla):** Lógica dinámica, manipulación del DOM y consumo asíncrono de servicios mediante `Fetch API`.
* **FontAwesome:** Kit de herramientas de iconos vectoriales.

---

## 📂 Estructura del Proyecto

```text
├── backend/
│   ├── database.py       # Configuración de la conexión a PostgreSQL
│   ├── main.py           # Puntos de entrada de la API y Middleware CORS
│   ├── models.py         # Modelos relacionales de SQLAlchemy (Tablas)
│   └── schemas.py        # Esquemas de validación de datos con Pydantic
│
└── frontend/
    ├── proyecto.html     # Landing page pública del sistema
    ├── proyecto.css      # Estilos globales de la presentación
    ├── login.html        # Interfaz de acceso y registro de usuarios
    ├── login.css         # Estilos del módulo de autenticación
    ├── login.js          # Lógica de redirección y manejo de sesión
    ├── dashboard.html    # Panel de administración privado
    └── dashboard.js      # Lógica de consumo de la API y pestañas dinámicas

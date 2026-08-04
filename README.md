# Titan V - Sistema de Gestión de Obra

Titan V es un sistema integral de gestión y control de proyectos de infraestructura, diseñado para centralizar la información operativa, logística y técnica en tiempo real. Este backend actúa como el núcleo de la API que alimenta los procesos de campo y la administración central.

Este sistema está diseñado para apoyar a pequeñas y medianas empresas de construcción en la gestión de la información y en el seguimiento organizado y flexible de sus obras. TITAN V centraliza el registro constante de actualizaciones, permitiendo adjuntar contenido multimedia (imágenes) y habilitando secciones de comentarios. Es una herramienta clave para optimizar los procesos logísticos y de comunicación, ofreciendo una solución eficiente y sin costos adicionales para mantener informadas a las partes interesadas.


## 🚀 Características Principales
* **Gestión de Proyectos:** Seguimiento del ciclo de vida de obras de infraestructura.
* **Control de Inventarios:** Registro inmutable de entradas y salidas de materiales.
* **Gestión de Personal:** Asignación de tareas y control de certificaciones.
* **Documentación en Campo:** Registro de actas digitales y evidencias.

##  Usuarios Principales

1. **Usuario Administrador / Constructor (La Constructora)**: Es el personal de la empresa constructora (ingenieros, directores de obra, contratistas). Ellos crean los proyectos y suben las fotos y actualizaciones.
2.  **Usuario Final / Contratante (El cliente de la constructora):** Es la persona externa que contrató a la constructora. Entra a la app solo para ver cómo va su obra.

## Funcionalidades principales

-[ ] Registro e inicio de sesión seguro.

-[ ] Creación y gestión de proyectos.

-[ ] Soporte para contenido multimedia (imágenes).

-[ ] Sistema de actualizaciones periódicas.

-[ ] Módulo de seguimiento y control del estado del proyecto.

## 🛠️ Stack Tecnológico
* **Backend:** FastAPI (Python)
* **Base de Datos:** PostgreSQL
* **ORM:** SQLAlchemy
* **Validación:** Pydantic
* **Entorno:** WSL (Windows Subsystem for Linux)

## Metodología de Desarrollo 
**Metodología elegida**: Scrum.

**¿Por qué?**: Se seleccionó Scrum porque proporciona una mayor flexibilidad, asegura la calidad del producto final y aumenta la productividad del equipo. Sus ciclos iterativos e incrementales (Sprints) son los que mejor se ajustan a la naturaleza cambiante de la construcción y a los requerimientos del proyecto, permitiendo además una distribución equitativa de tareas dentro del equipo de desarrollo.

## Arquitectura de Software (Metodología en Capas)

Para garantizar el orden, la escalabilidad y permitir que el equipo trabaje en paralelo, el proyecto se estructura bajo una Arquitectura en Capas:

**I. Capa de Presentación (Frontend)**
Es la interfaz gráfica con la que interactúan los usuarios. Recibe las acciones del usuario y muestra las respuestas del sistema de forma dinámica.

**HTML5**: Define la estructura semántica de los formularios, paneles de control y vistas del proyecto.

**CSS**: Modela el diseño visual, la disposición de los elementos y asegura la adaptabilidad en dispositivos móviles (Responsive Design).

**JavaScript (Manejo del DOM y API)**: Aporta la interactividad necesaria. Se encarga de capturar los eventos del usuario (como clics o envíos de formularios), manipular el DOM para actualizar la pantalla en tiempo real (por ejemplo, insertar un nuevo comentario en la lista sin recargar la página) y realizar la validación de campos en el cliente.

**II. Capa de Rutas y Entrada (API Routing)**
Tecnología: Node.js (Express).

**Función**: Actúa como la puerta de entrada al servidor. Recibe las peticiones HTTP asíncronas enviadas por el JavaScript del frontend (endpoints como /api/proyectos) y las redirige al controlador correspondiente.

**III. Capa de Lógica de Negocio (Controladores)**
**Tecnología**: Node.js.

**Función**: Es el cerebro del backend. Aplica las reglas del sistema: valida la autenticidad de las sesiones, procesa las imágenes subidas por los constructores y verifica que los usuarios tengan los permisos requeridos antes de autorizar cualquier cambio.

**IV. Capa de Acceso a Datos (Modelos)**
Tecnología: Node.js (SQL / ORM).

**Función**: Traduce las órdenes de la lógica de negocio en consultas de base de datos. Es la única capa autorizada para comunicarse directamente con el sistema de almacenamiento.

**V. Capa de Almacenamiento (Base de Datos)**
**Tecnología**: PostgreSQL.

**Función**: Repositorio relacional encargado de almacenar de forma permanente y segura toda la información de los proyectos, usuarios, imágenes y comentarios.

## Flujo de Interacción: El rol de JavaScript y el DOM
Para entender cómo cooperan las capas con la inclusión de JavaScript, este es el flujo que sigue una acción común dentro de la app (como publicar un comentario):

-El usuario escribe un comentario en la interfaz (HTML/CSS).

-JavaScript intercepta el evento de envío, valida que el texto no esté vacío y realiza una petición asíncrona (fetch) al servidor backend (Node.js).

-El servidor procesa la petición y ordena guardar el comentario en la base de datos (PostgreSQL).

-Al recibir la confirmación de éxito del servidor, JavaScript modifica el DOM de la página web de manera inmediata, dibujando el nuevo comentario en la pantalla del usuario de forma fluida y sin refrescar el navegador.


## 📂 Estructura del Proyecto
```text
titanv-backend/
├── app/
│   ├── routers/        # Endpoints modulares
│   ├── database.py     # Conexión a la base de datos
│   ├── models.py       # Modelos (SQLAlchemy)
│   ├── schemas.py      # Esquemas de validación (Pydantic)
│   └── main.py         # Punto de entrada de la API
├── venv/               # Entorno virtual
└── .gitignore          # Archivos excluidos de control de versiones

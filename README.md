# TITAN V

Sistema web de gestión de obras para pequeñas y medianas empresas de construcción.

## Descripción

**Titan V** centraliza la información de proyectos, materiales, usuarios y seguimiento de obras en una interfaz web moderna. El proyecto está desarrollado con React, TypeScript y Vite.

Actualmente incluye:

- Landing page informativa.
- Sección **Quiénes Somos** con misión, visión y valores.
- Inicio de sesión.
- Flujo de registro de usuarios.
- Dashboard protegido mediante el estado de autenticación.
- Gestión visual de proyectos.
- Gestión de materiales y productos.
- Gestión de usuarios.
- Comentarios y seguimiento.

> El proyecto se encuentra en etapa de desarrollo. Algunas funciones actualmente son demostrativas y todavía no cuentan con un backend o base de datos.

## Tecnologías

- React
- TypeScript
- Vite
- React Router DOM
- CSS y estilos en línea
- Font Awesome para iconos

## Requisitos

Tener instalado:

- Node.js
- npm

Puedes comprobar las versiones con:

```bash
node -v
npm -v
```

## Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/J1mmy77-dev/Titan-V-React.git
cd Titan-V-React
```

Instala las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Después abre en el navegador la dirección que muestre Vite, normalmente:

```text
http://localhost:5173
```

## Compilar para producción

Para comprobar que TypeScript y Vite pueden generar la aplicación:

```bash
npm run build
```

Para visualizar la compilación:

```bash
npm run preview
```

## Estructura principal

```text
src/
├── assets/
├── components/
│   ├── CardAccion.tsx
│   ├── Comentarios.tsx
│   ├── InicioTab.tsx
│   ├── Login.tsx
│   ├── MaterialesTab.tsx
│   ├── Productos.tsx
│   ├── ProyectosTab.tsx
│   ├── QuienesSomos.tsx
│   ├── Registro.tsx
│   ├── Sidebar.tsx
│   └── Usuarios.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── LandingPage.tsx
│   └── LoginPage.tsx
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Rutas principales

- `/` — Landing Page.
- `/login` — Inicio de sesión y registro.
- `/dashboard` — Panel principal después del inicio de sesión.

## Seguridad

El formulario de registro es actualmente una demostración de interfaz. No existe todavía persistencia de usuarios en una base de datos.

Por seguridad, la contraseña no se muestra en los mensajes de confirmación ni se imprime directamente en la consola.

## Estado del proyecto

Titan V continúa en desarrollo. La interfaz y la navegación principal están implementadas y se pueden ampliar posteriormente con:

- Backend.
- Base de datos.
- Autenticación real.
- Persistencia de usuarios y proyectos.
- CRUD completo de materiales.
- Control de permisos y roles.

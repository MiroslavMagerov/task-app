# Fullstack Task Manager App

## Descripción

Esta es una aplicación **fullstack** para la gestión de tareas, que utiliza **MongoDB Atlas** como base de datos, **Node.js** para el backend, y **Vite + React** para el frontend. La aplicación está diseñada para ser desplegada en un hosting como **Render** para el backend y **Netlify** o similar para el frontend.

## Tecnologías

- **Backend**:

  - **Node.js**: El servidor está construido en Node.js utilizando el framework Express para manejar las rutas y las API REST.
  - **MongoDB Atlas**: Base de datos NoSQL en la nube para almacenar las tareas de los usuarios y sus datos.
  - **JWT (JSON Web Token)**: Autenticación basada en tokens para manejar sesiones de usuario.
  - **Render**: Servicio de hosting para el backend.

- **Frontend**:
  - **Vite**: Herramienta de desarrollo que optimiza la compilación y el bundling del proyecto.
  - **React**: Biblioteca para construir interfaces de usuario.
  - **Netlify**: Servicio de hosting estático para el frontend.

## Características

- Autenticación de usuario con **JWT**.
- CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de tareas.
- Almacenamiento seguro en **MongoDB Atlas**.
- Separación clara entre frontend y backend para facilitar el desarrollo y despliegue.

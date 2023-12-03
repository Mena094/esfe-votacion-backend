# ESFE Votación backend
> MODIFICACIÓN PARA CONCURSO POR VOTO CON PUNTAJE

Este documento proporciona una descripción general de la API del backend utilizada en el Sistema de Gestión de Concursos. 

## Tecnologías
- Node.js 
- Express 
- MySQL 
- mysql2.

## Base de datos

![diagram](./doc/diagram-calification.png.png)

[para mas información sobre la base de datos click aqui](./doc/database.sql)
## Configuración

Asegúrate de tener Node.js y MySQL instalados en tu entorno. Además, crea un archivo `.env` en la raíz del proyecto con la configuración necesaria, como la conexión a la base de datos y el puerto del servidor.

```
DB_NAME=""
DB_HOST=""
DB_PORT=
DB_USER=""
DB_PASSWORD="."
USER=""
PASSWORD=""
```

## Ejecución

1. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

2. Inicia el servidor:

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3023` o en el puerto especificado en el archivo `.env`.

## Para ver información de los endpoints [Click aquí](./doc/endpoints.md)
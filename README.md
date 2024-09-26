# hotel_nest_angular
Prueba para santo vecino en la cual se implementa, nest como framework backend, angular v18 para frontend y para base de datos postgresql


# API de Reservas de Habitaciones

Este proyecto es una API de reservas de habitaciones desarrollada en **NestJS** con **TypeORM** y **PostgreSQL**. La API expone varios endpoints para gestionar habitaciones, usuarios y reservas. La documentación de los endpoints está disponible a través de **Swagger**.

## Características

- **Gestión de Usuarios**: CRUD completo para usuarios.
- **Gestión de Habitaciones**: CRUD completo para habitaciones.
- **Gestión de Reservas**: CRUD completo para reservas (en desarrollo).
- **Documentación con Swagger**: La documentación de la API está disponible y es interactiva.

## Tecnologías utilizadas

- **NestJS**: Framework para el backend.
- **TypeORM**: ORM para la base de datos relacional.
- **PostgreSQL**: Base de datos utilizada.
- **Swagger**: Documentación automática de la API.
- **Angular**: Frontend framework .
- **TailwindCss**: Frontend framework .



## Requisitos previos

- **Node.js** y **npm** instalados.
- Tener una instancia de **PostgreSQL** en funcionamiento.

## Instalación

Sigue los pasos a continuación para configurar el entorno de desarrollo.

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura el archivo `.env` en la raíz del proyecto con tus credenciales de base de datos:

    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_tu_base_de_datos
    ```

4. Corre las migraciones para crear las tablas necesarias (si es necesario):

    ```bash
    npm run typeorm migration:run
    ```

## Uso

### Ejecutar la aplicación

Para ejecutar la aplicación en modo de desarrollo:

```bash
npm run start
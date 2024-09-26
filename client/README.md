# Frontend de Reservas de Habitaciones

Este proyecto es el frontend de la aplicación de reservas de habitaciones, desarrollado en **Angular 18**. Utiliza **Tailwind CSS** para el diseño y **NgRx** para la gestión del estado. El componente principal, `Rooms`, se conecta a un API backend para mostrar las habitaciones disponibles.

## Características

- **Gestión de habitaciones**: Consumo de la API para listar habitaciones.
- **Tailwind CSS**: Diseño visual moderno y responsive.
- **NgRx**: Gestión del estado con un store.
- **Componentes modulares**: Reutilización de componentes.

## Tecnologías utilizadas

- **Angular 18**: Framework frontend.
- **Tailwind CSS**: Framework de diseño CSS.
- **NgRx**: Manejo de estado.
- **TypeScript**: Lenguaje principal.
- **HTTP Client**: Para la comunicación con el backend.

## Requisitos previos

- **Node.js** y **npm** instalados.
- Tener la API de backend ejecutándose (la API de habitaciones).

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

3. Asegúrate de que el backend esté corriendo en `http://localhost:3000` o ajusta la URL de la API en el archivo `rooms.service.ts`.

## Configuración de Tailwind CSS

Tailwind CSS está configurado en este proyecto para proporcionar un diseño moderno y responsive. Si necesitas ajustar Tailwind, puedes modificar el archivo `tailwind.config.js`.

### Comandos útiles de Tailwind

- **Añadir estilos a los componentes**: Utiliza las clases utilitarias de Tailwind directamente en las plantillas HTML.
- **Configuración personalizada**: Modifica el archivo `tailwind.config.js` para personalizar el tema.

## Componentes principales

### RoomsComponent

Este componente se encarga de mostrar la lista de habitaciones consumidas desde el backend. Utiliza Tailwind CSS para el diseño visual.

- **Archivo de componente**: `src/app/rooms/rooms.component.ts`
- **Servicio de habitaciones**: `src/app/services/rooms.service.ts`

#### Ejemplo del servicio `RoomsService`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'http://localhost:3000/rooms';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

- Estructura del proyecto
src/
│
├── app/
│   ├── rooms/               # Componente de habitaciones
│   ├── services/            # Servicios de la aplicación
│   ├── store/rooms/         # NgRx para manejar el estado de rooms
│   ├── app.module.ts        # Módulo principal de la aplicación
│   └── app.component.ts     # Componente principal
├── assets/                  # Archivos estáticos
├── styles.css               # Archivo global de estilos (incluye Tailwind)
└── ...

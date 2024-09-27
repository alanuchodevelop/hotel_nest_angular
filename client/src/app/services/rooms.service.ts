// src/app/services/rooms.service.ts
import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Room} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private readonly apiUrl = 'http://localhost:3000/rooms'; // Cambia esto según tu URL
  http = inject(HttpClient)

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  // Método para eliminar una habitación por ID
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ckeck enable or not
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva habitación
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  // Actualizar una habitación existente
  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }
}

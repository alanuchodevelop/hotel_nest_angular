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
}

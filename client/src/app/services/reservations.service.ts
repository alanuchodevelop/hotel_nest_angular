  import { Injectable } from '@angular/core';
  import {HttpClient} from "@angular/common/http";
  import {Observable} from "rxjs";
  import {Reservation} from "@app/models";

  @Injectable({
    providedIn: 'root'
  })
  export class ReservationsService {

    private apiUrl = 'http://localhost:3000/reservations';  // Cambia esta URL a tu API backend
    constructor(private http: HttpClient) {}

    // Método para crear una reserva
    createReservation(reservationData: { startDate: string; endDate: string }): Observable<any> {
      return this.http.post(this.apiUrl, reservationData);
    }

    // Método para obtener todas las reservaciones
    getReservations(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(this.apiUrl);
    }
  }

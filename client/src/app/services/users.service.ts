import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "@app/models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = 'http://localhost:3000/users'; // Cambia esto según tu URL
  http = inject(HttpClient)

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error eliminando el usuario:', error);
        return throwError(() => new Error('Error eliminando el usuario.'));
      })
    );
  }

}

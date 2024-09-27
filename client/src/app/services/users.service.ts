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

  // Actualizar un usuario
  updateUser(id: number, user: Object): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      catchError((error) => {
        console.error('Error actualizando el usuario:', error);
        return throwError(() => new Error('Error actualizando el usuario.'));
      })
    );
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Error creando el usuario:', error);
        return throwError(() => new Error('Error creando el usuario.'));
      })
    );
  }

}

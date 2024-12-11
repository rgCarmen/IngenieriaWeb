import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) { }

  citasPaciente():Observable<any>{
    const userId = this.authService.getId(); // Obtener el ID del usuario autenticado
    if (userId) {
      return this.http.get(`${this.baseUrl}/paciente/${userId}/citas`);
    } else {
      throw new Error('Usuario no autenticado o ID de usuario no válido.');
    }
  }
}

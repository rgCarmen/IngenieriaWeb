import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtener citas del paciente autenticado.
   * @returns Observable con las citas del paciente o un error.
   */
  citasPaciente(): Observable<any> {
    const userId = this.authService.getId(); // Obtener el ID del usuario autenticado

    if (userId) {
      return this.http.get(`${this.baseUrl}/paciente/${userId}/citas`).pipe(
        catchError((error) => {
          console.error('Error al obtener las citas del paciente:', error);
          return throwError(() => new Error('Error al obtener las citas del paciente.'));
        })
      );
    } else {
      console.error('Usuario no autenticado o ID de usuario no válido.');
      return of([]); // Devuelve un observable vacío si no hay usuario autenticado
    }
  }

  crearCita(cita: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/citas`, cita);
  }

  // Obtener doctores por especialidad
  obtenerMedicosPorEspecialidad(specialty: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/medicos/especialidad/${specialty}`);
  }

  // Obtener lista de especialidades únicas
  obtenerEspecialidades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/medicos/especialidades`);
  }

  obtenerCitasPorMedico(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/medicos/${doctorId}/citas`);
  }

}

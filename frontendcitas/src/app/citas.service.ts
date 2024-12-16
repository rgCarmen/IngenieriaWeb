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


  citasMedico(): Observable<any> {
    const userId = this.authService.getId(); // Obtener el ID del usuario autenticado

    if (userId) {
      return this.http.get(`${this.baseUrl}/medicos/${userId}/citas`).pipe(
        catchError((error) => {
          console.error('Error al obtener las citas del medico:', error);
          return throwError(() => new Error('Error al obtener las citas del medico.'));
        })
      );
    } else {
      console.error('Usuario no autenticado o ID de usuario no válido.');
      return of([]); // Devuelve un observable vacío si no hay usuario autenticado
    }
  }

  pedirCita(appointmentData: any, usuarioId: String): Observable<any> {
    const url = `${this.baseUrl}/paciente/${usuarioId}/citas/pedir/${appointmentData.doctorId}`;
    return this.http.put(url, appointmentData);
  }
  

  // Obtener doctores por especialidad
  obtenerMedicosPorEspecialidad(specialty: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/medicos/especialidad/${specialty}`);
  }

  // Obtener lista de especialidades únicas
  obtenerEspecialidades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/medicos/especialidades`);
  }

  // medico elimina cita
  eliminarCita(citaId: number): Observable<any> {
    const userId = this.authService.getId();
    if (userId){
      return this.http.delete<any>(`${this.baseUrl}/medicos/${userId}/citas/${citaId}`);
    } else {
      console.error('Usuario no autenticado o ID de usuario no válido.');
      return throwError(() => new Error('Usuario no autenticado o ID de usuario no válido.'));
    }
  }

   // paciente cancela cita
   cancelarCita(citaId: number): Observable<any> {
    const userId = this.authService.getId();
    if (userId){
      return this.http.put(`${this.baseUrl}/paciente/${userId}/citas/cancelar/${citaId}`, {});
    } else {
      console.error('Usuario no autenticado o ID de usuario no válido.');
      return throwError(() => new Error('Usuario no autenticado o ID de usuario no válido.'));
    }
  }
  
  obtenerCitasPorMedico(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/medicos/${doctorId}/citas/libres`);
  }

  crearCitaMedico(cita: any): Observable<any> {
    const userId = this.authService.getId();
    if (userId){
    return this.http.post(`${this.baseUrl}/medicos/${userId}/citas`, cita);
    }else {
      console.error('Usuario no autenticado o ID de usuario no válido.');
     return of([]); 
    }
  }

  actualizarCita(cita: any): Observable<any> {
    const userId = this.authService.getId();
    if (userId){
    const url = `${this.baseUrl}/medicos/${userId}/citas/${cita.id}`;
    return this.http.put(url,cita);
    }else {
      console.error('Usuario no autenticado o ID de usuario no válido.');
     return of([]); 
    }
  }


}
  

  


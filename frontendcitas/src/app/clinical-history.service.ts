import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicalHistoryService {
  private baseUrl = 'http://localhost:8080/historial';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/pacientes`);
  }

  getUsuarioIdByNombre(nombre: string, apellidos: string): Observable<number> {
    return this.http.get<number>(`/api/pacientes/usuario-id?nombre=${nombre}&apellidos=${apellidos}`);
  }

  getPatientAppointments(pacienteId: number): Observable<any> {
    return this.http.get<any[]>(`/api/historial/${pacienteId}`);
  }
}

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

  getPatientAppointments(pacienteId: number): Observable<any> {
    return this.http.get<any[]>(`/${pacienteId}`);
  }
}


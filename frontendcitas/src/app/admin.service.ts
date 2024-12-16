import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo médico
  registerDoctor(doctorData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}registro/medico`, doctorData);
  }
}

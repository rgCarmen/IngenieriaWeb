import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private baseUrl = 'http://localhost:8080/registro/registrar';

  constructor(private http: HttpClient) { }


  registrar(email: string, contrasena: string, nombre:string): Observable<any> {
      const headers = { 'Content-Type': 'application/json' };
      const body = { email, contrasena, nombre };
      return this.http.post(this.baseUrl, body, { headers });

  }
}

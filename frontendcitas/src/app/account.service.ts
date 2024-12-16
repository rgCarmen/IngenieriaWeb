import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsuario(): Observable<any> {
    const userId = this.authService.getId();
    if (userId) {
      return this.http.get<any>(`${this.apiUrl}/registro/usuario/${userId}`);
    } else {
      return of([]);
    }
  }

  updateUsuario(data: any, nombre: string, apellidos: string, telefono: string): Observable<any> {
    const userId = this.authService.getId();
    
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('apellidos', apellidos)
      .set('telefono', telefono);


    return this.http.put<any>(`${this.apiUrl}/registro/usuario/${userId}`, data.usuario, { params });
  }
}

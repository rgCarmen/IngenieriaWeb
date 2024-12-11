import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export type Role = 'ADMINISTRADOR' | 'MEDICO' | 'PACIENTE';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/login'; // URL del backend
  private isAuthenticated = false;
  private userRole: Role | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
      this.userRole = localStorage.getItem('userRole') as Role | null;
    }
  }

  setAuthentication(role: Role) {
    this.isAuthenticated = true;
    this.userRole = role;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem('userRole', role);
    }
  }

  login(email: string, contrasena: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { email, contrasena };
    return this.http.post(`${this.baseUrl}/autenticar`, body, { headers });
  }
  

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
    }
    return this.isAuthenticated;
  }

  getRole(): Role | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole') as Role | null;
    }
    return this.userRole;
  }

  logout(): Observable<any> {
    this.isAuthenticated = false;
    this.userRole = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
    }
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  getRoleFromServer(): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/obtenerRol`);
  }
}
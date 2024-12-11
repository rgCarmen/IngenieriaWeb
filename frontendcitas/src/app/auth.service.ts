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
  private userId: number = -1;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
      this.userRole = localStorage.getItem('userRole') as Role | null;
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId = Number(storedUserId); // Convierte el id a número
      }
    }
  }

  setAuthentication(role: Role, id: number) {
    this.isAuthenticated = true;
    this.userRole = role;
    this.userId = id
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', this.userId.toString());
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

  getId(): String | null {
    if (this.isAuthenticated) {
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('userId');
      }
      return this.userId !== -1 ? this.userId.toString() : null;
    }
    return null;
  }


  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
    }
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

export type Role = 'ADMINISTRADOR' | 'MEDICO' | 'PACIENTE';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/login'; // URL del backend
  private validUsers = [
    { username: 'admin', password: 'admin', role: 'admin' as Role },
    { username: 'doctor', password: 'doctor', role: 'medico' as Role },
    { username: 'paciente', password: 'paciente', role: 'paciente' as Role },
  ];
  private isAuthenticated = false;
  private userRole: Role | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Intenta autenticar al usuario con las credenciales proporcionadas.
   * @param email Correo electrónico del usuario
   * @param contrasena Contraseña del usuario
   * @returns Observable con la respuesta del servidor
   */
  login(email: string, contrasena: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
  const body = { email, contrasena };
  return this.http.post('http://localhost:8080/login/autenticar', body, { headers });
  }

  /**
   * Guarda el estado de autenticación y el rol del usuario.
   * @param role Rol del usuario autenticado
   */
  setAuthentication(role: Role) {
    this.isAuthenticated = true;
    this.userRole = role;
  }

  /**
   * Cierra sesión del usuario.
   * @returns Observable con la respuesta del servidor
   */
  logout(): Observable<any> {
    this.isAuthenticated = false;
    this.userRole = null;
    return this.http.get(`${this.baseUrl}/logout`);
  }

  /**
   * Verifica si hay un usuario autenticado.
   * @returns boolean indicando si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Método para obtener el rol desde el servidor
  getRoleFromServer(): Observable<Role> {
    return this.http.get<{ rol: Role }>(`${this.baseUrl}/obtenerRol`).pipe(
      map((response) => response.rol), // Extraemos el rol de la respuesta
      catchError((err) => {
        console.error('Error al obtener el rol', err);
        throw err; // Propagar el error
      })
    );
  }

  // Método para obtener el rol almacenado localmente
  getRole(): Role | null {
    return this.userRole;
  }

  
}

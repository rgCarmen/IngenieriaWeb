import { Injectable } from '@angular/core';

export type Role = 'admin' | 'medico' | 'paciente';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validUsers = [
    { username: 'admin', password: 'admin', role: 'admin' as Role },
    { username: 'doctor', password: 'doctor', role: 'medico' as Role },
    { username: 'paciente', password: 'paciente', role: 'paciente' as Role },
  ];

  private isAuthenticated = false; // Estado de autenticación
  private userRole: Role | null = null; // Rol del usuario autenticado

  constructor() {}

  /**
   * Intenta autenticar al usuario con las credenciales proporcionadas.
   * @param username Nombre de usuario
   * @param password Contraseña
   * @returns booleano indicando si la autenticación fue exitosa.
   */
  login(username: string, password: string): boolean {
    const user = this.validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.isAuthenticated = true;
      this.userRole = user.role;
      console.log(`Usuario autenticado como ${user.role}`);
      return true;
    } else {
      this.isAuthenticated = false;
      this.userRole = null;
      console.log('Credenciales inválidas. Usuario no autenticado.');
      return false;
    }
  }

  /**
   * Cierra sesión del usuario autenticado.
   */
  logout(): void {
    this.isAuthenticated = false;
    this.userRole = null;
    console.log('Usuario desautenticado.');
  }

  /**
   * Verifica si hay un usuario autenticado.
   * @returns booleano indicando si el usuario está autenticado.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Obtiene el rol del usuario autenticado.
   * @returns Rol del usuario autenticado o `null` si no hay autenticación.
   */
  getRole(): Role | null {
    return this.userRole;
  }
}

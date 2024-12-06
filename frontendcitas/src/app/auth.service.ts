import { Injectable } from '@angular/core';

export type Role = 'admin' | 'medico' | 'paciente';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validUsers = [
    { username: 'admin', password: 'admin', role: 'admin' as Role },
    { username: 'doctor', password: 'doctor', role: 'medico' as Role},
    { username: 'paciente', password: 'paciente', role: 'paciente' as Role},
  ];

  private isAuthenticated = false;
  private userRole: Role | null = null;

  login(username: string, password: string): boolean {
    const user = this.validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.isAuthenticated = true;
      this.userRole = user.role;
    } else {
      this.isAuthenticated = false;
      this.userRole = null;
    }
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getRole(): Role | null {
    return this.userRole;
  }
}

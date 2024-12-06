import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService, Role } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const expectedRole: Role = route.data.role;

    if (this.authService.isLoggedIn() && this.authService.getRole() === expectedRole) {
      return true;
    }

    // Redirige al login si no está autenticado o no tiene el rol correcto
    this.router.navigate(['/login']);
    return false;
  }
}

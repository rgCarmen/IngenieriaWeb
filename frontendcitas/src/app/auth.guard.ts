import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService, Role } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRole = route.data['role'];
    const localRole = this.authService.getRole();

    // Verifica primero el rol almacenado localmente
    if (this.authService.isLoggedIn() && (!expectedRole || localRole === expectedRole)) {
      return of(true);
    }

    // Si no coincide, consulta al servidor como respaldo
    return this.authService.getRoleFromServer().pipe(
      map((role) => {
        console.log('Rol recibido del servidor:', role);
        if (this.authService.isLoggedIn() && role === expectedRole) {
          return true;
        } else {
          return this.router.createUrlTree(['/unauthorized']);
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRole = route.data['role'];
  
    return this.authService.getRoleFromServer().pipe(
      
      map((role) => {
        console.log('Rol recibido del servidor:', role);
        console.log("Login?:", this.authService.isLoggedIn())
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

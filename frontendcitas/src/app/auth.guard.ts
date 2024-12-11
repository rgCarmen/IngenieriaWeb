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
    const expectedRole: Role = route.data['role'];
    console.log(route.data);
  
    return this.authService.getRoleFromServer().pipe(
      map((role) => {
        console.log('Rol recibido del servidor:', role);
        console.log("Login?:", this.authService.isLoggedIn());
        console.log('Rol esperado (expectedRole):', expectedRole);
        console.log("rol correcto?", role === expectedRole);
        if (this.authService.isLoggedIn() && role === expectedRole) {
          console.log("Autorizado")
          return true;
        } else {
          console.log(" No Autorizado")
          return this.router.createUrlTree(['/unauthorized']);
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }  
}

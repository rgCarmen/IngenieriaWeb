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
  
    const localRole = this.authService.getRole();

    if (this.authService.isLoggedIn()) {
    console.log('Rol recibido del servidor:', localRole);
    if (this.authService.isLoggedIn() && (!expectedRole || localRole === expectedRole)) {
      console.log("Autorizado")
      return of(true);
    }else{
      console.log(" No Autorizado")
      return of(this.router.createUrlTree(['/unauthorized']));
    }

    }else{
      return of(this.router.createUrlTree(['/login']));
    }
  
  }
}

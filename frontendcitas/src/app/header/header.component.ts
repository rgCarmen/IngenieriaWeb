import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userRole: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Obtener el rol del usuario al inicializar el componente
    this.userRole = this.authService.getRole();
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige al login
  }

  logout() {
    this.authService.logout();
    console.log("Logout");
    this.userRole = null;
    this.router.navigate(['/']); // Redirige al home después de cerrar sesión
   
  }
}

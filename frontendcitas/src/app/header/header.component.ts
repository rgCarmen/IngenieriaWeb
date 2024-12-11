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
    this.authService.getRoleFromServer().subscribe({
      next: (role) => {
        // console.log('Rol obtenido del servidor:', role);
        this.userRole = role;},
      error: (err) => {
        console.log('Error:', err);
        this.userRole = null;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige al login
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.userRole = null;
      this.router.navigate(['/']); // Redirige al home después de cerrar sesión
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Agrega estas variables
  password: string = ''; // Agrega estas variables
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Botón de login presionado'); // Log para saber que se ejecutó el método
    console.log('Credenciales:', { email: this.username, contrasena: this.password });
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Autenticado correctamente', response); // Respuesta del servidor
        this.router.navigate(['/']); // Redirige al usuario a la página principal
      },
      error: (error) => {
        console.error('Error en la autenticación:', error);
        alert('Usuario o contraseña incorrectos'); // Mensaje de error si las credenciales no son correctas
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
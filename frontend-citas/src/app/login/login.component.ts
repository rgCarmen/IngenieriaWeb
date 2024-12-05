import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Propiedad para almacenar el usuario
  password: string = ''; // Propiedad para almacenar la contraseña

  constructor() {}

  onSubmit(): void {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    if (this.username && this.password) {
      alert('Inicio de sesión enviado correctamente.');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}

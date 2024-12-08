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
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
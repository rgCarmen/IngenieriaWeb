import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  standalone:false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit{


  // Datos personales
  personalData: any={};


  // Preferencias
  preferences = {
    notification: 'email', // Valores posibles: 'email' o 'sms'
  };

  // Historial de actividad (opcional)
  activityHistory: any[] = [];
  showPassword: boolean = false;
  password: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadPersonalData();
  }

  loadPersonalData() {
   this.accountService.getUsuario().subscribe(
      (data) => {
        console.log(data);
        this.personalData = data;
        console.log(this.personalData);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  // Métodos para actualizar los datos
  updatePersonalInfo() {
    alert('Datos personales actualizados: ' + JSON.stringify(this.personalData));
    // Aquí puedes integrar la lógica para enviar los datos al backend.
  }

  updatePreferences() {
    alert('Preferencias guardadas: ' + JSON.stringify(this.preferences));
    // Aquí puedes integrar la lógica para guardar las preferencias en el backend.
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

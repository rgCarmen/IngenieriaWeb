import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone:false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  // Datos personales
  personalData = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: '',
  };

  // Preferencias
  preferences = {
    notification: 'email', // Valores posibles: 'email' o 'sms'
  };

  // Historial de actividad (opcional)
  activityHistory = [
    'Cita con el Dr. Gómez - 01/12/2024',
    'Cita cancelada con la Dra. López - 25/11/2024',
    'Cita con el Dr. Ramírez - 15/11/2024',
  ];

  // Métodos para actualizar los datos
  updatePersonalInfo() {
    alert('Datos personales actualizados: ' + JSON.stringify(this.personalData));
    // Aquí puedes integrar la lógica para enviar los datos al backend.
  }

  updatePreferences() {
    alert('Preferencias guardadas: ' + JSON.stringify(this.preferences));
    // Aquí puedes integrar la lógica para guardar las preferencias en el backend.
  }
}

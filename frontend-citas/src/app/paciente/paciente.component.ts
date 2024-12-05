import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-paciente',
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule], // Asegúrate de registrar CommonModule aquí
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent {
  pacienteNombre = 'Juan Pérez';
  fechaNacimiento = '15/03/1985';
  email = 'juan.perez@example.com';

  citas = [
    { fecha: '2024-12-10', hora: '10:00 AM', medico: 'Dr. García' },
    { fecha: '2024-12-15', hora: '03:00 PM', medico: 'Dra. López' },
  ];

  constructor() {}

  agendarCita() {
    alert('Aquí se redirigiría al formulario para agendar una cita.');
  }

  cerrarSesion() {
    alert('Cerrando sesión...');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel-appointment',
  standalone: false,
  
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.scss'
})
export class CancelAppointmentComponent {
  appointments = [
    { id: 1, specialty: 'Cardiología', doctor: 'Dr. Gómez', date: new Date('2024-12-01') },
    { id: 2, specialty: 'Pediatría', doctor: 'Dra. López', date: new Date('2024-12-02') },
  ]; // Ejemplo de citas cargadas, reemplaza con datos reales
  selectedAppointment: any = null;
  cancellationConfirmed = false;

  confirmCancellation() {
    if (this.selectedAppointment) {
      // Lógica para cancelar la cita
      this.cancellationConfirmed = true;

      // Opcional: Remover la cita de la lista
      this.appointments = this.appointments.filter(
        (appointment) => appointment !== this.selectedAppointment
      );

      // Reiniciar selección
      this.selectedAppointment = null;
    }
  }

}
import { Component } from '@angular/core';

@Component({
  selector: 'app-modify-appointment',
  standalone: false,
  templateUrl: './modify-appointment.component.html',
  styleUrls: ['./modify-appointment.component.css'],
})
export class ModifyAppointmentComponent {
  appointments = [
    { id: 1, specialty: 'Cardiología', doctor: 'Dr. Gómez', date: new Date('2024-12-01') },
    { id: 2, specialty: 'Pediatría', doctor: 'Dra. López', date: new Date('2024-12-02') },
  ];

  specialties = ['Cardiología', 'Pediatría', 'Dermatología', 'Odontología'];
  doctors = [
    { name: 'Dr. Gómez', specialty: 'Cardiología' },
    { name: 'Dra. López', specialty: 'Pediatría' },
    { name: 'Dr. Ramírez', specialty: 'Dermatología' },
  ];

  filteredDoctors: string[] = [];
  selectedAppointment: any = null;

  // Filtra doctores por especialidad
  filterDoctors() {
    this.filteredDoctors = this.doctors
      .filter((doctor) => doctor.specialty === this.selectedAppointment.specialty)
      .map((doctor) => doctor.name);
  }

  // Carga detalles de la cita seleccionada
  loadAppointmentDetails() {
    this.filterDoctors(); // Filtra los doctores al cargar los detalles
  }

  // Actualiza la fecha seleccionada
  updateDate(newDate: Date) {
    this.selectedAppointment.date = newDate;
  }

  // Guarda los cambios realizados
  saveChanges() {
    alert(`Cita actualizada: ${JSON.stringify(this.selectedAppointment)}`);
    // Aquí puedes implementar la lógica para enviar los datos al backend.
  }
}

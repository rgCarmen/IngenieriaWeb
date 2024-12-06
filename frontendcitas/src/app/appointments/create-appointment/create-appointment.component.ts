import { Component } from '@angular/core';

@Component({
  selector: 'app-create-appointment',
  standalone: false,
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent {
  specialties = ['Cardiología', 'Pediatría', 'Dermatología', 'Odontología'];
  doctors = [
    { name: 'Dr. Gómez', specialty: 'Cardiología', availableDates: ['2024-12-01', '2024-12-05'] },
    { name: 'Dra. López', specialty: 'Pediatría', availableDates: ['2024-12-02', '2024-12-06'] },
    { name: 'Dr. Ramírez', specialty: 'Dermatología', availableDates: ['2024-12-03', '2024-12-07'] },
  ];
  selectedSpecialty: string = '';
  filteredDoctors: any[] = [];
  selectedDoctor: any = null;
  availableDates: string[] = []; // Fechas disponibles para el doctor seleccionado

  // Filtra los doctores según la especialidad seleccionada
  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doctor => doctor.specialty === this.selectedSpecialty);
    this.selectedDoctor = null; // Reinicia la selección del doctor
    this.availableDates = []; // Limpia las fechas disponibles
  }

  // Carga las fechas disponibles del doctor seleccionado
  loadAvailableDates() {
    if (this.selectedDoctor) {
      this.availableDates = this.selectedDoctor.availableDates;
    }
  }

  // Lógica para seleccionar una fecha del calendario
  selectDate(date: Date) {
    const selectedDateString = date.toISOString().split('T')[0];
    alert(`Cita creada para el ${selectedDateString} con ${this.selectedDoctor.name}`);
    // Aquí puedes implementar la lógica para guardar la cita en el backend
  }  
}

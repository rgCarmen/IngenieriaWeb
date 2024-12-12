import { Component } from '@angular/core';
import { CitasService } from '../../citas.service';
import { Router } from '@angular/router';

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

  constructor(private citasService: CitasService, private router: Router) {}

  // Filtra los doctores según la especialidad seleccionada
  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doctor => doctor.specialty === this.selectedSpecialty);
    this.selectedDoctor = null; // Reinicia la selección del doctor
    this.availableDates = []; // Limpia las fechas disponibles
  }

  loadAvailableDates() {
    if (this.selectedDoctor) {
      this.availableDates = this.selectedDoctor.availableDates;
      this.highlightAvailableDates();
    }
  }
  
  // Función para resaltar días disponibles
  highlightAvailableDates() {
    const calendarDays = document.querySelectorAll('.mat-calendar-body-cell-content');
  
    calendarDays.forEach(day => {
      const dayElement = day as HTMLElement;
      const dayText = dayElement.textContent;
  
      if (dayText) {
        const dayString = dayText.padStart(2, '0');
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${dayString}`;
  
        if (this.availableDates.includes(dateStr)) {
          dayElement.style.backgroundColor = '#90ee90'; // Resaltar en verde
          dayElement.style.borderRadius = '50%';
        }
      }
    });
  }  

  // Lógica para seleccionar una fecha y enviar al backend
  selectDate(date: Date) {
    const selectedDateString = date.toISOString().split('T')[0];

    if (this.selectedDoctor && this.selectedSpecialty) {
      const appointmentData = {
        doctorName: this.selectedDoctor.name,
        specialty: this.selectedSpecialty,
        date: selectedDateString
      };

      this.citasService.createAppointment(appointmentData).subscribe(
        () => {
          alert(`Cita creada exitosamente para el ${selectedDateString} con ${this.selectedDoctor.name}`);
          this.router.navigate(['/appointments']);
        },
        error => {
          console.error('Error al crear la cita:', error);
          alert('Hubo un error al crear la cita. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, selecciona un doctor y una especialidad antes de crear la cita.');
    }
  }  
}

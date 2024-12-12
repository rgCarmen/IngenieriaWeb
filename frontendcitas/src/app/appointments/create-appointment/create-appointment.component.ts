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
  specialties: string[] = [];
  doctors: any[] = [];
  selectedSpecialty: string = '';
  filteredDoctors: any[] = [];
  selectedDoctor: any = null;
  availableDates: string[] = []; // Fechas disponibles para el doctor seleccionado

  constructor(private citasService: CitasService, private router: Router) {}

  ngOnInit() {
    this.cargarEspecialidades();
  }

  // Cargar especialidades desde el backend
  cargarEspecialidades() {
    this.citasService.obtenerEspecialidades().subscribe(
      (data) => {
        console.log(data)
        this.specialties = data;
      },
      (error) => {
        console.error('Error al cargar las especialidades:', error);
        alert('Error al cargar las especialidades desde el servidor.');
      }
    );
  }

  // Cargar doctores desde el backend y filtra los doctores según la especialidad seleccionada
  filterDoctors() {
    console.log(this.selectedSpecialty)
    this.citasService.obtenerMedicosPorEspecialidad(this.selectedSpecialty).subscribe(
      (doctors) => {
        this.filteredDoctors = doctors;
        this.selectedDoctor = null; // Reinicia la selección del doctor
        this.availableDates = []; // Limpia las fechas disponibles
      },
      (error) => {
        console.error('Error al cargar los doctores:', error);
        alert('Error al cargar los doctores desde el servidor.');
      }
    );
  }

  loadAvailableDates() {
    if (this.selectedDoctor) {
      this.citasService.obtenerCitasPorMedico(this.selectedDoctor.id).subscribe(
        (appointments) => {
          this.availableDates = appointments.map((appointment) => appointment.fecha.split('T')[0]);
          this.highlightAvailableDates();
        },
        (error) => {
          console.error('Error al cargar las citas disponibles:', error);
          alert('Hubo un error al cargar las citas disponibles.');
        }
      );
    }
  }  

  // Resaltar días disponibles en el calendario
  highlightAvailableDates() {
    setTimeout(() => {
      const calendarDays = document.querySelectorAll('.mat-calendar-body-cell-content');
  
      calendarDays.forEach((day) => {
        const dayElement = day as HTMLElement;
        const dayText = dayElement.textContent;
  
        if (dayText) {
          const dayString = dayText.padStart(2, '0');
          const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
          const year = new Date().getFullYear().toString();
          const dateStr = `${year}-${month}-${dayString}`;
  
          if (this.availableDates.includes(dateStr)) {
            dayElement.style.backgroundColor = '#90ee90';
            dayElement.style.borderRadius = '50%';
          }
        }
      });
    }, 0); // Ejecutar después de que el calendario haya sido renderizado
  }
  

  // Seleccionar una fecha y enviar los datos al backend
  selectDate(date: Date) {
    const selectedDateString = date.toISOString().split('T')[0];
  
    if (this.selectedDoctor && this.selectedSpecialty) {
      const appointmentData = {
        doctorId: this.selectedDoctor.id,
        specialty: this.selectedSpecialty,
        date: selectedDateString,
      };
  
      this.citasService.crearCita(appointmentData).subscribe(
        () => {
          alert(`Cita creada exitosamente para el ${selectedDateString} con ${this.selectedDoctor.nombre}`);
          this.router.navigate(['/appointments']);
        },
        (error) => {
          console.error('Error al crear la cita:', error);
          alert('Hubo un error al crear la cita. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, selecciona un doctor y una especialidad antes de crear la cita.');
    }
  }  
}

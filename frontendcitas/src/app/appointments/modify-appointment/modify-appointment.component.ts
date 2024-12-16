import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../citas.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-modify-appointment',
  standalone: false,
  templateUrl: './modify-appointment.component.html',
  styleUrls: ['./modify-appointment.component.css'],
})

export class ModifyAppointmentComponent implements OnInit {
  appointments: any[] = [];
  selectedAppointment: any = null;
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  availableAppointments: any[] = [];
  availableDates: string[] = [];
  availableHours: string[] = [];
  selectedHour: string = '';
  selectedSpecialty: string = '';
  selectedDoctor: string = '';


  constructor(private citasService: CitasService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  // Cargar citas del paciente desde el backend
  loadAppointments() {
    this.citasService.citasPaciente().subscribe(
      (data) => {
        const now = new Date(); // Fecha y hora actual
  
        // Filtrar citas cuya fecha sea posterior al momento actual
        this.appointments = data.filter((appointment: any) => {
          const appointmentDate = new Date(appointment.fecha);
          return appointmentDate > now;
        });
  
        console.log('Citas próximas cargadas:', this.appointments); // Depuración
      },
      (error) => {
        console.error('Error al cargar las citas del paciente:', error);
      }
    );
  }  

  // Cargar detalles de la cita seleccionada
  loadAppointmentDetails() {
    if (this.selectedAppointment) {
      // Asignar la especialidad y el nombre del doctor a variables locales
      this.selectedSpecialty = this.selectedAppointment.medico.especialidad;
      this.selectedDoctor = `${this.selectedAppointment.medico.nombre} ${this.selectedAppointment.medico.apellidos}`;
    }
  }  

  // Cargar citas disponibles para el doctor seleccionado
  loadAvailableDates() {
    if (this.selectedAppointment.doctor) {
      this.citasService.obtenerCitasPorMedico(this.selectedAppointment.doctor.id).subscribe(
        (appointments) => {
          this.availableAppointments = appointments.filter(
            (appointment: any) => appointment.paciente === null
          );
          this.availableDates = this.availableAppointments.map((appointment: any) => appointment.fecha.split(' ')[0]);
        },
        (error) => {
          console.error('Error al cargar las citas disponibles:', error);
        }
      );
    }
  }

  // Actualizar la fecha seleccionada
  selectDate(date: Date) {
    const selectedDateString = date.toISOString().split('T')[0];
    const appointmentsForDate = this.availableAppointments.filter(
      (appointment: any) => appointment.fecha.split(' ')[0] === selectedDateString
    );
    this.availableHours = appointmentsForDate.map((appointment: any) => appointment.fecha.split(' ')[1]);
  }

  // Guardar cambios realizados en la cita
  saveChanges() {
    const userId = this.authService.getId();
    if (!userId) {
      alert('No se ha encontrado el ID de usuario. Asegúrate de estar autenticado.');
      return;
    }
  
    // Crear el objeto de cita actualizada con la fecha y hora seleccionadas
    const updatedAppointment = {
      ...this.selectedAppointment,
      date: `${this.selectedAppointment.date.toISOString().split('T')[0]} ${this.selectedHour}`,
    };
  
    this.citasService.actualizarCitaPaciente(updatedAppointment).subscribe(
      () => {
        alert('Cita modificada exitosamente.');
        this.router.navigate(['/appointments']);
      },
      (error) => {
        console.error('Error al modificar la cita:', error);
        alert('Hubo un error al modificar la cita. Por favor, inténtalo de nuevo.');
      }
    );
  }  
}
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
      this.selectedSpecialty = this.selectedAppointment.medico.especialidad;
      this.selectedDoctor = `${this.selectedAppointment.medico.nombre} ${this.selectedAppointment.medico.apellidos}`;
      
      // Asignar una fecha por defecto si `selectedAppointment.date` es null
      this.selectedAppointment.date = this.selectedAppointment.date ? new Date(this.selectedAppointment.date) : new Date();
      
      this.loadAvailableDates(); // Cargar las fechas disponibles
    }
  }  

  // Cargar citas disponibles para el doctor seleccionado
  loadAvailableDates() {
    if (this.selectedAppointment) {
      this.citasService.obtenerCitasPorMedico(this.selectedAppointment.medico.id).subscribe(
        (appointments) => {
          this.availableAppointments = appointments.filter(
            (appointment: any) => appointment.paciente === null
          );
          this.availableDates = this.availableAppointments.map((appointment: any) => appointment.fecha.split(' ')[0].trim());
          console.log('Fechas disponibles:', this.availableDates);
        },
        (error) => {
          console.error('Error al cargar las citas disponibles:', error);
        }
      );
    }
  }

  // Actualizar la fecha seleccionada
  selectDate(date: Date | null) {
    if (!date) {
      console.warn('Fecha seleccionada es null.');
      return;
    }
    date.setHours(date.getHours() + 1);
    this.selectedAppointment.date = date;
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

    console.log(this.selectedAppointment);
    console.log(this.availableAppointments);
  
    // Crear el objeto de cita actualizada con la fecha y hora seleccionadas
   
    const fecha=`${this.selectedAppointment.date.toISOString().split('T')[0]} ${this.selectedHour}`;

    const filteredAppointments = this.availableAppointments.find((appointment: any) => {
      return appointment.fecha === fecha; // Comparar solo la parte de la fecha
    });


    const updated = {citaId: filteredAppointments.id};
    console.log("Updated", updated)

    this.citasService.actualizarCitaPaciente(this.selectedAppointment.id,updated).subscribe(
      () => {
        alert('Cita modificada exitosamente.');
        this.router.navigate(['/appointments']);
        window.location.reload();

      },
      (error) => {
        console.error('Error al modificar la cita:', error);
        alert('Hubo un error al modificar la cita. Por favor, inténtalo de nuevo.');
      }
    );
  }  
  
  dateClass = (date: Date): string => {
    date.setHours(date.getHours() + 1);
    const dateString = date.toISOString().split('T')[0];
  
    console.log(`Revisando fecha del calendario: "${dateString}"`);
  
    this.availableDates.forEach((availableDate) => {
      console.log(`Comparando "${availableDate.trim()}" con "${dateString}"`);
      if (availableDate.trim() === dateString) {
        console.log(`%c ¡Coincidencia encontrada!: ${dateString}`, 'color: green; font-weight: bold;');
      }
    });
  
    const isAvailable = this.availableDates.some((availableDate) => availableDate.trim() === dateString);
  
    if (isAvailable) {
      console.log(`%c highlight-date aplicado a: ${dateString}`, 'color: green; font-weight: bold;');
      return 'highlight-date';
    }
    return '';
  }
  
  
  
  
}
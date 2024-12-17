import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../citas.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

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
  selectedType: string = ''; // Tipo de cita seleccionado (CONSULTA, REVISION, URGENCIA)
  isLoading: boolean = true;
  selectedDateCalendar: string = '';

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(private citasService: CitasService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  // Cargar citas del paciente desde el backend
  loadAppointments() {
    this.citasService.citasPaciente().subscribe(
      (data) => {
        const now = new Date();
        // Filtrar citas cuya fecha sea posterior al momento actual
        this.appointments = data.filter((appointment: any) => {
          const appointmentDate = new Date(appointment.fecha);
          return appointmentDate > now;
        });
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
      this.selectedType = this.selectedAppointment.tipoCita;

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
          // Filtrar citas disponibles (paciente === null)
          this.availableAppointments = appointments.filter(
            (appointment: any) => appointment.paciente === null
          );

          // Extraer fechas únicas de las citas disponibles
          this.availableDates = Array.from(
            new Set(this.availableAppointments.map((appointment: any) => appointment.fecha.split(' ')[0].trim()))
          );

          // Seleccionar automáticamente el primer día disponible
          if (this.availableDates.length > 0) {
            const closestDate = this.getClosestDate(this.availableDates);
            this.selectDate(new Date(closestDate));
          } else {
            this.availableHours = [];
          }

          this.isLoading = false;
        },
        (error) => {
          console.error('Error al cargar las citas disponibles:', error);
          this.isLoading = false;
        }
      );
    }
  }

  filterAppointmentsByType(): void {
    if (this.selectedType) {
      // Filtrar citas disponibles por el tipo de cita seleccionado
      this.availableAppointments = this.availableAppointments.filter(
        (appointment: any) => appointment.tipo === this.selectedType
      );
    } else {
      // Si no hay tipo seleccionado, mostrar todas las citas disponibles
      this.loadAvailableDates();
    }
  }
  

  // Actualizar la fecha seleccionada y seleccionar la primera hora disponible
  selectDate(date: Date | null) {
    if (!date) {
      console.warn('Fecha seleccionada es null.');
      return;
    }

    date.setHours(date.getHours() + 1);
    this.selectedAppointment.date = date;
    const selectedDateString = date.toISOString().split('T')[0];

    // Actualiza la propiedad auxiliar con la fecha seleccionada
    this.selectedDateCalendar = date.toISOString().split('T')[0];
    console.log('%cFecha seleccionada en selectDate:', 'color: blue; font-weight: bold;', this.selectedDateCalendar);

    // Filtrar citas disponibles para la fecha seleccionada
    const appointmentsForDate = this.availableAppointments.filter(
      (appointment: any) => appointment.fecha.split(' ')[0] === selectedDateString
    );

    // Extraer las horas disponibles
    this.availableHours = appointmentsForDate.map((appointment: any) => appointment.fecha.split(' ')[1]);

    // Seleccionar automáticamente la primera hora disponible
    if (this.availableHours.length > 0) {
      this.selectedHour = this.availableHours[0];
    } else {
      this.selectedHour = '';
    }

    // Forzar actualización del calendario
    if (this.calendar) {
      this.calendar.updateTodaysDate(); // Fuerza el re-renderizado
    }
  }

  // Guardar cambios realizados en la cita
  saveChanges() {
    const userId = this.authService.getId();
    if (!userId) {
      alert('No se ha encontrado el ID de usuario. Asegúrate de estar autenticado.');
      return;
    }

    // Crear el objeto de cita actualizada con la fecha y hora seleccionadas
    const fecha = `${this.selectedAppointment.date.toISOString().split('T')[0]} ${this.selectedHour}`;

    const filteredAppointments = this.availableAppointments.find((appointment: any) => {
      return appointment.fecha === fecha;
    });

    if (!filteredAppointments) {
      alert('No se ha podido encontrar una cita disponible con los datos seleccionados.');
      return;
    }

    const updated = { citaId: filteredAppointments.id };

    this.citasService.actualizarCitaPaciente(this.selectedAppointment.id, updated).subscribe(
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

  // Obtener la fecha más cercana disponible
  getClosestDate(availableDates: string[]): string {
    const today = new Date();
    return availableDates.reduce((closest, date) => {
      const currentDate = new Date(date);
      const closestDate = new Date(closest);
      return currentDate >= today && currentDate < closestDate ? date : closest;
    }, availableDates[0]);
  }

  // Resaltar fechas disponibles en el calendario
  dateClass = (date: Date): string => {
    // Normaliza la fecha actual
    date.setHours(date.getHours() + 1);
    const dateString = date.toISOString().split('T')[0];

    // Clase para la fecha seleccionada
    if (this.selectedDateCalendar === dateString) {
      console.log('%cFecha seleccionada encontrada:', 'color: orange; font-weight: bold;', dateString);
      return 'selected-date';
    }
 
    // Compara correctamente y verifica
    const isAvailable = this.availableDates.some((availableDate) => availableDate.trim() === dateString);

    // Log para depurar la clase que se devuelve
    if (isAvailable) {
      return 'highlight-date';
    }
    return '';
  }
}
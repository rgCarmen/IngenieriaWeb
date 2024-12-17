import { Component } from '@angular/core';
import { CitasService } from '../../citas.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

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
  availableDates: string[] = [];
  availableAppointments: any[] = [];
  filteredAppointments: any[] = []; // Filtradas por tipo de cita
  availableHours: { hour: string, citaId: number }[] = [];
  selectedHour: string = '';
  selectedDate: Date | null = null;
  selectedCitaId: number | null = null;
  selectedType: string = ''; // Tipo de cita seleccionado
  isLoading: boolean = true;

  constructor(private citasService: CitasService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.citasService.obtenerEspecialidades().subscribe(
      (data) => {
        this.specialties = data;
      },
      (error) => {
        console.error('Error al cargar las especialidades:', error);
      }
    );
  }

  filterDoctors() {
    this.citasService.obtenerMedicosPorEspecialidad(this.selectedSpecialty).subscribe(
      (doctors) => {
        this.filteredDoctors = doctors;
        this.selectedDoctor = null;
        this.availableDates = [];
        this.availableAppointments = [];
        this.filteredAppointments = [];
        this.availableHours = [];
      },
      (error) => {
        console.error('Error al cargar los doctores:', error);
      }
    );
  }

  loadAvailableAppointments() {
    if (this.selectedDoctor) {
      this.citasService.obtenerCitasPorMedico(this.selectedDoctor.id).subscribe(
        (appointments) => {
          // Filtrar citas disponibles (paciente === null)
          this.availableAppointments = appointments.filter((appointment: any) => appointment.paciente === null);
  
          // Limpiar filtros previos
          this.filteredAppointments = [];
          this.availableDates = [];
          this.availableHours = [];
        },
        (error) => {
          console.error('Error al cargar las citas disponibles:', error);
        }
      );
    }
  }  

  filterAppointmentsByType(): void {
    if (this.selectedType) {
      // Filtrar citas por tipo seleccionado
      this.filteredAppointments = this.availableAppointments.filter(
        (appointment: any) => appointment.tipoCita === this.selectedType
      );
    } else {
      // Si no hay filtro, mostrar todas las citas
      this.filteredAppointments = this.availableAppointments;
    }
  
    // Actualizar las fechas disponibles
    this.availableDates = Array.from(
      new Set(this.filteredAppointments.map((appointment: any) => appointment.fecha.split(' ')[0]))
    );
  
    // Seleccionar automáticamente el primer día disponible y sus horas
    if (this.availableDates.length > 0) {
      const closestDate = this.getClosestDate(this.availableDates);
      this.selectDate(new Date(closestDate)); // Seleccionar la fecha más cercana
    } else {
      this.selectedDate = null;
      this.availableHours = [];
    }
  }  
  

  selectDate(date: Date | null): void {
    if (!date) return;
  
    this.selectedDate = date;
    const selectedDateString = date.toISOString().split('T')[0];
  
    // Filtrar citas para la fecha seleccionada
    const appointmentsForDate = this.filteredAppointments.filter(
      (appointment: any) => appointment.fecha.split(' ')[0] === selectedDateString
    );
  
    // Extraer las horas disponibles
    this.availableHours = appointmentsForDate.map((appointment: any) => ({
      hour: appointment.fecha.split(' ')[1],
      citaId: appointment.id
    }));
  
    // Seleccionar automáticamente la primera hora disponible
    if (this.availableHours.length > 0) {
      this.selectedHour = this.availableHours[0].hour;
      this.selectedCitaId = this.availableHours[0].citaId;
    }
  }  
  

  confirmAppointment() {
    const userId = this.authService.getId();
    if (!userId) {
      alert('No se ha encontrado el ID de usuario. Asegúrate de estar autenticado.');
      return;
    }

    if (this.selectedDoctor && this.selectedSpecialty && this.selectedHour && this.selectedDate) {
      const selectedDateString = this.selectedDate.toISOString().split('T')[0];
      const appointmentData = {
        doctorId: this.selectedDoctor.id,
        specialty: this.selectedSpecialty,
        date: `${selectedDateString} ${this.selectedHour}`,
        userId: userId,
        citaId: this.selectedCitaId,
      };

      this.citasService.pedirCita(appointmentData, userId).subscribe(
        () => {
          alert(`Cita creada exitosamente para el ${selectedDateString} a las ${this.selectedHour} con ${this.selectedDoctor.nombre}`);
          this.router.navigate(['/appointments']);
          window.location.reload();
        },
        (error) => {
          console.error('Error al pedir la cita:', error);
          alert('Hubo un error al pedir la cita. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, selecciona una hora y fecha antes de confirmar la cita.');
    }
  }

  dateClass = (date: Date): string => {
    const dateString = date.toISOString().split('T')[0];
    return this.availableDates.includes(dateString) ? 'highlight-date' : '';
  };
  

  getClosestDate(availableDates: string[]): string {
    const today = new Date();
    return availableDates.reduce((closest, date) => {
      const currentDate = new Date(date);
      const closestDate = new Date(closest);
      return currentDate >= today && currentDate < closestDate ? date : closest;
    }, availableDates[0]);
  }  
}

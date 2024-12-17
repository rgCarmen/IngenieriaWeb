import { Component } from '@angular/core';
import { CitasService } from '../../citas.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

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
  selectedDateCalendar: string = '';

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

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
          this.availableDates = this.availableAppointments.map((appointment: any) => appointment.fecha.split(' ')[0].trim());
          this.filteredAppointments = [];

          if (this.availableDates.length > 0) {
            const closestDate = this.getClosestDate(this.availableDates);
            this.selectDate(new Date(closestDate)); 
          }
          this.availableHours = [];
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
    if (!date) {
      console.warn('La fecha seleccionada es null.');
      return;
    }

    // Ajusta la hora y guarda la fecha seleccionada
    date.setHours(date.getHours() + 1);

    this.selectedDate = date;
    const selectedDateString = date.toISOString().split('T')[0];

    // Actualiza la propiedad auxiliar con la fecha seleccionada
    this.selectedDateCalendar = date.toISOString().split('T')[0];
    console.log('%cFecha seleccionada en selectDate:', 'color: blue; font-weight: bold;', this.selectedDateCalendar);

    // Filtrar citas para la fecha seleccionada
    const appointmentsForDate = this.filteredAppointments.filter(
      (appointment: any) => appointment.fecha.split(' ')[0] === selectedDateString
    );

    // Extraer las horas disponibles
    this.availableHours = appointmentsForDate.map((appointment: any) => ({
      hour: appointment.fecha.split(' ')[1],
      citaId: appointment.id
    }));
    this.availableHours.sort((a, b) => {
      const [hourA, minuteA] = a.hour.split(':').map(Number);
      const [hourB, minuteB] = b.hour.split(':').map(Number);
    
      if (hourA === hourB) {
        return minuteA - minuteB; // Si las horas son iguales, se comparan los minutos
      }
      return hourA - hourB; // Comparar las horas
    });

    // Seleccionar automáticamente la primera hora disponible
    if (this.availableHours.length > 0) {
      this.selectedHour = this.availableHours[0].hour;
      this.selectedCitaId = this.availableHours[0].citaId;
    }

    // Forzar actualización del calendario
    if (this.calendar) {
      this.calendar.updateTodaysDate(); // Fuerza el re-renderizado
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
  
  getClosestDate(availableDates: string[]): string {
    const today = new Date().toISOString().split('T')[0]; // Fecha de hoy en formato YYYY-MM-DD
    let closestDate = availableDates[0];

    // Busca la fecha más cercana a hoy
    availableDates.forEach(date => {
      if (new Date(date) >= new Date(today) && new Date(date) < new Date(closestDate)) {
        closestDate = date;
      }
    });

    return closestDate;
  }
}

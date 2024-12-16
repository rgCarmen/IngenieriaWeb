import { Component, OnInit, TemplateRef } from '@angular/core';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agenda-medico',
  standalone: false,
  
  templateUrl: './agenda-medico.component.html',
  styleUrl: './agenda-medico.component.css'
})
export class AgendaMedicoComponent implements OnInit{


  citasFuturas: any[] = [];
  citasPasadas: any[] = [];
  selectedCitaId: number | null =null;
  citaEliminada: boolean=false;
  selectedCita: any = null; 

  schedule = {
    date: '',
    startTime: '',
    endTime:'',
    interval:'',
    tipoCita: ''
  };

  viewMode: any= 'day';
  citasAgrupadas: any[] = [];

  constructor(private dialog: MatDialog, private citasService: CitasService, private router: Router) {}

  ngOnInit(): void {
    this.citasMedico();
  }

  citasMedico() {
    this.citasService.citasMedico().subscribe({
      next: (data) => {
        const now = new Date();
        console.log(data); // Imprime la respuesta en la consola
        const citas = data.map((cita: any) => ({
          fecha: new Date(cita.fecha),
          paciente:  cita.paciente ? `${cita.paciente.nombre} ${cita.paciente.apellidos}` : '-',
          tipo: cita.tipoCita,
          id: cita.id
        }));

        this.citasFuturas = citas.filter((cita: any) => cita.fecha >= now);
        this.citasPasadas = citas.filter((cita: any) => cita.fecha < now);
        this.groupCitas();
      },
      error: (err) => {
        console.error('Error al obtener las citas:', err);
      }
    });
  }

  groupCitas() {
    const grouped = new Map<string, any[]>();
  
    this.citasFuturas.forEach((cita) => {
      let key: string;
  
      if (this.viewMode === 'day') {
        key = this.getFormattedDate(cita.fecha); // Agrupar por día
      } else {
        key = this.getWeekStartDate(cita.fecha); // Agrupar por semana
      }
  
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)?.push(cita);
    });
  
    // Convertir el Map en un array de objetos para usar en la plantilla
    this.citasAgrupadas = Array.from(grouped.entries()).map(([label, citas]) => ({
      label,    // Día o semana
      citas,    // Citas de este grupo
      isExpanded: true  // Por defecto, el grupo está expandido
    }));
  }
  
  // Obtener la fecha formateada (DD/MM/YYYY)
  getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }
  
  // Obtener el lunes de la semana como clave para agrupar
  getWeekStartDate(date: Date): string {
    const day = date.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajustar para que el lunes sea el inicio
    const weekStart = new Date(date);
    weekStart.setDate(diff);
  
    return `del ${weekStart.toLocaleDateString('es-ES')}`;
  }
  

  // Alternar entre día y semana
  toggleViewMode(mode: string): void {
    this.viewMode = mode;
    this.groupCitas();
  }

  // Alternar el estado de expansión de un grupo
  toggleGroup(index: number): void {
    this.citasAgrupadas[index].isExpanded = !this.citasAgrupadas[index].isExpanded;
  }

  // Obtener el número de semana
  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;

    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }


  openDialog(dialogTemplate: TemplateRef<any>,  citaId: number): void {
    this.selectedCitaId = citaId;
    this.dialog.open(dialogTemplate, {
      width: '300px',
    });
  }

  cancelarDialogo(): void {
    this.dialog.closeAll();
  }


  cancelarCita() {
    
    if(this.selectedCitaId){
      this.citasService.eliminarCita(this.selectedCitaId).subscribe({
        next: () => {
          this.citasFuturas = this.citasFuturas.filter((cita: any) => cita.id !== Number(this.selectedCitaId));
          console.log(this.selectedCitaId);
          console.log(this.citasFuturas.filter((cita: any) => cita.id !== this.selectedCitaId));
          this.citaEliminada = true;
          setTimeout(() => {
            this.citaEliminada = false; 
          }, 3000); // se quita el mensaje en 3 seg
          this.selectedCitaId = null;
          this.citasMedico();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al eliminar la cita:', err);
          alert('No se pudo eliminar la cita.');
        }
      });

    }
  
    this.dialog.closeAll();
    
  }

  navigateTo(action: string) {
    this.router.navigate([`/agenda/${action}`]);
  }

  createSchedule():void {
    if (this.schedule.date && this.schedule.startTime && this.schedule.tipoCita && this.schedule.endTime && this.schedule.interval) {
      const dateTime = `${this.schedule.date} ${this.schedule.startTime}:00`; //formato LocalDateTime
      const dateTimeFin = new Date(`${this.schedule.date} ${this.schedule.endTime}:00`); //formato LocalDateTime
      const intervalMinutes = parseInt(this.schedule.interval, 10);

      if (isNaN(intervalMinutes) || intervalMinutes <= 0) {
        alert("El intervalo debe ser un número mayor que cero.");
        return;
      }

      const citas = [];
      let currentDateTime = new Date(dateTime);

      const formatDateTime = (date: Date): string => {
        const pad = (n: number) => (n < 10 ? `0${n}` : n);
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      };

      while (currentDateTime < dateTimeFin) {
      const cita = {
        fecha: formatDateTime(currentDateTime),
        tipoCita: this.schedule.tipoCita,
      };
      citas.push(cita);
      currentDateTime.setMinutes(currentDateTime.getMinutes() + intervalMinutes);
      console.log(currentDateTime.getMinutes() + intervalMinutes);
    }
    
    console.log("Citas", citas);
    citas.forEach((cita) => {

      this.citasService.crearCitaMedico(cita).subscribe({
        next: (response) => {
          console.log('Cita creada exitosamente:', response);
          this.citasMedico();
        },
        error: (err) => {
          console.error('Error al crear la cita:', err.message);
          alert("No se ha podido crear la cita en esta franja horaria")
        },
      });
    
    });
    this.schedule = { date: '', startTime: '',  endTime:'',
      interval:'', tipoCita: '' };
   

    }
  }

  actualizarCita() {
    if (this.selectedCita) {
      const dateTime = `${this.schedule.date} ${this.schedule.startTime}:00`;
  
      const cita = {
        id: this.selectedCita.id,
        fecha: dateTime,
        tipoCita: this.schedule.tipoCita,
      };
  
      this.citasService.actualizarCita(cita).subscribe({
        next: (response) => {
          console.log('Cita modificada exitosamente:', response);
          this.selectedCita=null;
          this.citasMedico();
        },
        error: (err) => {
          console.error('Error al modificar la cita:', err.message);
          alert("No se ha podido modificar")
        },
      });
    }
  }  
  

  modificarCita(cita: any) {
    this.selectedCita = { ...cita }; // Copia de la cita seleccionada

    const year = this.selectedCita.fecha.getFullYear();
    const month = (this.selectedCita.fecha.getMonth() + 1).toString().padStart(2, '0'); 
    const day = this.selectedCita.fecha.getDate().toString().padStart(2, '0');
    const fecha = `${year}-${month}-${day}`;

    const hours = this.selectedCita.fecha.getHours().toString().padStart(2, '0');
    const minutes = this.selectedCita.fecha.getMinutes().toString().padStart(2, '0');
    const hora = `${hours}:${minutes}`;


    this.schedule = {
      date: fecha ,// Formato YYYY-MM-DD
      startTime: hora,
      tipoCita: this.selectedCita.tipo,
      endTime:'',
      interval:'',
    };

  }
  
  cancelarModificacion() {
    this.selectedCita = null;
    this.schedule = { date: '', startTime: '', endTime:'',
      interval:'', tipoCita: '' }; // Limpiar el formulario
  }

  filterCitas() {
    throw new Error('Method not implemented.');
    }
}

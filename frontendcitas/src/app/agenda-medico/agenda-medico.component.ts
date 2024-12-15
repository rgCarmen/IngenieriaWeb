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
    tipoCita: ''
  };

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
      },
      error: (err) => {
        console.error('Error al obtener las citas:', err);
      }
    });
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
    if (this.schedule.date && this.schedule.startTime && this.schedule.tipoCita) {
      const dateTime = `${this.schedule.date} ${this.schedule.startTime}:00`; //formato LocalDateTime

      const cita = {
        fecha: dateTime,
        tipoCita: this.schedule.tipoCita,
      };

      this.citasService.crearCitaMedico(cita).subscribe({
        next: (response) => {
          console.log('Cita creada exitosamente:', response);
          this.schedule = { date: '', startTime: '', tipoCita: '' };
          this.citasMedico();
        },
        error: (err) => {
          console.error('Error al crear la cita:', err.message);
          alert("No se ha podido crear la cita en esta franja horaria")
        },
      });


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
  
      // Eliminar la cita antigua primero
      this.citasService.eliminarCita(this.selectedCita.id).subscribe({
        next: () => {
          console.log('Cita antigua eliminada exitosamente');
  
          // Crear la nueva cita
          this.citasService.crearCitaMedico(cita).subscribe({
            next: (response) => {
              console.log('Cita modificada exitosamente:', response);
              this.selectedCita = null;
              this.schedule = { date: '', startTime: '', tipoCita: '' }; // Limpiar el formulario
              this.citasMedico(); // Refrescar la lista de citas
            },
            error: (err) => {
              console.error('Error al crear la cita modificada:', err.message);
              alert(`No se ha podido crear la cita modificada: ${err.message}`);
            },
          });
        },
        error: (err) => {
          console.error('Error al eliminar la cita antigua:', err.message);
          alert(`No se pudo eliminar la cita antigua: ${err.message}`);
        },
      });
    }
  }  
  

  modificarCita(cita: any) {
    this.selectedCita = { ...cita }; // Copia de la cita seleccionada
    this.schedule = {
      date: this.selectedCita.fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
      startTime: this.selectedCita.fecha.toISOString().split('T')[1].substring(0, 5), // Formato HH:MM
      tipoCita: this.selectedCita.tipo,
    };
  }
  
  cancelarModificacion() {
    this.selectedCita = null;
    this.schedule = { date: '', startTime: '', tipoCita: '' }; // Limpiar el formulario
  }
}

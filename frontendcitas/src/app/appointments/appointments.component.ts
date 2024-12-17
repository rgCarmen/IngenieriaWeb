import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  citas: any[] = []; // Arreglo para almacenar las citas
  citasPasadas: any[] = []; // Arreglo para almacenar las citas
  citasProximas: any[] = []; // Arreglo para almacenar las citas
  selectedCitaId: number | null = null; // Variable para almacenar el ID de la cita seleccionada

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>; // Referencia al template del diálogo

  constructor(private citasService: CitasService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarCitas();  // Llama al método al inicializar el componente
  }

  // Método para cargar las citas desde el backend
  cargarCitas() {
    this.citasService.citasPaciente().subscribe({
      next: (data) => {

        // Asigna todas las citas con formato de fecha adecuado
        this.citas = data.map((cita: any) => ({
          id: cita.id,
          fecha: this.formatearFecha(cita.fecha), // Formatea la fecha
          medico: `${cita.medico.nombre} ${cita.medico.apellidos}`,
          especialidad: cita.medico.especialidad
        }));

        // Fecha actual para comparar
        const hoy = new Date();

        // Filtra citas futuras y pasadas
        this.citasProximas = this.citas.filter(cita => new Date(cita.fecha) > hoy);
        this.citasPasadas = this.citas.filter(cita => new Date(cita.fecha) <= hoy);
      },
      error: (err) => {
        console.error('Error al obtener las citas:', err);
      }
    });
  }

  // Método para formatear fechas en el formato 'YYYY-MM-DD HH:MM:SS'
  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    
    const year = date.getFullYear();
    const month = this.agregarCero(date.getMonth() + 1);
    const day = this.agregarCero(date.getDate());
    const hours = this.agregarCero(date.getHours());
    const minutes = this.agregarCero(date.getMinutes());
    const seconds = this.agregarCero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Método auxiliar para agregar ceros a los números menores de 10
  agregarCero(valor: number): string {
    return valor < 10 ? `0${valor}` : `${valor}`;
  }



  // Navegación a los subcomponentes
  navigateTo(action: string) {
    this.router.navigate([`/appointments/${action}`]);
  }

  // Método para abrir el popup de confirmación
  openConfirmDialog(citaId: number): void {
    this.selectedCitaId = citaId;
    this.dialog.open(this.confirmDialog, {
      width: '400px', // Tamaño personalizado para el diálogo
      hasBackdrop: true // Fondo opaco detrás del diálogo
    });
  }

  // Método para cancelar la cita
  cancelarCita() {
    if (this.selectedCitaId !== null) {
      this.citasService.cancelarCita(this.selectedCitaId).subscribe(
        response => {
          this.cargarCitas(); // Recargar las citas después de la cancelación
          this.dialog.closeAll(); // Cerrar el diálogo
        },
        error => {
          console.error('Error al cancelar la cita:', error);
          this.dialog.closeAll(); // Cerrar el diálogo aunque haya error
        }
      );
    }
  }

  // Método para cerrar el diálogo sin cancelar la cita
  cancelarDialogo() {
    this.dialog.closeAll(); // Cerrar el diálogo sin hacer nada
  }
}

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
  selectedCitaId: number | null = null; // Variable para almacenar el ID de la cita seleccionada

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>; // Referencia al template del diálogo

  constructor(private citasService: CitasService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarCitas();  // Llama al método al inicializar el componente
  }

  // Método para cargar las citas desde el backend
  cargarCitas() {
    this.citasService.citasPaciente().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica la respuesta recibida
        this.citas = data.map((cita: any) => ({
          id: cita.id,
          fecha: cita.fecha,  // Asegúrate de que 'fecha' existe en los datos
          medico: `${cita.medico.nombre} ${cita.medico.apellidos}`,  // Verifica que la estructura es correcta
          especialidad: cita.medico.especialidad // Verifica que 'medico' y 'especialidad' estén bien estructurados
        }));
      },
      error: (err) => {
        console.error('Error al obtener las citas:', err);
      }
    });
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
          console.log('Cita cancelada con éxito');
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

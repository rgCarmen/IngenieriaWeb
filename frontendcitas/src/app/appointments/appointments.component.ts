import { Component, Inject, OnInit } from '@angular/core';
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

  // Método para cancelar la cita
  cancelarCita(id: number) {
    console.log(this.citas);
    this.citasService.eliminarCita(id).subscribe(
      response => {
        // Al cancelar con éxito, actualizamos las citas
        this.cargarCitas();
        // Mostrar el popup de confirmación
        this.mostrarConfirmacion('Cita cancelada exitosamente');
      },
      error => {
        console.error('Error al cancelar la cita:', error);
        // Si hay error, mostrar mensaje de error
        this.mostrarConfirmacion('Hubo un error al cancelar la cita');
      }
    );
  }

  // Mostrar el mensaje de confirmación (puedes usar MatDialog o alert)
  mostrarConfirmacion(mensaje: string) {
    // Si usas MatDialog:
    this.dialog.open(DialogContentExampleDialog, {
      data: { mensaje }
    });

    // Si prefieres usar un simple alert:
    // alert(mensaje);
  }
}
  
// Este es el componente para el dialogo de confirmación
@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h1 mat-dialog-title>Confirmación</h1>
              <div mat-dialog-content>
                <p>{{ data.mensaje }}</p>
              </div>
              <div mat-dialog-actions>
                <button mat-button mat-dialog-close>Aceptar</button>
              </div>`
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}


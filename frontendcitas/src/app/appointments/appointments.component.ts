import { Component, OnInit } from '@angular/core';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  citas: any[] = []; // Arreglo para almacenar las citas

  constructor(private citasService: CitasService, private router: Router) {}

  ngOnInit(): void {
    this.cargarCitas();  // Llama al método al inicializar el componente
  }

  // Método para cargar las citas desde el backend
  cargarCitas() {
    this.citasService.citasPaciente().subscribe({
      next: (data) => {
        console.log(data); // Imprime la respuesta en la consola
        this.citas = data.map((cita: any) => ({
          fecha: cita.fecha,
          medico: `${cita.medico.nombre} ${cita.medico.apellidos}`,
          especialidad: cita.medico.especialidad
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
}

import { Component } from '@angular/core';
import { CitasService } from '../citas.service';

@Component({
  selector: 'app-citas',
  standalone: false,
  
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})
export class CitasComponent {
  citas: any[] = [];

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.cargarCitas(); // Llama al método al inicializar el componente
  }
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

}
